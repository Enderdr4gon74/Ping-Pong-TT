<template>
  <div class="text-center m-1">
    <img class="profile-picture"
      src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
      alt="Profile-Picture">
    <h1>This The Profile Page</h1>
  </div>

  <div class="m-1">
    <h3 class="text-success">Github: <span>samwgit</span></h3>
    <h3 class="text-success">W/L Ratio: <span>75%</span></h3>
    <h3 class="text-success">Discord: <span>Dagda#5000</span></h3>
    <h3 class="text-success">Rank: <span>1</span></h3>
    <h3 class="text-success">Team Rank: <span>1</span></h3>
    <div class="bg-success">
    </div>
    <button class="btn btn-success">Statistics</button>
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
.profile-picture {
  height: 200px;
  width: 200px;
}
</style>