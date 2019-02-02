import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';

const createFolder = (to) => {
  const sep = path.sep;
  const folders = to.split(sep);
  let p = '';
  while (folders.length) {
    p += folders.shift() + sep;
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
  }
};

const deleteFolder = (path) => {
  let files: string[] = [];
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

export {
  createFolder,
  deleteFolder,
};
