<template>
  <div class="col-1 p-1">
    <img :src="award.img" :alt="award.name" :title="award.name" class="img-fluid w-100 h-100 rounded-4">
  </div>
</template>


<script>
import { Award } from '../models/Award.js';

export default {
  props: {
    award: {type: Award, required: true}
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>