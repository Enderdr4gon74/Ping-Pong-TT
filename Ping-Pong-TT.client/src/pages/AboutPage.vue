<template>
  <div class="container h-100 pt-5 mb-5 d-flex flex-column justify-content-between">
    <div class=" d-flex justify-content-around mb-5 pt-3">
      <button @click="setMessage(2)" class="rounded btn btn-outline-light px-4 py-2 fw-bold fs-5">
        Rules
      </button>

      <button @click="setMessage(1)" class="rounded btn btn-outline-light px-4 py-2 fw-bold fs-5">
        Alternative Rules
      </button>

      <button @click="setMessage(0)" class="rounded btn btn-outline-light px-4 py-2 fw-bold fs-5">
        About Us
      </button>
    </div>


    <div class="text-special">
      <div v-if="aboutMessage == 0">
        <p class="fs-4">
          Do you like ping pong? Have you ever played a “Tournament” of ping pong, won, then felt as if it was all for
          nothing since there is nothing to show for your major W. We here at Team King Pong believe that all ping
          pongers
          deserve a
          platform to display their pong prowess. Today I'd like to introduce “Ping Pong TT” aka Ping Pong Tourney
          Tracker.
          This web application will be utilizing a custom api written with love by the King Pong team and what our
          website
          aims
          to do is create a place where passionate pongers can see who's the best, with an individual leader board as
          well
          as a
          team leaderboard.
        </p>
        <div class="row justify-content-center gap-2 peopleCard">
          <!-- add card bg and rounded -->
          <div class="col-8 text-light">
            <h1 class="special-text text-shadow">The Devs</h1>
          </div>
          <div class="col-5 personCard">
            <div class="row">
              <div class="col-4 d-flex align-items-center p-0">
                <img src="https://cdn.discordapp.com/attachments/1029089848574877750/1033045998752235690/IMG_1004.jpg"
                  alt="profile pic" class="img-fluid w-100">
              </div>
              <div class="col-8">
                <h4>Sam Wilkins</h4>
                <p>Hello, I was the Scrum Master and mostly assisted with front end on this project.</p>
                <ul>
                  <a href="https://samwilkins.com">
                    <li>https://samwilkins.com</li>
                  </a>
                  <a href="https://github.com/samwgit">
                    <li>https://github.com/samwgit</li>
                  </a>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-5 personCard">
            <div class="row">
              <div class="col-4 d-flex align-items-center p-0">
                <img src="https://thiscatdoesnotexist.com" alt="profile pic" class="img-fluid w-100">
              </div>
              <div class="col-8">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In minus fuga accusantium repellendus
                  officia dignissimos deleniti cupiditate adipisci necessitatibus iste. Dignissimos temporibus
                  voluptatibus nostrum.</p>
              </div>
            </div>
          </div>
          <div class="col-5 personCard">
            <div class="row">
              <div class="col-4 d-flex align-items-center p-0">
                <img src="https://thiscatdoesnotexist.com" alt="profile pic" class="img-fluid w-100">
              </div>
              <div class="col-8">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In minus fuga accusantium repellendus
                  officia dignissimos deleniti cupiditate adipisci necessitatibus iste. Dignissimos temporibus
                  voluptatibus nostrum.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="aboutMessage == 1">
        <p class="fs-4">
          alternate rules
          <!-- add dynamic rules here -->
        </p>
      </div>
      <div v-if="aboutMessage == 2">
        <ol class="">
          <li class="ps-1" v-for="rule in rules">
            <h4>{{rule.title}}</h4>
            <p class="ps-2">{{rule.body}}</p>
          </li>
        </ol>
        <h4>
          Rules Supported by:
          <a target="_blank" href="https://www.pongfit.org/official-rules-of-table-tennis">
            https://www.pongfit.org/official-rules-of-table-tennis
          </a>
        </h4>
      </div>
      <!-- <div class="position-relative bg-dark">
        <PIngPongLoader />
      </div> -->
    </div>
  </div>


</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { aboutService } from '../services/AboutService.js';
import Pop from '../utils/Pop.js';
import PIngPongLoader from '../components/Animations/PIngPongLoader.vue';

export default {
  setup() {
    return {
      aboutMessage: computed(() => AppState.aboutMessage),
      rules: computed(() => AppState.rules),
      async setMessage(num) {
        try {
          aboutService.setMessage(num);
        }
        catch (error) {
          Pop.error;
        }
      }
    };
  },
  components: { PIngPongLoader }
}
</script>


<style lang="scss" scoped>
.text-special {
  color: #a9b8d2;
}

.peopleCard {
  background-color: rgb(63, 61, 61);
  padding: 1rem;
  border-radius: 1rem;
}

.personCard {
  background-color: rgb(87, 84, 84);
  padding: 1rem;
  padding-left: 1.25rem;
  border-radius: 1rem;

  img {
    border-radius: 0.875rem;
  }
}

.text-shadow {
  text-shadow: 0.175rem 0.175rem 0.1125rem #2a2929;
}

.special-text {
  font-family: 'Permanent Marker', cursive;
}
</style>