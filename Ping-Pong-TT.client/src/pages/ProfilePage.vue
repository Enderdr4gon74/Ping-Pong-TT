<template>
  <ProfilePage :account="profile" />
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import ProfilePage from '../components/ProfilePage.vue';
import { accountService } from '../services/AccountService.js';
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
    onMounted(()=>{
      getProfileById()
    })
    return {
      profile: computed(()=> AppState.activeAccount )
    };
  },
  components: { ProfilePage }
}
</script>


<style lang="scss" scoped>

</style>