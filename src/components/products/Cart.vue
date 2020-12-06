<template>
  <div id="app">
    <b-navbar class="p-4" toggleable="lg" type="light" variant="info" sticky >
      <b-container>

        <b-navbar-brand href="#"><img src="../../assets/Subtract.png" width="30" height="30" class="d-inline-block" alt="LogoFroster">
          <b class="pl-3">Froster.</b>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" class="border-0">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="x" style="color: #151D65; width:30px; height: 30px;"></b-icon>
            <b-icon v-else icon="list" style="color: #151D65; width:30px;  height: 30px;"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto text-sm-center font-weight-bold">
            <b-nav-item to="/" class="pr-3" >Home</b-nav-item>
            <b-nav-item href="" class="pr-3" active>Products</b-nav-item>
            <b-nav-item href="/" class="pr-3">About Us</b-nav-item>
            <b-nav-item-dropdown right>
              <template #button-content>
                <b-img src="../../assets/avatar.png" width="30" left class="mr-2"></b-img>
                Frumentius
              </template>
              <b-dropdown-group>
                <b-dropdown-item href="/profile" class="text-center">
                  <b-img src="../../assets/avatar.png" width="60" class="my-2 rounded-circle align-items-center"></b-img>
                  <h6 class="text-center font-weight-bold">Frumentius Daneswara</h6>
                  <p>frumentius44@gmail.com</p>
                </b-dropdown-item>
              </b-dropdown-group>
              <b-dropdown-item href="#" class="text-center">Cart</b-dropdown-item>
              <b-dropdown-item href="#" class="text-center">Edit Profile</b-dropdown-item>
              <b-dropdown-item href="#" class="text-center text-danger">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>

      </b-container>
    </b-navbar>

    <div id="cart" class="px-5 py-3">
      <h1 class=""><b>Your Cart </b></h1>
      <b-form>
        <b-row class="py-5">
          <b-col md="8" sm="8" cols="12" class="mb-4">
            <!--            card Detail Cart-->
            <b-card class="border-0 shadow rounded px-4 py-3">
              <b-row>
                <b-table
                    responsive
                    hover
                    show-empty
                    borderless
                    :items="foods"
                    :fields="fields"
                    >
                  <template #cell(price)="data" >
                    Rp. {{ formatPrice(data.value) }}
                  </template>
                  <template #cell(quantity)="data" >
<!--                    <b-button @click="plus" class="py-1 px-1 border-0"><b-icon icon="caret-up-fill"></b-icon></b-button>-->
                    <b-form-input class="mr-n5 border-0" type="number" v-model="data.item.quantity" min="1" v-bind:max="data.item.stock"></b-form-input>
<!--                    <b-button @click="minus(data.value)" class="py-1 px-1 border-0"><b-icon icon="caret-down-fill"></b-icon></b-button>-->
                  </template>
                  <template #cell(totalPrice)="data" >
                    <div hidden> {{ data.value = data.item.price * data.item.quantity }} </div>
<!--                    <div hidden> {{ totalArr.push(data.value) }} </div>-->
                    Rp. {{ formatPrice(data.value) }}
                  </template>
                  <template #cell(actions)="row">
                    <b-button id="btnDelete" variant="outline-danger" size="sm" @click="deleteProduct(row.index)" class="mr-1">
                      <b-icon icon="x" class="text-danger" ></b-icon>
                    </b-button>
                  </template>
