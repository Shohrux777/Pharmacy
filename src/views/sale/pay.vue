<template>
  <div>
    <loader v-if="loading"/>
    <div v-else class="pay bg-white">
      <div class="payheader border">
        <div style="width:150px; cursor:pointer;" class="d-flex align-items-center px-2">
          <div @click="closePay">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            <small class="font-weight-bold">Cancel</small>
          </div>
        </div>
        <div style="width:100%;" class="d-flex align-items-center justify-content-center">
          <small class="font-weight-bold"> Order: 45465</small> 
        </div>
      </div>
      <div class="payBody d-flex border">
        <div class="payNumber container border">
          <div class="row mt-5">
            <div class="col-6 ">
              <div class="card numClick py-4 d-flex align-items-center justify-content-center"><h2 class="">100 000</h2></div>
            </div>
            <div class="col-6 ">
              <div class="card numClick py-4 d-flex align-items-center justify-content-center"><h2 class="">200 000</h2></div>
            </div>
          </div>
          <div class="row mt-2">
            <div v-for="item in number" :key="item" class="col-4 ">
              <div class="card numClick mt-2 py-4 d-flex align-items-center justify-content-center"><h2 class="">{{item}}</h2></div>
            </div>
            <div class="col-4 mt-2">
              <div class="card numClick py-4 d-flex align-items-center justify-content-center"><h2 class="">.</h2></div>
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
        <div class="payOrderPayed container " style="position: relative;">
          <div class="subtotal px-5">
            <h2 style="font-size: 25px;" class="m-0 p-0 py-4 font-weight-bold">Subtotal: <span class="ml-2">{{totalName}} </span></h2>
          </div>
          <div class="payInputs  px-5">
            <div  class="rounded d-flex brSucActive" >
              <div style="width: 150px;" class="d-flex align-items-center ml-2">
                <span style="font-size: 14px;" class="text-success">Total</span>
              </div>
              <div style="width: 100%;">
                <input type="number" dir="rtl" ref="total" disabled  v-model="total" style="width: 100%; background: #fff; height: 45px; font-size:20px; font-weight: bold; outline:none; border:none; ">
              </div>
              <div style="width: 50px;" class=" d-flex align-items-center justify-content-center"> <h5 class="m-0 text-success">$</h5></div>
            </div>
          </div>

          <div class="payInputs  px-5 mt-4">
            <div @click="totalClicked" class="rounded d-flex" :class="{'brSiple': !totalActive, 'brActive': totalActive}">
              <div style="width: 150px;" class="d-flex align-items-center ml-2">
                <span style="font-size: 14px;" :class="{'text-dark': !totalActive, 'text-primary': totalActive}">Sum</span>
              </div>
              <div style="width: 100%;">
                <input type="number" dir="rtl" ref="total"  @keypress="sumPress($event)" @keyup="sumZdachi"  @blur="totalBlur" @keyup.tab="totalClicked" v-model="getSumm" style="width: 100%; background: #fff; height: 45px; font-size:20px; font-weight: bold; outline:none; border:none; ">
              </div>
              <div style="width: 50px;" class=" d-flex align-items-center justify-content-center"> <h5 class="m-0 text-primary">$</h5></div>
            </div>
          </div>

          <div class="d-flex justify-content-end mr-5 mt-3 align-items-center text-danger">
            <h4>Zdachi: </h4>  <h3 class="ml-4">{{zdachi}}</h3>
          </div>
    
    
    
          <form v-on:submit.prevent="submit">
            <div class="payInputs mt-4 pt-4 px-5">
              <div @click="cashClicked" class="rounded d-flex" :class="{'brSiple': !cashActive, 'brActive': cashActive, 'brDanger': cashDanger}">
                <div style="width: 150px;" class="d-flex align-items-center ml-2">
                  <span style="font-size: 14px;" :class="{'text-dark': !cashActive, 'text-primary': cashActive}"><i class="fas fa-money-bill-alt text-success mr-1"></i> Cash</span>
                </div>
                <div style="width: 100%;">
                  <input type="number" dir="rtl" ref="cash" v-model="cash" step="any" min="0" @keypress="cashPress($event)" @blur="cashBlur" @keyup.tab="cashClicked" style="width: 100%; height: 45px; font-size:20px; font-weight: bold; outline:none; border:none;">
                </div>
                <div style="width: 50px;" class=" d-flex align-items-center justify-content-center"> <h5 class="m-0 text-primary">$</h5></div>
              </div>
              <div class="text-right" v-show="paychanging != 0">
                  <p class="p-0 m-0 mt-2 text-danger" style="font-size:14px;">Changing price: {{paychanging}}</p>
              </div>
              <div @click="cardClicked" class="rounded d-flex mt-2" :class="{'brSiple': !cardActive, 'brActive': cardActive, 'brDanger': cardDanger}">
                <div style="width: 150px;" class="d-flex align-items-center ml-2">
                  <span style="font-size: 14px;" :class="{'text-dark': !cardActive, 'text-primary': cardActive}"><i class="fas fa-credit-card text-warning mr-1"></i> Card</span>
                </div>
                <div style="width: 100%;">
                  <input type="number" dir="rtl" ref="card" v-model="card" step="any" min="0" @blur="cardBlur" @keypress="cardPress" @keyup.tab="cardClicked" style="width: 100%; height: 45px; font-size:20px; font-weight: bold; outline:none; border:none;">
                </div>
                <div style="width: 50px;" class=" d-flex align-items-center justify-content-center"> <h5 class="m-0 text-primary">$</h5></div>
              </div>
            </div>
            <div class="status mt-5 pt-3 px-5">
              <div  class="rounded d-flex mt-3 justify-content-between" :class="{'brSiple': !status, 'brActive': status}">
                <div  class="d-flex align-items-center ml-2" style="height:45px;">
                  <span style="font-size: 14px;" :class="{'text-dark': !status, 'text-primary': status}"> Print check</span>
                </div>
            
                <div  class=" d-flex align-items-center justify-content-center"> 
                  <div class="custom-control custom-switch pr-4" >
                    <input v-model="status" type="checkbox" class="custom-control-input" id="customSwitch1" checked>
                    <label class="custom-control-label status-style " style="cursor:pointer;" for="customSwitch1"></label>
                </div>
                </div>
              </div>
            </div>
            
            <div  style="position: absolute; bottom: 20px; right: 50px; width: 250px;">
               <mdb-btn color="success" :disabled="paychanging != 0 || total == 0 || total != sumtotal" type="submit" class="m-0 px-5 w-100" style="padding: 13px 0;">Pay</mdb-btn>
            </div>
          </form>
          <div style="position: absolute; bottom: 20px; left: 50px; width: 250px;">
             <mdb-btn color="danger" class="m-0 px-5 w-100" style="padding: 13px 0;">Close payment</mdb-btn>
          </div>  
        </div>
      </div>
    </div>
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
  </div>
