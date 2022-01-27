import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
import * as path from 'path';

let browser;

const envPath = path.join(__dirname, '../../.env.local');
dotenv.config({ path: envPath });
const { NEXT_PUBLIC_AUTH_URL, GOOGLE_USER_EMAIL, GOOGLE_USER_PASSWORD } = process.env;

describe('Comment Section Test', () => {
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

  it('should render the home page and login and go to the profile page. then place comment.', async () => {
    const page = await browser.newPage();
    await page.goto(`${NEXT_PUBLIC_AUTH_URL}/`);
    const articleButton = await page.evaluate(() => document.querySelector('#article-btn').innerHTML);
    expect(articleButton).toBeDefined();
    await page.click('#article-btn');

    await page.waitForSelector('main a:first-child');
    await page.click('main a:first-child');

    // wait for and go to login page
    await page.waitForSelector('#comment-login');
    const commentLoginNode = await page.evaluate(() => document.querySelector('#comment-login').innerHTML);
    expect(commentLoginNode).toBeDefined();
    await page.click('#comment-login');

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

    // Wait for login, navigate back to article detail page.
    await page.waitForNavigation();
    await page.goto(`${NEXT_PUBLIC_AUTH_URL}/artikelen/61b31cb283fa094a4b751250`);

    // Look for list of comments
    await page.waitForSelector('.comment-list');
    const commentListElement = await page.evaluate(() => document.querySelector('.comment-list').innerHTML);
    expect(commentListElement).toBeDefined();

    const newComment = `e2e test comment.`;

    const isDisabled = await page.$('button#submit-comment[disabled]') !== null;
    expect(isDisabled).toBeTruthy();

    // Type a comment
    await page.waitForSelector('#newComment');
    await page.type('#newComment', newComment);

    // check comment length counter
    const newCommentCounter = await page.evaluate(() => document.querySelector('#input-counter').innerHTML);
    expect(newCommentCounter).toEqual('383');

    // Submit the comment
    await page.click('#submit-comment');

    // Find the new comment
    const newlyPlacedComment = await page.evaluate(() => document.evaluate(`//div[contains(., '${newComment}')]`, document, null, XPathResult.ANY_TYPE, null));
    expect(newlyPlacedComment).toBeDefined();
  });
});
