const _ = require('lodash');

const getIndent = (depth) => '  '.repeat(depth);

const stringify = (value, depth) => {
  if (typeof value !== 'object') {
    return value;
  }

  const lineBeginIndents = getIndent(depth + 2);
  const lineEndIndents = getIndent(depth + 1);
  const allKeys = _.keys(value);
  const lines = allKeys.map((key) => `${lineBeginIndents}  ${key}: ${value[key]}`);

  return `{\n${lines.join('\n')}\n${lineEndIndents}}`;
};

const stylish = (ast) => {
  const iter = (nodes, depth = 1) => nodes.map((key) => {
    const indents = getIndent(depth);
    const text = stringify(key.value, depth);

    switch (key.status) {
      case 'added':
        return `${indents}+ ${key.name}: ${text}`;
      case 'removed':
        return `${indents}- ${key.name}: ${text}`;
      case 'notChanged':
        return `${indents}  ${key.name}: ${text}`;
      case 'changed':
        return `${indents}+ ${key.name}: ${stringify(key.value.new, depth)}\n${indents}- ${key.name}: ${stringify(key.value.old, depth)}`;
      case 'nested':
        return `${indents}  ${key.name}: {\n${(iter(key.children, depth + 2))
          .join('\n')}\n${getIndent(depth + 1)}}`;
      default:
        throw new Error(`${key.status} is unknown. Possible statuses: added, removed, notChanged, changed, nested.`);
    }
  });

  return `{\n${(_.flattenDeep(iter(ast))).join('\n')}\n}`;
};


export default stylish;
