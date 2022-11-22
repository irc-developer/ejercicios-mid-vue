<script setup lang="ts">
import breakingBadApi from '@/api/breakingBadApi';
import type { Character } from '../interfaces/characters';

 breakingBadApi.get< Character[] >('/characters')
    .then( ( resp ) => console.log(resp.data[0].name))

</script>

<template>
    <ul>
        <li>Hola</li>
        <li>Hola</li>
        <li>Hola</li>
    </ul>
</template>


<style scoped>

</style>