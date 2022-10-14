<template>
  <div class="d-flex justify-content-end p-5">
    <button class="rounded fs-3">
      Begin Tourney
    </button>
  </div>



  <div class="container">
    <div class="mt-5 d-flex justify-content-between">
      <!-- global leader board -->
      <div class="col-8">
        <GlobalScore />
      </div>


      <!-- TODO: add current match(es) button somewhere -->


      <!-- welcome + intro text -->
      <div class="row background-imag col-4">
        <p class="text-center pink fs-1">Welcome to Ping Pong Tournament Tracker!</p>
        <p class="text-center mt-2 mb-2 fs-2">Join the Future of Ping Pong</p>

        <p class="fs-4">
          Welcome to the future of ping pong, do you love ping ponging, do you need a place to display your ping pong
          prowess? well then this is the place for you, we here at KING PONG™️ believe in fair treatment of all ping
          pongers.
        </p>
      </div>
    </div>
  </div>



  <div class="container mt-5 pt-5 mb-5">
    <p class="fs-4">
      Do you like ping pong? Have you ever played a “Tournament” of ping pong, won, then felt as if it was all for
      nothing since there is nothing to show for your major W. We here at Team King Pong believe that all ping pongers
      deserve a
      platform to display their pong prowess. Today I'd like to introduce “Ping Pong TT” aka Ping Pong Tourney Tracker.
      This web application will be utilizing a custom api written with love by the King Pong team and what our website
      aims
      to do is create a place where passionate pongers can see who's the best, with an individual leader board as well
      as a
      team leaderboard.
    </p>

    <div class="fs-4 d-flex justify-content-around mt-4 pt-3">
      <button class="rounded">
        Alt Rules
      </button>

      <button class="rounded">
        Current Matches
      </button>
    </div>
  </div>
</template>









<script>
import GlobalScore from "../components/GlobalScore.vue";
export default {
  setup() {
    return {};
  },
  components: { GlobalScore }
}
</script>









<style scoped lang="scss">
.background-image {
  background-image: url('https://4.bp.blogspot.com/-tc-p6CzK6O0/WmWakDr5KmI/AAAAAAAACgU/pa2vTQ_KYho7pRQWFWLPDCwJIrEz08p5QCLcBGAs/s1600/comeback.jpg');
  min-height: 87vh;
  background-size: cover;
}

.pink {
  color: pink;
  font-weight: bold;
}
</style>