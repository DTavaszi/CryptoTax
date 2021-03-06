import Vue from 'vue'
import { store } from '../store/store.js'
import VueRouter from 'vue-router'
import Home from 'components/Home'
import About from 'components/About'
import Contact from 'components/Contact'
import Landing from 'components/Landing'
import Login from 'components/Authentication/Login'
import Logout from 'components/Authentication/Logout'
import Register from 'components/Authentication/Register'
import Dashboard from 'components/Dashboard'

import authentication from 'loginAuth'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{	path: '/home', name: 'Home', component: Home },
		{	path: '/login',	name: 'Login', component: Login	},
		{	path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresLogin: false } },
		{	path: '/logout', name: 'Logout', component: Logout, meta: { requiresLogin: true }	},
		{	path: '/register',name: 'Register',	component: Register	},
		{	path: '/', name: 'Landing', component: Landing },
		{	path: '/contact', name: 'Contact', component: Contact },
		{	path: '/about', name: 'About', component: About }
	],
	mode:'history'
})

router.beforeEach((to, from, next) => {
	const requiresLogin = to.matched.some(record => record.meta.requiresLogin)
	const attemptedLogin = store.getters.attemptedLogin
	const isLoggedIn = store.getters.isLoggedIn

	if (!attemptedLogin) {
		authentication.identifyLoggedUser(store)
		.then(() => {
			next()
		})
		.catch(() => {
			if (requiresLogin) {
				next('/')
			} else {
				next()
			}
		})
	} else {
		if (requiresLogin && !isLoggedIn) {
			next('/')
		} else {
			next()
		}
	}
})

export default router
