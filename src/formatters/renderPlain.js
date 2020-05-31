const _ = require('lodash');

// const valueCheck = (value) => {
//   if (typeof value === 'object') {
//     return '[complex value]';
//   }
//   return value;
// };

const propertyValues = {
  string: (value) => `'${value}'`,
  number: (value) => value,
  object: () => '[complex value]',
  boolean: (value) => value,
};

const getValue = (value) => propertyValues[typeof value](value);

const renderPlain = (ast) => {
  const getLines = (nodes, path = '') => _.keys(nodes).map((key) => {
    const { children, value, status } = nodes[key];
    // console.log('<<STATUS>>');
    // console.log(status);
    // if (children !== undefined) {
    //   return `${_.flatten(getLines(children, `${key}.${path}`))
    //     .join('')}`;
    // }
    switch (status) {
      case 'added':
        return `Property ${path}${key} was added with value: ${getValue(value)}`;
      case 'removed':
        return `Property ${path}${key} was deleted`;
      case 'changed':
        return `Property ${path}${key} was changed from ${getValue(value.old)} to ${getValue(value.new)}`;
      case 'nested':
        return `${getLines(children, `${path}${key}.`).filter((node) => node !== null).join('\n')}`;
      default:
        return null;
    }
    // const line = {
    //   added: `Property ${path}${key} was added with value: ${valueCheck(value)}\n`,
    //   removed: `Property ${path}${key} was deleted \n`,
    //   changed: `Property ${path}${key} was changed from ${value.new} to ${value.old}\n`,
    //   // changed: [`+ ${key}: ${stringify(value.new, path)}\n
    //      ${getIndentation(path)}- ${key}: ${stringify(value.old, path)}`],
    // };
    // console.log('<<LINE>>');
    // console.log(line);
    // console.log('<<LINE[STATUS]>>');
    // console.log(line[status]);
    // return `${line[status]}`;
  });
  // console.log('<<<AST>>>');
  // console.log(stylish(ast));
  console.log(getLines(ast).join('\n'));
  return getLines(ast).join('\n');
};

export default renderPlain;
