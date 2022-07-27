<template>
  <div>
    <div class="d-flex allContent">
      <div class=" border-right" :class="{'leftmenu': show_title, 'backleftmenu': !show_title }">
        <div class="d-flex  border-bottom pb-1 pt-1 mb-2">
          <svg v-if="show_title" xmlns="http://www.w3.org/2000/svg" @click="backMenu(!show_title)" class="icon icon-tabler icon-tabler-chevron-left leftdown" style="cursor:pointer;" width="26" height="26" viewBox="0 0 24 24" stroke-width="2" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <polyline points="15 6 9 12 15 18" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" @click="backMenu(!show_title)" class="icon icon-tabler icon-tabler-menu-2 backleftdown" width="26" height="26" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          <div  v-if="show_title" class="ml-3 pt-1 d-flex align-items-center">
            <!-- <img src="../assets/apteka1.jpg" style="height: 40px; width:100%;" class="img-fluid img-zoom" alt=""> -->
            <span style="font-size: 22px; " class="mb-1 text-white">ExtresPost</span>
          </div>
        </div>
        <div class="" v-for="(link,index) in links" :key="index" >
          <div @click="update_down(index)">
            <router-link
            tag="li" custom v-slot="{ navigate }"
            :to="link.url"
            :class="{'active_link': link.view}"
            class="text-dark d-flex py-2 menuitem"
            >
            <!-- <MDBIcon style="color: red; margin-right: 10px; padding-left: 15px;" icon="camera-retro" />
            Xodimlar -->
            <li @click="navigate" role="link">
              <div  class="icon_div" style="width:15%;">
                <mdb-icon :style="{color: link.color}" :class="{'ico': show_title, 'backico': !show_title }" :icon="link.icon" />
              </div>
              <div v-if="show_title" class="d-flex justify-content-between" style="width:85%; text-align:left">
                <p  style="padding-left: 15px;" class="m-0 text-white">{{$t(link.title)}}</p>
                <svg v-if="link.down_list.length!=0" :class="{round:link.view}" xmlns="http://www.w3.org/2000/svg" class="icon mr-3 icon-tabler icon-tabler-chevron-right" style="margin-top: 3.5px;" width="13" height="13" viewBox="0 0 24 24" stroke-width="2" stroke="#999" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="9 6 15 12 9 18" />
              </svg>
              </div>
            </li>
            </router-link>
          </div>
          <!-- dropdown -->
          <div v-if="show_title">
            <div v-show="link.view">
              <div v-for="(list,i) in link.down_list" :key="i" @click="update_down_click(i)">
                <router-link
                  tag="li" custom v-slot="{ navigate }"
                  :to="list.url"
                  :class="{'active_drop_link': list.dview}"
                  active-class="active_drop_link"
                  class="drop_down justify-content-flex-start d-flex align-items-center list-group-item-action pointer w-100"
                  > 
                  <li @click="navigate" role="link">
                    <a class="m-0 p-0 pl-2 d-flex text-white" style="font-size:12.5px;">
                      <div class="icon_div ml-4">
                      <mdb-icon :icon="list.icon" :style="{color: link.color}"  class="mr-3 icon_color"/>
                    </div>
                      {{$t(list.title)}}</a>
                  </li>
                </router-link>
              </div>
            </div>
          </div>
        <!-- /dropdown -->
        </div>
      </div>
      <div class="main  bg-white" >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { mdbIcon } from 'mdbvue';
  // import { ref } from 'vue';


  export default {
    components: {
      mdbIcon,
    },
    mounted() {
      this.show_title = localStorage.sidebar;
      console.log(this.show_title)
      console.log(localStorage.sidebar)
      this.name = localStorage.Name;
      for (let j = 0; j < this.links.length; j++) {
        if(this.links[j].url == this.$route.fullPath){
          this.links[j].view = true;
          return
        }else{
          if(this.links[j].down_list.length > 0){
            for (let k = 0; k < this.links[j].down_list.length; k++){
              if(this.links[j].down_list[k].url == this.$route.fullPath){
                this.links[j].down_list[k].dview = true;
                this.links[j].view = true;
                this.indexMain = j;
                return
              }
            }
          }
        }
      }
    },
    data() {
      return {
        name: 'sidebar',
        show_title: localStorage.sidebar,
        indexMain: -1,
        links: [

            // ............... for Market ....................
            

            { title: 'm_product', icon: 'clipboard', url: '/product', view: false, color: '#ddd', 
              down_list:[]
            },
            { title: "category", icon: 'box', url: '/category', view: false, color: '#ddd', down_list:[] },
            { title: 'sklad', icon: 'landmark', url: '/sklad', view: false, color: '#ddd', down_list:[] },
            
            { title: 'report', icon: 'user', url: '', view: false, color: '#ddd', down_list:[
                { title: "reportproduct", url: '/reportproduct', dview: false, color: '#ddd', down_list:[] },
                { title: "notLeftProduct", url: '/notLeftProduct', dview: false, color: '#ddd', down_list:[] },
                { title: "minQtyProduct", url: '/minQtyProduct', dview: false, color: '#ddd', down_list:[] },
                { title: "reportdate", url: '/reportdate', dview: false, color: '#ddd', down_list:[] },
                { title: "getCashboxesCurrentPosition", url: '/getCashboxesCurrentPosition', dview: false, color: '#ddd', down_list:[] },
                { title: "getSaledSummOfKassirListBeatweenDateReport", url: '/getSaledSummOfKassirListBeatweenDateReport', dview: false, color: '#ddd', down_list:[] },
                { title: "expired_date_left", url: '/expired_date_left', dview: false, color: '#ddd', down_list:[] },
                { title: "remaind_in_detail", url: '/remaind_in_detail', dview: false, color: '#ddd', down_list:[] },
                { title: "getMaxSaledProductsByDate", url: '/getMaxSaledProductsByDate', dview: false, color: '#ddd', down_list:[] },
                { title: "getPrixodQilinganProductsBeatweenDate", url: '/getPrixodQilinganProductsBeatweenDate', dview: false, color: '#ddd', down_list:[] },
                { title: "getSpisaniyaProductsByBeatweenDate", url: '/getSpisaniyaProductsByBeatweenDate', dview: false, color: '#ddd', down_list:[] },
                { title: "getVozvratProductsByBeatweenDate", url: '/getVozvratProductsByBeatweenDate', dview: false, color: '#ddd', down_list:[] },
                { title: "getVozvratFromClientsProductsByBeatweenDate", url: '/getVozvratFromClientsProductsByBeatweenDate', dview: false, color: '#ddd', down_list:[] },
            ] },
           { title: 'Expense', icon: 'clipboard', url: '', view: false, color: '#ddd', down_list:[
                { title: "retunSpisaniya", url: '/retunSpisaniya', dview: false, color: '#ddd', down_list:[] },
                { title: "retunContragent", url: '/retunContragent', dview: false, color: '#ddd', down_list:[] },
                { title: "retunGetFromClientBack", url: '/retunGetFromClientBack', dview: false, color: '#ddd', down_list:[] },

            ] },
            // { title: 'optom', icon: 'clipboard', url: '', view: false, color: '#ddd', down_list:[
            //     { title: "debitor", url: '/debitor', dview: false, color: '#ddd', down_list:[] },

            // ] },

          

            // { title: 'statistics', icon: 'chart-pie', url: '', view: false, color: '#ddd', down_list:[
            // ] },
            { title: 'Coming', icon: 'clipboard', url: '', view: false, color: '#ddd', down_list:[
               { title: "buy", icon: 'box', url: '/buy', dview: false, color: '#ddd', down_list:[] },
          
            ] },
            { title: 'creditors', icon: 'user', url: '', view: false, color: '#ddd', down_list:[
                { title: "creditors_list", url: '/creditors_list', dview: false, color: '#ddd', down_list:[] },
          
            ] },

            { title: 'cashbox_costs', icon: 'user', url: '', view: false, color: '#ddd', down_list:[
                { title: "cashbox_costs", url: '/cashbox_costs', dview: false, color: '#ddd', down_list:[] },
          
            ] },
          
            
            { title: "sale", icon: 'shopping-basket', url: '/saled', view: false, color: '#ddd', down_list:[] },

            { title: 'menu_setting', icon: 'tools', url: '', view: false, color: '#ddd', down_list:[
                { title: "company", url: '/company', dview: false, color: '#ddd', down_list:[] },
                { title: "department", url: '/department', dview: false, color: '#ddd', down_list:[] },
                { title: "user", url: '/user', dview: false, color: '#ddd', down_list:[] },
                // { title: "client", url: '/client', dview: false, color: '#ddd', down_list:[] },
                // { title: "productTag", url: '/productTag', dview: false, color: '#ddd', down_list:[] },
                // { title: "productType", url: '/productType', dview: false, color: '#ddd', down_list:[] },
                { title: "measurment", url: '/measurment', dview: false, color: '#ddd', down_list:[] },
                // { title: "brend", url: '/brend', dview: false, color: '#ddd', down_list:[] },
            ] },
            { title: "logout", icon: 'sign-out-alt', url: '/', view: false, color: 'rgb(0, 100, 0)', down_list:[] },


            // ...............End for MArket..................

        ],
      }
    },
    created() {
        this.$root.$refs.sidebar = this;
    },
    methods: {
      update_down: function (i) {
        this.indexMain = i;
        for (let j = 0; j < this.links.length; j++) {
          if (j !== i) {
            this.links[j].view = false
            if(this.links[j].down_list.length > 0) {
              for (let k = 0; k < this.links[j].down_list.length; k++) {
                  this.links[j].down_list[k].dview = false
              }
            }
          }
        }
        this.links[i].view = true
      },
      update_down_click: function (i) {
        for (let j = 0; j < this.links[this.indexMain].down_list.length; j++) {
          if (j !== i) {
            this.links[this.indexMain].down_list[j].dview = false
          }
        }
        this.links[this.indexMain].down_list[i].dview = true
       // console.log(this.links[this.indexMain].down_list[i].dview)
      },
      backMenu(a){
        this.show_title = a
        localStorage.sidebar = this.show_title
        console.log(localStorage.sidebar)

      }
    }
  };
