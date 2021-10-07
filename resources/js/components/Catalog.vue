<template>
	<transition name="ct" mode="out-in">
		<div class="row">
			<router-link :to="{name: 'cart', params: {cart_data: CART}}">
				<transition name="mc" mode="out-in">
					<div v-if="CART.length" class="link-to-cart">
						<p>Корзина</p>
						<small>
							Товаров:
							<b>{{ CART.length }}</b>
						</small>
					</div>
				</transition>
			</router-link>
			<Product
					v-for="product in PRODUCTS"
					:key="product.article"
					:products_data="product"
					@addToCart="addToCart"
			/>
		</div>
	</transition>
</template>

<script>
	import Product from "./Product";
	import { mapActions, mapGetters } from "vuex";

	export default {
		name: "Catalog",
		components: {
			Product
		},
		data() {
			return {
				prod_cart: {}
			};
		},
		computed: {
			...mapGetters(["PRODUCTS", "CART"])
		},
		methods: {
			...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART", "SAVE_CART"]),

			saveToLocalStorage() {
				localStorage.removeItem("prod");
				// let cartLS = {}
				// for(let item in this.CART){
				// 	let r = this.CART[item].article;
				// 	cartLS[r] = this.CART[item].quantity;
				// }
				// console.log(cartLS)
				localStorage.setItem("prod", JSON.stringify(this.CART));
			},

			addToCart(data) {
				this.ADD_TO_CART(data);
				this.saveToLocalStorage();
			}
		},
		mounted() {
			this.SAVE_CART();
			this.GET_PRODUCTS_FROM_API();
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
	.mc-enter {
		opacity: 0;
		transform: translateX(100px);
	}
	.mc-enter-active {
		transition: 0.3s;
	}
	.v-catalog {
		display: flex;
		flex-wrap: wrap;
		margin-right: -10px;
		margin-left: -10px;
	}
	.link-to-cart {
		position: fixed;
		top: 20px;
		right: 20px;
		border: 2px solid #ef0031;
		color: #ef0031;
		padding: 10px;
		border-radius: 4px;
		cursor: pointer;

		p {
			margin: 0;
			color: #ef0031;
			font-size: 16px;
		}
		small {
			font-size: 14px;
		}
	}
</style>