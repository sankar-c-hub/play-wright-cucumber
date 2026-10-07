const allure = require('allure-js-commons');

/**
 * Centralized Allure helper for nested steps and attachments.
 * Scenario/step results are written by the allure-cucumberjs reporter.
 */
class AllureHelper {
  static async addScreenshot(screenshotData, name = 'Screenshot') {
    try {
      await allure.attachment(name, screenshotData, 'image/png');
    } catch (error) {
      console.log(`[AllureHelper] Screenshot attachment failed: ${error.message}`);
    }
  }

  static async addError(error, stepName = 'Unknown Step') {
    try {
      const details = `${stepName}\n\n${error.message || error}\n${error.stack || ''}`;
      await allure.attachment('Failure details', details, 'text/plain');
    } catch (attachError) {
      console.log(`[AllureHelper] Error logging: ${attachError.message}`);
    }
  }

  static async addText(text, name = 'Log') {
    try {
      await allure.attachment(name, text, 'text/plain');
    } catch (error) {
      console.log(`[AllureHelper] Text attachment: ${error.message}`);
    }
  }

  static async step(name, fn) {
    return await allure.step(name, fn);
  }
}

module.exports = AllureHelper;
