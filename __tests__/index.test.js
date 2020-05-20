import path from 'path';
import compareResult from '../src/index.js';

const fs = require('fs');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let compareResultTxt;

beforeEach(() => {
  compareResultTxt = readFile('compareResult.txt').trim();
});

test('comparing flat json files', () => {
  expect(compareResult(getFixturePath('/recursive/beforeRecursive.json'), getFixturePath('/recursive/afterRecursive.json')).trim()).toEqual(compareResultTxt);
});

test('comparing flat yaml files', () => {
  expect(compareResult(getFixturePath('/recursive/beforeRecursive.yml'), getFixturePath('/recursive/afterRecursive.yml')).trim()).toEqual(compareResultTxt);
});

test('comparing flat ini files', () => {
  console.log(compareResult(getFixturePath('/recursive/beforeRecursive.ini'), getFixturePath('/recursive/afterRecursive.ini')).trim());
  expect(compareResult(getFixturePath('/recursive/beforeRecursive.ini'), getFixturePath('/recursive/afterRecursive.ini')).trim()).toEqual(compareResultTxt);
});
