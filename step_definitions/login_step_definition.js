import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page.js';
import JsonUtility from '../utils/json_utility.js';
import BrowserActions from '../common/browser_actions.js';

import ScreenshotUtil from '../utils/screenshot_util.js';

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


Then('{string} is displayed with {string}', async function (pageTitle, content) {

});

