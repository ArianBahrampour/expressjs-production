/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  set: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,

  modulePaths: ["./src"],
  moduleDirectories: ['node_modules', 'src']
};