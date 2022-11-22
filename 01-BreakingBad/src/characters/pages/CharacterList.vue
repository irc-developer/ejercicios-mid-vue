<script setup lang="ts">
import CardList from '../components/CardList.vue';
interface Props { title: string, visible:boolean}

const props = defineProps<Props>();


</script>

<template>
    <h2> {{ props.title }}</h2>
    <CardList />
</template>


<style scoped>

</style>