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
import { ref, watch } from 'vue';
import Dropdown from '@/components/Dropdown';
import { debounce } from '@/helpers';

export default {
    emits: ['filterChange'],
    components: {
        Dropdown
    },
    setup(props, { emit }) {
        const search = ref('');
        const region = ref('');
        const dropdownOptions = [
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
        ];

        function optionSelected(val) {
            region.value = val;
        }

        watch(region, (currentValue) => {
            emit('filterChange', {
                type: 'region',
                value: currentValue
            });
        });

        watch(search, debounce(function(currentValue) {
            emit('filterChange', {
                type: 'name',
                value: currentValue
            });
        }, 500));

        return {
            search,
            region,
            dropdownOptions,
            optionSelected
        }
    }
}
</script>
