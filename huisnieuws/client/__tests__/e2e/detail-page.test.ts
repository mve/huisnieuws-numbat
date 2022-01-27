import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
import * as path from 'path';

let browser;

const envPath = path.join(__dirname, '../../.env.local');
dotenv.config({ path: envPath });
const { NEXT_PUBLIC_AUTH_URL } = process.env;

describe('Homepage test', () => {
  jest.setTimeout(30000);

  beforeAll(async () => {
    browser = await puppeteer.launch({});
  });

  afterAll(async () => browser.close());

  it('should render the detail page items correctly', async () => {
    const page = await browser.newPage();
    await page.goto(`${NEXT_PUBLIC_AUTH_URL}/`);
    const articleButton = await page.evaluate(() => document.querySelector('#article-btn').innerHTML);
    expect(articleButton).toBeDefined();
    await page.click('#article-btn');
    await page.waitForSelector('main a:first-child');
    await page.click('main a:first-child');

    await page.waitForSelector('.tag-label');
    const tagsAmount = await page.evaluate(() => document.querySelectorAll('.tag-label').length);
    expect(tagsAmount).toBeGreaterThanOrEqual(2);

    await page.waitForSelector('h1');
    const title = await page.evaluate(() => document.querySelector('h1').innerHTML);
    expect(title).toBeDefined();

    await page.waitForSelector('#author');
    const author = await page.evaluate(() => document.querySelector('#author').innerHTML);
    expect(author.includes('Door:')).toBeTruthy();

    await page.waitForSelector('#date');
    const date = await page.evaluate(() => document.querySelector('#date').innerHTML);
    expect(date).toBeDefined();

    await page.waitForSelector('#zipcode');
    const zipcode = await page.evaluate(() => document.querySelector('#zipcode').innerHTML);
    expect(zipcode).toBeDefined();

    await page.waitForSelector('#reach');
    const reach = await page.evaluate(() => document.querySelector('#reach').innerHTML);
    expect(reach).toBeDefined();
  });
});
