<template>
  <div class="container-fluid py-4">
    <div class="row justify-content-center">
      <div class="col-9">
        <div class="profile-card row p-3">
          <div class="col-3 text-center">
            <img class="img-fluid w-100 rounded-4 px-1" :src="account.picture" :alt="account.name" :title="account.name" >
          </div>
          <div class="col-9 d-flex flex-column justify-content-between">
            <h1>{{account.name}}</h1>
            
            <div v-if="account.id">
              <h3 v-if="account.id == profile.id || account.id == user.id" class="text-success">Email: <span class="text-primary">{{account.email}}</span></h3>
            </div>
            <div v-else-if="account._id">
              <h3 v-if="account._id == profile._id || account._id == user._id" class="text-success">Email: <span class="text-primary">{{account.email}}</span></h3>
            </div>
            <div class="text-center">
              <button type="button" class="btn btn-success m-2 w-25 text-center" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                Statistics
              </button>
            </div>

              <div v-if="awards?.length > 0" class="light-grey-card row">
                <AwardComp v-for="a in awards" :award="a" />
              </div>
          </div>
        </div>
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
import { Award } from '../models/Award.js';
import AwardComp from './AwardComp.vue';

export default {
    props: {
        account: { type: Account, required: true },
        awards: { type: Array[Award], required: true }
    },
    setup() {
        // get account and its win loss data
        return {
            profile: computed(() => AppState.account),
            user: computed(() => AppState.user)
        };
    },
    components: { AwardComp }
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

.light-grey-card {
  background-color: rgb(63, 61, 61);
  padding: 1rem;
  border-radius: 1rem;
}
</style>