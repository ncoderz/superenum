module.exports = {
  // testEnvironment: require.resolve('jest-environment-node'),
  // transformIgnorePatterns: [],
  // modulePathIgnorePatterns: [],

  // setupFiles: ['core-js'],

  testEnvironment: 'node',
  verbose: true,
  testTimeout: 50000,
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: true,
        isolatedModules: true, // Disable type-checking, otherwise cannot run many error cases
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  reporters: ['default', [require.resolve('jest-junit'), { output: '<rootDir>/junit.xml' }]],
  collectCoverageFrom: ['src/**/*.{js,ts}', '!<rootDir>/node_modules/', '!<rootDir>/path/to/dir/'],
};
