import { createRouter, createWebHashHistory } from "vue-router";
import HomePage         from '@/shared/pages/HomePage.vue';
import AboutPage        from '@/shared/pages/AboutPage.vue';
import characterRoute   from "@/characters/router";
// import characterRoute   from '@/characters/router/';
const options = {
    history: createWebHashHistory( import.meta.env.BASE_URL ),
    routes: [
        //public
        {path:'/', name:'home', component: HomePage },
        {path:'/about', name:'about', component: AboutPage },
        
        //characters
        characterRoute,

        //default
        {path:'/:pathMatch(.*)*', redirect: () => ({ name: 'home' }) },

    ]
};

const router = createRouter(options);

export default router;