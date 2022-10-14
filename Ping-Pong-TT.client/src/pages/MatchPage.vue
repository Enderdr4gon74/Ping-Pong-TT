<template>
  <div class="container-fluid">
    <div class="row justify-content-around mt-5">
      <div class="col-4 bg-danger d-flex flex-column align-items-center scoreCard">
        <p v-if="match?.homePlayer">{{match?.homePlayer.name}}</p>
        <p v-else>Winner of Match: {{match?.set-1}}-{{match?.homePull}}</p>
        <h1>{{match?.homeScore}}</h1>
      </div>
      <div class="col-4 bg-primary d-flex flex-column align-items-center scoreCard">
        <p v-if="match?.awayPlayer">{{match?.awayPlayer.name}}</p>
        <p v-else>Winner of Match: {{match?.set-1}}-{{match?.awayPull}}</p>
        <h1>{{match?.awayScore}}</h1>
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
      match: computed(() => AppState.activeMatch)
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