const express = require('express');
const mockjs = require('./mock');
module.exports = async function ({
  path,
  port = 3000
}) {

  const app = express();
  const mockRoute = mockjs(path);
  app.use("/",await mockRoute);
  const server = app.listen(port, function () {
    const host = server.address().address;
    const hostPort = server.address().port;
    console.log("server is running at http://%s:%s", host, hostPort);

  })
}