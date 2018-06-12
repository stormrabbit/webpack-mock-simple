# webpack-mock-simple

> 基于 [mockjs-lite](https://github.com/52cik/mockjs-lite) 的 webpack 插件

## 使用方式

### 安装

```
npm i webpack-mock-simple --save-dev
```

### 在 webpack 中声明

（一般是）`webpack.config.js` 文件中


```
  module.exports.plugins = (module.exports.plugins || []).concat([
    // .... 其他插件
    new myMock({
      path: path.join(__dirname, './mock/index.js'), // mock 管理模块地址，如果不存在会自动创建
      port: 3000 // mock 服务器端口，
      isInject: true // 是否拦截，默认为 true
    })
  ])
```

运行 `npm run start` 或者 `npm run dev`

### 添加 mock 接口

增加 `testApi.js` 文件

```
module.exports = {
  'list|1-10': [{
    'id|+1': 1
  }]
}
```

并在 `mock/index.js` 中引入

```
const testApi = require('./testApi');
const getApis = () => {
        return {
            testApi
        }

    }

module.exports = getApis;
```

重新启动项目，访问 `http://localhost:3000/testApi`，查看是否生效。

> 目前仅以 `getApis` 返回值的 key 值做 url，value 做 response ，扩展性不好。理论上可以引入 function 来实现动态 mock，计划未来添加。


## 更新日志
> 临时起意的东西，稳定性基本为零。不排除未来进行重大改动，请谨慎使用。
### 1.0.4 - 2017-06-20
#### 新增
1. README 文件
2. 引入 mock 的 index 可以自动生成
3. 增加了一个变量可以开启或者关闭 mock 服务器
#### 修复
1. 因为创建文件失败崩掉的 bug


