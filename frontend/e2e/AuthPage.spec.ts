import { test, expect } from '@playwright/test'

test.describe('AdminPage Test Cases', () => {
  test('Should route to index-page when login succeeded', async ({ page }) => {
    await page.goto('http://localhost:3000/admin-page')
    await page.fill('input[type="email"]', 'heritakopoochan@i.softbank.jp') //メールアドレスを入力
    await page.fill('input[type="password"]', 'test') //パスワードを入力
    await page.click('button[type=submit]')

    await page.waitForNavigation()
    await expect(page).toHaveURL('http://localhost:3000')
    await expect(page.locator('data-test-id=page-name')).toContainText(
      'blog page'
    )
  })
})
