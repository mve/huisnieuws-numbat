import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
import * as path from 'path';

let browser;

const envPath = path.join(__dirname, '../../.env.local');
dotenv.config({ path: envPath });
const { NEXT_PUBLIC_AUTH_URL, GOOGLE_USER_EMAIL, GOOGLE_USER_PASSWORD } = process.env;

describe('Profile Test', () => {
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

  it('should render the home page and login and go to the profile page.', async () => {
    // go to index page
    const page = await browser.newPage();
    await page.goto(`${NEXT_PUBLIC_AUTH_URL}/`);

    // wait for and go to login page
    await page.waitForSelector('#navbar-login-button');
    const loginNavbarNode = await page.evaluate(() => document.querySelector('#navbar-login-button').innerHTML);
    expect(loginNavbarNode).toBeDefined();
    await page.click('#navbar-login-button');

    // wait for and go to google oauth
    await page.waitForSelector('#login-provider-button');
    const loginGoogleNode = await page.evaluate(() => document.querySelector('#login-provider-button').innerHTML);
    expect(loginGoogleNode).toBeDefined();
    await page.click('#login-provider-button');

    // enter email and press enter
    await page.waitForNavigation();
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', GOOGLE_USER_EMAIL);
    await page.keyboard.press('Enter');

    // enter password and press enter
    await page.waitForNavigation();
    await page.waitForTimeout(500);
    await page.waitForSelector('input[type="password"]');
    await page.type('input[type="password"]', GOOGLE_USER_PASSWORD);
    await page.keyboard.press('Enter');

    // check if page is profiel page
    await page.waitForNavigation();
    await page.waitForSelector('#profile-button');
    await page.waitForTimeout(200);
    const profileButtonNode = await page.evaluate(() => document.querySelector('#profile-button').innerHTML);
    expect(profileButtonNode).toBeDefined();

    // click on button and check outcome
    await page.click('#profile-button');
    await page.waitForTimeout(500);
    const profileButtonText = await page.evaluate(() => document.querySelector('#profile-button').textContent);
    await page.waitForTimeout(200);
    expect(profileButtonText).toBe('Aanvraag in behandeling');
  });
});