<!--                  <template #cell(new)="data">-->
<!--                    {{ data.value = 0 }}-->
<!--                    {{ data.value = data.value + (data.item.price * data.item.quantity) }}-->
<!--                  </template>-->
                </b-table>
              </b-row>
              <hr class="py-0 pt-2">
              <b-row>
                <b-col md="3" sm="12" class="pr-3">
                  <b>Subtotal</b>
                </b-col>
                <b-col md="3" sm="12" class="pr-5">
                  Rp. {{ this.subtotal }}
                </b-col>
              </b-row>

              <b-row class="py-0 pt-2">
                <b-col md="3" sm="12" class="pr-3">
                  <b>Tax (10%)</b>
                </b-col>
                <b-col md="3" sm="12" class="pr-5">
                  Rp. {{ this.tax }}
                </b-col>
              </b-row>

              <b-row class="py-0 pt-2">
                <b-col md="3" sm="12" class="pr-3">
                  <b>Shipping Cost</b>
                </b-col>
                <b-col md="3" sm="12" class="pr-5">
                  Rp. {{ this.shipping }}
                </b-col>
              </b-row>

              <hr class="py-0 pt-2">

              <b-row class="align-middle">
                <b-col md="3" sm="12" class="pr-5">
                  <b>Total Order</b>
                </b-col>
                <b-col md="3" sm="12" class="pr-5 pb-3">
                  <b>Rp. {{ this.totalOrder }}</b>
                </b-col>
                <b-col md="6" sm="12" class="">
                  <b-button @click="checkPayment" type="submit" class="float-right py-2 px-4 btn-primary border-0 font-weight-bold" style="background-color:#151D65;border-radius: .5rem; ">Checkout</b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <!--            card Location-->
          <b-col md="4" sm="4" cols="12" class="mb-4">
            <b-row class="px-2">
              <b-card class="border-0 shadow rounded px-4 py-3">
                <h4 class="py-2 pb-3"><b>Location</b></h4>

                <b-form-row>
                  <b-form-group class="pr-3">
                    <b-form-select v-model="selectedRegency" :options="optionsRegency"
                        style="
                        background-color: #F6F6F6!important;
                        border: 1px solid #f6f6f6;
                        border-radius: .5rem !important;"></b-form-select>
                  </b-form-group>
                  <b-form-group class="" v-if="this.selectedRegency == null">
                    <b-form-select v-model="selectedSubdistrict" :options="optionsBantul"
                        style="
                        background-color: #F6F6F6!important;
                        border: 1px solid #f6f6f6;
                        border-radius: .5rem !important;"></b-form-select>
                  </b-form-group>
                  <b-form-group class="" v-if="this.selectedRegency == 'bantul'">
                    <b-form-select v-model="selectedSubdistrict" :options="optionsBantul"
                        style="
                        background-color: #F6F6F6!important;
                        border: 1px solid #f6f6f6;
                        border-radius: .5rem !important;"></b-form-select>
                  </b-form-group>
                  <b-form-group class="" v-if="this.selectedRegency == 'gunungKidul'">
                    <b-form-select v-model="selectedSubdistrict" :options="optionsGunungKidul"
                        style="
                        background-color: #F6F6F6!important;
                        border: 1px solid #f6f6f6;
                        border-radius: .5rem !important;"></b-form-select>
                  </b-form-group>
                  <b-form-group class="" v-if="this.selectedRegency == 'kulonProgo'">
                    <b-form-select v-model="selectedSubdistrict" :options="optionsKulonProgo"
                        style="
                        background-color: #F6F6F6!important;
                        border: 1px solid #f6f6f6;
                        border-radius: .5rem !important;"></b-form-select>
                  </b-form-group>
                  <b-form-group class="" v-if="this.selectedRegency == 'sleman'">
                    <b-form-select v-model="selectedSubdistrict" :options="optionsSleman"
                          style="
                          background-color: #F6F6F6!important;
                          border: 1px solid #f6f6f6;
                          border-radius: .5rem !important;"></b-form-select>
                  </b-form-group>
                  <b-form-group class="" v-if="this.selectedRegency == 'yogyakarta'">
                    <b-form-select v-model="selectedSubdistrict" :options="optionsYogyakarta"
                          style="
                          background-color: #F6F6F6!important;
                          border: 1px solid #f6f6f6;
                          border-radius: .5rem !important;"></b-form-select>
                  </b-form-group>
                </b-form-row>

                <b-form-row>
                  <b-textarea placeholder="Address"></b-textarea>
                </b-form-row>
                <hr class="pt-3">
                <b-form-row class="pt-3">
                  <b-col md="6" sm="12" cols="12">
                    <h6><b>Shipping Cost</b></h6>
                  </b-col>
                  <b-col md="6" sm="12" cols="12">
                    <div hidden>{{ shippingCost() }}</div>
                    <h6>Rp. {{ this.shipping }}</h6>
                  </b-col>
                </b-form-row>
              </b-card>
            </b-row>

