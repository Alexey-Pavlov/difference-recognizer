import stylish from './renderRecursive.js';
import renderPlain from './renderPlain.js';

const changeFormatter = (diff, format) => {
  // if (format === 'recursive') {

  // }
  if (format === 'plain') {
    return renderPlain(diff);
  }
  return stylish(diff);
};

export default changeFormatter;
