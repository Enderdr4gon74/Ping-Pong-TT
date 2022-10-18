<template>
  <li class="list-group-item d-flex justify-content-between align-items-center global-board text-light">
        <div class="text-success d-flex gap-2 align-items-center">
          <img v-if="player.picture" src="" alt="">
          <img v-else src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="" class="pfp">
          <h4>{{player.name}}</h4>
        </div>
        <div class="bg-success d-flex gap-1 py-2 px-3 rounded-pill">
          <!-- <p class="m-0">{{player.wins}} <i class="mdi mdi-trophy"></i></p>
          <p class="m-0">{{player.losses}} <i class="mdi mdi-trophy-broken"></i></p> -->
          <div v-if="player.wins > 0">
            <p class="m-0" v-if="player.losses > 0">{{Math.round((player.wins/  player.losses)*100)}} %</p>  <!-- if wins are > 0 and losses are > 0 -->
            <p v-else class="m-0">{{Math.round((player.wins / 1)*100)}} %</p>  <!-- if wins are > 0 and losses are <= 0 -->
          </div>
          <div v-else>
            <p class="m-0" v-if="player.losses > 0">-{{Math.round(player.losses / 1)}} %</p>  <!-- if wins are <= 0 and losses are > 0 -->
            <p v-else class="m-0">0 %</p>  <!-- if wins are <= 0 and losses are <= 0 -->
          </div>
        </div>
      </li>
</template>


<script>
import { NewAccount } from '../models/NewAccount.js'
export default {
  props: {
    player: {type: NewAccount, required: true}
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>