// const nextJest = require('next/jest')
import nextJest from 'next/jest'
import type { Config } from 'jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/components/$1',

    '^@/pages/(.*)$': '<rootDir>/pages/$1',

    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/gql/(.*)$': '<rootDir>/gql/$1',

    '\\.(css)$': '<rootDir>/node_modules/jest-css-modules'
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'clover',
    'json',
    'lcov',
    ['text', { file: 'report.txt' }]
  ]
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
