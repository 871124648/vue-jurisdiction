<template>
	<div id="app">
		<router-view v-if="isRouterLoad"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App',
		provide () {
			return {
				reload: this.reload
			}
		},
		data () {
			return {
				isRouterLoad: true
			}
		},
		methods: {
			reload () {
				this.isRouterLoad = false
				this.$nextTick(() => {
					this.isRouterLoad = true
				})
			}
		}
	}
</script>

<style>
	@import "./assets/css/base.css";
</style>
