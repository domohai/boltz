// utils/CostUtils.js
class CostUtils {
  static BASE_COSTS = {
    package: 18000, // Base cost for "package"
    docs: 15000, // Base cost for "docs"
  };

  /**
   * Calculate the cost based on weight and type of package.
   * @param {number} weight - Weight of the parcel in grams.
   * @param {string} type - Type of the parcel ('package' or 'docs').
   * @returns {number} - The total cost.
   */
  static calculateCost(weight, type) {
    // Get the base cost for the provided type, default to 'docs' if type is invalid
    const baseCost = this.BASE_COSTS[type] || this.BASE_COSTS.docs;

    if (weight <= 100) {
      return baseCost;
    }

    const extraWeight = weight - 100;
    const multiplier = 1 + Math.ceil(extraWeight / 100) * 0.1; // 10% increase per extra 100g
    return Math.round(baseCost * multiplier);
  }
}

export default CostUtils;
