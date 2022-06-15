let page;

let getBeforeFunction = (link) => {
  return async () => {
    page = await browser.newPage();
    await page.goto(link);
  }
}

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
beforeEach(getBeforeFunction('https://github.com/team'));
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
  beforeEach(getBeforeFunction('https://github.com/marketplace'));
  test("page of pull requests", async () => {
    const pageTitle = await page.$eval("h1", h1 => h1.textContent);
    expect(pageTitle).toEqual('Extend GitHub');
  }, 60000);
  test("The h1 header content'", async () => {
    const secondLink = await page.$("main div div div a");
    await secondLink.click();
    await page.waitForSelector('h1');
    const title3 = await page.$eval("h1", h1 => h1.textContent);
    expect(title3).toEqual('Free');
  }, 60000);
  test("The link correct", async () => {
    const thirdLink = await page.$("footer div ul li a");
    await thirdLink.click();
    await page.waitForSelector('head');
    const title4 = await page.title();
    expect(title4).toEqual('Features | GitHub · GitHub');
  }, 60000);
});