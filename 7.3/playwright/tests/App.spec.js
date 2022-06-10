const { test, expect } = require("@playwright/test");
const loginData = require("../user.js");

test.setTimeout(120000);
test("successLogin", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill("[name=email]", loginData.mail);
  await page.fill("[name=password]", loginData.pass);
  await page.locator("data-testid=login-submit-btn").click();
  await expect(page).toHaveURL("https://netology.ru/profile");
  await page.waitForTimeout(5000);
  await expect(page.locator(".components-pages-Profile-Programs--title--3JKZ1"))
    .toContainText("Мои курсы и профессии");
});
test("failLogin", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill("[name=email]", loginData.mail);
  await page.fill("[name=password]", loginData.invalidPass);
  await page.locator("data-testid=login-submit-btn").click();
  await page.waitForTimeout(5000);
  await expect(page.locator("data-testid=login-error-hint"))
    .toContainText("Вы ввели неправильно логин или пароль");
});
