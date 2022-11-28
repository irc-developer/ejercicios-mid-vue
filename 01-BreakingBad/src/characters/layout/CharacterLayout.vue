<script setup lang="ts">
import NavBar from '@/shared/components/NavBar.vue';
import characterRoute from '../router/index';
import type { RouterLink } from '@/router/link-routes';


const routeLink:RouterLink[] = characterRoute.children!
    .filter(route => ((route.props as {title: string, visible: boolean}).visible)) 
    .map( route => {
        return {
            name: route.name as string,
            path: route.path,
            title: (route.props as {title: string, visible: boolean}).title
        }
    });
</script>

<template>
    <h1>Personajes</h1>
    <NavBar 
        :show-icon="true"
        :links = 'routeLink'/> 
    <RouterView/>
</template>

<style scoped>

</style>