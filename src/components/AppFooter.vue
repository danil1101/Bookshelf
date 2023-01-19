<template>
	<div class="footer">
		<div class="container-lg">
			<div class="footer__row">
				<div class="footer__logo">Books Search</div>
				<div class="footer__list">
					<div class="footer__item">GitHub</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'app-footer',
	data() {
		return {

		}
	}
}
</script>

<style lang="scss" scoped>
.footer {
	padding: 15px 0;

	&__row {
		display: flex;

		justify-content: space-between;
	}

	&__logo {
		font-size: 30px;
	}

	&__list {
		align-items: center;
		font-size: 18px;
		display: flex;
		gap: 15px;
	}

	&__item {
		cursor: pointer;
	}
}
</style>