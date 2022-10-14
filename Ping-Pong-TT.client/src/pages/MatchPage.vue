<template>
  <div class="container-fluid">
    <div class="row justify-content-around mt-5">
      <div class="col-4 bg-danger d-flex flex-column align-items-center scoreCard">
        <p>{{match?.homePlayer.name}}</p>
        <h1>{{match?.homeScore}}</h1>
      </div>
      <div class="col-4 bg-primary d-flex flex-column align-items-center scoreCard">
        <p>{{match?.awayPlayer.name}}</p>
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
    console.log(route.params.id)
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
  width: 10rem;
  height: 10rem;
}
</style>