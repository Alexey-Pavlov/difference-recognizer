import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, type) => {
  if (type === '.json') {
    const parsedObj = JSON.parse(data);
    return parsedObj;
  }
  if (type === '.yml') {
    const parsedObj = yaml.safeLoad(data);
    return parsedObj;
  }
  if (type === '.ini') {
    const parsedObj = ini.decode(data);
    return parsedObj;
  }
  return false;
};

export default parse;
