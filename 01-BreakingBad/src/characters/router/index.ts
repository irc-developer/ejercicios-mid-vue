import type { RouteRecordRaw } from "vue-router";
import CharacterLayout from "@/characters/layout/CharacterLayout.vue";
import CharacterId from "@/characters/pages/CharacterId.vue";
import CharacterList from "../pages/CharacterList.vue";
import CharacterSearch from "../pages/CharacterSearch.vue";

const ROUTE_NAME = 'characters'

const characterRoute: RouteRecordRaw = {
    path: `/${ ROUTE_NAME }` ,
    redirect: `/${ ROUTE_NAME }/list`,
    component: CharacterLayout,
    children: [
        {   
            path: "by/:id", // dos puntos equivale a parámetro dinámico 
            name: "character-id", 
            props: {title: 'Por id', visible: false, },
            component: CharacterId 
        },
        {   
            path: `/${ ROUTE_NAME }/list`, 
            name: "character-list",
            props: {title: 'Lista', visible: true, } , 
            component: CharacterList 
        },
        {
            path: `/${ ROUTE_NAME }/search`,
            name: "character-search",
            props: {title: 'Búsqueda', visible: true, },
            component: CharacterSearch,
        },
    ],
};

export default characterRoute;
