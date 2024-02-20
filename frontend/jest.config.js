module.exports = {
  // Indicates that the root of the project is in the src/ directory
  roots: ['<rootDir>/src'],

  // Jest transformations -- this adds support for TypeScript using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Module file extensions for importing modules
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Test environment setup
  testEnvironment: 'jsdom',

  // Test match patterns
  testMatch: ['**/__tests__/**/*.test.tsx', '**/?(*.)+(spec|test).tsx'],

  // Jest module name mapper
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Collect coverage information
  collectCoverage: true,

  // Coverage report directory
  coverageDirectory: 'coverage',

  // List of paths that Jest will search for modules
  modulePaths: ['<rootDir>/src'],

  // Jest configuration for TypeScript
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
