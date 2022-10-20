<template>

  <MorphingCubeLoader v-if="tourney?.status == 'pending'" />

  <div class="container-fluid">


    <div class="row justify-content-around mt-2">
      <div class="col-3 justify-content-center">
      </div>

      <div class="col-3 d-flex flex-column align-items-center bg-grey stats-card" v-if="tourney?.status == 'pending'">
        <p>Created By: {{tourney?.creator.name}}</p>
        <p>Status: {{tourney?.status}}</p>
        <p>Players: {{tourney?.players.length}}</p>
        <p>Spots Remaining: {{ tourney?.poolLimit - tourney?.players.length }}</p>
        <div class="mb-3 d-flex justify-content-around w-100" v-if="tourney?.status == 'pending'">
          <button v-if="!isCompeting" class="btn btn-success fs-5 px-4" @click="joinTourney()"
            id="joinButton">Join</button>

          <button v-else class="btn btn-danger fs-5 px-4" @click="leaveTourney()" id="leaveButton">Leave</button>

          <button class="btn btn-success" v-if="isCreator" @click="beginTourney()">Start</button>
        </div>

        <!-- <div></div> -->
      </div>

      <!-- <div class="col-3 justify-content-center">
        <button class="btn btn-success" @click="startTourney()">Start Tourney</button>

        <button class="btn btn-danger" @click="cancelTourney()">Cancel Tourney</button>
    </div> -->
    </div>


    <!-- v-if="tourney?.status != 'pending'" -->
    <div v-if="tourney?.status != 'pending'" class="bg-grey d-flex">
      <div v-for="m in matches.length+1" class="d-flex flex-column justify-content-center set m-0">
        <MatchCard v-for="s in matches[m-1]" :key="s.id" :match="s" class="my-2 mx-5 matchCard" />
      </div>
    </div>


    <div v-if="tourney?.status != 'pending'" class="row justify-content-center pt-3">
      <div class="col-6 bg-grey">
        <div class="d-flex justify-content-center">
          <h4>Players</h4>
        </div>

        <div class="row">
          <div v-for="p in tourney?.players" class="col-1 my-2">
            <img :src="p.picture" alt="" class="playerImage" :title="p.name">
          </div>
        </div>
      </div>
      <h1 v-if="tourney?.winner" class="d-flex justify-content-center">{{tourney?.winner.name}} Won</h1>
    </div>

  </div>

</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { tourneyService } from '../services/TourneyService.js';
import Pop from '../utils/Pop.js';
import MatchCard from '../components/MatchCard.vue';
import PIngPongLoader from '../components/Animations/PIngPongLoader.vue';
import MorphingCubeLoader from '../components/Animations/MorphingCubeLoader.vue';

export default {
  setup() {
    const route = useRoute();
    async function getTourneyById() {
      try {
        await tourneyService.getTourneyById(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[Get Tourney By Id]");
      }
    }

    async function getMatchesByTourneyId() {
      try {
        await tourneyService.getMatchesByTourneyId(route.params.id)
      } catch (error) {
        Pop.error(error, "[Get Matches By Tourney Id]")
      }
    }

    onMounted(() => {
      getTourneyById();
      getMatchesByTourneyId();
    });

    return {
      tourney: computed(() => AppState.activeTourney),
      isCompeting: computed(() => AppState.activeTourney?.players.filter(p => p.id == AppState.account.id).length == 0 ? false : true),
      isCreator: computed(() => AppState.activeTourney?.creatorId == AppState.account?.id ? true : false),
      matches: computed(() => AppState.matches),
      account: computed(() => AppState.account),


      async joinTourney() {
        try {
          const joinButton = document.getElementById('joinButton')
          joinButton.disabled = true;

          await tourneyService.joinTourney(route.params.id)
        } catch (error) {
          Pop.error(error, '[Joining Tourney]')
        }
      },

      async leaveTourney() {
        try {
          const leaveButton = document.getElementById('leaveButton')
          leaveButton.disabled = true;
          await tourneyService.leaveTourney(route.params.id)
        } catch (error) {
          Pop.error(error, '[Leaving Tourney]')
        }
      },

      async beginTourney() {
        try {
          await tourneyService.beginTourney(route.params.id, 'active')
        } catch (error) {
          Pop.error(error, '[Beginning Tourney]')
        }
      }
    };
  },
  components: { MatchCard, PIngPongLoader, MorphingCubeLoader }
}
</script>


<style lang="scss" scoped>
.playerImage {
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
}

.stats-card {
  position: absolute;
  top: 8rem;
  right: 2rem;
}

.matchCard {
  width: 15rem;
  height: 7rem;
}

.set {
  width: 15rem;
}
</style>