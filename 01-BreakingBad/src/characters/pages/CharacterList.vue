<script setup lang="ts">
import CardList from '../components/CardList.vue'; 
import useCharacters from '../composables/useCharacters';
interface Props { title: string, visible:boolean}

const props = defineProps<Props>();
//La petición debe hacese aquí y enviarle a cardlist los characters


const {
 isLoading, hasError, errorMessage, characters, count
} = useCharacters(); 


</script>

<template>
    <!-- <h1 v-if="isLoading"> Loading...</h1> -->
    <h1 v-if="isLoading"> Loading...</h1>
    <div v-else-if="hasError">
        <h1>Error al cargar</h1>
        <p>{{ errorMessage }}</p>
    </div>
    <template v-else>
        <h2> {{ props.title }} - ( {{ count }} )</h2>
        <CardList :characters="characters"/>
    </template>
</template>


<style scoped>

</style>