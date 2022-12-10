<script setup lang="ts">
    import useClients from '@/clients/composables/useClients';

    const { totalPages, totalPageNumbers, currentPage, getPage } = useClients();
    
</script>

<template>
    <div>
        <button
            :disabled="currentPage === 1"            
            @click="getPage(currentPage - 1)"
        >Anterior</button>
        <button 
            v-for="number of totalPageNumbers"
            :key="number"
            :class="{ active: currentPage == number }"
            @click="getPage( number )">
                {{ number }}
            </button>
        <button
        :disabled="( currentPage === totalPages )"
        @click="getPage(currentPage + 1)"
            >Siguiente</button>
    </div>
</template>


<style scoped>
div {
    margin-top:10px;
}

button {
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid var( --color-border );
    color: var( --color-text);
    cursor: pointer;
    margin-right: 5px;
    transition: all .5s;
    padding: 10px
}

button:hover {
    background-color: hsla(160, 100%, 37%, 0.2);    
    transition: all .5s;


}

.active {
    background-color: hsla(160, 100%, 37%, 0.2);    
}
</style>