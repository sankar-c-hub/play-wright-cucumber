const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login_page.js');
const JsonUtility = require('../utils/json_utility.js');
const BrowserActions = require('../common/browser_actions.js');
const ScreenshotUtil = require('../utils/screenshot_util.js');

Given('I have access to application', async function () {
  const url = JsonUtility.getConfigValue('url');
  const browserActions = new BrowserActions(this.page);
  await browserActions.open(url);
});

When('I click on birth pop up close button if displayed verify', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.clickIfVisible(loginPage.Birthpop, 5000);
});

When('I click on login icon', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.click(loginPage.loginicon);
});

When('I click on login button', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.click(loginPage.BeforeloginButton);
});

When('I click on login with email button', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.click(loginPage.loginwithEmailButton);
});

When('I enter username as {string} and password as {string}', async function (username, password) {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.type(loginPage.usernameInput, username);
  await browserActions.type(loginPage.passwordInput, password);
});

When('I enter email as {string} and password as {string}', async function (email, password) {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.type(loginPage.usernameInput, email);
  await browserActions.type(loginPage.passwordInput, password);
});

When('I click on login link', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.click(loginPage.loginLink);
});

When('I click on login submit button', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.click(loginPage.loginButton);
});

When('I click on user account link', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.click(loginPage.userAccountLink);
});

When('I click on user account link for {string}', async function (email) {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.click(loginPage.getUserAccountLink(email));
});

When('I click on customer info heading', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.click(loginPage.customerInfoHeading);
});

Then('I verify customer info heading is displayed', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.waitForVisible(loginPage.customerInfoHeading);
  await expect(loginPage.customerInfoHeading).toBeVisible();
});

When('I click on logout link', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.click(loginPage.logoutButton);
});

When('I click on logout button', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.click(loginPage.logoutButton);
});

Then('I verify logout is successful', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.waitForVisible(loginPage.loginLink);
  await expect(loginPage.loginLink).toBeVisible();
});

Then('{string} is displayed with {string}', async function (pageTitle, content) {
  if (pageTitle && pageTitle !== 'NA') {
    await expect(this.page).toHaveTitle(new RegExp(pageTitle, 'i'));
  }
});

Then('I verify login error message {string} is displayed', async function (expectedMessage) {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.waitForVisible(loginPage.errorMessage);
  const actualText = await browserActions.getText(loginPage.errorMessage);
  expect(actualText).toContain(expectedMessage);
});

Then('I verify email validation error message {string} is displayed', async function (expectedMessage) {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.waitForVisible(loginPage.emailValidationError);
  const actualText = await browserActions.getText(loginPage.emailValidationError);
  expect(actualText).toContain(expectedMessage);
});

When('I check remember me checkbox', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.check(loginPage.rememberMeCheckbox);
});

When('I uncheck remember me checkbox', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.uncheck(loginPage.rememberMeCheckbox);
});

Then('I verify user account link is displayed', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.waitForVisible(loginPage.userAccountLink);
  await expect(loginPage.userAccountLink).toBeVisible();
});

When('I click on forgot password link', async function () {
  const loginPage = new LoginPage(this.page);
  const browserActions = new BrowserActions(this.page);
  await browserActions.click(loginPage.forgotPasswordLink);
});

