<script>
export default {
	name: 'modal',
	props: ['book'],
	data() {
		return {
			isVisible: false,
		}
	},
	methods: {
		show() {
			this.isVisible = true
		},
		close() {
			this.$emit('close')
			this.isVisible = false
		},
		getNoun(number, one, two, five) {
			let n = Math.abs(number);
			n %= 100;
			if (n >= 5 && n <= 20) {
				return five;
			}
			n %= 10;
			if (n === 1) {
				return one;
			}
			if (n >= 2 && n <= 4) {
				return two;
			}
			return five;
		}
	},
};
</script>
<template>
	<div class="modal-backdrop" v-if="isVisible" style="opacity: 1;">
		<div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
			<header class="modal-header" id="modalTitle">
				<button type="button" class="btn-closed" @click="close">
					<span>&times;</span>
				</button>
			</header>
			<section class="modal-body" id="modalDescription">
				<slot name="body">

					<div class="modal-body__content">
						<div v-if="book.volumeInfo.title" class="cards__title font-weight-bold">{{
							book.volumeInfo.title
						}}
						</div>
						<p v-if="book.volumeInfo.authors"><span class="font-weight-bold">Автор</span>: {{
							book.volumeInfo.authors[0]
						}}
						</p>
						<p class="text-card-text">
							<span class="font-weight-bold">Издатель:</span>
							{{ book.volumeInfo.publisher }}
						</p>
						<p v-if="book.volumeInfo.publishedDate"><span class="font-weight-bold">Дата
								публикации: </span> {{ book.volumeInfo.publishedDate.replace(/\-/g, '.') }}
						</p>
						<p class="modal-body__description" v-if="book.volumeInfo.description">
							{{
								book.volumeInfo.description
							}}
						</p>
						<div style="flex: 1 1 auto;"></div>
						<div class="modal-body__btn">
							<a :href="book.accessInfo.webReaderLink" class="btn btn-primary-modal" target="_blank">Читать
								книгу</a>
							<a :href="book.saleInfo.buyLink" class="btn btn-primary-modal" target="_blank">Купить книгу</a>
						</div>
					</div>
					<div class="modal-body__image">
						<img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail"
							class="activator" />
						<img v-else src="../assets/img/no-img.png" />
						<p>
							<span v-if="book.volumeInfo.pageCount">
								{{
	book.volumeInfo.pageCount + ' ' + getNoun(book.volumeInfo.pageCount, 'страница', 'страницы',
		'страниц')
								}}

							</span>
							<span v-else class="not-found">Количество страниц неизвестно</span>
						</p>
					</div>
				</slot>
			</section>
		</div>
	</div>
</template>
<style lang="scss" >
.not-found {
	font-style: italic;
	color: #fff;
}

.modal {
	border-radius: 6px;
	overflow: auto;

	@media (max-width: 475px) {
		overflow: scroll;
		border-radius: 0 !important;
		height: 100% !important;
	}
}

.modal-body {

	display: flex;
	height: 100%;
	padding: 0 30px 30px 30px !important;
	color: #333131;

	@media (max-width: 475px) {
		height: auto;
	}

	@media (max-width:768px) {
		flex-wrap: wrap;
		padding: 0 20px 20px 20px !important;
	}

	@media (max-width: 425px) {
		padding: 0 10px 10px 10px !important;
	}

	p {
		margin-bottom: 7px;
		line-height: 1.7;
	}

	&__description {
		margin-top: 15px;

		@media (max-width: 435px) {
			font-size: 16px !important;
		}

		line-height: 1.6 !important;
	}

	&__btn {
		margin-top: 10px;
		display: flex;
		gap: 20px;

		@media (max-width: 425px) {
			margin-bottom: 60px;
			gap: 10px;
		}

	}

	&__image {
		padding-left: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		text-align: center;

		@media (max-width:768px) {
			padding-left: 0;
			margin: 0 auto;
			order: 1;
			padding-bottom: 10px;
		}

		img {
			filter: drop-shadow(-4px 4px 15px rgba(0, 0, 0, 0.4));
			border-radius: 3px;
			width: 100%;
			min-width: 200px;
			max-width: 300px;

			@media (max-width:768px) {

				margin: 0 auto;

			}

			@media (max-width:768px) {
				min-width: 150px;
				max-width: 200px;
			}

			height: auto;
		}
	}

	&__content {
		@media (max-width:768px) {
			flex: 1 1 auto;
			order: 2;
		}

		@media (max-width: 425px) {
			p {
				font-size: 14px;
			}

		}

		flex: 1 1 auto;
		font-size: 16px;
		line-height: 14px;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;

	}
}


