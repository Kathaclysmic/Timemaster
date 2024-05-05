<template>
    <div class="column is-full">
        <div class="columns is-multiline">
            <!--Character Name-->
            <div class="column is-full">
                <div class="is-inline-flex">
                    <p> <input v-model="charaData.cName" :placeholder="character.name"> </p>
                </div>
            </div>
            <!--Character Birthdate-->
            <div class="column is-full">
                <div>Birthday</div>
                <div class="is-inline-flex">
                    <div> 
                        <p>Date</p>
                        <input v-model="charaData.cBday.bDate[0]" :placeholder="character.birthday[0]">
                        <input v-model="charaData.cBday.bDate[1]" :placeholder="character.birthday[1]">
                        <input v-model="charaData.cBday.bDate[2]" :placeholder="character.birthday[2]">
                        <p>Time</p>
                        <input v-model="charaData.cBday.bDate[3]" :placeholder="character.birthday[3]">
                        <input v-model="charaData.cBday.bDate[4]" :placeholder="character.birthday[4]">
                        <input v-model="charaData.cBday.bDate[5]" :placeholder="character.birthday[5]">
                    </div>
                </div>
            </div>
            <!--Character Color-->
            <div class="column is-full">
                {{ character.color }}
            </div>
            <!--Character Events-->
            <div class="column is-full">
                <div data-coloris:true> </div>
                <select>
                    <option disabled value="">Please select one</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                </select>
            </div>
        </div>
        <!--Show Timeline-->
        <div>
            <input v-model="charaData.cShow" type="checkbox" id="checkbox" /> 
            <label for="checkbox">Show Timeline {{charaData.cShow }}</label>
        </div>
        <form @submit.prevent="submitChara">
            <button type="submit">Fertig</button>
        </form>
    </div>
</template>

<script>
import Event from "../objects/event"

var defBDay;

export default {
    name: "CharaPage",
    props: {
        character: Object,
    },
    methods: {
        submitChara() {
            console.log("SUBMIT CHARA")
            this.$emit('charaSubmitted', this.charaData)
        }
    },
    data() {
        defBDay = new Event("Birth", "Character was born", [0,0,0,0,0,0], [0,0,0,0,0,1], 0, false)
        return {
            charaData: {
                cName: "Name",
                cBday: defBDay,
                cColor: "red",
                cEvents: [defBDay],
                cShow: true
            }
        }
    }
}

</script>

<style></style>