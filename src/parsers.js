const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const parse = (pathOfFile) => {
  const file = fs.readFileSync(pathOfFile);
  if (path.extname(pathOfFile) === '.json') {
    const parsedObj = JSON.parse(file);
    return parsedObj;
  }
  if (path.extname(pathOfFile) === '.yml') {
    const parsedObj = yaml.safeLoad(file);
    return parsedObj;
  }
  return false;
};

export default parse;
