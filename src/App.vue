<template>
	<header class="header">
		<router-link :to="{ name: 'Home' }" class="header__logo-link"><h1 class="header__logo">Where in the world?</h1></router-link>
		<DarkModeToggle />
	</header>
	<main>
		<router-view />
	</main>
</template>

<script>
import DarkModeToggle from '@/components/DarkModeToggle';

export default {
	name: 'App',
	components: {
		DarkModeToggle
	}
}
</script>

<style lang="scss">
@import './assets/scss/style.scss';
</style>