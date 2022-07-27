<template>
 <div>
    <check v-if="check_show" @close="check_show=false" />
    <div v-else class="sale">
      <div class="saleHeader border-bottom d-flex justify-content-between">
        <router-link to="/sale">
           <h5 class="m-0 ml-3 d-flex" style="padding: 16px 0px">
              <mdb-icon icon="shopping-basket" style=""  class="mr-3 "/>
              {{$t('sale')}}</h5>
        </router-link>
        <div class="mr-2 d-flex align-items-center">
          <div class="mr-2 text-right" style="position: relative">
            <h6 class="m-0 p-0 mb-2">{{userName}} </h6>
            <small class="text-primary font-weight-bold" style="font-size:10px; position: absolute; right: 3px; top: 20px;">Casher</small>
          </div>
           <div class="avatar_drop animated bounce"   style="width: 40px; height: 40px; position: relative;">
                <div  style="width: 40px; height: 40px;">
                  <img src="../../assets/logo.jpg"  class="img-avatar img-fluid rounded-circle" alt="">
                </div>
                <i class="fas fa-circle mr-1 text-success " style="position: absolute; bottom: 0; right:-1.5px; font-size: 10px;"></i>
            </div>
        </div>
       
      </div>
      <loaderTable v-if="loading"/>
      <form  v-else class="saleBody">
        <div class="saleProduct " >
   
          <!--Start Category -->
          <div class="category mt-2 d-flex flex-wrap px-3">
            <div class="mr-2 categ_active  d-flex align-items-center" :class="{'activeCategory': categIndex == -1}">
              <p @click="chooseAllproduct" class="p-0 m-0 px-2 py-1" style="font-size: 13px;">All product</p>
            </div>
            <div v-for="(item, i) in allCategory.rows" :key="i" class="mr-2 categ_active  d-flex align-items-center" :class="{'activeCategory': categIndex == i}">
              <p @click="chooseCategory(item.id, i)" class="p-0 m-0 px-2 py-1" style="font-size: 13px;">{{item.name}}</p>
            </div>
          </div>
          <!--End Category -->
   
   
          <!-- Start Search product -->
            <div class="searchProduct px-3 d-flex justify-content-start align-items-center mt-2">
              <div style="width: 60%; height: 33px; " class="border  d-flex">
                <input type="text" class="px-2" v-model="searchName" @keyup="search_name" placeholder="Search product by name / code" style="width:100%; outline:none; border:none; font-size:13px;">
                <div class="iconBarcode d-flex justify-content-center align-items-center" style="width:50px;">
                  <mdb-icon icon="barcode" style="font-size: 25px;" />
                </div>
              </div>
            </div>
          <!-- End Search product -->
   
          <!-- Start product list -->
            <div class="productlist px-3 mt-3">
              <loaderTable v-if="loadingCategory"/>
              <div v-else class="row">
                <div v-for="(item,i) in get_m_categoryIdProduct.items_list" :key="i" class="col-12 col-sm-12 col-md-6 col-lg-3 mt-3">
                  <div class="px-2 card  activeProduct" @click="sellProduct(item)">
                    <div class="onlyLine mb-2">
                      <p class="m-0 p-0 mt-2">{{item.name}} </p>
                      <small class="m-0 p-0 my-2" style="color:gray;">1 {{item.measurment.name}} </small>
                      <div class="d-flex justify-content-between align-items-end " style="width:100%; height: 50px;">
                        <div style="width:100%;">
                          <span>{{item.buyed_price}} So'm</span>
                        </div>
                        <img v-if="item.image.length > 10" :src="server_ip + item.image" alt="" class="img-fluid rounded"  style="width:70px; height: 40px;">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <!-- End product list -->
            <div style="position: sticky; bottom:0; left:0" class="w-100 ">
              <div  class="d-flex flex-wrap align-items-center bg-light px-3" >
                <div v-for="(page,i) in get_zakaz_product_all_list" :key="i" :class="{'bg-primary': savatActive == i,'text-white': savatActive == i, 'bg-warning': savatActive != i}"
                   class=" m-1 p-1" @click="select_savat(i)" style="width:100px; position:relative; cursor:pointer">
                  <span>{{$t('savat')}} {{i+1}}</span>
                  <div style="position: absolute; top:-6px; right:0; cursor:pointer;" @click="del_savat(i)" class="">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="13" height="13" viewBox="0 0 24 24" stroke-width="3.0" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                </div>
                <div @click="add_savat" style="cursor:pointer;">
                  <mdb-icon icon="plus-circle" size="lg" class="text-success"  />
                </div>
              </div>
            </div>
           
   
   
        </div>
        <div class="saleBascet container border-left">
          <div class="py-2 px-0 d-flex justify-content-between align-items-center " >
            <h6 class="m-0 p-0">Current Order</h6>
            <div class="px-3 clearAll" style="position:relative">
              <small ><mdb-icon icon="ellipsis-h" style="font-size:18px;"/></small>
              <ul class="card text-dark dropdownPay">
                <li @click="clear_sell">Clear order</li>
                <li >Leave comments</li>
                <li @click="check_sell">Check</li>
              </ul>
            </div>  
          </div>
          <!-- Start Search product -->
            <div class="searchProduct d-flex justify-content-start align-items-center mt-1">
              <div style="width: 100%; height: 33px; border: 1px solid #3080ED;" class="d-flex">
                <input type="text" class="px-2" v-model="barcode" @input="add_by_barcode" ref="barcode" placeholder="Search product by name / code" style="width:100%; outline:none; border:none; font-size:13px;">
                <div class="iconBarcode d-flex justify-content-center align-items-center" style="width:50px;">
                  <mdb-icon icon="barcode" style="font-size: 25px;" />
                </div>
              </div>
              
            </div>
            <strong class="red-text" v-if="not_found">Not found</strong>
          <!-- End Search product -->
   
   
          <!-- Start Get product order-->
          
          <div class="orderProduct  pr-2">
            <div class="d-flex py-2 border-bottom" >
              <div class="title" style="width:160px;">
                <p class="m-0 p-0 ml-2" style="font-size: 13px; font-weight:bold;">Name</p>
              </div>
              <div  class="img d-flex " style="width:60px;" >
                <p class="m-0 p-0" style="font-size: 13px; font-weight:bold;">Price</p>
              </div>
              <div class="discountAdd d-flex justify-content-center" style="width:90px;">
                <p class="m-0 p-0 ml-2" style="font-size: 13px; font-weight:bold;">Qty</p>
              </div>
              <div class="text-right ml-3 pr-2 " style="width:80px;">
                <p class="m-0 p-0 ml-2" style="font-size: 13px; font-weight:bold;">Total</p>
              </div>
            </div>
            <div  v-for="(item,i) in get_zakaz_product_all_list[get_page_savat]" :key="i"  class="d-flex align-items-center border-bottom" :class="{'bg_warning': item.unit_price*item.qty==0, 'bg_warning1': item.addShow}">
              
              <div class="title" style="width:160px; overflow: hidden;">
                <p class="m-0 p-0 ml-2" style="font-size: 13px; color:#142746  ">{{item.name}}</p>
              </div>
              <div  class="img d-flex align-items-center" style="width:60px; height:44px;">
                <div class=" d-flex align-items-center">
                  <small class="m-0 p-0" style=" font-size: 12px;  color:#142746 " >{{item.unit_price}} </small>
                  <!-- <small class="m-0 p-0 ml-1" style="color:gray; font-size: 11px;">/ш.т </small> -->
                </div>
              </div>
              <div class="discountAdd d-flex justify-content-between" style="width:90px;">
                <div v-if="item.qty != 1 && item.qty >= 2" @click="minusProd(i, item)">
                  <mdb-icon icon="minus" style="font-size:12px;"  class="p-2 border rounded text-danger" />
                </div>
                <div v-else @click="deleteProd(i, item)">
                  <mdb-icon icon="trash" style="font-size:12px; " class="p-2 border rounded text-danger " />
                </div>
                <div style="width: 30px; height:29px;" class="d-flex justify-content-center" @click="input_show(i)">
                  <input v-if="item.inputShow" v-model="item.qty" min="1" @keyup="getInputQty()" @blur="getInputQty()" type="number" style="width: 30px; height:29px; outline: none; border: none; text-center; font-size: 12.5px; padding-left: 2px;" class=" border rounded" >
                  <small v-else class="m-0 p-0 pt-1 ">{{item.qty}}</small>
                </div>
                <div @click="plusProd(i, item)">
                  <mdb-icon icon="plus" style="font-size:12px; "  class="p-2 border rounded text-success"/>
                </div>
              </div>
              <div class="text-right ml-3 pr-2 " style="width:80px;">
                <span style="font-size: 13px; font-weight:bold;">{{item.unit_price*item.qty}}</span> <small style="font-size: 9px; font-weight: bold;"></small>
              </div>
            </div>
            
          </div>
          <!-- End Get product order-->
   
          <div class="border-top">
            <div class="px-1 pr-3 d-flex align-items-center justify-content-between">
              <h6 class="m-0 p-0 py-3 font-weight-bold">Total:</h6>
              <h6 class="m-0 p-0 py-3 font-weight-bold">{{get_all_summa[get_page_savat]}} <span>So'm</span></h6>
            </div>
            
            <div class=" m-0 pr-3 ">
              <div class="payedClick ">
                  <mdb-btn color="success" @click="submit" class="m-0 py-2 w-100">Pay</mdb-btn>
              </div>
            </div>
          </div>
   
        </div>
      </form>
     
      
      <pay v-show="showPay" :summa="get_all_summa[get_page_savat]" @submitSuccess="submitPaySuccess" @close="showPay=false"/>
      <massage_box :hide="modal_status" :detail_info="modal_info"
        :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
        <Toast ref="message"></Toast>
    </div>
 </div>
