<script setup lang="ts">
import { useCounterOptionsStore } from '@/store/counter-options';
import CounterOptionsValue from '@/counter/components/CounterOptionsValue.vue'
import { storeToRefs } from 'pinia';
import { useCounterSetupStore } from '@/store/counter-setup';


//RECUERDA QUE NO DEBES DESESTRUCTURAR LAS PROPIEDADES O GETERS DEL STATE PUES PIERDE LA REACTIVIDAD
const counterStore = useCounterSetupStore();
//SI QUEREMOS CONSERVAR LA REACTIVIDAD TENEMOS QUE PASARLE EL STORE A STORETOREFS DE PINIA PARA QUE LOS REFERENCIE
const {count, squareCount} = storeToRefs( counterStore );

//reset no funciona si desestructuramos
const {increment, incrementBy, $reset} = counterStore;

</script>

<template>
    <h1>Counter: {{ count }}</h1>
    <h1>Square: {{ squareCount }}</h1>

    <button @click="counterStore.increment()">+1</button>
    <button @click="counterStore.incrementBy(2)">+2</button>
    <button @click="counterStore.incrementBy(5)">+5</button>
    
    <!-- OJO AL MATOJO: función estándar de pinia que devuelve al estado inicial sin tener que definirlo, NO FUNCIONA SI LA DESESTRUCTURAMOS. -->
    <button @click="counterStore.$reset()">reset</button>

    <br>

    <CounterSetupValue />
</template>


<style scoped>
button {
    margin-right: 5px;
}
</style>