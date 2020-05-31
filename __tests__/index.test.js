import path from 'path';
import fs from 'fs';
import compareResult from '../src/index.js';


const getFixturePath = (filename) => path.join(__dirname, `__fixtures__/${filename}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let compareResultRecursive;
let compareResultPlain;
let compareResultJSON;

beforeEach(() => {
  compareResultRecursive = readFile('compareResultRecursive.txt');
  compareResultPlain = readFile('compareResultPlain.txt');
  compareResultJSON = readFile('compareResultJSON.txt');
});

test('comparing recursive json files', () => {
  expect(compareResult(getFixturePath('beforeRecursive.json'), getFixturePath('afterRecursive.json')).trim()).toEqual(compareResultRecursive);
});

test('comparing recursive yaml files', () => {
  expect(compareResult(getFixturePath('beforeRecursive.yml'), getFixturePath('afterRecursive.yml')).trim()).toEqual(compareResultRecursive);
});

test('comparing recursive ini files', () => {
  expect(compareResult(getFixturePath('beforeRecursive.ini'), getFixturePath('afterRecursive.ini')).trim()).toEqual(compareResultRecursive);
});

test('comparing recursive json files with plain format result', () => {
  expect(compareResult(getFixturePath('beforeRecursive.json'), getFixturePath('afterRecursive.json'), 'plain').trim()).toEqual(compareResultPlain);
});

test('comparing recursive yaml files with plain format result', () => {
  expect(compareResult(getFixturePath('beforeRecursive.yml'), getFixturePath('afterRecursive.yml'), 'plain').trim()).toEqual(compareResultPlain);
});

test('comparing recursive ini files with plain format result', () => {
  expect(compareResult(getFixturePath('beforeRecursive.ini'), getFixturePath('afterRecursive.ini'), 'plain').trim()).toEqual(compareResultPlain);
});

test('comparing recursive json files with JSON format result', () => {
  expect(compareResult(getFixturePath('beforeRecursive.json'), getFixturePath('afterRecursive.json'), 'json').trim()).toEqual(compareResultJSON);
});

test('comparing recursive yaml files with JSON format result', () => {
  expect(compareResult(getFixturePath('beforeRecursive.yml'), getFixturePath('afterRecursive.yml'), 'json').trim()).toEqual(compareResultJSON);
});

test('comparing recursive ini files with JSON format result', () => {
  expect(compareResult(getFixturePath('beforeRecursive.ini'), getFixturePath('afterRecursive.ini'), 'json').trim()).toEqual(compareResultJSON);
});
