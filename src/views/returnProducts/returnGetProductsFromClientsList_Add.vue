<template>
  <div class="">
    <loader v-if="loading"/>
    <div class="border-bottom ">
      <router-link to="/retunGetFromClientBack">
         <h5 class="m-0 ml-3 d-flex" style="padding: 16px 0px">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('retunGetFromClientBack')}}</h5>
      </router-link>
     
    </div>

    <main style="border: 0.1px solid white; border-radius: 7px;" class="">
      <form >
        <div class="container-fluid ">
          <div :class="{'applied': sklad_submitted}" class="container-fluid mt-3  bgColorBack p-4" style=" border-radius: 7px;">

            <mdb-row >
              <mdb-col col="4" style="position: relative;">
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
              <mdb-col col="4" >
                <mdb-input v-model="note" size="sm" type="textarea" style="margin-top: -6px; margin-bottom: 0px; height: 32px;" :label="$t('Descriptions')" icon="pencil-alt" />
              </mdb-col>

              <mdb-col col="4" >
                <date-picker class="timepiker" style="margin-top: 0px;" v-model="time1" format="DD-MM-YYYY HH:mm:ss"  type="datetime"></date-picker>

              </mdb-col>
              <small v-if="$v.time1.$dirty && !$v.time1.required" style="padding:90px 0 0 15px" class="invalid-text" >
                    {{$t('invalid_time')}}
                </small>

            </mdb-row>
          </div>
          

            <div >
              <div class="mt-5 ">
                <mdb-row>
                  <mdb-col col="1" class="m-0 p-0">
                    <!-- <div class="d-inline">
                        <mdb-btn class="mr-1" style="font-size:12px" outline="orange" darkWaves tag="a" floating @click="addRow"
                          icon="plus"  size="sm">{{$t('add_product')}}</mdb-btn>

                       
                    </div> -->
                      
                  </mdb-col>
                  <mdb-col col="3" class="m-0 p-0" style="position:relative; ">
                    <mdb-input v-model="barcode" ref="barcode" @keyup.enter.native="getbarcode()" size="sm" type="text"  icon="barcode" style="margin-top: 2px; margin-bottom: 2px; height: 25px;" :label="$t('barcode')" />

                    <div class="searchTable  bg-white shadow p-3 card" style="position:absolute; top:40px; left:10px; width:900px; z-index:100;" 
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
                  

                  <mdb-col col="5" class="text-right">
                    <mdb-btn class="mr-1 px-3 py-2 text-white" style="font-size:12px" color="success" darkWaves tag="a" floating @click="submit"
                    icon="check"  size="sm">{{$t('save')}}</mdb-btn>
                  
                  </mdb-col>
                </mdb-row>
              </div>
              
                
                <div>
                <div class="d_table " >

                <mdb-tbl class="fixed-column" >
                  <mdb-tbl-head>
                    <tr>
                      <td></td>
                      <!-- product -->
                      <td style="min-width:320px; font-size: 13px;"> {{$t(datasource.columns[0])}} </td>
                      <td style="width: 110px; min-width: 110px; font-size: 13px;"> {{$t(datasource.columns[1])}} </td>
                      <td style="width:110px; min-width: 110px;   font-size: 13px;"> {{$t(datasource.columns[2])}} </td>
                      <td style="width:100px; font-size: 13px;"> {{$t(datasource.columns[3])}} </td>
                       <td style="min-width:120px; font-size: 13px;"> {{$t(datasource.columns[4])}} </td>
                      <td style="min-width:100px; font-size: 13px;"> {{$t(datasource.columns[5])}} </td>
                      <td style="min-width:30px; font-size: 13px;"> {{$t(datasource.columns[6])}} </td>

                      <!-- ed_izm -->
                    </tr>
                  </mdb-tbl-head>
                  <mdb-tbl-body>
                    <tr  scope="row" v-for="(row,rowIndex) in datasource.rows" :key="rowIndex" :width="row.size">
                      <th><i class="fas fa-trash delIcon mask waves-effect m-0 pl-2"
                      @click="datasource.rows.splice( parseInt(rowIndex), 1)"></i></th>
                      <th class="applied">
                        <lineSelect
                            :options="allProduct.rows" :row_index="rowIndex"
                            :searchshow="true"
                            :selected="row.product_name"
                            :label="$t('product')"
                        />
                        <small class="invalid-text" style="margin:0; margin-top:26px;  position:relative; "
                        v-if="($v.datasource.rows.$each[rowIndex].product_name.$dirty  && !$v.datasource.rows.$each[rowIndex].product_name.required)" >
                          {{$t('Select_product')}}
                        </small>
                      </th>

                      <th>
                        <!-- @input="onChangeCount(row.soni,row.unit,rowIndex)" -->
                        <input v-model="row.soni" type="number" min="0"  step=".1"  
                        onkeypress="return event.charCode >= 48" class="form-control form-control-sm">
                        <small class="invalid-text" style="margin:0; margin-top:26px; position:relative; "
                        v-if="($v.datasource.rows.$each[rowIndex].soni.$dirty && !$v.datasource.rows.$each[rowIndex].soni.minValue) ||
                        ($v.datasource.rows.$each[rowIndex].soni.$dirty && !$v.datasource.rows.$each[rowIndex].soni.required)" >
                          {{$t('minValue')}}
                        </small>
                        <!-- <small class="invalid-text" style="margin:0; margin-top:26px; position:relative;" v-if="row.status"
                         >
                          {{$t('enoughtDrag')}}
                        </small> -->

                      </th>
                       <!-- @input="onChangeCount(row.soni,row.unit,rowIndex)" -->
                      <th> <input v-model="row.unit" type="text" class="form-control form-control-sm"> 
                        <small class="invalid-text" style="margin:0; margin-top:26px; position:relative;"
                        v-if="($v.datasource.rows.$each[rowIndex].unit.$dirty && !$v.datasource.rows.$each[rowIndex].unit.minValue) ||
                        ($v.datasource.rows.$each[rowIndex].unit.$dirty && !$v.datasource.rows.$each[rowIndex].unit.required)" >
                          {{$t('minValue')}}
                        </small>  
                      </th>
                      <th> <input  v-model="row.numberDrag" disabled type="text" class="form-control form-control-sm"> </th>
                      <th> <input v-model="row.price" disabled @input=" onChangeCount(row.soni,row.unit,rowIndex)" type="text" class="form-control form-control-sm"> </th>
                      <th > <input  v-model="row.date" placeholder="" disabled type="text" class="form-control form-control-sm"> 
                            <small class="invalid-text" style="margin:0; margin-top:26px;  position:relative; "
                              v-if="($v.datasource.rows.$each[rowIndex].date.$dirty  && !$v.datasource.rows.$each[rowIndex].date.required)" >
                                {{$t('Select_date')}}
                              </small>
                      </th>
                  
                      <th> <input v-model="row.summ" type="text"  class="form-control form-control-sm" disabled>  </th>
                      


                    </tr>
                  </mdb-tbl-body>
                </mdb-tbl>

                <!-- <div class="cyrcle_btn ml-5 z-depth-1-half "  v-on:click="addRow" v-mdb-waves="{ duration : 'long' , fixed : true}" >
                    <i class="fas fa-plus white-text d-flex justify-content-center " style="padding-top:11px"></i>
                </div> -->
                
                </div>
                <hr class="mt-4 mb-3 gradint"/>
                
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

    </main>
  </div>
