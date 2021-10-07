<template>
	<div class="v-main-wrapper">
		<h2>{{title}}</h2>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	export default {
		name: "v-main-wrapper",
		data() {
			return {
				title: "Доставка пиццы"
			};
		},
	};
</script>

<style lang="scss" scoped>
	.v-main-wrapper {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 10px;
	}
	h2{
		text-align: center;
		margin-bottom: 50px;
		color: #ffffff;
	}
</style>