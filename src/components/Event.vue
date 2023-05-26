<template>
  <div class="box">
    <div class="title is-4">
      {{ label }}
    </div>
    <div>
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "event",
  props: {
    label: String,
    description: String,
    date: String,
    time: String,
    timelines: Number,
    groups: Array,
    characters: Array,
  },
};
</script>

<style scoped>
.box {
  width: 100%;
}
</style>