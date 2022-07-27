<template>
  <div class="">
    <loader v-if="loading"/>
    <div class="border-bottom ">
      <router-link to="/debitor">
         <h5 class="m-0 ml-3 d-flex" style="padding: 16px 0px">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('new_debitor')}}</h5>
      </router-link>
     
    </div>
    <!--Navbar-->
    <!-- <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <router-link to="/movement">
        <a class="ml-2 mr-2 p-3"  :action="true"><mdb-icon icon="angle-left" size="2x"/></a>
      </router-link>
      <mdb-card-title class="font-weight-bold pt-2" :action="true"
        >{{$t('Movements_in_warehouses')}}</mdb-card-title>
    </mdb-navbar> -->
    <!--/.Navbar-->
    <main style="border: 0.1px solid white; border-radius: 7px;" class="grey lighten-5">
      <form >
        <div class="container-fluid ">
          <div :class="{'applied': sklad_submitted}" class="container-fluid mt-3  bgColorBack p-4" style=" border-radius: 7px;">

            <mdb-row >
              <mdb-col col="3" style="position: relative;">
                <erpSelect
                  :options="allCompany.rows" :btnshow="false"
                  @select="select_comp"
                  :selected="company_name"
                  :label="$t('company')"
                />
                <small v-if="$v.company_name.$dirty && company_id == null" class="invalid-text mt-0 ml-2" >
                      {{$t('select_item')}}
                  </small>
                  <small class="" style="color: gray; position:absolute; top:-19px; left:20px; font-size: 12px;" >
                    {{$t('company')}}
                  </small>
              </mdb-col>
              <mdb-col col="3" style="position: relative;">
                <erpSelect
                  :options="allDepartment.rows" :btnshow="false"
                  @select="select_dept"
                  :selected="dept_name"
                />
                <small v-if="$v.dept_name.$dirty && dept_id == null" class="invalid-text mt-0 ml-2" >
                      {{$t('select_item')}}
                  </small>
                  <small class="" style="color: gray; position:absolute; top:-19px; left:20px; font-size: 12px;" >
                    {{$t('department')}}
                  </small>
              </mdb-col>
              <mdb-col col="3" style="position: relative;">
                <erpSelect
                  :options="allSklad.rows" :btnshow="false"
                  @select="select_sklad"
                  :selected="sklad_name"
                  :label="$t('company')"
                />
                <small v-if="$v.sklad_name.$dirty && sklad_id == null" class="invalid-text mt-0 ml-2" >
                      {{$t('select_item')}}
                  </small>
                  <small class="" style="color: gray; position:absolute; top:-19px; left:20px; font-size: 12px;" >
                    {{$t('sklad')}}
                  </small>
              </mdb-col>
              
              <mdb-col col="3" >
                <date-picker class="timepiker" style="margin-top: 0;" v-model="time1" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>

              </mdb-col>
              
            </mdb-row>

            

          

            <!-- <mdb-row v-if="showfor_print">
                <mdb-col col="4">
                  <erpSelect
                    :options="CurrencyList" :btnshow="false"
                    @select="selectvaluta"
                    :selected="valuta.selected"
                    :label="$t('menu_currency')"
                  />
                </mdb-col>
                <mdb-col col="2">
                  <mdb-input v-model="kurs_valut" size="sm" :label="$t('kurs_valyut')" icon="dollar-sign" type="number" />
                  <small class="invalid-text"  v-if="$v.kurs_valut.$dirty && !$v.kurs_valut.required" >
                    {{$t('invalid_Currency')}}
                  </small>
                </mdb-col>
            </mdb-row> -->

            <mdb-row class="mt-2">
              <mdb-col col="3" >
                <mdb-input v-model="note" size="sm" type="textarea" style="margin-top: 8px; margin-bottom: 0px; height: 32px;" :label="$t('Descriptions')" icon="pencil-alt" />
              </mdb-col>

              
              <small v-if="$v.time1.$dirty && !$v.time1.required" style="padding:90px 0 0 15px" class="invalid-text" >
                    {{$t('invalid_time')}}
                </small>

                <mdb-col col="3" >
                <mdb-input v-model="facture_number" size="sm" type="text" style="margin-top: 18px; margin-bottom: 0px; height: 32px;" :label="$t('factura_number')" />
              </mdb-col>

              <mdb-col col="2" >
               <div class="ml-4" style="position:relative; margin-top: 3px;">
                      <input v-model="creditd_summ"  size="sm" type="number" 
                        style="margin-top: 18px; margin-bottom: 0px; height: 32px;  width:300px; color:red; outline:none; border:none; font-size:12px;"
                        class="border-bottom" :label="$t('creditd_summ')" />
                        <small style="position:absolute; top:7px; left:0; color:#757575;">
                          {{$t('creditd_summ')}}
                        </small>
                      <!-- <mdb-btn  class="mr-2  mt-4 py-1 px-2"  color="success" size="sm" @click="addRow">{{$t('add')}}</mdb-btn> -->
                  </div>
              </mdb-col>

            </mdb-row>
          </div>

            <hr class="mt-4 "/>
            <div class="">
                <mdb-row >
                <mdb-col col="3" >
                   <div class="d-inline">
                      <mdb-btn class="mr-1" style="font-size:12px" outline="orange" darkWaves tag="a" floating @click="addRow"
                        icon="plus"  size="sm">{{$t('add_product')}}</mdb-btn>

                      <mdb-btn-group style="margin-top:-14px; ">
                      <mdb-dropdown>
                        <mdb-btn  style="font-size:12px" outline="primary" darkWaves tag="a" floating
                        icon="bars"  size="sm" slot="toggle"></mdb-btn>
                        <mdb-dropdown-menu>
                          <mdb-dropdown-item style="font-size:12px" @click="set_filling" >{{$t('set_filling')}}</mdb-dropdown-item>
                          <!-- <mdb-dropdown-item style="font-size:12px"  >{{'Export_to_PDF'|locolize}}</mdb-dropdown-item> -->
                        </mdb-dropdown-menu>
                      </mdb-dropdown>
                  </mdb-btn-group>
                   </div>
                    
                </mdb-col>
                <mdb-col col="3" class="m-0 p-0" style="position:relative; ">
                  <mdb-input v-model="barcode" ref="barcode" @keyup.enter.native="getbarcode()" size="sm" type="text"  icon="barcode" style="margin-top: 2px; margin-bottom: 2px; height: 25px;" :label="$t('barcode')" />

                  <div class="searchTable  bg-white shadow p-3 card" style="position:absolute; top:40px; left:10px; width:900px; z-index:100;" 
                    v-if="searchBarcodeData.length>0">
                    <div class="tableProductsw">
                      <table  class="myTablereturnS">
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
                          <tr v-for="(item,i) in searchBarcodeData" :key="i" class="searchBarcodeHover"
                            :class="[{'bg_dark text-white': item.exp_days_count<=0},{'bg_danger text-white': item.exp_days_count > 0 && item.exp_days_count < 30},{'bg_warning text-dark':  item.exp_days_count > 30 && item.exp_days_count < 60},{'bg_success text-white': item.exp_days_count > 60 && item.exp_days_count < 90}]"
                            @click="clickBarcodeData(item)" >
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
                </mdb-col>
                <mdb-col col="3">
                  <mdb-input v-model="searchDrag" ref="searchDrag" @keyup.enter.native="searchFunc()" size="sm" type="text"  icon="receipt" style="margin-top: 2px; margin-bottom: 2px; height: 25px;" :label="$t('name')" />
                </mdb-col>
                <mdb-col col="1" >
                </mdb-col>

                <mdb-col col="2" class="text-right">
                  <mdb-btn class="mr-1 px-3 py-2 text-white" style="font-size:12px" color="success" darkWaves tag="a" floating @click="submit"
                  icon="check"  size="sm">{{$t('save')}}</mdb-btn>
                 
                </mdb-col>
                  
                </mdb-row>
              
                
                <div >
                <div class="d_table " >

                <mdb-tbl class="fixed-column" >
                  <mdb-tbl-head>
                    <tr>
                      <td></td>
                      <!-- product -->
                      <td style="min-width:320px; font-size: 13px;"> {{$t(datasource.columns[0])}} </td>
                      <td style="width: 110px; min-width: 110px; font-size: 13px;"> {{$t(datasource.columns[1])}} </td>
                      <td v-show="false" style="width:110px; min-width: 110px;   font-size: 13px;"> {{$t(datasource.columns[2])}} </td>
                      <td style="width:100px; font-size: 13px;"> {{$t(datasource.columns[3])}} </td>
                       <td  style="min-width:120px; font-size: 13px;"> {{$t(datasource.columns[4])}} </td>
                      <td v-show="false" style="min-width:100px; font-size: 13px;"> {{$t(datasource.columns[5])}} </td>
                      <td style="min-width:30px; font-size: 13px;"> {{$t(datasource.columns[6])}} </td>
                      <td v-show="false" style="min-width:100px; font-size: 13px;"> {{$t(datasource.columns[7])}} </td>
                      <td v-show="false" style="min-width:100px; font-size: 13px;"> {{$t(datasource.columns[8])}} </td>
                      <td style="min-width:100px; font-size: 13px;"> {{$t(datasource.columns[9])}} </td>
                      <td v-show="false" style="min-width:100px; font-size: 13px;"> {{$t(datasource.columns[10])}} </td>
                      <td style="min-width:100px; font-size: 13px;"> {{$t(datasource.columns[11])}} </td>
                      <!-- ed_izm -->
                    </tr>
                  </mdb-tbl-head>
                  <mdb-tbl-body>
                    <tr  scope="row" v-for="(row,rowIndex) in datasource.rows" :key="rowIndex" :width="row.size">
                      <th><i class="fas fa-trash delIcon mask waves-effect m-0 pl-2"
                      @click="datasource.rows.splice( parseInt(rowIndex), 1)"></i></th>
                      <th>
                        <lineSelect
                            :options="allProduct.rows" :row_index="rowIndex"
                            :searchshow="true"
                            @select="selectproduct"
                            :selected="row.product_name"
                            @addTag="add_product"
                            :label="$t('product')"
                        />
                        <small class="invalid-text" style="margin:0; margin-top:26px;  position:relative; "
                        v-if="($v.datasource.rows.$each[rowIndex].product_name.$dirty  && !$v.datasource.rows.$each[rowIndex].product_name.required)" >
                          {{$t('Select_product')}}
                        </small>
                      </th>

                      <th>
                        <input v-model="row.soni" type="number" min="0"  step=".1"  @input="onChangeCount(row.soni,rowIndex)"
                        onkeypress="return event.charCode >= 48" class="form-control form-control-sm">
                        <small class="invalid-text" style="margin:0; margin-top:26px; position:relative; "
                        v-if="($v.datasource.rows.$each[rowIndex].soni.$dirty && !$v.datasource.rows.$each[rowIndex].soni.minValue) ||
                        ($v.datasource.rows.$each[rowIndex].soni.$dirty && !$v.datasource.rows.$each[rowIndex].soni.required)" >
                          {{$t('minValue')}}
                        </small>

                      </th>
                      <th v-show='false'> <input v-model="row.unit" type="text" class="form-control form-control-sm"> </th>
                      <th> <input  v-model="row.numberDrag" disabled type="text" class="form-control form-control-sm"> </th>
                      <th> <input  v-model="row.price" disabled @input="onChangeCount(row.soni,rowIndex)" type="text" class="form-control form-control-sm"> </th>
                      <th v-show="false"> <input v-model="row.prosent" @input="onchange_presentage(rowIndex)" type="number" class="form-control form-control-sm" >  </th>
                      <th> <input v-model="row.buyed_price" @input="onchange_buyed(rowIndex)" type="text" class="form-control form-control-sm" >  </th>
                      <th v-show="false"> <input v-model="row.prosentNDS" @input="onchange_presentageNDS(rowIndex)" type="number" class="form-control form-control-sm" >  </th>
                      <th v-show="false"> <input v-model="row.persantage_discount"  type="number" class="form-control form-control-sm" >  </th>
                      <th > <input  v-model="row.date" placeholder="12/22" @input="addComma(rowIndex)" type="text" class="form-control form-control-sm"> 
                            <small class="invalid-text" style="margin:0; margin-top:26px;  position:relative; "
                              v-if="($v.datasource.rows.$each[rowIndex].date.$dirty  && !$v.datasource.rows.$each[rowIndex].date.required)" >
                                {{$t('Select_date')}}
                              </small>
                      </th>
                      
                      <th v-show="false" class="text-center">
                         <input v-model="row.change_price_status" type="checkbox" class="" style="width:16px; height: 16px; margin-top:5px; cursor:pointer" > 
                       </th>
                      <th> <input v-model="row.summ" type="text"  class="form-control form-control-sm" disabled>  </th>
                      


                    </tr>
                  </mdb-tbl-body>
                </mdb-tbl>

               
                <hr class="mt-4 mb-3 gradint"/>
                
            </div>
            </div>  
            </div>
        </div>
      </form>

      <div>
        <massage_box :hide="modal_status" :detail_info="modal_info"
         :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>
      </div>
      <Toast ref="message"></Toast>

         <!-- Central Info Modal -->
    <mdb-modal  :show="productAddBtn"  @close="productAddBtn = false" size="lg" info>
      <mdb-modal-header>
        <mdb-modal-title>{{$t('New_product')}}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
           <productAdd 
           :props_name="product_name"
           @close_product = "close_product"/>
      </mdb-modal-body>
    </mdb-modal>

    </main>
  </div>
