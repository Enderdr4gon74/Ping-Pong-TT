<template>
  <div class="container">

    <!-- team 1 -->
    <div class="d-flex justify-content-center">
      <div class="col-3 bg-danger rounded-pill d-flex align-items-center justify-content-center mt-3 fs-5">
        <strong>Team Name (red)</strong>
      </div>


      <!-- round count -->
      <div class="col-3 d-flex align-items-center justify-content-center flex-column mb-3 rounded-bottom">
        <div class="pb-3 fs-5 ">
          <strong>Round: </strong>
          <span>1</span>
        </div>
        <div class="red-black fs-3 W d-flex justify-content-center px-5 rounded">
          <strong>VS</strong>
        </div>
      </div>


      <!-- team 2 -->
      <div class="col-3 bg-primary rounded-pill d-flex align-items-center justify-content-center mt-3 fs-5">
        <strong>Team Name (blue)</strong>
      </div>
    </div>


    <!-- team 1 score -->
    <div class="d-flex justify-content-center">
      <div class="col-6 d-flex justify-content-around mt-4 p-4 bluish rounded-bottom h7">
        <div class="col-3 border border-light bg-dark d-flex justify-content-center align-items-center h-4 rounded-3">
          <strong>09</strong>
        </div>


        <!-- team 2 score -->
        <div class="col-3 border border-light bg-dark d-flex justify-content-center align-items-center h-4 rounded-3">
          <strong><span>01</span></strong>
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
.red-black {
  background: rgb(22, 22, 22);
  background: linear-gradient(90deg, rgba(22, 22, 22, 1) 0%, rgba(74, 52, 52, 1) 31%, rgba(124, 63, 53, 1) 54%, rgba(142, 8, 8, 1) 75%, rgba(186, 0, 0, 1) 100%);
}

.bluish {
  background: rgb(9, 2, 78);
  background: linear-gradient(90deg, rgba(9, 2, 78, 1) 0%, rgba(52, 52, 74, 1) 31%, rgba(78, 83, 175, 1) 54%, rgba(8, 33, 142, 1) 75%, rgba(62, 52, 254, 1) 100%);
}

.h7 {
  height: 7rem;
}

.h4 {
  height: 4rem;
}
</style>