<template>
  <!-- Button trigger modal -->
  <button type="button" class="rounded fs-3 btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Create a Tourney
  </button>





  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-success" id="exampleModalLabel">Tournament Creation Form</h1>
          <button type="button" class="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">




          <form @submit.prevent="handleSubmit()">
            <div class="mb-3">
              <label for="TourneyName" class="form-label text-success">Tourney Name</label>
              <input type="word" class="form-control" id="TourneyName" aria-describedby="Tournament Name"
                v-model="editable.name" name="name" required>
            </div>

            <div class="mb-3">
              <label for="TourneyDescription" class="form-label text-success">Description</label>
              <input type="word" class="form-control" aria-describedby="Tournament Description" id="TourneyDescription"
                minlength="10" maxlength="150" required v-model="editable.description" name="description">
            </div>

            <div class="mb-3">
              <label for="TourneyImage" class="form-label text-success">Image</label>
              <input type="url" class="form-control" id="TourneyImage" aria-describedby="Tournament Image" required
                v-model="editable.coverImg" name="coverImg">
            </div>

            <div class="mb-3">
              <label for="TourneyCap" class="form-label text-success">Max Player Capacity</label>
              <input type="Number" class="form-control" id="TourneyCap" aria-describedby="Player Capacity" required
                min="2" v-model="editable.poolLimit" name="poolLimit">
            </div>

            <div>
              <label class="mb-1 text-success">Tournament Type</label>
              <select class="form-select form-select-sm mb-3" aria-label=".form-select-sm example"
                v-model="editable.type" name="type">
                <option value="single">Single Elimination</option>
                <option value="double">Double Elimination</option>
              </select>
            </div>

            <button type="submit" class="btn btn-success">Submit</button>
          </form>


        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel Tournament Creation</button>
          <!-- <button type="button" class="btn btn-success">Create</button> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue'
import { tourneyService } from '../services/TourneyService.js'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          console.log(editable.value);
          // await tourneyService.editAccount(editable.value);
          await tourneyService.createTourney(editable.value)
        } catch (error) {
          Pop.error(error, "[Handling Submit]")
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>


