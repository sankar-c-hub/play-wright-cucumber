// [AGENT-ADDED] AllureHelper import for step wrapping
const AllureHelper = require('./allure_helper.js');
const ScreenshotUtil = require('../utils/screenshot_util.js');

class BrowserActions {

    constructor(page) {
        this.page = page;
    }

    // [AGENT-ADDED] Open URL with Allure step wrapping
    async open(url) {
        return await AllureHelper.step(`Navigate to ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    // [AGENT-ADDED] Click element with Allure step wrapping
    async click(element) {
        return await AllureHelper.step('Click element', async () => {
            await element.click();
        });
    }

    // [AGENT-ADDED] Click if element is visible with Allure step wrapping
    async clickIfVisible(element, timeout = 3000) {
        return await AllureHelper.step('Click element if visible', async () => {
            try {
                if (await element.isVisible({ timeout })) {
                    await element.click();
                    return true;
                }
            } catch (error) {
                // Element not visible or not available
            }

            return false;
        });
    }

    // [AGENT-ADDED] Fill text with Allure step wrapping
    async fill(element, text) {
        return await AllureHelper.step(`Fill text: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`, async () => {
            await element.fill(text);
        });
    }

    // [AGENT-ADDED] Type text with Allure step wrapping (alias for fill)
    async type(element, text) {
        return await AllureHelper.step(`Type text: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`, async () => {
            await element.fill(text);
        });
    }

    // [AGENT-ADDED] Press keyboard key with Allure step wrapping
    async press(element, key) {
        return await AllureHelper.step(`Press key: ${key}`, async () => {
            await element.press(key);
        });
    }

    // [AGENT-ADDED] Press Enter with Allure step wrapping
    async pressEnter(element) {
        return await AllureHelper.step('Press Enter', async () => {
            await element.press('Enter');
        });
    }

    // [AGENT-ADDED] Check checkbox with Allure step wrapping
    async check(element) {
        return await AllureHelper.step('Check checkbox', async () => {
            await element.check();
        });
    }

    // [AGENT-ADDED] Uncheck checkbox with Allure step wrapping
    async uncheck(element) {
        return await AllureHelper.step('Uncheck checkbox', async () => {
            await element.uncheck();
        });
    }

    // [AGENT-ADDED] Select dropdown option with Allure step wrapping
    async selectOption(element, value) {
        return await AllureHelper.step(`Select option: ${value}`, async () => {
            await element.selectOption(value);
        });
    }

    // [AGENT-ADDED] Check visibility with Allure step wrapping
    async isVisible(element, timeout = 3000) {
        return await AllureHelper.step('Check element visibility', async () => {
            try {
                return await element.isVisible({ timeout });
            } catch (error) {
                return false;
            }
        });
    }

    // [AGENT-ADDED] Wait for element visibility with Allure step wrapping
    async waitForVisible(element, timeout = 10000) {
        return await AllureHelper.step('Wait for element to become visible', async () => {
            await element.waitFor({
                state: 'visible',
                timeout
            });
        });
    }

    // [AGENT-ADDED] Get text with Allure step wrapping
    async getText(element) {
        return await AllureHelper.step('Get element text', async () => {
            return await element.textContent();
        });
    }

    // [AGENT-ADDED] Get attribute with Allure step wrapping
    async getAttribute(element, attribute) {
        return await AllureHelper.step(`Get attribute: ${attribute}`, async () => {
            return await element.getAttribute(attribute);
        });
    }

    // [AGENT-ADDED] Screenshot with Allure step wrapping
    async screenshot(path) {
        return await AllureHelper.step(`Capture screenshot: ${path}`, async () => {
            await this.page.screenshot(ScreenshotUtil.getScreenshotOptions({ path }));
        });
    }
}

module.exports = BrowserActions;
