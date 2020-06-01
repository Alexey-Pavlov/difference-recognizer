const _ = require('lodash');

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
  });
  console.log(getLines(ast).join('\n'));
  return getLines(ast).join('\n');
};

export default renderPlain;
