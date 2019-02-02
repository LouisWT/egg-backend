// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDocs from '../../../app/controller/docs';

declare module 'egg' {
  interface IController {
    docs: ExportDocs;
  }
}
