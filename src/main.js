import App from './index.vue'
import { createApp } from 'vue'
import store from './store';
import router from './router';
import { registerPlugins } from '@/plugins'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

registerPlugins(app)
app.use(router); 
app.use(store);
app.mount('#app')
app.use(VueSweetalert2);
