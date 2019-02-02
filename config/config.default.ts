import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {};

  // cookie signed key
  config.keys = appInfo.name;

  // 使用的中间件
  config.middleware = [];

  // 报文大小
  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb',
  };

  // 启用 file 模式
  config.multipart = {
    mode: 'file',
    // 给上传的文件一个 20MB 的限制
    fileSize: '20mb',
    fileExtensions: [
      '.ppt',
      '.pptx',
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.pdf',
      '.wps',
      '.txt',
    ],
  };

  // httpClient 超时时间
  config.httpclient = {
    timeout: 60000,
  };

  // oss 地址
  config.oss = {
    client: {
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
      endpoint: '',
      timeout: '',
    },
  };

  config.io = {
    init: {
      path: '/ws',
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      db: 0,
    },
    namespace: {
      '/login': {
        connectionMiddleware: [ ],
        packetMiddleware: [ ],
      },
    },
  };

  const spConfig = {
  };

  return {
    ...config,
    ...spConfig,
  };
};
