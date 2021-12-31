<template>
	<div id="app">
		<router-view></router-view>
		<loading :class="{ show: isLoading }"/>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loading from './components/Loading';

export default {
	name: 'app',
	components: {
		Loading
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	},
	computed: mapState([ 'isLoading' ]),
	created() {
		this.onListenerTasks()
		this.onListenerUser()
	},
	methods: {
		...mapActions(['onListenerTasks', 'onListenerUser'])
	}
}
</script>