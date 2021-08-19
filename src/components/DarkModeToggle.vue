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
export default {
    data() {
        return {
            theme: 'light-theme',
        }
    },
    methods: {
        enableTheme(theme) {
            this.theme = theme;
            document.documentElement.className = theme;
            localStorage.setItem('user-theme', theme);
        },
        toggleMode() {
            if(this.theme === 'light-theme') {
                this.enableTheme('dark-theme');
            } else {
                this.enableTheme('light-theme');
            }
        }
    },
    mounted() {
        const activeTheme = localStorage.getItem("user-theme");
        const hasDarkThemePreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if(activeTheme) {
            this.enableTheme(activeTheme);
            return;
        }
        this.theme = hasDarkThemePreference ? this.enableTheme('dark-theme') : this.enableTheme('light-theme'); 
    }
}
</script>
