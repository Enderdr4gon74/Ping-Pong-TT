<template>
  <div class="container-fluid">
    <div class="row justify-content-around mt-5">
      <div class="col-3 d-flex flex-column align-items-around scoreCard">
        <div class="bg-danger rounded-4 box-shadow d-flex flex-column align-items-center">
          <p v-if="match?.homePlayer">{{match?.homePlayer.name}}</p>
          <p v-else>Winner of Match: {{match?.set-1}}-{{match?.homePull}}</p>
          <h1>{{match?.homeScore}}</h1>
        </div>

        <div v-if="!(match?.winner  )" class="d-flex justify-content-around pt-2 gap-2">
          <button class="btn box-shadow rounded-pill btn-success fs-1 w-50" @click="changeScore('home', 1)">+1</button>
          <button class="btn box-shadow rounded-pill btn-danger fs-1 w-50" @click="changeScore('home', -1)">-1</button>
        </div>

        <div v-if="!match?.winner" class="d-flex justify-content-center">
          <button class="btn box-shadow rounded-pill btn-warning fs-3 w-100 mt-2" @click="declareWinner('home')">Declare Winner</button>
        </div>
      </div>

      <div class="col-3 d-flex flex-column align-items-around scoreCard">
        <div class="bg-primary rounded-4 box-shadow d-flex flex-column align-items-center">
          <p v-if="match?.awayPlayer">{{match?.awayPlayer.name}}</p>
          <p v-else>Winner of Match: {{match?.set-1}}-{{match?.awayPull}}</p>
          <h1>{{match?.awayScore}}</h1>
        </div>

        <div v-if="!match?.winner" class="d-flex justify-content-around pt-2 gap-2">
          <button class="btn box-shadow rounded-pill btn-success fs-1 w-50" @click="changeScore('away', 1)">+1</button>
          <button class="btn box-shadow rounded-pill btn-danger fs-1 w-50" @click="changeScore('away', -1)">-1</button>
        </div>

        <div v-if="!match?.winner" class="d-flex justify-content-center">
          <button class="btn box-shadow rounded-pill btn-warning fs-3 w-100 mt-2" @click="declareWinner('away')">Declare Winner</button>
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

    async function getTourneyBelongingToMatch() {
      try {
        await matchService.getTourneyBelongingToMatch()
      } catch (error) {
        Pop.error(error, '[Getting Tourney Belonging To Match]')
      }
    }

    onMounted(() => { 
      getMatchById();
      getTourneyBelongingToMatch()
    })

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
  // width: 12rem;
  height: 12rem;
}

.box-shadow {
  box-shadow: 0rem 0rem 10px #5e7196;
}

.bg-danger {
  background-color: #a70909 !important;
}
</style>