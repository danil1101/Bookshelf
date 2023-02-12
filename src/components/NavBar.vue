<template>
	<nav class="navbar">
		<form v-on:submit.prevent>
			<div class="input-field">
				<input autofocus tabindex=0 :value="userInput" ref="input" name="input"
					placeholder="Введите название произведения или автора" class="form-control" @input="valueChange"
					@keyup.enter="submitValue" type="search" :class="{ active: input }" autocomplete="off">
				<label class="label-icon" @click="submitValue" for="search">
					<div class="material-icons"><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M9.5 17c1.71 0 3.287-.573 4.55-1.537l4.743 4.744a1 1 0 0 0 1.414-1.414l-4.744-4.744A7.5 7.5 0 1 0 9.5 17zM15 9.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
								fill="#000000" />
						</svg></div>
				</label>
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
	mounted() {
		if (document.documentElement.clientWidth < 426) {
			document.documentElement.classList.add('mobile')
			this.$refs.input.placeholder = 'Введите название книги';
		} else {
			document.documentElement.classList.remove('mobile')
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

.material-icons svg {
	position: relative;
	display: block;
	top: 1px;
	left: 3px;
	width: 30px;
	height: 30px;


}

.navbar {
	padding: 0;
	max-width: 765px;
}

.input-field {
	display: flex;
	position: relative;
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

.active {
	border: 1px solid #F3AD5A;
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
