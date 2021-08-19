<template>
    <nav class="filterbar">
        <div class="filterbar__search search">
            <label for="search" class="search__label"><i class="fas fa-search search__icon"></i></label>
            <input type="search" id="search" name="q" class="search__field" placeholder="Search for a country..." autocomplete="off" v-model="search" aria-label="search">
        </div>
        <Dropdown :options="dropdownOptions" @selected="optionSelected" />
    </nav>
</template>

<script>
import Dropdown from '@/components/Dropdown';
import { debounce } from '@/helpers';

export default {
    components: {
        Dropdown
    },
    data() {
        return {
            search: '',
            region: '',
            dropdownOptions: [
                {
                    name: 'All',
                    val: ''
                },
                {
                    name: 'Africa',
                    val: 'africa'
                },
                {
                    name: 'Americas',
                    val: 'americas'
                },
                {
                    name: 'Asia',
                    val: 'asia'
                },
                {
                    name: 'Europe',
                    val: 'europe'
                },
                {
                    name: 'Oceania',
                    val: 'oceania'
                }
            ]
        }
    },
    watch: {
        region(val) {
            this.$emit('filterChange', {
                type: 'region',
                value: val
            })
        },
        search: debounce(function (val) {
            this.$emit('filterChange', {
                type: 'name',
                value: val
            })
        }, 500)
    },
    methods: {
        optionSelected(val) {
            this.region = val;
        }
    }
}
</script>
