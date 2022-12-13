<script setup lang="ts">
import LoadingModal from '@/shared/icons/components/LoadingModal.vue';
import { useRoute, useRouter } from 'vue-router';
import useClient from '@/clients/composables/useClient';
import { watch } from 'vue';

const route = useRoute();
const router = useRouter(); 
//permite devolver un número o un NaN, que también lo es.
const { client, isLoading, isError, clientMutation, updateClient, isUpdating,
isErrorUpdating,isUpdatingSuccess } = useClient( +route.params.id );


watch( isError, () => {
    if (isError.value ) router.replace('/clients')
})

watch( clientMutation.isSuccess , () => {
    setTimeout ( () => clientMutation.reset(), 2000  )
})


</script>

<template>
    <div>
        <h3 v-if="isUpdating">Guardando...</h3>
        <h3 v-if="isUpdatingSuccess">Guardado</h3>

        <LoadingModal v-if="isLoading" />

        <div v-if="client">
            <form @submit.prevent="updateClient( client! )">
                <h1> {{ client.name }}</h1>
                <input type="text" placeholder="Nombre" v-model="client.name"/>
                <input type="text" placeholder="Direccion"  v-model="client.address"/>
                <br>
                <button :disabled="isUpdating" type="submit">Enviar</button>
            </form>
            <code> {{ client }}</code>
        </div>
    </div>
</template>

<style scoped></style>
