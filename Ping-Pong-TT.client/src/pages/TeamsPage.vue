<template>
  <!-- <GlobalScore /> -->

  <div class="container">
    <div class="row mt-5 mb-5 d-flex justify-content-between">
      <div class="col-3 d-flex justify-content-center">
        <button class="rounded"><strong>Join Red</strong></button>
      </div>

      <div class="col-3">
        <button class="rounded"><strong>Join Blue</strong></button>
      </div>
    </div>
  </div>

  <div>
    <TeamScore :redPlayers="redPlayers" :bluePlayers="bluePlayers" />
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