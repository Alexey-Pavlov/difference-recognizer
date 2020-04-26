import gendiff from 'commander';

gendiff
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format');

export default gendiff;
