<template>
  <div class="col-8 m-2">
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center global-board-head">
        <h3 class="text-center text-success">
          GLOBAL LEADERBOARD
        </h3>
      </li>



      <li class="list-group-item d-flex justify-content-between align-items-center global-board text-light">
        <div class="text-success d-flex gap-2 align-items-center">
          <img
            src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            alt="" class="pfp">
          Dugus
        </div>
        <div>
          <span class="badge bg-success rounded-pill">500</span>
        </div>
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
.global-board-head {
  background-color: rgb(43, 42, 44);
}


.global-board {
  background-color: rgb(4, 4, 4);
}

.pfp {
  height: 50px;
  width: 50px;
}
</style>