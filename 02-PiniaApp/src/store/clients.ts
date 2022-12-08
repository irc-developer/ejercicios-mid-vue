import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Client } from '@/clients/interfaces/client';


export const useClientsSetupStore = defineStore('clients', () => {

    const clients     = ref<Client[]>([]);
    const currentPage = ref<number>(1);
    const totalPages  = ref<number>(5);
    //? HAY QUE TENER CLARO QUE ESTAMOS DEVOLVIENDO LA REFERENCIA A NUESTRO OBJETO REACTIVO CON .VALUE. CUALQUIER MODIFICACIÓN HECHA DESDE CUALQUIER LUGAR AFECTARÁ A TODOS. PARA EVITARLO DEBEMOS HACER LAS MUTACIONES DESDE LAS ACCIONES QUE AQUÍ DEFINIMOS
   return {
      //state properties
        currentPage,
        clients,
        totalPages,
      //getters
      //squareCount: computed( () => count.value * count.value), 
        setClients( newClients: Client[] ) {
            clients.value = newClients;
        },
        setPage( page: number ) {
            //? no es del todo necesario porque el store sabe que si el valor es el mismo no 
            if ( currentPage.value === page ) return;
            currentPage.value = page;
        }
   }

})