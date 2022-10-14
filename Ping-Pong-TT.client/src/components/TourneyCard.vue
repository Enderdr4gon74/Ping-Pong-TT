<template>
  <div class="col-3 mt-4">
    <router-link :to="{name: 'Tourney', params: {id: tourney.id}}">
      <div class="card bg-card">
        <div class="card-body">
          <img :src="tourney.coverImg" alt="" class="img-fluid">
          <h5>{{tourney.name}}</h5>
        </div>
      </div>
    </router-link>

  </div>
</template>


<script>
import { Tourney } from '../models/Tourney.js';

export default {
  props: {
    tourney: { type: Tourney, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>