<template>
    <div class="country">
        <div class="country__flag-container">
            <figure class="country__flag-wrapper">
                <img :src="country.flags.svg" :alt="country.name.official" class="country__flag" width="960" height="600">
            </figure>
        </div>
        <div class="country__info-container">
            <h1 class="country__name">{{ country.name.official }}</h1>
            <div class="country__info-row">
                <ul class="country__info-list">
                    <li class="country__info-list-item"><strong>Native name:</strong> {{ nativeName }}</li>
                    <li class="country__info-list-item"><strong>Population:</strong> {{ toReadableNumber(country.population) }}</li>
                    <li class="country__info-list-item"><strong>Region:</strong> {{ country.region }}</li>
                    <li class="country__info-list-item"><strong>Sub region:</strong> {{ country.subregion }}</li>
                    <li class="country__info-list-item"><strong>Capital:</strong> {{ country.capital && country.capital.length ? country.capital[0] : '-' }}</li>
                </ul>
                <ul class="country__info-list">
                    <li class="country__info-list-item"><strong>Top level domain:</strong> {{ topLevelDomains }}</li>
                    <li class="country__info-list-item"><strong>Currencies:</strong> {{ currencies }}</li>
                    <li class="country__info-list-item"><strong>Languages:</strong> {{ languages }}</li>
                </ul>
            </div>
            <div v-if="borderCountries && borderCountries.length" class="country__country">
                <p class="country__country-label"><strong>Border countries:</strong></p>
                <ul class="country__country-list">
                    <li v-for="country in borderCountries" :key="country" class="country__country-list-item">
                        <router-link :to="{ name: 'CountryDetail', params: { name: encodeURI(country.official) } }" class="country__country-list-item-link">{{ country.common }}</router-link>
                    </li>
                </ul>
            </div>
            <a v-if="country.maps.googleMaps" :href="country.maps.googleMaps" target="_blank" class="button">
                <span class="button__text">See on Google Maps</span>
            </a>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    props: {
        country: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const borderCountries = ref(null);
        const topLevelDomains = computed(() => props.country.tld.join(', '));
        const currencies = computed(() => Object.values(props.country.currencies).map(c => c.name).join(', '));
        const languages = computed(() => Object.values(props.country.languages).join(', '));
        const nativeName = computed(() => {
            let nativeName = Object.values(props.country.name.nativeName)[0].official;
            const officialLanguage = Object.keys(props.country.languages)[0];

            if(props.country.name.nativeName[officialLanguage]) {
                nativeName = props.country.name.nativeName[officialLanguage].official
            }
            return nativeName;
        });

        async function getCountryNameByCode(name) {
            try {
                const data = await fetch(`https://restcountries.com/v3.1/alpha/${name}?fields=name`);
                if (!data.ok) {
                    throw new Error('Not 2xx response');
                }
                const country = await data.json();
                return country.name;
            } catch (error) {
                console.error(error);
            }
        }

        function toReadableNumber(num) {
            return Number(num).toLocaleString('nl-NL');
        }

        if(props.country.borders) {
            Promise.all(props.country.borders.map(async countryCode => await getCountryNameByCode(countryCode)))
            .then(countryNames => {
                borderCountries.value = countryNames;
            });
        }

        return {
            borderCountries,
            topLevelDomains,
            currencies,
            nativeName,
            languages,
            toReadableNumber
        }
        
    }
}
</script>
