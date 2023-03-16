import { Converter, Meta } from '../types';
import commonConverter from './common';

/* lazy is kind on an intermediate type. If you call schema.describe() with any argument, even schema.describe({}) which this library does by default, then the lazy functions always try to resolve to their return types. Because we always call schema.describe({}) or schem.descrive(ResolveOptions) this is mostly unused but should still be here and return and empty type if it does exist in the schema description for some reason */
const lazyConverter: Converter = (description, converters) => {
  const jsonSchema = commonConverter(description, converters);
  const meta: Meta = description.meta || {};
  return Object.assign(jsonSchema, meta.jsonSchema);
};

export default lazyConverter;
