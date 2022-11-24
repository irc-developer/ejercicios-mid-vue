<script setup lang="ts">
import { ref } from "vue";
import breakingBadApi from "@/api/breakingBadApi";
import type { Character } from "../interfaces/characters";
import { useCharacters } from "../composables/useCharacters";

const { characters, isLoading, hasError, errorMessage } = useCharacters();
</script>

<template>
    <h1 v-if="isLoading">loading</h1>
    <h1 v-if="hasError"> {{ errorMessage }}</h1>
    <ul>
        <li v-for="{ char_id, name } of characters" :key="char_id">
            {{ name }}
        </li>
    </ul>
</template>

<style scoped></style>
