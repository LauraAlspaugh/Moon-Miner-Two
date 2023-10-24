import { reactive } from 'vue'
import { Upgrade } from './models/Upgrade.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  cheese: 0,
  upgrades: [
    new Upgrade({ name: 'Knife', price: 10, multiplier: 2, type: 'click' }),
    new Upgrade({ name: 'Grater', price: 20, multiplier: 5, type: 'click' }),
    new Upgrade({ name: 'Processor', price: 50, multiplier: 2, type: 'auto' }),
    new Upgrade({ name: 'Rover', price: 20, multiplier: 5, type: 'auto' })
  ]
})
