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

    //Es importante tener claro que ahora mismo, con la asignación client.value = data.value se considera como no mutable y no nos dejaría cambiar los valores en la vista, para prevenirlo tenemos que desestructurar el valor para poder crear un nuevo puntero o directamente obviar el watch y usar el onSuccess del tanstack pero esto provocaría que perdiesemos la reactividad.
    watch(data, () => {
        if ( data.value ) client.value = { ...data.value };
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