import { ref, watch } from 'vue';
import type { Client } from "@/clients/interfaces/client"
import { useQuery } from '@tanstack/vue-query';
import clientsApi from '@/api/client-api';

const getClient = async( id:number ):Promise<Client> => {
    const { data } = await clientsApi.get(`/clients/${ id }`);
    return data;
}

const useClient = ( id:number ) => {

    const client = ref<Client>();

    const {isLoading, data } = useQuery(
        [ 'client', id ],
        () => getClient(id)
    );

    watch(data, () => {
        if ( data.value ) client.value = data.value;
    }, { immediate:true } );

    return {
        //properties 
        isLoading, 
        client
        //methods
        
        //actions

    }
}

export default useClient