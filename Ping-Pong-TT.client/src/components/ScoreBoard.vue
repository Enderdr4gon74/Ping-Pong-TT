<template>
  <div class="container">

    <div class="d-flex gap-3">
      <!-- SECTION: team 1 -->
      <div class="col-2 bg-danger rounded-pill d-flex align-items-center justify-content-center mt-3 fs-5">
        <strong>Team Name (red)</strong>
      </div>

      <div class="col-2 d-flex align-items-center justify-content-center flex-column mb-3 rounded-bottom">
        <!-- SECTION: round count -->
        <div class="pb-3 fs-5 ">
          <strong>Round: </strong>
          <span>1</span>
        </div>

        <div class="red-black fs-3 W d-flex justify-content-center">
          <strong>VS</strong>
        </div>
      </div>

      <!-- SECTION: team 2 -->
      <div class="col-2 bg-primary rounded-pill d-flex align-items-center justify-content-center mt-3 fs-5">
        <strong>Team Name (blue)</strong>
      </div>
    </div>

    <div class="col-6 d-flex justify-content-between p-3 px-4 mt-3 mx-4">
      <div class="col-3">
        <p>Team 1 score </p>
      </div>

      <div class="col-3">
        <p> Team 2 score</p>
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
.red-black {
  background: rgb(22, 22, 22);
  background: linear-gradient(90deg, rgba(22, 22, 22, 1) 0%, rgba(74, 52, 52, 1) 31%, rgba(124, 63, 53, 1) 54%, rgba(142, 8, 8, 1) 75%, rgba(186, 0, 0, 1) 100%);
}

.W {
  width: 5rem;
}
</style>