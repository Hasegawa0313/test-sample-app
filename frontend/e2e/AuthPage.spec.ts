import { test, expect } from '@playwright/test'

test.describe('AdminPage Test Cases', () => {
  test('新規登録完了後、indexページに遷移する', async ({
    page,
    browserName
  }) => {
    await page.goto('http://localhost:3000/admin-page')
    await page.locator('data-testid=mode-change').click()
    if (browserName === 'chromium') {
      await page.fill('input[type="email"]', 'heritakopoochan+1@i.softbank.jp') //メールアドレスを入力
      await page.fill('input[type="text"]', 'testtest') //ユーザー名を入力
      await page.fill('input[type="password"]', 'test') //パスワードを入力
    } else if (browserName === 'firefox') {
      await page.fill('input[type="email"]', 'heritakopoochan+2@i.softbank.jp') //メールアドレスを入力
      await page.fill('input[type="text"]', 'testtest2') //ユーザー名を入力
      await page.fill('input[type="password"]', 'test2') //パスワードを入力
    } else {
      await page.fill('input[type="email"]', 'heritakopoochan+3@i.softbank.jp') //メールアドレスを入力
      await page.fill('input[type="text"]', 'testtest3') //ユーザー名を入力
      await page.fill('input[type="password"]', 'test3') //パスワードを入力
    }

    await page.click('button[type=submit]')

    await page.waitForNavigation()
    await expect(page).toHaveURL('http://localhost:3000')
    await expect(page.locator('data-test-id=page-name')).toContainText(
      'blog page'
    )
  })
  test('ログイン成功したら、indexページに遷移する', async ({ page }) => {
    await page.goto('http://localhost:3000/admin-page')
    await page.fill('input[type="email"]', 'heritakopoochan+1@i.softbank.jp') //メールアドレスを入力
    await page.fill('input[type="password"]', 'test') //パスワードを入力
    await page.click('button[type=submit]')

    await page.waitForNavigation()
    await expect(page).toHaveURL('http://localhost:3000')
    await expect(page.locator('data-test-id=page-name')).toContainText(
      'blog page'
    )
  })
})
