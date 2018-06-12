/**
 * @file read mock json or js file and output data.
 * @author 龙骑将杨颖峰 <catwindboy@hotmail.com>  
 * 模仿
 * @author 楼教主 <fe.52cik@gmail.com> (http://www.52cik.com/)
 */

const MockLite = require("mockjs-lite");
const fs = require('fs');
const Mock = MockLite;
const Random = MockLite.Random;
const mk = require('./mk');

const isInit = (filePath) => new Promise((res, rej) => {
  fs.exists(filePath, function (exists) {
    if (exists) {
      console.log('文件已创建，跳过初始化步骤');

    } else {
      console.log('未找到文件，正在创建');
    };
    res(exists);
  });
})

const init = (filePath) => new Promise((res, rej) => {
  const temple =
    `const getApis = () => {
        return {
            
        }

    }

module.exports = getApis;`;

  fs.writeFileSync(filePath, temple, err => {
    if (!err) {
      res('skip init');
    } else {
      res('init over')
    }
  })
})

async function mock(dir) {
  console.log('正在读取==>', dir)
  const isFileExists = await isInit(dir);
  if (!isFileExists) {
    console.log(await mk(dir));
    console.log(await init(dir));
  }
  let routes; // routes list
  const getApis = require(dir);
  try {
    routes = getApis() || {};
  } catch (error) {
    console.log('error==>');
    console.log(error);
  }

  return function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET,HEAD,PUT,POST,DELETE,PATCH");

    const allowedHeaders = req.headers["access-control-request-headers"];
    if (allowedHeaders) {
      res.set("Access-Control-Allow-Headers", allowedHeaders);
    }

    if (req.method === "OPTIONS") {
      return res.send("");
    }

    const url = req.url.split("?")[0];
    if (url === "/") {
      // api document page
      const host = req.protocol + "://" + req.headers.host + req.baseUrl;

      const list = Object.keys(routes)
        .sort()
        .map(function (path) {
          const returnData = routes[path];
          return {
            // title: route.describe,
            url: host + '/' + path,
            data: returnData
            // file: route.filepath
          };
        });

      // return res.sendfile(`${__dirname}/../public/index.html`);
      return res.end(JSON.stringify(list));
    }
    let data = (routes[url.substring(1)] || 0);
    if (data) {
      if (typeof data === "function") {
        data = data(req, Mock, Random);
      }
      res.json(Mock.mock(data));
    } else {
      next();
    }
  };
}

module.exports = mock;