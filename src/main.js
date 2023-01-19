import Vue from 'vue'
import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'

// import Darkmode from 'darkmode-js';
// new Darkmode().showWidget();


Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
	render: h => h(App)
}).$mount('#app')

