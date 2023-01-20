<template>
	<div class="app">
		<app-header></app-header>
		<div class="container-lg cotainer-app">
			<div class="search-page">
				<div v-show="!books.length" class="subtitle">Найдите книгу, которая вам нравится.</div>
				<nav-bar :userInput="input" @changedValue="input = $event" @submitValue="searchBooks"
					@inputCleared="input = $event">
				</nav-bar>
				<div v-show="books.length || textMore" class="book__more">Результаты по запросу "{{ inputSearch }}"...
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
			let queryURL = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&filter=${this.selectedFilter}&printType=${this.selectedItem}&orderBy=${this.selectedSort}`;
			//console.log(queryURL)
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
.subtitle {
	text-align: center;
	font-size: 35px;
	margin-bottom: 40px;
	color: #fff;
}

body {
	background: #f4f4f4;
	min-height: 100vh;
	overflow-y: auto;
}

main {
	flex: 1 1 auto;
}

.book__more {

	margin-bottom: 40px;
	overflow: hidden;
	transition: color 0.3s ease 0s;
	text-align: center;
	margin: 10px auto;
	font-size: 20px;

	@media (max-width: 430px) {
		font-size: 18px;
	}

	color: rgb(155, 154, 154);
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
	color: #f4f4f4;

}

a {
	color: inherit;
	text-decoration: none;

	&:hover {
		color: inherit;
	}
}

.search-page {
	margin: 120px 0;
	min-width: 500px;

	@media (max-width: 500px) {
		min-width: 100%;
	}
}

.form-select {
	width: auto;
}

.selects__form {
	display: flex;
	margin-top: 10px;
	gap: 15px;



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
	margin-top: 10px;
}

body::-webkit-scrollbar-thumb {
	background-color: #7e7c7c;

	&:hover {
		background-color: #adabab;
	}

	border-radius: 20px;
	border: 2px solid #313131;
}
</style>
