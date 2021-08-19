<template>
    <ul class="country-list">
        <CountryListItem v-for="country in countries" :country="country" :key="country.numericCode" />
    </ul>
</template>

<script>
import CountryListItem from '@/components/CountryListItem';

export default {
    props: {
        countries: {
            type: Object,
            required: true
        }
    },
    components: {
        CountryListItem
    }
}
</script>