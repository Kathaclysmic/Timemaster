<!--Component for the Taskbar-->
<template>
  <!--TODO Buttons not functional rn-->
  <div class="columns  is-multiline is-mobile is-centered" id="menubar">
    <mbutton id="button" label="New"> </mbutton>
    <!--Asked chatgpt on how to write save method -> am Tired , so answer is saved in buglogs for another day-->
    <mbutton id="button" label="Save" @click="saveJson"> </mbutton>
    <mbutton id="button" label="Load"> </mbutton>
    <mbutton id="button" label="Help"> </mbutton>
    <mbutton id="button" label="About"> </mbutton>
  </div>
</template>

<script>
import mbutton from "./mButton.vue";
import { ref } from 'vue';

export default {
  name: "Menubar",
  components: {
    mbutton,
  },
  setup() {
    const jsonData = 
    {
      "name": "John",
      "age": 30,
      "city": "New York"
    }
    const saveJson = () => {
      try {
        console.log(jsonData)
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error parsing JSON data:', error);
      }
    };

    return {
      jsonData,
      saveJson
    };
  }
};
</script>

<style>
#menubar {
  position: sticky;
  z-index: 10;
}

#button {
  margin:0.25rem;
}
</style>