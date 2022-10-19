<template>
  <div class="row justify-content-center me-0">

    <div class="col-4 m-2">

      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-center align-items-center global-board-head">
          <h3 class="text-center text-danger">
            Red Team
          </h3>
        </li>


        <LeaderboardPlayer v-for="p in redPlayers" :player="p" />




      </ul>
    </div>



    <div class="col-4 m-2">
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-center align-items-center global-board-head">
          <h3 class="text-center text-primary">
            Blue Team
          </h3>
        </li>

        <LeaderboardPlayer v-for="p in bluePlayers" :player="p" />
      </ul>
    </div>
  </div>
</template>


<script>
import { NewAccount } from '../models/NewAccount.js';

export default {
  props: {
    redPlayers: { type: [NewAccount], required: true },
    bluePlayers: { type: [NewAccount], required: true },
  },
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