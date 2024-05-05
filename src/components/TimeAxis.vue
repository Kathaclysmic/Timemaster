<template>
    <div id="axis">
        <GridLayout v-model:layout="layoutAxis" :col-num="12" :row-height="30" is-draggable is-resizable
            vertical-compact use-css-transforms>
            <template #item="{ item }">
                {{ item.i }}
            </template>
        </GridLayout>
    </div>
</template>

<script>
import { reactive } from "vue"
import { GridLayout, GridItem } from 'grid-layout-plus'

//BasicLayout
var layoutAxis = reactive([])

export default {
    name: "timeaxis",
    components: {
        GridLayout,
        GridItem
    },
    props: {
        scale_low: Number,
        scale_high: Number
    },
    data(){
        const range = this.scale_high - this.scale_low;
        console.log(range)
        for(let i = 0; i<this.scale_high;i++){
            layoutAxis.push(
                {x: i, y: 0, w: 1, h: 1, i: i, static: true }
            )
        }
        console.log(layoutAxis)
        return {
            layoutAxis,
            range
        }
    }
}
</script>

<style>
#axis{
    width:100%
}

</style>