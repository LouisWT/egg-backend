import { EggPlugin } from 'egg';

/**
 * plugin 配置项
 * {Boolean} enable 是否开启插件
 * {String} package npm模块名称
 * {String} path 插件绝对路径
 * {Array} env 只有在指定运行环境才能开启，会覆盖插件自身 package.json 中的配置
 * 对于内置的插件只需要配置 true or false
 */
const plugin: EggPlugin = {
  static: true,
  multipart: true,
};

plugin.routerPlus = {
  enable: true,
  package: 'egg-router-plus',
};

plugin.mysql = {
  enable: true,
  package: 'egg-mysql',
};

plugin.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

plugin.oss = {
  enable: true,
  package: 'egg-oss',
};

plugin.passport = {
  enable: true,
  package: 'egg-passport',
};

plugin.validate = {
  enable: true,
  package: 'egg-validate',
};

plugin.io = {
  enable: true,
  package: 'egg-socket.io',
};

plugin.alinode = {
  enable: true,
  package: 'egg-alinode',
};

plugin.xmlBody = {
  enable: true,
  package: 'egg-xml-body',
};

export default plugin;
