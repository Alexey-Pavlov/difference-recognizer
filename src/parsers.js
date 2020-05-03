const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const ini = require('ini');

const parse = (pathOfFile) => {
  const file = fs.readFileSync(pathOfFile, 'utf-8');
  if (path.extname(pathOfFile) === '.json') {
    const parsedObj = JSON.parse(file);
    return parsedObj;
  }
  if (path.extname(pathOfFile) === '.yml') {
    const parsedObj = yaml.safeLoad(file);
    return parsedObj;
  }
  if (path.extname(pathOfFile) === '.ini') {
    const parsedObj = ini.decode(file);
    return parsedObj;
  }
  return false;
};

export default parse;
