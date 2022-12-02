<script setup lang="ts">
import type { Character } from "../interfaces/characters";
import CharacterCard from "@/characters/components/CharacterCard.vue";

//! 1.- Usando el suspens (está en fase beta)
// const { data: characters } = await breakingBadApi.get<Character[]>( '/characters' );
// const characters = ref<Character[]> ( data );

//! 2.- Composable Function
// const { characters, isLoading, hasError, errorMessage } = useCharacters();

//! 3.- Tanstack Query
// const getCharactersSlow = async (): Promise<Character[]> => {
//     const { data } = await breakingBadApi.get<Character[]>("/characters");
//     return data.filter( character => ![14, 17, 39].includes( character.char_id ) );
// };

interface Props {
    characters: Character[];
}

const props = defineProps<Props>();

</script>

<template>
    <div class="card-list">
        <!-- No desestructuramos el objeto pues es el hijo quien decide como se manipula la info-->
        <CharacterCard
            v-for="character of props.characters"
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
