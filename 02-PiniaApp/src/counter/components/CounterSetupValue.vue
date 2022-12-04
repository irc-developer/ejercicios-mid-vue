<script setup lang="ts">
import { useCounterSetupStore } from '@/store/counter-setup';


const counter = useCounterSetupStore();

</script>
<template>
    <h1>el valor dl contador es {{counter.count }}</h1>
    <h2>el último cambio fue {{ counter.lastChanged }}</h2>
</template>


<style scoped>

</style>