<template>
  <div>
    <div class="border-bottom d-flex justify-content-between">
      <router-link to="/buy">
         <h5 class="m-0 ml-4 d-flex" style="padding: 16px 0px">
            {{$t('buy')}}</h5>
      </router-link>
      <div>
         <router-link to="/buy_add/0">
            <mdb-btn color="success mt-3" m="r3" size="sm" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
      </div>
     
    </div>
    <loaderTable v-if="loading"/>
    <anyTable v-else
      :datasource="m_buy"
      @for_delete="for_delete"
      @for_edit="for_edit"
      @update_column="checklist"
      @page="page"
      @size="size"
      :applyStatus ="applyStatus"
      @for_apply="for_apply"
      @for_cancel="for_cancel"
    />
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {
  mdbIcon,
  mdbBtn,
} from "mdbvue";
import {mapActions, mapGetters, mapMutations} from 'vuex'
import anyTable from "../../components/anyTable"
export default {
  data(){
    return {
      applyStatus: true,
      modal_info: '',
      modal_status: false,
      loading: false,
      auth_id: localStorage.AuthId,
      m_buy :{
        rows: [],
        columns: [],
        col : []
      },
    }
  },
  components: {
    anyTable, mdbIcon,
    mdbBtn,
  },
  computed: mapGetters(['allBuy', 'get_pagination']),
  methods: {
    ...mapActions(['fetchBuy', 'fetchBuy_column']),
    ...mapMutations(['buy_delete_row', 'update_pagination_first']),  
    async checklist (){
        this.loading = true;
          //  await this.fetchBuy_column(this.auth_id)
          this.refresh();
        this.loading = false;
      },
      for_edit(edit_data)
      {
        this.$router.push("/buy_add/" + edit_data.id);
      },
      async for_delete(del_data,index)
      {
         const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/PosInvoices/" + del_data.id, requestOptions);
          const data = await response.text();

          if(response.status == 201 || response.status == 200)
          {
            this.$refs.message.success('Successfully_removed')
            this.alert_success = true;
            this.buy_delete_row(index);
          }
          else{
            this.modal_info = data;
            this.modal_status = true;
          }
      },

       async update_column()
      {
        const res = await fetch(this.$store.state.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_invoice&auth_id=' + this.auth_id);
        const data = await res.json();
         this.m_buy.col = data;
        this.m_buy.columns = data.column_default_obj.filter(obj => {return obj.status === true}).map(({name}) => name);
      },
      page(){
        this.refresh();
      },
      size(){
        this.refresh();
      },
      async refresh(){
        const res = await fetch(this.$store.state.hostname + '/PosInvoices/getPagination?page=' + this.get_pagination.page + '&size=' + this.get_pagination.size);
        const res_data = await res.json();
        console.log('res_data');
        console.log(res_data);
        await this.update_column();

        this.update_pagination_first({current_item_count: res_data.current_item_count, current_page: res_data.current_page+1, items_count: res_data.items_count});
        this.m_buy.rows = res_data.items_list;
        this.loading = false;
      },


      async for_apply(id){
        console.log('id')
        console.log(id)
        try{
          const res = await fetch(this.$store.state.hostname + '/PosInvoices/applyOrDisableBuyedProductListByInvoiceId?invoice_id=' + id + '&apply_status=true');
          const data = await res.text();
          if(res.status == 201 || res.status == 200)
            {
              this.$refs.message.success('Added_successfully')
              this.refresh();
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
      },
      async for_cancel(id){
        console.log('id')
        console.log(id)
        try{
          const res = await fetch(this.$store.state.hostname + '/PosInvoices/applyOrDisableBuyedProductListByInvoiceId?invoice_id=' + id + '&apply_status=false');
          const data = await res.text();
          if(res.status == 201 || res.status == 200)
            {
              this.$refs.message.success('Added_successfully')
              this.refresh();
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
  async mounted(){
    this.loading = true;
    this.refresh();
    // await this.fetchBuy();
    // await this.fetchBuy_column(this.auth_id);
    this.loading = false;
    if(this.$store.state.alert){
      this.$refs.message.success('Added_successfully')
      this.$store.state.alert = false
    }
  }
}
</script>

<style>

</style>