//Nomenclatura estándar para definir los archivos cuyas funciones se limitan a retornar cosas. útil para almacenar lógica que no debería estar en el componente

import { onMounted, ref } from "vue";
import axios from "axios";
import breakingBadApi from "@/api/breakingBadApi";
import type { Character } from "../interfaces/characters";

//Al sacarlos fuera se colocan en el estado global de VUE y no colisionan con otras variables llamadsa igual debido a que se tratan como Symbol y no como variables normales (habría que leer más al respecto)
const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(true);
const errorMessage = ref<string>("");

export const useCharactersOld = () => {

    onMounted(async () => {await loadCharacters()});

    const loadCharacters = async () => {
        if ( characters.value!.length > 0 ) return;
        isLoading.value = true;

        try {
            const { data } = await breakingBadApi.get<Character[]>(
                "/characters"
            );
            characters.value = data;
            isLoading.value = false;
        } catch (error) {
            hasError.value  = true;
            isLoading.value = false;

            if (axios.isAxiosError(error)) {
                return (errorMessage.value = error.message);
            }

            errorMessage.value = JSON.stringify(error);
        }
    };

    //retorna objeto por comodidad pensando en utilidades futuras
    return {
        characters,
        isLoading,
        hasError,
        errorMessage,


        loadCharacters,
    };
};
