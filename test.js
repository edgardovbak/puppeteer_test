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
    // headless: false,
    // slowMo: 10,
    // args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
// Create screenshot
describe('Screenshot', () => {
  test('Create screenshot', async () => {
    await page.goto(APP);
    await page.screenshot({path: 'app.png'});
    await page.pdf({path: 'app.pdf', format: 'A4'});
  });
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

// browser actions 
describe('browser Events', () => {

  test('targetchanged', async () => {
    await page.goto(APP);
    browser.on('targetchanged', async (target) => {
        console.log("browser event changed");
    });
  });

  test('targetdestroyed', () => {
    browser.on('targetdestroyed', async (target) => {
        console.log("browser event  destroyed");
    });
  });

  test('disconnected', async () => {
    let browser2 = await puppeteer.launch();
    await browser2.disconnect()
    browser2.on('disconnected', async (target) => {
        console.log("browser event disconnected");
    });
    await browser2.close();
  });

  test('targetcreated', () => {
    browser.on('targetcreated', async (target) => {
        console.log("browser event created");
    });
  });

  test('Methods', async () => {
    let n = await browser.browserContexts();
    // console.log(n);
    let user = await browser.userAgent();
    console.log(user);
  });
});

// Page
describe('Page Events', () => {
  test('close', async () => {
    let page2 = await browser.newPage();
    await page2.goto(APP);
    page2.close();
    page2.on('close', async => {
      console.log("Page event close");
    });
  });

  test('dom loaded', async () => {
    page.on('domcontentloaded', async () => {
      console.log("Page event domcontentloaded");
    })
  });

  test('load', async () => {
    page.on('load', async () => {
      console.log("Page event load");
    })
  });

  test('request', async () => {
    let browser3 = await puppeteer.launch();
    let page3 = await browser3.newPage();
    await page3.goto(APP);
    await page3.setRequestInterception(true);
    
    page3.on('request', async (request) => {
      console.log("Page event request");
      console.log(request.url(), request.resourceType(), request.method(), JSON.stringify(request.headers()));
      request.continue();
    })
    
    page3.on('response', async (response) => {
      console.log("Page event response");
      console.log(response.url(), response.status(), JSON.stringify(request.headers()));
      request.continue();
    })
    await page3.close();
    await browser3.close();
  });
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

// end testing

function sum(a,b) {
  return a + b;
}

// jest test list
describe.skip("Jest test list", () => {
  test("Test function return", async () => {
    expect(sum(3,5)).toBe(8);  // toBe use === 
  });

  test("Test function return", async () => {
    expect(sum(3,5)).not.toBe(10);  // toBe use === 
  });

  let equal = {something: 'Dou'}
  equal['something2'] = 2;
  test("Test object euqal", async () => {
    expect(equal).toEqual({something: 'Dou', something2: 2});  // used for objects
  });

  test("Test toBeNull", async () => {
    const empty = null;
    expect(empty).toBeNull();
    expect(empty).toBeDefined();
    expect(empty).not.toBeUndefined();
    expect(empty).not.toBeTruthy();
    expect(empty).toBeFalsy();
  });

  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

  test('Numbers', () => {
    const value = 7 + 3;
    expect(value).toBe(10);
    expect(value).not.toBe(11);
    expect(value).toEqual(10);
    expect(value).toBeGreaterThan(2);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(15);
    expect(value).toBeLessThanOrEqual(14.5);  
    const realNumber = 0.1 + 0.2;
    expect(realNumber).not.toBe(0.3);  
    expect(realNumber).toBeCloseTo(0.3);
  });

  test('Strings', () => {
    expect("Some simple string").not.toMatch(/U/);
    expect("Some simple string").toMatch(/simple/);
  });

  test('Array', () => {
    const list = [
      'test', 'some', 'real', 'array', 'for', 'example'
    ];
    expect(list).toContain('for');
  });

  function someErrorThrow() {
    throw new ConfigError('Something went wrong');
  }
  test('Exceptions', () => {
    expect(someErrorThrow).toThrow();
  });
});

describe.skip('Mock', () => {
  
  test('.mock', async () => {
    const mockTest = jest.fn();
    const a = new mockTest();
    const b = {};
    const bound = mockTest.bind(b);
    bound();

    expect(mockTest.mock.calls.length).toBe(2);

    console.log(mockTest.mock.instances);
  });
});

// after all tests are finished
afterAll( async () => {
  await browser.close();
});