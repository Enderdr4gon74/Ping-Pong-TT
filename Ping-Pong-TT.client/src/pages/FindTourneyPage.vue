<template>
  <div class="component">

    <div class="container-fluid">
      <div class="row">
        <TourneyCard v-for="t in tourneys" :key="t.id" :tourney="t" />
      </div>
    </div>

  </div>
</template>



<script>
import Pop from '../utils/Pop.js';
import { tourneyService } from '../services/TourneyService.js'
import { onMounted } from 'vue';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import TourneyCard from '../components/TourneyCard.vue';

export default {
  setup() {
    async function getTourneys() {
      try {
        await tourneyService.getTourneys();
      }
      catch (error) {
        Pop.error(error, "[Get Tourneys]");
      }
    }
    onMounted(() => { getTourneys(); });
    return {
      tourneys: computed(() => AppState.tourneys)
    };
  },
  components: { TourneyCard }
}
</script>




<style lang="scss" scoped>

</style>