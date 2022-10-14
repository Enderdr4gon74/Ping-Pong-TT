<template>
  <div class="text-center m-1">
    <img class="profile-picture mt-3"
      src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
      alt="Profile-Picture">
    <h1>Username Here</h1>
  </div>
  <div class="container">
    <div class="m-1 profile-card card">
      <div class="justify-content-center d-flex">
      </div>
      <h3 class="text-success m-2">Facebook: <span class="text-primary">sucks</span></h3>
      <h3 class="text-success m-2">Steam: <span class="text-primary">fartsauce</span></h3>
      <h3 class="text-success m-2">Instagram: <span class="text-primary">dopdopdoppy</span></h3>
      <h3 class="text-success m-2">Taco Bell: <span class="text-primary">Bean Burrito, Grilled with Creamy Jalapeno
          Sauce</span></h3>
      <h3 class="text-success m-2">Github: <span class="text-primary">samwgit</span></h3>
      <h3 class="text-success m-2">Discord: <span class="text-primary">Dagda#5000</span></h3>
      <div class="text-center">
        <button type="button" class="btn btn-success m-2 w-25 text-center" data-bs-toggle="modal"
          data-bs-target="#staticBackdrop">
          Statistics
        </button>
      </div>
    </div>
  </div>


  <!-- Button trigger modal -->


  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog bg-dark">
      <div class="modal-content  bg-dark">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Username's Statistics</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h3 class="text-success">Rank: <span>1</span></h3>
          <h3 class="text-success">Team Rank: <span>1</span></h3>
          <h3 class="text-success">W/L Ratio: <span>75%</span></h3>
        </div>
        <div class="modal-footer text-center">
          <div class="justify-content-center d-flex">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Don't Care</button>
          </div>
          <!-- <button type="button" class="btn btn-primary">Cool Man</button> -->
        </div>
      </div>
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


<style lang="scss" scoped>
.profile-picture {
  height: 200px;
  width: 200px;
}

.profile-card {
  background-color: rgb(40, 38, 38);
}
</style>