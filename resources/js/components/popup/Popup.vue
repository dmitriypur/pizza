<template>
	<div class="overley" @click="closePopup">
		<div class="v-popup" @click.stop>
			<div class="v-popup--header">
				<h3>{{popupTitle}}</h3>
				<span>
					<i class="material-icons" @click="closePopup">close</i>
				</span>
			</div>
			<div class="v-popup--content">
				<slot></slot>
			</div>
			<div class="v-popup--footer">
				<button class="close-modal" @click="closePopup">Закрыть</button>
				<button class="cart-btn" :disabled="isAdd" @click="btnAction()">{{ modalBtnToCart }}</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Popup",
		data() {
			return {
				isAdd: false
			};
		},
		props: {
			popupTitle: {
				type: String,
				default: "Название"
			},
			modalBtnToCart: {
				type: String,
				default: "Добавить"
			}
		},
		methods: {
			closePopup() {
				this.$emit("closePopup");
			},
			btnAction() {
				this.$emit("btnAction");
				// this.closePopup();
				this.isAdd = true;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.overley {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}
	.v-popup {
		padding: 15px;
		position: absolute;
		max-width: 800px;
		background: #fff;
		border-radius: 8px;
		max-height: 550px;
		overflow-x: scroll;
		margin: 0 10px;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);

		&--header,
		&--footer {
			display: flex;
			justify-content: space-between;
			align-items: center;

			h3 {
				margin: 0;
			}

			i {
				cursor: pointer;
			}
		}
		&--content {
			margin: 20px 0;
			display: flex;
			align-items: start;
			text-align: left;

			@media (max-width: 600px) {
				flex-direction: column;
			}

			img {
				width: 150px;
				margin-right: 20px;

				@media (max-width: 600px) {
					margin-bottom: 20px;
					width: 100%;
					max-height: 200px;
					object-fit: cover;
				}
			}
			.info {
				float: left;
			}
			h3,
			p {
				margin: 0;
				margin-bottom: 10px;
			}
		}
		button {
			border: none;
			padding: 10px 15px;
			border-radius: 4px;
			color: #fff;
			cursor: pointer;
			width: auto;
		}
		.cart-btn {
			background: #29bd0c;
		}
		.close-modal {
			background: #e9240a;
		}
	}
</style>