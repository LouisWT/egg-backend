'use strict';

module.exports = {
  write: true,
  plugin: 'autod-egg',
  prefix: '^',
  devprefix: '^',
  exclude: [
    'test/fixtures',
    'coverage',
  ],
  dep: [
    'cron',
    'decompress',
    'egg',
    'egg-alinode',
    'egg-mongoose',
    'egg-mysql',
    'egg-oss',
    'egg-passport',
    'egg-router-plus',
    'egg-scripts',
    'egg-validate',
    'lodash',
    'moment',
    'passport-jwt' 
  ],
  devdep: [
    '@types/lodash',
    '@types/mocha',
    '@types/node',
    '@types/supertest',
    'autod',
    'autod-egg',
    'egg-bin',
    'egg-ci',
    'egg-mock',
    'egg-ts-helper',
    'tslib',
    'tslint',
    'typescript'
  ],
  keep: [
  ],
  semver: [
  ],
  test: 'scripts',
};
