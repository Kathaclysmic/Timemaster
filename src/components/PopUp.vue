<template>
  <div class="box columns is-multiline is-mobile" id="popup">
    <!--Close Button-->
    <div class="column is-full">
      <button @click="$emit('close')" class="button is-pulled-right">Close</button>
    </div>
    <!--Form for Character creation-->
    <div class="column is-full">
      <p class="title is-4">Create a new character</p>
      <input class="input" v-model="name" type="text" placeholder="Name"/>
      <p> {{name}} </p>
      <div class="column is-full"></div>
    </div>
    <!--Confirm Button-->
    <button class="button" @click="handleConfirm">Confirm</button>
  </div>
</template>

<script>
export default {
  name: "popup",
  props: ['modelValue'],
  emits: ['update:modelValue', 'close'],
  data() {
    return{
        name: ''
    }
  },
  methods: {
    handleConfirm(){
        this.$emit('close')
        this.$emit('handleInput', this.name)
    }
  }
};
</script>

<style scoped>
#popup {
  z-index: 5;
  position: absolute;
  width: auto;
  height: auto;
  left: 40%;
  top: 30%;
  
}
</style>