import stylish from './renderRecursive.js';
import renderPlain from './renderPlain.js';
import renderJSON from './renderJSON.js';

const format = (diff, formatName) => {
  if (formatName === 'plain') {
    return renderPlain(diff);
  }
  if (formatName === 'json') {
    return renderJSON(diff);
  }

  return stylish(diff);
};

export default format;
