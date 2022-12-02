
//Vamos a replicar el store y necesitamos unas variables que permitan contenerlo

import { ref, computed } from "vue"
import { useQuery } from '@tanstack/vue-query';
import type { Character } from "@/characters/interfaces/characters"

import breakingBadApi from "@/api/breakingBadApi";
//? GLOBAL STATE
//ref en vez de reactive porque Ref acepta tipos primitivos que rective no
const characters    = ref<Character[]>([]);
const hasError      = ref<boolean>(false);
const isLoading     = ref<boolean>(false);
//ojo que si no lo definimos será undefined.
const errorMessage   = ref<string | null>(null);
//? FINAL GLOBAL STATE

//? ¿Por qué la tenemos fuera? 
//Al no tener las propiedades reactivas dentro no necesitamos que esté tampoco dentro. Además, como no se exporta es una petición privada que sólo queda para las funciones de aquí. 
const getCharacters = async (): Promise<Character[]> => {

    if (characters.value.length > 0 ) return characters.value;
    const { data } = await breakingBadApi.get<Character[]>("/characters");
    return data;
};

const loadedCharacters = (data:Character[]) => {
    hasError.value      = false;
    errorMessage.value  = null;
    characters.value    = data;
}

const useCharacters = () => {
    //Habitualmente los composables se usan para retornar variables reactivas

    //Se usa dentro porque es un composable y los composables sólo se usan dentro de otro o denntro de componentes.
    const { isLoading } = useQuery(["characters"], getCharacters, {
        //esto ya no hace falta porque ya lo tenemos instalado en el global
        // cacheTime: 1000 * 60, //Aunque se hace la petición lo que se muestra al usuario
        // refetchOnReconnect: true,
        //Aquí además se puede extraer info según el estado de la pe4tición.
        onSuccess:loadedCharacters //******************** OJO AL TRUCO */
        },
    );

    return {
        //mejor objeto para escalar
        //properties
        characters,
        hasError,
        isLoading,
        errorMessage,
        //getters
        //Esto, a pesar de ser una variable reactiva, no es reactivo pues desenvolemos la referencia en vez de llamar a la referencia misma, para ello usamos las propeidades computed.
        // count: characters.value.length,
        count: computed( () => characters.value.length ) ,
        //methods
    }
}

export default useCharacters;
//******************** OJO AL TRUCO */
/*
Si una función se limita a llamar a otra con los mismos argumentos y el mismo orden 
solo hay que referenciarla del siguiente moodo
 onSuccess(data) {
    loadedCharacters(data);
}, 

==========
onSuccess:loadedCharacters

*/