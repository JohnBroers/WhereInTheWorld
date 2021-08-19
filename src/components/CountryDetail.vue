<template>
    <div class="country">
        <div class="country__flag-container">
            <figure class="country__flag-wrapper">
                <img :src="country.flag" :alt="country.name" class="country__flag">
            </figure>
        </div>
        <div class="country__info-container">
            <h1 class="country__name">{{ country.name }}</h1>
            <div class="country__info-row">
                <ul class="country__info-list">
                    <li class="country__info-list-item"><strong>Native name:</strong> {{ country.nativeName }}</li>
                    <li class="country__info-list-item"><strong>Population:</strong> {{ country.population }}</li>
                    <li class="country__info-list-item"><strong>Region:</strong> {{ country.region }}</li>
                    <li class="country__info-list-item"><strong>Sub region:</strong> {{ country.subregion }}</li>
                    <li class="country__info-list-item"><strong>Capital:</strong> {{ country.capital }}</li>
                </ul>
                <ul class="country__info-list">
                    <li class="country__info-list-item"><strong>Top level domain:</strong> {{ topLevelDomains }}</li>
                    <li class="country__info-list-item"><strong>Currencies:</strong> {{ currencies }}</li>
                    <li class="country__info-list-item"><strong>Languages:</strong> {{ languages }}</li>
                </ul>
            </div>
            <div v-if="borderCountries && borderCountries.length">
                <p class="country__country-label"><strong>Border counties:</strong></p>
                <ul class="country__country-list">
                    <li v-for="country in borderCountries" :key="country" class="country__country-list-item">
                        <router-link :to="{ name: 'CountryDetail', params: { name: country }}" class="country__country-list-item-link">{{ country }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        country: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            borderCountries: null
        }
    },
    computed: {
        topLevelDomains() {
            return this.country.topLevelDomain.join(', ');
        },
        currencies() {
            return this.country.currencies.map(c => c.name).join(', ');
        },
        languages() {
            return this.country.languages.map(l => l.name).join(', ');
        }
    },
    methods: {
        async getCountryByCode(code) {
            try {
                const data = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}`);
                if (!data.ok) {
                    throw new Error('Not 2xx response');
                }
                const country = await data.json();
                return country;
            } catch (error) {
                console.error(error);
            }
        }
    },
    async created() {
        const countryNames = await Promise.all(this.country.borders.map(async countryCode => {
            const country = await this.getCountryByCode(countryCode);
            return country.name;
        }));
        this.borderCountries = countryNames;
    }
}
</script>
