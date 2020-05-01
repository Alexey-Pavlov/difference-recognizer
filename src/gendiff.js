import gendiff from 'commander';
import compareResult from './index.js';

const fs = require('fs');

gendiff
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<firstPath> <secondPath>')
  .option('-f, --format [type]', 'output format')
  .action((firstPath, secondPath) => {
    const before = fs.readFileSync(firstPath);
    const beforeObj = JSON.parse(before);
    const after = fs.readFileSync(secondPath);
    const afterObj = JSON.parse(after);
    compareResult(beforeObj, afterObj);
  });

export default gendiff;