<!--            card payment-->
            <b-row class="col-12 py-4 px-2">
              <b-card class="border-0 shadow rounded px-4 py-3">
                <h4 class="py-2"><b>Payment</b></h4>

                <b-form-row class="pl-0 pb-3 pt-3">
                  <b-form-group>
                      <b-form-radio-group id="radio-group-1" v-model="selectedRadio">
                        <b-form-radio id="visa" value="visa">
                          <b-img class="py-3 px-3 border-1" :src="require('../../assets/visa-logo.svg')"></b-img>
                        </b-form-radio>
                        <b-form-radio value="takeAway">
                          <h6 class="py-3 px-3 my-0"><b>Take Away</b></h6>
                        </b-form-radio>
                      </b-form-radio-group>
                  </b-form-group>
                </b-form-row>

                <div v-if="selectedRadio == 'visa'">
                  <b-form-row class="pt-2">
                    <b-input-group class="mb-3">
                      <b-input-group-prepend is-text class="text">
                        <b-icon icon="person-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Card Holder Name"></b-form-input>
                    </b-input-group>

                    <b-input-group class="mb-3">
                      <b-input-group-prepend is-text class="text">
                        <b-icon icon="credit-card-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Card Number (XXX-XXX-XXX-XXX)"></b-form-input>
                    </b-input-group>
                  </b-form-row>

                  <b-form-row class="pt-2">
                    <b-col md="6" class="mb-2 pl-0">
                      <b-input-group class="mb-3">
                        <b-input-group-prepend is-text class="text">
                          <b-icon icon="credit-card-fill"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input type="text" placeholder="CVC (XXX)" pattern="^[0-9]" minlength="3" maxlength="3"></b-form-input>
                      </b-input-group>
                    </b-col>
                    <b-col md="6" class="mb-2 pr-0">
                      <b-input-group class="mb-3">
                        <b-form-datepicker id="datepicker" v-model="dateExpired" class="mb-2" style="color: inherit"></b-form-datepicker>
                      </b-input-group>
                    </b-col>
                  </b-form-row>
                </div>
                <div v-if="selectedRadio=='takeAway'">
                  <p class="text-muted">
                    Please pay and take the goods max. 1 hour at our store after you place order
                  </p>
                </div>
              </b-card>
            </b-row>
          </b-col>
        </b-row>

      </b-form>
    </div>

    <div id="footer" class="pt-5">
      <footer class="footer static p-4 text-white" style="background-color: #151d65; bottom: 0">
        <b-container>
          <img src="../../assets/logo-reversed.png" width="30" height="30" class="d-inline-block align-middle" alt="logo-froster">
          <span class="d-inline-block align-middle pl-3"><b>Froster.</b></span>
          <div id="socmed" class="d-inline-block float-right" >
            <a href="https://www.facebook.com/" class="align-middle pr-3" style="text-decoration: none; color: white;"><img src="../../assets/fb.png" height="16"></a>
            <a href="https://www.instagram.com/" class="align-middle pr-3" style="text-decoration: none; color: white;"><img src="../../assets/ig.png" height="16"></a>
            <a href="https://www.twitter.com/" class="align-middle pr-3" style="text-decoration: none; color: white;"><img src="../../assets/tw.png" height="16"></a>
          </div>
        </b-container>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Cart",
    data(){
      return {
        fields:[
          { key: 'name', sortable:true},
          { key: 'price', sortable:true},
          { key: 'quantity', sortable:true},
          { key: 'totalPrice', sortable:true},
          { key: 'actions' },
        ],
        foods:[
          { name: 'Champs Chicken Ball', price: 20000, quantity: 2, totalPrice: 0, stock:23 },
          { name: 'Fiesta Chicken Nuggets', price: 40000, quantity: 3, totalPrice: 0, stock:52 },
        ],
        selectedRadio:'visa',
        optionsPayment:[

        ],
        options:[
          {value: null, text: 'Please select an Regency'}
        ],
        optionsRegency: [
          { value: null, text: 'Please select an Regency' },
          { value: 'bantul', text: 'Bantul' },
          { value: 'gunungKidul', text: 'Gunung Kidul' },
          { value: 'kulonProgo', text: 'Kulon Progo' },
          { value: 'sleman', text: 'Sleman' },
          { value: 'yogyakarta', text: 'Yogyakarta' },
        ],
        optionsBantul: [
          { value: null, text: 'Please select an Sub District' },
          { value: 'banguntapan', text: 'Banguntapan' },
          { value: 'jetis', text: 'Jetis' },
          { value: 'pleret', text: 'Pleret' },
          { value: 'bambanglipuro', text: 'Bambanglipuro' },
          { value: 'sewon', text: 'Sewon' },
          { value: 'imogiri', text: 'Imogiri' },
          { value: 'kretek', text: 'Kretek' },
          { value: 'sanden', text: 'Sanden' },
          { value: 'srandakan', text: 'Srandakan' },
          { value: 'sedayu', text: 'Sedayu' },
          { value: 'pandak', text: 'Pandak' },
          { value: 'pajangan', text: 'Pajangan' },
          { value: 'kasihan', text: 'Pajangan' },
          { value: 'piyungan', text: 'Piyungan' },
          { value: 'bantul', text: 'Bantul' },
          { value: 'pundong', text: 'Pundong' },
          { value: 'dlingo', text: 'Dlingo' },


        ],
        optionsGunungKidul: [
          { value: null, text: 'Please select an Sub District' },
          {value : "gedangsari", text: 'Gedangsari'},
          {value : "girisubo" , text:'Girisubo'},
          {value : "karangmojo" , text:'Karangmojo'},
          {value : "ngawen" , text: "Ngawen"},
          {value : "nglipar" , text: "Nglipar"},
          {value : "paliyan" , text: "Paliyan"},
          {value : "panggan" , text: "Panggang"},
          {value : "patuk" , text:" Patuk"},
          {value : "playen" , text:" Playenn"},
          {value : "ponjong" , text: "Ponjong"},
          {value : "purwosari" , text: "Purwosari"},
          {value : "rongkop" , text: "Rongkop"},
          {value : "semanu" , text: "Semanu"},
          {value : "semin" , text:" Semin"},
          {value : "anjungsari" , text: "anjungsari"},
          {value : "tepus" , text: "Tepus"},
          {value : "wonosari" , text: "Wonosari"},
        ],
        optionsKulonProgo: [
          { value: null, text: 'Please select an Sub District' },
          { value: 'progo', text: 'Progo' },
        ],
        optionsSleman: [
          { value: null, text: 'Please select an Sub District' },
          { value: 'babarsari', text: 'Babarsari' },
        ],
        optionsYogyakarta: [
          { value: null, text: 'Please select an Sub District' },
          { value: 'yogyakarta', text: 'Yogyakarta' },
        ],
        selectedRegency: null,
        selectedSubdistrict: null,
        i:0,
        subtotal: 0,
        shipping: 0,
        tax: 0,
        totalOrder: 0,
        totalArr:[],
        dateExpired: null,
      }
    },
    mounted:function(){
      this.makeToast() //method will execute at pageload
    },
    watch:{

    },
    methods: {
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      getTotal () {
        var i = 0
        while (i<this.foods.length)
        {
          this.foods.totalPrice[i] = this.foods.price * this.foods.quantity
          this.totalArr.push({items: this.foods.totalPrice[i]})
        }
        console.log(this.foods.length)
      },
      checkPayment(){

      },
      shippingCost(){
        if (this.selectedRegency == 'yogyakarta')
          this.shipping = 1000
        else if (this.selectedRegency == 'bantul')
          this.shipping = 2000
        else if (this.selectedRegency == 'sleman')
          this.shipping = 2000
        else if (this.selectedRegency == 'gunungKidul')
          this.shipping = 6000
        else if (this.selectedRegency == 'kulonProgo')
          this.shipping = 5000
        else
          this.shipping = 0
      },
      deleteProduct(index) {
        console.log(index)
        this.$delete(this.foods,index)
      },
      quantityChange(value){
        this.foods.quantity = value
        this.foods.totalPrice = this.foods.quantity * this.foods.price
      },
      plus(){
        if(this.foods.stock>this.quantity)
        {
          this.foods.quantity++
        }
      },
      minus(value){
        if (value>1)
        {
          value--
          this.foods.quantity--
        }
      },
      makeToast(){
        this.$bvToast.toast('Your Product Has Added To Cart', {
          title: `ADD SUCCESS`,
          variant: 'success',
          toaster: 'b-toaster-top-center',
          solid: true,
          headerClass : 'text-center',
          bodyClass : 'text-center'
        })
      }
    },
  }
</script>

<style scoped>
  .rounded {
    border-radius: 1rem!important;
  }
  ::v-deep table {
    color:#151D65 ;
  }
  .mr-n5, .mx-n5 {
    margin-right: -8rem!important;
  }
  ::v-deep .table td, .table th {
    vertical-align: middle;
  }
  /*dropdown sewaktu udah login*/
  ::v-deep .dropdown-menu {
    border: none !important;
    border-radius: .5rem !important;
    background-color: #f2f5f7 !important;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
  }
  ::v-deep .dropdown-item {
    color:#151D65 ;
  }
  ::v-deep .dropdown-item:hover {
    background-color: #dcdeec !important;
  }
  ::v-deep #datepicker:hover{
    background-color: #ffff !important;
  }
  ::v-deep #btnDelete:hover{
    transform: scale(1.05);
    background-color:transparent !important;
  }
  ::v-deep #btnDelete{
    transition: 0.3s ease-in-out;;
  }
  #cart .form-control {
    background-color: #F6F6F6!important;
    color: #151d65;
    border: 1px solid #f6f6f6;
    border-radius: .5rem !important;
  }
</style>