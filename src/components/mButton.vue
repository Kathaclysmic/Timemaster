<template>
    <button class="button is-light column is-2"> 
        {{label}}
    </button>
</template>

<script>
export default {
    name: "mbutton",
    props: {
        label: String
    }
}
</script>