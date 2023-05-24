<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
import Menubar from "./components/Menubar.vue";
</script>

<template>
  <div>
    <menubar></menubar>
    <div class="notification is-danger">
      This app is a work in progress. Most features have yet to be implemented and the UI will be subject to change.
    </div>
    <router-view/>
  </div>
</template>

<script>

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  z-index: 0;
  padding: 2rem;
}
</style>
