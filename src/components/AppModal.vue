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
					<div class="modal-body__image">
						<img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail"
							class="activator" />
						<img v-else src="../assets/img/no-img.png" />
					</div>
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
						<p>
							<span class="font-weight-bold">Количество страниц: </span>
							<span v-if="book.volumeInfo.pageCount">{{ book.volumeInfo.pageCount }}</span>
							<span class="not-found" v-else>Неизвестно</span>
						</p>
						<div class="modal-body__btn">
							<a :href="book.accessInfo.webReaderLink" class="btn btn-primary-modal" target="_blank">Прочитать
								отрывок из книги</a>
							<a :href="book.saleInfo.buyLink" class="btn btn-primary" target="_blank">Купить эту книгу</a>
						</div>
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

.modal-body {
	color: #333131;


	p {
		margin-bottom: 7px;
		line-height: 1.7;
	}
}

.modal-body {
	display: flex;
	height: 100%;
	padding-top: 0 !important;


	&__btn {
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		padding-bottom: 30px;
	}

	&__image {
		flex: 0 1 40%;


		img {
			width: 100%;
			max-width: 220px;
			height: auto;
		}
	}

	&__content {
		flex: 0 1 60%;
		font-size: 16px;
	}
}


.cards__title {
	font-size: 20px !important;
	font-weight: 700;
	line-height: 1.3;
	color: #1d1c1c;
	transition: color 0.3s ease 0s;

	/* .darkmode--activated & {
		color: rgb(128, 25, 25);
	} */
}

.font-weight-bold {
	font-weight: 700;
}

.btn-primary-modal {
	font-size: 16px !important;
	font-weight: 500;
	padding: 10px !important;
	cursor: pointer;
	background-color: #1d1c1c;
	border-color: #1d1c1c;
	transition: background-color 0.3s ease 0s;

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

.modal-backdrop {
	display: flex;
	position: fixed;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	overflow: hidden;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.6);
}

html.open-modal {
	position: fixed;
	min-width: 100%;

}

.modal {
	position: relative;
	width: 100%;
	max-width: 700px;
	margin: 30px auto;
	background: #FFFFFF;
	max-height: 500px;
	height: 100%;
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
	margin: 5px 5px !important;
	margin-left: auto !important;

	&:focus,
	&:active {
		outline: none;
		border: none;
	}

}
</style>