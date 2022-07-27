<template>
  <div class="checkShow " style="z-index: 1000;" v-on:click.self="close"> 
    <div style="position: absolute; top:5px; right:10px;" >
      <mdb-btn color="info" style="font-size:11px; padding: 8px 25px;" @click="checkPrint" class="m-0  mt-1 w-100" > {{'print'}}</mdb-btn>
    </div>
    <div  id="printForm"  class="ckeck_main bg-white border" >
      <div  style="text-align:center; margin: 10px 0; padding: 5px 7px; font-size:12px;">
        <h5 style="font-size:13px; font-weight:bold;" class="paymentCheckPrintCheck">Pharmaceuticals</h5>
      </div>
      <div class="infoHeader" style="width:100%;">
        <div style="margin: 5px 0px;">
          <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
            <span style="font-size:11.5px; font-weight:bold;" class="paymentCheckPrintCheck">Кассир </span>
            <span style="font-size: 12px; font-weight:bold;" class="paymentCheckPrintCheck">{{kassir}}</span>
          </div>
        </div>
        <div style="margin: 5px 0px;">
          <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
            <span style="font-size:11.5px; font-weight:bold;" class="paymentCheckPrintCheck">Напечатан </span>
            <span style="font-size: 12px; font-weight:bold;" class="paymentCheckPrintCheck">{{dateTime}}</span>
          </div>
        </div>
      </div>
      <div class="infoList">
        <table style=" width:100%;">
          <thead>
            <tr style="border-bottom: 0.5px solid #CED4DA;">
              <th class="paymentCheckPrintCheck" style="font-weight: bold; font-size:11.5px; "><span>{{$t('name')}}</span></th>
              <th class="paymentCheckPrintCheck" style="font-weight: bold; font-size:11.5px;  text-align: left"><span>{{$t('soni')}}</span></th>
              <th class="paymentCheckPrintCheck" style="font-weight: bold; font-size:11.5px; text-align: left"><span>{{$t('price')}}</span></th>
              <th class="paymentCheckPrintCheck" style="font-weight: bold; font-size:11.5px; text-align: right"><span>{{$t('total')}}</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in get_zakaz_product_all_list[get_page_savat]" :key="i" style="border-bottom: 0.5px solid #CED4DA;">
              <td class="paymentCheckPrintCheck" style="font-weight:bold; text-align: left; font-size:11.5px;"><span>{{item.name}}</span></td>
              <td class="paymentCheckPrintCheck" style="font-weight:bold; text-align: left; font-size:11.5px;"><span>{{item.qty + ' / ' + item.qty_in_pack}}</span></td>
              <td class="paymentCheckPrintCheck" style="font-weight:bold; text-align: left; font-size:11.5px;"><span>{{item.real_sum}}</span></td>
              <td class="paymentCheckPrintCheck" style="font-weight:bold; text-align: right; font-size:11.5px;"><span>{{item.summ}}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="border-bottom: 1px dashed black;">
        <!-- ******************************************************************************************** -->
      </div>

      <div style="margin: 5px 0px;">
        <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
          <span style="font-size:11.5px; font-weight:bold;" class="paymentCheckPrintCheck">{{$t('total')}} </span>
          <span style="font-size: 11.5px; font-weight:bold;" class="paymentCheckPrintCheck">{{get_all_summa[get_page_savat]}}</span>
        </div>
      </div>
      <div style="border-bottom: 1px dashed black;">
        <!-- ******************************************************************************************** -->
      </div>
      <!-- <div style="margin: 5px 0px;">
        <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
          <span style="font-size: 12.5px; font-weight:bold;" class="paymentCheckPrintCheck">Итого к оплате: </span>
          <span style="font-size: 12.5px; font-weight:bold;" class="paymentCheckPrintCheck">{{get_all_summa[get_page_savat]}}</span>
        </div>
      </div> -->
      <div style="border-bottom: 1px dashed black;">
        <!-- ******************************************************************************************** -->
      </div>

      <div style="margin: 10px 10px 0px 10px; display:flex; justify-content:center;">
          <span style="font-size: 12.5px; font-weight:bold;">****************************************** </span>
      </div>
      <div style="margin: 0px 10px; display:flex; justify-content:center;">
          <span style="font-size: 12.5px; font-weight:bold;" class="paymentCheckPrintCheck">Контакты:  </span>
      </div>
      <div style="margin: 5px 10px; display:flex; justify-content:center;">
          <span style="font-size: 12.5px; font-weight:bold;" class="paymentCheckPrintCheck">+998 97 160 5555 </span>
      </div>
      <div style="margin: 5px 10px 0px 10px; display:flex; justify-content:center;">
          <span style="font-size: 12.5px; font-weight:bold;">****************************************** </span>
      </div>
      
      

      

      <div style="margin-top:15px; border:1px solid black;"></div>
     
    </div>
  </div>
</template>

<script>
import {
  
  mdbBtn
} from "mdbvue";
import {mapGetters, mapMutations} from 'vuex'
export default {
  components: {
    mdbBtn
  },
  data(){
    return{
      printBtn: true,
      comp_name: localStorage.CompName,
      kassir : localStorage.fio,
      dateTime: new Date().toLocaleDateString(),
      time: new Date().toDateString,
    }
  },
  mounted(){
  },

  computed: mapGetters(['get_zakaz_product_all_list','get_page_savat', 'get_all_summa','get_page_savat']),
  methods: {
   ...mapMutations(['clear_order']),
   close(){
    this.$emit('close')
   },
   checkPrint(){
    window.print();
    this.close();
   }
  }
}
</script>

<style lang="scss" scoped>
@font-face{
  font-family: "Ubuntu";
  src: url("../../font/Ubuntu/Ubuntu-Bold.ttf")
}
.paymentCheckPrintCheck{
  font-family: 'Ubuntu';  
  font-weight: bold; 
}
span, h6 {
  font-family: 'Ubuntu';
  font-weight: bold; 

}
td, th {
  font-family: 'Ubuntu'; 
  font-weight: bold; 
}
.checkShow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(47, 47, 47, 0.9);
  display: flex;
  justify-content: center;

  .ckeck_main{
    width: 403px;
    max-height: 100%;
    overflow-y: scroll;

    .infoHeader{
      border-bottom: 1px dashed black;
      padding: 0 0px 10px 0px; 
    }
    .infoList{
      padding: 10px 0px 15px 0px; 
    }
    .totalInfo{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 20px 10px; 

    }
  }
}
</style>