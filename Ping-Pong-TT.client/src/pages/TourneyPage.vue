<template>

  <div class="container-fluid">
    <!-- {{matches[0].length}} -->
    <div class="row">
      <div v-for="m in matches.length+1" class="col-3 d-flex flex-column justify-content-around">
        <MatchCard v-for="s in matches[m-1]" :key="s.id" :match="s" class="my-2 " />
      </div>
    </div>
  </div>

</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { tourneyService } from '../services/TourneyService.js';
import Pop from '../utils/Pop.js';
import MatchCard from '../components/MatchCard.vue';

export default {
  setup() {
    const route = useRoute();
    async function getTourneyById() {
      try {
        await tourneyService.getTourneyById(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[Get Tourney By Id]");
      }
    }

    async function getMatchesByTourneyId() {
      try {
        await tourneyService.getMatchesByTourneyId(route.params.id)
      } catch (error) {
        Pop.error(error, "[Get Matches By Tourney Id]")
      }
    }

    onMounted(() => {
      getTourneyById();
      getMatchesByTourneyId();
    });

    return {
      tourney: computed(() => AppState.activeTourney),
      matches: computed(() => AppState.matches),
    };
  },
  components: { MatchCard }
}
</script>


<style lang="scss" scoped>

</style>