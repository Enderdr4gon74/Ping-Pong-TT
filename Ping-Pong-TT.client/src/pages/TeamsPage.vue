<template>
  <!-- <GlobalScore /> -->
  <div class="mt-5 pt-3">
    <TeamScore :redPlayers="redPlayers" :bluePlayers="bluePlayers" />
  </div>

  <div class="container-fluid">
    <div class="row mt-5 mb-5 d-flex justify-content-evenly gap-5 my-5 px-5">
      <div class="col-3 d-flex justify-content-center">
        <button v-if="account?.team == 'none' && user.isAuthenticated" class="px-3 py-2 btn btn-outline-danger d-flex align-items-center" @click="joinTeam('red')">
          <p class="m-0">Join Red Team</p>
        </button>
      </div>
      <div class="col-3 d-flex justify-content-center align-items-center">
        <button v-if="account?.team == 'none' && user.isAuthenticated" class="px-3 py-2 btn btn-outline-primary d-flex align-items-center" @click="joinTeam('blue')">
          <p class="m-0">Join Blue Team</p>
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
import { accountService } from '../services/AccountService.js';
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
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      async joinTeam(teamName) {
        try {
          await accountService.joinTeam(teamName, AppState.account.id)
        } catch (error) {
          Pop.error(error, '[Joining Team]')
        }
      }
    };
  },
  components: { TeamScore }
}
</script>






<style lang="scss" scoped>

</style>