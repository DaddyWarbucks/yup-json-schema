import { tuple, string, array } from 'yup';
import { convertSchema } from '../src';

describe('tuple converter', () => {
  test('type', () => {
    expect(convertSchema(tuple([string(), array()]))).toStrictEqual({
      type: 'array'
    });
  });
});
