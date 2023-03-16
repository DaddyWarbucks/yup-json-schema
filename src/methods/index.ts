/* eslint-disable @typescript-eslint/no-unused-vars */

import { AnySchema } from 'yup';
import { JsonSchemaCallback } from '../types';

type YupParams = {
  addMethod: any;
  Schema: any;
};

declare module 'yup' {
  interface ArraySchema<TIn, TContext, TDefault, TFlags> {
    example(example: any): this;
    examples(examples: any[]): this;
    description(description: string): this;
    jsonSchema(callback: JsonSchemaCallback): this;
  }
  interface BooleanSchema<TType, TContext, TDefault, TFlags> {
    example(example: any): this;
    examples(examples: any[]): this;
    description(description: string): this;
    jsonSchema(callback: JsonSchemaCallback): this;
  }
  interface DateSchema<TType, TContext, TDefault, TFlags> {
    example(example: any): this;
    examples(examples: any[]): this;
    description(description: string): this;
    jsonSchema(callback: JsonSchemaCallback): this;
  }
  interface LazySchema<TType, TContext, TDefault, TFlags> {
    example(example: any): this;
    examples(examples: any[]): this;
    description(description: string): this;
    jsonSchema(callback: JsonSchemaCallback): this;
  }
  interface MixedSchema<TType, TContext, TDefault, TFlags> {
    example(example: any): this;
    examples(examples: any[]): this;
    description(description: string): this;
    jsonSchema(callback: JsonSchemaCallback): this;
  }
  interface NumberSchema<TType, TContext, TDefault, TFlags> {
    example(example: any): this;
    examples(examples: any[]): this;
    description(description: string): this;
    jsonSchema(callback: JsonSchemaCallback): this;
  }
  interface ObjectSchema<TIn, TContext, TDefault, TFlags> {
    example(example: any): this;
    examples(examples: any[]): this;
    description(description: string): this;
    jsonSchema(callback: JsonSchemaCallback): this;
  }
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    example(example: any): this;
    examples(examples: any[]): this;
    description(description: string): this;
    jsonSchema(callback: JsonSchemaCallback): this;
  }
  interface TupleSchema<TType, TContext, TDefault, TFlags> {
    example(example: any): this;
    examples(examples: any[]): this;
    description(description: string): this;
    jsonSchema(callback: JsonSchemaCallback): this;
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
