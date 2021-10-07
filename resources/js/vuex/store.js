import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({

    state: {
        products: [],
        cart: [],
    },
    mutations: {

        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products;
        },
        SET_CART: (state, product) => {
            console.log(state.cart)
            if (state.cart.length) {
                let isProductExists = false;
                state.cart.map(function (item) {
                    if (item.article === product.article) {

                        isProductExists = true;
                        item.quantity++;
                    }
                })
                if (!isProductExists) {
                    state.cart.push(product);
                }

            } else {
                state.cart.push(product);
            }
        },

        REMOVE_FROM_CART: (state, index) => {
            state.cart.splice(index, 1)
            localStorage.removeItem("prod");
            localStorage.setItem("prod", JSON.stringify(state.cart));

            let cartLS = JSON.parse(localStorage.getItem('prod'));
            if(cartLS.length == 0){
                localStorage.removeItem('prod');
            }
        },

        INCREMENT: (state, index) => {
            state.cart[index].quantity++
            localStorage.removeItem("prod");
            localStorage.setItem("prod", JSON.stringify(state.cart));
        },
        DECREMENT: (state, index) => {
            if(state.cart[index].quantity > 1){
                state.cart[index].quantity--
            }
            localStorage.removeItem("prod");
            localStorage.setItem("prod", JSON.stringify(state.cart));
        },
        SAVE: (state) => {
            if(!state.cart.length && JSON.parse(localStorage.getItem("prod"))){
                state.cart = JSON.parse(localStorage.getItem("prod"));
            }
            else{
                state.cart = []
            }
        },

    },
    actions: {
        GET_PRODUCTS_FROM_API({commit}){
            return axios("http://localhost/Laravel-api/example-app/public/api/products", {
                method: "GET"
            })
                .then((products) => {
                    commit('SET_PRODUCTS_TO_STATE', products.data.data);

                    return products;
                })
                .catch((error) => {
                    return error;
                })
        },
        ADD_TO_CART({commit}, product){
            commit('SET_CART', product);
            product.available = false;
        },
        INCREMENT_CART_ITEM({commit}, index){
            commit('INCREMENT', index)
        },
        DECREMENT_CART_ITEM({commit}, index){
            commit('DECREMENT', index)
        },

        DELETE_FROM_CART({commit}, index){
            commit('REMOVE_FROM_CART', index)
        },
        SAVE_CART({commit}){
            commit('SAVE')
        },
    },
    getters: {
        PRODUCTS(state){
            return state.products;
        },
        CART(state){
            return state.cart;
        }
    }

});

export default store;