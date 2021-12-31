import Vue from 'vue'

import VueRouter from 'vue-router';
import Login from '../pages/Login';
import Register from '../pages/Register';
import KanBanBoard from '../pages/KanBanBoard';
import ListTasks from '../pages/ListTasks';
import CreateTask from '../pages/CreateTask';
import EditTask from '../pages/EditTask';


import { ifAuthenticated, ifNotAuthenticated } from '../plugins/authenticate';

Vue.use(VueRouter)

const routes = [
	{ 
		path: '/',
		component: KanBanBoard,
		beforeEnter: ifAuthenticated,
		children: [
			{
				path: '',
				name: 'home-page',
				component: ListTasks
			}, {
				path: 'create',
				name: 'create-task-page',
				component: CreateTask
			}, {
				path: 'edit/:id',
				name: 'edit-task-page',
				component: EditTask
			}
		]
	}, { 
		path: '/login', 
		name: 'login-page',
		beforeEnter: ifNotAuthenticated,
		component: Login 
	}, { 
		path: '/register', 
		name: 'register-page',
		beforeEnter: ifNotAuthenticated,
		component: Register 
	}
]

const router = new VueRouter({
	routes
})
export default router;