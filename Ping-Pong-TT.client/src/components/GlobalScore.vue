<template>
  <div class="col-8 m-2">
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center global-board-head">
        <h3 class="text-center text-success">
          GLOBAL LEADERBOARD
        </h3>
      </li>



      <LeaderboardPlayer v-for="p in players" :player="p" />
    </ul>
  </div>
</template>


<script>
import { NewAccount } from '../models/NewAccount.js';
import LeaderboardPlayer from './LeaderboardPlayer.vue';

export default {
    props: {
        players: { type: [NewAccount], required: true }
    },
    setup() {
        return {};
    },
    components: { LeaderboardPlayer }
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