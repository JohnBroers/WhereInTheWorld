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
import { ref } from 'vue';

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
    emits: ['selected'],
    setup(props, { emit }) {
        const isOpen = ref(false);
        const selected = ref(null);

        function open() {
            isOpen.value = true;
        }

        function close() {
            isOpen.value = false;
        }

        function toggle() {
            if(!isOpen.value) {
                open();
            } else {
                close();
            }
        }

        function select(option) {
            selected.value = option;
            close();
            emit('selected', option.val);
        }

        if(props.default) {
            const defaultOption = props.options.find(o => o.val === props.default);
            if(!defaultOption) {
                return;
            }
            this.select(defaultOption);
        }

        return {
            isOpen,
            selected,
            open,
            close,
            toggle,
            select
        }
    }
}
</script>
