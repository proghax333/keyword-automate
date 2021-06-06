const fs = require('fs');

const readLines = (__filepath) => {
  let array = fs.readFileSync(__filepath).toString().split('\n');
  return array;
};

module.exports = {
  readLines,
};
