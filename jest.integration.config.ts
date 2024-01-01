import jestBaseConfig from "./jest.config"

export default {
  ...jestBaseConfig,
  testMatch: ['**/*.int.spec.ts']
};
