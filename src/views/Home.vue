<template>
    <FilterBar @filterChange="fetchCountriesByType" />
    <AppLoadingSpinner v-if="loading" />
    <CountryList v-if="!loading && countries" :countries="countries" />
</template>

<script>
import {ref} from 'vue'
import CountryList from '@/components/CountryList.vue'
import FilterBar from '@/components/FilterBar.vue'
import AppLoadingSpinner from '@/components/AppLoadingSpinner.vue'

export default {
    name: 'Home',
    components: {
        CountryList,
        FilterBar,
        AppLoadingSpinner
    },
    setup() {
        const loading = ref(false);
        const countries = ref([]);

        function fetchCountriesByType({ type, value }) {
            if(type === 'region' && value !== '') {
                fetchCountries(`https://restcountries.com/v3.1/region/${value}`);
            } else if(type === 'name' && value !== '') {
                fetchCountries(`https://restcountries.com/v3.1/name/${value}`);
            } else {
                fetchCountries('https://restcountries.com/v3.1/all');
            }
        }

        async function fetchCountries(api) {
            try {
                loading.value = true;
                let url = api + '?fields=cca3,flags,name,population,region,capital';
                const result = await fetch(url);
                if (!result.ok) {
                    throw new Error("Not 2xx response")
                }
                const data = await result.json();
                countries.value = data;
            } catch (error) {
                countries.value = null;
                console.log(error);
            }
            finally {
                loading.value = false;
            }
        }

        fetchCountries('https://restcountries.com/v3.1/all');

        return {
            loading,
            countries,
            fetchCountriesByType
        }
    }
}
</script>