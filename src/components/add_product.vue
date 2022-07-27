<template>
  <div>
    <loader v-if="loading"/>
    <div class="user_add py-3 px-4 ">
      <form >
        <mdb-row>
          <mdb-col col="2">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('name')}}</p>
          </mdb-col>
          <mdb-col col="6"> 
            <mdb-input class="m-0 p-0" v-model="fullname" size="md"  outline  group type="text" validate error="wrong" disabled success="right"/>
            <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.fullname.$dirty && !$v.fullname.required" >
              {{$t('name_invalid_text')}}
            </small>
            <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_company_name_to_chek')}}
            </small>
          </mdb-col>
        </mdb-row> 
        <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('product')}}</p>
          </mdb-col>
          <mdb-col col="6">
              <div class="border border-primary rounded priceCode px-1 py-3 mt-2">       
                <div class="custom-control custom-radio pb-3">
                  <!-- <label >
                    <span style="margin-left:5px; font-size: 12px; color: gray;"></span></label> -->
                </div>

                <div >
                  <div class="shCode mx-3 " style=" position: relative; margin-bottom:37px;">  
                    <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                      {{$t('sale_name')}}
                    </small>
                    <div>
                      <mdb-input class="m-0 p-0"  size="sm" v-model="name" @input="fullNameChange"  outline  group type="text" validate error="wrong" success="right"/>
                    </div>
                      <small class="invalid-text " style="margin-left:5px; margin-top:-6px;"  v-if="$v.name.$dirty && !$v.name.required" >
                        {{$t('name_invalid_text')}}
                      </small>
                  </div>


                  <div class="d-flex " style="width:100%;">

                    <div class="shCode mx-3" style="width:50%; position: relative;">
                      <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                        {{$t('dozirofka')}}
                      </small>
                      <div  >
                        <mdb-input class="m-0 p-0" v-model="dozirovka" size="sm" @input="fullNameChange"  outline  group type="text" validate error="wrong" success="right"/>
                      </div>
                    </div>

                    <div class="code mx-3" style="width:50%; position: relative;" >
                      <mdb-input class="m-0 p-0" v-model="Fvip" size="sm" @input="fullNameChange"   outline  group type="text" validate error="wrong" success="right"/>
                      <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                        {{$t('product_type_str')}}
                      </small>
                    </div>

                  </div>

                  <div class="d-flex mt-3" style="width:100%;">

                    <div class="shCode mx-3" style="width:50%; position: relative;">
                      <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                        {{$t('qtydrag')}}
                      </small>
                      <div  >
                        <mdb-input class="m-0 p-0" v-model="numberDrag" size="sm" @input="fullNameChange"  outline  group type="text" validate error="wrong" success="right"/>
                      </div>
                    </div>

                    <div class="code mx-3" style="width:50%; position: relative;" >
                      <erpSelect
                        size="sm"
                        :options="allMeasurment.rows"  
                        @select="selectOptionMeasur"
                        :selected="measurment_name"
                        :label="$t('measurment')"
                        @addTag="addTagMeasurment"
                        @removeTag="removeTagMeasurment"

                      />
                      <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                        {{$t('measurment')}}
                      </small>
                      <small v-if="$v.measurment_name.$dirty && measurment_id == null" class="invalid-text  ml-2" style="margin-top:-4px;" >
                        {{$t('select_item')}}
                      </small>
                    </div>

                  </div>


                
                </div>
              </div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('category')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
              <erpSelect
                :options="allCategory.rows"  
                @select="selectOption"
                :selected="category_name"
                :label="$t('category')"
                @addTag="addTagcategory"
                @removeTag="removeTagcategory"

              />
              <small v-if="$v.category_name.$dirty && category_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-0" style="font-size: 14px;">{{$t('manifacturer_name')}}</p>
          </mdb-col>
          <mdb-col col="5"> 
            <mdb-input class="m-0 p-0" v-model="manufacture" size="md"  outline  group type="text" validate error="wrong" success="right"/>
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </mdb-col>
        </mdb-row>

        <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-0" style="font-size: 14px;">{{$t('global_name')}}</p>
          </mdb-col>
          <mdb-col col="5"> 
            <mdb-input class="m-0 p-0" v-model="internationalName" size="md"  outline  group type="text" validate error="wrong" success="right"/>
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </mdb-col>
        </mdb-row>
        <!-- <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('brend')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
              <erpSelect
                :options="allBrend.rows"  
                @select="selectOptionBrend"
                :selected="brend_name"
                :label="$t('brend')"
              />
              <small v-if="$v.brend_name.$dirty && brend_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small>
          </mdb-col>
        </mdb-row> -->

        <mdb-row class="pt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('price_code')}}</p>
          </mdb-col>
          <mdb-col col="6" style="position: relative;" >
               <!-- Single product -->
              <div class="border border-primary rounded priceCode px-1 py-2 mt-2">       
              <div class="custom-control custom-radio pb-3">
                <input type="radio" class="custom-control-input" @change="single_p_change" id="one" value="1" v-model="single_product" >
                <label class="custom-control-label" for="one">Single 
                  <span style="margin-left:5px; font-size: 12px; color: gray;">(один вид товара)</span></label>
              </div>

              <div v-if="single_product == 1" >
                <div scope="row" v-for="(data,rowIndex) in datasource.product_info" :key="rowIndex">
                  <div class="d-flex mt-2" style="width:100%;">
                  <div class="shCode mx-3" style="width:80%; position: relative;">
                    
                    <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                      {{$t('barcode')}}
                    </small>
                    <div scope="row" v-for="(data_shk,row_index) in datasource.product_info[rowIndex].barcodeList" :key="row_index">
                      <mdb-input class="m-0 p-0" v-model="data_shk.barcode" size="sm"  outline  group type="text" validate error="wrong" success="right"/>
                    </div>

                    <a @click="add_barecode(rowIndex)" style="color: blue; padding-left:5px; font-size: 12px;" >
                      {{$t('add')}}
                    </a>

                  </div>
                  <div class="code mx-3" style="width:20%; position: relative;" >
                    <mdb-input class="m-0 p-0" v-model="data.code" size="sm"  outline  group type="text" validate error="wrong" success="right"/>
                    <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                      {{$t('code')}}
                    </small>
                  </div>
                </div>
                <div class="d-flex mt-4" style="width:100%;">
                  <div class="shCode mx-3" style="width:30%; position: relative;">
                    <mdb-input class="m-0 p-0" v-model="data.price" @input="priceChange(data.price,rowIndex)" size="sm"  outline  group type="number" validate error="wrong" success="right"/>
                    <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                      {{$t('price')}}
                    </small>
                    <small class="" style="color: gray; position:absolute; top: 0px; right: -22px; font-size: 20px;" >
                      +
                    </small>
                  </div>
                  <div class="code ml-3 mr-4" style="width:20%; position: relative;" >
                    <mdb-input class="m-0 p-0" v-model="data.percentage" @input="precentChange(data.percentage,rowIndex)" size="sm"  outline  group type="number" validate error="wrong" success="right"/>
                    <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                      {{$t('precent')}}
                    </small>
                    <small class="" style="color: gray; position:absolute; top: 5px; right: -13px; font-size: 13px;" >
                      %
                    </small>
                    <small class="" style="color: gray; position:absolute; top: 0px; right: -33px; font-size: 20px;" >
                      =
                    </small>
                  </div>
                  <div class="code mx-3" style="width:34%; position: relative;" >
                    <mdb-input class="m-0 p-0" v-model="data.buyed_price" @input="buyedChange(data.buyed_price,rowIndex)" size="sm"  outline  group type="number" validate error="wrong" success="right"/>
                    <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                      {{$t('buyed_price')}}
                    </small>
                  </div>
                </div>
                </div>
                
              </div>
              </div>
                  <!-- Multiple product -->
              <div class="border border-primary rounded priceCode px-1 py-2 mt-2">
                <div class="custom-control custom-radio pb-3">
                  <input type="radio" class="custom-control-input" @change="single_p_change" id="two" value="0" v-model="single_product" >
                  <label class="custom-control-label " for="two" >Multiple
                    <span style="margin-left:5px; font-size: 12px; color: gray;">(несколько видов товара)</span>
                  </label>
                </div>
                <div v-if="single_product != 1">
                    <div scope="row" v-for="(data,rowIndex) in datasource.product_info" :key="rowIndex">
                      <div class="d-flex mt-2" style="width:100%;" v-if="rowIndex != 0">
                        <div class="shCode mx-3 w-100 pb-2" style="position: relative;" >
                          <mdb-input class="m-0 p-0"  v-model="data.name" size="sm"  outline  group type="text" validate error="wrong" success="right"/>
                          <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                            {{$t('name')}}
                          </small>

                          <a @click="deleteRow(rowIndex)" 
                            style="color: red; position:absolute; top:-19px; right:5px; font-size: 12px; " >
                            Delete
                          </a>

                        </div>
                      </div>
                     <div class="d-flex mt-2" style="width:100%;">
                      <div class="shCode mx-3" style="width:80%; position: relative;">
                        <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                          {{$t('barcode')}}
                        </small>
                        <div scope="row" v-for="(data_shk,row_index) in datasource.product_info[rowIndex].barcodeList" :key="row_index">
                          <mdb-input class="m-0 p-0" v-model="data_shk.barcode" size="sm"  outline  group type="text" validate error="wrong" success="right"/>
                        </div>

                        <a @click="add_barecode(rowIndex)" style="color: blue; padding-left:5px; font-size: 12px;" >
                          {{$t('add')}}
                        </a>
                      </div>
                      <div class="code mx-3" style="width:20%; position: relative;" >
                        <mdb-input class="m-0 p-0" v-model="data.code" size="sm"  outline  group type="text"  error="wrong" success="right"/>
                        <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                          {{$t('code')}}
                        </small>
                      </div>
                      </div>
                      <div class="d-flex mt-4" style="width:100%;">
                        <div class="shCode mx-3" style="width:30%; position: relative;">
                          <mdb-input class="m-0 p-0" v-model="data.price" @input="priceChange(data.price,rowIndex)" size="sm"  outline  group type="number" validate error="wrong" success="right"/>
                          <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                            {{$t('price')}}
                          </small>
                          <small class="" style="color: gray; position:absolute; top: 0px; right: -22px; font-size: 20px;" >
                            +
                          </small>
                        </div>
                        <div class="code ml-3 mr-4" style="width:20%; position: relative;" >
                          <mdb-input class="m-0 p-0" v-model="data.percentage" @input="precentChange(data.percentage,rowIndex)" size="sm"  outline  group type="number" validate error="wrong" success="right"/>
                          <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                            {{$t('precent')}}
                          </small>
                          <small class="" style="color: gray; position:absolute; top: 5px; right: -13px; font-size: 13px;" >
                            %
                          </small>
                          <small class="" style="color: gray; position:absolute; top: 0px; right: -33px; font-size: 20px;" >
                            =
                          </small>
                        </div>
                        <div class="code mx-3" style="width:34%; position: relative;" >
                          <mdb-input class="m-0 p-0" v-model="data.buyed_price" @input="buyedChange(data.buyed_price,rowIndex)" size="sm"  outline  group type="number" validate error="wrong" success="right"/>
                          <small class="" style="color: gray; position:absolute; top:-19px; left:5px; font-size: 12px;" >
                            {{$t('buyed_price')}}
                          </small>
                        </div>
                      </div>

                      <div class="blue-gradient">
                        <hr class="mt-3 mb-5 "/>
                      </div>
                    
                    </div>
                    <!-- Add product -->
                      <div class="d-flex mt-2" style="width:100%;">
                        <div class="shCode mx-3 w-100 mt-2" style="position: relative;" >
                          <a @click="addRow" 
                            style="color: blue; position:absolute; top:-19px; left:5px; font-size: 13px;" >
                            Add product
                          </a>
                        </div>
                      </div>
                </div>
              </div>
          </mdb-col>
        </mdb-row>

        <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('picture')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
            <div class="d-flex justify-content-start align-items-center">
              <!-- v-show="!PicShow" -->
              <div class="user_img" v-show="!PicShow" style="position: relative;">
                <img  :src="image" id="prewImage" style="height: 150px;" class="img-fluid img-thumbnail img-responsive shadow" alt="">
                <div @click="delImage">
                  <svg xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x border p-1" style="border-radius:50%;
                    position: absolute; top:8px; right: 8px; cursor:pointer;" width="25" height="25" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </div>
            </div>
            <input hidden  id="inputFileToLoad" @change="previewFile()" accept="image/png, image/gif, image/jpeg" type="file" ref="file_Img" class="shadow text-right ml-2"  />
              <label for="inputFileToLoad" class="download">
                <span>{{$t('download...')}}</span>
              </label>
          </mdb-col>
        </mdb-row>


        <!-- <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('productTag')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
              <erpSelect
                :options="allProductTag.rows"  
                @select="selectOptionTag"
                :selected="productTag_name"
                :label="$t('productTag')"
              />
              <small v-if="$v.productTag_name.$dirty && productTag_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small>
          </mdb-col>
        </mdb-row> -->
        <!-- <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('productType')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
              <erpSelect
                :options="allProductType.rows"  
                @select="selectOptionType"
                :selected="productType_name"
                :label="$t('productType')"
              />
              <small v-if="$v.productType_name.$dirty && productType_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small>
          </mdb-col>
        </mdb-row> -->


        <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-0" style="font-size: 14px;">{{$t('minqty')}}</p>
          </mdb-col>
          <mdb-col col="3"> 
            <mdb-input class="m-0 p-0" v-model="minqty" size="md"  outline  group type="number" validate error="wrong" success="right"/>
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </mdb-col>
        </mdb-row> 

        <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-0" style="font-size: 14px;">{{$t('tax_number')}}</p>
          </mdb-col>
          <mdb-col col="3"> 
            <mdb-input class="m-0 p-0" v-model="taxNumber" size="md"  outline  group type="text" validate error="wrong" success="right"/>
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </mdb-col>
        </mdb-row>

        <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-0" style="font-size: 14px;">{{$t('')}}</p>
          </mdb-col>
          <mdb-col col="6"> 
            <div class="d-flex">
              <div class="custom-control custom-switch  pl-5">
                <input v-model="retsipturniy" type="checkbox" class="custom-control-input " id="customSwitch1" checked>
                <label class="custom-control-label status-style" for="customSwitch1">{{$t('retsepniy')}}</label>
              </div>
              <div class="custom-control custom-switch  pl-5 ml-5 ">
                <input v-model="spravochniy" type="checkbox" class="custom-control-input " id="customSwitch2" checked>
                <label class="custom-control-label status-style" for="customSwitch2">{{$t('spravichniy')}}</label>
              </div>
            </div>
            
          </mdb-col>
        </mdb-row>
        
        <!-- <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-0" style="font-size: 14px;">{{$t('end_time')}}</p>
          </mdb-col>
          <mdb-col col="3"> 
            <mdb-input type="date" class="m-0 p-0" size="sm" v-model="End_time" outline/>
          </mdb-col>
        </mdb-row>  -->
        <mdb-row class="mt-4">
          <mdb-col col="2">
            <p class="p-0 m-0 mt-0" style="font-size: 14px;">{{$t('note')}}</p>
          </mdb-col>
          <mdb-col col="6"> 
            <mdb-input class="m-0 p-0" v-model="note" size="md"  outline  group type="textarea" :rows="5" validate error="wrong" success="right"/>
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </mdb-col>
        </mdb-row>

        

        
        <div class="blue-gradient">
          <hr class="mt-5 "/>
        </div>
        <mdb-row class="mt-4">
            <mdb-col col="4">
            </mdb-col>
          <mdb-col col="8">
        <div class="mt-2 text-right">
          <mdb-btn v-if="props_name == ''"  @click="submit_continue" size="sm" color="primary" m="r3" style="font-size: 10.5px"
            p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
          </mdb-btn>
          <mdb-btn color="success" size="sm" @click="submit" style="font-size: 10.5px"
            p="r4 l4 t2 b2">
            <mdb-icon  />{{$t('add')}}</mdb-btn>
        </div>
          </mdb-col>
        </mdb-row>
        
      </form>
      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
    </div>
  </div>
