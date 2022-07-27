<template>
<div>
  <check v-if="check_show" @close="check_show=false" />
  <div v-else class="aptekaSale">
    <div class="saleHeader border-bottom d-flex justify-content-between align-items-center">
      <router-link to="/saleApteka">
          <h5 class="m-0 ml-3 d-flex align-items-center" style="padding: 7px 0px; font-size: 15.5px;">
            <mdb-icon icon="shopping-basket" style="font-size: 15px;"  class="mr-2 "/>
            {{$t('sale')}}</h5>
      </router-link>
      <div class="d-flex">
        <h5 class="m-0 px-3 d-flex align-items-center text-warning" style="padding: 7px 0px; font-size: 12px; font-weight: bold;">
          Hamdamov Javohir
        </h5>
        <div style="width:145px;" class="d-flex align-items-center justify-content-center border-left">
          <h5 class="m-0   " style="padding: 7px 0px; font-size: 12px; font-weight: bold;">
            {{timestamp}}
          </h5>
        </div>
        
      </div>
    </div>
    <div class="oplate border-bottom d-flex justify-content-between px-2">
      <div class="allSumma">
        <div class="d-flex">
          <div class="asosiyTotal">
            <div class="Summa mt-1 d-flex">
              <div class="qty borderSolder py-2">
                <span class="ml-3">{{$t('soni')}}</span>
                <div class="text-right px-3 mt-1">
                  <p>{{get_product_qty[get_page_savat]}}</p>
                </div>
              </div>
              <div class="qty borderSolder py-2">
                <span class="ml-3">{{$t('discount')}}</span>
                <div class="text-right px-3 mt-1">
                  <p>0</p>
                </div>
              </div>
              <div class="qty borderSolder py-2">
                <span class="ml-3">{{$t('Total')}}</span>
                <div class="text-right px-3 mt-1">
                  <p>{{get_all_summa[get_page_savat]}}</p>
                </div>
              </div>

            </div>
            <div class="getSumFromClient  d-flex justify-content-between px-2 py-1 mt-1">
              <div>
                <span style="font-size: 13px; " class="ml-1">{{$t('getSumFromClient')}}</span>
                <div>
                  <input type="text" v-model="getSumma" ref="getSumma" class="py-1 px-2 border rounded" @keypress="PressInput($event)" @input="ChangeZdach"
                    style="height:50px; width:380px; font-size: 25px; color:#494949; outline:none; border:none; font-weight:bold;">
                </div>
              </div>
              <div class="d-flex align-items-end py-2">
                <p class="m-0 p-0 zdachi">{{zdachi}}</p>
              </div>
            </div>
          </div>
          <div class="barcodeMenu ">
            <div style="position:relative; " class="ml-3 mr-4">
                <mdb-input v-model="barcode" @keyup.enter.native="getbarcode()" ref="barcode" size="sm" type="text"  icon="barcode" style="margin-top: 10px; margin-bottom: 0px; height: 32px;" :label="$t('barcode')" />
              
                <div class="searchTable  bg-white shadow p-3 card" style="position:absolute; top:40px; right:0; width:700px; z-index:100;" 
                  v-if="searchBarcodeData.length>0">
                  <div class="tableProduct">
                    <table  class="myTable">
                      <thead>
                        <tr  class="header">
                        <th style="width: 40px;">№</th>
                        <th style="width: 200px;">{{$t('product')}}</th>
                        <th>{{$t('soni')}}</th>
                        <th>{{$t('price')}}</th>
                        <th >{{$t('expired_date')}}</th>
                        <th >{{$t('skidka')}}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item,i) in searchBarcodeData" :key="i" class="searchBarcodeHover" @click="clickBarcodeData(item)" :class="{'back_dang text-white' : dangerSrog == item.expired_date.slice(0,7)}">
                          <td>{{i+1}}</td>
                          <td>{{item.product.name}}</td>
                          <td>{{item.real_qty}}</td>
                          <td>{{item.product.price}}</td>
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
        

        
      </div>

      <div class="payBtn">
        <mdb-btn color="success" @click="cashPay"  class="m-0 py-3 mt-1 w-100"><mdb-icon icon="money-bill-alt" class="mr-2 "/>{{$t('cash')}}</mdb-btn>
        <mdb-btn color="info"  class="m-0 py-3 mt-1 w-100"><mdb-icon icon="credit-card" class="mr-2 "/> {{$t('card')}}</mdb-btn>
        <mdb-btn color="warning"  class="m-0 py-3 mt-1 w-100"><mdb-icon icon="id-card" class="mr-2 "/> {{$t('device_pay')}}</mdb-btn>
      </div>
    </div>

    <div class="tableAndBtn" >
      <div class="myTables border py-2 px-2">
        <div class="tableProduct">
          <table  class="myTable">
            <thead>
              <tr  class="header ">
              <th style="width: 40px;">№</th>
              <th>{{$t('product')}}</th>
              <th>{{$t('soni')}}</th>
              <th>{{$t('unit_qty')}}</th>
              <th>{{$t('price')}}</th>
              <th class=" pl-3">{{$t('total')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in get_zakaz_product_all_list[get_page_savat]" :key="i">
                <td>{{i+1}}</td>
                <td>{{item.name}}</td>
                <td><input type="number" v-model="item.qty" @input="updateQty(i)" class="form-control form-control-sm" style="border:none; outline:none;font-weight:bold;" ></td>
                <td><input type="number" v-model="item.qty_in_pack" @input="updateQty(i)"  class="form-control form-control-sm" style="border:none; outline:none; font-weight:bold;" > </td>
                <td>{{item.real_sum}}</td>
                <td class=" pl-3">{{item.summ}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="position: sticky; bottom:0; left:0" class="w-100 ">
          <div  class="d-flex flex-wrap align-items-center border-top px-1" >
            <div v-for="(page,i) in get_zakaz_product_all_list" :key="i" :class="{'bg-warning': savatActive == i,'text-white': savatActive == i, 'bg-white': savatActive != i}"
                class=" m-1 p-1 border" @click="select_savat(i)" style="width:100px; position:relative; cursor:pointer">
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


      <div class="myBtn  border-left">
        <div class="bg-light py-4">
          <div class="row  mx-1">
            <div v-for="item in number" :key="item" class="col-4 ">
              <div @click="addBtnCount(item)" class="card numClick mt-2 py-4 d-flex align-items-center justify-content-center"><h2 class="">{{item}}</h2></div>
            </div>
            <div class="col-4 mt-2">
              <div class="card numClick py-4 d-flex align-items-center justify-content-center" @click="addBtnPoint('.')"><h2 class="">.</h2></div>
            </div>
            <div class="col-4 mt-2">
              <div class="card numClick py-4 d-flex align-items-center justify-content-center"><h2 class="">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-backspace" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" />
                  <path d="M12 10l4 4m0 -4l-4 4" />
                </svg>
                </h2></div>
              </div>
            </div>
          </div>
          <div style="margin-top:75px;">
            <mdb-btn color="info"  class="m-0 py-3 mt-1 w-50 dangerHover"><mdb-icon icon="retweet" class="mr-2 "/>Возврать</mdb-btn>
            <!-- <mdb-btn color="success"  class="m-0 py-3 mt-1 w-50"><mdb-icon icon="credit-card" class="mr-2 "/> {{$t('card')}}</mdb-btn>
            <mdb-btn   class="m-0 py-3 mt-1 w-50"><mdb-icon icon="id-card" class="mr-2 "/> {{$t('device_pay')}}</mdb-btn> -->
            <mdb-btn color="danger"  class="m-0 py-3 mt-1 w-50"><mdb-icon icon="ban" class="mr-2 "/> {{$t('cancel')}}</mdb-btn>
          </div>
          
        
      </div>
    </div>

    


    <div class="addProductQtyAccept" v-show="showAccept" >
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
            <h2 class="font-weight-bold">{{dataAccept.saledPrice}}</h2>
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
        <div class="d-flex align-items-center mt-3">
          <div class="skidka " style="width:20%">
            <div style="position:relative;">
              <input type="text" v-model="dataAccept.qty" @input="summaDrag" @blur="blurQty" @click="writeNol" class="form-control form-control-md border mt-2 " style="border:none; outline:none;font-weight:bold;" >
              <small style="position:absolute; top:-16px; left:3px;">
                {{$t('up')}}
              </small>
            </div>
          </div>
          <div class="skidka pl-2" style="width:20%">
            <div style="position:relative;">
              <input v-model="dataAccept.unit" type="text"  @input="summaDrag" @blur="blurUnit" @click="writeNolUnit" class="form-control form-control-md border mt-2 " style="border:none; outline:none;font-weight:bold;" >
              <small style="position:absolute; top:-16px; left:3px;">
                {{$t('sht')}}
              </small>
            </div>
          </div>
          <div class="price ml-4 mt-2 border d-flex justify-content-end align-items-end"  style="width:58%; position:relative;">
            <h2 class="font-weight-bold m-0 my-2">{{dataAccept.price}}</h2>
            <small style="position:absolute; top:-16px; left:3px;">
                {{$t('')}}
              </small> 
          </div>
        </div>
        <div class="btnClick text-right mt-4">
          <mdb-btn color="success" @click="AddAcceptPage" class="m-0 py-1 mt-1 "> {{$t('ok')}}</mdb-btn>
          <mdb-btn color="danger" @click="closeAcceptPage" class="m-0 py-1 mt-1 ml-2"> {{$t('cancel')}}</mdb-btn>
        </div>
      </div>
    </div>
  </div>
</div>
    
  
</template>


<script>
import check from '../sale/check'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {
  mdbIcon,
  mdbBtn,mdbInput
} from "mdbvue";
export default {
  components: {
    mdbIcon,
    mdbBtn,mdbInput,
    check
  },
  data() {
    return {
      number: [1,2,3,4,5,6,7,8,9,0],
      searchBarcodeData: [],
      searchNameData: [],
      dangerSrog: '',
      warningSrog: '',


      check_show: false,

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
    setInterval(function() {
        this.timer = new Date();
    }, 1000);
  },
  computed: mapGetters(['allOrderList', 'get_all_summa', 'get_m_categoryIdProduct', 'get_zakaz_product_all_list','get_page_savat', 'get_product_qty']),
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

    PressInput(){
      if(this.getSumma == 0){
        this.getSumma = '';
      }
    },
    ChangeZdach(){
      this.zdachi = parseFloat(this.get_all_summa[this.get_page_savat]) - parseFloat(this.getSumma)
    },
    addBtnCount(item){
      if(this.getSumma == 0){
        this.getSumma = '';
      }
      this.getSumma += item;
    },

    addBtnPoint(item){
      this.getSumma += item;
    },



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



    changeAll(){
      console.log(ishlarkan)
    },


    async getbarcode(){
        if(this.barcode != ''){
          try{
            console.log('hiy')

            const response = await fetch(this.$store.state.hostname + "/PosInvoiceItems/getProductListForSaleByItemSearchByBarcode?barcode=" + this.barcode + '&res_count=500');
            const data = await response.json();
            console.log('data')
            console.log(data)
            if(data[0].id){
              this.barcode = '';
              this.$refs.barcode.focus();
              this.searchBarcodeData = data;
              // this.add_product_order(data);

                // this.$nextTick(function () {
                //   this.$refs.barcode.focus();
                //   this.barcode = '';
                // })

            }
          }
          catch{
            // this.modal_info = this.$i18n.t("not_found");
            // this.modal_status = true
            this.$refs.message.error('not_found')
          
          }
        
        }
        else{
          this.searchBarcodeData= []
        }
        
        
      },
      clickBarcodeData(data){
        console.log(data)
        this.showAccept = true;
        
        this.dataAccept.name = data.product.name;
        this.dataAccept.invoice = data.id;
        this.dataAccept.id = data.product.id;
        this.dataAccept.manifacturer_name = data.product.manifacturer_name;
        this.dataAccept.ostatka_qty = parseInt(data.real_qty);
        this.dataAccept.ostatka_unit = parseInt(data.qty_in_pack) - (parseInt(data.real_qty)*parseInt(data.product.contains_number_in_pack));
        this.dataAccept.contains_number_in_pack = data.product.contains_number_in_pack;
        this.dataAccept.qty = 0;
        this.dataAccept.unit = 0;
        this.dataAccept.expired_date = data.expired_date.slice(0,10);
        this.dataAccept.persantage_discount = data.persantage_discount;
        this.dataAccept.saledPrice = data.unit_saled_price;
        this.dataAccept.price = 0;
      },
      closeAcceptPage(){
        this.showAccept = false;
      },
      AddAcceptPage(){
        console.log('hiy boy')
        this.showAccept = false;
        this.add_product_order(this.dataAccept)
      },
      summaDrag(){
        this.dataAccept.price = ((this.dataAccept.qty * this.dataAccept.saledPrice) + (parseFloat((this.dataAccept.unit*this.dataAccept.saledPrice)/(this.dataAccept.contains_number_in_pack)))).toFixed(2)
        console.log(this.dataAccept.qty)
        console.log(this.dataAccept.unit)
      },
      updateQty(i){
        this.changeSumma(i)
      },
      writeNol(){
        if(this.dataAccept.qty == 0){
          this.dataAccept.qty = null;
        }
      },
      writeNolUnit(){
        if(this.dataAccept.unit == 0){
          this.dataAccept.unit = null;
        }
      },
      blurQty(){
        if(this.dataAccept.qty == ''){
          this.dataAccept.qty = 0;
        }
        else if(this.dataAccept.qty == null){
          this.dataAccept.qty = 0;
        }
      },
      blurUnit(){
        if(this.dataAccept.unit == ''){
          this.dataAccept.unit = 0;
        }
        else if(this.dataAccept.unit == null){
          this.dataAccept.unit = 0;
        }
      },
      async cashPay(){
          var orderList = this.allOrderList.map(item => {
              return {
                // id: item.product_id,
                product_id: item.product_id,
                qty: parseInt(item.qty) + parseFloat(item.qty_in_pack)/parseFloat(item.contains_number_in_pack),
                qty_in_pack: (parseFloat(item.qty)*parseFloat(item.contains_number_in_pack)) + parseInt(item.qty_in_pack),
                real_company_id: item.real_company_id,
                real_sum: item.real_sum,
                summ: item.summ,
                unit_price: item.unit_price,
                posInvoiceItemid: item.invoiceItemId
              }
          });
          console.log('orderList')
          console.log(typeof(orderList[0].qty))
          const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "posAuthorizationid": localStorage.AuthId,
              "summ" : this.get_all_summa[this.get_page_savat],
              "real_company_id": localStorage.CompId,
              "card_sum": parseFloat( this.get_all_summa[this.get_page_savat]),
              "cash_sum": 0,
              "paymentsList": orderList,
              "discount_summ": 0,
            })
          };
          console.log(requestOptions.body)
          // try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/PosChecks", requestOptions);
            const data = await response.json();
            console.log(data)
            this.loading = false;
            if(response.status == 201 || response.status == 200)
            {
              this.check_show = true;
              this.$emit('close')
              this.$emit('submitSuccess')
              return true;
            }
            else{
              this.modal_info = data;
              this.modal_status = true;
              return false;
            }
          // }
          // catch{
          //   this.loading = false;
          //   this.modal_info = this.$i18n.t('network_ne_connect'); 
          //   this.modal_status = true;
          // }
      }
  },
    
}
</script>

