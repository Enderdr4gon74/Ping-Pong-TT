<template>

  <div class="container-fluid">
    <div class="row">
      <div class="col-2 p-2">
        <router-link :to="{name: 'Tourney', params: {id: tourney?.id}}">
          <button class="btn btn-success">Back To Brackets</button>
        </router-link>
      </div>
    </div>
    <div v-if="!match?.isABuy" class="row justify-content-around mt-5">
      <div class="col-3 d-flex flex-column align-items-around scoreCard">
        <div class="bg-danger rounded-4 box-shadow d-flex flex-column align-items-center">
          <p v-if="match?.homePlayer" class="fs-2">{{match?.homePlayer.name}}</p>
          <p v-else>Winner of Match: {{match?.set-1}}-{{match?.homePull}}</p>
          <h1>{{match?.homeScore}}</h1>
        </div>

        <div
          v-if="(!match?.winner && tourney?.status == 'active') && (tourney?.creatorId == account?.id || tourney?.creatorId == user?.id)"
          class="d-flex justify-content-around pt-2 gap-2">
          <button class="btn box-shadow rounded-pill btn-success fs-1 w-50" @click="changeScore('home', 1)">+1</button>
          <button class="btn box-shadow rounded-pill btn-danger fs-1 w-50" @click="changeScore('home', -1)">-1</button>
        </div>

        <div
          v-if="(!match?.winner && tourney?.status == 'active') && (tourney?.creatorId == account?.id || tourney?.creatorId == user?.id)"
          class="d-flex justify-content-center">
          <button v-if="match?.homeScore > match?.awayScore"
            class="btn box-shadow rounded-pill btn-warning fs-3 w-100 mt-2" @click="declareWinner('home')">Declare
            Winner</button>
        </div>
      </div>

      <div class="col-3 d-flex flex-column align-items-around scoreCard">
        <div class="bg-primary rounded-4 box-shadow d-flex flex-column align-items-center">
          <p v-if="match?.awayPlayer" class="fs-2">{{match?.awayPlayer.name}}</p>
          <p v-else>Winner of Match: {{match?.set-1}}-{{match?.awayPull}}</p>
          <h1>{{match?.awayScore}}</h1>
        </div>

        <div
          v-if="(!match?.winner && tourney?.status == 'active') && (tourney?.creatorId == account?.id || tourney?.creatorId == user?.id)"
          class="d-flex justify-content-around pt-2 gap-2">
          <button class="btn box-shadow rounded-pill btn-success fs-1 w-50" @click="changeScore('away', 1)">+1</button>
          <button class="btn box-shadow rounded-pill btn-danger fs-1 w-50" @click="changeScore('away', -1)">-1</button>
        </div>

        <div
          v-if="(!match?.winner && tourney?.status == 'active') && (tourney?.creatorId == account?.id || tourney?.creatorId == user?.id)"
          class="d-flex justify-content-center">
          <button v-if="match?.awayScore > match?.homeScore"
            class="btn box-shadow rounded-pill btn-warning fs-3 w-100 mt-2" @click="declareWinner('away')">Declare
            Winner</button>
        </div>
      </div>

    </div>

    <div v-else>

    </div>

    <div v-if="match?.winner || match?.isABuy" class="row mt-5">
      <div class="col-12 d-flex justify-content-center mt-5">
        <h1 v-if="!match?.isABuy">Winner is: {{match?.winner.name}}</h1>
        <h1 v-else-if="match?.isABuy && match?.winner">{{match?.winner.name}} Has A Bye</h1>
        <h1 v-else>This is a Bye Round for the winner of match {{match.set - 1}}/{{match.homePull}}</h1>
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

    async function getTourneyByMatchId() {
      try {
        await matchService.getTourneyByMatchId(route.params.id)
      } catch (error) {
        Pop.error(error, '[Getting Tourney Belonging To Match]')
      }
    }

    onMounted(() => {
      getTourneyByMatchId();
    })

    return {
      match: computed(() => AppState.activeMatch),
      tourney: computed(() => AppState.activeTourney),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),

      async changeScore(team, score) {
        try {
          await matchService.changeScore(route.params.id, team, score)
        } catch (error) {
          Pop.error(error, '[Changing Score]')
        }
      },

      async declareWinner(team) {
        try {
          if (!await Pop.confirm('Are you sure this dude won?')) {
            return
          }
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