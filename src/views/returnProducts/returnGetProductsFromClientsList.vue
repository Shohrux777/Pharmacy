<template>
  <div>
    <div class="border-bottom d-flex justify-content-between">
      <router-link to="">
         <h5 class="m-0 ml-4 d-flex" style="padding: 16px 0px">
            {{$t('retunGetFromClientBack')}}</h5>
      </router-link>
       <div>
         <router-link to="/retunGetFromClientBack_add/0">
            <mdb-btn color="success mt-3" m="r3" size="sm" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
      </div>
     
    </div>
    <div class="mx-3 py-1 p-0 border-bottom">
      <mdb-row>
        <mdb-col class="col-12 col-sm-12 col-md-4 col-lg-2 pt-2">
          <multiselect  v-model="value" :options="options"
            :searchable="false"
            style="font-size: 13px; font-family: Ubuntu, sans-serif;"
            :show-labels="false" placeholder="Entries">
          </multiselect>
        </mdb-col>

        <mdb-col class="col-12 col-sm-12 col-md-4 col-lg-3 pt-2">
          
        </mdb-col>

        <mdb-col class="col-12 col-sm-6 col-md-4 col-lg-2 ">
          <mdb-btn type="submit" color="primary py-2 px-4 " hidden  style="font-size:10px; margin-top: 9px;"  >
            {{$t('all_product')}}
          </mdb-btn>
        </mdb-col>
        <mdb-col class="col-12 col-sm-6 col-md-3 col-lg-5 text-right">
          <mdb-btn type="submit" color="primary py-1 px-4 " @click="pdf" style="font-size:15px; margin-top: 9px;"  >
            <mdb-icon icon="print" />
          </mdb-btn>
        </mdb-col>
      </mdb-row>


    </div>
    <loaderTable v-if="loading"/>
    <div class="mainChart px-3" id="print">
      <table  class="myTable">
          <thead>
              <tr  class="header ">
              <th style="width: 40px;">№</th>
              <th>{{$t('company')}}</th>
              <th>{{$t('price')}}</th>
              <th>{{$t('note')}}</th>
              <th>{{$t('date')}}</th>
              <th>{{$t('applyment_status')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in allreports" :key="i">
                <td>{{i+1}}</td>
                <td>{{item.company_name}}</td>
                <td>{{item.summ}}</td>
                <td>{{item.note}}</td>
                <td>{{item.registarted_date_str}}</td>
                <td>
                  <mdb-btn class="mr-1 py-1 px-2" style="font-size: 8px;" v-if="item.applayment_status == false" color="success"  @click="apply(item.id)"
                    size="sm">{{$t('apply')}}</mdb-btn>
                    <mdb-btn class="mr-1 py-1 px-2" v-if="item.applayment_status == true" style="font-size: 8px;" color="danger"  @click="cancel(item.id)"
                    size="sm">{{$t('cancel')}}</mdb-btn>
                </td>
              </tr>
            </tbody>
      </table>
    </div>

    <div class="mx-3 p-0">
      <div class=" m-3 mt-4" >
        <div class="d-inline dataTables_info"  role="status" aria-live="polite"> {{activePage+1}} {{$t('to_')}} {{value}} {{$t('of_')}} {{itemQtyPage}} </div>
        <mdb-pagination class="float-right" style="font-size:12px">
          <div @click="firstPage">
            <mdb-page-item :disabled="elementPageList==0">{{$t('First')}}</mdb-page-item>
          </div>
          
          <div @click="prevPage" :class="{'applied': elementPageList==0}">
            <mdb-page-nav  prev :disabled="elementPageList==0"></mdb-page-nav>
          </div>
          <div v-for="(num,i) in pageList[elementPageList]" :key="i"  @click="paginationClick(num)" >
            <mdb-page-item class="text-white"  :class="{ 'active' : activePage == num }"  >{{num+1}}</mdb-page-item>
          </div>
          <div @click="nextPage" :class="{'applied': elementPageList==pageList.length-1}">
            <mdb-page-nav  next :disabled="elementPageList==pageList.length-1"></mdb-page-nav>
          </div>
          <div @click="lastPage">
            <mdb-page-item :disabled="elementPageList==pageList.length-1">{{$t('Last')}}</mdb-page-item>
          </div>
        </mdb-pagination>
      </div>
    </div>



    <div class="pechat">
      <vue-html2pdf ref='listlar'
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="true"
        :paginate-elements-by-height="1600"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="100%"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
      >
      <div slot="pdf-content">
        <div class="mainChart px-3">
          <table  class="myTable">
            <thead>
              <tr  class="header ">
              <th style="width: 40px;">№</th>
              <th>{{$t('company')}}</th>
              <th>{{$t('price')}}</th>
              <th>{{$t('note')}}</th>
              <th>{{$t('date')}}</th>
              <th>{{$t('applyment_status')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in allreports" :key="i">
                <td>{{i+1}}</td>
                <td>{{item.company_name}}</td>
                <td>{{item.summ}}</td>
                <td>{{item.note}}</td>
                <td>{{item.registarted_date_str}}</td>
                <td>{{item.applayment_status}} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </vue-html2pdf>
    </div>



    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {
  mdbIcon,
  mdbBtn,   
  mdbRow, mdbCol, mdbPagination, mdbPageItem, mdbPageNav
} from "mdbvue";
import Multiselect from 'vue-multiselect'
import VueHtml2pdf from 'vue-html2pdf'
import erpSelect from "../../components/erpSelect.vue";
import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  data(){
    return {
      applyStatus: true,
      modal_info: '',
      modal_status: false,
      loading: false,
      auth_id: localStorage.AuthId,
      pageList: [],
      elementPageList:0,

      options: ['5','10','25','50','100'],
      value: 5,
      pageNum: 0,
      activePage: 0,
      itemQtyPage: 0,


      product_id: 0,
      product_name: '',
      allreports: [],
    
    }
  },
  watch:{
    'value': function(){
      this.refresh();
    }
  },
  components: {
    mdbIcon,
    mdbBtn,
    mdbRow, mdbCol, mdbPagination, mdbPageItem, mdbPageNav,
    Multiselect, erpSelect, VueHtml2pdf
  },
  computed: mapGetters(['allProduct']),
  methods: {
    ...mapActions(['fetchProduct']),
    ...mapMutations([ 'update_pagination_first']),  

    async apply(id){
      try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/PosRevert/applyOrDisableRevertedProductsByStatusAndId?revert_inv_id=' + id + '&applayment_status=true' + '&pos_auth_id=' + localStorage.AuthId);
        const res_data = await res.json();
        this.loading = false;
        console.log('res_data');
        console.log(res_data);
        if(res_data.items_list[0].id){
          this.refresh()
          this.$refs.message.success('Added_successfully');
        }
        
      }
      catch{
          this.loading = false;
          this.modal_info = this.$i18n.t('network_ne_connect'); 
          this.modal_status = true;
      }
    },

    async cancel(id){
      try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/PosRevert/applyOrDisableRevertedProductsByStatusAndId?revert_inv_id=' + id + '&applayment_status=false' + '&pos_auth_id=' + localStorage.AuthId);
        const res_data = await res.json();
        this.loading = false;
        console.log('res_data');
        console.log(res_data);
        if(res_data.items_list[0].id){
          this.refresh()
          this.$refs.message.success('Added_successfully');
        }
        
        
      }
      catch{
          this.loading = false;
          this.modal_info = this.$i18n.t('network_ne_connect'); 
          this.modal_status = true;
      }
    },


    async paginationClick(index){
       this.activePage = index;
       await this.refresh();
      console.log(index)
    },
    async prevPage(){
      console.log('prev')
      this.elementPageList --;
      this.activePage = this.pageList[this.elementPageList][0];
      await this.refresh();
    },
    async nextPage(){
      console.log('next')
      this.elementPageList ++;
      this.activePage = this.pageList[this.elementPageList][0];
      await this.refresh();
    },
    async lastPage(){
        this.elementPageList = this.pageList.length-1;
        this.activePage = this.pageList[this.elementPageList][this.pageList[this.elementPageList].length-1];
      await this.refresh();
    },
    async firstPage(){
        this.elementPageList = 0;
      this.activePage = this.pageList[this.elementPageList][0];
      await this.refresh();
    },



    // print(){
    //   this.$refs.listlar.generatePdf()
    // },
    pdf(){
      this.$refs.listlar.generatePdf()
    },




      
      async refresh(){
        try{
          this.loading = true;
          const res = await fetch(this.$store.state.hostname + '/PosRevert/getPaginationKlientdanQaytaribOlinganTovarovList?page=' + this.activePage + '&size=' + this.value);
          const res_data = await res.json();
          console.log('res_data');
          console.log(res_data);
          this.allreports = res_data.items_list;

          this.pageNum = Math.ceil(res_data.items_count/this.value)

          this.pageList = []
          var box = []
          box.push(0);
          // this.elementPageList = 0;
          for(let i=1; i<this.pageNum; i++){
            if(i%5!=0){
              
              box.push(i)
            }
            else{
              this.pageList.push(box);
              box = []
              box.push(i)
              
            }
          }
          this.pageList.push(box);
          box = [];


          this.itemQtyPage = res_data.items_count
          console.log(this.pageNum)
          this.loading = false;
        }
        catch{
           this.loading = false;
            this.modal_info = this.$i18n.t('network_ne_connect'); 
            this.modal_status = true;
        }
      },


  },
  async mounted(){
    this.loading = true;
       await this.fetchProduct();
      await this.refresh();
    this.loading = false;
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
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
  font-size:12px;
}
.myTable td{
  font-size:13px;
}
.myTable th, .myTable td {
  text-align: left;
  padding: 4px;
}

.myTable tr {
  border-bottom: 1px solid rgb(240, 240, 240);
}

.myTable tr.header, .myTable tr:hover {
  background-color: #f1f1f1;
}
tr:nth-child(even) {
  background-color: #f4fafa
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
</style>