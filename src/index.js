import parse from './parsers.js';
import changeFormatter from './formatters/index';

const _ = require('lodash');

const getAst = (objFirstFile, objSecondFile) => {
  const keysFiles = _.union(Object.keys(objFirstFile), Object.keys(objSecondFile)).sort();

  // console.log('<<<KEYS FILES>>>');
  // console.log(keysFiles);

  return keysFiles.reduce((acc, key) => {
    // console.log('<<Acc>>');
    // console.log(acc);
    // console.log('<<Key>>');
    // console.log(key);
    const valueFirst = objFirstFile[key];
    const valueSecond = objSecondFile[key];
    // console.log('<<Value First:>>');
    // console.log(valueFirst);
    // console.log('<<Value Second:>>');
    // console.log(valueSecond);
    if (_.has(objFirstFile, key) && _.has(objSecondFile, key)) {
      // console.log('PRE RECURSIVE!!!');
      if (valueFirst instanceof Object && valueSecond instanceof Object) {
        // console.log('RECURSIVE!!!');
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
  // console.log('<<<Before object>>>');
  // console.log(beforeObj);
  // console.log('<<<After object>>>');
  // console.log(afterObj);

  // const allKeys = _.union(Object.keys(beforeObj), Object.keys(afterObj));
  // console.log(allKeys);
  // const result = allKeys.reduce((acc, item) => {
  //   if ((!_.has(beforeObj, item)) && (_.has(afterObj, item))) {
  //     acc.push(`  + ${item}: ${afterObj[item]}`);
  //   } else if ((!_.has(afterObj, item)) && (_.has(beforeObj, item))) {
  //     acc.push(`  - ${item}: ${beforeObj[item]}`);
  //   } else if ((_.has(afterObj, item)) && (_.has(beforeObj, item))) {
  //     if (afterObj[item] !== beforeObj[item]) {
  //       acc.push(`  + ${item}: ${afterObj[item]}`);
  //       acc.push(`  - ${item}: ${beforeObj[item]}`);
  //     } else {
  //       acc.push(`    ${item}: ${afterObj[item]}`);
  //     }
  //   }
  //   return acc;
  // }, []);
  // const result2 = `{\n${result.join('\n')}\n}`;
  // console.log(result2);
  // return result2;
  const ast = getAst(beforeObj, afterObj);

  // console.log('<<<AST DIFF>>>');
  // console.log(ast);
  return changeFormatter(ast, format);
};

export default compareResult;
