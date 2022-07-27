<template>
<div>
  <check v-if="check_show" @close="closedChek"  />
  <div v-else class="aptekaSale" >
    <div class="saleHeader border-bottom d-flex justify-content-between align-items-center"  v-on:click.capture="focusBarcode">
      <div>
        <router-link to="/saled">
          <h5 class="m-0 ml-3 d-flex align-items-center" style="padding: 7px 0px; font-size: 15.5px;">
              <mdb-icon icon="shopping-basket" style="font-size: 15px;"  class="mr-2 "/>
              {{$t('sale')}}</h5>
          </router-link>

      </div>
      
      <div class="d-flex">
        <div class="">
          <h5 class="m-0 px-3 d-flex align-items-center text-danger rounded" @click="funcCloseCash" 
            style="padding: 7px 0px; font-size: 12px; font-weight: bold; border-bottom: 1px solid red; cursor:pointer;">
            {{$t('closeCash')}}
          </h5>
        </div>
        <div style="position:relative;" class="userLog">
          <h5 class="m-0 px-3 d-flex align-items-center text-warning" style="padding: 7px 0px; font-size: 12px; font-weight: bold;">
            {{kassir}}
          </h5> 
          <div style="position:absolute; top:28px; left:15px; cursor:pointer;" class=" border w-100 logout "  >
            <p @click="logout" class="p-0 m-0 py-1 ml-2">{{$t('logout')}}</p>
          </div>
        </div>
        
        <div style="width:145px;" class="d-flex align-items-center justify-content-center border-left">
          <h5 class="m-0   " style="padding: 7px 0px; font-size: 12px; font-weight: bold;">
            {{timestamp}}
          </h5>
        </div>
        
      </div>
    </div>
    <div class="allPage" >
      <div class="tablePageLeft">
        <div class="tableAndBtn" style="position: relative;">
          <div class="myTablesforSale border py-2 px-2" v-on:click.capture="focusBarcode">
            <div class="tableProduct ">
              <table  class="myTablesforSale " >
                <thead >
                  <tr  class="header">
                  <th style="width: 40px;">№</th>
                  <th style="width: 300px;">{{$t('product')}}</th>
                  <th>{{$t('soni')}}</th>
                  <th>{{$t('unit_qty')}}</th>
                  <th>{{$t('price')}}</th>
                  <th>{{$t('expired_date')}}</th>
                  <th class=" pl-3">{{$t('total')}}</th>
                  <th style="width: 40px;">{{$t('')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in get_zakaz_product_all_list[get_page_savat]" :key="i" class="backlight searchBarcodeHover">
                    <td>{{i+1}}</td>
                    <td>{{item.name}}</td>
                    <td><input type="number" disabled v-model="item.qty" @input="updateQty(i)" class="form-control form-control-sm" style="border:none; outline:none;font-weight:bold;" ></td>
                    <td><input type="number" disabled v-model="item.qty_in_pack" @input="updateQty(i)"  class="form-control form-control-sm" style="border:none; outline:none; font-weight:bold;" > </td>
                    <td>{{item.real_sumString}}</td>
                    <td>{{item.expired_date}}</td>
                    <td class=" pl-3">{{item.summString}}</td>
                    <td><div @click="deleteProduct(item, i)">
                      <mdb-icon icon="trash" class="text-danger"  />
                    </div>
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="position: absolute; bottom:0px; left:0" class="w-100  bg-white border-bottom">
              <div  class="d-flex flex-wrap align-items-center border-top py-1 " >
                <div v-for="(page,i) in get_zakaz_product_all_list" :key="i" :class="{'bg-warning': savatActive == i,'text-white': savatActive == i, 'bg-white': savatActive != i}"
                    class=" m-0 p-1 border" @click="select_savat(i)" style="width:100px; position:relative; cursor:pointer">
                  <span style="font-size: 13px; padding-left:3px;">{{$t('savat')}} {{i+1}}</span>
                  <div style="position: absolute; top:-6px; right:0; cursor:pointer;" @click="del_savat(i)" class="">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="12" height="12" viewBox="0 0 24 24" stroke-width="3.0" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                </div>
                <div @click="add_savat" style="cursor:pointer;" class="ml-1">
                  <mdb-icon icon="plus-circle" size="lg" class="text-success"  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchNameBarcode mt-1">
          <div class="row mb-1" v-on:click.self="focusBarcode">
            <div class="col-5 m-0 mx-2">
              <input v-model="searchDrag" @keyup.enter="searchFunc" size="sm" ref="searchDrag"
              type="text"  id="inputEmail"
              v-on:keyup.38 = "ArrowUp1"
              v-on:keyup.40 = "ArrowDown1"
              v-on:keyup.37 = "ArrowRight1"
              v-on:keyup.39 = "ArrowRight1"
              style="margin-top: 10px;  margin-bottom: 0px; height: 34px; outline:none;"
              class="w-100  px-2 inputFocusSearch" />
              <label style="position:absolute; top:-2px; left:20px; font-size:12px;" class="control-label" for="inputEmail">{{$t('search_here')}}</label>

              <input type="text" 
                style="position:absolute; z-index: -55; outline: none; left: -1400px;"
                ref="hiddenArrow1"
                v-model="hiddenArrow1"
                v-on:keyup.13 = "EnterArrowItem"
                v-on:keyup.38 = "ArrowUp1"
                v-on:keyup.40 = "ArrowDown1"
                
              >
            </div>

            <div class="col-3 mx-2">
              <input v-model="barcode"
                id="inputEmail1" 
                @keyup.enter="getbarcode()"
                @paste="onPaste" 
                @input="hanlePro($event)"
                v-on:keyup.38 = "ArrowUp"
                v-on:keyup.40 = "ArrowDown"
                v-on:keyup.37 = "ArrowRight"
                v-on:keyup.39 = "ArrowRight"
                ref="barcode" size="sm" type="text"  
                style="margin-top: 10px;  margin-bottom: 0px; height: 34px; outline:none;"
                class="w-100  px-2 inputFocusSearch"/>
              <label style="position:absolute; top:-2px; left:20px; font-size:12px;" class="control-label" for="inputEmail1">{{$t('barcode')}}</label>

            </div>
          </div>
                
          <div class="FoundProductTable border" v-on:click.capture="focusBarcode">
            <input type="text" 
              style="position:absolute; z-index: -55; outline: none; left: -500px;"
              ref="hiddenArrow"
              v-model="hiddenArrow"
              @paste="onPaste" 
              v-on:keyup.13 = "EnterArrowItem"
              v-on:keyup.38 = "ArrowUp"
              v-on:keyup.40 = "ArrowDown"
            >
            <div class=" p-3">
              <div class="tableProducts">
                <table  class="myTablesforSale" >
                  <thead>
                    <tr  class="header">
                    <th style="width: 30px;">№</th>
                    <th style="width: 250px;">{{$t('product')}}</th>
                    <th>{{$t('soni')}}</th>
                    <th>{{$t('price')}}</th>
                    <th >{{$t('expired_date')}}</th>
                    <th >{{$t('skidka')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in searchBarcodeData" :key="i" class="searchBarcodeHover" @click="clickBarcodeData(item)" 
                      :class="[{'bg_dark text-white': item.exp_days_count<=0},{'bg_danger text-white': item.exp_days_count > 0 && item.exp_days_count < 30},{'bg_warning text-dark':  item.exp_days_count > 30 && item.exp_days_count < 60},{'bg_success text-white': item.exp_days_count > 60 && item.exp_days_count < 90},{'arrow_back_active': Arrowdown-1 == i}]">
                      <td>{{i+1}}</td>
                      <td>{{item.product.name}}</td>
                      <td>{{item.real_qty}}</td>
                      <td>{{item.product.buyed_price}}</td>
                      <td>{{item.expired_date.slice(0,10)}}</td>
                      <td>{{item.persantage_discount}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="SummaBtnRight border"  v-on:click.capture="focusBarcode">
        <div class="d-flex">
          <div class="w-50">
            <div class="qty borderSolder py-2">
              <span class="ml-3">{{$t('summ')}}</span>
              <div class="text-right px-3 mt-1">
                <p>{{AllSummString[get_page_savat]}}</p>
              </div>
            </div>
          </div>
          <div class="w-50">
            <div class="qty borderSolder py-2">
              <span class="ml-3">{{$t('discount')}}</span>
              <div class="text-right px-3 mt-1">
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-100">
          <div class="qty borderSolderOplate py-2">
            <span class="ml-3">{{$t('Total')}}</span>
            <div class="text-right px-3 mt-1">
              <p>{{AllSummString[get_page_savat]}}</p>
            </div>
          </div>
        </div>
        <div class="d-flex" v-on:click.capture="focusBarcode">
          <div class="w-50">
            <div class="text-center mt-1 linkMain" style="padding: 9.2px 0;" @click="checkShow">
              <span class="m-0 p-0 " >{{$t('check')}} </span>
            </div>
            <div class="text-center mt-1  linkMain" style="padding: 9.2px 0;">
              <span class="m-0 p-0 " >{{$t('client')}}</span>
            </div>
            <div class="text-center mt-1  linkMain" style="padding: 9.2px 0;">
              <span class="m-0 p-0 " >{{$t('pay_client')}}</span>
            </div>
            <div class="text-center mt-1  linkMain" style="padding: 9.2px 0;">
              <span class="m-0 p-0 " >{{$t('skidka')}}</span>
            </div>
            <div class="text-center mt-1  linkMain" style="padding: 9.2px 0;">
              <span class="m-0 p-0 " >{{$t('skidka')}}</span>
            </div>
            <div class="text-center mt-1  linkMainDang" style="padding: 9.2px 0;" @click="clearSavat">
              <span class="m-0 p-0 " >{{$t('clear_cash')}}</span>
            </div>
            
          </div>
          <div class="w-50">
            <mdb-btn color="success" style="font-size:11px; padding: 12px 0;" @click="cashPay"  class="m-0  mt-1 w-100">{{$t('cash')}}</mdb-btn>
            <!-- <mdb-icon icon="money-bill-alt" class="mr-2 "/> -->
            <mdb-btn color="info" style="font-size:11px; padding: 12px 0;" @click="uzcardPay" class="m-0  mt-1 w-100" > {{'uzcard'}}</mdb-btn>
            <mdb-btn color="mdb-color" style="font-size:11px; padding: 12px 0;" @click="humoPay" class="m-0  mt-1 w-100" > {{'humo'}}</mdb-btn>
            <mdb-btn color="warning" style="font-size:11px; padding: 12px 0;" @click="clickPay" class="m-0  mt-1 w-100"> {{$t('click')}}</mdb-btn>
            <mdb-btn color="indigo" style="font-size:11px; padding: 12px 0;" @click="onlinePay" class="m-0  mt-1 w-100" > {{'online'}}</mdb-btn>
            <mdb-btn style="font-size:11px; padding: 12px 0;" color="deep-orange" @click="returnMoney"  class="m-0  mt-1 w-100"> {{$t('return')}}</mdb-btn>
          </div>
        </div>
      </div>

    </div>

    <div class="addProductQtyAccept" v-show="showAccept" v-on:click.self="closeChoosenProduct">
      <div class="acceptBox px-3 py-2">
        <input type="text" v-model="dataAccept.name" disabled class="form-control form-control-sm border mt-2" style="border:none; outline:none;font-weight:bold;" >
        <input type="text" v-model="dataAccept.manifacturer_name" disabled class="form-control form-control-sm border mt-2" style="border:none; outline:none;font-weight:bold;" >
        <div class="d-flex mt-3">
          <div class="skidka " style="width:35%">
            <div style="position:relative;">
              <input type="text" v-model="dataAccept.persantage_discount" disabled class="form-control form-control-sm border mt-2 text-right" style="border:none; outline:none;font-weight:bold;" >
              <small style="position:absolute; top:-16px; left:3px;">
                {{$t('skidka')}}
              </small>
            </div>
            <div style="position:relative;">
              <input type="text" v-model="dataAccept.expired_date" disabled class="form-control form-control-sm border mt-3 text-right" style="border:none; outline:none;font-weight:bold;" >
              <small style="position:absolute; top:-16px; left:3px;">
                {{$t('expired_date')}}
              </small> 
            </div>
          </div>
          <div class="price ml-4 mt-2 border d-flex justify-content-end align-items-end"  style="width:65%; position:relative;">
            <h2 class="font-weight-bold">{{unitPrice}}</h2>
            <small style="position:absolute; top:-16px; left:3px;">
                {{$t('price')}}
              </small> 
          </div>
        </div>
        <div class="reportproduct  mt-3 border d-flex pl-3"  style="position:relative;">
          <h4 class="font-weight-bold p-0 m-0 my-1"><span>{{dataAccept.ostatka_qty}}</span> <span>уп . </span> <span class="ml-2">{{dataAccept.ostatka_unit}}/{{dataAccept.contains_number_in_pack}}</span> <span>шт</span></h4>
            <small style="position:absolute; top:-16px; left:3px;">
              {{$t('reportproduct')}}
            </small> 
        </div>
        <div class="d-flex align-items-center mt-3" style="position:relative;">
          <div class="skidka " style="width:20%">
            <div style="position:relative;">
              <input type="text" v-model="acceptQty" v-on:keyup.39 = "ArrowLeftS"  v-on:keyup.13 = "AddAcceptPage" ref="upokovka" @input="summaDrag" @blur="blurQty" v-on:click.capture="writeNol" class="form-control form-control-md border mt-2 " style="border:none; outline:none;font-weight:bold;" >
              <small style="position:absolute; top:-16px; left:3px;">
                {{$t('up')}}
              </small>
              
            </div>
          </div>
          
          <div class="skidka pl-2" style="width:20%">
            <div style="position:relative;">
              <input v-model="acceptUnit" v-on:keyup.37 = "ArrowRightS" ref="acceptUnit" v-on:keyup.13 = "AddAcceptPage"
               type="text"  @input="summaDrag" @blur="blurUnit" v-on:click.capture="writeNolUnit" class="form-control form-control-md border mt-2 " style="border:none; outline:none;font-weight:bold;" >
              <small style="position:absolute; top:-16px; left:3px;">
                {{$t('sht')}}
              </small>
            </div>
          </div>
          <div class="price ml-4 mt-2 border d-flex justify-content-end align-items-end"   style="width:58%; position:relative;">
            <h2 class="font-weight-bold m-0 my-2">{{UnitSumString}}</h2>
            <small style="position:absolute; top:-16px; left:3px;">
                {{$t('')}}
              </small> 
          </div>
          <small class="text-danger" v-if="enoughtDrag" style="position:absolute; bottom:-25px; left:3px;">
            {{$t('enoughtDrag')}}
          </small>
        </div>
        <div class="btnClick text-right mt-4">
          <mdb-btn color="success" @click="AddAcceptPage" :disabled="enoughtDrag" class="m-0 py-1 mt-1 "> {{$t('ok')}}</mdb-btn>
          <mdb-btn color="danger" @click="closeAcceptPage" class="m-0 py-1 mt-1 ml-2"> {{$t('cancel')}}</mdb-btn>
        </div>
      </div>
    </div>


    
  </div>
  <pay v-show="payshow"  @close="closePay" 
    :summaString="AllSummString[get_page_savat]" 
    :summa="get_all_summa[get_page_savat]" @print="printChek()"/>

    <close-cash v-show="closeCash"  @close="closeKassa" />
    <checkshow v-if="checkshow" @close="checkShow"/>

   <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>

    <Toast ref="message"></Toast>
</div>
    
  
</template>


<script>
import check from '../sale/check'
import checkshow from '../sale/checkshow'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {
  mdbIcon,
  mdbBtn,mdbInput
} from "mdbvue";
import Pay from './pay.vue';
import CloseCash from './closeCash.vue';
export default {
  components: {
    mdbIcon,
    mdbBtn,mdbInput,
    check,checkshow,
    Pay,
    CloseCash
  },
  data() {
    return {
      kassir: localStorage.fio,
      closeCash: false,
      checkshow: false,

      modal_status: false,
      modal_info: '',
      Arrowdown:0,
      hiddenArrow: '',
      hiddenArrow1: '',
      payshow: false,
      unitPrice:'',
      acceptQty: 0,
      acceptUnit: 0,
      number: [1,2,3,4,5,6,7,8,9,0],
      searchBarcodeData: [],
      searchNameData: [],
      dangerSrog: '',
      warningSrog: '',

      enoughtDrag: false,
      UnitSumString: '0',

      


      check_show: false,
      searchDrag: '',
      showAccept: false,
      dataAccept: {

      },
    



     

      timestamp: "",
      totalName: '',
      getSumma: '0',
      zdachi: 0,


      savatActive: 0,
      barcode: '',

    }
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  watch:{
    get_all_summa(){
      var a = this.get_all_summa[this.get_page_savat].toString()
      a = a.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      this.totalName = a;
    }
  },
  mounted() {
    var number = 123456789.23
    var num = new Intl.NumberFormat().format(number)
    console.log(num)
    var mtime = new Date().getMonth();
    var ytime = new Date().getFullYear();
    if(mtime == 0){
      mtime = '01'
    }
    else if(mtime>0 && mtime<10){
      mtime = '0'+ mtime.toString();
    }
    else{
      mtime = mtime.toString();
    }
    this.dangerSrog = ytime.toString() + '-' + mtime;
    console.log(this.dangerSrog)
    console.log(ytime)

    if(this.get_zakaz_product_all_list.length == 0){ 
      this.update_zakaz_product_all_list()
    }
    console.log('this.get_zakaz_product_all_list.length');
    console.log(this.get_zakaz_product_all_list);
    {
      var a = '50000'
      a = a.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      this.totalName = a;
    }
    
    this.$nextTick(function () {
      this.$refs.barcode.focus();
      this.barcode = '';
    })
  },
  computed:{
    ...mapGetters(['allOrderList', 'get_all_summa', 'get_m_categoryIdProduct', 'get_zakaz_product_all_list','get_page_savat', 'get_product_qty','AllSummString']),
  }, 
  methods: {
    ...mapActions([ 'fetchProduct', 'fetchCategoryAllProduct', 'fetchCategoryIdProduct', 'fetchProductSearchByName']),
    ...mapMutations(['sklad_delete_row', 'add_product_order', 'minus_product', 'plus_product', 'del_product', 'clear_order', 'input_change', 'changeSumma', 'update_zakaz_product_all_list', 'select_savat_page', 'add_savat_page', 'del_savat_page']),
      
    getNow: function() {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" +  today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date +' '+ time;
        this.timestamp = dateTime;
    },

    focusBarcode(){
      this.$nextTick(function () {
        this.$refs.barcode.focus();
        this.barcode = '';
      })
    },

    closePay(){
      this.payshow =! this.payshow;
      this.$nextTick(function () {
        this.$refs.barcode.focus();
        this.barcode = '';
      })
    },
    closeKassa(){
      this.closeCash =! this.closeCash
      this.$nextTick(function () {
        this.$refs.barcode.focus();
        this.barcode = '';
      })
    },
    closeChoosenProduct(){
      this.showAccept =! this.showAccept;
      this.$nextTick(function () {
        this.$refs.barcode.focus();
        this.barcode = '';
      })
    },
  


    // <--  Savat qushish start-->
    select_savat(i){
      console.log(i)
      this.savatActive = i
      this.select_savat_page(i)
    },
    add_savat(){
      this.add_savat_page()
      this.savatActive ++;
    },
    del_savat(i){
      this.del_savat_page(i)
    },
    // <--  Savat qushish end-->



    // <--  tekshirish uchun start-->
    onPaste(){
      console.log('hiii ukiii')
    },
    hanlePro(e){
      // console.log(e.data)
      if(e.data == null){
        console.log('barcode')
      }
      else{
        console.log(e.data)
      }
    },
    updateQty(i){
      this.changeSumma(i)
    },
    // <--  tekshirish uchun end-->



    // <--  Topligan productlarni tanlash u-n tepaga pastga start-->
    ArrowDown(){
      if(this.searchBarcodeData.length>0){
        if(this.searchBarcodeData.length != this.Arrowdown){
          this.Arrowdown ++;
          this.$nextTick(function () {
            this.$refs.hiddenArrow.focus();
            this.hiddenArrow = '';
          })
        }
      }
    },
    ArrowUp(){
      if(this.searchBarcodeData.length>0){
        if(this.Arrowdown != 1){
          this.Arrowdown --;
        }
        else{
          this.Arrowdown = 0;
          this.$nextTick(function () {
            this.$refs.barcode.focus();
          })
        }
      }
    },
    ArrowDown1(){
      if(this.searchBarcodeData.length>0){
        if(this.searchBarcodeData.length != this.Arrowdown){
          this.Arrowdown ++;
          this.$nextTick(function () {
            this.$refs.hiddenArrow1.focus();
            this.hiddenArrow1 = '';
          })
        }
      }
    },
    ArrowUp1(){
      if(this.searchBarcodeData.length>0){
        if(this.Arrowdown != 1){
          this.Arrowdown --;
        }
        else{
          this.Arrowdown = 0;
          this.$nextTick(function () {
            this.$refs.searchDrag.focus();
          })
        }
      }
    },
    ArrowRight(){
      this.$nextTick(function () {
        this.$refs.searchDrag.focus();
      })
    },
    ArrowRight1(){
      this.$nextTick(function () {
        this.$refs.barcode.focus();
      })
    },
    EnterArrowItem(){
      if(this.Arrowdown != 0){
        this.clickBarcodeData(this.searchBarcodeData[this.Arrowdown-1])
      }
    },
    // <--  Topligan productlarni tanlash u-n tepaga pastga end-->



    // <--  Checkni chiqarish start-->
    printChek(){
      this.check_show = true;
      this.searchBarcodeData = []
    },
    closedChek(){
      this.check_show=false;
      this.ArrowRight1();
    },
    // <--  Checkni chiqarish end-->


    // <--  Productni izlash start-->
    async searchFunc(){
      if(this.searchDrag != ''){
          try{
            this.barcode = '';
            console.log('hiy')
            this.Arrowdown = 0;

            const response = await fetch(this.$store.state.hostname + "/PosInvoiceItems/getProductListForSaleByItemSearchByName?name=" + this.searchDrag + '&res_count=500');
            const data = await response.json();
            console.log('data')
            console.log(data)
            if(data[0].id){
              // this.barcode = '';
              this.$refs.searchDrag.focus();
              this.searchBarcodeData = data;
            }
            else{
              this.$refs.message.error('not_found');
            }
          }
          catch{
            // this.modal_info = this.$i18n.t("not_found");
            // this.modal_status = true
            this.searchBarcodeData = []
            this.$refs.message.error('not_found')
          
          }
        
        }
    },


    async getbarcode(){
        if(this.barcode != ''){
          try{
            this.searchDrag=""
            console.log('hiy')
            this.Arrowdown = 0;
            const response = await fetch(this.$store.state.hostname + "/PosInvoiceItems/getProductListForSaleByItemSearchByBarcode?barcode=" + this.barcode + '&res_count=500');
            const data = await response.json();
            console.log('data')
            console.log(data)
            if(data[0].id){
              this.addAutoBarcode(data[0])
              this.barcode = '';
              this.$refs.barcode.focus();
              this.searchBarcodeData = data;
            }
            else{
              this.$refs.message.error('not_found')
            }
          }
          catch{
            // this.modal_info = this.$i18n.t("not_found");
            // this.modal_status = true
            this.$refs.message.error('not_found')
          
          }
        } 
      },

      async addAutoBarcode(data){
        console.log('hiy 1 chisi keldi')
        console.log(data)
        let choosenQty = 0;
        let choosenUnit = 0;
        for(let i=0; i<this.get_zakaz_product_all_list[this.get_page_savat].length;i++){
          if(this.get_zakaz_product_all_list[this.get_page_savat][i].invoiceItemId == data.id){
            choosenQty = this.get_zakaz_product_all_list[this.get_page_savat][i].qty;
            choosenUnit = this.get_zakaz_product_all_list[this.get_page_savat][i].qty_in_pack;
          }
        }
        console.log(choosenQty)
        console.log(choosenUnit)
        this.dataAccept.name = data.product.name;
        this.dataAccept.invoice = data.id;
        this.dataAccept.id = data.product.id;
        this.dataAccept.manifacturer_name = data.product.manifacturer_name;
        // this.dataAccept.ostatka_qty = parseInt(parseInt(data.qty_in_pack - chooseUnit)/parseInt(data.product.contains_number_in_pack))-chooseQty;
        // this.dataAccept.ostatka_unit = (parseInt(data.qty_in_pack - chooseUnit) - (parseInt(this.dataAccept.ostatka_qty + chooseQty)*parseInt(data.product.contains_number_in_pack))) ;
        //   console.log(this.dataAccept.ostatka_unit)
        
        // if(parseInt(this.dataAccept.ostatka_unit)<0){
        //   this.dataAccept.ostatka_qty --;
        //   this.dataAccept.ostatka_unit = data.product.contains_number_in_pack + this.dataAccept.ostatka_unit;
        // }
        this.dataAccept.contains_number_in_pack = data.product.contains_number_in_pack;
        if(data.product.contains_number_in_pack == 1){
          this.dataAccept.qty = 1;
          this.dataAccept.unit = 0;
        }else{
          this.dataAccept.qty = 0;
          this.dataAccept.unit = 1;
        }
        this.dataAccept.expired_date = data.expired_date.slice(0,10);
        this.dataAccept.persantage_discount = data.persantage_discount;
        this.dataAccept.saledPrice = data.product.buyed_price;
        // this.dataAccept.saledPrice = data.unit_saled_price;
        this.dataAccept.price = parseFloat(data.product.buyed_price)/parseFloat(data.product.contains_number_in_pack);
        this.unitPrice = new Intl.NumberFormat().format(this.dataAccept.saledPrice)
        await this.add_product_order(this.dataAccept)
      },
    // <--  Productni izlash end-->


    // <--  Productni tanlab sonini yozadigan oyna ochadi start-->
      clickBarcodeData(data){
        console.log('data wqwq')
        console.log(data)
        var chooseQty = 0;
        var chooseUnit = 0;
        console.log(this.get_zakaz_product_all_list[this.get_page_savat])
        for(let i=0; i<this.get_zakaz_product_all_list[this.get_page_savat].length;i++){
          if(this.get_zakaz_product_all_list[this.get_page_savat][i].invoiceItemId == data.id){
            chooseQty = this.get_zakaz_product_all_list[this.get_page_savat][i].qty;
            chooseUnit = this.get_zakaz_product_all_list[this.get_page_savat][i].qty_in_pack;
          }
        }
        
        this.showAccept = true;
        this.$nextTick(function () {
          this.$refs.upokovka.focus();
           this.acceptQty = null;
        })


        
        this.dataAccept.name = data.product.name;
        this.dataAccept.invoice = data.id;
        this.dataAccept.id = data.product.id;
        this.dataAccept.manifacturer_name = data.product.manifacturer_name;
        this.dataAccept.ostatka_qty = parseInt(parseInt(data.qty_in_pack - chooseUnit)/parseInt(data.product.contains_number_in_pack))-chooseQty;
        this.dataAccept.ostatka_unit = (parseInt(data.qty_in_pack - chooseUnit) - (parseInt(this.dataAccept.ostatka_qty + chooseQty)*parseInt(data.product.contains_number_in_pack))) ;
          console.log(this.dataAccept.ostatka_unit)
        
        if(parseInt(this.dataAccept.ostatka_unit)<0){
          this.dataAccept.ostatka_qty --;
          this.dataAccept.ostatka_unit = data.product.contains_number_in_pack + this.dataAccept.ostatka_unit;
        }
        this.dataAccept.contains_number_in_pack = data.product.contains_number_in_pack;
        this.dataAccept.qty = 0;
        this.dataAccept.unit = 0;
        this.dataAccept.expired_date = data.expired_date.slice(0,10);
        this.dataAccept.persantage_discount = data.persantage_discount;
        this.dataAccept.saledPrice = data.product.buyed_price;
        // this.dataAccept.saledPrice = data.unit_saled_price;
        this.dataAccept.price = 0;
        this.unitPrice = new Intl.NumberFormat().format(this.dataAccept.saledPrice)
      },

      // oynani yopish
      closeAcceptPage(){
        this.showAccept = false;
        this.$nextTick(function () {
          this.$refs.barcode.focus();
          this.barcode = '';
          this.Arrowdown = 0;
          this.UnitSumString = '0';
        })

      },
    // <--  Productni tanlab sonini yozadigan oyna ochadi end-->


    // <--  Tanlangan productga son yozishda o'ngga chapga knopka start-->
      ArrowLeftS(){
          this.summaDrag();
        this.$nextTick(function () {
          this.$refs.acceptUnit.focus();
          if(this.acceptUnit == 0){
            this.acceptUnit = '';
          }
          if(this.acceptQty == ''){
            this.acceptQty = 0;
          }
        })
      },
      ArrowRightS(){
        this.summaDrag();
        this.$nextTick(function () {
          this.$refs.upokovka.focus();
          if(this.acceptQty == 0){
            this.acceptQty = '';
          }
          if(this.acceptUnit == ''){
            this.acceptUnit = 0;
          }
        })
      },
    // <--  Tanlangan productga son yozishda o'ngga chapga knopka end-->



    // <--  Tanlangan productni savatga qushadi start-->
      AddAcceptPage(){
        this.blurUnit();
        this.blurQty();
        if(this.enoughtDrag == false){
          if(this.acceptUnit == 0 && this.acceptQty == 0){
            this.showAccept = false;
          }
          else{
            this.showAccept = false;
            this.add_product_order(this.dataAccept)
            this.$nextTick(function () {
              this.$refs.barcode.focus();
              this.barcode = '';
              this.Arrowdown = 0;
            })
          }
          this.acceptUnit = 0;
          this.acceptQty = 0;
          this.UnitSumString = '0';
        
        }
      },
    // <--  Tanlangan productni savatga qushadi end-->


    // <--  Tanlangan productni sonini summasini hisoblaydi start-->
      summaDrag(){
        this.dataAccept.price = ((this.acceptQty * this.dataAccept.saledPrice) + (parseFloat((this.acceptUnit*this.dataAccept.saledPrice)/(this.dataAccept.contains_number_in_pack)))).toFixed(2)
        var newA = parseInt(this.acceptQty)*parseInt(this.dataAccept.contains_number_in_pack) + parseInt(this.acceptUnit)
        var oldA = parseInt(this.dataAccept.ostatka_qty)*parseInt(this.dataAccept.contains_number_in_pack) + parseInt( this.dataAccept.ostatka_unit)
        this.UnitSumString = new Intl.NumberFormat().format(this.dataAccept.price)
         if(newA > oldA){
           this.enoughtDrag = true;
         }
         else{
           this.enoughtDrag = false;
         }
        
        this.dataAccept.qty = this.acceptQty;
        this.dataAccept.unit = this.acceptUnit;
      },
    // <--  Tanlangan productni sonini summasini hisoblaydi end-->
      


    // <--  Tanlangan productni soni bush bulsa yoki 0 ga teng bulsa yozayotganda uchiradi start-->
      writeNol(){
        if(this.acceptQty == 0){
          this.acceptQty = null;
        }
      },
      writeNolUnit(){
        if(this.acceptUnit == 0){
          this.acceptUnit = null;
        }
      },
      blurQty(){
        if(this.acceptQty == null || this.acceptQty == ''){
          this.acceptQty = 0;
          this.dataAccept.qty = this.acceptQty;
        }
      },
      blurUnit(){
        if(this.acceptUnit == null || this.acceptUnit == ''){
          this.acceptUnit = 0;
          this.dataAccept.unit = this.acceptUnit;
        }
        else if(this.acceptUnit>=this.dataAccept.contains_number_in_pack){
          console.log(typeof(this.dataAccept.contains_number_in_pack))
          var temp = 0;
          temp = this.acceptUnit%this.dataAccept.contains_number_in_pack;
          this.acceptQty = parseInt(this.acceptQty) + parseInt(this.acceptUnit/this.dataAccept.contains_number_in_pack)
          this.acceptUnit = temp;
          this.dataAccept.qty = this.acceptQty;
          this.dataAccept.unit = this.acceptUnit;
        }

      },
    // <--  Tanlangan productni soni bush bulsa yoki 0 ga teng bulsa yozayotganda uchiradi end-->



    // <-- To'lov turlarini tanlash  start-->
      async cashPay(){
        this.payshow = true;
        this.$root.$refs.payed.changingEnter(1);
      },
      async uzcardPay(){
        this.payshow = true;
        this.$root.$refs.payed.changingEnter(2);
      },
      async humoPay(){
        this.payshow = true;
        this.$root.$refs.payed.changingEnter(3);
      },
      async clickPay(){
        this.payshow = true;
        this.$root.$refs.payed.changingEnter(4);
      },
      async onlinePay(){
        this.payshow = true;
        this.$root.$refs.payed.changingEnter(5);
      },
      funcCloseCash(){
        this.closeCash = true;
        this.$root.$refs.closeCashs.getAllSumm();
      },
    // <-- To'lov turlarini tanlash  end-->


    // <-- Pul qaytarish Return mone  start-->
      returnMoney(){
        console.log('return it is')
      },
    // <-- Pul qaytarish Return mone  end-->


    checkShow(){
      this.checkshow = !this.checkshow;
      this.$nextTick(function () {
        this.$refs.barcode.focus();
        this.barcode = '';
      })
    },
    clearSavat(){
      // this.loading = true;
      this.clear_order();
    },
    deleteProduct(data, i){
      this.del_product({data:data, index:i})
    },
      




    // <-- Programmadan chiqish  start-->
      logout(){
        this.$router.push('/')
      }
    // <-- Programmadan chiqish  start-->

  },
    
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 5px;

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

  .allPage{
    width: 100%;
    display: flex;
    height: 95vh;
    .tablePageLeft{
      width: 100%;
      
      .tableAndBtn{
        width:100%;
        display:flex;
        
        // overflow: hidden;
        
        .myTablesforSale{
          width: 100%;
            height: 40vh;
            overflow-y:scroll;
          .tableProducts{
            
            padding-bottom:40px;
             .myTablesforSale { 
                
                /* border-collapse: collapse; */
                table-layout:fixed;
                width: 100%;
                overflow: hidden;
                // border: 1px solid #ddd;
                font-size: 18px;
                max-height:80px; overflow-x:auto
              }
              .myTablesforSale thead{
                background:#0e0d0d; 
              }
              .myTablesforSale th{
                font-weight: 600;
                color:#5a5858; 
                font-size:12px;
              }
              .myTablesforSale td{
                font-size:13px;
              }
              .myTablesforSale th, .myTablesforSale td {
                text-align: left;
                padding: 8px;
              }

              .myTablesforSale tr {
                border-bottom: 1px solid rgb(240, 240, 240);
              }

              .myTablesforSale tr.header, .myTablesforSale tr:hover {
                // background-color: #f1f1f1;
              }
            .delIcon{
              color: rgb(251, 70, 70);
              font-size: 13px;
            }
          }
          
        }

        .myBtn{
          width: 600px;

          .numClick:hover{
            cursor: pointer;
            background: rgb(243, 243, 243);
            // h2{
            //   pointer-events: none;
            // }
          }
        }
      }
      .SearchNameBarcode{

        .FoundProductTable{
          height: 48vh;
          overflow-y: scroll;

          .tableProducts{
            
            .myTablesforSale { 
              
              /* border-collapse: collapse; */
              table-layout:fixed;
              width: 100%;
              overflow: hidden;
              // border: 1px solid #ddd;
              font-size: 18px;
              max-height:80px; overflow-x:auto
            }
            .myTablesforSale th{
              font-weight: 600;
              color:#5a5858; 
              font-size:12px;
            }
            .myTablesforSale td{
              font-size:13px;
            }
            .myTablesforSale th, .myTablesforSale td {
              text-align: left;
              padding: 8px;
            }

            .myTablesforSale tr {
              border-bottom: 1px solid rgb(240, 240, 240);
            }

            .myTablesforSale tr.header, .myTablesforSale tr:hover {
              // background-color: #f1f1f1;
            }
            .myTablesforSale thead{
                background:#c5eeea; 
              }
            .delIcon{
              color: rgb(251, 70, 70);
              font-size: 13px;
            }
          }
        }
      }
    }
    .SummaBtnRight{
      width: 500px;

      .borderSolder{
        border: 0.5px dashed #D0D3D8;

        span{
          color:#67676C;
          font-size: 22px;
        }
        p{
          color:#525255;
          font-weight:bold;
          font-size: 24px;
          margin:0;
          padding:0;
        }
      }
      .borderSolderOplate{
        border: 0.5px dashed #D0D3D8;

        span{
          color:#67676C;
          font-size: 22px;
        }
        p{
          color:#525255;
          font-weight:bold;
          font-size: 28px;
          margin:0;
          padding:0;
        }
      }
    }
  }
  .aptekaSale{
    .oplate{
      min-height:180px;
      .allSumma{
        width: 100%;
        .asosiyTotal{
          max-width: 700px;
          min-width: 690px;
        }
        .barcodeMenu{
          width: 100%;
        }
        .Summa{
          height: 90px;
        }

        .getSumFromClient{
          .zdachi{
              color:#f64a4a;
              font-weight:bold;
              font-size: 25px;
          }
        }
      }

      .payBtn{
        width: 250px;
      }
    }
    
  }
  .tableProduct{
    // overflow-y: scroll;
    overflow-y: hidden;
    max-height: 79vh;
    .myTablesforSale { 
      
      /* border-collapse: collapse; */
      table-layout:fixed;
      width: 100%;
      overflow: hidden;
      // border: 1px solid #ddd;
      font-size: 18px;
      max-height:80px; overflow-x:auto
    }
    .myTablesforSale th{
      font-weight: 600;
      color:#5a5858; 
      font-size:12px;
    }
    .myTablesforSale td{
      font-size:13px;
    }
    .myTablesforSale th, .myTablesforSale td {
      text-align: left;
      padding: 8px;
    }

    .myTablesforSale tr {
      border-bottom: 1px solid rgb(240, 240, 240);
    }

    .myTablesforSale tr.header, .myTablesforSale tr:hover {
      // background-color: #f1f1f1;
    }
    .myTablesforSale thead{
      background:#c5eeea; 
    }
    .delIcon{
      color: rgb(251, 70, 70);
      font-size: 13px;
    }
  }
  .searchBarcodeHover:hover{
    background: seagreen;
    color:seashell;
    cursor: pointer;
  }
  

  .addProductQtyAccept{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top:0;
    left:0;
    width: 100%;
    height: 100vh;
    background: rgba(113, 114, 116, 0.6);
    z-index: 1111;
  }
  .acceptBox{
    width:500px;
    height: 380px;
    background: snow;
    box-shadow: 3px 2px 5px rgb(129, 129, 129);
    border-radius: 5px;
  }
  .bg_dark{
    background: #202020;
  }
  .bg_danger{
    background: #fb6b6b;
  }
  .bg_warning{
    background: rgb(255, 230, 91);
  }
  .bg_success{
    background: #5fff42;
  }

  .back_dang{
    background: #fb6b6b;
  }
  .back_warning{
    background: #fdcb7a;
  }
  .backlight{
    background: rgb(255, 252, 249);
  }
  .arrow_back_active{
    background: seagreen;
    color:seashell;
  }
  .inputFocusSearch:focus{
    border-bottom: 2px solid rgb(66, 110, 255);
    // background: #f64a4a;
  }
  .inputFocusSearch:focus + .control-label{
    color: rgb(66, 110, 255);
  }
  .inputFocusSearch{
    border: 1px solid rgb(255, 255, 255);
    border-bottom: 1px solid rgb(197, 197, 197);
    // background: #f64a4a;
  }
  .userLog{
    .logout{
      visibility: hidden;
    }
  }
  .userLog:hover{
    .logout{
      visibility: visible;
      background: rgb(255, 255, 255);
    }
    .logout:hover{
      background: rgb(218, 218, 218);
    }

  }

  .linkMain{
    border-bottom: 1px solid rgb(74, 87, 95);
    border-top: 1px solid rgb(74, 87, 95);
    color:rgb(64, 66, 64);
    cursor:pointer;
    font-size: 13.5px;
  }
  .linkMain:hover{
    background: #ffb300;
    color:white;
  }
  .linkMainDang{
    border-bottom: 1px solid rgb(74, 87, 95);
    border-top: 1px solid rgb(74, 87, 95);
    color:rgb(64, 66, 64);
    cursor:pointer;
    font-size: 13.5px;
  }
  .linkMainDang:hover{
    background: #ff5852;
    color:white;
  }
</style>