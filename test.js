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
describe.skip('Screenshot', () => {
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

describe.skip("Accessibility", () => {
  test("Accessibility tree", async () => {
    const tree = await page.accessibility.snapshot();
    console.log(tree);
  });
});

// browser actions 
describe.skip('browser Events', () => {

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
    console.log("user = ",user);
  });
});

// Page
describe('Page Events', () => {
  test('request', async () => {
    await page.setRequestInterception(true);

    page.on('request', async (request) => {
      console.log("Page event request");
      console.log(request.url(), request.resourceType(), request.method(), JSON.stringify(request.headers()));
      request.continue();
    });
  });

  test('close', async () => {
    let page2 = await browser.newPage();
    await page2.goto(APP);
    page2.close();
    page2.on('close', async => {
      console.log("Page event close");
    });
  });

  test('dom loaded', async () => {
    await page.goto(APP);
    page.on('domcontentloaded', async () => {
      console.log("Page event domcontentloaded");
    })
  });

  test('load', async () => {
    page.on('load', async () => {
      console.log("Page event load");
    })
  });

  test('response', async () => {
    page.on('response', async (response) => {
      console.log("Page event response");
      console.log(response.url(), response.status(), JSON.stringify(response.headers()));
    });
  });
});

describe("Emulation", () => {
  test("assert that a div named navbar exists", async () => {
    const navbar = await page.$eval("nav", el => (el ? true : false));
    expect(navbar).toBe(true);
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
      const canonical = await page.$eval("link[rel=canonical]", el => el.href);
      expect(canonical).toEqual("https://do_something.com/");
  });
});

describe("Page selectors", () => {
  test("Page selectors", async () => {
    // await page.goto(APP);
    const selector = "h1";
    await page.waitForSelector(selector); 
    let tagInfo = await page.$eval(selector, el => el.innerHTML );
    console.log(tagInfo);

    const selectors = ".post h3";
    const selectorsHandle = await page.$(selectors);
    // await page.waitForSelector(selectors, { timeout: 10000 }); 
    let postTitle = await page.$$eval(selectors, el => el.map(item => item.textContent));
    console.log(postTitle);
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