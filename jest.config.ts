import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  roots: ['<rootDir>/packages'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose: true,

  // 忽略的测试路径
  testPathIgnorePatterns: ['/node_modules/'],

  // 测试环境
  testEnvironment: 'node',

  // 模块路径别名
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/packages/core/src/$1',
    '^@email/(.*)$': '<rootDir>/packages/email/src/$1',
    '^@github/(.*)$': '<rootDir>/packages/github/src/$1',
    '^@types/(.*)$': '<rootDir>/packages/types/src/$1',
  },
};

export default config;