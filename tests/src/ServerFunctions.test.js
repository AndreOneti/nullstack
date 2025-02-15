const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:6969/server-functions');
});

describe('ServerFunctions', () => {

  test('instance can use returned values', async () => {
    await page.click('.set-count-to-one');
    await page.waitForSelector('[data-count="1"]');
    const element = await page.$('[data-count="1"]');
    expect(element).toBeTruthy();
  });

  test('server functions accept an object as argument', async () => {
    await page.click('.set-count-to-two');
    await page.waitForSelector('[data-count="2"]');
    const element = await page.$('[data-count="2"]');
    expect(element).toBeTruthy();
  });

  test('server functions serialize and deserialize dates', async () => {
    await page.click('.set-date');
    await page.waitForSelector('[data-year="1992"]');
    const element = await page.$('[data-year="1992"]');
    expect(element).toBeTruthy();
  });

  test('server functions have access to node.js environment', async () => {
    await page.waitForSelector(`[data-statement="// server function works"]`);
    const element = await page.$(`[data-statement="// server function works"]`);
    expect(element).toBeTruthy();
  });

  test('server functions have access to fetch', async () => {
    await page.waitForSelector('[data-response="User-Agent: *"]');
    const element = await page.$('[data-response="User-Agent: *"]');
    expect(element).toBeTruthy();
  });

  test('isomorphic imports stay in the client', async () => {
    const element = await page.$('[data-client-only]');
    expect(element).toBeTruthy();
  });

  test('server functions can be invoked from the constructor constant on server', async () => {
    await page.waitForSelector('[data-double-plus-one-server]');
    const element = await page.$('[data-double-plus-one-server]');
    expect(element).toBeTruthy();
  });

  test('server functions can be invoked from the constructor constant on client', async () => {
    await page.waitForSelector('[data-double-plus-one-client]');
    const element = await page.$('[data-double-plus-one-client]');
    expect(element).toBeTruthy();
  });

});

afterAll(async () => {
  browser.close();
});