.cards__title {
	font-weight: 700;

	@media (max-width: 425px) {
		font-size: 22px !important;
		line-height: 40px;
	}

	font-size: 20px;
	line-height: 24px;
	margin-bottom: 25px !important;
}

.font-weight-bold {
	font-weight: 700;
}

.btn-primary-modal {

	font-weight: 700;
	line-height: 22px;
	text-align: center;
	padding: 10px;
	cursor: pointer;
	width: 200px;
	background: #F1A041;
	border-radius: 6px;
	border-color: transparent;
	transition: background-color 0.2s ease 0s;
	color: #fff;

	@media (max-width: 425px) {
		width: 50%;
		padding: 8px;
	}

	&:hover,
	&:focus,
	&:active {
		background: #FA8F13 !important;
		border-color: #FA8F13 !important;
	}
}



.modal-backdrop {

	position: fixed;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	overflow: auto;

	@media (max-width: 475px) {
		overflow: visible !important;
	}

	align-items: center;
	background: rgba(5, 5, 5, 0.8);
	backdrop-filter: blur(4px);
}

.modal-backdrop::-webkit-scrollbar {
	width: 8px;
	background: #313131;

}

.modal-backdrop::-webkit-scrollbar-track {
	background: #313131;

}

.modal-backdrop::-webkit-scrollbar-thumb {
	background-color: #7e7c7c;


	&:hover {
		background-color: #adabab;
	}

	border-radius: 20px;
	border: 2px solid #313131;
}



html.open-modal {
	position: fixed;
	min-width: 100%;
	overflow: hidden;
}

.modal {
	@media (max-width: 475px) {
		top: 0;
		margin: auto;

	}

	padding-bottom:15px;
	position: relative;
	width: 100%;
	max-width: 820px;
	margin: 50px auto;
	background: #282828;
	border: 1px solid #3A3A3A;
	box-shadow: 0px 0px 29px rgba(255, 255, 255, 0.1);
	border-radius: 6px;
	max-height: 968px;
	height: auto;
	display: flex;

	flex-direction: column;
}

.modal-header,
.modal-footer {
	padding: 0;

	display: flex;
}

.modal-header {
	border-bottom: 0px solid #eeeeee;

	color: #9C4C4C !important;
	justify-content: space-between;
}

.modal-footer {
	border-top: 1px solid #eeeeee;
	justify-content: flex-end;
}

.modal-body {
	position: relative;
	padding: 20px 10px;
}

.btn-closed {
	font-size: 40px;

	@media (max-width: 425px) {
		font-size: 45px;

	}

	span {
		@media (max-width: 425px) {
			height: 30px !important;
			margin-right: 5px;
		}

		height: 26px !important;
		display: flex;
		align-items: center;
	}

	margin-top: 10px !important;
	margin-right: 10px !important;
	margin-bottom: 15px !important;
	margin-left: auto !important;
	color: #9C4C4C !important;
	padding: 0 !important;
	background: none !important;
	border: none;

	&:active {
		color: #b66a6a !important;
	}

	&:focus,
	&:active {

		box-shadow: none;
		outline: none;
		border: none;
	}


}
</style>