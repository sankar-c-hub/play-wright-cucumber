const { BasePage } = require('./base_page.js');
const BrowserActions = require('../common/browser_actions.js');
const AllureHelper = require('../common/allure_helper.js');

class ProductPage extends BasePage {

    constructor(page) {
        super(page);
        this.browserActions = new BrowserActions(page);
    }

    get sortByDropdown() {
        return this.getElement('Demo Web Shop', 'sortByDropdownID');
    }

    get productTitles() {
        return this.getElement('Demo Web Shop', 'productTitlesXPATH');
    }

    get productPrices() {
        return this.getElement('Demo Web Shop', 'productPricesXPATH');
    }

    get categoryTitle() {
        return this.getElement('Demo Web Shop', 'categoryTitleXPATH');
    }

    get productItemBox() {
        return this.getElement('Demo Web Shop', 'productItemBoxCSS');
    }

    getCategoryLink(categoryName) {
        const sanitizedKey = `${categoryName.replace(/[^a-zA-Z]/g, '')}LinkXPATH`;
        try {
            return this.getElement('Demo Web Shop', sanitizedKey);
        } catch {
            return this.page.locator(`xpath=(//ul[@class='top-menu']//a[contains(normalize-space(),'${categoryName}')])[1]`);
        }
    }

    async clickCategory(categoryName) {
        return await AllureHelper.step(`Navigate to category: ${categoryName}`, async () => {
            const link = this.getCategoryLink(categoryName);
            await this.browserActions.click(link);
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    async selectSortOption(sortOption) {
        return await AllureHelper.step(`Select sort option: ${sortOption}`, async () => {
            await this.browserActions.waitForVisible(this.sortByDropdown);
            const currentOption = await this.page.locator('#products-orderby option:checked').textContent();
            if (currentOption && currentOption.trim() === sortOption.trim()) {
                return;
            }

            await Promise.all([
                this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
                this.sortByDropdown.selectOption({ label: sortOption })
            ]);
        });
    }

    async getSelectedSortOption() {
        return await AllureHelper.step('Get currently selected sort option', async () => {
            const text = await this.page.locator('#products-orderby option:checked').textContent();
            return text ? text.trim() : '';
        });
    }

    async getAllSortOptions() {
        return await AllureHelper.step('Get all available sort options', async () => {
            await this.browserActions.waitForVisible(this.sortByDropdown);
            const rawOptions = await this.page.locator('#products-orderby option').allTextContents();
            return rawOptions.map(opt => opt.trim()).filter(opt => opt.length > 0);
        });
    }

    async getProductTitlesList() {
        return await AllureHelper.step('Get all product titles', async () => {
            await this.page.locator('.product-item').first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
            const titles = await this.productTitles.allTextContents();
            return titles.map(t => t.trim()).filter(t => t.length > 0);
        });
    }

    async getProductPricesList() {
        return await AllureHelper.step('Get all product prices', async () => {
            await this.page.locator('.product-item').first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
            const pricesText = await this.productPrices.allTextContents();
            return pricesText
                .map(price => parseFloat(price.replace(/[^0-9.]/g, '')))
                .filter(num => !isNaN(num));
        });
    }
}

module.exports = { ProductPage };
