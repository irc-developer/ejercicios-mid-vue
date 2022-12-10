<script setup lang="ts">

import type { Client } from '@/clients/interfaces/client';

//Recuerda que hay que seguir el estándar para definir las interfaces en un componente y es 
// que las props se definen como interfaz que puede llamar a otras interfaces
// const props = defineProps<Client[]>();

interface Props {
   clients: Client[]
}
const props = defineProps<Props>();

</script>

<template>
    <div>
        <ul>
            <li v-for ="client of props.clients" :key="client.id">
                <RouterLink :to="{
                    name:'client-id',
                    params: { id: client.id }
                }">
                    {{ client.name }}
                </RouterLink>
            </li>
        </ul>
    </div>
</template>


<style scoped>

</style>