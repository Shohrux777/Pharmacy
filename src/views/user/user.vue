<template>
  <div>
    <div class="border-bottom d-flex justify-content-between">
      <router-link to="/user">
         <h5 class="m-0 ml-4 d-flex" style="padding: 16px 0px">
            {{$t('user')}}</h5>
      </router-link>
      <div>
         <router-link to="/user_add/0">
            <mdb-btn color="success mt-3" m="r3" size="sm" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
      </div>
     
    </div>
    <loaderTable v-if="loading"/>
    <anyTable v-else
      :datasource="allUser"
      @for_delete="for_delete"
      @for_edit="for_edit"
      @update_column="checklist"
      :userLock="true"
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
      modal_info: '',
      modal_status: false,
      loading: false,
      auth_id: localStorage.AuthId
    }
  },
  components: {
    anyTable, mdbIcon,
    mdbBtn,
  },
  computed: mapGetters(['allUser']),
  methods: {
    ...mapActions(['fetchUser', 'fetchUser_column']),
    ...mapMutations(['user_delete_row']),
    async checklist (){
        this.loading = true;
           await this.fetchUser_column(this.auth_id)
        this.loading = false;
      },
      for_edit(edit_data)
      {
        this.$router.push("/user_add/" + edit_data.id);
      },
      async for_delete(del_data,index)
      {
         const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/PosUsers/" + del_data.id, requestOptions);
          const data = await response.text();

          if(response.status == 201 || response.status == 200)
          {
            this.$refs.message.success('Successfully_removed')
            this.alert_success = true;
            this.user_delete_row(index);
          }
          else{
            this.modal_info = data;
            this.modal_status = true;
          }
      },
  },
  async mounted(){
    this.loading = true;
    await this.fetchUser();
    await this.fetchUser_column(this.auth_id);
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