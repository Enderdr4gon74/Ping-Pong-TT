<template>
  <div class="container mt-5">
    <!-- SECTION: global leader board -->
    <ScoreBoard />




    <!-- SECTION: welcome + intro text -->
    <!-- <div class="row background-imag">
      <h1 class="text-center pink">Welcome to Ping Pong Tournament Tracker!</h1>

      <h3 class="text-center mt-2 mb-2">Join the Future of Ping Pong</h3>
      <p>Welcome to the future of ping pong, do you love ping ponging, do you need a place to display your ping ong
        prowess? well then this is
        the place for you, we here at KING PONG™️ believe in fair treatment of all ping pongers.
      </p>
    </div> -->
  </div>
</template>









<script>
import ScoreBoard from "../components/ScoreBoard.vue";
export default {
  setup() {
    return {};
  },
  components: { ScoreBoard }
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