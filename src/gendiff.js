import gendiff from 'commander';
import compareResult from './index.js';

gendiff
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<firstPath> <secondPath>')
  .option('-f, --format [type]', 'output format')
  .action((firstPath, secondPath) => {
    compareResult(firstPath, secondPath);
  });

export default gendiff;
