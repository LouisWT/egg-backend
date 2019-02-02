import { CronJob } from 'cron';
import * as decompress from 'decompress';
import { File, Service } from 'egg';
import * as fs from 'fs';
import * as _ from 'lodash';
import { Types } from 'mongoose';
import * as path from 'path';
import { createFolder, deleteFolder } from '../utils';
import { DocCreator } from './Doc';
import { EvaluationCreator } from './Evaluation';

const { ObjectId } = Types;

interface JobCreator {
  accountId: number;
  docId: Types.ObjectId;
}

/**
 * Transform 文档转换
 */
export default class Transform extends Service {

  /**
   * 上传并发起转换文档任务
   * @param accountId 账号ID
   * @param location 上传文档的课程章节
   * @param file 文档文件
   */
  async uploadConvertDoc(accountId: number,
    location: { library: string, chapter: string | undefined }, file: File) {
    const { ctx, config } = this;
    const { service, model, helper } = ctx;
    const { Doc, DocEvaluation, JobLog } = model;

    // 鉴权
    const auth = await service.auth.uploadDoc(accountId, location.library, location.chapter);
    if (!auth) { return helper.unauthRes(); }

    // 上传文件
    const dir = config.ossFiles.ppt;
    const ossInfo = await service.oss.uploadFile(dir, file, accountId);
    if (!ossInfo) { return helper.serverErrRes(); }
    const { ossName, fileSize, fileName } = ossInfo;
    const ossUrl = service.oss.ossUrl(ossName);

    const docId = new ObjectId();
    const jobId = new ObjectId();
    const evaluateId = new ObjectId();
    const doc: DocCreator = {
      _id: docId,
      accountId,
      library: ObjectId(location.library),
      name: file.filename,
      fileSize,
      comments: [],
      evaluation: evaluateId,
    };
    const job: JobCreator = {
      accountId,
      docId,
    };
    const evaluation: EvaluationCreator = {
      _id: evaluateId,
      rating: [],
      approve: [],
    };
    if (location.chapter) { doc.chapter = ObjectId(location.chapter); }
    await Promise.all([
      Doc.create(doc),
      JobLog.create(job),
      DocEvaluation.create(evaluation),
    ]);

    // 返回结果，开启转换任务
    const result = await service.account.getAllResource(accountId);
    this.createConvertJob(docId, { ossUrl, fileName }, jobId);
    return result;
  }

  /**
   * 开启子进程开始转换任务
   * @param docId 文档ID
   * @param file 上传后的文件信息
   * @param jobId 任务ID
   */
  async createConvertJob(docId: Types.ObjectId, file: { ossUrl: string, fileName: string },
    jobId: Types.ObjectId) {
    return new CronJob({
      cronTime: new Date(),
      onTick: (await this.dealDoc(docId, file, jobId)),
      runOnInit: true,
    });
  }

  /**
   * 子进程的转换文件任务
   * @param docId 文档ID
   * @param file 上传后的文件信息
   * @param jobId 任务ID
   */
  async dealDoc(docId: Types.ObjectId,
    file: { ossUrl: string, fileName: string }, jobId: Types.ObjectId): Promise<void> {
    const { ctx, config } = this;
    const { helper } = ctx;
    const { ossUrl, fileName } = file;
    const baseName = path.basename(fileName).split(path.extname(fileName))[0];
    const zipName = `${baseName}.zip`;
    const { requestSite, i, info, words } = config.owConfig;
    // 由于转换时间较长，所以先用 HEAD 方法让 ow365 先转换，HEAD 方法由于没有报体，传输较快所以不容易超时，并且转换一次之后 ow365 会有缓存，再用 GET 方法请求时就会比较快
    try {
      const body = await ctx.curl(requestSite, {
        method: 'HEAD',
        data: {
          i,
          info,
          words,
          furl: ossUrl,
        },
        timeout: 300000,
      });
      const contentLength = _.isEmpty(body.headers) ? 0 : body.headers['content-length'];
      // 设置转换失败
      if (contentLength === 0) {
        await this.pictureCallback({}, docId, fileName);
        return;
      }
    } catch (err) {
      // 设置转换失败
      if (err) {
        await this.pictureCallback({}, docId, fileName);
        return;
      }
    }
    // 下载转换后的压缩包文件，里面的文件名称是 p1 p2...
    const filepath = `temp/zip/${zipName}`;
    const finalpath = `temp/pictures/${baseName}`;
    createFolder(path.dirname(filepath));
    try {
      await ctx.curl(requestSite, {
        method: 'GET',
        data: {
          i,
          info,
          words,
          furl: ossUrl,
        },
        writeStream: fs.createWriteStream(filepath),
        timeout: 300000,
      });
    } catch (err) {
      // 设置转换失败
      if (err) {
        await this.pictureCallback({}, docId, fileName);
        return;
      }
    }
    // 将图片文件都上传到 oss
    const picsInOss: string[] = [];
    let size = 0;
    let length = 0;
    try {
      const fileInfo = fs.statSync(filepath);
      size = fileInfo.size;
      await decompress(filepath, finalpath);
      let pictures = fs.readdirSync(finalpath);
      pictures = _.map(pictures, (picture) => {
        return `${finalpath}/${picture}`;
      });
      length = pictures.length;
      for (const picture of pictures) {
        const picname = path.basename(picture);
        const finalname = `${config.ossFiles.picture}${baseName}/${picname}`;
        const obj = await ctx.oss.put(finalname, picture);
        if (!_.isEmpty(obj) && obj.res.statusCode === 200) {
          picsInOss.push(obj.name);
        }
      }
    } catch (err) {
      // 设置转换失败
      if (err) {
        await this.pictureCallback({}, docId, fileName);
        return;
      }
    } finally {
      deleteFolder(finalpath);
      fs.unlinkSync(filepath);
    }

    // 将文件排序按名称排序
    const sortPics = helper.sortPictures(picsInOss);
    const cover = sortPics[0];
    let result: { subPic: string[], cover: string, contentLength: number };
    if (sortPics.length === length) {
      result = {
        subPic: sortPics,
        cover,
        contentLength: size,
      };
      await this.pictureCallback(result, docId, fileName, jobId);
      return;
    }
    // 设置转换失败
    await this.pictureCallback({}, docId, fileName);
  }

  /**
   * 文档转换完成后，向数据库插入结果
   * @param result 转换结果
   * @param docId 文档ID
   * @param jobId 任务ID
   * @param fileName 文件在OSS中的名称，出错时可以用这个名称得到出错文件，从而尝试定位问题
   */
  async pictureCallback(result: { subPic?: string[], cover?: string, contentLength?: number },
    docId ?: Types.ObjectId, fileName?: string, jobId?: Types.ObjectId): Promise<void> {
    const { model } = this.ctx;
    const filter = {
      _id: docId,
    };
    let updater;
    if (_.isEmpty(result)) {
      updater = {
        fileName,
        transformed: -1,
      };
      await model.Doc.updateOne(filter, updater);
      return;
    }
    const { subPic, cover, contentLength } = result;
    updater = {
      pictures: subPic,
      cover,
      picSize: contentLength,
      fileName,
      transformed: 1,
    };
    await Promise.all([
      model.JobLog.deleteOne({ _id: jobId}),
      model.Doc.updateOne(filter, updater),
    ]);
  }
}
