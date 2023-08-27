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
    '<rootDir>/node_modules/(?!(@patternfly/react-core/|@patternfly/react-icons/|@redhat-cloud-services|@openshift|lodash-es|@patternfly/react-table|@patternfly/react-tokens|p-all)).*$',
  ],
  testEnvironment: 'jsdom',
  moduleDirectories: [
    'node_modules',
    './src', //the root directory
  ],
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
};
