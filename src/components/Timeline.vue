<template>
    <!--Eventarea-->
    <div id="layoutInner">
        <div id="timeline" class="box">
            <GridLayout v-model:layout="layoutInner" :row-height="15" use-css-transforms prevent-collision is-draggable
                is-responsive>
                <template #item="{ item }">
                    <div class="card">
                        <span>{{ item.i }}</span>
                    </div>
                </template>
            </GridLayout>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue"
import event from "../components/Event.vue"
import { GridLayout, GridItem } from 'grid-layout-plus'

var layoutInner = reactive([])

var yVar = 0;

console.log("LAYOUT INNER AFTER CREATION ", layoutInner)

export default {
    name: "timeline",
    components: {
        event,
        GridItem,
        GridLayout
    },
    props: {
        character: Object
    },

    methods: {
        //method to draw the events on each timeline
        drawInnerLayout() {
            layoutInner = reactive([])
            console.log("DRAW INNER LAYOUT")
            console.log(layoutInner)
            layoutInner.length = 0;
            console.log(layoutInner)
            console.log("drawinnerlayout cChara ", this.character)
            //draw events on character i timeline
            for (let j = 0; j < this.character.events.length; j++) {
                var cEvent = this.character.events[j];
                console.log("y ", yVar)
                console.log("cEvent ", cEvent)
                console.log("layout inner before push ", layoutInner)
                layoutInner.push(
                    { x: cEvent.bDate[5], y: yVar, w: cEvent.eDate[5] - cEvent.bDate[5], h: 3, i: cEvent.name, static: false }
                )
                console.log("layout inner ", layoutInner)
            }
        },
    },
    setup(){
        layoutInner = []
        console.log("TIMELINE")
        console.log("layout inner data ", layoutInner)
        
    },
    data() {
        this.drawInnerLayout();
        return {
            layoutInner
        }
    }
}
</script>

<style scoped>
#layoutInner {}

#timeline {}

#line {
    background-color: brown;
    z-index: -5;
    height: 10px;
    top: 50%;
    position: absolute;
    width: 90vw !important;
}
</style>