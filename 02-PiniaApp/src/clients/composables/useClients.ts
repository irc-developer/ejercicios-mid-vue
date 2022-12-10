import { useQuery } from '@tanstack/vue-query';
import clientsApi from '@/api/client-api';
import type { Client } from '@/clients/interfaces/client';
import { useClientsStore } from '@/store/clients';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';


const getClients = async( page:number ):Promise<Client[]> => {
    const { data } = await clientsApi.get<Client[]>(`/clients?_page=${ page }`)
    return data;
}

const useClients = () => {
    //No queremos sacar los clientes de este composable si no del stored, ya que es el que gestiona toda la información y evita que tengamos que cambiar mil cosas si algún día cambiamos el store.
    
    const store = useClientsStore();
    const { currentPage, clients, totalPages, totalPageNumbers } = storeToRefs( store );
    
    
    const { isLoading, data } = useQuery (
        //enviamos currentpage porque useQuery se preocupa de "desenvolver" la referencia reactiva.
        ['clients?page=', currentPage ],
        () => getClients( currentPage.value ),
        // Nos interesa escuchar el valor de data, ya que es reactivo. Con esto solo lo ejecutaremos cuando se llame.
        // {
        //     onSuccess( newClients ) {
        //         store.setClients( newClients );
        //     }
        // }
    )

    watch( data, clients => {
        //Este data NO viene del store si no del query
        if( clients ) store.setClients( clients )
    })

    return {
        isLoading,
        currentPage, 
        clients, 
        totalPages,
        totalPageNumbers,

        //methods
        getPage( page:number ) {
            store.setPage( page );
        },

    }
}

export default useClients;


