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

  it('should render the articles page article card correctly', async () => {
    const page = await browser.newPage();
    await page.goto(`${NEXT_PUBLIC_AUTH_URL}/`);
    const articleButton = await page.evaluate(() => document.querySelector('#article-btn').innerHTML);
    expect(articleButton).toBeDefined();
    await page.click('#article-btn');

    await page.waitForSelector('main a:first-child .tag-label');
    const tagsAmount = await page.evaluate(() => document.querySelectorAll('main a:first-child .tag-label').length);
    expect(tagsAmount).toBeGreaterThanOrEqual(2);

    await page.waitForSelector('main a:first-child h2');
    const title = await page.evaluate(() => document.querySelector('main a:first-child h2').innerHTML);
    expect(title).toBeDefined();

    await page.waitForSelector('main a:first-child .comments');
    const comments = await page.evaluate(() => document.querySelector('main a:first-child .comments').innerHTML);
    expect(comments).toBeDefined();

    await page.waitForSelector('main a:first-child .date-since');
    const date = await page.evaluate(() => document.querySelector('main a:first-child .date-since').innerHTML);
    expect(date).toBeDefined();

    await page.waitForSelector('main a:first-child .zipcode');
    const zipcode = await page.evaluate(() => document.querySelector('main a:first-child .zipcode').innerHTML);
    expect(zipcode).toBeDefined();

    await page.waitForSelector('main a:first-child .reach');
    const reach = await page.evaluate(() => document.querySelector('main a:first-child .reach').innerHTML);
    expect(reach).toBeDefined();
  });
});
