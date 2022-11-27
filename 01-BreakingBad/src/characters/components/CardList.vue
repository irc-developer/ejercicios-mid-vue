<script setup lang="ts">
import { ref } from "vue";
import breakingBadApi from "@/api/breakingBadApi";
import type { Character } from "../interfaces/characters";
import { useCharacters } from "../composables/useCharacters";
import { useQuery } from "@tanstack/vue-query";
import CharacterCard from "@/characters/components/CharacterCard.vue";

//! 1.- Usando el suspens (está en fase beta)
// const { data: characters } = await breakingBadApi.get<Character[]>( '/characters' );
// const characters = ref<Character[]> ( data );

//! 2.- Composable Function
// const { characters, isLoading, hasError, errorMessage } = useCharacters();

//! 3.- Tanstack Query
const getCharactersSlow = async (): Promise<Character[]> => {
    const { data } = await breakingBadApi.get<Character[]>("/characters");
    return data.filter( character => ![14, 17, 39].includes( character.char_id ) );
};
const {
    isLoading,
    isError,
    data: characters,
    error,
} = useQuery(["characters"], getCharactersSlow, {
    cacheTime: 1000 * 60, //Aunque se hace la petición lo que se muestra al usuario
    refetchOnReconnect: true,
});
</script>

<template>
    <h1 v-if="isLoading">loading</h1>
    <div class="card-list">
        <!-- No desestructuramos el objeto pues es el hijo quien decide como se manipula la info-->
        <CharacterCard
            v-for="character of characters"
            :key="character.char_id"
            :character="character"
        />
    </div>
</template>

<style scoped>
.card-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>
