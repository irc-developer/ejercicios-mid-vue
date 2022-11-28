<script setup lang="ts">
import breakingBadApi from '@/api/breakingBadApi';
import { useQuery } from '@tanstack/vue-query';
import CardList from '../components/CardList.vue';
import type { Character } from '../interfaces/characters';
interface Props { title: string, visible:boolean}

const props = defineProps<Props>();
//La petición debe hacese aquí y enviarle a cardlist los characters


const getCharactersSlow = async (): Promise<Character[]> => {
    const { data } = await breakingBadApi.get<Character[]>("/characters");
    return data.filter(
        (character) => ![14, 17, 39].includes(character.char_id)
    );
};

const {
    isLoading,
    isError,
    data: characters,
    error,
} = useQuery(["characters"], getCharactersSlow, {
    //esto ya no hace falta porque ya lo tenemos instalado en el global
    // cacheTime: 1000 * 60, //Aunque se hace la petición lo que se muestra al usuario
    // refetchOnReconnect: true,
});

</script>

<template>
    <h1 v-if="isLoading"> Loading...</h1>
    <template v-else>
        <h2> {{ props.title }}</h2>
        <CardList :characters="characters || []"/>
    </template>
</template>


<style scoped>

</style>