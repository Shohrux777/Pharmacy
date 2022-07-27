<template>
  <div class="addProductQtyAcceptCash"  v-on:click.self="close">
    <div class="p-4" style="height: 450px;">
      <div class="acceptBox px-3 py-2 pb-4 text-center">
        <h2 class="font-weight-bold border-bottom pb-2 mb-3">{{totalIn}}</h2>
        <div>

        </div>
        <div class="d-flex mt-2">
          <div class="skidka " style="width:35%">
            <div style="position:relative;" class="text-left text-success">
              <h5 class="m-0 p-0 mt-2">{{$t('cash')}}</h5>
            </div>
            
          </div>
          <div class="price ml-4 "  style="width:65%; position:relative;">
            <div style="position:relative; height: 38px;" class="border rounded text-right ">
              <h5 class="m-0 p-0 mt-2 mr-2 font-weight-bold">{{cashInString}}</h5>
            </div> 
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="skidka " style="width:35%">
            <div style="position:relative;" class="text-left text-info">
              <h5 class="m-0 p-0 mt-2">UzCard</h5>
            </div>
            
          </div>
          <div class="price ml-4 "  style="width:65%; position:relative;">
            <div style="position:relative; height: 38px;" class="border rounded text-right ">
              <h5 class="m-0 p-0 mt-2 mr-2 font-weight-bold">{{uzcardInString}}</h5>
            </div> 
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="skidka " style="width:35%">
            <div style="position:relative;" class="text-left text-mdb-color">
              <h5 class="m-0 p-0 mt-2">Humo</h5>
            </div>
            
          </div>
          <div class="price ml-4 "  style="width:65%; position:relative;">
            <div style="position:relative; height: 38px;" class="border rounded text-right ">
              <h5 class="m-0 p-0 mt-2 mr-2 font-weight-bold">{{humoInString}}</h5>
            </div> 
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="skidka " style="width:35%">
            <div style="position:relative;" class="text-left text-warning">
              <h5 class="m-0 p-0 mt-2">{{$t('click')}}</h5>
            </div>
            
          </div>
          <div class="price ml-4 "  style="width:65%; position:relative;">
            <div style="position:relative; height: 38px;" class="border rounded text-right ">
              <h5 class="m-0 p-0 mt-2 mr-2 font-weight-bold">{{clickInString}}</h5>
            </div> 
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="skidka " style="width:35%">
            <div style="position:relative;" class="text-left text-indigo">
              <h5 class="m-0 p-0 mt-2">Online</h5>
            </div>
            
          </div>
          <div class="price ml-4 "  style="width:65%; position:relative;">
            <div style="position:relative; height: 38px;" class="border rounded text-right ">
              <h5 class="m-0 p-0 mt-2 mr-2 font-weight-bold">{{onlineInString}}</h5>
            </div> 
          </div>
        </div>
        <div style="margin-top:20px;" class="d-flex justify-content-end">
              <mdb-btn color="success" style="font-size:11px; padding: 6px 0;"  @click="payed" class="m-0  mt-1 w-25 ml-1" > {{$t('closeCash')}}</mdb-btn>
              <mdb-btn color="danger" style="font-size:11px; padding: 6px 0;"  @click="close" class="m-0  mt-1 w-25 ml-1" > {{$t('cancel')}}</mdb-btn>

            </div>
      </div>
    </div>
    
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_delete')" @to_hide_modal = "modal_status= false"/>

    <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {
  mdbIcon,
  mdbBtn,mdbInput
} from "mdbvue";
export default {
  components: {
    mdbIcon,
    mdbBtn,mdbInput,
  },
  data() {
    return {
      modal_status: false,
      modal_info: '',

      allSumma: {},


      persantage_discount: 0,
      enterSumma: null,
      totalIn: '0',



      cashInString: '0',
      uzcardInString: '0',
      humoInString: '0',
      clickInString: '0',
      onlineInString: '0',
    }
  },
 
  created() {
    this.$root.$refs.closeCashs = this;
  },
  mounted() {
    console.log(this.summa)
  },
  computed:{
    ...mapGetters(['allOrderList', 'get_all_summa', 'get_m_categoryIdProduct', 'get_zakaz_product_all_list','get_page_savat', 'get_product_qty', 'AllSummString']),

  }, 
  methods: {
    ...mapActions([  'fetchCategoryIdProduct', 'fetchProductSearchByName']),
    ...mapMutations([ 'clear_order', 'input_change', 'changeSumma', 'update_zakaz_product_all_list', 'select_savat_page', 'add_savat_page', 'del_savat_page', 'updateCheckId']),
    
    
    async getAllSumm(){
      console.log(this.get_zakaz_product_all_list[this.get_page_savat]) 
      try{
        const res = await fetch(this.$store.state.hostname + '/PosChecks/getReallCurrentSummOfKassa?pos_auth_id=' +  localStorage.AuthId);
        const res_data = await res.json();
        console.log(res_data)
        if(res_data.total_sum == null){
          this.totalIn =   '0'
          this.cashInString = '0'
          this.uzcardInString = '0'
          this.humoInString = '0'
          this.clickInString =  '0'
          this.onlineInString = '0'
        }
        else{
          this.allSumma = res_data;
          this.totalIn = res_data.total_sum.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')
          this.cashInString = res_data.cash_sum.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')
          this.uzcardInString = res_data.card_sum.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')
          this.humoInString = res_data.humo_sum.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')
          this.clickInString = res_data.click_sum.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')
          this.onlineInString = res_data.online_sum.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ')
        }
        

      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
        return false;
      }
    },
    close(){
      this.$emit('close')
    },
    async payed(){
      try{
        const res = await fetch(this.$store.state.hostname + '/PosChecks/closeKassaByAuthId?pos_auth_id=' +  localStorage.AuthId);
        const res_data = await res.json();
        console.log(res_data)
        this.getAllSumm();
        this.$emit('close')
        

      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
        return false;
      }
    }
  },
}
</script>

<style lang="scss">
  .addProductQtyAcceptCash{
    position: fixed;
    display: flex;
    justify-content: center;
    top:0;
    left:0;
    width: 100%;
    height: 100vh;
    background: rgba(37, 37, 54, 0.65);
    z-index: 1111;
    animation-name: example1;
    animation-duration: 0.4s;
  }
  .acceptBox{
    width:500px;
    height: 100%;
    background: snow;
    box-shadow: 3px 2px 5px rgb(129, 129, 129);
    border-radius: 5px;
    position: relative;
    animation-name: example;
    animation-duration: 0.4s;
  }
  @keyframes example {
    0%   { left:0px; top:-100px; opacity: 0;}

    100% { left:0px; top:0px; opacity: 1;}
  }
  // @keyframes example1 {
  //   0%   {  opacity: 0;}

  //   100% {  opacity: 1;}
  // }
</style>