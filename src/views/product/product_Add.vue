<template>
  <div>
    
    <div class="border-bottom ">
      <router-link to="/product">
         <h5 class="m-0 ml-3 d-flex" style="padding: 16px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('New_product')}}</h5>
      </router-link>
     
    </div>
   
    <productAdd/>
    
  </div>
</template>

<script>
import productAdd from "../../components/add_product.vue";

export default {
  naem: "companyAdd",
  
  data(){
    return{}
  },
  components: {
    productAdd
  },
  
  
}
</script>




