<template>
	<div class="app">
		<app-header></app-header>
		<div class="container-lg cotainer-app">
			<div class="main-image">
				<img src="./assets/img/main-books.jpg" alt="">
			</div>
			<div class="search-page">

				<nav-bar :userInput="input" @changedValue="input = $event" @submitValue="searchBooks"
					@inputCleared="input = $event">
				</nav-bar>
				<div v-show="books.length || textMore" class="book__more">
					<span>Результаты по запросу "{{ inputSearch }}"
					</span>
					<span>Найдено: {{ books.length }}</span>
				</div>
				<div class="selects__form">
					<select v-if="books.length" class="form-select" v-model="selectedItem" name="type"
						@change="updateOption">
						<option value="all" disabled hidden selected>Тип печати</option>
						<option value="all" selected>Все</option>
						<option value="books">Книги</option>
						<option value="magazines">Журналы</option>
					</select>
					<select v-if="books.length" class="form-select" v-model="selectedSort" name="cort" @change="updateSort">
						<option value="relevance" disabled hidden selected>Сортировка</option>
						<option value="relevance">По релевантности</option>
						<option value="newest">От новых к старым</option>
						<!-- В следующем примере результаты перечислены по дате публикации, от новых к старым: -->
					</select>
					<select v-if="books.length" class="form-select" v-model="selectedFilter" name="filter"
						@change="updateFilter">
						<option value="partial" disabled hidden selected>Фильтрация</option>
						<option value="partial">По умолчанию</option>
						<option value="free-ebooks">Полный обзор</option>
						<option value="ebooks">Элекронные книги</option>
					</select>
				</div>
				<book-results :input="input" :books="books"></book-results>
				<div class="count-pages" v-if="books.length">
					<ul class="pagging__list">
						<li>
							<span @click="this.changePage" class="pagging__item item_1 page_active">1</span>
						</li>
						<li>
							<span @click="this.changePage" class="pagging__item item_2">2</span>
						</li>
						<li>
							<span @click="this.changePage" class="pagging__item item_3">3</span>
						</li>
						<li>
							<span @click="this.changePage" class="pagging__item item_4">4</span>
						</li>
						<li>
							<span @click="this.changePage" class="pagging__item item_5">5</span>
						</li>
						<li>
							<span @click="this.changePage" class="pagging__item item_all">След</span>
						</li>
					</ul>
				</div>
			</div>
			<main></main>
		</div>
	</div>
</template>

