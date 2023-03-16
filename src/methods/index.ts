import { AnySchema } from 'yup';
import { JSONSchema7 } from 'json-schema';

type YupParams = {
  addMethod: any;
  Schema: any;
};

declare module 'yup' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    example(example: string): this;
    examples(examples: [any]): this;
    description(description: string): this;
    jsonSchema(description: { [key: string]: any }): this;
  }
}

function addMethod(yup: YupParams, name: string) {
  yup.addMethod(yup.Schema, name, function (value: any): AnySchema {
    const meta = this.describe().meta || {};
    return this.meta({
      ...meta,
      jsonSchema: {
        ...meta.jsonSchema,
        [name]: value
      }
    });
  });
}

type JsonSchemaCallback = (jsonSchema: JSONSchema7) => JSONSchema7;

export function extendSchema(yup: YupParams) {
  addMethod(yup, 'example');
  addMethod(yup, 'examples');
  addMethod(yup, 'description');

  yup.addMethod(
    yup.Schema,
    'jsonSchema',
    function (callback: JsonSchemaCallback): AnySchema {
      const meta = this.describe().meta || {};
      return this.meta({
        ...meta,
        jsonSchema: callback(meta.jsonSchema || {})
      });
    }
  );

  return yup;
}
