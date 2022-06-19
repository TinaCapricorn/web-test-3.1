let page;

beforeEach(async () => {
  page = await browser.newPage();
});
afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto('https://github.com/team');
  });
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 60000);
  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 60000);
  
  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 60000);
});

describe("Github another page tests", () => {
  test("page of pull requests", async () => {
    await page.goto('https://github.com/marketplace');
    const title4 = await page.title();
    expect(title4).toEqual('GitHub Marketplace · to improve your workflow · GitHub');
}, 60000);
  test("The h1 header content'", async () => {
    await page.goto('https://github.com/topics');
    const title5 = await page.title();
    expect(title5).toEqual('Topics on GitHub · GitHub');
  }, 60000);
  test("The link correct", async () => {
    await page.goto('https://docs.github.com/en/site-policy/github-terms/github-terms-of-service');
    const title6 = await page.title();
    expect(title6).toEqual('GitHub Terms of Service - GitHub Docs');
  }, 60000);
});