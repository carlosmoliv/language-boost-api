import jestConfig from "./jest.config";

export default {
  ...jestConfig,
  // testEnvironment: "",
  testRegex: ".integration.test.ts$",
  setupFiles: ["<rootDir>/src/test/mongo/setup.ts"],
};
