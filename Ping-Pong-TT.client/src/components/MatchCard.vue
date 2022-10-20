<template>

  <router-link :to="{name: 'Match', params: {id: match.id}}">
    <div class="card bg-card h-100">
      <div class="card-body py-1">
        <div class="d-flex justify-content-center align-items-around">
          <p class="m-0">Match {{match.set}}-{{match.matchNum}}</p>
        </div>
        <div class="d-flex flex-column justify-content-between bg-secondary px-2 h-75">
          <div class="d-flex justify-content-between">
            <p class="m-0" v-if="match.homePlayer != null">{{match.homePlayer.name}}
            <p class="m-0" v-if="match.isABuy">Has a Buy</p>
            </p>
            <p class="m-0" v-else-if="match.homePull">Winner of Match: {{match.set-1}}-{{match.homePull }} <span
                class="m-0" v-if="match.isABuy">Has a Buy</span></p>
            <p class="m-0" v-if="!match.isABuy">{{match.homeScore}}</p>
          </div>

          <div class="d-flex justify-content-center" v-if="!match.isABuy">
            <p class="m-0">vs</p>
          </div>

          <div class="d-flex justify-content-between" v-if="!match.isABuy">
            <p class="m-0" v-if="match.awayPlayer != null">{{match.awayPlayer.name}}</p>
            <p class="m-0" v-else-if="match.awayPull">Winner of Match: {{match.set-1}}-{{match.awayPull }}</p>
            <p class="m-0" v-else>Has A Buy</p>
            <p class="m-0" v-if="!match.isABuy">{{match.awayScore}}</p>
          </div>
        </div>
      </div>
    </div>
  </router-link>

  <!-- <div v-else class="card bg-info blank">
    <div class="card-body">
    </div>
  </div> -->

</template>


<script>
import { Match } from '../models/Match.js';

export default {
  props: {
    match: { type: Match, required: true }
  },

  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.blank {
  width: 10vw
}
</style>