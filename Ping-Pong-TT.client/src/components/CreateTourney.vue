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




          <form>
            <div class="mb-3">
              <label for="TourneyName" class="form-label text-success">Name</label>
              <input type="word" class="form-control" id="TourneyName" aria-describedby="Tournament Name" required>
            </div>
            <div class="mb-3">
              <label for="TourneyDescription" class="form-label text-success">Description</label>
              <input type="word" class="form-control" id="TourneyDescription" minlength="10" maxlength="150" required>
            </div>
            <div class="mb-3">
              <label for="TourneyImage" class="form-label text-success">Image</label>
              <input type="url" class="form-control" id="TourneyImage" aria-describedby="emailHelp" required>
            </div>
            <div class="mb-3">
              <label for="TourneyCap" class="form-label text-success">Max Player Capacity</label>
              <input type="Number" class="form-control" id="TourneyCap" aria-describedby="emailHelp" required min="2">
            </div>
            <div>
              <label class="mb-1 text-success">Tournament Type</label>
              <select class="form-select form-select-sm mb-3" aria-label=".form-select-sm example">
                <option value="1">Solo</option>
                <option value="2">Duo</option>
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
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>