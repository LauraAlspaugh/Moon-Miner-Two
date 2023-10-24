import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"



class CheeseService {
    mineCheese() {
        AppState.cheese++
        logger.log(AppState.cheese)
        const clickUpgrades = AppState.upgrades.filter(upgrade => upgrade.type == 'click')
        clickUpgrades.forEach(upgrade => AppState.cheese += upgrade.multiplier * upgrade.quantity)
    }
}

export const cheeseService = new CheeseService()