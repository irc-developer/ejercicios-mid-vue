import { computed, ref } from "vue";
import type { Character } from "@/characters/interfaces/characters";
import breakingBadApi from "@/api/breakingBadApi";
import { useQuery } from "@tanstack/vue-query";

//? GLOBAL STATE
//ref en vez de reactive porque Ref acepta tipos primitivos que rective no
const characterSet = ref<{ [id: string]: Character }>({});
const hasError = ref<boolean>(false);
const isLoading = ref<boolean>(false);
//ojo que si no lo definimos será undefined.
const errorMessage = ref<string | null>(null);
//? FINAL GLOBAL STATE

const getCharacter = async (id: string): Promise<Character> => {
    if (characterSet.value[id]) return characterSet.value[id];

    try {
        const { data } = await breakingBadApi.get<Character[]>(`/characters/${id}`);
        if ( data.length > 0 ) return data[0]; 
        
        throw new Error(`Error al no encontrar la persona con el id ${id}`)       
    } catch (error:any) {
        throw new Error("Error procedente de la api")
    }
};

const loadeedWithError = (error:string) => {
    hasError.value      = true;
    errorMessage.value  = error;
}

const loadCharacter = ( character: Character ) => {
    hasError.value      = false;
    errorMessage.value  = null;

    characterSet.value [character.char_id] = character;
     
}

const useCharacter = (id:string) => {
    const { isLoading } = useQuery(
        ["characters", id], // esto aquivale a meterle a la ruta el characterId como en la petición
        () => getCharacter(id),
        {
            onSuccess: loadCharacter,
            onError:   loadeedWithError
        }
    );

    return {
        list: characterSet,
        hasError,
        isLoading,
        errorMessage,
        //getters
        character: computed<Character | null> ( () => characterSet.value[id]),
    };
};

export default useCharacter;
