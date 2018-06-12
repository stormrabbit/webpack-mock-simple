const fs = require('fs');

const myMk = (filePath) => {
  console.log(filePath);
  const files = filePath.split('/');

  files.reduce((pre, cur) => {

    if (!!cur && cur.indexOf('.') === -1) {
      pre += ('/' + cur);
    }
    if (!fs.existsSync(pre)) {
      fs.mkdirSync(pre)
    }

    return pre;
  }, '/')

}

module.exports = myMk;
