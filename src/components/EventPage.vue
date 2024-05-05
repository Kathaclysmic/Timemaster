<template>
    <!--Titel-->
    <div>{{ event.name }}</div>
    <!--Beschreibung-->
    <div>{{ event.desc }}</div>
    <!--Zeitlicher Rahmen-->
    <div>
        <!--Beginn-->
        <div>Start: {{ event.bDate[0] }}.{{ event.bDate[1] }}.{{ event.bDate[2] }}, {{ event.bDate[3] }}:{{
            event.bDate[4] }}:{{ event.bDate[5] }}</div>
        <!--Ende-->
        <div>End: {{ event.eDate[0] }}.{{ event.eDate[1] }}.{{ event.eDate[2] }}, {{ event.eDate[3] }}:{{ event.eDate[4]
            }}:{{ event.eDate[5] }}</div>
        <!--Dauer-->
        <div> {{ calcDur(event.bDate, event.eDate)[0] }} days, {{ calcDur(event.bDate, event.eDate)[1] }} months, {{ calcDur(event.bDate, event.eDate)[2] }} years, {{ calcDur(event.bDate, event.eDate)[3] }} hours, {{ calcDur(event.bDate, event.eDate)[4] }} minutes and {{ calcDur(event.bDate, event.eDate)[5] }} seconds.</div>
    </div>
    <!--Charaktere-->
    <div></div>
    <!--Worldevent-->
    <div>Worldevent:
        <!--Checkbox-->
        <input type="checkbox" id="checkbox" v-model="checked" />
        <label for="checkbox"> </label>
    </div>
    <!--Confirm-->
    <div>
        <button class="button">Fertig</button>
    </div>
</template>

<script>
</script>

<script>
export default {
    name: "eventPage",
    props: {
        event: Object
    },
    methods: {
        //calculate the duration of the event
        calcDur(_start, _end){
            let dur = [];
            console.log(_start)
            for(let i = 0; i<_start.length; i++){
                dur[i] = _end[i] - _start[i]
            }
            return dur;
        }
    }
}
</script>