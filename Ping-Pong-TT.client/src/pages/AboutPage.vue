<template>
  <div class="container h-100 mt-5 pt-5 mb-5 d-flex flex-column justify-content-between">
    <div class="">
      <div v-if="aboutMessage == 0">
        <p class="fs-4">
          Do you like ping pong? Have you ever played a “Tournament” of ping pong, won, then felt as if it was all for
          nothing since there is nothing to show for your major W. We here at Team King Pong believe that all ping pongers
          deserve a
          platform to display their pong prowess. Today I'd like to introduce “Ping Pong TT” aka Ping Pong Tourney
          Tracker.
          This web application will be utilizing a custom api written with love by the King Pong team and what our website
          aims
          to do is create a place where passionate pongers can see who's the best, with an individual leader board as well
          as a
          team leaderboard.
        </p>
      </div>
      <div v-if="aboutMessage == 1">
        <p class="fs-4">
          alternate rules
        </p>
      </div>
      <div v-if="aboutMessage == 2">
        <p class="fs-4">
          regular rules
        </p>
      </div>
    </div>

    <div class=" d-flex justify-content-around mt-4 pt-3">
      <button @click="setMessage(2)" class="rounded btn btn-outline-light px-4 py-2 fw-bold fs-5">
        Rules
      </button>

      <button @click="setMessage(1)" class="rounded btn btn-outline-light px-4 py-2 fw-bold fs-5">
        Alternative Rules
      </button>

      <button @click="setMessage(0)" class="rounded btn btn-outline-light px-4 py-2 fw-bold fs-5">
        About Us
      </button>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { aboutService } from '../services/AboutService.js';
import Pop from '../utils/Pop.js';

export default {
  setup(){
    return {
      aboutMessage: computed(()=> AppState.aboutMessage),
      async setMessage(num) {
        try {
          aboutService.setMessage(num)
        } catch (error) {
          Pop.error
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>