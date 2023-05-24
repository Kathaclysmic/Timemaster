<template>
    <div class="box">
        <!--Timelinename-->
        <div class="title is-5"> 
            {{name}}
        </div>
        <!--Timelineevents-->
    </div>
</template>

<script>
export default {
    name: "timeline",
    props: {
        name: String
    }
}
</script>