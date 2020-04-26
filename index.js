import program from 'commander';
import { version, description } from './package.json';

program
  .description(description)
  .version(version);

export default program;
