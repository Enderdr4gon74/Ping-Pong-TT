<template>
  <div class="text-center m-1">
    <img class="profile-picture mt-3" :src="account.picture" alt="Profile-Picture">
    <h1>{{account.name}}</h1>
  </div>
  <div class="container">
    <div class="m-1 profile-card card">
      <div class="justify-content-center d-flex">
      </div>
      <h3 class="text-success m-2">Email: <span class="text-primary">{{account.email}}</span></h3>
      <!-- <h3 class="text-success m-2">Steam: <span class="text-primary">fartsauce</span></h3> -->
      <!-- <h3 class="text-success m-2">Instagram: <span class="text-primary">dopdopdoppy</span></h3> -->
      <!-- <h3 class="text-success m-2">Taco Bell: <span class="text-primary">Bean Burrito, Grilled with Creamy Jalapeno
          Sauce</span></h3> -->
      <!-- <h3 class="text-success m-2">Github: <span class="text-primary">samwgit</span></h3> -->
      <!-- <h3 class="text-success m-2">Discord: <span class="text-primary">Dagda#5000</span></h3> -->
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
          <h1 class="modal-title fs-5" id="staticBackdropLabel">{{account.name}}'s Statistics</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body px-3">
          <div v-if="account">
            <!-- <div class="d-flex justify-content-between">
              <h3 class="text-success">Rank: </h3>
              <h3>1</h3>
            </div>
            <div>
              <h3 class="text-success">Team Rank: </h3>
              <span>1</span>
            </div> -->
            <div class="d-flex justify-content-between">
              <h3 class="text-success">Wins: </h3>
              <h3>{{account.wins}} <i class="mdi mdi-trophy"></i></h3>
            </div>
            <div class="d-flex justify-content-between">
              <h3 class="text-success">Losses: </h3>
              <h3>{{account.losses}} <i class="mdi mdi-trophy-broken"></i></h3>
            </div>
            <div v-if="account.losses > 0" class="d-flex justify-content-between">
              <h3 class="text-success">W/L Ratio: </h3>
              <h3>{{ Math.round(( account.wins /  (account.wins + account.losses) ) * 100 ) }} <i class="mdi mdi-percent"></i></h3>
            </div>
          </div>
        </div>
        <div class="modal-footer text-center">
          <div class="justify-content-center d-flex">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Don't Care</button>
          </div>
          <!-- <button type="button" class="btn btn-primary">Cool Man</button> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Account } from '../models/Account.js';

export default {
  props: {
    account: { type: Account, required: true }
  },
  setup() {
    // get account and its win loss data
    return {
      // account: computed(() => AppState.activeAccount)
    }
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