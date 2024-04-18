import { createApp } from 'vue'
import App from './App.vue';
import router from './router/index'; // Import the router configuration
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";


library.add(far, fas, fab);

const pinia = createPinia();

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(pinia);

app.use(router);

// Mount the app to the '#app' element
app.mount('#app');
