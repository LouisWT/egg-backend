import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import mongoConfig from 'config';

mongoose.Promise = Promise;

const files = fs.readdirSync(path.join(__dirname, 'mongo-models'));
files.forEach((file) => {
  if (_.endsWith(file, '.js')) {
    const modelPath = `./models/${file}`;
    require(modelPath);
  }
});

const connect = () => {
  const { user, password, uri, options } = mongoConfig;
  if (_.isEmpty(mongoConfig.user) || _.isEmpty(mongoConfig.password)) {
    mongoose.connect(`mongodb://${uri}`, options);
  } else {
    mongoose.connect(`mongodb://${user}:${password}@${uri}`, options);
  }
};

connect();

mongoose.connection.on('error', (err) => {
  console.error(err);
});

mongoose.connection.on('disconnected', connect);
