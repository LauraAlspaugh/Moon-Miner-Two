import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"



class UpgradesService {
    purchaseUpgrade(upgradeToBePurchased) {
        if (upgradeToBePurchased.price > AppState.cheese) {
            throw new Error('not enough cheese')
        }
        upgradeToBePurchased.quantity++
        AppState.cheese -= upgradeToBePurchased.price
        upgradeToBePurchased.price = Math.floor(upgradeToBePurchased.price * 1.5)
    }
    collectAuto() {
        const autoUpgrades = AppState.upgrades.filter(upgrade => upgrade.type == 'auto')
        autoUpgrades.forEach(upgrade => AppState.cheese += upgrade.multiplier * upgrade.quantity)
    }
}
export const upgradesService = new UpgradesService()