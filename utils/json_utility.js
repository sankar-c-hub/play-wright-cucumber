const fs = require('fs');
const path = require('path');

class JsonUtility {
    // Load JSON file (common method)
    static loadJson(fileName) {
        const filePath = path.join(process.cwd(), 'resources', fileName);
        if (!fs.existsSync(filePath)) {
            throw new Error(`JSON file not found: ${filePath}`);
        }
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    // Get value from config.json
    static getConfigValue(key) {
        const config = this.loadJson('config.json');
        if (!(key in config)) {
            throw new Error(`Key '${key}' not found in config.json`);
        }
        return config[key];
    }

    static getConfigValueOrDefault(key, defaultValue) {
        const config = this.loadJson('config.json');
        return key in config ? config[key] : defaultValue;
    }

    // Get value from locators.json
    static getLocator(pageName, locatorName) {
        const locators = this.loadJson('locators.json');
        if (!(pageName in locators)) {
            throw new Error(`Page '${pageName}' not found in locators.json`);
        }
        if (!(locatorName in locators[pageName])) {
            throw new Error(`Locator '${locatorName}' not found under page '${pageName}'`);
        }
        return locators[pageName][locatorName];
    }
}

module.exports = JsonUtility;
