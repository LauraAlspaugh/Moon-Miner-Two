<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 text-center">
        <h1 class="moon-title m-4">Moon Miner</h1>
        <h4 class="m-4">'Mine cheese and buy your upgrades'</h4>
        <img @click="mineCheese()" class="rounded-circle"
          src="https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZXNlfGVufDB8fDB8fHww"
          alt="Moon Cheese">
      </div>
    </section>
    <section class="row">
      <div class="col-12 text-center">
        <h2>Cheese: {{ cheese }}</h2>
        <h3>Click: {{ clickPower }} || Auto: {{ autoPower }}</h3>
      </div>
    </section>
    <section class="row p-5">
      <div v-for="upgrade in upgrades" :key="upgrade.name" class="col-3 p-5 text center">
        <button @click="purchaseUpgrade(upgrade)" class="btn" :disabled="upgrade.price > cheese"
          :class="{ 'bg-primary fw-bold': cheese >= upgrade.price, 'bg-danger': cheese < upgrade.price }">{{ upgrade.name
          }}</button>
        <div v-if="upgrade.quantity > 0">Qty: {{ upgrade.quantity }}</div>
        <div>Price: {{ upgrade.price }}</div>
        <div v-if="upgrade.type == 'click'">{{ upgrade.multiplier }} per click</div>
        <div v-else>{{ upgrade.multiplier }} / 3s</div>
      </div>

    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState.js'
import { cheeseService } from '../services/CheeseService.js'
import { upgradesService } from '../services/UpgradesService.js'
import { logger } from '../utils/Logger.js'


export default {
  setup() {

    function collectAuto() {
      upgradesService.collectAuto()
    }
    onMounted(() => {
      setInterval(collectAuto, 3000)


    })
    return {
      weirdClass: 'fw-bold',
      cheese: computed(() => AppState.cheese),
      upgrades: computed(() => AppState.upgrades),
      clickPower: computed(() => {
        let total = 1
        const clickUpgrades = AppState.upgrades.filter(upgrade => upgrade.type == 'click')
        clickUpgrades.forEach(upgrade => total += upgrade.multiplier * upgrade.quantity)
        return total
      }),
      autoPower: computed(() => {
        let total = 0
        const autoUpgrades = AppState.upgrades.filter(upgrade => upgrade.type == 'auto')
        autoUpgrades.forEach(upgrade => total += upgrade.multiplier * upgrade.quantity)
        return total
      }),
      mineCheese() {
        cheeseService.mineCheese()
      },
      purchaseUpgrade(upgradeToBePurchased) {
        upgradesService.purchaseUpgrade(upgradeToBePurchased)
      },
    }
  }
}
</script> 

<style scoped lang="scss">
img {
  height: 45vh;
  width: 60vh;
  object-fit: cover;
  object-position: center;
}

.moon-title {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 45px;

}
</style>
