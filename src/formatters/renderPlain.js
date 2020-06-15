const propertyValues = {
  string: (value) => `'${value}'`,
  number: (value) => value,
  object: () => '[complex value]',
  boolean: (value) => value,
};

const getValue = (value) => propertyValues[typeof value](value);

const renderPlain = (ast) => {
  const iter = (nodes, path = '') => nodes.map((key) => {
    switch (key.status) {
      case 'added':
        return `Property ${path}${key.name} was added with value: ${getValue(key.value)}`;
      case 'removed':
        return `Property ${path}${key.name} was deleted`;
      case 'changed':
        return `Property ${path}${key.name} was changed from ${getValue(key.value.old)} to ${getValue(key.value.new)}`;
      case 'notChanged':
        return null;
      case 'nested':
        return `${iter(key.children, `${path}${key.name}.`).filter((node) => node !== null).join('\n')}`;
      default:
        throw new Error(`${key.status} is unknown. Possible statuses: added, removed, notChanged, changed, nested.`);
    }
  });

  return iter(ast).join('\n');
};

export default renderPlain;
