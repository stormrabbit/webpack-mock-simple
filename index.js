const server = require('./libs/server');

const mockData = function ({
  path,
  port,
  isInject = true
}) {
  this.path = path;
  this.port = port;
  this.isInject = isInject;

}

mockData.prototype.apply = async function (compiler) {
  console.log('正在启动 mock 服务器');
  if (this.isInject) {
    await server({
      path: this.path,
      port: this.port
    });
  }
  console.log('mock 服务器启动完毕');
  compiler.plugin("emit", (compilation, callback) => {
    callback();
  });
  // compiler.plugin("compilation", function (compilation) {

  //     // 现在，设置回调来访问 compilation 中的步骤：
  //     compilation.plugin("emit", function () {
  //       console.log("Assets are being optimized.");
  //     });
  // });
};

module.exports = mockData;