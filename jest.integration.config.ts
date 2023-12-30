import jestBaseConfig from "./jest.config"

export default {
  ...jestBaseConfig,
  testMatch: ['**/*.integration-spec.ts']
};
