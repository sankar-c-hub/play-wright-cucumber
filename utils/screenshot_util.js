const JsonUtility = require('./json_utility.js');

class ScreenshotUtil {

     static logMessages = [];

    static isFullPage() {
        const mode = String(JsonUtility.getConfigValueOrDefault('screenshot', 'fullPage')).trim().toLowerCase();
        return mode !== 'normal';
    }

    static getScreenshotOptions(extraOptions = {}) {
        return {
            fullPage: this.isFullPage(),
            ...extraOptions
        };
    }

    static async captureBuffer(page, extraOptions = {}) {
        return await page.screenshot(this.getScreenshotOptions(extraOptions));
    }

    /**
     * Capture screenshot for Cucumber (using World context)
     * @param {Object} page - Playwright page object
     * @param {Object} world - Cucumber World context (this)
     * @param {string} message - Screenshot name/description
     */
    static async captureForCucumber(page, world) {
        try {
            const screenshot = await this.captureBuffer(page);
            await world.attach(screenshot, 'image/png');
        } catch (error) {
            console.error(`Failed to capture screenshot: ${error.message}`);
            return null;
        }
    }

    static async addingLogCucumber(page, world, logMessage) {
        try {
            await world.attach(logMessage, 'text/plain');
        } catch (error) {
            console.error(`Failed to attach log message: ${error.message}`);
        }
    }

    /**
     * Generate screenshot filename based on step/scenario
     * @param {string} stepText - Step text
     * @param {string} status - Step status (passed/failed)
     * @returns {string} - Sanitized filename
     */
    static generateFilename(stepText, status = 'failed') {
        const timestamp = Date.now();
        const sanitized = stepText.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
        return `${sanitized}-${status}-${timestamp}.png`;
    }
}

module.exports = ScreenshotUtil;
