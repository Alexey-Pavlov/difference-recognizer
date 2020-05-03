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
  expect(compareResult(getFixturePath('before.json'), getFixturePath('after.json')).trim()).toEqual(compareResultTxt);
});

test('comparing flat yaml files', () => {
  expect(compareResult(getFixturePath('before.yml'), getFixturePath('after.yml')).trim()).toEqual(compareResultTxt);
});

test('comparing flat ini files', () => {
  expect(compareResult(getFixturePath('before.ini'), getFixturePath('after.ini')).trim()).toEqual(compareResultTxt);
});
