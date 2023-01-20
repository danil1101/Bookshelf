<template>
	<div class="book-results">
		<div class="cards">
			<div class="cards__item card" v-for="book in books" :key="book.id" :id="book.id">
				<div class="cards__image">
					<img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail + '&zoom=1'"
						class="activator" />
					<img v-else src="@/assets/img/no-img.png" />
				</div>
				<div class="cards__content">
					<p v-if="book.volumeInfo.title" class="cards__title font-weight-bold">{{
						book.volumeInfo.title
					}}</p>
					<p v-if="book.volumeInfo.authors"><span class="font-weight-bold">Автор</span>: {{
						book.volumeInfo.authors[0]
					}}
					</p>
					<p v-if="book.volumeInfo.publishedDate"><span class="font-weight-bold">Дата
							публикации: <br> </span> {{ book.volumeInfo.publishedDate.replace(/\-/g, '.') }}
					</p>
					<p style="flex: 1 1 auto;"></p>
					<!-- <div style="flex: 1 1 auto;" class="book__desc">
						<p v-if="book.searchInfo">{{
							book.searchInfo.textSnippet.replace(/<(.|\n)*?>/g, '').replace(/[&]nbsp[;]/gi,
								"").replace(/[&]*[;]/gi, " ").replace(/[&]quot/gi, " ")
						}}
						</p>
						<p v-else>
							{{ book.volumeInfo.subtitle }}
						</p>
					</div> -->

					<button class="card__more font-weight-bold btn btn-primary" @click.stop="showModal(book.id)">
						Подробнее
					</button>
					<modal :ref="'modal_id_' + book.id" @close="closeModal" :book="book" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import modal from '@/components/AppModal.vue';
export default {
	name: 'book-results',
	components: {
		modal,
	},
	props: ['input', 'books'],
	data() {
		return {
			isModalVisible: false,
		}
	},
	beforeRouteEnter() {
		document.documentElement.classList.remove('open-modal')
	},
	methods: {
		showModal(id) {
			let modal = this.$refs['modal_id_' + id]

			if (modal) {
				modal[0].show()
			}

			document.documentElement.classList.add('open-modal')
		},
		closeModal() {
			this.isModalVisible = false;
			document.documentElement.classList.remove('open-modal')
		}
	},
}
</script>
<style lang="scss" >
.book-results {
	margin-top: 15px;
}


.btn-primary {
	margin-top: 5px;
	font-size: 14px;
	padding: 8px;
	cursor: pointer;
	width: 180px;
	background-color: #1d1c1c;
	border-color: transparent;
	transition: background-color 0.3s ease 0s;
	color: #fff;
	/* .darkmode--activated & {
		background-color: rgb(128, 25, 25);

		&:hover,
		&:active {
			background-color: rgb(161, 39, 39);
			border-color: transparent;
		}
	} */

	&:hover,
	&:active {
		background-color: #363535 !important;
		border-color: #363535 !important;
	}
}



.cards {
	display: grid;
	grid-template-columns: repeat(3, minmax(200px, 0.5fr));

	@media (max-width: 1200px) {
		grid-template-columns: repeat(2, minmax(200px, 0.5fr));
	}

	@media (max-width: 738px) {
		grid-template-columns: repeat(1, minmax(150px, 1fr));
	}

	grid-gap: 10px;
	grid-row-gap: 15px;
	margin: 0 auto;

	&__item {
		border-radius: 0.375rem;
		flex: 0 1 33.333%;
		flex-direction: row;

		@media (max-width: 430px) {
			flex-wrap: wrap;
		}

		display: flex;
		padding: 10px;
	}

	&__image {

		max-width: 150px;
		max-height: 245px;
		min-width: 140px;

		@media (max-width: 430px) {
			margin: 0 auto;
			padding-bottom: 10px;
		}

		img {
			box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	&__content {
		@media (max-width: 430px) {
			min-width: 100%;
		}

		position: relative;
		padding-left: 10px;
		color: #333131;
		font-size: 14px;
		display: flex;
		flex-direction: column;

		p {
			margin-bottom: 5px;
		}
	}

	&__title {}

	&__action {}

	&__reveal {}
}

.font-weight-bold {
	font-weight: 700;
}

.cards__title {
	font-size: 16px;
	font-weight: 700;
	line-height: 1.3;
	color: #1d1c1c;
	transition: color 0.3s ease 0s;

	/* .darkmode--activated & {
		color: rgb(128, 25, 25);
	} */

}
</style>
