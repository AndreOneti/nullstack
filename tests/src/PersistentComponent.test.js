const puppeteer = require('puppeteer');

let browser;

beforeAll(async () => {
  browser = await puppeteer.launch();
});


describe('PersistentComponent instantiated', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/persistent-component/a');
  });

  test('components should create a new instance when matching a dynamic segment', async () => {
    await page.waitForSelector('[data-key="PersistentComponent/0-0-33/persistent-component/a"]');
    const element = await page.$('[data-key="PersistentComponent/0-0-33/persistent-component/a"]');
    expect(element).toBeTruthy();
  });

});

describe('PersistentComponent terminated', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/persistent-component/a');
    await page.waitForSelector('[href="/persistent-component/b"]');
    await page.click('[href="/persistent-component/b"]');
    await page.waitForSelector('[data-key="PersistentComponent/0-0-33/persistent-component/b"]');
  });

  test('components should call terminate when leaving the dom', async () => {
    await page.waitForSelector('[data-a-count="1"]');
    const element = await page.$('[data-a-count="1"]');
    expect(element).toBeTruthy();
  });

  test('persistent instanes should stay on instances context when leaving the dom', async () => {
    await page.waitForSelector('[data-a-count="1"]');
    const element = await page.$('[data-a-count="1"]');
    expect(element).toBeTruthy();
  });

});

describe('PersistentComponent reinstantiated', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/persistent-component/a');
    await page.waitForSelector('[href="/persistent-component/b"]');
    await page.click('[href="/persistent-component/b"]');
    await page.waitForSelector('[data-key="PersistentComponent/0-0-33/persistent-component/b"]');
    await page.click('[href="/persistent-component/a"]');
    await page.waitForSelector('[data-key="PersistentComponent/0-0-33/persistent-component/a"]');
  });

  test('components should not be prepared a second time', async () => {
    await page.waitForSelector('[data-count="2"]');
    const element = await page.$('[data-count="2"]');
    expect(element).toBeTruthy();
  });

  test('components should not be initiated a second time', async () => {
    await page.waitForSelector('[data-count="2"]');
    const element = await page.$('[data-count="2"]');
    expect(element).toBeTruthy();
  });

  test('components should call hydrate when reinstantiated', async () => {
    await page.waitForSelector('[data-count="2"]');
    const element = await page.$('[data-count="2"]');
    expect(element).toBeTruthy();
  });

  test('components should keep the old state', async () => {
    await page.waitForSelector('[data-count="2"]');
    const element = await page.$('[data-count="2"]');
    expect(element).toBeTruthy();
  });

});

afterAll(async () => {
  browser.close();
});

