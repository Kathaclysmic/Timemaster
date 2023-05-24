<!--Component for the Taskbar-->
<template>
  <div class="columns is-multiline is-mobile" id="menubar">
    <div class="column is-1"> </div>
    <mbutton label="New Universe"> </mbutton>
    <mbutton label="Save"> </mbutton>
    <mbutton label="Load"> </mbutton>
    <mbutton label="Help"> </mbutton>
    <mbutton label="About"> </mbutton>
  </div>
</template>

<script>
import mbutton from "./mButton.vue";

export default {
  name: "Menubar",
  components: {
    mbutton,
  },
};
</script>

<style>
#menubar {
  position: sticky;
  z-index: 10;
}
</style>