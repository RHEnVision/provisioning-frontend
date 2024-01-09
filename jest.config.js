module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/**/stories/*'],
  coverageDirectory: './coverage/',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  roots: ['<rootDir>/src/'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@patternfly|@redhat-cloud-services|@openshift|lodash-es|p-all)).*$',
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
};
