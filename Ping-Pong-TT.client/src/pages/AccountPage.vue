<template>
  <div class="about text-center">
    <!-- <h1>Welcome {{ account.name }}</h1> -->
    <img class="rounded mt-3" :src="account.picture" alt="" />
    <p>{{ account.name }}</p>
  </div>
  <!-- Button trigger modal -->
  <div class="container">

    <div class="row justify-content-center">

      <button type="button" class="rounded fs-3 btn btn-success w-25 mt-3" data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        Edit Account
      </button>
    </div>
  </div>





  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-success" id="exampleModalLabel">Edit Account</h1>
          <button type="button" class="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">




          <form @submit.prevent="handleSubmit()">
            <div class="mb-3">
              <label for="accountName" class="form-label text-success">Display Name:</label>
              <input type="word" class="form-control" id="accountName" aria-describedby="Account Name"
                v-model="editable.name" name="name" required>
            </div>
            <div class="mb-3">
              <label for="accountPicture" class="form-label text-success">Profile Picture:</label>
              <input type="url" class="form-control" id="accountPicture" aria-describedby="Account Picture"
                v-model="editable.picture" name="picture" required>
            </div>


            <button type="submit" class="btn btn-success">Submit</button>
          </form>


        </div>
        <!-- <div class="modal-footer justify-content-center"> -->
        <!-- <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel Tournament Creation</button> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          console.log(editable.value);
          Pop.error('[Not Implemented]')
          // await accountService.getAccount(editable.value);
          // await tourneyService.createTourney(editable.value)
        } catch (error) {
          Pop.error(error, "[Invalid Account Details]")
        }
      },
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
