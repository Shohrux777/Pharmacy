<template>
  <div class="check" style="z-index: 1000;">
    <div  class="ckeck_main  border">
      <div  style="text-align:center; margin: 10px 0;">
        <h5>{{comp_name}}</h5>
      </div>
      <div class="infoHeader">
        <table>
          <tbody>
            <tr>
              <th  style="font-weight: bold;">Чек №</th>
              <td>{{CheckId}}</td>
            </tr>
            <tr style="padding-top:10px;">
              <th  style="font-weight: bold;">Кассир</th>
              <td>{{kassir}}</td>
            </tr>
            <tr style="padding-top:10px;">
              <th style="font-weight: bold; padding-right: 35px;">Напечатан</th>
              <td>{{dateTime}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="infoList">
        <table>
          <thead>
              <tr style="border-bottom: 0.5px solid #CED4DA;">
                <th  style="font-weight: bold; width: 135px;">{{$t('name')}}</th>
                <th  style="font-weight: bold;  width: 55px; text-align: center">{{$t('soni')}}</th>
                <th  style="font-weight: bold; width: 80px; text-align: right">{{$t('price')}}</th>
                <th  style="font-weight: bold; width: 100px; text-align: right">{{$t('total')}}</th>
              </tr>
          </thead>
          <tbody>
  
            <tr v-for="(item,i) in get_zakaz_product_all_list[get_page_savat]" :key="i" style="border-bottom: 0.5px solid #CED4DA;">
              <td>{{item.name}}</td>
              <td style="text-align: center">{{item.qty + ' / ' + item.qty_in_pack}}</td>
              <td style="text-align: right">{{item.real_sum}}</td>
              <td style="text-align: right">{{item.summ}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="totalInfo">
        <h6 style="margin:0; padding:0 5px; font-weight:bold">{{$t('total')}}</h6>
        <div style="border: 1px dashed black; width:30%;"></div>
        <h5 style="margin:0; padding:0 5px; font-weight:bold">{{get_all_summa[get_page_savat]}} <span style="font-size:15px;">Сум</span></h5>
      </div>

      <div class="totalInfo">
        <h6 style="margin:0; padding:0 10px 0 5px; font-weight:bold">К оплате</h6>
        <div style="border: 1px dashed black; width:20%;"></div>
        <h4 style="margin:0; padding:0 5px 0 10px; font-weight:bold; " >{{get_all_summa[get_page_savat]}} <span style="font-size:16.5px;">Сум</span></h4>
      </div>

      <div style="margin-top:15px; border:1px solid black;"></div>
     
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  data(){
    return{
      comp_name: localStorage.CompName,
      kkk: '',
      kassir : localStorage.fio,
      dateTime: new Date().toLocaleDateString(),
      time: new Date().toDateString,
    }
  },
  mounted(){
    window.print();
    // window.onload = function() { window.print(); window.close();}
    this.$emit('close')
    this.clear_order();
  },
  created() {
    this.$root.$refs.check = this;
  },
  computed: mapGetters(['get_zakaz_product_all_list','get_page_savat', 'get_all_summa','get_page_savat', 'CheckId']),
  methods: {
   ...mapMutations(['clear_order']),
  }
}
</script>

<style lang="scss">
.check {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;

  .ckeck_main{
    width: 400px;
    

    .infoHeader{
      border-bottom: 1px dashed black;
      padding: 0 10px 10px 10px; 
    }
    .infoList{
      padding: 10px 10px 15px 10px; 
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