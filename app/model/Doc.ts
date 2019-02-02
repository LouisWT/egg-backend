import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;

  const docSchema = new Schema({
    // 账号ID
    accountId: {
      type: Number,
      index: true,
    },
    // 所属的文件夹
    library: {
      type: ObjectId,
      ref: 'Library',
    },
    // 所属章节
    chapter: {
      type: ObjectId,
      ref: 'Chapter',
    },
    // 文件名称,如果不编辑的话,就是原始文件的名称
    name: String,
    // 封面
    cover: String,
    // 文件在OSS中大小
    fileSize: Number,
    // 文档在OSS中对应的文件名
    fileName: String,
    // 图片压缩包
    zip: String,
    // 图片文件
    pictures: [String],
    // 图片压缩包的大小
    picSize: Number,
    // 添加图片后，图片文件产生的多个版本
    version: {
      type: ObjectId,
      ref: 'PicVersion',
    },
    // 文档被查看次数
    view: {
      type: Number,
      default: 0,
    },
    // 文档的标签
    labels: [{
      type: ObjectId,
      ref: 'Label',
    }],
    // 文档评价相关
    evaluation: {
      type: ObjectId,
      ref: 'DocEvaluation',
    },
    // 对文档进行的编辑操作
    action: [{
      type: ObjectId,
      ref: 'DocAction',
    }],
    defaultAction: {
      type: ObjectId,
      ref: 'DocAction',
    },
    // 是否对文档进行编辑过
    hasAction: {
      type: Boolean,
      default: false,
    },
    // 播放时是否显示字幕
    showSubtitle: {
      type: Boolean,
      default: true,
    },
    // 文档是否已经转换完成 -1 转换失败 0 转换完成 1 转换成功
    transformed: {
      type: Number,
      default: 0,
    },
    // 是否开启
    status: {
      type: Boolean,
      default: true,
    },
    // 文档介绍
    introduction: String,
    // 删除标记
    deleted: {
      type: Boolean,
      default: false,
    },
  }, {
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updatedTime',
    },
  });

  return mongoose.model('Doc', docSchema, 'Docs');
};
