import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import router from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';
//tenemos que definir el middleware manualmente para usar el vuequeryplugin

const app = createApp(App);
//Si queremos configurar la caché a nivel global podemos hacerlo desde aquí:
VueQueryPlugin.install(app, {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                cacheTime: 1000 * 120, // dos min
            }
        }
    }
})
// app.use( VueQueryPlugin ); // maneja el caché por nosotros
app.use(router)
app.mount('#app');
