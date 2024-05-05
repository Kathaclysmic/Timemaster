<template>
  <div class="columns is-multiline">
    <!--Topbar for navigation-->
    <div class="column is-full">
      <menubar></menubar>
      <hr />
    </div>
    <!--Menu for editing the timelines-->
    <div class="card" id="sidemenu">
      <div class="button is-ghost is-pulled-left" @click="this.showSideBar = !this.showSideBar" v-if="!showSideBar">
        <figure class="image is-16x16">
          <img src="../assets/fast-forward.png" />
        </figure>
      </div>
      <div v-if="showSideBar">
        <div>
          <!--Button for toggeling sidebar-->
          <div class="button is-ghost is-pulled-left" @click="this.showSideBar = !this.showSideBar">
            <figure class="image is-16x16">
              <img id="sidemenubutton" src="../assets/fast-forward.png" />
            </figure>
          </div>
        </div>
        <div class="column is-2" id="sidebar">
          <aside class="column is-full menu is-pulled-left">
            <div>
              <p class="menu-label">Events</p>
              <ul class="menu-list">
                <!--Buttons for eventmanagement-->
                <li @click="toggleAdd('event')">
                  <a>Add new event</a>
                </li>
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
              <!--Subsection for CharacterCreation-->
              <p class="menu-label">Characters</p>
              <ul class="menu-list">
                <li @click="toggleAdd('character')">
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
            </div>
          </aside>
        </div>
      </div>
    </div>
    <!--TimelineArea-->
    <div class="column box" id="timelinearea">
      <!--Editing area, show by default-->
      <div v-if="timelineF">
        <!--Title of the Universe-->
        <div class="title is-fixed">
          <p>Universe Name
            <button class="button">Edit</button>
          </p>
          <!--TODO Edit name Button-->
          <hr />
        </div>
        <!-- TODO Area for editing the timeline-->
        <div class="columns is-multiline is-mobile">
          <!--ZoomButtons-->
          <div id="zoom">
            <button class="button is-pulled-right" @click="handleZoomlevels('higher')">+</button>
            <button class="button is-pulled-right" @click="handleZoomlevels('lower')">-</button>
          </div>
          <!--Grid for displaying Timelines and events-->
          <div class="column is-full">
            <!--Outergrid for names and axis-->
            <div>
              <ul>
                <li v-for="(character, index) in this.characters" :key="index">
                  <div>
                    <div>
                      {{ character.name }}
                    </div>
                    <div>
                      <timeline :character=character></timeline>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!--TODO Charakter Page, show instead of editing area if editing-->
      <div v-if="characterF" class="columns is-multiline">
        <!--Close-Button-->
        <div class="column is-full">
          <button class="button is-pulled-right" @click="this.returnToTimeline()">Close</button>
        </div>
        <div class="column is-full">
          <charapage :character=dummy2 @charaSubmitted="handleCharaSubmitted"></charapage>
        </div>
      </div>
      <!--TODO Event Page, shown instead of editing area if editing-->
      <div v-if="eventF" class="columns is-multiline">
        <div class="column is-full">
          <button class="button is-pulled-right" @click="this.returnToTimeline()">Close</button>
        </div>
        <div class="column is-full">
          <eventPage :event=dummyEvent @eventSubmitted="handleEventSubmitted"> </eventPage>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import event from "../components/Event.vue";
import timeline from "../components/Timeline.vue";
import popup from "../components/PopUp.vue";
import charapage from "../components/CharaPage.vue";
import draggable from 'vuedraggable';
import Character from '../objects/character.js';
import menubar from "../components/Menubar.vue";
import Event from "../objects/event.js";
import eventPage from "../components/EventPage.vue";
import Universe from "../objects/universe.js";

//Flags for showing certain elements
//toggles the side menu
var showSideBar = false;
//toggles the add character Popup
var addCharacter = false;
//Toggles the event sub menu popup
var showEventEdits = [false];
//Toggles the character sub menu popup
var showCharacterEdits = [false, false];
//Flag for the timeline
var timelineF = true;
//flag for the character page
var characterF = false;
//flag for the event page
var eventF = false;

var zoom = 0;

var scale = [0, 10];

var charaIndex = 0;

const bEvent = new Event("Beginning of the Universe", "Lorem Ipsum", [0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1], [0], true);

//Placeholder Character for new Characters
const dummy = new Character("God", [0, 0, 0, 0, 0, 0], "Color", true, [bEvent], 0)

//Placeholder Event for new events
const dummyEvent = new Event("Epic Event", "Lorem Ipsum", [0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1], [dummy.id], false)

//array for storing characters
var characters = []

//Array for Storing Events
var events = [
  bEvent
];
var worldEvents = [bEvent];

//Placeholder Character for new Characters
const dummy2 = new Character("Name", [0, 0, 0, 0, 0, 0], "Color", true, [], 1)
characters[0] = dummy;
var layout = reactive([
  { x: 0, y: 0, w: 2, h: 2, i: '0' },
  { x: 2, y: 0, w: 2, h: 4, i: '1' }
])

var universe = new Universe("Universe Name", characters, events)
var shownCharacters = [];

