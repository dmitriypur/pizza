<template>
	<div class="form">
		<form @submit.prevent="sendOrder(form)" id="form">
			<input type="text" name="name" v-model="form.name" placeholder="Имя" />
			<input type="tel" name="phone" v-model="form.phone" placeholder="Телефон" />
			<input type="hidden" name="_token" >
			<button>Заказать</button>
		</form>
	</div>
</template>

<script>
	export default {
		name: "Form",
		data() {
			return {
				form: {
					name: "",
					phone: "",
					csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
				},

			};
		},
		methods: {
			sendOrder(form) {
				this.$emit("sendOrder", form);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.form {
		margin-top: 30px;
		width: 50%;
		padding: 20px;
		margin: 0 auto;

		input,
		button {
			width: 100%;
			padding: 20px;
			color: #fff;
			outline: none;
		}
		input {
			border: 1px solid #ef0031;
			background: rgba(255, 255, 255, 0.22);
			margin-bottom: 20px;

			&::placeholder {
				color: rgba(255, 255, 255, 0.5);
			}
		}
		button {
			color: #29bd0c;
			border: 1px solid #29bd0c;
			font-size: 20px;
			transition: all 0.5s;
			background: transparent;

			&:hover {
				background: #29bd0c;
				color: #fff;
			}
		}
	}
</style>