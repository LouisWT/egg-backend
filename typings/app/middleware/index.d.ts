// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportXml from '../../../app/middleware/xml';

declare module 'egg' {
  interface IMiddleware {
    xml: typeof ExportXml;
  }
}
