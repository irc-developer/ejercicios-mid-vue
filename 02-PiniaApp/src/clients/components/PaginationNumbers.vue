<script setup lang="ts">
import { ref, toRef, watch } from "vue";

// const { totalPages, totalPageNumbers, currentPage, getPage } = useClients();

//Esto se puede optimizar haciendo que el módulo sea independiente de useClient.

// Hay que tener claro que para pasar propiedades usaremos PROPS mientras que si tenemos que pasar métodos usaremos el defineEmit del siguiente modo

interface Props {
    totalPages: number;
    currentPage: number;
}

interface Emits {
    (e: "pageChanged", page: number): void;
}

const props = defineProps<Props>();

//usamos toRef para recuperar las variables reactivas desde las props y asociarlas a la reactividad de este componente.
const totalPages = toRef(props, "totalPages");
const currentPage = toRef(props, "currentPage");

const emit = defineEmits<Emits>();

//Para el totalPageNumbers podemos obtenerla directamente de la operación sin recurrir al getClientes e independizarnos de él completamente
const totalPageNumbers = ref<number[]>([]);
// y como cambia con el tiempo la vigilamos.
watch(
    totalPages,
    () => {
        totalPageNumbers.value = [...new Array(totalPages.value)].map(
            (v, i) => i + 1
        );
    },
    { immediate: true } //el inmediate significa que se lanza nada más se carga y se calcula
);
</script>

<template>
    <div>
        <button
            :disabled="currentPage === 1"
            @click="emit('pageChanged', currentPage - 1)"
        >
            Anterior
        </button>
        <button
            v-for="number of totalPageNumbers"
            :key="number"
            :class="{ active: currentPage == number }"
            @click="emit('pageChanged', number)"
        >
            {{ number }}
        </button>
        <button
            :disabled="currentPage === totalPages"
            @click="emit('pageChanged', currentPage + 1)"
        >
            Siguiente
        </button>
    </div>
</template>

<style scoped>
div {
    margin-top: 10px;
}

button {
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid var(--color-border);
    color: var(--color-text);
    cursor: pointer;
    margin-right: 5px;
    transition: all 0.5s;
    padding: 10px;
}

button:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
    transition: all 0.5s;
}

.active {
    background-color: hsla(160, 100%, 37%, 0.2);
}
</style>
