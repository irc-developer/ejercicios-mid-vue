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
    ids: {
        list: {
            //es para tener un montón de ids asociados a su personaje
            [id: string] : Character;
        }
        errorMessage:   string | null
        hasError:       boolean,
        isLoading:      boolean,
        
    }

    //métodos para characters
    loadCharactersFailed: (error: string )  => void;
    loadedCharacters: (data: Character[])   => void;
    startLoadingCharacters: ()              => void;

    //métodos para characters
    loadedCharacter: ( character:Character )    => void;
    checkIdInStore: ( id: string )              => boolean;
    startLoadingCharacter: ()                   => void;
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
        ids: {
            list: {},
            errorMessage: null,
            hasError: false,  
            isLoading: true            
        },
        //Métodos para personajes:
        loadCharactersFailed ( error:string ) {
            this.characters  = {
                //esparcimos el objeto original y sólo le cambiamos lo que necesitemos
                // ...this.characters ,
                count: 0,
                errorMessage: error,
                hasError: true,  
                isLoading: false,
                list:[]
            }
        },
        loadedCharacters( data: Character[] | string ) {

            if (typeof data === 'string') {
                return this.loadCharactersFailed('La respuesta no es un array de personajes.')
            }

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
        },
        //Métodos para ides
        loadedCharacter( character:Character ) {
            this.ids.isLoading = false;
            this.ids.list[character.char_id] = character;
        },
        checkIdInStore( id: string ){ 
            return !!this.ids.list[id];
        },
        startLoadingCharacter() {
            this.ids = {
                ...this.ids,
                isLoading: true,
                hasError: false,
                errorMessage: null                
            }
        }
    }
);


export default characterStore;