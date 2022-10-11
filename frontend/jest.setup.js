// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

// routerのモック
// https://github.com/scottrippey/next-router-mock#dynamic-routes
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/dist/client/router', () => require('next-router-mock'))
