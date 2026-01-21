import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@feature/(.*)$': '<rootDir>/src/app/features/$1',
    '^@environnement$': '<rootDir>/src/environments/environment.ts',
    '^@environnement/(.*)$': '<rootDir>/src/environments/$1',
  },
  transformIgnorePatterns: [
    // Certains packages sont ESM-only → on les laisse être transformés par Jest
    'node_modules/(?!(@angular|@jsverse|jest-preset-angular)/)',
  ],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/out-tsc/'],
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!src/**/*.module.ts'],
};

export default config;
