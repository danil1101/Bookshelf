<template>

	<div class="header">
		<div class="container-lg">
			<div class="header__row">
				<a href="https://danil1101.github.io/Bookshelf/" class="header__logo">
					<img class="header__logo" src="../assets/img/audiobooks.png" alt="">
					<div>Bookshelf</div>
				</a>
				<div class="header__list">
					<a href="https://github.com/danil1101/Bookshelf" target="_blank" class="header__item">GitHub</a>
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
	padding: 25px 0;
	background-color: #171717;


	&__row {
		display: flex;
		align-items: center;
		justify-content: space-between;


	}

	&__logo {
		font-weight: 700;
		font-size: 28px;
		display: flex;
		align-items: center;
		gap: 8px;

		img {
			max-width: 45px;
			width: 100%;
			height: 100%;
		}

		@media (max-width:425px) {
			font-size: 22px;
		}
	}

	&__list {
		display: flex;
		gap: 15px;
	}

	&__item {
		cursor: pointer;
		font-size: 20px;

		@media (max-width:425px) {
			font-size: 18px;
		}

		font-weight: 300;
	}
}
</style>