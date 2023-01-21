<template>
	<nav class="navbar">
		<form v-on:submit.prevent>
			<div class="input-field">
				<input :value="userInput" class="form-control" @input="valueChange" @keyup.enter="submitValue" type="search"
					autocomplete="off">
				<label class="label-icon" @click="submitValue" for="search"><i class="material-icons">search</i></label>
				<!-- <i class="material-icons" @click="clearInput">close</i> -->
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

.material-icons {
	color: #fff;
}

.navbar {
	justify-content: center;
	padding: 0;
	margin: 0 auto;
	max-width: 500px;
}

form {
	width: 100%;
}

nav input {
	color: #000;


}

.form-control {

	&:focus {
		box-shadow: 0 0 5px 0.1rem rgba(207, 198, 173, 0.6);
		border-color: rgba(207, 198, 173, 0.6);
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
	color: #121212;
	right: 10px;
	font-size: 32px;
}
</style>
