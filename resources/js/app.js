require('./bootstrap');

import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router/router'
import '../css/app.css'

Vue.config.productionTip = false

Vue.component('app', require('./App').default)

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')

