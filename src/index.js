import _ from 'lodash';
import parse from './parsers.js';
import changeFormatter from './formatters/index';

const getAst = (objFirstFile, objSecondFile) => {
  const keysFiles = _.union(Object.keys(objFirstFile), Object.keys(objSecondFile)).sort();
  return keysFiles.reduce((acc, key) => {
    const valueFirst = objFirstFile[key];
    const valueSecond = objSecondFile[key];
    if (_.has(objFirstFile, key) && _.has(objSecondFile, key)) {
      if (valueFirst instanceof Object && valueSecond instanceof Object) {
        return { ...acc, [key]: { children: getAst(valueFirst, valueSecond), status: 'nested' } };
      }
      if (valueFirst === valueSecond) {
        return { ...acc, [key]: { value: valueFirst, status: 'notChanged' } };
      }
      return { ...acc, [key]: { value: { old: valueFirst, new: valueSecond }, status: 'changed' } };
    }
    if (!_.has(objFirstFile, key) && _.has(objSecondFile, key)) {
      return { ...acc, [key]: { value: valueSecond, status: 'added' } };
    }

    return { ...acc, [key]: { value: valueFirst, status: 'removed' } };
  }, {});
};

const compareResult = (firstPath, secondPath, format) => {
  const beforeObj = parse(firstPath);
  const afterObj = parse(secondPath);
  const ast = getAst(beforeObj, afterObj);
  return changeFormatter(ast, format);
};

export default compareResult;