</template>

<script>
import {
  mdbIcon,
  mdbBtn,
} from "mdbvue";
import pay from './pay'
import check from './check'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import anyTable from "../../components/anyTable"
export default {
  data(){
    return {
      showPay: false,
      check_show: false,
      userName: localStorage.fio,
      categIndex: -1,

      savatActive: 0,


      modal_info: '',
      modal_status: false,
      loading: false,
      loadingCategory: false,
      auth_id: localStorage.AuthId,
      barcode: '',
      server_ip: this.$store.state.server_ip,
      not_found : false,
      searchName: '',
    }
  },
  components: {
    anyTable, mdbIcon,
    mdbBtn, pay, check
  },
  computed: mapGetters(['allCategory', 'allProduct', 'allOrderList', 'get_all_summa', 'get_m_categoryIdProduct', 'get_zakaz_product_all_list','get_page_savat']),
  methods: {
    ...mapActions(['fetchCategory', 'fetchProduct', 'fetchCategoryAllProduct_bylimit', 'fetchCategoryIdProduct', 'fetchProductSearchByName']),
    ...mapMutations(['sklad_delete_row', 'add_product_order', 'minus_product', 'plus_product', 'del_product', 'clear_order', 'input_change', 'changeSumma', 'update_zakaz_product_all_list', 'select_savat_page', 'add_savat_page', 'del_savat_page']),
      
      async chooseCategory(id, i){
        this.loadingCategory = true;
        await this.fetchCategoryIdProduct(id);
        this.loadingCategory = false;
        this.categIndex = i
      },
      async chooseAllproduct(){
        this.categIndex = -1;
        this.loadingCategory = true;
        await this.fetchCategoryAllProduct_bylimit(15);
        this.loadingCategory = false;
      },

      async search_name(){
        if(this.searchName != ''){
          this.loadingCategory = true;
          try{
            await this.fetchProductSearchByName(this.searchName);
          }
          catch{
            // this.modal_info = this.$i18n.t("not_found");
            // this.modal_status = true
          this.$refs.message.error('not_found')
          }
          this.loadingCategory = false;
        }
        else{
          this.categIndex = -1;
          this.loadingCategory = true;
          await this.fetchCategoryAllProduct_bylimit(15);
          this.loadingCategory = false;
        }
        
        
      },

      submit(){
        this.showPay=true;
        this.$root.$refs.pay.cashClicked();
        this.$root.$refs.pay.sumchange();

      },
      clear_sell(){
        this.clear_order();
      },
      check_sell(){
        this.check_show = true;
        
        // this.check_show = false;
      },
      async add_by_barcode()
      {
        if(this.barcode.length > 3)
        {
           try{
            const response = await fetch(this.$store.state.hostname + "/PosProducts/checkProductByBarcodeForSale?barcode=" + this.barcode);
            const data = await response.json();
             this.not_found = false
            // console.log(data)
            
            if(data.id)
            {
              var p_data = 
              {
                id : data.product_id,
                name : data.product_name,
                buyed_price : data.buyed_price,
                price : data.price, 
                product_reg_code : data.product.product_reg_code
              }
              this.add_product_order(p_data);
               this.barcode = '';
            }
          }
          catch{
            // this.modal_info = this.$i18n.t("not_found");
            // this.modal_status = true
            this.not_found = true
          
          }
        }
      },
      sellProduct(data){
        this.add_product_order(data);

        // console.log('this.get_all_summa')
        // console.log(data.image.length)
      },
      minusProd(i,item){
        console.log('dfsd')
        this.minus_product({index: i, data:item})
      },
      plusProd(i,item){
        this.plus_product({index: i, data:item})
      },
      deleteProd(i,item){
        console.log('dfsd')
        this.del_product({index: i, data:item})
      },

      submitPaySuccess(){
        this.check_show = true; 
        this.$refs.message.success('Payments_payed')
      },
      input_show(i){
        this.input_change(i)
      },
       async getInputQty(){
        this.changeSumma();
      },


      // Savat

      select_savat(i){
        console.log(i)
        this.savatActive = i
        this.select_savat_page(i)
      },
      add_savat(){
        this.add_savat_page()
      },
      del_savat(i){
        this.del_savat_page(i)
      },
      
  },
  async mounted(){
    // this.$root.$refs.sidebar.backMenu(false);
    if(this.get_zakaz_product_all_list.length == 0){ 
      this.update_zakaz_product_all_list()
    }
    console.log('this.get_zakaz_product_all_list.length');
    console.log(this.get_zakaz_product_all_list);
    await this.fetchCategoryAllProduct_bylimit(15);
    console.log()
    {
      this.loading = true;
      await this.fetchCategory(); 
      await this.fetchProduct();
      this.loading = false;
    }

    if(this.$store.state.alert){
      this.$refs.message.success('Added_successfully')
      this.$store.state.alert = false
    }

    this.$nextTick(function () {
      this.$refs.barcode.focus();
      this.barcode = '';
    })

  }
}
</script>
  
