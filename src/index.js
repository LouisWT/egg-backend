// babel-register是实时转码，出于速度考虑，最好不用于生产环境;生产环境用babel-cli转码后部署
if (process.env.NODE_ENV === 'dev') {
  require('babel-register');
}
const env = require('node-env-file');
const fs = require('fs');

const src = __dirname;
// 从工程根目录的启动的话，是'./node_modules/app'，从src里启动的话是，'../node_modules/app'
const dst = './node_modules/app';

const deleteFolder = (path) => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file) => {
      const curPath = `${path}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

// 在 node_modules 创建软链接,从而优化模块引入
const statInfo = fs.statSync(dst);
if (statInfo && statInfo.isDirectory()) {
  const link = fs.readlinkSync(dst);
  if (link !== src) {
    deleteFolder(dst);
    fs.symlinkSync(src, dst, 'dir');
  }
} else {
  fs.symlinkSync(src, dst, 'dir');
}

// 加载环境变量。require.resolve用于将相对路径转为绝对路径。
if (process.env.NODE_ENV === 'dev') {
  env(require.resolve('app/config/env/dev'));
} else if (process.env.NODE_ENV === 'pro') {
  env(require.resolve('app/config/env/pro'));
}

require('app/app.js');
