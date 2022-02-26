module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  // testEnvironment: 'node',
  coverageProvider: 'v8',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  coveragePathIgnorePatterns: ['protocols', 'domain']
}
