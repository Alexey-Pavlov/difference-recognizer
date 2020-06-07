import path from 'path';
import fs from 'fs';
import compareResult from '../src/index.js';


const getFixturePath = (filename) => path.join(__dirname, `__fixtures__/${filename}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['json', 'recursive'], ['yml', 'recursive'], ['ini', 'recursive'],
  ['json', 'plain'], ['yml', 'plain'], ['ini', 'plain'],
  ['json', 'json'], ['yml', 'json'], ['ini', 'json']])(
  '%s', (type, format) => {
    const before = getFixturePath(`before.${type}`);
    const after = getFixturePath(`after.${type}`);
    const result = compareResult(before, after, format);
    const expected = readFile(`${format}.txt`);
    expect(result).toEqual(expected);
  },
);
