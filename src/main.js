import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Datetime from 'vue-datetime'
import Notifications from 'vue-notification'
import 'vue-datetime/dist/vue-datetime.css'
import './assets/style.css'
import { auth } from './config/firebase'

Vue.use(Datetime);
Vue.use(Notifications)

auth.onAuthStateChanged(function (user) {
	if (user) {
		let data = { email: user.email, uid: user.uid }
		store.commit('SET_CURRENT_USER', data)
		router.push('/').catch(() => { })
	} else {
		let data = { email: '', uid: '', }
		store.commit('SET_CURRENT_USER', data)
		router.push("/login").catch(() => { });
	}
});

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