<style lang="scss">
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

          .borderSolder{
            border: 0.5px dashed #D0D3D8;
            width:230px;

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
    .tableAndBtn{
      width:100%;
      min-height: 73vh;
      display:flex;
      
      .myTables{
       
        width: 100%;

        .tableProduct{
          min-height: 64vh;
          max-height: 65vh;
          .myTable { 
            
            /* border-collapse: collapse; */
            table-layout:fixed;
            width: 100%;
            overflow: hidden;
            // border: 1px solid #ddd;
            font-size: 18px;
            max-height:80px; overflow-x:auto
          }
          .myTable th{
            font-weight: 600;
            color:#5a5858;
            font-size:12px;
          }
          .myTable td{
            font-size:13px;
          }
          .myTable th, .myTable td {
            text-align: left;
            padding: 8px;
          }

          .myTable tr {
            border-bottom: 1px solid rgb(240, 240, 240);
          }

          .myTable tr.header, .myTable tr:hover {
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
  }
  .tableProduct{
    // overflow-y: scroll;
    overflow-y: hidden;
    max-height: 79vh;
    .myTable { 
      
      /* border-collapse: collapse; */
      table-layout:fixed;
      width: 100%;
      overflow: hidden;
      // border: 1px solid #ddd;
      font-size: 18px;
      max-height:80px; overflow-x:auto
    }
    .myTable th{
      font-weight: 600;
      color:#5a5858;
      font-size:12px;
    }
    .myTable td{
      font-size:13px;
    }
    .myTable th, .myTable td {
      text-align: left;
      padding: 8px;
    }

    .myTable tr {
      border-bottom: 1px solid rgb(240, 240, 240);
    }

    .myTable tr.header, .myTable tr:hover {
      // background-color: #f1f1f1;
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
  .back_dang{
    background: #fb6b6b;
  }
  .back_warning{
    background: #fdcb7a;
  }
</style>