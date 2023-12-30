import jestBaseConfig from "./jest.config"

export default {
  ...jestBaseConfig,
  testMatch: ['**/*.unit-spec.ts']
};
