<script setup lang="ts">
import type { RouterLink } from '@/router/link-routes';

    interface Props {
        title?:     string;
        links:      RouterLink[];
        showIcon?:  boolean;
    }

    const props = withDefaults(defineProps<Props>(), 
        {
            showIcon: true,
            links: () => [],
        }
    );

</script>


<template>
    <nav>
        <img v-if="showIcon" src="@/assets/logo.svg" alt="vue logo" height="25" width="25">
        <span> {{ props.title || "olakase"}}</span> 

        <RouterLink 
            v-for   ="link of props.links"
            :key    ="link.path"
            :to     ="link.path"
        >
            <span v-if="link.title">{{ link.title }}</span>
        </RouterLink>
         
    </nav>
</template>


<style scoped>
nav {
    align-items: flex-start;
    display: flex;
    font-size: 12px;
    margin-top: 10px;
    text-align: center;
    width: 100%;


}

img {
    margin-right: 5px;
}

span {
    margin-right: 10px;
}

a {
    margin-right: 5px;
}

</style>