</template>

<script>
import erpSelect from "../components/erpSelectAdd.vue";
import { mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, } from "mdbvue"
import {mapActions,mapGetters} from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  naem: "companyAdd",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,

      name: '',
      fullname: '',
      dozirovka: '',
      Fvip: '',
      numberDrag: '1',
      taxNumber: '',
      manufacture: '',
      internationalName: '',
      retsipturniy: false,
      spravochniy: true,
      category_name: '',
      category_id: null,
      note: '',
      // brend_name: '',
      // brend_id: null,
      measurment_name: '',
      measurment_id: null,
     
      reg_code: '1',
      minqty: 10,
      single_product : 1,
      Start_time: null,
      // End_time: '2025-06-01',
     
      // productTag_name: '',
      // productTag_id: null,
      // productType_name: '',
      // productType_id: null,
      
      PicShow: true,
      base64: '',
      image: '',
      last_product : {
          name : '',
          id : null
      },
      datasource :
        {
          product_info :[]
        }
    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, erpSelect
  },
  validations: {
      name: {
        required
      },
      fullname: {required},
      category_name : {required},
      measurment_name: {required}
      // brend_name : {required},
      // productTag_name : {required},
      // productType_name : {required}
    },
     props :
    {
      props_name : {
        type : String,
        default : ''
      },
      
    },

    async created()
    {
      if(this.props_name.length > 0)
      {
          this.name = this.props_name; 
          this.id = 0;
          this.PicShow = true;
         return 
      }
      if(this.id > 0)
      {
        this.datasource.product_info.push({
            name: '',
            price: null,
            code: '',
            buyed_price: null,
            percentage: null,
            barcodeList : [],
            id: 0,
            main_product_id: 0,
        }) 
        const res = await fetch(this.$store.state.hostname + '/PosProducts/' + this.id);
        const data = await res.json();
        console.log('test barcode for')
        console.log(data)
        this.fullname = data.name;
        this.name = data.sale_name;
        this.dozirovka = data.dozirofka;
        this.Fvip = data.product_type_str;
        this.numberDrag = data.contains_number_in_pack;
        this.taxNumber = data.tax_number;
        this.manufacture = data.manifacturer_name;
        this.internationalName = data.global_name;
        this.retsipturniy = data.retsepniy;
        this.spravochniy = data.spravichniy;
        this.measurment_name = data.measurment.name;
        this.measurment_id = data.measurment.id;
        this.category_name = data.category.name;
        this.category_id = data.category.id;
        this.barcode = data.barcode
        this.reg_code = data.product_reg_code
        this.image = this.$store.state.server_ip +  data.image
        this.base64 = data.image
        this.PicShow = false;
        this.note = data.note;
        this.End_time = data.updated_date_time.slice(0,10)
        console.log(this.datasource.product_info[0].barcodeList)
        if(data.subProductList.length == 0){
          console.log('single')
           this.datasource.product_info[0].name = '';
           this.datasource.product_info[0].price = data.price;
           this.datasource.product_info[0].percentage = data.percentage;
           this.datasource.product_info[0].buyed_price = data.buyed_price;
           this.datasource.product_info[0].code = data.code
           if(data.barcodeList.length>0){
             for(let k=0; k<data.barcodeList.length; k++){
               let barcod = {barcode :null, id: 0, product_id: 0};
                this.datasource.product_info[0].barcodeList.push(barcod)
               console.log(data.barcodeList[k].barcode)
                this.datasource.product_info[0].barcodeList[k].barcode = data.barcodeList[k].barcode
                this.datasource.product_info[0].barcodeList[k].id = data.barcodeList[k].id
             }
           }
           else{
            let barcod = {barcode :null, id: 0, product_id: 0};
            this.datasource.product_info[0].barcodeList.push(barcod)
           }
        }else{
          console.log('pingking')
          this.single_product = 0;
            this.datasource.product_info[0].name = '';
           this.datasource.product_info[0].price = data.price;
           this.datasource.product_info[0].percentage = data.percentage;
           this.datasource.product_info[0].buyed_price = data.buyed_price;
           this.datasource.product_info[0].code = data.code
           this.datasource.product_info[0].id = data.id
           this.datasource.product_info[0].main_product_id = data.id
           this.datasource.product_info[0].barcodeList[0].barcode = data.barcodeList[0].barcode
           this.datasource.product_info[0].barcodeList[0].id = data.barcodeList[0].id
           this.datasource.product_info[0].barcodeList[0].product_id = data.barcodeList[0].product_id
          
          for(let i=0; i< data.subProductList.length; i++){
            this.datasource.product_info.push({
                name: '',
                price: null,
                code: '',
                buyed_price: null,
                percentage: null,
                barcodeList : [{barcode :null, id: 0, product_id: 0}],
                id: 0,
                main_product_id: 0,
            })
            this.datasource.product_info[i+1].name = data.subProductList[i].name
            this.datasource.product_info[i+1].price = data.subProductList[i].price
            this.datasource.product_info[i+1].percentage = data.subProductList[i].percentage
            this.datasource.product_info[i+1].buyed_price = data.subProductList[i].buyed_price
            this.datasource.product_info[i+1].code = data.subProductList[i].code
            this.datasource.product_info[i+1].id = data.subProductList[i].id
            this.datasource.product_info[i+1].main_product_id = data.subProductList[i].main_product_id
            this.datasource.product_info[i+1].barcodeList[0].barcode = data.barcodeList[0].barcode
           this.datasource.product_info[i+1].barcodeList[0].id = data.barcodeList[0].id
           this.datasource.product_info[i+1].barcodeList[0].product_id = data.barcodeList[0].product_id
          }
          console.log( 'this.datasource.product_info')
          console.log( this.datasource.product_info)
        }
        
      }
      else{
        this.addRow();
      }
      
    },

    async mounted(){
      await this.fetchCategory();
      if(this.allCategory.rows.length>0){
        this.category_name = this.allCategory.rows[0].name
        this.category_id = this.allCategory.rows[0].id
      }
      await this.fetchMeasurment();
      if(this.allMeasurment.rows.length>0){
        this.measurment_name = this.allMeasurment.rows[0].name
        this.measurment_id = this.allMeasurment.rows[0].id
      }
      // await this.fetchBrend();
      // await this.fetchProductTag();
      // await this.fetchProductType();
    },
    computed: mapGetters(['allCategory', 'allMeasurment']),
  methods:{
    ...mapActions(['fetchCategory', 'fetchMeasurment']),
    selectOption(option){
      this.category_name = option.name 
      this.category_id = option.id
    },
    selectOptionMeasur(option){
      this.measurment_name = option.name  
      this.measurment_id = option.id
    },
    fullNameChange(){
      this.fullname = this.name + ' ' + this.dozirovka + ' ' + this.Fvip + ' №' + this.numberDrag;
    },
    deleteRow(i){
      if(this.id>0){
        console.log(this.datasource.product_info[i])
      }else{
        this.datasource.product_info.splice( parseInt(i), 1)
      }
    },
     addRow() {
            this.datasource.product_info.push({
              name: '',
              price: null,
              code: '',
              buyed_price: null,
              percentage: null,
              barcodeList : [{barcode :null, id: 0, product_id: 0}],
              id: 0,
              main_product_id: 0,
          })  
          
            //  console.log(this.datasource.product_info[0].barcodeList)
        },
      add_barecode(index)
      {
        this.datasource.product_info[index].barcodeList.push({
          barcode :null
        })

      },

        single_p_change()
        {
          this.datasource.product_info = []
          this.addRow();

        },

    // selectOptionBrend(option){
    //   this.brend_name = option.name
    //   this.brend_id = option.id
    // },
    // selectOptionTag(option){
    //   this.productTag_name = option.name
    //   this.productTag_id = option.id
    // },
    // selectOptionType(option){
    //   this.productType_name = option.name
    //   this.productType_id = option.id
    // },
    delImage(){
      this.base64 = ''
      this.PicShow = true
      this.image = ''
    },
    priceChange(data,index){
      this.datasource.product_info[index].buyed_price = parseInt(data) +
       (parseInt(data) * parseInt(this.datasource.product_info[index].percentage))/100
    },
    precentChange(data,index){
      this.datasource.product_info[index].buyed_price = parseInt(this.datasource.product_info[index].price)
       + (parseInt(this.datasource.product_info[index].price) * parseInt(data))/100
    },
    buyedChange(data,index){
      var a = parseInt(data) - parseInt(this.datasource.product_info[index].price);
      this.datasource.product_info[index].percentage = (a*100)/parseInt(this.datasource.product_info[index].price)
    },
    
    async previewFile(){
      const preview = document.getElementById('prewImage');
        const file = document.querySelector('input[type=file]').files[0];
        this.PicShow = true;
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        this.image =  reader.result;
        preview.src = reader.result;
      }, true);
      if (file) {
          this.PicShow = false
        reader.readAsDataURL(file);
      }
    },
    cls_wnd()
      {
        this.name = '';
        this.category_name = '';
        this.category_id = null;
        // this.brend_name = '';
        // this.brend_id = null;
        this.barcode = null;
        this.price = null;
        this.code = '';
        this.buyed_price = null;
        this.percentage = null;
        this.reg_code = '';
        // this.productTag_name = '';
        // this.productTag_id = null;
        // this.productType_name = '';
        // this.productType_id = null;
        this.PicShow = true;
        this.base64 = '';
        this.image = '';
      },
    save_data :  async function(){
      console.log('this.End_time')
      console.log(this.End_time + 'T00:00:00.000Z')
        var img = document.getElementById('prewImage');
        if(img.src.slice(0,4) != 'http'){
          this.base64 = img.src;
        }
        console.log('this.datasource.product_info')
        console.log(this.datasource.product_info)
        if(this.$v.$invalid)
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
        
          const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "id" : this.id,
              "real_company_id" : localStorage.CompId,
              "name": this.fullname,
              "bot_name":  this.fullname,
              "print_name":  this.fullname,
              "sale_name":  this.name,
              "contains_number_in_pack": this.numberDrag,
              "dozirofka": this.dozirovka,
              "product_type_str": this.Fvip,
              "global_name": this.internationalName,
              "manifacturer_name": this.manufacture,
              "tax_number": this.taxNumber,
              "retsepniy": this.retsipturniy,
              "spravichniy": this.spravochniy,
              "code": this.datasource.product_info[0].code,
              "price": this.price,
              "buyed_price": this.buyed_price,
              "image": this.base64,
              "min_qty": this.minqty,
              "subProductList" : this.datasource.product_info,
              "category_id": this.category_id,
              "unitmeasurment_id" : this.measurment_id,
              "barcode": this.datasource.product_info[0].barcodeList[0].barcode,
              "info": this.note,
              "publisher_name": "",
              "note": this.note,
            })
          };
            console.log(requestOptions.body);
            try{
              this.loading = true;
              const response = await fetch(this.$store.state.hostname + "/PosProducts", requestOptions);
              const data = await response.json();
            
              this.loading = false;
              if(response.status == 201 || response.status == 200)
              {
                this.$refs.message.success('Added_successfully')
                this.last_product.name = data.name;
                this.last_product.id=data.id;
                return true;
              }
              else{
                this.modal_info = data;
                this.modal_status = true;
                return false;
              }
            }
            catch{
              this.loading = false;
              this.modal_info = this.$i18n.t('network_ne_connect'); 
              this.modal_status = true;
            }
    },
    async submit()
      {
        if(await this.save_data())
        {
          this.$store.state.alert = true;

          if(this.props_name.length > 0)
          {
               this.$emit('close_product',this.last_product)
          }
          else
            this.$router.push("/product");
        }

      },
    async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push('/product_add/0')
            this.cls_wnd();
          }
          else{
            this.cls_wnd();
          }
        }
      },

      async addTagcategory(name){
        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "name" : name,
              "real_company_id": localStorage.CompId,
              "id": 0
            })
          };
          try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/PosCategories", requestOptions);
            const data = await response.text();
            this.loading = false;
            if(response.status == 201 || response.status == 200)
            {
              this.$refs.message.success('Added_successfully')
              await this.fetchCategory();
              return true;
            }
            else{
              this.modal_info = data;
              this.modal_status = true;
              return false;
            }
          }
          catch{
            this.loading = false;
            this.modal_info = this.$i18n.t('network_ne_connect'); 
            this.modal_status = true;
          }
      },
      async removeTagcategory(id){
        const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/PosCategories/" + id, requestOptions);
          const data = await response.text();

          if(response.status == 201 || response.status == 200)
          {
            this.$refs.message.success('Successfully_removed')
            await this.fetchCategory();
          }
          else{
            this.modal_info = data;
            this.modal_status = true;
          }
      },

      async addTagMeasurment(name){
        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "name" : name,
              "real_company_id": localStorage.CompId,
              "id": 0
            })
          };
          try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/PosProductUnitMeasurments", requestOptions);
            const data = await response.text();
            this.loading = false;
            if(response.status == 201 || response.status == 200)
            {
              this.$refs.message.success('Added_successfully')
              await this.fetchMeasurment();
              return true;
            }
            else{
              this.modal_info = data;
              this.modal_status = true;
              return false;
            }
          }
          catch{
            this.loading = false;
            this.modal_info = this.$i18n.t('network_ne_connect'); 
            this.modal_status = true;
          }
      },
      async removeTagMeasurment(id){
        const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/PosProductUnitMeasurments/" + id, requestOptions);
          const data = await response.text();

          if(response.status == 201 || response.status == 200)
          {
            this.$refs.message.success('Successfully_removed')
            await this.fetchMeasurment();
          }
          else{
            this.modal_info = data;
            this.modal_status = true;
          }
      }
  }
}
</script>

<style lang="scss">
// .priceCode{
//   // background: rgb(248, 248, 248);
// }
.download{
  width: 35%;
  height: 33px;
  border: 0.5px solid #4285F4;
  border-radius: 4px;
  margin-top: 7px;
  display: flex;
  align-items: center;
  color: gray; 
  font-size: 13px;
  cursor:pointer;
}
.download span{
    margin-left: 10px;
}
</style>





