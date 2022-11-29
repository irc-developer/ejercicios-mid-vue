<script setup lang="ts">
import breakingBadApi from '@/api/breakingBadApi';
import { useQuery } from '@tanstack/vue-query';
import CardList from '../components/CardList.vue';
import type { Character } from '../interfaces/characters';
import characterStore from '@/store/character.store';
interface Props { title: string, visible:boolean}

const props = defineProps<Props>();
//La petición debe hacese aquí y enviarle a cardlist los characters


const getCharactersCacheFirst = async (): Promise<Character[]> => {

    if (characterStore.characters.count > 0 ) return characterStore.characters.list;
    const { data } = await breakingBadApi.get<Character[]>("/characters");
    return data;
};
useQuery(["characters"], getCharactersCacheFirst, {
    //esto ya no hace falta porque ya lo tenemos instalado en el global
    // cacheTime: 1000 * 60, //Aunque se hace la petición lo que se muestra al usuario
    // refetchOnReconnect: true,

    //Aquí además se puede extraer info según el estado de la pe4tición.
    onSuccess( data ) {
        characterStore.loadedCharacters( data );
    }
});

characterStore

</script>

<template>
    <!-- <h1 v-if="isLoading"> Loading...</h1> -->
    <h1 v-if="characterStore.characters.isLoading"> Loading...</h1>
    <template v-else>
        <h2> {{ props.title }}</h2>
        <CardList :characters="characterStore.characters.list"/>
    </template>
</template>


<style scoped>

</style>