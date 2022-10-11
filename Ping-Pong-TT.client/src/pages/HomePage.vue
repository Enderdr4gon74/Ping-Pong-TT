<template>
<div class="background-imag"> 
  <h1 class="text-center pepto-bismol" >Welcome to Ping Pong Tournament Tracker!</h1>
<h1 class="text-center text-danger"></h1>
</div>
<h3 class="text-center mt-2 mb-2" >Join the Future of Ping Pong</h3>
<p>Welcome to the future of ping pong, do you love ping ponging, do you need a place to display your ping ong prowess? well then this is 
  the place for you, we here at KING PONG™️ beleive in fair treatment of all ping pongers, so this is why we are giving away free pepto glizmols
  to anyone who is an avid ping pong player blah blah blah lorem ipsum busm zooingos
</p>
<div class="row">
  <div class="col-6">
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
  </div>
</div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.background-image{
  background-image: url('https://4.bp.blogspot.com/-tc-p6CzK6O0/WmWakDr5KmI/AAAAAAAACgU/pa2vTQ_KYho7pRQWFWLPDCwJIrEz08p5QCLcBGAs/s1600/comeback.jpg');
  min-height: 87vh;
  background-size: cover; 
}

.pepto-bismol{
  color:  pink;
  font-weight: bold;
}
</style>