</template>


<script>
import erpSelect from "../../components/erpSelect.vue";


import DatePicker from 'vue2-datepicker';
import lineSelect from "../../components/lineSelect.vue";
import {mapActions, mapGetters,mapMutations} from "vuex";
import { required,minValue } from 'vuelidate/lib/validators'
// import localizeFilter from '../../filters/localize.filter';
import {
  
        mdbRow, mdbBtn,mdbInput, mdbCol,
     mdbTbl, mdbTblHead, mdbTblBody,
  } from "mdbvue";
import 'vue2-datepicker/index.css';
export default {
  components : {
      mdbTbl, mdbTblHead, mdbTblBody,
      mdbRow,mdbInput,
      mdbBtn,DatePicker,
      mdbCol,erpSelect,lineSelect
  },
  validations: {
      company_name : {required},
      time1 : {required}, 

      datasource : {
        rows : {
          $each : {
            soni : { minValue : minValue(0), required},
            unit : { minValue : minValue(0), required},
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

        save_btn : 'save',

        id : this.$route.params.id,
        subId: 0,
        invoiceItems: [],
        time1: new Date(Date.now()),
        note : '',
        company_name : ' ', company_id : null,
        barcode: '',
        searchDrag: '',



        sum: 0,


        selected_row_index : -1,
        sklad_submitted : false,
        edit : false,
        last_row : -1,
        datasource :
        {
          rows :[],
          // real_time
          columns: ['product','soni','unit','contains_number','price','end_time','summ'],
        }
      }
    },
    async mounted(){
      await this.fetchCompany();
      if(this.allCompany.rows.length>0){
        this.company_name = this.allCompany.rows[0].name;
        this.company_id = this.allCompany.rows[0].id;
      }
      await this.fetchProduct();
      console.log(this.allProduct)
      // this.$nextTick(function () {
      //   this.$refs.barcode.focus();
      //   this.barcode = '';
      // })
    },
    computed:mapGetters(['allSklad', 'allDepartment', 'allCompany', 'allProduct']),
     methods : {
      ...mapActions(['fetchDepartment','fetchSklad','fetchCompany', 'fetchProduct']),
      ...mapMutations(['get_deparment_id_comp']),


     async select_comp(option){
        this.company_name = option.name;
        this.company_id = option.id;
      },
      onChangeCount(qty,unit,index)
      {
        this.datasource.rows[index].summ = (parseInt(qty)* this.datasource.rows[index].price) + (parseInt(unit) * this.datasource.rows[index].unitsumm);
        var qtp = parseInt(this.datasource.rows[index].numberDrag)*qty + parseInt(unit)
        if(this.datasource.rows[index].qty_in_pack < qtp){
          this.datasource.rows[index].status = true;
        }
        else{
           this.datasource.rows[index].status = false;
        }
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
            posInvoiceItemid : 0,
            product_id : null,
            product_name : '',
            soni : 0,
            unit: 0,
            numberDrag: 10,
            price : 0,
            date: '',
            summ: 0,
            id: 0,
          })

            //appData.updated()
        },

        clickBarcodeData(data){
          this.searchBarcodeData = [];
          var tempTimeOut = {
            posInvoiceItemid : 0,
            product_id : null,
            product_name : '',
            soni : 0,
            unit: 0,
            numberDrag: 10,
            price : 0,
            date: '',
            summ: 0,
            unitsumm:0,
            id: 0,
            qty_in_pack: 0,
            status: false,
          }
          tempTimeOut.posInvoiceItemid = data.id
          tempTimeOut.date = data.exp_date_str;
          tempTimeOut.product_id = data.product.id;
          tempTimeOut.product_name = data.product.name;
          tempTimeOut.soni = parseInt(data.qty_in_pack/data.product.contains_number_in_pack);
          tempTimeOut.unit = data.qty_in_pack-(tempTimeOut.soni*data.product.contains_number_in_pack);
          tempTimeOut.numberDrag = data.product.contains_number_in_pack;
          tempTimeOut.price = data.unit_buyed_price;
          tempTimeOut.unitsumm = (parseFloat(data.unit_buyed_price)/data.product.contains_number_in_pack).toFixed(2)
          tempTimeOut.summ = (data.unit_buyed_price*tempTimeOut.soni) + (tempTimeOut.unit*tempTimeOut.unitsumm);
          tempTimeOut.qty_in_pack = data.qty_in_pack

          console.log(data)
          console.log(tempTimeOut)
          this.datasource.rows.unshift(tempTimeOut)

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
        var enough = 0;
        console.log(this.datasource.rows)
        for(var i = 0; i < this.datasource.rows.length; i++){
          var a = {
            product_id: null,
            qty: 0,
            qty_in_pack:0,
            price: 0,
            posInvoiceItemid: null,
            // revert: '',
            real_company_id: parseInt(localStorage.CompId),
          }
    
            a.product_id = this.datasource.rows[i].product_id;
            a.qty = (parseInt(this.datasource.rows[i].soni) + parseFloat(this.datasource.rows[i].unit)/this.datasource.rows[i].numberDrag).toFixed(2)
            a.qty_in_pack = (this.datasource.rows[i].soni * this.datasource.rows[i].numberDrag) + this.datasource.rows[i].unit
            a.price = this.datasource.rows[i].price
            a.posInvoiceItemid = this.datasource.rows[i].posInvoiceItemid
            if( this.datasource.rows[i].status == true){
              enough++;
            }
            // a.revert = this.datasource.rows[i].summ.toString()
            this.invoiceItems.push(a);
        }
        if(enough>0){
            this.modal_info = this.$i18n.t('enoughtDrag'); 
            this.modal_status = true;
        }
        else{
          try{
            var swq = 0;
            for(let k = 0; k < this.datasource.rows.length; k++){
              swq += this.datasource.rows[k].summ
            }
              const requestOptions = {
              method : "POST",
              headers: { "Content-Type" : "application/json" },
              body: JSON.stringify({
                "real_company_id": localStorage.CompId,
                "revert_date": this.time1,
                "postavshik_id" : this.company_id,
                "summ": swq,
                "revert_status":3,
                "note" : localStorage.fio + ' ' + this.note,
                "items_list" : this.invoiceItems,
                "id": this.id
              })
            };
              console.log('requestOptions.body')
              console.log(requestOptions.body)
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/PosRevert", requestOptions);
            const data = await response.text();
            this.loading = false;
            if(response.status == 200 || response.status == 201)
              {
    
                this.$refs.message.success('Added_successfully')
                this.$store.state.alert = true;
                this.$router.push('/retunGetFromClientBack')
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

          
      }
    },

   

    async created()
    {
      if(this.id > 0)
      {
         this.edit = true
          const res = await fetch(this.$store.state.hostname + '/PosInvoices/getInvoiceFullInfoById?invoice_id=' + this.id);
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
.d_table {
    /* max-height: 200px;
    overflow-y: auto; */

}
.fixed-column {
    overflow-x: scroll;
      /* overflow-x: hidden; */

    margin-left: 80px;
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

