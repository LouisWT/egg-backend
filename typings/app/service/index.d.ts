// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTransform from '../../../app/service/Transform';

declare module 'egg' {
  interface IService {
    transform: ExportTransform;
  }
}
