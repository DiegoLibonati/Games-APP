export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/tests_mocks/styleMock.js",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/src/tests_mocks/imageMock.js",
  },
  transformIgnorePatterns: ["node_modules/(?!@firebase)"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
};
