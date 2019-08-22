const puppeteer = require('puppeteer');
const faker =  require("faker");

const APP = "http://localhost:3000/";

// use fake date with Faker package
const lead = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
};

let page;
let browser;
const width = 1920;
const height = 1080;

// before all tests run
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

// start testing
describe("Contact form", () => {
  test("lead can submit a contact request", async () => {
    await page.goto(APP);
    await page.waitForSelector("form");
    await page.click("input[name=name]");
    await page.type("input[name=name]", lead.name);
    await page.click("input[name=email]");
    await page.type("input[name=email]", lead.email);
  }, 16000);

  
});

describe("Page headers", () => {
  test("assert that main title contains the correct text", async () => {
    const mainTitleText = await page.$eval("title", el => el.textContent);
    expect(mainTitleText).toEqual("React App");
  });
});

describe("Navigation", () => {
  test("assert that a div named navbar exists", async () => {
    const navbar = await page.$eval("nav", el => (el ? true : false));
    expect(navbar).toBe(true);
  });
});

describe("SEO", () => {
  test("canonical must be present", async () => {
    await page.goto(`${APP}`);
    const canonical = await page.$eval("link[rel=canonical]", el => el.href);
    expect(canonical).toEqual("https://do_something.com/");
  });
});

describe("CSS & JS coverage", () => {
  test("canonical must be present", async () => {
    // Enable both JavaScript and CSS coverage
    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage()
    ]);
    // Navigate to page
    await page.goto(APP);
    // Disable both JavaScript and CSS coverage
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);
    let totalBytes = 0;
    let usedBytes = 0;
    const coverage = [...jsCoverage, ...cssCoverage];
    for (const entry of coverage) {
      totalBytes += entry.text.length;
      for (const range of entry.ranges)
        usedBytes += range.end - range.start - 1;
    }
    console.log(`Bytes used: ${usedBytes / totalBytes * 100}%`);
  });
});
// end testing

// after all tests are finished
afterAll( async () => {
  await browser.close();
});