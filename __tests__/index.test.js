import path from 'path';
import compareResult from '../src/index.js';

const fs = require('fs');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('comparing flat json files', () => {
  const compareResultTxt = readFile('compareResult.txt').trim();
  expect(compareResult('../before.json', '../after.json').trim()).toEqual(compareResultTxt);
});
