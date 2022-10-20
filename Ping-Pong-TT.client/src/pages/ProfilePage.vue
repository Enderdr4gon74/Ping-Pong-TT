<template>
  <ProfileComp :account="profile" :awards="awards" />
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import ProfileComp from '../components/ProfileComp.vue';
import { accountService } from '../services/AccountService.js';
import { awardsService } from '../services/AwardsService.js'
import Pop from '../utils/Pop.js';
export default {
  setup() {
    const route = useRoute();
    async function getProfileById() {
      try {
        await accountService.getProfileById(route.params.id)
      } catch (error) {
        Pop.error(error, '[Getting Profile By Id]')
      }
    }
    async function getAwardsByPlayerId() {
      try {
        await awardsService.getAwardsByPlayerId(route.params.id)
      } catch (error) {
        Pop.error(error, '[Getting Awards By Player Id]')
      }
    }
    onMounted(()=>{
      getProfileById()
      getAwardsByPlayerId()
    })
    return {
      profile: computed(()=> AppState.activeAccount ),
      awards: computed(()=> AppState.ActiveAwards)
    };
  },
  components: { ProfileComp }
}
</script>


<style lang="scss" scoped>

</style>