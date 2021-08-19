import { createWebHistory, createRouter } from "vue-router";
import Home from '@/views/Home'
import CountryDetail from '@/views/CountryDetail'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/:name',
        name: 'CountryDetail',
        component: CountryDetail,
        props: true
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;