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

const app = createApp(App)

registerPlugins(app)
app.use(router); 
app.mount('#app')
