<template>
	<transition name="ct" mode="out-in">
		<div class="v-cart">
			<router-link :to="{name: 'catalog'}">
				<div class="back-to-catalog">
					<p>Назад</p>
				</div>
			</router-link>
			<p v-if="!cart_data.length">Корзина пока пустая...</p>
			<CartItem
				v-for="(item, index) in cart_data"
				:key="item.article"
				:cart_item_data="item"
				@deleteFromCart="deleteFromCart(index)"
				@increment="increment(index)"
				@decrement="decrement(index)"
			/>
			<v-form v-if="cart_data.length" @sendOrder="sendOrder" />
			<div v-if="cart_data.length" class="v-cart--total">
				<p>
					Итог:
					<span>{{cartTotalCost}} Р</span>
				</p>
			</div>
		</div>
	</transition>
</template>

<script>
	import CartItem from "./CartItem";
	import vForm from "./Form";
	import { mapActions } from "vuex";
	import axios from "axios";

	export default {
		name: "Cart",
		components: {
			CartItem,
			vForm
		},
		props: {
			cart_data: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {};
		},
		computed: {
			cartTotalCost() {
				let result = [];

				if (this.cart_data.length) {
					for (let item of this.cart_data) {
						result.push(item.price * item.quantity);
					}

					result = result.reduce(function(sum, el) {
						return sum + el;
					});
				}

				return result;
			}
		},
		methods: {
			...mapActions([
				"DELETE_FROM_CART",
				"INCREMENT_CART_ITEM",
				"DECREMENT_CART_ITEM"
			]),

			sendOrder(form) {
				let cartData = this.cart_data;

				let fd = new FormData();

				fd.append("name", form.name);
				fd.append("phone", form.phone);
				cartData.forEach(el => {
					fd.append(el.title, [el.price, el.quantity]);
				});
				axios
					.post("http://localhost:8888/rabota-form/dist/mail.php", fd)
					.then(function(response) {
						console.log(response);
						console.log("SUCCESS!!");
					})
					.catch(function() {
						console.log("FAILURE!!");
					});
			},

			decrement(index) {
				this.DECREMENT_CART_ITEM(index);
			},
			increment(index) {
				this.INCREMENT_CART_ITEM(index);
			},

			deleteFromCart(index) {
				if (this.cart_data[index].available != undefined) {
					this.cart_data[index].available = true;
				}

				this.DELETE_FROM_CART(index);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.ct-enter {
		opacity: 0;
	}

	.ct-enter-active {
		transition: 1s;
	}

	.ct-enter-to {
		opacity: 1;
	}

	.ct-leave {
	}

	.ct-leave-active {
	}

	.ct-leave-to {
		opacity: 0;
	}

	.v-cart {
		padding: 100px 0;

		p {
			color: #fff;
			text-align: center;
		}
	}

	.back-to-catalog {
		position: fixed;
		top: 20px;
		right: 20px;
		border: 2px solid #ef0031;
		padding: 10px;
		border-radius: 4px;
		cursor: pointer;

		p {
			margin: 0;
			color: #ef0031;
		}
	}

	.v-cart--total {
		display: flex;
		justify-content: center;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 30px;
		background: #29bd0c;

		p {
			color: #fff;
			margin: 0;
			font-size: 20px;
		}
	}
</style>