<template>
  <!-- <GlobalScore /> -->
  <div class="mt-5 pt-3">
    <TeamScore :redPlayers="redPlayers" :bluePlayers="bluePlayers" />
  </div>

  <div class="container-fluid">
    <div class="row mt-5 mb-5 d-flex justify-content-evenly gap-5 my-5 px-5">
      <div class="col-3 d-flex justify-content-center">
        <button class="rounded p-2 bg-danger text-dark">
          <strong class="fs-5">Join Red</strong>
        </button>
      </div>

      <div class="col-3 d-flex justify-content-center align-items-center">
        <button class="rounded p-2 bg-primary">
          <strong class="fs-5">
            Join Blue
          </strong>
        </button>
      </div>
    </div>
  </div>
</template>






<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import TeamScore from '../components/TeamScore.vue';
import { leaderboardService } from '../services/LeaderboardService.js';
import Pop from '../utils/Pop.js';


export default {
  setup() {
    async function getPlayers() {
      try {
        await leaderboardService.getTeamPlayers()
      } catch (error) {
        Pop.error(error, '[Getting Players]')
      }
    }



    onMounted(() => {
      getPlayers()
    })



    return {
      redPlayers: computed(() => AppState.redPlayers),
      bluePlayers: computed(() => AppState.bluePlayers),
    };
  },
  components: { TeamScore }
}
</script>






<style lang="scss" scoped>

</style>