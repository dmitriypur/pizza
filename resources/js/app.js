require('./bootstrap');

import Vue from 'vue'
import store from './vuex/store'
import router from './router/router'
import '../css/app.css'
import 'material-design-icons-iconfont'

Vue.config.productionTip = false

Vue.component('app', require('./App.vue').default);

const app = new Vue({
    el: '#app',
    store,
    router
});