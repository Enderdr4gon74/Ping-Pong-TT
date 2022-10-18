<template>
  <!-- <GlobalScore /> -->



  <TeamScore :redPlayers="redPlayers" :bluePlayers="bluePlayers" />



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
    onMounted(()=>{
      getPlayers()
    })
    return {
      redPlayers: computed(()=> AppState.redPlayers),
      bluePlayers: computed(()=> AppState.bluePlayers),
    };
  },
  components: { TeamScore }
}
</script>

<style lang="scss" scoped>

</style>