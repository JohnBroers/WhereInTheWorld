import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import outsideClickDirective from '@/directives/outside-click';

const app = createApp(App);

app.directive('outside-click', outsideClickDirective);
app.use(router);
app.mount('#app');