<style lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

/* for scroll */
  /* width */

::-webkit-scrollbar {
  width: 4px;

}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/* ! for scroll */

  .saleBody{
    width: 100%;
    display: flex;
    max-height: 92vh;
    // background-color: rgb(126, 80, 80);
  }
  .saleBody .saleProduct{
    width: 100%;
    
    .productlist{
      min-height: 83.5%;
      max-height: 84%;
      overflow: hidden;
      overflow-y: scroll;
      position: relative;
    }

    .category{
      height: 30px;
      background: #fff;
      overflow: hidden;
      overflow-y: scroll;
      .categ_active:hover{
        background: rgb(251, 255, 12);
        border-radius: 30px;
        cursor: pointer;
      }
    }
  }
  .saleBody .saleBascet{
    width: 600px;
  }

  .activeCategory{
    background: rgb(251, 255, 12);
    border-radius: 20px;  
  }
  .onlyLine{
    width: 94%;
    text-overflow: ellipsis; 
    overflow: hidden; 
    white-space: nowrap;
    font-size: 14px;
    font-weight: bold;
  }
  .activeProduct:hover{
    cursor: pointer;
    // border: 1px solid #ff0000;
    background: rgb(243, 243, 243)
  }
  .clearAll{
    color: red;
  }
  .clearAll:hover{
    background: #ff6e6e;
    color:#fff;
    border-radius: 3px;
    cursor: pointer;
    .dropdownPay{
      visibility: visible;
    }
  }
  .orderProduct{
    font-family: 'Roboto';
    height: 70vh;
    overflow: hidden;
    overflow-y: scroll;
  }
  .dropdownPay{
    visibility: hidden;
    position:absolute;
    top:23px; 
    right:0px; 
    width: 150px;
    list-style: none; 
    margin: 0;
    padding: 7px 0px;
    li{
      font-size:13px;
      padding: 4px 12px;
      &:hover{
        background: #eeeeee;
      }
    }
  }
  .bg_warning{
    background: rgb(255, 244, 160);
  }
  .bg_warning1{
    background: rgb(174, 255, 191);
  }
</style>