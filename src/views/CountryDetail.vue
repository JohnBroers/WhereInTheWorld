<template>
    <div>
        <AppLoadingSpinner v-if="loading" />
        <div v-if="!loading">
            <div class="country__navigation">
                <router-link :to="{name: 'Home'}" class="button">
                    <i class="fas fa-chevron-left button__icon"></i>
                    <span class="button__text">Back</span>
                </router-link>
            </div>
            <CountryDetail v-if="country" :country="country" />
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import CountryDetail from '@/components/CountryDetail'
import AppLoadingSpinner from '@/components/AppLoadingSpinner.vue'

export default {
    components: {
        CountryDetail,
        AppLoadingSpinner
    },
    setup() {
        const route = useRoute();
        const country = ref(null);
        const loading = ref(false);

        async function getCurrentCountry(name) {
            try {
                loading.value = true;
                const result = await fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`);
                if (!result.ok) {
                    throw new Error("Not 2xx response")
                }
                const data = await result.json();
                country.value = data[0];
            }
            catch(err) {
                console.error(err)
            }
            finally {
                loading.value = false;
            }
        }

        getCurrentCountry(route.params.name);

        onBeforeRouteUpdate((to, from, next) => {
            getCurrentCountry(to.params.name);
            next();
        });

        return {
            country,
            loading
        }
    }
}
</script>
