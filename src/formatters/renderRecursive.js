const _ = require('lodash');

const getIndentation = (depth) => '  '.repeat(depth);

const stringify = (value, depth) => {
  if (typeof value === 'object') {
    const lines = Object.keys(value).map((key) => `${getIndentation(depth + 4)}${key}: ${value[key]}\n`);
    return `{\n${lines}${getIndentation(depth + 2)}}`;
  }
  return value;
};

const stylish = (ast) => {
  const getLines = (nodes, depth = 0) => _.keys(nodes).map((key) => {
    const { children, value, status } = nodes[key];

    if (children !== undefined) {
      return `${getIndentation(depth + 2)}${key}: {\n${_.flatten(getLines(children, depth + 2))
        .join('\n')}\n${getIndentation(depth + 2)}}`;
    }

    const line = {
      added: `+ ${key}: ${stringify(value, depth)}`,
      removed: `- ${key}: ${stringify(value, depth)}`,
      notChanged: `  ${key}: ${stringify(value, depth)}`,
      changed: [`+ ${key}: ${stringify(value.new, depth)}\n${getIndentation(depth + 1)}- ${key}: ${stringify(value.old, depth)}`],
    };
    return `${getIndentation(depth + 1)}${line[status]}`;
  });

  const lines = ((getLines(ast))).join('\n');
  console.log(`{\n${lines}\n}`);
  return `{\n${lines}\n}`;
};

export default stylish;