export default {
  name: "Home",
  components: {
    event,
    timeline,
    popup,
    charapage,
    menubar,
    eventPage,
  },
  data() {
    this.drawGrid();
    return {
      submittedChara: {},
      submittedEvent: {},
      bEvent,
      //DUMMY Characters for Testing
      characters,
      events,
      showSideBar,
      addCharacter,
      showEventEdits,
      showCharacterEdits,
      timelineF,
      characterF,
      eventF,
      dummy,
      dummy2,
      dummyEvent,
      layout,
      charaIndex,
      zoom,
      range: scale[1] - scale[0],
      shownCharacters
    };
  },
  methods: {
    //method to handle zoomlevels
    handleZoomlevels(_dir) {
      if (_dir === "higher") {
        if (zoom > 0) {
          zoom--;
        } else {
          zoom = zoom;
        }
      }
      if (_dir === "lower") {
        zoom++;
      }
    },
    //calculate how many columns are needed
    calculateScale() {
      switch (zoom) {
        case 0 || 1:
          scale = [0, 60]
          break;
        case 2:
          scale = [0, 24]
          break;
        case 3:
          scale = [0, 31]
          break;
        case 4:
          scale = [0, 12]
          break;
        default:
          scale = [0, 10]
      }
    },
    //Method to Calculate and draw timeaxis
    drawAxis() {
      var axis = [];
      for (let i = 0; i < scale[1] - scale[0]; i++) {
        axis.push(
          { x: 1, y: 0, w: 1, h: 1, i: i, static: true }
        )
      }
      return axis;
    },
    //Method to draw the grid that displays the characters, timelines and events
    drawGrid() {
      layout.length = 0;
      this.charaIndex = 0;
      shownCharacters.length = 0;
      for (let i = 0; i < characters.length; i++) {
        var cChara = characters[i];
        //draw timeaxis
        //layout.concat(this.drawAxis());
        //draw lines for each character
        if (cChara.show === true) {
          this.charaIndex = i;
          shownCharacters.push(this.charaIndex);
          layout.push(
            { x: 0, y: i * 3, w: 1, h: 3, i: cChara.name, static: true }
          )
        }
      }
    },
    //Handling submitted character data
    handleCharaSubmitted(data) {
      var currentdate = new Date();
      var random = Math.floor(Math.random() * 1000);
      var id = random + currentdate.getDate() + (currentdate.getMonth() + 1) + currentdate.getFullYear() + currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds();
      this.submittedChara = data;
      this.submittedChara.cBday.name = this.submittedChara.cName + "'s Birth";
      var newChar = new Character(this.submittedChara.cName, this.submittedChara.cBday, "NA", this.submittedChara.cShow, [this.submittedChara.cBday], id)
      characters.push(newChar)
      events.push(newChar.birthday)
      this.drawGrid()
    },
    //Method to handle submitted events
    handleEventSubmitted(data) {
      var newEvent = new Event(data.cName, data.cDesc, data.cBdate, data.cEdate, [0], data.cWorldEvent)
      console.log(newEvent)
      events.push(newEvent)
      for(let z = 0; z < newEvent.characters.length; z++){
        console.log("first loop ", newEvent.characters[z])
        for(let y = 0; y < characters.length; y ++){
          console.log("second loop ", characters[y].id)
          if(characters[y].id === newEvent.characters[z]){
            console.log("if")
            characters[y].events.push(newEvent)
            console.log(events)
          }
        }
      }
      this.drawGrid();
    },
    //Methods to Toggle visible areas
    returnToTimeline() {
      this.timelineF = true;
      this.characterF = false;
      this.eventF = false;
    },
    //toggles between normal view, adding character page and adding events
    toggleAdd(_field) {
      if (_field == "character") {
        this.characterF = true;
        this.eventF = false;
        this.timelineF = false;
      }
      if (_field == "event") {
        this.eventF = true;
        this.characterF = false;
        this.timelineF = false;
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
      return eventsSorted;
    },
    addEvent() { },
  },
};
</script>

<style>
#name {
  width: fit-content;
}

#innerGrid {
  width: 80%;
  overflow: scroll;
}

#grid {
  margin-top: 2rem;
  margin-left: 1rem;
  position: relative;
  display: inline-flex;
}

#vl {
  border-left: 6px solid rgb(3, 3, 3);
  z-index: -1;
  height: 90vh;
}

#zoom {
  width: 100vw;
  margin-right: 3%;
}


#linecontainer {
  position: absolute;
  left: 50%;
}

#timelinearea {
  z-index: 0;
  overflow-y: scroll;
  height: 90vh;
  width: 100%;
}

#column {
  position: relative;
  margin-left: 10rem;
  width: fit-content;
}

#timeline {
  position: relative;
  margin-bottom: 2.5%;
}

#sidemenu {
  height: 90vh;
  overflow: scroll;
}

#editingarea {
  margin: 2rem;
}

#sidebar {
  position: sticky;
}

#sidemenubutton {
  transform: rotateY(180deg);

}

#timelines {
  z-index: 1;
}
</style>