const puppeteer = require('puppeteer');

let browser;

beforeAll(async () => {
  browser = await puppeteer.launch();
});

describe('RoutesAndParams /routes-and-params', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/routes-and-params');
  });

  test('router has a base key', async () => {
    const element = await page.$('[data-base="http://localhost:6969"]');
    expect(element).toBeTruthy();
  });

  test('is part of the client environment', async () => {
    const element = await page.$('[data-router]');
    expect(element).toBeTruthy();
  });

  test('routes match once per depth', async () => {
    const element = await page.$('[data-route="/routes-and-params"]');
    expect(element).toBeTruthy();
  });

  test('entering a route stops other routes on same depth', async () => {
    const element = await page.$('[data-other]');
    expect(element).toBeFalsy();
  });

  test('params keys return empty keys by default', async () => {
    const element = await page.$('[data-empty]');
    expect(element).toBeTruthy();
  });

  test('a tags can generate the href from params', async () => {
    const element = await page.$('[href="/routes-and-params?framework=nullstack"]');
    expect(element).toBeTruthy();
  });

  test('assignments to params convert the value to JSON', async () => {
    await page.click('[data-params]');
    await page.waitForSelector('[data-date="1992-10-16T00:00:00.000Z"]');
    const element = await page.$('[data-date="1992-10-16T00:00:00.000Z"]');
    expect(element).toBeTruthy();
  });

});

describe('RoutesAndParams /routes-and-params/a', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/routes-and-params');
    await page.click('[href="/routes-and-params/a"]');
    await page.waitForSelector('[data-a]');
  });

  test('a tags update the router url', async () => {
    const element = await page.$('[data-a]');
    expect(element).toBeTruthy();
  });

  test('a custom event is triggered when the url changes', async () => {
    const element = await page.$('[data-event-triggered]');
    expect(element).toBeTruthy();
  });

  test('params are available when coming from external', async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/');
    await page.click('[href="/routes-and-params/a"]');
    await page.waitForSelector('[data-hydrated-param]');
    const element = await page.$('[data-hydrated-param]');
    expect(element).toBeTruthy();
  });

});

describe('RoutesAndParams /routes-and-params/?boolean=true', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/routes-and-params/?boolean=true');
  });

  test('params with value of true are converted to boolean', async () => {
    const element = await page.$('[data-boolean]');
    expect(element).toBeTruthy();
  });

  test('a tags can assign directly to path', async () => {
    const element = await page.$('[href="/routes-and-params/d?boolean=true"]');
    expect(element).toBeTruthy();
  });

  test('router url removes the leading slash', async () => {
    const element = await page.$('[data-url="/routes-and-params?boolean=true"]');
    expect(element).toBeTruthy();
  });

  test('router path removes the leading slash', async () => {
    const element = await page.$('[data-path="/routes-and-params"]');
    expect(element).toBeTruthy();
  });

});

describe('RoutesAndParams /routes-and-params?boolean=false', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/routes-and-params?boolean=false');
  });

  test('params with value of false are converted to boolean', async () => {
    const element = await page.$('[data-boolean]');
    expect(element).toBeFalsy();
  });

});

describe('RoutesAndParams /routes-and-params/c', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/routes-and-params/c');
  });

  test('wildcards are matched last', async () => {
    const element = await page.$('[data-id="c"]');
    expect(element).toBeTruthy();
  });

  test('dynamic segments are assigned to params', async () => {
    const element = await page.$('[data-id="c"]');
    expect(element).toBeTruthy();
  });

});

describe('RoutesAndParams /routes-and-params/c', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/routes-and-params/c/a');
  });

  test('wildcards can be prefixed', async () => {
    const element = await page.$('[data-wildcard]');
    expect(element).toBeTruthy();
  });

});

describe('RoutesAndParams /routes-and-params/d?boolean=true#hash ssr', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/routes-and-params/d?boolean=true#hash');
  });

  test('hash is not part of the router url', async () => {
    const element = await page.$('[data-url="/routes-and-params/d?boolean=true"]');
    expect(element).toBeTruthy();
  });

  test('hash is not part of the router path', async () => {
    const element = await page.$('[data-path="/routes-and-params/d"]');
    expect(element).toBeTruthy();
  });

});

describe('RoutesAndParams /routes-and-params/d?boolean=true#hash spa', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/routes-and-params/d?boolean=true#hash');
    await page.click('[href="/routes-and-params/no-hash#hash"]');
    await page.waitForSelector('[data-url="/routes-and-params/no-hash"]');
  });

  test('hash is not part of the router url', async () => {
    const element = await page.$('[data-url="/routes-and-params/no-hash"]');
    expect(element).toBeTruthy();
  });

  test('hash is not part of the router path', async () => {
    const element = await page.$('[data-path="/routes-and-params/no-hash"]');
    expect(element).toBeTruthy();
  });

});

describe('RoutesAndParams /routes-and-params', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/routes-and-params');
  });

  test('a with absolute hrefs cause a hard redirect', async () => {
    await page.click('[href="https://nullstack.app"]');
    await page.waitForSelector('[href="/contributors"]');
    const url = await page.url();
    expect(url).toMatch('https://nullstack.app');
  });

});

describe('RoutesAndParams /routes-and-params', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/routes-and-params');
  });

  test('a with absolute hrefs cause a hard redirect', async () => {
    await page.click('[data-absolute]');
    await page.waitForSelector('[href="/contributors"]');
    const url = await page.url();
    expect(url).toMatch('https://nullstack.app');
  });

});

describe('RoutesAndParams /routes-and-params?previous=true', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/routes-and-params?previous=true');
  });

  test('router previous key starts null', async () => {
    const element = await page.$('[data-previous="null"]');
    expect(element).toBeTruthy();
  });

  test('router previous is assigned with the old router url when route updates', async () => {
    await page.click('[href="/routes-and-params?framework=nullstack"]');
    await page.waitForSelector('[data-previous="/routes-and-params?previous=true"]');
    const element = await page.$('[data-previous="/routes-and-params?previous=true"]');
    expect(element).toBeTruthy();
  });

});

afterAll(async () => {
  browser.close();
});