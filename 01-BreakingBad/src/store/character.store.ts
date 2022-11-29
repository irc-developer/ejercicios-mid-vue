import { reactive } from "vue";
import type { Character } from "@/characters/interfaces/characters"
import breakingBadApi from "@/api/breakingBadApi";


interface Store {
    characters: {
        count:          number,
        errorMessage:   string | null
        hasError:       boolean,
        isLoading:      boolean,
        list:           Character[],
    }

    //métodos
    loadCharactersFailed: (error: string )  => void;
    loadedCharacters: (data: Character[])   => void;
    startLoadingCharacters: ()              => void;
}

//Initial state
const characterStore = reactive<Store>(
    {
        characters: {
            count: 0,
            errorMessage: null,
            hasError: false,  
            isLoading: true,
            list: []        
        },
        //Métodos:
        loadCharactersFailed ( error:string ) {
            
        },
        loadedCharacters( data: Character[] ) {

            const characters = data.filter(
                (character) => ![14, 17, 39].includes(character.char_id)
            );
            this.characters  = {
                count:  data.length        ,
                errorMessage: null   ,
                hasError: false       ,
                isLoading:  false    ,
                //recuerda que deestructurar el objeto permite crear una copia del original, evitando su modificación
                list:  [...characters]         ,
            }
        },
        async startLoadingCharacters ( ) {
            const { data } = await breakingBadApi.get<Character[]>("/characters");
            return data;
        }
    }
);


export default characterStore;