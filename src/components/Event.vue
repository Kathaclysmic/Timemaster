<template>
  <div id="box" @mouseover="upHere = true" @mouseleave="upHere = false" class="box">
    <p v-if="upHere" class="title is-7 is-centered">
      {{ cEvent.name }}</p>
  </div>
</template>

<script>
var box = document.getElementById("box")

export default {
  name: "event",
  props: {
    cEvent: Object
  },
  data() {
    return {
      upHere: false
    }
  }
};
</script>

<style scoped>
#box {
  background-color:blue;
  height:fit-content;
}
</style>