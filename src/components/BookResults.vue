<template>
	<div class="book-results">
		<div class="cards">
			<div class="cards__item card" v-for="book in books" :key="book.id" :id="book.id">
				<div class="cards__image">
					<img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail + '&zoom=1'"
						class="activator" />
					<img v-else src="../assets/img/no-img.png" />
				</div>
				<div class="cards__content">
					<div @click="showModal(book.id)" v-if="book.volumeInfo.title" class="cards__title font-weight-bold">{{
						book.volumeInfo.title.length > 60 ? book.volumeInfo.title.slice(0, 60).trim() + "..." :
							book.volumeInfo.title
					}}</div>
					<p v-if="book.volumeInfo.authors"><span class="font-weight-bold">Автор</span>: {{
						book.volumeInfo.authors[0]
					}}
					</p>
					<p v-if="book.volumeInfo.publishedDate"><span class="font-weight-bold">Дата
							публикации: </span> {{ book.volumeInfo.publishedDate.replace(/\-/g, '.') }}
					</p>
					<div style="flex: 1 1 auto;"></div>
					<button class="card__more font-weight-bold btn btn-primary" @click="showModal(book.id)">
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
	mounted() {
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
.btn-primary {
	font-weight: 700;
	line-height: 22px;
	text-align: center;
	padding: 8px;
	cursor: pointer;
	width: 235px;

	@media (min-width: 738px) and (max-width: 1000px) {
		width: 100%;
		max-width: 190px;
	}

	background: #F1A041;
	border-radius: 6px;
	border-color: transparent;
	transition: background-color 0.2s ease 0s;
	color: #fff;

	@media (max-width: 425px) {
		margin-top: 7px;
		padding: 5px;
		min-width: 80%;
		max-width: 145px !important;

	}

	&:hover,
	&:focus,
	&:active {
		background: #FA8F13 !important;
		border-color: #FA8F13 !important;
	}
}


.card {
	background: #282828;
	box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25);
	border-radius: 6px;
}

.cards {
	position: relative;
	z-index: 10;
	display: grid;
	grid-template-columns: repeat(2, minmax(200px, 0.5fr));


	@media (max-width: 738px) {
		grid-template-columns: repeat(1, minmax(150px, 1fr));
	}

	grid-gap: 30px;
	margin: 0 auto;

	@media (max-width: 425px) {
		grid-gap: 10px;
	}

	&__item {
		flex: 0 1 33.333%;
		flex-direction: row;

		@media (max-width: 1000px) {
			padding: 15px;
		}

		display: flex;
		padding-top: 33px;
		padding-bottom: 33px;
		padding-left: 20px;
	}

	&__image {

		max-width: 145px;
		width: 100%;

		@media (max-width: 425px) {

			max-width: 95px;
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
			padding: 0;

		}

		@media (max-width: 738px) {
			padding: 0 10px;

		}

		@media (min-width: 738px) and (max-width: 1000px) {
			padding: 0 10px;
		}

		position: relative;
		padding: 0 20px;
		color: #fff;
		font-size: 14px;


		@media (max-width: 425px) {
			font-size: 12px;
		}

		display: flex;
		flex-direction: column;

		p {
			line-height: 1.3;
		}

		p:not(:last-child) {
			margin-bottom: 10px;

			@media (max-width: 425px) {
				margin-bottom: 5px;
			}
		}
	}

	&__title {
		cursor: pointer;
	}

}

.font-weight-bold {
	font-weight: 700;
}

.cards__title {
	font-weight: 700;

	@media (max-width: 425px) {
		font-size: 16px;
		margin-bottom: 10px !important;
	}

	font-size: 20px;
	line-height: 24px;
	color: #fff;
	margin-bottom: 15px;
	transition: color 0.2s ease 0s;

	&:hover {
		color: rgb(224, 224, 224);
	}
}
</style>
