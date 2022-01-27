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
    // Options for non headless: headless: false, slowMo: 500
    browser = await puppeteer.launch({});
  });

  afterAll(async () => browser.close());

  test('h1 loads correctly', async () => {
    const page = await browser.newPage();

    await page.goto(NEXT_PUBLIC_AUTH_URL);

    const html = await page.$eval('h1', (e) => e.innerHTML);

    expect(html).toBe('Welkom bij<span class="text-blue-600">&nbsp;Huisnieuws</span>');
  });
});
