const fs = require('fs');

const readLines = (__filepath) => {
  try {
    let array = fs.readFileSync(__filepath).toString().split('\n');
    return array;
  } catch (e) {
    console.error(`Error occured : Cannot read file ${__filepath}`);
    return [];
  }
};

module.exports = {
  readLines,
};
