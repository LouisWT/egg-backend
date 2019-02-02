### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

### Redis

这个项目用到了 redis 作为 socket.io 的adapter，使得socket.io 可以跨进程与客户端通信，这无论是对当前的登录功能还是以后可能的 直播、房间功能都是一个帮助

目前配置cent Redis 有个 logfile 的坑，现在解决办法是直接把那个配置给注释了，这样不太好

### git 记住用户名密码

git config --global credential.helper store

### alinode 部署

```
npm i nodeinstall -g
# alinode 的版本号需要与 node 的版本对应
# https://help.aliyun.com/document_detail/60811.html?spm=a2c4g.11186623.6.586.7e6440a7sSC35s
nodeinstall --install-alinode ^3 --china
# 启动时要指定 ENABLE_NODE_LOG=YES 
```