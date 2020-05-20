import parse from './parsers.js';

const _ = require('lodash');

const getIndentation = (depth) => '  '.repeat(depth);

const stringify = (value, depth) => {
  if (typeof value === 'object') {
    const lines = Object.keys(value).map((key) => `${getIndentation(depth + 4)}${key}: ${value[key]}\n`);
    return `{\n${lines}${getIndentation(depth + 2)}}`;
  }
  return value;
};

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
        return { ...acc, [key]: { children: getAst(valueFirst, valueSecond) } };
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

const stylish = (ast) => {
  const getLines = (nodes, depth = 0) => _.keys(nodes).map((key) => {
    const { children, value, status } = nodes[key];

    if (children !== undefined) {
      return `${getIndentation(depth + 2)}${key}: {\n${_.flatten(getLines(children, depth + 2))
        .join('\n')}\n${getIndentation(depth + 2)}}`;
    }

    const line = {
      added: `+ ${key}: ${stringify(value, depth)}`,
      removed: `- ${key}: ${stringify(value, depth)}`,
      notChanged: `  ${key}: ${stringify(value, depth)}`,
      changed: [`+ ${key}: ${stringify(value.new, depth)}\n${getIndentation(depth + 1)}- ${key}: ${stringify(value.old, depth)}`],
    };
    return `${getIndentation(depth + 1)}${line[status]}`;
  });

  const lines = ((getLines(ast))).join('\n');
  return `{\n${lines}\n}`;
};

const compareResult = (firstPath, secondPath) => {
  const beforeObj = parse(firstPath);
  const afterObj = parse(secondPath);
  console.log('<<<Before object>>>');
  console.log(beforeObj);
  console.log('<<<After object>>>');
  console.log(afterObj);

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
  console.log(stylish(ast));
  return stylish(ast);
};

export default compareResult;
