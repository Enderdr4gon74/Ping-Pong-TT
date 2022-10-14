<template>

  <router-link :to="{name: 'Match', params: {id: match.id}}">
    <div class="card bg-info">
      <div class="card-body">
        <div class="d-flex flex-column align-items-center justify-content-between">
          <p class="m-0" v-if="match.homePlayer != null">{{match.homePlayer.name}}</p>
          <p class="m-0" v-else-if="match.homePull">Winner of Match: {{match.set-1}}-{{match.homePull }}</p>
          <p class="m-0" v-else>Buy</p>
          <p class="m-0">vs</p>
          <p class="m-0" v-if="match.awayPlayer != null">{{match.awayPlayer.name}}</p>
          <p class="m-0" v-else-if="match.awayPull">Winner of Match: {{match.set-1}}-{{match.awayPull }}</p>
          <p class="m-0" v-else>Buy</p>
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