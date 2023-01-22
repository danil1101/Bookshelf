<template>

	<div class="header">
		<div class="container-lg">
			<div class="header__row">
				<a href="/index.html" class="header__logo">Books Search</a>
				<div class="header__list">
					<a href="https://github.com/danil1101/BookSearch" class="header__item">GitHub</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'app-header',
	data() {
		return {

		}
	}
}
</script>

<style lang="scss" scoped>
.header {
	padding: 20px 0;
	background-color: #171717;


	&__row {
		display: flex;
		align-items: center;
		justify-content: space-between;


	}

	&__logo {
		font-weight: 700;
		font-size: 32px;
	}

	&__list {
		display: flex;
		gap: 15px;
	}

	&__item {
		cursor: pointer;
		font-size: 20px;
		font-weight: 300;
	}
}
</style>