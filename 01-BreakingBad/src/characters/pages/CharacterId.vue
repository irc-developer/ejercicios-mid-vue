<script setup lang="ts">
import { watch, watchEffect} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCharacter from '@/characters/composables/useCharacter';
 
const router = useRouter();
const route  = useRoute();
const { id }    = route.params as { id: string };
// aqií podríamos recuperar el pj por posición pero en vez de eso vamos a recurrir a las computadas
const { isLoading, character, hasError, errorMessage} = useCharacter( id );

//watch sirve para definir qué queremos vigilar mientras que watchEffect permite vigilar las propiedades reactivas de dentro.

// watch(isLoading, () => console.error( {isLoading}))

watchEffect(() => {
   if ( !isLoading.value && hasError.value ) {
    router.replace('/characters');
   }
})

</script>
<template>
    <div>
    
        <h1 v-if="isLoading" > Loading</h1>
        <h1 v-else-if="hasError" > {{ errorMessage}}</h1>
        <div v-else-if="character">
            <h1> {{ character.name }}</h1>
            <div class="character-container">
                <img :src="character.img" :alt="character.name">
                <ul>
                    <li>Apodo:      {{ character.nickname }}                </li>
                    <li>Nació:      {{ character.birthday}}                 </li>
                    <li>Serie:      {{ character.category }}                </li>
                    <li>Ocupación:  {{ character.occupation.join(', ') }}   </li>
                    <li>Actor:      {{ character.portrayed }}               </li>
                    <li>Actor:      {{ character.status }}                  </li>
                </ul>
            </div>
        </div>
         
    </div>
</template>


<style scoped>
.character-container {
    display:flex;
    flex-direction: row;
}

img {
    width: 150px;
    border-radius: 5px;
}
</style>