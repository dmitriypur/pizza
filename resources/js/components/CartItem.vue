<template>
	<transition name="ci">
		<div class="v-cart-item">
			<img :src="'../../images/' + cart_item_data.image" alt="p" />
			<div class="info">
				<div class="v-cart-item--info">
					<h3>{{ cart_item_data.title }}</h3>
					<p>Сумма: {{ cart_item_data.price * cart_item_data.quantity }} Р</p>
				</div>
				<div class="v-cart-item--quantity">
					<span @click="decrementItem">-</span>
					{{ cart_item_data.quantity }}
					<span @click="incrementItem">+</span>
				</div>
				<button @click="deleteFromCart">Удалить</button>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: "CartItem",
		props: {
			cart_item_data: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		methods: {
			decrementItem() {
				this.$emit("decrement");
			},
			incrementItem() {
				this.$emit("increment");
			},
			deleteFromCart() {
				this.$emit("deleteFromCart");
			}
		}
	};
</script>

<style lang="scss" scoped>
	.ci-leave {
	}
	.ci-leave-active {
		transition: 0.3s;
	}
	.ci-leave-to {
		opacity: 0;
		transform: translateX(-50px);
	}
	.v-cart-item {
		display: flex;
		align-items: center;
		border: 1px solid #29bd0c;
		padding: 20px;
		margin-bottom: 20px;

		&--quantity {
			font-size: 20px;
			color: #fff;

			span {
				cursor: pointer;
			}
		}

		@media (max-width: 500px) {
			flex-direction: column;
		}

		img {
			max-width: 150px;
			flex-grow: 1;
			margin-right: 20px;

			@media (max-width: 500px) {
				margin-right: 0;
				margin-bottom: 20px;
			}
		}
	}
	.info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-grow: 2;

		h3 {
			margin: 0;
			color: #fff;
		}
		p {
			color: #fff;
		}
		button {
			border: none;
			padding: 10px 15px;
			border-radius: 4px;
			color: #ef0031;
			cursor: pointer;
			background: transparent;
			width: auto;
			border: 2px solid #ef0031;
		}

		@media (max-width: 500px) {
			width: 100%;
		}
	}
</style>