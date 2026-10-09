const JsonUtility = require('../utils/json_utility.js');
const { expect } = require('@playwright/test');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    // 🔹 Generic locator resolver
    getElement(pageName, elementName) {
        const locatorValue = JsonUtility.getLocator(pageName, elementName);

        if (!locatorValue) {
            throw new Error(`Locator not found for ${pageName} -> ${elementName}`);
        }

        // XPath handling
        if (locatorValue.startsWith('//') || locatorValue.startsWith('(')) {
            return this.page.locator(`xpath=${locatorValue}`);
        }

        // CSS / text / id / role
        return this.page.locator(locatorValue);
    }
}

module.exports = { BasePage };
