// import * as _ from 'lodash';

const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const ini = require('ini');

// const processIni = (iniObj) => {
//   const iter = (value) => {
//     if (!_.isPlainObject(value)) {
//       return parseInt(value, 10) || value;
//     }
//     return processIni(value);
//   };
//   const parsedEntries = Object.entries(iniObj).map(([key, value]) => [key, iter(value)]);
//   console.log('PARSED ENTRIES');
//   console.log(parsedEntries);
//   return Object.fromEntries(parsedEntries);
// };

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