</template>


<script>
import erpSelect from "../../components/erpSelect.vue";

import productAdd from "../../components/add_product.vue";

import DatePicker from 'vue2-datepicker';
import lineSelect from "../../components/lineSelect.vue";
import {mapActions, mapGetters,mapMutations} from "vuex";
import { required,minValue } from 'vuelidate/lib/validators'
// import localizeFilter from '../../filters/localize.filter';
import {
  mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
        mdbRow, mdbBtn,mdbInput, mdbCol,mdbBtnGroup,mdbDropdown, mdbDropdownItem, mdbDropdownMenu,
     mdbTbl, mdbTblHead, mdbTblBody,
  } from "mdbvue";
import 'vue2-datepicker/index.css';
export default {
  components : {
      
      mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody,
      mdbTbl, mdbTblHead, mdbTblBody,
      mdbRow,mdbInput,mdbBtnGroup,mdbDropdown, mdbDropdownItem, mdbDropdownMenu,
      mdbBtn,DatePicker,
      mdbCol,erpSelect,lineSelect,productAdd
  },
  validations: {
      company_name : {required},
      sklad_name : {required},
      dept_name : {required},
      time1 : {required}, 

      datasource : {
        rows : {
          $each : {
            soni : { minValue : minValue(0.1), required},
            product_name : {required},
            date: {required}
          }

        }
      }
    },
    data(){
      return{
        modal_info : '',
        modal_status: false,
        showfor_print : false,
        loading: false,
        productAddBtn : false,
        product_name : '',
        invoice_name: '',

        searchBarcodeData: [],
        searchDrag : '',

      

        created_user : 1,
        changed_user : 1,
        id : this.$route.params.id,
        subId: 0,
        invoiceItems: [],
        time1: new Date(Date.now()),
        note : '',
        company_name : ' ', company_id : null,
        sklad_name : ' ', sklad_id : null,
        dept_name : ' ', dept_id : null,
        agent_id : null, agent_name : ' ',

        facture_number: 0,
        barcode: ' ',
        creditd_summ: 0,
        sum: 0,
        precent : null,
        selected_row_index : -1,
        sklad_submitted : false,
        edit : false,
        last_row : -1,
        datasource :
        {
          rows :[],
          // real_time
          columns: ['product','soni','unit','contains_number','price','precent','buyed_price','nds','skidka','end_time','change','summ'],
        }
      }
    },
    async mounted(){
      await this.fetchDepartment();
      if(this.allDepartment.rows.length != 0){
        this.dept_name = this.allDepartment.rows[0].name;
        this.dept_id = this.allDepartment.rows[0].id;
      }
      await this.fetchSklad();
      if(this.allSklad.rows.length>0){
        this.sklad_name = this.allSklad.rows[0].name;
        this.sklad_id = this.allSklad.rows[0].id;
      }
      await this.fetchCompany();
      if(this.allCompany.rows.length>0){
        this.company_name = this.allCompany.rows[0].name;
        this.company_id = this.allCompany.rows[0].id;
      }
      await this.fetchProduct();
      console.log(this.allProduct)
      this.$nextTick(function () {
        this.$refs.barcode.focus();
        this.barcode = '';
      })
    },
    computed:mapGetters(['allSklad', 'allDepartment', 'allCompany', 'allProduct']),
     methods : {
      ...mapActions(['fetchDepartment','fetchSklad','fetchCompany', 'fetchProduct']),
      ...mapMutations(['get_deparment_id_comp']),


     async select_comp(option){
        this.company_name = option.name;
        this.company_id = option.id;
      },
      add_product(data)
      {
        this.last_row = data.row
        this.product_name = data.name
        this.productAddBtn = true
      },
     async close_product(last_product)
      {
        await this.fetchProduct();
        if(this.last_row != -1)
        {
           this.datasource.rows[this.last_row].product_name = last_product.name;
           this.datasource.rows[this.last_row].main_item_id = last_product.id;
           this.datasource.rows[this.last_row].product_id = last_product.id;
        }
        this.productAddBtn = false
      },
      async select_dept(option){
        this.dept_name = option.name;
        this.dept_id = option.id;
    },
      select_sklad(option){
        this.sklad_name = option.name;
        this.sklad_id = option.id;
      },
      selectproduct(option)
      {
        console.log(option)
        this.datasource.rows[option.row].product_name = option.data.name;
        this.datasource.rows[option.row].main_item_id = option.data.id;
        this.datasource.rows[option.row].product_id = option.data.id;
        this.datasource.rows[option.row].numberDrag = option.data.contains_number_in_pack;
        this.datasource.rows[option.row].buyed_price = option.data.buyed_price;
        this.datasource.rows[option.row].price = option.data.price;
        this.datasource.rows[option.row].prosent = option.data.percentage;

      },
      onChangeCount(data,index)
      {
        this.datasource.rows[index].summ = data* this.datasource.rows[index].price;
        if( this.datasource.rows[index].prosent==null || this.datasource.rows[index].prosent < 1)
          this.datasource.rows[index].buyed_price =  this.datasource.rows[index].price;
        else
        {
          var p = parseInt(this.datasource.rows[index].prosent) + 100
        
          this.datasource.rows[index].buyed_price = p* this.datasource.rows[index].price/100;

        }
          
      },
       addComma(i) {
         if(this.datasource.rows[i].date.length == 2){
            this.datasource.rows[i].date = this.datasource.rows[i].date + '/'
         }
         else if(this.datasource.rows[i].date.length > 4){
           this.datasource.rows[i].date = this.datasource.rows[i].date.slice(0,5)
         }
        },
      set_filling()
      {
        if(this.datasource.rows.length > 1)
        {
          for(var i = 1; i < this.datasource.rows.length; i++)
          {
             this.datasource.rows[i].prosent =  this.datasource.rows[0].prosent
            this.onchange_presentage(i);
          }
        }
      },
      onchange_presentage(index)
      {
        var p = parseInt(this.datasource.rows[index].prosent) + 100
        this.datasource.rows[index].buyed_price = p* this.datasource.rows[index].price/100;
      },
      onchange_buyed(index){
         var p = parseInt(this.datasource.rows[index].buyed_price) * parseInt(this.datasource.rows[index].soni)
        this.datasource.rows[index].summ = p;
      },

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
              this.searchBarcodeData = []
              this.$refs.message.error('not_found')
            
            }
          
          }
          
          
        },

      applied()
      {
        if(this.edit) return;
        this.datasource.rows = [];
        if( this.$v.$invalid || this.agent_id == null  || this.company_id == null)
        {
          this.$v.$touch();
          // this.alert_text = localizeFilter('please_fill');
          // this.alert_danger = true;
          this.$refs.message.warning('please_fill')
          return;
        }   
        this.sklad_submitted = !this.sklad_submitted ;
      },

      addRow() {
      //  console.log("test : "  + this.datasource.rows[0].product.name);
            this.datasource.rows.unshift({
            main_item_id : 0,
            product_id : null,
            product_name : '',
            soni : 0,
            unit: 0,
            numberDrag: 10,
            buyed_price : null,
            prosent : this.precent,
            prosentNDS: 0,
            persantage_discount: 0,
            price : 0,
            date: '',
            summ: 0,
            change_price_status: true,
            id: 0,
          })

            //appData.updated()
        },

        clickBarcodeData(data){
          console.log(data)
          var temp = {
            main_item_id : 0,
            product_id : null,
            product_name : '',
            soni : 0,
            unit: 0,
            numberDrag: 10,
            buyed_price : null,
            prosent : this.precent,
            prosentNDS: 0,
            persantage_discount: 0,
            price : 0,
            date: '',
            summ: 0,
            change_price_status: true,
            id: 0,
          }

          temp.main_item_id = data.id
          temp.product_id = data.product.id
          temp.product_name = data.product.name
          temp.soni = parseInt(data.qty_in_pack/data.product.contains_number_in_pack);
          temp.numberDrag = data.product.contains_number_in_pack;
          temp.price = data.unit_buyed_price
          temp.buyed_price = data.unit_saled_price
          temp.prosent  = data.persantage
          temp.prosentNDS = data.persantage_nds
          temp.persantage_discount = data.persantage_discount
          temp.date = data.expired_date.slice(5,7)+ '/' + data.expired_date.slice(2,4)
          temp.summ = ((parseFloat(temp.buyed_price)* parseInt(temp.soni))).toFixed(2)
          temp.change_price_status = data.change_price_status



          this.datasource.rows.unshift(temp)
          this.searchBarcodeData = []
          console.log(temp)
        },

      async submit()
      {
        if(this.$v.$invalid || this.datasource.rows[0].product_id == null)
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return;
        }
        var year = new Date().getFullYear();
        console.log('year');
        console.log(year.toString().slice(0,2));
        
        this.edit =  !this.edit;
        this.invoiceItems = [];
        console.log(this.datasource.rows)
        for(var i = 0; i < this.datasource.rows.length; i++){
          var a = {
            product_id: null,
            posInvoiceItemid: null,
            qty: null,
            summ: 0,
            price: 0,
            saled_price: 0,
            real_company_id: parseInt(localStorage.CompId),

          }
          a.product_id = this.datasource.rows[i].product_id;
          a.qty =(parseFloat(this.datasource.rows[i].soni)+(parseFloat(this.datasource.rows[i].unit)/parseFloat(this.datasource.rows[i].numberDrag))).toFixed(2);
          a.summ = this.datasource.rows[i].summ;
          a.posInvoiceItemid = this.datasource.rows[i].main_item_id;
          a.id = this.datasource.rows[i].id;
          a.price = this.datasource.rows[i].price;
          a.saled_price = this.datasource.rows[i].buyed_price;
          this.invoiceItems.push(a);
        }

          try{
            var swq = 0;
            for(let k = 0; k < this.datasource.rows.length; k++){
              swq += this.datasource.rows[k].summ;
            }
         const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "real_company_id": parseInt(localStorage.CompId),
              "date": this.time1,
              "postavshik_id" : this.company_id,
              "sklad_id" : this.sklad_id,
              "department_id": this.dept_id,
              "factura_number": this.facture_number,
              "summ": swq.toFixed(2),
              "debit_summ": this.creditd_summ,
              "credit_sum": swq.toFixed(2)-this.creditd_summ,
              "note" : this.note,
              "invoiceItems" : this.invoiceItems,
              "applyment_status": false,
              "id": this.id
            })
          };
            console.log('requestOptions.body')
            console.log(requestOptions.body)
          this.loading = true;
           const response = await fetch(this.$store.state.hostname + "/PosDebitorInvoice", requestOptions);
           const data = await response.text();
          this.loading = false;
           if(response.status == 200 || response.status == 201)
            {
  
              this.$refs.message.success('Added_successfully')
              this.$store.state.alert = true;
              this.$router.push('/debitor')
            }
            else{
              this.modal_info = data;
              this.modal_status = true;
            }
        }
        catch{
           this.loading = false;
            this.modal_info = this.$i18n.t('network_ne_connect'); 
            this.modal_status = true;
        }
      }
    },

   

    async created()
    {
      if(this.id > 0)
      {
         this.edit = true
          const res = await fetch(this.$store.state.hostname + '/PosDebitorInvoice/' + this.id);
          const data = await res.json();
          console.log('data')
          console.log(data)

          this.time1 = new Date(data.date);
          this.company_name = data.postavshik.name
          this.company_id = data.postavshik.id
          this.dept_name = data.department.name
          this.dept_id = data.department.id
          this.sklad_name = data.sklad.name
          this.sklad_id = data.sklad.id
          this.creditd_summ = data.credit_sum
          this.facture_number = data.factura_number;
          this.note= data.note;
          

            //console.log(data2);

           for(var i = 0; i<data.invoiceItems.length; i++)
           {
              this.datasource.rows.push({
                main_item_id : data.invoiceItems[i].id,
                product_id : data.invoiceItems[i].product.id,
                product_name : data.invoiceItems[i].product.name,
                soni : parseInt(data.invoiceItems[i].qty),
                unit: data.invoiceItems[i].qty_in_pack - (data.invoiceItems[i].product.contains_number_in_pack*parseInt(data.invoiceItems[i].qty)),
                numberDrag: data.invoiceItems[i].product.contains_number_in_pack,
                prosent: data.invoiceItems[i].persantage,
                prosentNDS: data.invoiceItems[i].persantage_nds,
                persantage_discount: data.invoiceItems[i].persantage_discount,
                date: data.invoiceItems[i].expired_date.slice(5,7)+ '/' + data.invoiceItems[i].expired_date.slice(2,4),
                buyed_price : data.invoiceItems[i].unit_saled_price,
                price : data.invoiceItems[i].unit_buyed_price,
                summ: data.invoiceItems[i].summ,
                change_price_status: data.invoiceItems[i].change_price_status,

                id: data.invoiceItems[i].id
                
              })
           }

      }
    },
    
}
</script>


