### 本地调试

```
npm test
```

### 生成生产环境代码

```
npm run build
```

### 获取环境变量
本项目使用了config包，它会自动读取config文件夹下的与NODE_ENV相同名json文件来加载设置，比如NODE_ENV为dev时，就加载dev.json。
在使用环境变量a时就使用以下语句
```
import { a } from 'config';
```