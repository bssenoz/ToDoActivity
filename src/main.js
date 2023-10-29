/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './index.vue'

// Composables
import { createApp } from 'vue'

import router from './router';
// Plugins
import { registerPlugins } from '@/plugins'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App)

registerPlugins(app)
app.use(router); 
app.mount('#app')
app.use(VueSweetalert2);
