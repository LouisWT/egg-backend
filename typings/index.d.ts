import 'egg';
import 'egg-mongoose';
import 'egg-router-plus';
import 'egg-validate';
import 'egg-socket.io';
import { RequestOptions } from 'urllib';
import { Writable } from 'stream';
import { AsyncFunc, Func } from 'mocha';

declare module 'egg' {
  // egg-mysql 接口定义
  interface MysqlConn {
    get(tableName: string, find: {}): Promise<any>;
    query(sql: string, values: any[]): Promise<any>;
    insert(tableName: string, value: {}): Promise<any>;
    select(tableName: string, filter: {}): Promise<any>;
    update(tableName: string, updater: {}): Promise<any>;
    delete(tableName: string, filter: {}): Promise<any>;
  }

  type MysqlTransactionFunc = (conn: MysqlConn) => object;

  interface Mysql extends MysqlConn {
    beginTransactionScope(transaction: MysqlTransactionFunc, ctx: Context): Promise<any>;
  }

  // egg-multipart 接口定义
  interface File {
    field: string;
    filename: string;
    encoding: string;
    mime: string;
    filepath: string;
  }

  // egg-passport 接口定义
  enum UserAgent {
    'pc',
    'mobile',
    'ipad',
  }

  interface Passport {
    verify(func: (ctx: Context, user: { id: number, provider: UserAgent }) => object);
    authenticate(strategy: string, options: object);
    use(name: string, strategy: object);
    doVerify(req: Request, user: UserAuth, done: function);
  }

  interface Application {
    mysql: Mysql;
    passport: Passport;
  }

  interface Request {
    files: File[];
  }

  interface EggApplication {
    passport: Passport;
  }

  interface RequestOptions {
    method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'HEAD';
    type?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'HEAD';
    data?: any;
    writeStream?: Writable;
    timeout?: number | number[];
  }

  interface CustomController {
    login: {
      qrcode: AsyncFunc,
    }
  }

  // interface CustomMiddleware {
    // connection: Func,
  // }
}
