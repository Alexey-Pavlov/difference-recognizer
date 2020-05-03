import parse from './parsers.js';

const _ = require('lodash');

const compareResult = (firstPath, secondPath) => {
  const beforeObj = parse(firstPath);
  const afterObj = parse(secondPath);
  const allKeys = _.union(Object.keys(beforeObj), Object.keys(afterObj));
  const result = allKeys.reduce((acc, item) => {
    if ((!_.has(beforeObj, item)) && (_.has(afterObj, item))) {
      acc.push(`  + ${item}: ${afterObj[item]}`);
    } else if ((!_.has(afterObj, item)) && (_.has(beforeObj, item))) {
      acc.push(`  - ${item}: ${beforeObj[item]}`);
    } else if ((_.has(afterObj, item)) && (_.has(beforeObj, item))) {
      if (afterObj[item] !== beforeObj[item]) {
        acc.push(`  + ${item}: ${afterObj[item]}`);
        acc.push(`  - ${item}: ${beforeObj[item]}`);
      } else {
        acc.push(`    ${item}: ${afterObj[item]}`);
      }
    }
    return acc;
  }, []);
  const result2 = `{\n${result.join('\n')}\n}`;
  console.log(result2);
  return result2;
};

export default compareResult;
