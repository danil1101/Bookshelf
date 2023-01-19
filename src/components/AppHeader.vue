<template>

	<div class="header">
		<div class="container-lg">
			<div class="header__row">
				<a href="/" class="header__logo">Books Search</a>
				<div class="header__list">
					<a href="" class="header__item">GitHub</a>
					<a href="" class="header__item">Поиск</a>
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
	padding: 15px 0;
	background-color: #171717;


	&__row {
		display: flex;
		align-items: center;
		justify-content: space-between;


	}

	&__logo {
		font-size: 30px;
	}

	&__list {
		font-size: 18px;
		display: flex;
		gap: 15px;
	}

	&__item {
		cursor: pointer;
	}
}
</style>