</template>

<script>
import {
  mdbBtn,
} from "mdbvue";
import {mapGetters, mapMutations} from 'vuex'
export default {
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,

      
      number: [1,2,3,4,5,6,7,8,9,0],
      total: 0,
      totalName: '',
      getSumm: 0,
      zdachi: 0,

      totalActive: false,
      cash: 0,
      cashActive: false,
      cashDanger: false,
      card: 0,
      cardActive: false,
      cardDanger: false,
      status: true,
      num: 0,
      sumtotal: 0,
    }
  },
  props:{
    summa:{
      type: Number,
      default: 0
    }, 
  },
  components: {
    mdbBtn
  },
  created() {
    this.$root.$refs.pay = this;
  },
  // mounted (){
  //   this.total = this.summa;
  //   this.cash = this.summa;
  // },
  methods:{
    ...mapMutations(['clear_order']),
    totalClicked(){
      this.$nextTick(function () {
        this.$refs.total.focus();
        this.totalActive = true;
        this.cashActive = false;
        this.cardActive = false;
        // this.total = '';
      })
    },
    totalBlur(){
        this.totalActive = false;
    },
    cashClicked(){
      this.$nextTick(function () {
        this.$refs.cash.focus();
        this.totalActive = false;
        this.cashActive = true;
        this.cardActive = false;
        // this.total = '';
      })
      if(this.card == this.total){
        this.card = 0;
        this.cash = this.total;
      }
      else if(this.card > this.total){
        this.cardDanger = true;
      }
      else{
        this.cash = this.total - this.card; 
      }
    },
    cashBlur(){
        this.cashActive = false;
    },
    async cashPress(){
      if(await this.cash == 0){
         this.cash = null;
      }
      
    },
    async sumPress(){
      if(await this.getSumm == 0){
         this.getSumm = null;
      }
    },
    sumZdachi(){
      this.zdachi = this.getSumm - this.total;
      console.log(this.zdachi)
    },
    cardClicked(){
      this.$nextTick(function () {
        this.$refs.card.focus();
        this.totalActive = false;
        this.cashActive = false;
        this.cardActive = true;
        // this.total = '';
      })
      if(this.cash == this.total){
          this.cash = 0;
          this.card = this.total;
        }
        else if(this.cash > this.total){
          this.cashDanger = true;
        }
        else{
          this.card = this.total - this.cash; 
        }
    },
    cardBlur(){
        this.cardActive = false;
    },
    async cardPress(){
      if(await this.card == 0){
         this.card = null;
      }
    },
    sumchange(){
      var a = this.summa.toString()
      a = a.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      this.totalName = a;
      this.total = this.summa;
      this.cash = this.summa;
      this.card = 0;
    },

    closePay(){
      this.$emit('close')
    },


    async submit(){
      if(this.total == this.sumtotal){
        var orderList = this.allOrderList.map(item => {
            return {
              // id: item.product_id,
              product_id: item.product_id,
              qty: item.qty,
              real_company_id: item.real_company_id,
              real_sum: item.real_sum,
              summ: item.summ,
              unit_price: item.unit_price,
            }
        });
        console.log('orderList')
        console.log(orderList)
        const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "summ" : this.get_all_summa[0],
            "real_company_id": localStorage.CompId,
            "card_sum": this.card,
            "cash_sum": this.cash,
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
    }


  },
  computed:{
    ...mapGetters(['allOrderList', 'get_all_summa']),
    paychanging: function(){
        var empty = 0;
        console.log(typeof(this.card))
        console.log(typeof(this.total))
        if((this.card == null || this.card == '') && this.cardActive == false){
          this.card = 0;
        }
        if((this.cash == null || this.cash == '') && this.cashActive == false){
          this.cash = 0;
        }
        var sum = parseFloat(this.card) + parseFloat(this.cash)
        this.sumtotal = sum;
        console.log(this.sumtotal)
        var diff;
        if((sum) > (this.total))
        {
          diff = (sum) - (this.total);
          return diff
        }else
        {
          this.cashDanger = false;
          this.cardDanger = false;
          return empty;
        }
      },
      
  }
}
</script>

<style lang="scss">
.pay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  .payheader{
    height: 5vh;
    display: flex;
    background: #42474e;
    color: white;
  }
  .payBody{
    height: 95vh;
    width: 100%;
    
    .payNumber{
      width: 800px;
      background: #e8e8f0;
        

      .numClick:hover{
        cursor: pointer;
        background: rgb(243, 243, 243);
        // h2{
        //   pointer-events: none;
        // }
      }
    }

    .payOrderPayed{
      width: 100%;
    }
  }
}
.brSiple{
  border: 1.5px solid #CED4DA;
}
.brActive{
  border: 1.5px solid #4285F4;
}
.brSucActive{
  border: 1.5px solid #006e00;
}
.brDanger{
  border: 1.5px solid #ff1313;
}

</style>