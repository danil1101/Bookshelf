<template>
	<div class="app">
		<app-header></app-header>
		<div class="container-lg cotainer-app">
			<div class="search-page">
				<nav-bar :userInput="input" @changedValue="input = $event" @submitValue="searchBooks"
					@inputCleared="input = $event">
				</nav-bar>
				<div v-show="books.length || textMore" class="book__more">По запросу "{{ input }}" было найдено {{
					books.length
				}} книг
				</div>
				<div class="selects__form">
					<select v-if="books.length" class="form-select" v-model="selectedItem" name="type"
						@change="updateOption">
						<option value="all" disabled hidden selected>Тип печати</option>
						<option value="all" selected>Все</option>
						<option value="books">Книги</option>
						<option value="magazines">Журналы</option>
					</select>
					<select v-if="books.length" class="form-select" v-model="selectedFilter" name="filter"
						@change="updateFilter">
						<option value="relevance" disabled hidden selected>Сортировка</option>
						<option value="relevance">По умолчанию</option>
						<option value="newest">Недавно добавленные</option>
					</select>
				</div>
				<book-results :input="input" :books="books"></book-results>
			</div>
			<main></main>
		</div>
		<!-- <app-footer></app-footer> -->
	</div>
</template>

<script>
import NavBar from '@/components/NavBar'
import BookResults from '@/components/BookResults'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
export default {
	components: {
		AppHeader, AppFooter, NavBar, BookResults
	},
	props: ['userInput'],
	data: function () {
		return {
			input: '',
			books: [],
			loading: false,
			isTyping: false,
			title: '',
			textMore: false,
			selectedItem: 'all',
			selectedFilter: 'relevance',
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
		updateFilter(event) {
			this.selectedFilter = event.target.value
			this.searchBooks()
		},
		searchBooks(event) {
			this.loading = true
			let search = this.input;
			let queryURL = 'https://www.googleapis.com/books/v1/volumes?q=' + search + '&maxResults=40&printType=' + this.selectedItem + '&orderBy=' + this.selectedFilter;
			this.$http.get(queryURL).then((data) => {
				this.books = data.body.items;
			})
				.then(() => {
					let elems = document.querySelectorAll('.carousel');
					let instances = M.Carousel.init(elems);
					this.loading = false
					this.results = true
					console.log(this.results)
				})
				.catch((error) => {
					this.loading = false
					console.log(error);
					M.toast({
						html: 'Oops! Something went wrong!'
					});
				});
			this.textMore = true;
		}
	}
}
</script>

<style lang="scss">
body {
	background: #f4f4f4;
	min-height: 100vh;
}

main {
	flex: 1 1 auto;
}

.book__more {
	/* .darkmode--activated & {
		color: #000;
	} */

	@media (max-width: 430px) {
		font-size: 16px;
		margin: 5px auto;
	}

	margin-bottom: 40px;
	overflow: hidden;
	transition: color 0.3s ease 0s;
	text-align: center;
	margin: 10px auto;
	font-size: 18px;

	color: rgb(112, 112, 112);
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
	margin: 120px auto 0 auto;
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

	@media (max-width: 430px) {
		flex-wrap: wrap;
	}
}
</style>
