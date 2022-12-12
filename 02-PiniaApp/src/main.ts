import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App)
const pinia = createPinia();

app.use(pinia);
app.use(router)
VueQueryPlugin.install( app, {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                cacheTime: 1000*60,
            }
        }
    }
})

app.mount('#app')
