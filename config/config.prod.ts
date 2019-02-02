import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.security = {
    csrf: false,
  };

  // 暂时不修改日志位置，日志在开启进程的用户的根目录的 logs 文件中
  // config.logger = {
  //   dir: './prodlogs',
  // };

  // mysql 配置
  config.mysql = {
    client: {
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
    },
    // 用 app.mysql 访问实例
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // mongoose 配置
  config.mongoose = {
    client: {
      url: '',
      options: {
        keepAlive: 1,
        connectTimeoutMS: 30000,
        reconnectTries: 30,
        reconnectInterval: 30000,
      },
    },
  };

  config.alinode = {
    appid: '',
    secret: '',
  };

  return config;
};
