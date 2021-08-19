<template>
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
</template>

<script>
import CountryDetail from '@/components/CountryDetail'
import AppLoadingSpinner from '@/components/AppLoadingSpinner.vue'

export default {
    components: {
        CountryDetail,
        AppLoadingSpinner
    },
    data() {
        return {
            country: null,
            loading: false,
        }
    },
    methods: {
        async getCurrentCountry(name) {
            try {
                this.loading = true;
                const data = await fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`);
                if (!data.ok) {
                    throw new Error("Not 2xx response")
                }
                const countries = await data.json();
                this.country = countries[0];
            }
            catch(err) {
                console.error(err)
            }
            finally {
                this.loading = false;
            }
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.getCurrentCountry(to.params.name);
        next();
    },
    mounted() {
        this.getCurrentCountry(this.$route.params.name);
    }
}
</script>
