<script setup lang="ts">
import { useCounterOptionsStore } from '@/store/counter-options';


const counter = useCounterOptionsStore();

</script>
<template>
    <h1>el valor dl contador es {{counter.count }}</h1>
    <h2>el último cambio fue {{ counter.lastChanged }}</h2>
</template>


<style scoped>

</style>