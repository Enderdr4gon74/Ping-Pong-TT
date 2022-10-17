<template>
  <div class="container-fluid">
    <div class="row justify-content-around mt-5">
      <div class="col-4 d-flex flex-column align-items-around scoreCard">
        <div class="bg-danger d-flex flex-column align-items-center">
          <p v-if="match?.homePlayer">{{match?.homePlayer.name}}</p>
          <p v-else>Winner of Match: {{match?.set-1}}-{{match?.homePull}}</p>
          <h1>{{match?.homeScore}}</h1>
        </div>

        <div class="d-flex justify-content-around">
          <button class="btn btn-secondary fs-1 w-50" @click="changeScore('home', 1)">+1</button>
          <button class="btn btn-secondary fs-1 w-50" @click="changeScore('home', -1)">-1</button>
        </div>

        <div class="d-flex justify-content-center">
          <button class="btn btn-secondary fs-3 w-100 mt-2" @click="declareWinner('home')">Declare Winner</button>
        </div>
      </div>

      <div class="col-4 d-flex flex-column align-items-around scoreCard">
        <div class="bg-primary d-flex flex-column align-items-center">
          <p v-if="match?.awayPlayer">{{match?.awayPlayer.name}}</p>
          <p v-else>Winner of Match: {{match?.set-1}}-{{match?.awayPull}}</p>
          <h1>{{match?.awayScore}}</h1>
        </div>

        <div class="d-flex justify-content-around">
          <button class="btn btn-secondary fs-1 w-50" @click="changeScore('away', 1)">+1</button>
          <button class="btn btn-secondary fs-1 w-50" @click="changeScore('away', -1)">-1</button>
        </div>

        <div class="d-flex justify-content-center">
          <button class="btn btn-secondary fs-3 w-100 mt-2" @click="declareWinner('away')">Declare Winner</button>
        </div>
      </div>

    </div>

    <div v-if="match?.winner" class="row mt-5">
      <div class="col-12 d-flex justify-content-center mt-5">
        <h1>Winner is: {{match?.winner.name}}</h1>
      </div>
    </div>

  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { matchService } from '../services/MatchService.js'
import Pop from '../utils/Pop.js';


export default {
  setup() {
    const route = useRoute();
    async function getMatchById() {
      try {

        await matchService.getMatchById(route.params.id)
      } catch (error) {
        Pop.error(error, '[Get Match By Id]')
      }
    }

    onMounted(() => { getMatchById(); })

    return {
      match: computed(() => AppState.activeMatch),

      async changeScore(team, score) {
        try {
          await matchService.changeScore(route.params.id, team, score)
        } catch (error) {
          Pop.error(error, '[Changing Score]')
        }
      },

      async declareWinner(team) {
        try {
          console.log(team)
          await matchService.declareWinner(route.params.id, team)
        } catch (error) {
          Pop.error(error, '[Declaring Winner]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.scoreCard {
  width: 12rem;
  height: 12rem;
}
</style>