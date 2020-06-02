import stylish from './renderRecursive.js';
import renderPlain from './renderPlain.js';
import renderJSON from './renderJSON.js';

const chooseFormatter = (diff, format) => {
  if (format === 'plain') {
    return renderPlain(diff);
  }
  if (format === 'json') {
    return renderJSON(diff);
  }
  return stylish(diff);
};

export default chooseFormatter;
