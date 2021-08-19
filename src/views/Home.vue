<template>
    <FilterBar @filterChange="fetchCountriesByType" />
    <AppLoadingSpinner v-if="loading" />
    <CountryList v-if="!loading && countries" :countries="countries" />
</template>

<script>
import CountryList from '@/components/CountryList.vue'
import FilterBar from '@/components/FilterBar.vue'
import AppLoadingSpinner from '@/components/AppLoadingSpinner.vue'

export default {
    name: 'Home',
    data() {
        return {
            loading: false,
            countries: null,
            search: '',
            region: ''
        }
    },
    components: {
        CountryList,
        FilterBar,
        AppLoadingSpinner
    },
    methods: {
        fetchCountriesByType({ type, value }) {
            if(type === 'region' && value !== '') {
                this.fetchCountries(`https://restcountries.eu/rest/v2/region/${value}`);
            } else if(type === 'name' && value !== '') {
                this.fetchCountries(`https://restcountries.eu/rest/v2/name/${value}`);
            } else {
                this.fetchCountries('https://restcountries.eu/rest/v2/all');
            }
        },
        async fetchCountries(api) {
            try {
                this.loading = true;
                const data = await fetch(api);
                if (!data.ok) {
                    throw new Error("Not 2xx response")
                }
                const countries = await data.json();
                this.countries = countries;
            } catch (error) {
                this.countries = null;
                console.log(error);
            }
            finally {
                this.loading = false;
            }
        }
    },
    async created() {
        await this.fetchCountries('https://restcountries.eu/rest/v2/all')
    }
}
</script>