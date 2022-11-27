<script setup lang="ts">
    import { toRef } from 'vue';
    import type { Character } from '../interfaces/characters';
    //! Siempre tenemos que definir las interfaces en el lugar donde se vayan a usar en vez de usar directamente la interfaz, se considera amla praxis.
    interface Prop {
        character: Character
    }

    const props = defineProps<Prop>()
    //! desestructurar los objetos cuando queremos hacer cosas reactivas está desaconsejado pues se acaba por romper. Para prevenirlo, si queremos hacerlo reactivo, tenemos que usar el objeto de la siguiente manera:
    const character = toRef( props, 'character' )
    // const props = defineProps<{ character: Character}>()

</script>

<template>
    <div class="character-card">
        <img v-if="[14].includes(character.char_id)" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="no foto">
        <img v-else :src="character.img" :alt="character.name">
        <h3>{{ character.name}}</h3>
    </div>
</template>


<style scoped>
    .character-card {
        margin-right: 5px;
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
    }

    img {
        width: 150px;
        border-radius: 5px 5px 0px 0px;
        box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
    }
</style>