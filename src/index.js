import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import changeFormatter from './formatters/index';

const getAst = (objFirstFile, objSecondFile) => {
  const keysFiles = _.union(Object.keys(objFirstFile), Object.keys(objSecondFile)).sort();
  return keysFiles.reduce((acc, key) => {
    const valueFirst = objFirstFile[key];
    const valueSecond = objSecondFile[key];
    if (!_.has(objSecondFile, key)) return { ...acc, [key]: { value: valueFirst, status: 'removed' } };
    if (!_.has(objFirstFile, key)) return { ...acc, [key]: { value: valueSecond, status: 'added' } };
    if (valueFirst instanceof Object && valueSecond instanceof Object) {
      return { ...acc, [key]: { children: getAst(valueFirst, valueSecond), status: 'nested' } };
    }
    if (valueFirst === valueSecond) {
      return { ...acc, [key]: { value: valueFirst, status: 'notChanged' } };
    }
    return { ...acc, [key]: { value: { old: valueFirst, new: valueSecond }, status: 'changed' } };
  }, []);
};

const compareResult = (firstPath, secondPath, format) => {
  const dataFirst = fs.readFileSync(firstPath, 'utf-8');
  const dataSecond = fs.readFileSync(secondPath, 'utf-8');

  const typeFirst = path.extname(firstPath);
  const typeSecond = path.extname(secondPath);

  const beforeObj = parse(dataFirst, typeFirst);
  const afterObj = parse(dataSecond, typeSecond);

  const ast = getAst(beforeObj, afterObj);
  return changeFormatter(ast, format);
};

export default compareResult;
