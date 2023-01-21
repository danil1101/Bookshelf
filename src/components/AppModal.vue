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
				<button type="button" class="btn-close" @click="close" aria-label="Close">
				</button>
			</header>
			<section class="modal-body" id="modalDescription">
				<slot name="body">

					<div class="modal-body__content">
						<p v-if="book.volumeInfo.title" class="cards__title font-weight-bold">{{
							book.volumeInfo.title
						}}
						</p>
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
						<p v-if="book.volumeInfo.description">
							<span class="font-weight-bold">Описание: </span> {{
								book.volumeInfo.description
							}}
						</p>
						<p style="flex: 1 1 auto;"></p>
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
							<span v-else style="font-style:italic">Количество страниц неизвестно</span>
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
}

.modal {
	border-radius: 0.375rem;

}

.modal-body {

	display: flex;
	height: 100%;
	padding-top: 0 !important;
	color: #333131;
	justify-content: center;


	@media (max-width:440px) {
		flex-wrap: wrap;
	}

	p {
		margin-bottom: 7px;
		line-height: 1.7;
	}

	&__btn {
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	&__image {
		padding-left: 30px;
		display: flex;
		flex-direction: column;
		gap: 5px;
		text-align: center;

		@media (max-width:440px) {
			padding-left: 0;
			order: 1;
			padding-bottom: 10px;
		}

		img {
			box-shadow: 0px 1px 5px #000;
			width: 100%;
			min-width: 200px;
			max-width: 300px;

			@media (max-width:768px) {
				min-width: 150px;
				max-width: 200px;
			}

			height: auto;
		}
	}

	&__content {
		@media (max-width:440px) {
			flex: 1 1 auto;
			order: 2;
		}

		flex: 0 1 60%;
		font-size: 16px;
		display: flex;
		flex-direction: column;
	}
}


.cards__title {
	font-size: 20px !important;
	font-weight: 700;
	line-height: 1.3;
	color: #1d1c1c;
	transition: color 0.3s ease 0s;

}

.font-weight-bold {
	font-weight: 700;
}

.btn-primary-modal {
	font-size: 16px !important;
	font-weight: 500;
	padding: 8px !important;
	cursor: pointer;
	background-color: #1d1c1c;
	border-color: #1d1c1c;
	transition: background-color 0.3s ease 0s;
	color: #fff;
	width: 100%;
	max-width: 200px;

	&:hover,
	&:active {
		color: #fff;
		background-color: #363535 !important;
		border-color: #363535 !important;
	}
}

.modal-backdrop {

	position: fixed;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	overflow: auto;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.6);
}

.modal-backdrop::-webkit-scrollbar {
	width: 8px;
	opacity: 0.6;
}

.modal-backdrop::-webkit-scrollbar-track {
	background: #313131;
	opacity: 0.6;
}

.modal-backdrop::-webkit-scrollbar-thumb {
	background-color: #7e7c7c;
	opacity: 0.6;

	&:hover {
		background-color: #adabab;
	}

	border-radius: 20px;
	border: 2px solid #313131;
}

.modal::-webkit-scrollbar {
	width: 8px;

}

.modal::-webkit-scrollbar-track {
	background: #fff;
	margin-top: 10px;
}

.modal::-webkit-scrollbar-thumb {
	background-color: #7e7c7c;
	height: 50px;

	&:hover {
		background-color: #adabab;
	}

	border-radius: 20px;
	border: 2px solid #fff;
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
	background: #FFFFFF;
	max-height: 800px;
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

	color: #000;
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

.btn-close {
	font-size: 20px;
	margin: 3px !important;
	margin-left: auto !important;

	&:focus,
	&:active {
		box-shadow: none;
		outline: none;
		border: none;
	}

}
</style>