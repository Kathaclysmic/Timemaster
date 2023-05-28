<template>
  <div class="columns is-mobile">
    <!--Menu for editing the timelines-->
    <div v-if="showSideBar" class="column is-3" id="sidebar">
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
              <li v-for="(event, index) in this.events" :key="index">
                <button
                  class="button is-white"
                  @click="
                    this.showEventEdits[index] = !this.showEventEdits[index]
                  "
                >
                  {{ events[index].name }}
                </button>
                <ul v-if="this.showEventEdits[index]">
                  <li><a>Edit Event</a></li>
                  <li><a>Delete Event</a></li>
                </ul>
              </li>
            </ul>
            <p class="menu-label">Characters</p>
            <ul class="menu-list">
              <li @click="addCharacter = true">
                <a>Add new character</a>
              </li>
              <li v-for="(character, index) in this.characters" :key="index">
                <button
                  class="button is-white"
                  @click="this.showCharacterEdits[index] = !this.showCharacterEdits[index]">
                  {{ characters[index].name }}
                </button>
                <ul v-if="this.showCharacterEdits[index]">
                  <li><a>Edit Character</a></li>
                  <li><a>Show Timeline</a> </li>
                  <li><a>Delete Character</a></li>
                </ul>
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
      class="button is-pulled-right is-ghost"
      @click="this.showSideBar = !this.showSideBar"
      v-if="!showSideBar"
    >
      <figure class="image is-16x16">
        <img src="../assets/fast-forward.png" />
      </figure>
    </div>
    <!--Editing area-->
    <div class="column is-auto">
      <!--Title of the Universe-->
      <div class="title is-fixed">
        <p>Universe Name</p>
      </div>
      <!--Area for editing the timeline-->
      <div id="editingarea" class=" column is-auto columns is-multiline is-mobile">
        <!--Area for displaying different timelines-->
        <div class="column">
          <div class="box is-flex">
            <!--timelinelist-->
            <ul class="columns">
              <li v-for="(timeline, index) in this.timelines" :key="index">
                <timeline
                  :name="timelines[index].name"
                  :events="events"
                  class="column is-full"
                >
                </timeline>
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
    @handleTimeline="createTimeline"
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
var showEventEdits = [false];
var showCharacterEdits = [false, false];

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
          events: [0],
        },
      ],
      characters: [
        {
          name: "Jane Doe",
          timeline: 0,
        },
        {
          name: "Gary Stue",
          timeline: 1,
        },
      ],
      events: [
        {
          name: "Beginning of the Universe",
          start: 0,
          end: 1,
          description: "Lorem Ipsum",
          characters: [0],
          id: 0,
        },
      ],
      showSideBar,
      addCharacter,
      showEventEdits,
      showCharacterEdits
    };
  },
  created() {
    for (let i = 0; i < this.characters.length; i++) {
      if (this.characters[i].timeline == 1) {
        this.timelines.push({
          name: this.characters[i].name,
          intervals: this.timelines[0].intervals,
        });
      }
    }
  },
  methods: {
    createCharacter(value) {
      this.characters.push({ name: value });
      this.showCharacterEdits.push(false);
    },
    createTimeline(value) {
      var arrayL = this.characters.length - 1;
      if (value) {
        this.timelines.push({
          name: this.characters[arrayL].name,
          timeline: 1,
          intervals: this.timelines[0].intervals,
        });
      }
    },
    editEvent() {},
  },
};
</script>

<style>
#editingarea {
  overflow-x: scroll;
}

#sidebar {
  position: sticky;
}

#openmenu {
  z-index: 3;
  position: sticky;
  display: inline-block;
  vertical-align: top;
  max-height: 100%;
  overflow-y: hidden;
  width: 50px;
  top: 50%;
  left: 1rem;
  bottom: 0;
  padding: 30px;
}

#hidesidebar {
  transform: rotateY(180deg);
}
</style>