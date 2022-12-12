<script setup lang="ts">
import LoadingModal from '@/shared/icons/components/LoadingModal.vue';
import { useRoute } from 'vue-router';
import useClient from '@/clients/composables/useClient';

const route = useRoute();
//permite devolver un número o un NaN, que también lo es.
const { client, isLoading } = useClient( +route.params.id );

</script>

<template>
    <div>
        <h3>Guardando...</h3>
        <h3>Guardado</h3>

        <LoadingModal v-if="isLoading" />

        <div>
            <form>
                <h1>Fernando Herrera</h1>
                <input type="text" placeholder="Nombre" />
                <input type="text" placeholder="Direccion" />
                <br>
                <button type="submit"></button>
            </form>
            <code> {{ client }}</code>
        </div>
    </div>
</template>

<style scoped></style>