<script>
import NavBar from '@/components/NavBar'
import BookResults from '@/components/BookResults'
import AppHeader from '@/components/AppHeader.vue'
export default {
	components: {
		AppHeader, NavBar, BookResults
	},
	props: ['userInput'],
	data: function () {
		return {
			input: '',
			books: [],
			loading: false,
			isTyping: false,
			title: '',
			inputSearch: '',
			textMore: false,
			countPage: '0',
			selectedItem: 'all',
			selectedFilter: 'partial',
			selectedSort: 'relevance',
		}
	},
	watch: {
		input: function () {
			this.isTyping = true
			let self = this
			setTimeout(function () {
				self.isTyping = false
			}, 500);
		}
	},
	methods: {
		isClassPageActive() {
			const activePages = document.querySelectorAll('.page_active')
			if (activePages) {
				for (let activePage of activePages) {
					activePage.classList.remove('page_active')
				}
			}
			window.scrollTo(0, -200)
		},
		changePage(event) {
			if (event.target.closest('.item_1')) {
				this.countPage = 0;
				this.isClassPageActive()
				event.target.classList.add('page_active')
			} else if (event.target.closest('.item_2')) {
				this.countPage = 41;
				this.isClassPageActive()
				event.target.classList.add('page_active')
			} else if (event.target.closest('.item_3')) {
				this.countPage = 81;
				this.isClassPageActive()
				event.target.classList.add('page_active')
			} else if (event.target.closest('.item_4')) {
				this.countPage = 121;
				this.isClassPageActive()
				event.target.classList.add('page_active')
			} else if (event.target.closest('.item_5')) {
				this.countPage = 141;
				this.isClassPageActive()
				event.target.classList.add('page_active')
			} else if (event.target.closest('.item_all')) {
				this.countPage += 41;
				this.isClassPageActive()
				event.target.classList.add('page_active')
			}
			this.searchBooks();
		},
		updateOption(event) {
			this.selectedItem = event.target.value
			this.searchBooks()
		},
		updateSort(event) {
			this.selectedSort = event.target.value
			this.searchBooks()
		},
		updateFilter(event) {
			this.selectedFilter = event.target.value
			this.searchBooks()
		},
		searchBooks(event) {
			this.loading = true
			let search = this.input;
			let queryURL = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&startIndex=${this.countPage}&filter=${this.selectedFilter}&printType=${this.selectedItem}&orderBy=${this.selectedSort}`;
			console.log(queryURL)
			this.$http.get(queryURL).then((data) => {
				this.books = data.body.items;
				this.inputSearch = this.input;
			})
				.then(() => {
					let elems = document.querySelectorAll('.carousel');
					let instances = M.Carousel.init(elems);
					this.loading = false
					this.results = true

				})
				.catch((error) => {
					this.loading = false
					console.log(error);
					M.toast({
						html: 'Oops! Something went wrong!'
					});
				});

		}
	}
}
</script>

<style lang="scss">
body {
	background-color: #121212;
	min-height: 100vh;
	overflow-y: auto;
	font-family: Inter, sans-serif;
	font-weight: 400;
}

html {
	background-color: #121212;
}

main {
	flex: 1 1 auto;
}

.main-image {


	img {
		max-height: 227px;
		display: block;
		width: 100%;
		height: 100vh;
		object-fit: cover;
	}
}

.book__more {
	span:first-child {
		font-size: 18px;
		color: #9A9A9A;
		margin-bottom: 10px;
		display: block;
	}

	span:last-child {
		font-size: 16px;
		color: #FFFFFF;
	}

	line-height: 18px;
	margin-top: 30px;
	margin-bottom: 16px;
}


.cotainer-app {
	flex-direction: column;
	overflow: hidden;
	display: flex;
}

.app {

	background-color: #121212;
	min-height: 100vh;
	position: relative;
	color: #fff;


	&::after {
		content: '';
		width: 250px;
		height: 250px;
		position: absolute;
		display: block;
		bottom: 10px;
		z-index: 1;
		right: 0;
		background: url('./assets/img/main-book.png') 0 0 / cover no-repeat;

		@media (max-width:425px) {
			width: 150px;
			height: 150px;
		}
	}
}

a {
	color: inherit;
	text-decoration: none;

	&:hover {
		color: inherit;
	}
}

.search-page {
	margin: 30px 0 100px 0;
	min-width: 765px;

	@media (max-width: 500px) {
		min-width: 100%;
	}
}

.form-select {
	width: auto;
}

.selects__form {
	display: flex;
	gap: 20px;
	margin-bottom: 50px;

	select {
		font-size: 16px;
		line-height: 18px;
		padding-top: 15px;
		padding-bottom: 15px;
		padding-left: 15px;
		color: #454545;
		min-width: 185px;

		@media (max-width:758px) {
			min-width: 130px;
		}

		border-radius: 3px !important;
	}

	select:focus {
		box-shadow: 0 0 5px 0.1rem rgba(207, 198, 173, 0.6);
		border-color: rgba(207, 198, 173, 0.6);
	}

	@media (max-width: 430px) {
		flex-wrap: wrap;
	}
}


body::-webkit-scrollbar {
	width: 8px;
	background: #313131;
}

body::-webkit-scrollbar-track {
	background: #313131;
	margin-top: 5px;
}

body::-webkit-scrollbar-thumb {
	background-color: #7e7c7c;

	&:hover {
		background-color: #adabab;
	}

	border-radius: 20px;
	border: 2px solid #313131;
}

.count-pages {
	margin-top: 60px;

}

ul {
	list-style: none;
}

body {}

ul,
li {
	margin: 0;
	padding: 0;
}

.pagging {
	&__list {
		display: flex;
		gap: 10px;
	}

	&__item {
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 6px;
		transition: background 0.2s ease 0s;

		&:hover {
			background: rgba(255, 255, 255, 0.25);
		}
	}
}

.item_all {
	width: 75px;
}

.page_active {
	border: 1px solid #F1A041;
	background: none !important;
	border-radius: 6px;
}
</style>
