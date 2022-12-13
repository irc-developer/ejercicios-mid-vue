import { computed, ref, watch } from 'vue';
import type { Client } from "@/clients/interfaces/client"
import { useMutation, useQuery } from '@tanstack/vue-query';
import clientsApi from '@/api/client-api';
import clientApi from '@/api/client-api';

const getClient = async( id:number ):Promise<Client> => {
    const { data } = await clientsApi.get(`/clients/${ id }`);
    return data;
}


const updateClient = async( client:Client ):Promise<Client> => {

    //? El queryClientnos sirve para poder forzar el refecheo de las páginas haciendo uso del VueQueryPlugin que tenemos en el main.ts
    //con esto detenemos el procesamemiento de la respuesta
       // await new Promise( resolve => {
    //     setTimeout( () => resolve(true), 2000 )
    // });
//     const { data } = await clientsApi.patch<Client>(`/clients/${ client.id }`, client );
    // const queries = queryClient.getQueryCache().findAll(['clients?page='],{ exact: false });
    // queries.forEach( query => query.reset() )
    // queries.forEach( query => query.fetch() );


    const { data } = await clientApi.patch<Client>(`/clients/${ client.id }`, client )
    return data;
}



const useClient = ( id:number ) => {
    
    //de clientMutation también podemos extraer el isLoading pero ahora mismo hay un problema y es que se considera una propiedad reactiva con lo que tendremos que usar el .value para compensarlo
    const clientMutation = useMutation( updateClient );
    const client = ref<Client>();

    const {isLoading, data, isError } = useQuery(
        [ 'client', id ],
        () => getClient(id), {
            retry:false //con esto pvevenimos que vuelva a intentar el fetch si falla.
        }
    );

    //Es importante tener claro que ahora mismo, con la asignación client.value = data.value estamos pasándole por referencia el valor con lo que se considera como no mutable y no nos dejaría cambiar los valores en la vista, para prevenirlo tenemos que desestructurar el data para poder crear un nuevo puntero o directamente obviar el watch y usar el onSuccess del tanstack pero esto provocaría que perdiesemos la reactividad.
    watch(data, () => {
        if ( data.value ) client.value = { ...data.value };
    }, { immediate:true } );

    return {
        //properties 
        clientMutation,
        isError,
        isLoading, 
        client,
        //methods
        updateClient:       clientMutation.mutate,
        isUpdating:         computed( () => clientMutation.isLoading.value ),
        isUpdatingSuccess:  computed( () => clientMutation.isSuccess.value ),
        isErrorUpdating:    computed( () => clientMutation.isError.value )
        //actions
    }
}

export default useClient