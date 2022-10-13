<template>

<div class="col-3 m-2">

<ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center global-board-head">
    <h3 class="text-center text-success">
      GLOBAL LEADERBOARD
    </h3  >
  </li>

  
  <li class="list-group-item d-flex align-items-center global-board text-light">
    <div>
      <img src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="" class="pfp">
      Dugus
    </div>
      <span class="badge bg-primary rounded-pill justify-content-between">250</span>
  </li>

  
  <li class="list-group-item d-flex justify-content-between align-items-center global-board text-light">
  <div>
    <img
      src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
      alt="" class="pfp">
    Tristan
  </div>
  <div>
    <span class="badge bg-primary rounded-pill">50</span>
  </div>
  </li>


  <li class="list-group-item d-flex justify-content-between align-items-center global-board text-light">
    <img
      src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
      alt="" class="pfp">
    Yo Mama
    <span class="badge bg-primary rounded-pill">1</span>
  </li>
</ul>

</div>




</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.global-board-head{
  background-color: rgb(43, 42, 44);
}


.global-board{
  background-color: rgb(4, 4, 4);
}

.pfp{
  height: 50px;
  width: 50px;
}
</style>