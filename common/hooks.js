const { BeforeAll, AfterAll, Before, After, setDefaultTimeout, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const BrowserManager = require('../common/browser_manager.js');
const ScreenshotUtil = require('../utils/screenshot_util.js');
const AllureHelper = require('../common/allure_helper.js');

// Increase timeout to 60 seconds
setDefaultTimeout(60000);

function isVerifyGwtStep(pickleStep) {
    return (pickleStep?.text || '').toLowerCase().includes('verify');
}

async function attachScreenshotToCurrentStep(world, page, name) {
    const screenshot = await ScreenshotUtil.captureBuffer(page);
    if (world && typeof world.attach === 'function') {
        await world.attach(screenshot, 'image/png');
    }
    await AllureHelper.addScreenshot(screenshot, name);
}


BeforeAll(async function () {
    console.log('BeforeAll: Global setup starting...');
});

Before(async function () {
    try {
        await BrowserManager.launchBrowser();
        console.log('Browser launched successfully');
        await BrowserManager.createContext();
        this.page = BrowserManager.getPage();
    } catch (error) {
        console.error(`❌ Before hook failed: ${error.message}`);
        throw error;
    }
});

BeforeStep(async function ({ pickleStep }) {
    this._isVerifyStep = isVerifyGwtStep(pickleStep);
});

AfterStep(async function ({ result, pickleStep }) {

    const page = BrowserManager.getPage();
    const stepText = pickleStep.text;
    const log = ScreenshotUtil.logMessages.join('\n');
    if (log) {
        await ScreenshotUtil.addingLogCucumber(page, this, log);
        ScreenshotUtil.logMessages = [];
    }

    const isFailed = result.status === Status.FAILED;
    const isUndefined = result.status === Status.UNDEFINED;
    const isAmbiguous = result.status === Status.AMBIGUOUS;
    const isMissingStep = isUndefined || isAmbiguous;
    const isVerifyStep = this._isVerifyStep || isVerifyGwtStep(pickleStep);

    if (isVerifyStep) {
        await attachScreenshotToCurrentStep(this, page, `Verify - ${stepText}`);
    } else if (isFailed || isMissingStep) {
        await ScreenshotUtil.captureForCucumber(page, this, stepText);
    }

    if (isFailed && result.message) {
        await AllureHelper.addError(new Error(result.message), stepText);
    }

    if (isMissingStep) {
        const reason = isAmbiguous
            ? `Ambiguous step (multiple matching definitions): ${stepText}`
            : `Undefined step (no matching step definition): ${stepText}`;
        await AllureHelper.addError(new Error(reason), stepText);
        throw new Error(reason);
    }
});

After(async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await BrowserManager.closeBrowser();
});

AfterAll(async function () {
    console.log('AfterAll executed successfully');
});
