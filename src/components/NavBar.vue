<template>
	<nav class="navbar">
		<form v-on:submit.prevent>
			<div class="input-field">
				<input :value="userInput" placeholder="Введите название книги, которую хотите найти" class="form-control"
					@input="valueChange" @keyup.enter="submitValue" type="search" autocomplete="off">
				<label class="label-icon" @click="submitValue" for="search"><i class="material-icons">search</i></label>
			</div>
		</form>
	</nav>
</template>

<script>
export default {
	name: 'nav-bar',
	props: ['userInput'],
	data: function () {
		return {
			input: ''
		}
	},
	methods: {
		valueChange: function (event) {
			this.input = event.target.value;
			this.$emit('changedValue', this.input)
		},
		submitValue: function (event) {
			if (this.input == '') {
				M.toast({
					html: 'No search value entered'
				});
				return
			};
			this.$emit('submitValue');
		},
		clearInput: function (event) {
			this.input = ''
			this.$emit('inputCleared', this.input)
		}
	}
}
</script>

<style lang="scss" >
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
	display: none;
}


.navbar {
	padding: 0;
	max-width: 765px;
}

form {
	width: 100%;
}

nav input {
	color: #000;


}

input[placeholder] {
	font-size: 18px;
	color: #9A9A9A;

	@media (max-width:425px) {
		font-size: 16px;
	}
}

input::-moz-placeholder {
	font-size: 18px;

	@media (max-width:425px) {
		font-size: 16px;
	}

	color: #9A9A9A;
}

input:-moz-placeholder {
	font-size: 18px;
	color: #9A9A9A;

	@media (max-width:425px) {
		font-size: 16px;
	}
}

input:-ms-input-placeholder {
	font-size: 18px;
	color: #9A9A9A;

	@media (max-width:425px) {
		font-size: 16px;
	}
}

.form-control {

	&:focus {
		border: 1px solid #F3AD5A;
		box-shadow: 0px 0px 20px rgba(243, 173, 90, 0.4);
	}

}

input {
	height: 45px;
	padding-right: 45px !important;


}

.input-field {
	display: flex;
	position: relative;
}

.material-icons {
	position: absolute;
	top: 8px;
	margin-left: 5px;
	align-items: center;
	cursor: pointer;
	color: #494949;
	right: 10px;
	font-size: 32px !important;

	@media (max-width:425px) {
		font-size: 28px !important;
		top: 10px;
	}

}
</style>
