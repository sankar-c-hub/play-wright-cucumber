const { chromium, firefox, webkit } = require('playwright');
const JsonUtility = require('../utils/json_utility.js');
const DisplayUtil = require('../utils/display_util.js');

class BrowserManager {
    static browser = null;
    static context = null;
    static page = null;

    static async launchBrowser() {
        const browserType = JsonUtility.getConfigValue('browser') || 'chromium';
        const headless = JsonUtility.getConfigValue('headless') !== false;
        const docker = JsonUtility.getConfigValue('docker') === true;
        const dockerEndpoint = JsonUtility.getConfigValue('dockerport') || 'ws://localhost:3000';
        const screenSize = DisplayUtil.getScreenSize();

        const browserMap = {
            chromium: chromium,
            firefox: firefox,
            webkit: webkit,
            chrome: chromium
        };

        const browserEngine = browserMap[browserType.toLowerCase()] || chromium;
        this._isChromiumFamily = ['chromium', 'chrome'].includes(browserType.toLowerCase());
        this._screenSize = screenSize;
        this._headless = headless;

        if (docker) {
            const wsEndpoint = dockerEndpoint.startsWith('ws://') || dockerEndpoint.startsWith('wss://')
                ? dockerEndpoint
                : `ws://${dockerEndpoint}`;

            console.log(`Connecting to Docker browser at: ${wsEndpoint}`);
            this.browser = await chromium.connect(wsEndpoint);
            return;
        }

        const launchOptions = {
            headless: headless,
            slowMo: 50,
            args: []
        };

        if (this._isChromiumFamily) {
            launchOptions.args.push('--start-maximized', '--window-position=0,0');
            if (headless && screenSize) {
                launchOptions.args.push(`--window-size=${screenSize.width},${screenSize.height}`);
            }
        }

        this.browser = await browserEngine.launch(launchOptions);
    }

    static async createContext() {
        if (!this.browser) {
            throw new Error('Browser not launched. Call launchBrowser() first.');
        }

        const contextOptions = {
            viewport: null
        };

        if (this._screenSize && (this._headless || !this._isChromiumFamily)) {
            contextOptions.viewport = {
                width: this._screenSize.width,
                height: this._screenSize.height
            };
        }

        this.context = await this.browser.newContext(contextOptions);
        this.page = await this.context.newPage();
        await this.fitPageToScreen(this.page);

        const url = JsonUtility.getConfigValue('url');
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    static async fitPageToScreen(page) {
        let screenSize = this._screenSize;

        try {
            const runtimeSize = await page.evaluate(() => ({
                width: window.screen.availWidth || window.screen.width,
                height: window.screen.availHeight || window.screen.height
            }));
            if (runtimeSize && runtimeSize.width >= 200 && runtimeSize.height >= 200) {
                screenSize = runtimeSize;
                this._screenSize = runtimeSize;
            }
        } catch (_error) {
            // Keep the OS-detected size when the page cannot read window.screen.
        }

        if (this._headless && screenSize) {
            try {
                await page.setViewportSize({
                    width: screenSize.width,
                    height: screenSize.height
                });
            } catch (_error) {
                // Some remote/cloud browsers reject viewport changes.
            }
        }

        try {
            const client = await page.context().newCDPSession(page);
            const { windowId } = await client.send('Browser.getWindowForTarget');
            await client.send('Browser.setWindowBounds', {
                windowId,
                bounds: { windowState: 'maximized' }
            });
        } catch (_error) {
            // Firefox, WebKit, and some cloud grids do not support CDP window bounds.
        }
    }

    static getPage() {
        if (!this.page) {
            throw new Error('Page not created. Call createContext() first.');
        }
        return this.page;
    }

    static async closeContext() {
        try {
            if (this.page && !this.page.isClosed()) {
                await this.page.close();
            }
            if (this.context) {
                await this.context.close();
            }
        } catch (error) {
            console.error('Error closing context:', error.message);
        } finally {
            this.context = null;
            this.page = null;
        }
    }

    static async closeBrowser() {
        try {
            await this.closeContext();
            if (this.browser) {
                await this.browser.close();
                this.browser = null;
                console.log('Browser closed successfully');
            }
        } catch (error) {
            console.error('Error closing browser:', error.message);
        }
    }
}

module.exports = BrowserManager;
