<script setup lang="ts">
import LoadingModal from '@/shared/icons/components/LoadingModal.vue';
import { useRoute } from 'vue-router';
import useClient from '@/clients/composables/useClient';
import { useMutation } from '@tanstack/vue-query';
import type { Client } from '@/clients/interfaces/client';
import clientApi from '@/api/client-api';

const route = useRoute();
//permite devolver un número o un NaN, que también lo es.
const { client, isLoading } = useClient( +route.params.id );

const updateClient = async( client:Client ):Promise<Client> => {
    const { data } = await clientApi.patch<Client>(`/clients/${ client.id }`, client )
    return data;
}

const clientMutation = useMutation( updateClient );

</script>

<template>
    <div>
        <h3>Guardando...</h3>
        <h3>Guardado</h3>

        <LoadingModal v-if="isLoading" />

        <div v-if="client">
            <form @submit.prevent="clientMutation.mutate( client! )">
                <h1> {{ client.name }}</h1>
                <input type="text" placeholder="Nombre" v-model="client.name"/>
                <input type="text" placeholder="Direccion"  v-model="client.address"/>
                <br>
                <button type="submit">Enviar</button>
            </form>
            <code> {{ client }}</code>
        </div>
    </div>
</template>

<style scoped></style>
