import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return ini.decode(data);
    default:
      throw new Error(`Unsupported type: '${type}'. Supported types: .json, .yml, .ini`);
  }
};

export default parse;
