import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // 开发环境下关闭 csrf
  config.security = {
    csrf: false,
  };

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

  const spConfig = {

  };

  return {
    ...config,
    ...spConfig,
  };
};
