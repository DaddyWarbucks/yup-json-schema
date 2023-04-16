import { SchemaDescription } from 'yup';
import { Converter, Meta } from '../types';
import commonConverter from './common';

type TupleDescription = SchemaDescription & {
  innerType: [SchemaDescription, SchemaDescription];
};

const tupleConverter: Converter = (
  description: TupleDescription,
  converters
) => {
  const jsonSchema = commonConverter(description, converters);
  const meta: Meta = description.meta || {};

  jsonSchema.type = 'array';

  jsonSchema.items = description.innerType.map((description) => {
    return commonConverter(description, converters);
  });

  jsonSchema.minItems = jsonSchema.items.length;
  jsonSchema.maxItems = jsonSchema.items.length;

  return Object.assign(jsonSchema, meta.jsonSchema);
};

export default tupleConverter;
