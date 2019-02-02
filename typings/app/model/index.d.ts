// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDoc from '../../../app/model/Doc';

declare module 'egg' {
  interface IModel {
    Doc: ReturnType<typeof ExportDoc>;
  }
}
