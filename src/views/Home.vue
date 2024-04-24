<template>
  <div class="columns is-mobile">
    <!--Menu for editing the timelines-->
    <div v-if="showSideBar" class="column is-3" id="sidebar">
      <div>
        <aside class="column is-full menu is-pulled-left">
          <!--Button for toggeling sidebar-->
          <div>
            <div id="hidesidebar" class="button is-ghost is-flex" @click="this.showSideBar = !this.showSideBar">
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
                <button class="button is-white" @click="
                  this.showEventEdits[index] = !this.showEventEdits[index]
                  ">
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
                <button class="button is-white" @click="
                  this.showCharacterEdits[index] =
                  !this.showCharacterEdits[index]
                  ">
                  {{ characters[index].name }}
                </button>
                <ul v-if="this.showCharacterEdits[index]">
                  <li><a>Edit Character</a></li>
                  <li><a>Show Timeline</a></li>
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
    <div id="openmenu" class="button is-pulled-right is-ghost" @click="this.showSideBar = !this.showSideBar"
      v-if="!showSideBar">
      <figure class="image is-16x16">
        <img src="../assets/fast-forward.png" />
      </figure>
    </div>
    <!--Editing area-->
    <div class="column is-auto">
      <!--Title of the Universe-->
      <div class="title is-fixed">
        <p>Universe Name</p>
        <!--TODO Edit name Button-->
        <hr />
      </div>
      <!-- TODO Area for editing the timeline-->
      <div>
        <!--TODO Grid for Timeline-->
        <div>
          <!--TODO Moments displayed at the top-->
          <div> </div>
          <!--TODO Character names being displayed on the left - starting point varrying depending on characters birthday-->
          <div> </div>
          <!--TODO Actual Timelines with events, make events draggable, for easy adjustments-->
          <div> 
          </div>
        </div>
      </div>
    </div>
  </div>
  <popup v-if="addCharacter" @close="this.addCharacter = !this.addCharacter" @handleInput="createCharacter"
    @handleTimeline="createTimeline" class="column is-full"></popup>
</template>

<script>
import event from "../components/Event.vue";
import timeline from "../components/Timeline.vue";
import popup from "../components/PopUp.vue";
import draggable from 'vuedraggable'


//Flags for showing certain elements
var showSideBar = true;
var addCharacter = false;
var showEventEdits = [false];
var showCharacterEdits = [false, false];
var minutes = [];
var hours = [minutes];
var days = [hours];
var weeks = [days];
var months = [weeks];
var years = [months];
var decades = [years];
var centuries = [decades];
var millenia = [centuries];

var events = [
  {
    name: "Beginning of the Universe",
    start: 0,
    end: 1,
    description: "Lorem Ipsum",
    characters: [0],
    id: 0,
  },
  {
    name: "Test",
    start: 3,
    end: 6,
    description: "Lorem Ipsum",
    characters: [1],
    id: 1,
  },
  {
    name: "Test2",
    start: 8,
    end: 10,
    description: "Lorem Ipsum",
    characters: [1],
    id: 2,
  },
];
console.log(events);

var timeScale = [];

for (var i = 0; i < events.length; i++) {
  timeScale.push(events[i].end - events[i].start);
}

console.log(timeScale);

export default {
  name: "Home",
  components: {
    event,
    timeline,
    popup,
    draggable
  },
  data() {
    return {
      drag: false,
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
      events,
      timeScale,
      showSideBar,
      addCharacter,
      showEventEdits,
      showCharacterEdits,
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
    editEvent() { },
    //Method to sort events chronologically
    sortEvents(_events) {
      var eventsSorted = [];
      for (i = 0; i < _events.length; i++) {
        var first = 0;
        if (_events[i] < first) {
          first = events[i].start;
          eventsSorted.push(_events[i]);
          _events = _events.splice(i, 1);
          break;
        }
        if (_events.length > 0) {
          this.sortEvents(_events);
        }
      }
      console.log(eventsSorted);
      return eventsSorted;
    },
    addEvent() { },
  },
};
</script>

<style>
#editingarea {
  overflow-x: scroll;
  margin: 2rem;
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

#timelines {
  z-index: 1;
}
</style>