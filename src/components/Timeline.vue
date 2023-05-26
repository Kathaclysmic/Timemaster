<template>
    <div id="timeline" class="box">
        <!--Timelinename-->
        <div class="title is-5"> 
            {{name}}
        </div>
        <!--Timelineevents-->
        <div>
            <ul class ="columns is-multiline is-mobile is-centered">
                <li class="column is-full" v-for="(event, index) in events" :key="index">
                    <event :label="events[index].name" :description="events[index].description"> </event>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import event from "../components/Event.vue"

export default {
    name: "timeline",
    components:{
        event
    },
    props: {
        name: String,
        events: Array
    }
}
</script>

<style scoped> 
#timeline{
    width: 15rem;
}

</style>