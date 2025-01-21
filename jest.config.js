module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/**/stories/*'],
  coverageDirectory: './coverage/',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  roots: ['<rootDir>/src/'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@patternfly|@redhat-cloud-services|@openshift|lodash-es|uuid|p-all)).*$',
  ],
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
};
