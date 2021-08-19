<template>
    <div class="dropdown" v-outside-click="close">
        <button class="dropdown__button" @click="toggle">
            <span>{{ selected ? selected.name : 'Filter by region' }}</span>
            <i class="fas fa-caret-down dropdown__icon"></i>
        </button>
        <div class="dropdown__items" :class="{ 'dropdown__items--hidden' : !isOpen }">
            <ul class="dropdown__list">
                <li v-for="option in options" :key="option.val" class="dropdown__list-item" :class="{ 'dropdown__list-item--selected' : option === selected }" @click="select(option)">{{ option.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true
        },
        default: {
            type: String,
            required: false,
            default: null
        }
    },
    data() {
        return {
            isOpen: false,
            selected: null
        }
    },
    mounted() {
        if(this.default) {
            const defaultOption = this.options.find(o => o.val === this.default);
            if(!defaultOption) {
                return;
            }
            this.select(defaultOption);
        }
    },
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        },
        toggle() {
            if(!this.isOpen) {
                this.open();
            } else {
                this.close();
            }
        },
        select(option) {
            this.selected = option;
            this.close();
            this.$emit('selected', option.val);
        }
    }
}
</script>