<style scoped lang="scss">
main {
  background-color: #fff;
}
.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}

@media (max-width: 1199.98px) {

  .flexible-navbar {
    padding-left: 10px;
  }
}

.applied{
  pointer-events: none;
  background:#fcfcfc;
}

.timepiker{
  position: relative;
  width: 100%;
  margin-top:32px;
  cursor: pointer;
}
.fixed-column {
    overflow-x: scroll;
      /* overflow-x: hidden; */

    margin-left: 100px;
    padding-bottom: 200px;
  }


  .fixed-column th, .fixed-column td {
    white-space: nowrap;
  }

  .fixed-column tr th:first-child, .fixed-column tr td:first-child {
    position: absolute;
    width: 50px;
    top: auto;
    margin-left: -50px;
    margin-top: 0;
  }
  .delIcon:hover{
    color: #000;
    }
  .delIcon{
    color: red;
  }
  .gradint{
    background: #8E2DE2;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #4A00E0, #8E2DE2);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #4A00E0, #8E2DE2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .tableProductsw{
    // overflow-y: scroll;
    overflow-y: hidden;
    max-height: 79vh;
    .myTablereturnS { 
      
      /* border-collapse: collapse; */
      table-layout:fixed;
      width: 100%;
      overflow: hidden;
      // border: 1px solid #ddd;
      font-size: 18px;
      max-height:80px; overflow-x:auto
    }
    .myTablereturnS th{
      font-weight: 600;
      color:#5a5858; 
      font-size:12px;
    }
    .myTablereturnS td{
      font-size:13px;
    }
    .myTablereturnS th, .myTablereturnS td {
      text-align: left;
      padding: 8px;
    }

    .myTablereturnS tr {
      border-bottom: 1px solid rgb(240, 240, 240);
    }

    .delIcon{
      color: rgb(251, 70, 70);
      font-size: 13px;
    }
  }
  .bg_dark{
    background: #202020;
  }
  .bg_danger{
    background: #fb6b6b;
  }
  .bg_warning{
    background: rgb(255, 236, 129);
  }
  .bg_success{
    background: #90ff7c;
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
  .searchBarcodeHover:hover{
    background: seagreen;
    color:seashell;
    cursor: pointer;
  }

</style>

