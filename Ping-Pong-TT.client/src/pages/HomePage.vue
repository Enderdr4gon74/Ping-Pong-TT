<template>
  <div v-if="players">

    <div class="d-flex justify-content-end p-5 ">
      <router-link :to="{name: 'FindTourney'}">
        <button class="rounded fs-3 me-3 btn btn-success">
          Find a Tourney
        </button>
      </router-link>
      <CreateTourney />
    </div>


    <div class="container">
      <div class="mt-5 d-flex justify-content-between">
        <!-- global leader board -->
        <div class="col-8">
          <GlobalScore :players="players" />
        </div>


        <!-- TODO: add current match(es) button somewhere -->


        <!-- welcome + intro text -->
        <div class="row background-imag col-4">
          <p class="text-center pink fs-1">Welcome to Ping Pong Tournament Tracker!</p>
          <p class="text-center mt-2 mb-2 fs-2">Join the Future of Ping Pong</p>

          <p class="fs-4">
            Welcome to the future of ping pong, do you love ping ponging, do you need a place to display your ping pong
            prowess? well then this is the place for you, we here at KING PONG<i class="mdi mdi-trademark"></i> believe
            in fair treatment of all ping
            pongers.
          </p>
        </div>
      </div>
    </div>



  </div>



  <div v-else>
    <PlayersMorphingCube />
  </div>
</template>







<script>
import GlobalScore from "../components/GlobalScore.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
import PlayersMorphingCube from "../components/PlayersMorphingCube.vue";
import CreateTourney from "../components/CreateTourney.vue";
import Pop from "../utils/Pop.js";
import { leaderboardService } from '../services/LeaderboardService.js'
import { onMounted } from "vue";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";

export default {
  setup() {
    async function getPlayers() {
      try {
        await leaderboardService.getPlayers()
      } catch (error) {
        Pop.error(error, "[Getting Players]")
      }
    }
    onMounted(() => {
      getPlayers()
    })
    return {
      players: computed(() => AppState.allPlayers)
    };
  },
  components: { GlobalScore, LoadingScreen, PlayersMorphingCube, CreateTourney }
}
</script>







<style scoped lang="scss">
.background-image {
  background-image: url('https://4.bp.blogspot.com/-tc-p6CzK6O0/WmWakDr5KmI/AAAAAAAACgU/pa2vTQ_KYho7pRQWFWLPDCwJIrEz08p5QCLcBGAs/s1600/comeback.jpg');
  min-height: 87vh;
  background-size: cover;
}

.pink {
  color: #fd8bd8;
  font-weight: bold;
}
</style>