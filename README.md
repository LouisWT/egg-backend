### 本地调试

```
npm test
```

### 生成生产环境代码

```
npm run build
```

### 设置环境变量
本项目使用了config包，它可以自动读取config文件夹下的与NODE_ENV相同名json文件来加载设置，比如NODE_ENV为dev时，就加载dev.json。

### 获取环境变量
在使用环境变量a时就使用以下语句
```
import { a } from 'config';
```

### 静态资源获取
静态资源存储在static_source文件夹下，可以通过文件路径访问文件
如通过
```
localhost:3000/picture/zhizi.jpeg
```
来访问picture文件夹下的zhizi.jpeg

### Redis数据库连接
通过bluebird遍历Redis包的接口，并克隆出支持promise的接口，来使接口支持koa2，调用redis函数的形式为,即在API名称后加Async
```
redisClient.hmsetAsync();
```
