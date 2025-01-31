import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'; 
import 'vuetify/styles';

createApp(App).use(store).use(router).use(vuetify).mount('#app')
