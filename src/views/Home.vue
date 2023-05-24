<template>
  <div class="columns is-multiline is-mobile">
    <!--Menu for editing the timelines-->
    <div v-if="showSideBar" class="column is-2" id="sidebar">
      <div>
        <aside class="column is-full menu is-pulled-left">
          <!--Button for toggeling sidebar-->
          <div>
            <div
              
              id="hidesidebar"
              class="button is-ghost is-flex"
              @click="this.showSideBar = !this.showSideBar"
            >
              <figure class="image is-16x16">
                <img src="../assets/fast-forward.png" />
              </figure>
            </div>
          </div>
          <div>
            <p class="menu-label">Events</p>
            <ul class="menu-list">
              <li><a>Add new event</a></li>
              <li><a>Event A</a></li>
            </ul>
            <p class="menu-label">Characters</p>
            <ul class="menu-list">
              <li @click="addCharacter = true"><a>Add new character</a></li>
              <li v-for="(character, index) in this.characters" :key="index">
                <a>{{ characters[index].name }}</a>
              </li>
            </ul>
            <p class="menu-label">Universe</p>
            <ul class="menu-list">
              <li><a>Change Universe Name</a></li>
              <li><a>Change Calender Intervals</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
    <div
      id="openmenu"
      class="button is-ghost column is-1"
      @click="this.showSideBar = !this.showSideBar"
      v-if="!showSideBar"
    >
      <figure class="image is-16x16">
        <img src="../assets/fast-forward.png" />
      </figure>
    </div>
    <!--Editing area-->
    <div id="editingarea" class="column is-auto">
      <!--Title of the Universe-->
      <div class="title">
        <p>Universe Name</p>
      </div>
      <!--Area for editing the timeline-->
      <div class="columns is-multiline is-mobile has-background-dark">
        <!--Area for displaying different timelines-->
        <div class="column is-full">
          <div class="box">
            <!--timelinelist-->
            <ul>
              <li v-for="(timeline, index) in this.timelines" :key="index">
                <timeline :name="timelines[index].name"> </timeline>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <popup
    v-if="addCharacter"
    @close="this.addCharacter = !this.addCharacter"
    @handleInput="createCharacter"
    class="column is-full"
  ></popup>
</template>

<script>
import event from "../components/Event.vue";
import timeline from "../components/Timeline.vue";
import popup from "../components/PopUp.vue";

//Flags for showing certain elements
var showSideBar = true;
var addCharacter = false;

export default {
  name: "Home",
  components: {
    event,
    timeline,
    popup,
  },
  data() {
    return {
      timelines: [
        {
          name: "Calender",
          intervals: 0,
        },
      ],
      characters: [
        {
          name: "Jane Doe",
        },
      ],
      showSideBar,
      addCharacter,
    };
  },
  methods: {
    createCharacter(value){
      console.log(value)
      console.log("createcharacter")
      this.characters.push({name: value})
    }
  },
};
</script>

<style>
#editingarea {
  overflow-x: scroll;
}

#sidebar {
  position: sticky;
  overflow-x: auto;
}

#openmenu {
  z-index: 3;
  position: sticky;
  display: inline-block;
  vertical-align: top;
  max-height: 100%;
  overflow-y: hidden;
  width: 200px;
  top: 50%;
  left: 1rem;
  bottom: 0;
  padding: 30px;
}

#hidesidebar {
  transform: rotateY(180deg);
}
</style>