</script>

<style lang="scss">
*{
  font-family: 'Montserrat', sans-serif;
}
.main{
  background: #eee;
  
}
.leftmenu{
  width: 270px;
  position: sticky;
  top: 0px;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  padding: 2px 0px;
  background: #1B3446;
  font-size: 14px;
  
}
::-webkit-scrollbar {
  width: 5px;

}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.backleftmenu{
  background: #1B3446;
}
.smallleftmenu{
  width: 50px;
  position: sticky;
  top: 0px;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  padding: 2px 0px;
  background: #1B3446;
  font-size: 14px;
}
.main{
  width: 100%;
}
.allContent{
  min-height: 100vh;
}
.active_link{
  background: rgba(113, 184, 255, 0.3);
  p{
    color: #fff;
  }
  .ico{
    color: #fff;
  }
}
.active_drop_link{
  background: rgba(131, 190, 250, 0.25);
  p{
    color: #fff;
  }
  .ico{
    color: #fff;
  }
}
.menuitem:hover{
  background: rgba(113, 184, 255, 0.2);
  p{
    color: #fff;
  }
  .ico{
    color: #fff;
  }
}
.snipper{
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}
.activetext{
  cursor: pointer;
  a{
    color: #fff;
  }
  i{
    color: #fff;
  }
}
.drop_down{
  color: black;
  padding: 5px 0;
  position: relative;
  justify-content: space-between;
  a{
    flex: 1;
    color: #fff;
    font-size: 13.4px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 100;
  }
  &:hover{
    background: rgba(113, 184, 255, 0.1);
    a{
      color: #fff;
    }
    i{
      color: #fff;
    }
    transition: background-color 0.2s;
    color: black;
  }
}
.round{
  transform: rotate(90deg);
  transition: all 0.5s;
}
.back_round{
  transition: all 0.5s;
}
.ico{
  padding-left: 15px;
}
.backico{
  padding-left: 17px;
}
.leftdown{
  margin: 10px 8px;
  padding: 2px;
}
.backleftdown{
  margin: 10px 12px;
  padding: 1px;
}

</style>