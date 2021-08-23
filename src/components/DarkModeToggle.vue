<template>
    <button type="button" class="header__button button" @click="toggleMode">
        <template v-if="theme === 'dark-theme'">
            <i class="fas fa-moon button__icon"></i>
            <span class="button__text">Light mode</span>
        </template>
        <template v-if="theme === 'light-theme'">
            <i class="far fa-moon button__icon"></i>
            <span class="button__text">Dark mode</span>
        </template>
    </button>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const theme = ref('light-theme');

        function enableMode(mode) {
            theme.value = mode;
            document.documentElement.className = mode;
            localStorage.setItem('user-theme', mode);
        }

        function toggleMode() {
            if(theme.value === 'light-theme') {
                enableMode('dark-theme');
            } else {
                enableMode('light-theme');
            }
        }

        const activeMode = localStorage.getItem("user-theme");
        const hasDarkThemePreference = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if(activeMode) {
            enableMode(activeMode);
        } else {
            if(hasDarkThemePreference) {
                enableMode('dark-theme');
            }
        }

        return {
            theme, 
            toggleMode
        }

    }
}
</script>
