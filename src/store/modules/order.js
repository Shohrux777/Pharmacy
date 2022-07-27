export default {
    state: {
        m_department: {
            rows: [],
            columns: [],
            col: []
        },
        zakaz_product_list: [],
        product_qty: [],
        product_summ: [],
        AllSummString: [],
        zakaz_product_all_list: [

        ],
        CheckId: 0,
        page_savat: 0,


    },
    actions: {

    },
    mutations: {
        update_zakaz_product_all_list(state) {
            var emptyArr = []
            state.zakaz_product_all_list.push(emptyArr)
            state.product_summ.push(0)
            state.AllSummString.push('0')
            state.product_qty.push(0)

        },
        updateCheckId(state, id){
            state.CheckId = id
        },
        select_savat_page(state, i) {
            state.page_savat = i;
            console.log('select')
            console.log(state.page_savat)
        },
        add_savat_page(state) {
            var emptyArray = []
            state.zakaz_product_all_list.push(emptyArray)
            state.page_savat = state.zakaz_product_all_list.length-1;
            state.product_summ.push(0)
            state.AllSummString.push('0')
            state.product_qty.push(0)
        },
        del_savat_page(state, i) {
            console.log(i)
            state.zakaz_product_all_list.splice(parseInt(i), 1);
            state.product_summ.splice(parseInt(i), 1);
            state.AllSummString.splice(parseInt(i), 1);
            if (state.zakaz_product_all_list.length == 0) {
                let array = [];
                state.zakaz_product_all_list.push(array)
                state.product_summ.push(0)
                state.AllSummString.push('0')
                state.page_savat = 0;
            } else {
                if (state.product_summ.length == i) {
                    state.page_savat = parseInt(i) - 1
                    console.log('state.page_savat')
                    console.log(state.page_savat)
                } else {
                    state.page_savat = i
                    console.log('state.page_savat')
                    console.log(state.page_savat)
                }
            }
        },



        add_product_order(state, data) {
            console.log('data order')
            console.log(data.price)
            // state.product_qty += parseFloat(data.qty)+(parseFloat(parseFloat(data.unit)/parseFloat(data.contains_number_in_pack))).toFixed(2);
            state.product_summ[state.page_savat] += parseFloat(data.price);
            state.product_summ[state.page_savat] = parseFloat(state.product_summ[state.page_savat].toFixed(2))
            state.AllSummString[state.page_savat] = (state.product_summ[state.page_savat]).toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
            // console.log(state.product_summ[state.page_savat])

            var a = {
                real_company_id: localStorage.CompId,
                product_id: data.id,
                name: data.name,
                unit_price: (data.saledPrice/data.contains_number_in_pack).toFixed(2),
                summ: data.price,
                summString: data.price.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 '),
                real_sum: data.saledPrice,
                real_sumString: data.saledPrice.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 '),
                qty: parseInt(data.qty),
                qty_in_pack: parseInt(data.unit),
                posInvoiceid: 0,
                invoiceItemId: data.invoice,
                expired_date: data.expired_date,
                contains_number_in_pack: data.contains_number_in_pack
            }
            
            var s = 0;
            var index = -1;
            
            if (state.zakaz_product_all_list[state.page_savat].length == 0) {
                state.zakaz_product_all_list[state.page_savat].push(a)
                state.product_qty[state.page_savat] += 1;
                state.zakaz_product_all_list[state.page_savat][0].addShow = true;
                setTimeout(function() {
                    state.zakaz_product_all_list[state.page_savat][0].addShow = false;
                }, 250);
            } else {
                for (var i = 0; i < state.zakaz_product_all_list[state.page_savat].length; i++) {
                    if (state.zakaz_product_all_list[state.page_savat][i].invoiceItemId === data.invoice) {
                        s++;
                        index = i;
                        break;
                    }
                }
                if (s == 0) {
                    state.zakaz_product_all_list[state.page_savat].push(a)
                    state.product_qty[state.page_savat] += 1;
                    // state.zakaz_product_all_list[state.page_savat][state.zakaz_product_all_list[state.page_savat].length - 1].addShow = true;
                    // setTimeout(function() {
                    //     state.zakaz_product_all_list[state.page_savat][state.zakaz_product_all_list[state.page_savat].length - 1].addShow = false;
                    // }, 150);
                } else {    
                    state.zakaz_product_all_list[state.page_savat][index].qty = parseInt(state.zakaz_product_all_list[state.page_savat][index].qty) + parseInt(a.qty);
                    state.zakaz_product_all_list[state.page_savat][index].summ = parseFloat(state.zakaz_product_all_list[state.page_savat][index].summ) + parseFloat(a.summ);
                    state.zakaz_product_all_list[state.page_savat][index].summ = parseFloat(state.zakaz_product_all_list[state.page_savat][index].summ.toFixed(2))
                    state.zakaz_product_all_list[state.page_savat][index].qty_in_pack = parseInt(state.zakaz_product_all_list[state.page_savat][index].qty_in_pack) + parseInt(a.qty_in_pack);
                    state.zakaz_product_all_list[state.page_savat][index].addShow = true;
                    if(state.zakaz_product_all_list[state.page_savat][index].qty_in_pack>=a.contains_number_in_pack){
                        state.zakaz_product_all_list[state.page_savat][index].qty ++;
                        state.zakaz_product_all_list[state.page_savat][index].qty_in_pack = state.zakaz_product_all_list[state.page_savat][index].qty_in_pack - a.contains_number_in_pack;
                    }
                    state.zakaz_product_all_list[state.page_savat][index].summString = state.zakaz_product_all_list[state.page_savat][index].summ.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');

                    // setTimeout(function() {
                    //     state.zakaz_product_all_list[state.page_savat][index].addShow = false;
                    // }, 150);
                }
            }
            // console.log('state.zakaz_product_all_list[state.page_savat]')

        },


        del_product(state, item) {
            console.log(item);
            console.log(state.zakaz_product_all_list[state.page_savat])
            state.zakaz_product_all_list[state.page_savat].splice(parseInt(item.index),1)
            state.product_summ[state.page_savat] -= parseFloat(item.data.summ);
            state.product_summ[state.page_savat] = parseFloat(state.product_summ[state.page_savat].toFixed(2))
            if(state.product_summ[state.page_savat]<1){
                state.product_summ[state.page_savat] = 0;
            }
            state.AllSummString[state.page_savat] = (state.product_summ[state.page_savat]).toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
        


        },
        
        clear_order(state) {
            state.zakaz_product_all_list[state.page_savat] = [];
            // state.product_qty = 0;
            state.product_summ[state.page_savat] = 0;
            state.product_qty[state.page_savat] = 0;
            state.AllSummString[state.page_savat] = state.product_summ[state.page_savat].toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
        },
        changeSumma(state,index) {
            var summa = 0;
            state.zakaz_product_all_list[state.page_savat][index].summ = ((state.zakaz_product_all_list[state.page_savat][index].qty * state.zakaz_product_all_list[state.page_savat][index].real_sum) + (parseFloat((state.zakaz_product_all_list[state.page_savat][index].qty_in_pack*state.zakaz_product_all_list[state.page_savat][index].real_sum)/(state.zakaz_product_all_list[state.page_savat][index].contains_number_in_pack)))).toFixed(2)
            for (var i = 0; i < state.zakaz_product_all_list[state.page_savat].length; i++) {
                summa += parseFloat(state.zakaz_product_all_list[state.page_savat][i].summ)
            }
            state.product_summ[state.page_savat] = summa.toFixed(2);
            state.product_summ[state.page_savat] = parseFloat(state.product_summ[state.page_savat].toFixed(2))
            state.AllSummString[state.page_savat] = state.product_summ[state.page_savat].toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
        },





        input_change(state, index) {
            state.zakaz_product_all_list[state.page_savat][index].inputShow = true;
        },
        
        minus_product(state, data) {
            // console.log(data);
            state.zakaz_product_all_list[state.page_savat][data.index].qty--;
            state.product_qty--;
            state.product_summ[state.page_savat] -= (data.data.unit_price);
            state.AllSummString[state.page_savat] = state.product_summ[state.page_savat].toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
        },
        plus_product(state, data) {
            // console.log(data);
            state.zakaz_product_all_list[state.page_savat][data.index].qty++;
            state.product_qty++;
            state.product_summ[state.page_savat] += (data.data.unit_price);
            state.AllSummString[state.page_savat] = state.product_summ[state.page_savat].toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');

        },

    },
    getters: {
        allOrderList(state) {
            return state.zakaz_product_all_list[state.page_savat];
        },
        get_all_summa(state) {
            return state.product_summ;
        },
        AllSummString(state) {
            return state.AllSummString;
        },
        get_zakaz_product_all_list(state) {
            return state.zakaz_product_all_list;
        },
        get_page_savat(state) {
            return state.page_savat;
        },
        get_product_qty(state) {
            return state.product_qty;
        },
        CheckId(state){
            return state.CheckId;
        }


    }
}