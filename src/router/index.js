import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/login/login.vue')
    },
    {
        path: '/company',
        name: 'company',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/company/company.vue')
    },
    {
        path: '/company_add/:id',
        name: 'company_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/company/company_Add.vue')
    },
    {
        path: '/user',
        name: 'user',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/user.vue')
    },
    {
        path: '/user_add/:id',
        name: 'user_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/user_Add.vue')
    },
    {
        path: '/client',
        name: 'client',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/client.vue')
    },
    {
        path: '/client_add/:id',
        name: 'client_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/client_Add.vue')
    },
    {
        path: '/authorization',
        name: 'authorization',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/authorization.vue')
    },
    {
        path: '/category',
        name: 'category',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/category/category.vue')
    },
    {
        path: '/category_add/:id',
        name: 'category_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/category/category_Add.vue')
    },
    {
        path: '/productTag',
        name: 'productTag',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/product/productTag.vue')
    },
    {
        path: '/productTag_add/:id',
        name: 'productTag_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/product/productTag_Add.vue')
    },
    {
        path: '/productType',
        name: 'productType',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/product/productType.vue')
    },
    {
        path: '/productType_add/:id',
        name: 'productType_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/product/productType_Add.vue')
    },
    {
        path: '/brend',
        name: 'brend',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/brend/brend.vue')
    },
    {
        path: '/brend_add/:id',
        name: 'brend_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/brend/brend_Add.vue')
    },
    {
        path: '/measurment',
        name: 'measurment',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/measurment/measurment.vue')
    },
    {
        path: '/measurment_add/:id',
        name: 'measurment_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/measurment/measurment_Add.vue')
    },
    {
        path: '/product',
        name: 'product',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/product/product.vue')
    },
    {
        path: '/product_add/:id',
        name: 'product_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/product/product_Add.vue')
    },
    {
        path: '/department',
        name: 'department',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/department/department.vue')
    },
    {
        path: '/department_add/:id',
        name: 'department_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/department/department_Add.vue')
    },
    {
        path: '/sklad',
        name: 'sklad',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/sklad/sklad.vue')
    },
    {
        path: '/sklad_add/:id',
        name: 'sklad_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/sklad/sklad_Add.vue')
    },
    {
        path: '/buy',
        name: 'buy',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/buy/buy.vue')
    },
    {
        path: '/buy_add/:id',
        name: 'buy_add',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/buy/buy_Add.vue')
    },
    {
        path: '/sale',
        name: 'sale',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/sale/sale.vue')
    },
    {
        path: '/test',
        name: 'test',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/sale/test.vue')
    },

    {
        path: '/reportproduct',
        name: 'reportproduct',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/reportproduct.vue')
    },
    {
        path: '/notLeftProduct',
        name: 'notLeftProduct',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/notLeftProduct.vue')
    },
    {
        path: '/minQtyProduct',
        name: 'minQtyProduct',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/minQtyProduct.vue')
    },
    {
        path: '/reportdate',
        name: 'reportdate',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/reportdate.vue')
    },


    // {
    //     path: '/saleApteka',
    //     name: 'saleApteka',
    //     meta: { layout: 'empty' },
    //     component: () =>
    //         import ('../views/aptekaSale/sale.vue')
    // },
    {
        path: '/saled',
        name: 'saled',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/aptekaSale/saled.vue')
    },
    {
        path: '/retunSpisaniya',
        name: 'spisaniya_products',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/returnProducts/returnSpisaniyProductsList.vue')
    },
    {
        path: '/retunContragent',
        name: 'return_contragent_products',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/returnProducts/returnContragentProductsList.vue')
    },
    {
        path: '/retunGetFromClientBack',
        name: 'return_from_client_products',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/returnProducts/returnGetProductsFromClientsList.vue')
    },

    {
        path: '/retunSpisaniya_add/:id',
        name: 'spisaniya_products_add',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/returnProducts/returnSpisaniyProductsList_Add.vue')
    },
    {
        path: '/retunContragent_add/:id',
        name: 'return_contragent_products_add',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/returnProducts/returnContragentProductsList_Add.vue')
    },
    {
        path: '/retunGetFromClientBack_add/:id',
        name: 'return_from_client_products_back_add',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/returnProducts/returnGetProductsFromClientsList_Add.vue')
    },
    {
        path: '/expired_date_left',
        name: 'expired_date_left',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/reportExpiredDateLeftProducts.vue')
    },
    {
        path: '/remaind_in_detail',
        name: 'remaind_in_detail',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/reportRemaindInDetailInfo.vue')
    },
    {
        path: '/getMaxSaledProductsByDate',
        name: 'getMaxSaledProductsByDate',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/getMaxSaledProductsByDate.vue')
    },
    {
        path: '/getPrixodQilinganProductsBeatweenDate',
        name: 'getPrixodQilinganProductsBeatweenDate',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/getPrixodQilinganProductsBeatweenDate.vue')
    },
    {
        path: '/getSaledSummOfKassirListBeatweenDateReport',
        name: 'getSaledSummOfKassirListBeatweenDateReport',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/getSaledSummOfKassirListBeatweenDateReport.vue')
    },
    {
        path: '/getSpisaniyaProductsByBeatweenDate',
        name: 'getSpisaniyaProductsByBeatweenDate',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/getSpisaniyaProductsByBeatweenDate.vue')
    },
    {
        path: '/getVozvratProductsByBeatweenDate',
        name: 'getVozvratProductsByBeatweenDate',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/getVozvratProductsByBeatweenDate.vue')
    },
    {
        path: '/getVozvratFromClientsProductsByBeatweenDate',
        name: 'getVozvratFromClientsProductsByBeatweenDate',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/getVozvratFromClientsProductsByBeatweenDate.vue')
    },
    {
        path: '/getCashboxesCurrentPosition',
        name: 'getCashboxesCurrentPosition',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/getCashboxesCurrentPosition.vue')
    },

   

    {
        path: '/creditors_list',
        name: 'creditors_list',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/creditor/creditorsList.vue')
    },
    {
        path: '/creditors_pay',
        name: 'creditors_pay',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/creditor/creditorAdd.vue')
    },
    {
        path: '/cashbox_costs',
        name: 'cashbox_costs',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/poscosts/costsList.vue')
    },

    {
        path: '/debitor',
        name: 'debitor',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/debitor/debitor.vue')
    },
    {
        path: '/debitor_add/:id',
        name: 'debitor_add',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/debitor/debitor_Add.vue')
    },



]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    console.log(from)
    if (to.path != '/') {
        if (localStorage.Login != '') {
            if (localStorage.AccessType == 1) {
                if (to.path == '/expired_date_left' || to.path == '/remaind_in_detail' || to.path == '/getMaxSaledProductsByDate'
                 || to.path == '/reportdate' || to.path == '/getCashboxesCurrentPosition' || to.path == '/getPrixodQilinganProductsBeatweenDate'
                || to.path == '/getSaledSummOfKassirListBeatweenDateReport' || to.path == '/getSpisaniyaProductsByBeatweenDate' 
                || to.path == '/getVozvratProductsByBeatweenDate' || to.path == '/getVozvratFromClientsProductsByBeatweenDate') {
                    next('/saled')
                }
            } else if (localStorage.AccessType == 0) {
                next()
            } 
            // else if (localStorage.AccessType == 2) {
            //     if (to.path == '/sell' || to.path == '/zaxiraniAlmashtirish' || to.path == '/product') {
            //         next('/tarozi')
            //     }
            // }
             else {
                next()
            }

            next()

        } else {
            next('/')
        }
    } else {
        next()
    }
})

export default router