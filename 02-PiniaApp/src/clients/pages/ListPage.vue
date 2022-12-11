<script setup lang="ts">
import ClientList from "@/clients/components/ClientList.vue";
import LoadingModal from "@/shared/icons/components/LoadingModal.vue";
import PaginationNumbers from "@/clients/components/PaginationNumbers.vue";
import useClients from "@/clients/composables/useClients";

const {
    isLoading,
    clients,
    getPage,
    totalPages,
    currentPage,
} = useClients();
</script>

<template>
    <div>
        <h1>Lista de clientes</h1>
        <ClientList :clients="clients" />

        <PaginationNumbers 
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-changed="getPage"
        />

        <LoadingModal v-if="isLoading" />
    </div>
</template>

<style scoped></style>
