const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ProductPage } = require('../pages/product_page.js');
const BrowserActions = require('../common/browser_actions.js');
const ScreenshotUtil = require('../utils/screenshot_util.js');
const SortingUtil = require('../utils/sorting_util.js');

When('I click on {string} category link', async function (categoryName) {
    const productPage = new ProductPage(this.page);
    await productPage.clickCategory(categoryName);
});

When('I navigate to {string} category', async function (categoryName) {
    const productPage = new ProductPage(this.page);
    await productPage.clickCategory(categoryName);
});

When('I select sort by option {string}', async function (sortOption) {
    const productPage = new ProductPage(this.page);
    await productPage.selectSortOption(sortOption);
});

Then('I verify the active sort option is {string}', async function (expectedOption) {
    const productPage = new ProductPage(this.page);
    const activeOption = await productPage.getSelectedSortOption();
    ScreenshotUtil.logMessages.push(`Active Sort Option: "${activeOption}" (Expected: "${expectedOption}")`);
    expect(activeOption).toBe(expectedOption);
});

Then('I verify available sorting options are displayed in the dropdown:', async function (dataTable) {
    const productPage = new ProductPage(this.page);
    const actualOptions = await productPage.getAllSortOptions();
    ScreenshotUtil.logMessages.push(`Available options in dropdown: [${actualOptions.join(', ')}]`);

    let expectedOptions;
    if (dataTable) {
        const raw = dataTable.raw();
        expectedOptions = (raw[0][0].toLowerCase().includes('option') ? raw.slice(1) : raw).map(row => row[0].trim());
    } else {
        expectedOptions = [
            'Position',
            'Name: A to Z',
            'Name: Z to A',
            'Price: Low to High',
            'Price: High to Low',
            'Created on'
        ];
    }

    for (const expected of expectedOptions) {
        expect(actualOptions).toContain(expected);
    }
});

Then('I verify available sorting options are displayed in the dropdown', async function (dataTable) {
    const productPage = new ProductPage(this.page);
    const actualOptions = await productPage.getAllSortOptions();
    ScreenshotUtil.logMessages.push(`Available options in dropdown: [${actualOptions.join(', ')}]`);

    let expectedOptions;
    if (dataTable) {
        const raw = dataTable.raw();
        expectedOptions = (raw[0][0].toLowerCase().includes('option') ? raw.slice(1) : raw).map(row => row[0].trim());
    } else {
        expectedOptions = [
            'Position',
            'Name: A to Z',
            'Name: Z to A',
            'Price: Low to High',
            'Price: High to Low',
            'Created on'
        ];
    }

    for (const expected of expectedOptions) {
        expect(actualOptions).toContain(expected);
    }
});

Then('I verify products are sorted by name in {string} order', async function (order) {
    const productPage = new ProductPage(this.page);
    const titles = await productPage.getProductTitlesList();
    expect(titles.length).toBeGreaterThan(0);

    ScreenshotUtil.logMessages.push(
        `Product count: ${titles.length}\nTitles in ${order} order:\n` +
        titles.map((t, idx) => `  ${idx + 1}. ${t}`).join('\n')
    );

    const isSorted = SortingUtil.isTitleSorted(titles, order);
    expect(
        isSorted,
        `Expected product titles to be sorted in ${order} order`
    ).toBe(true);
});

Then('I verify products are sorted by price from {string}', async function (priceOrder) {
    const productPage = new ProductPage(this.page);
    const prices = await productPage.getProductPricesList();
    expect(prices.length).toBeGreaterThan(0);

    ScreenshotUtil.logMessages.push(
        `Product count: ${prices.length}\nPrices for "${priceOrder}": [${prices.join(', ')}]`
    );

    const isSorted = SortingUtil.isPriceSorted(prices, priceOrder);
    expect(
        isSorted,
        `Expected product prices to be sorted from ${priceOrder}, but got: [${prices.join(', ')}]`
    ).toBe(true);
});

Then('I verify products are sorted by price in {string} order', async function (priceOrder) {
    const productPage = new ProductPage(this.page);
    const prices = await productPage.getProductPricesList();
    expect(prices.length).toBeGreaterThan(0);

    ScreenshotUtil.logMessages.push(
        `Product count: ${prices.length}\nPrices in "${priceOrder}" order: [${prices.join(', ')}]`
    );

    const isSorted = SortingUtil.isPriceSorted(prices, priceOrder);
    expect(
        isSorted,
        `Expected product prices to be sorted in "${priceOrder}" order, but got: [${prices.join(', ')}]`
    ).toBe(true);
});
