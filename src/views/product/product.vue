<template>
  <div>
    <div class="border-bottom d-flex justify-content-between">
      <router-link to="/product">
         <h5 class="m-0 ml-4 d-flex" style="padding: 16px 0px">
            {{$t('product')}}</h5>
      </router-link>
      <div>
         <router-link to="/product_add/0">
            <mdb-btn color="success mt-3" m="r3" size="sm" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
      </div>
     
    </div>
    <div class="mt-4 mb-0 px-3">
      <div class="row mt-0">
        <div class="col-4">
          <mdb-input
            class="m-0 p-0"
            v-model="product_name"
            @input="SearchProductName($event)"
            size="sm"
            outline
            group
            type="text"
            validate
            error="wrong"
            success="right"
          />
          <small
            style="position: absolute; top: -10px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("name") }}</small
          >
        </div>
        <div class="col-4">
          <mdb-input
            class="m-0 p-0"
            v-model="barcode"
            @keyup.enter.native="SearchProductBarcode()"
            size="sm"
            outline
            group
            type="text"
            validate
            error="wrong"
            success="right"
          />
          <small
            style="position: absolute; top: -10px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("barcode") }}</small
          >
        </div>
      </div>
    </div>
    <loaderTable v-if="loading"/>
    <anyTable v-else class="mt-0"
      :datasource="m_product"
      @for_delete="for_delete"
      @for_edit="for_edit"
      @update_column="checklist"
      :imgFol="true"
      @page="page"
      @size="size"
     
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
  mdbInput
} from "mdbvue";
import {mapActions, mapGetters, mapMutations} from 'vuex'
import anyTable from "../../components/anyTable"
export default {
  data(){
    return {
      modal_info: '',
      modal_status: false,
      loading: false,
      auth_id: localStorage.AuthId,

      m_product :{
        rows: [],
        columns: [],
        col : []
      },
      product_name: '',
      barcode: '',
    }
  },
  components: {
    anyTable, mdbIcon,
    mdbBtn,mdbInput
  },
  computed: mapGetters(['allProduct', 'get_pagination']),
  methods: {
    ...mapActions(['fetchProduct', 'fetchProduct_column']),
    ...mapMutations(['product_delete_row', 'update_pagination_first']),
    async checklist (){
      console.log(this.auth_id)
        this.loading = true;
          //  await this.fetchProduct_column(this.auth_id)
           this.refresh();
        this.loading = false;
      },
      for_edit(edit_data)
      {
        this.$router.push("/product_add/" + edit_data.id);
      },
      async for_delete(del_data,index)
      {
         const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/PosProducts/" + del_data.id, requestOptions);
          const data = await response.text();

          if(response.status == 201 || response.status == 200)
          {
            this.$refs.message.success('Successfully_removed')
            this.alert_success = true;
            this.refresh();
          }
          else{
            this.modal_info = data;
            this.modal_status = true;
          }
      },

       async update_column()
      {
        const res = await fetch(this.$store.state.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_product&auth_id=' + this.auth_id);
        const data = await res.json();
         this.m_product.col = data;
        //  console.log(data);
        this.m_product.columns = data.column_default_obj.filter(obj => {return obj.status === true}).map(({name}) => name);
      },
       page(){
        this.refresh();
      },
      size(){
        this.refresh();
      },
      async refresh(){
        const res = await fetch(this.$store.state.hostname + '/PosProducts/getPagination?page=' + this.get_pagination.page + '&size=' + this.get_pagination.size);
        const res_data = await res.json();

        await this.update_column();

        this.update_pagination_first({current_item_count: res_data.current_item_count, current_page: res_data.current_page+1, items_count: res_data.items_count});
        this.m_product.rows = res_data.items_list;
        this.loading = false;
      },
      async SearchProductName(){
        if(this.product_name != ''){
          try{
            const res = await fetch(this.$store.state.hostname + '/PosProducts/checkProductByNameList?name=' + this.product_name);
            const res_data = await res.json();
            this.m_product.rows = res_data;
          }
          catch{
            console.log('catch')
          }
        }
        else{
          this.refresh()
        }
        
      },
      async SearchProductBarcode(){
        if(this.barcode != ''){
          try{
            const res = await fetch(this.$store.state.hostname + '/PosProducts/checkProductByBarcode?barcode=' + this.barcode);
            const res_data = await res.json();
            if(res.status == 200 || res.status == 201){
              this.m_product.rows = []
              this.m_product.rows.push(res_data);
            }
          }
          catch{
            console.log('catch')
            this.$refs.message.warning('not_found')
          }
        }
        else{
          this.refresh()
        }
      }
  },
  async mounted(){
    this.loading = true;
    this.refresh();
    // await this.fetchProduct();
    // await this.fetchProduct_column(this.auth_id);
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