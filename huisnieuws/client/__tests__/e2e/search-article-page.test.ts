import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
import * as path from 'path';

const XPath = "//div[contains(@id, 'react-select-react-select-tagselector-listbox')]/div/div[contains(string(),";
let browser;

const envPath = path.join(__dirname, '../../.env.local');
dotenv.config({ path: envPath });
const { NEXT_PUBLIC_AUTH_URL } = process.env;

describe('Search article page test', () => {
  jest.setTimeout(90000);

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      defaultViewport: {
        width: 1200,
        height: 800,
      },
    });
  });

  afterAll(async () => browser.close());

  it('should render articles based on selector input', async () => {
    const page = await browser.newPage();
    await page.goto(`${NEXT_PUBLIC_AUTH_URL}`);

    await page.waitForSelector('input[type="text"]');
    await page.type('input[type="text"]', '2587GA');
    await page.click('#submit-zipcode');

    await page.waitForNavigation();

    await page.waitForSelector('.tag-selector');
    await page.click('.tag-selector');
    const elementSport = await page.waitForXPath(`${XPath} 'Sport')]`);
    await elementSport.click();

    await page.waitForSelector('.tag-selector');
    await page.click('.tag-selector');

    const errorMessage = await page.$eval('p', (e) => e.innerHTML);
    expect(errorMessage).toBe('Er zijn geen artikelen gevonden, probeer het later opnieuw.');

    await page.click('.css-xb97g8[aria-label="Remove Sport"]');

    await page.waitForSelector('.tag-selector');
    await page.click('.tag-selector');
    const elementVolksgezondheid = await page.waitForXPath(`${XPath} 'Volksgezondheid')]`);
    await elementVolksgezondheid.click();

    const elementCorona = await page.waitForXPath(`${XPath}  'Corona')]`);
    await elementCorona.click();

    await page.waitForSelector('.article-list');
    const articles = await page.evaluate(() => document.querySelector('.article-list').innerHTML);
    expect(articles).toBeTruthy();

    const elementPolitiek = await page.waitForXPath(`${XPath} 'Politiek')]`);
    await elementPolitiek.click();

    const elementError = await page.waitForXPath(`${XPath} 'Maximaal aantal tags geselecteerd')]`);
    expect(elementError).toBeTruthy();
  });
});
