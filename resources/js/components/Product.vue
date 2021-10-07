<template>
	<div class="col-md-4 col-sm-6 main-card">
		<div class="center-text mb-30">
			<transition name="pu">
				<Popup
						v-if="isPopupVisible"
						@closePopup="closePopup"
						@modalBtnToCart="Добавить"
						:popupTitle="products_data.title"
						@btnAction="addToCart"
				>
					<img :src="'../../images/' + products_data.image" alt />
					<div class="info">
						<p>{{ products_data.description }}</p>
						<p>Цена: {{ products_data.price }} Р.</p>
					</div>
				</Popup>
			</transition>

			<img :src="'../../images/' + products_data.image" alt="shvuha" />

			<div class="v-product--content">
				<h5>{{ products_data.title }}</h5>
				<div class="price">
					<div class="quantity">
						<span @click="minus">-</span>
						{{ products_data.quantity }}
						<span @click="plus">+</span>
					</div>
					<p>{{ products_data.price * products_data.quantity }} Р.</p>
				</div>
			</div>
			<div class="v-product--footer">
				<button class="info-btn" @click="showPopup">Подробнее</button>
				<button v-if="products_data.available" class="cart-btn" @click="addToCart()">Добавить</button>
				<button v-else class="cart-btn-add">Добавлен</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Popup from "./popup/Popup";
	export default {
		name: "Product",
		props: {
			products_data: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		components: {
			Popup
		},
		data() {
			return {
				isPopupVisible: false
			};
		},
		methods: {
			plus() {
				this.products_data.quantity++;
			},
			minus() {
				if (this.products_data.quantity > 1) {
					this.products_data.quantity--;
				}
			},
			addToCart() {
				this.$emit("addToCart", this.products_data);
			},
			showPopup() {
				this.isPopupVisible = true;
			},
			closePopup() {
				this.isPopupVisible = false;
			}
		},

		mounted() {
			let carLS = JSON.parse(localStorage.getItem("prod"));
			if (carLS) {
				for (let k = 0; k < carLS.length; k++) {
					if (carLS[k].article == this.products_data.article) {
						this.products_data.available = false;
					}
				}
			}
		}
	};
</script>

<style lang="scss">
	.pu-enter {
		opacity: 0;
	}
	.pu-enter-active {
		transition: 0.5s;
	}
	.pu-enter-to {
		opacity: 1;
	}
	.pu-leave {
	}
	.pu-leave-active {
		transition: 0.5s;
	}
	.pu-leave-to {
		opacity: 0;
	}

	.main-card{
		margin: 0 0 40px;
		padding: 10px;
	}

	.v-product {
		border: 1px solid #ccc;
		border-radius: 4px;
		width: calc(100% / 3 - 20px);
		margin: 20px 10px;
		background: #fff;
		overflow: hidden;

		@media (max-width: 767px) {
			width: calc(100% / 2 - 20px);
		}
		@media (max-width: 500px) {
			width: 100%;
		}

		&--content {
			padding: 15px;
			color: #fff;

			h5,
			p {
				margin: 0;
				margin-bottom: 10px;
				color: #fff;
			}
			.price {
				display: flex;
				justify-content: space-between;

				.quantity {
					font-size: 20px;

					span {
						cursor: pointer;
					}
				}
			}
		}
		&--footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 15px 15px;

			button {
				padding: 10px 15px;
				border-radius: 4px;
				cursor: pointer;
				width: auto;
				outline: none;
				background: transparent;
			}
			.info-btn {
				color: #1b8ec4;
				border: 2px solid #1b8ec4;
			}
			.cart-btn {
				color: #29bd0c;
				border: 2px solid #29bd0c;
			}
			.cart-btn-add {
				color: #ef0031;
				border: 2px solid #ef0031;
			}
		}
		.disabled {
			background: #eee;
			color: #999;
			cursor: default;
		}
	}
</style>