<template>
  <div class="col-3 mt-4">
    <router-link :to="{name: 'Tourney', params: {id: tourney.id}}">
      <div class="card bg-card">
        <div class="card-body">
          <img :src="tourney.coverImg" alt="" class="img-fluid">
          <h5>{{tourney.name}}</h5>
          <div class="d-flex" v-if="tourney.status == 'canceled'">
            <div class="bg-danger text-dark w-100 d-flex justify-content-center p-1 rounded-2">
              <p class="m-0">Canceled</p>
            </div>
          </div>
          <div class="d-flex" v-if="tourney.status == 'pending'">
            <div class="bg-warning text-dark w-100 d-flex justify-content-center p-1 rounded-2">
              <p class="m-0">Pending</p>
            </div>
          </div>
          <div class="d-flex" v-if="tourney.status == 'active'">
            <div class="bg-primary text-dark w-100 d-flex justify-content-center p-1 rounded-2">
              <p class="m-0">Active</p>
            </div>
          </div>
          <div class="d-flex" v-if="tourney.status == 'complete'">
            <div class="bg-success text-dark w-100 d-flex justify-content-center p-1 rounded-2">
              <p class="m-0">Complete</p>
            </div>
          </div>
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