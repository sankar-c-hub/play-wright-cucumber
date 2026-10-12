class SortingUtil {

    /**
     * Validates whether a list of product prices is sorted in the specified order.
     * @param {Array<number|string>} prices - Array of prices (numbers or price strings)
     * @param {string} order - Sorting order ('low to high', 'high to low', 'asc', 'desc')
     * @returns {boolean} - true if sorted correctly, false otherwise
     */
    static isPriceSorted(prices, order) {
        if (!prices || !Array.isArray(prices) || prices.length === 0) {
            return false;
        }

        if (prices.length === 1) {
            return true;
        }

        // Normalize to numeric values
        const numericPrices = prices.map(price => {
            if (typeof price === 'number') {
                return price;
            }
            return parseFloat(String(price).replace(/[^0-9.]/g, ''));
        });

        // Ensure all prices are valid numbers
        if (numericPrices.some(p => isNaN(p))) {
            return false;
        }

        const normalizedOrder = String(order || '').trim().toLowerCase();
        const isLowToHigh =
            normalizedOrder.includes('low to high') ||
            normalizedOrder.includes('asc') ||
            normalizedOrder === 'low-to-high';

        const isHighToLow =
            normalizedOrder.includes('high to low') ||
            normalizedOrder.includes('desc') ||
            normalizedOrder === 'high-to-low';

        if (isLowToHigh) {
            for (let i = 0; i < numericPrices.length - 1; i++) {
                if (numericPrices[i] > numericPrices[i + 1]) {
                    return false;
                }
            }
            return true;
        }

        if (isHighToLow) {
            for (let i = 0; i < numericPrices.length - 1; i++) {
                if (numericPrices[i] < numericPrices[i + 1]) {
                    return false;
                }
            }
            return true;
        }

        return false;
    }

    /**
     * Alias for isPriceSorted
     */
    static validatePriceSorting(prices, order) {
        return this.isPriceSorted(prices, order);
    }

    /**
     * Validates whether a list of product titles/names is sorted in the specified order.
     * @param {Array<string>} titles - Array of product titles
     * @param {string} order - Sorting order ('ascending', 'descending', 'a to z', 'z to a')
     * @returns {boolean} - true if sorted correctly, false otherwise
     */
    static isTitleSorted(titles, order) {
        if (!titles || !Array.isArray(titles) || titles.length === 0) {
            return false;
        }

        if (titles.length === 1) {
            return true;
        }

        const normalizedOrder = String(order || '').trim().toLowerCase();
        const isAscending =
            normalizedOrder.includes('asc') ||
            normalizedOrder.includes('a to z');

        for (let i = 0; i < titles.length - 1; i++) {
            const comparison = titles[i].localeCompare(titles[i + 1], undefined, { sensitivity: 'base' });
            if (isAscending) {
                if (comparison > 0) {
                    return false;
                }
            } else {
                if (comparison < 0) {
                    return false;
                }
            }
        }

        return true;
    }
}

module.exports = SortingUtil;
module.exports.SortingUtil = SortingUtil;
