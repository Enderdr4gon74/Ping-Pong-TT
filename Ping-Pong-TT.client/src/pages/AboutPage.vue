<template>
  <div class="container h-100 pt-5 mb-5 d-flex flex-column justify-content-between">
    <div class=" d-flex justify-content-around mb-5 pt-3">
      <button @click="setMessage(2)" class="rounded btn btn-outline-light px-4 py-2 fw-bold fs-5">
        Rules
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
          <div class="col-8 text-light text-center">
            <h1 class="special-text text-shadow">The Devs</h1>
          </div>
          <div class="col-5 personCard">
            <div class="row h-100">
              <div class="col-4 d-flex align-items-center p-0">
                <img src="https://cdn.discordapp.com/attachments/1029089848574877750/1033045998752235690/IMG_1004.jpg"
                  alt="profile pic" class="img-fluid w-100">
              </div>
              <div class="col-8 d-flex flex-column justify-content-between">
                <div>
                  <h4>Sam Wilkins</h4>
                  <p>Hello, I was the Scrum Master for this project, I assisted with the front end on this project. </p>
                </div>
                <div class="row ps-2">
                  <div class="col-2 d-flex justify-content-center align-items-center">
                    <a target="_blank" href="https://samwilkins.com" title="Personal Website">
                      <h3><i class="mdi mdi-web"></i></h3>
                    </a>
                  </div>
                  <div class="col-2 d-flex justify-content-center align-items-center">
                    <a target="_blank" href="https://github.com/samwgit" title="Github">
                      <h3><i class="mdi mdi-github"></i></h3>
                    </a>
                  </div>
                  <div class="col-2 d-flex justify-content-center align-items-center">
                    <a target="_blank" href="https://www.linkedin.com/in/samuel-wilkins-aa366a254/" title="LinkedIn">
                      <h3><i class="mdi mdi-linkedin"></i></h3>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5 personCard">
            <div class="row h-100">
              <div class="col-4 d-flex align-items-center p-0">
                <img src="https://cdn.discordapp.com/attachments/1029089848574877750/1033055277878104186/tcoxjpg.jpg"
                  alt="profile pic" class="img-fluid w-100">
              </div>
              <div class="col-8 d-flex flex-column justify-content-between">
                <div>
                  <h4>Tristan Cox</h4>
                  <p>
                    I am the product owner and main logic designer, i made the
                  </p>
                </div>
                <div class="row ps-2">
                  <div class="col-2 d-flex justify-content-center align-items-center">
                    <a target="_blank" href="https://github.com/Enderdr4gon74" title="Github">
                      <h3><i class="mdi mdi-github"></i></h3>
                    </a>
                  </div>
                  <div class="col-2 d-flex justify-content-center align-items-center">
                    <a target="_blank" href="https://www.linkedin.com/in/tristan-cox-10a6571b9/" title="LinkedIn">
                      <h3><i class="mdi mdi-linkedin"></i></h3>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5 personCard">
            <div class="row h-100">
              <div class="col-4 d-flex align-items-center p-0">
                <img src="../assets/img/RyanImage.jpg" alt="profile pic" class="img-fluid w-100">
              </div>
              <div class="col-8 d-flex flex-column justify-content-between">
                <div>
                  <h4>Ryan Thrall</h4>
                  <p>I am one of the Backend Developers and created the tournament generation system.</p>
                </div>
                <div class="row ps-2">
                  <div class="col-2 d-flex justify-content-center align-items-center">
                    <a target="_blank" href="https://github.com/Ryan-Thrall" title="Github">
                      <h3><i class="mdi mdi-github"></i></h3>
                    </a>
                  </div>
                  <div class="col-2 d-flex justify-content-center align-items-center">
                    <a target="_blank" href="https://www.linkedin.com/in/ryan-thrall-a20aa7203/" title="LinkedIn">
                      <h3><i class="mdi mdi-linkedin"></i></h3>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import { onMounted } from 'vue';

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