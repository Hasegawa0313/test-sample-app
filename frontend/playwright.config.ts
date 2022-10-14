import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  use: {
    baseURL: process.env.NEXT_PUBLIC_FRONT_URL || 'http://localhost:3000'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  webServer: [
    {
      command: 'yarn dev',
      port: 3000
    },
    {
      cwd: '../api',
      command: 'yarn dev',
      port: 4000
    }
  ]
}

export default config
