// utils/CostUtils.js
class CostUtils {
  static BASE_COST = 15000; // Base cost in your currency

  /**
   * Calculate the cost based on weight.
   * @param {number} weight - Weight of the parcel in grams.
   * @returns {number} - The total cost.
   */
  static calculateCost(weight) {
    if (weight <= 100) {
      return this.BASE_COST;
    }
    const extraWeight = weight - 100;
    const multiplier = 1 + Math.ceil(extraWeight / 100) * 0.05; // 5% for each 100g
    return Math.round(this.BASE_COST * multiplier);
  }
}

export default CostUtils;
