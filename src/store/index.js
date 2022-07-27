import Vue from 'vue'
import Vuex from 'vuex'
import company from '../store/modules/company'
import category from '../store/modules/category'
import productTag from '../store/modules/productTag'
import productType from '../store/modules/productType'
import user from '../store/modules/user'
import brend from '../store/modules/brend'
import product from '../store/modules/product'
import dept from '../store/modules/dept'
import sklad from '../store/modules/sklad'
import buy from '../store/modules/buy'
import order from '../store/modules/order'
import measurment from '../store/modules/measurment'
import client from '../store/modules/client'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // hostname: 'http://192.168.1.177:5003/api',
        // server_ip: 'http://192.168.1.177:5003/api',
        hostname: 'http://localhost:5003/api',
        server_ip: 'http://localhost:5003/',
        alert: false,

        pagination: {
            page: 0,
            size: 10
        },
        current_list: {
            current_item_count: 10,
            current_page: 1,
            items_count: localStorage.Items_count,
        },
        dontShowPagination: true,
        

    },
    mutations: {
        update_pagination(state, { size, page }) {
            // console.log('hiy girl')
            // console.log(size)
            // console.log(page)
            state.pagination.page = page;
            state.pagination.size = size;
            //   console.log(size)
        },
        update_pagination_first(state, { current_item_count, current_page, items_count }) {
            state.current_list.current_item_count = current_item_count;
            state.current_list.current_page = current_page;
            state.current_list.items_count = items_count;
            localStorage.Items_count = items_count
            state.dontShowPagination = true
        }

    },
    getters: {
        get_pagination(state) {
            return state.pagination;
        },
        get_current_list(state) {
            return state.current_list
        },
        dontShowPagination(state) {
            return state.dontShowPagination
        },
        
    },
    actions: {},
    modules: {
        company,
        user,
        category,
        productTag,
        productType,
        brend,
        product,
        dept,
        sklad,
        buy,
        order,
        measurment,
        client
    }
})