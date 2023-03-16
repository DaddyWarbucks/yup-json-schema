import { Converter, Meta } from '../types';
import commonConverter from './common';

const tupleConverter: Converter = (description, converters) => {
  const jsonSchema = commonConverter(description, converters);
  const meta: Meta = description.meta || {};

  jsonSchema.type = 'array';

  // TODO: Yup does not describe innerTypes of tuple
  // https://github.com/jquense/yup/issues/1891
  // console.log(description);
  // jsonSchema.items = [{ type: 'string' }];

  return Object.assign(jsonSchema, meta.jsonSchema);
};

export default tupleConverter;
