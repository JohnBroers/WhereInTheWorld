<template>
    <li class="country-list__item">
        <router-link :to="{ name: 'CountryDetail', params: { name: country.name } }" class="country-list__link">
            <figure class="country-list__flag">
                <img :src="country.flag" alt="" loading="lazy">
            </figure>
            <div class="country-list__innerwrapper">
            <h2 class="country-list__name">{{ country.name }}</h2>
            <ul class="country-list__detail-list">
                <li class="country-list__detail-list-item"><strong>Population:</strong> {{ toReadableNumber(country.population) }}</li>
                <li class="country-list__detail-list-item"><strong>Region:</strong> {{ country.region || '-' }}</li>
                <li class="country-list__detail-list-item"><strong>Capital:</strong> {{ country.capital || '-' }}</li>
            </ul>
            </div>
        </router-link>
    </li>
</template>

<script>
export default {
    props: {
        country: {
            type: Object,
            required: true
        }
    },
    setup() {
        function toReadableNumber(num) {
            return Number(num).toLocaleString('nl-NL');
        }
        return {
            toReadableNumber
        }
    },
}
</script>