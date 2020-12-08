<template>
  <div id="app">
    <b-navbar class="p-4" toggleable="lg" type="light" variant="info" sticky>
      <b-container>
        <b-navbar-brand href="#"
          ><img
            src="../../assets/Subtract.png"
            width="30"
            height="30"
            class="d-inline-block"
            alt="LogoFroster"
          />
          <b class="pl-3">Froster.</b>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" class="border-0">
          <template #default="{ expanded }">
            <b-icon
              v-if="expanded"
              icon="x"
              style="color: #151d65; width: 30px; height: 30px"
            ></b-icon>
            <b-icon
              v-else
              icon="list"
              style="color: #151d65; width: 30px; height: 30px"
            ></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto text-sm-center font-weight-bold">
            <b-nav-item to="/" class="pr-3">Home</b-nav-item>
            <b-nav-item href="/products" class="pr-3" active
              >Products</b-nav-item
            >
            <b-nav-item href="/" class="pr-3">About Us</b-nav-item>
            <b-nav-item-dropdown right>
              <template #button-content>
                <b-img
                  v-if="id === null"
                  src="../../assets/avatar.png"
                  width="30"
                  left
                  class="mr-2"
                ></b-img>
                <b-img
                  v-else
                  :src="'https://api.froster.tugasbesar.com' + form.image"
                  width="30"
                  left
                  class="mr-2"
                ></b-img>
                {{ form.name }}
              </template>
              <b-dropdown-group>
                <b-dropdown-item href="/profile" class="text-center">
                  <b-img
                    v-if="id === null"
                    src="../../assets/avatar.png"
                    width="60"
                    class="my-2 rounded-circle align-items-center"
                  ></b-img>
                  <b-img
                    v-else
                    :src="'https://api.froster.tugasbesar.com' + form.image"
                    width="60"
                    class="my-2 rounded-circle align-items-center"
                  ></b-img>
                  <h6 class="text-center font-weight-bold">
                    {{ form.name }}
                  </h6>
                  <p>{{ form.email }}</p>
                </b-dropdown-item>
              </b-dropdown-group>
              <b-dropdown-item href="/cart" class="text-center"
                >Cart</b-dropdown-item
              >
              <b-dropdown-item href="/edit-profile" class="text-center"
                >Edit Profile</b-dropdown-item
              >
              <b-dropdown-item
                href="#"
                @click="logout"
                class="text-center text-danger"
                >Sign Out</b-dropdown-item
              >
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
                  :items="order"
                  :fields="fields"
                >
                  <template #cell(harga_product)="data">
                    Rp. {{ formatPrice(data.value) }}
                  </template>
                  <template #cell(quantity)="data">
                    <!--                    <b-col md="6" sm="2">-->
                    <!-- <b-form-input
                      class="mr-n5 border-0"
                      type="number"
                      @change="updateOrder(data)"
                      v-model="data.value"
                    ></b-form-input> -->

                    <!-- +- bug karna bisa diketik -->
                    <b-input-group class="no-gutters">
                      <b-col cols="0">
                        <b-input-group-prepend class="mr-0">
                          <b-btn
                            @click="updateOrderMinus(data)"
                            variant="outline-info"
                            >-</b-btn
                          >
                        </b-input-group-prepend>
                      </b-col>
                      <b-col>
                        <b-form-input
                          type="number"
                          min="1"
                          size="sm"
                          class="mx-1 border-0"
                          readonly
                          v-model="data.value"
                        ></b-form-input>
                      </b-col>
                      <b-col cols="5">
                        <b-input-group-append class="ml-0">
                          <b-btn
                            @click="updateOrderPlus(data)"
                            variant="outline-secondary"
                            >+</b-btn
                          >
                        </b-input-group-append>
                      </b-col>
                    </b-input-group>
                    <!--                    </b-col>-->
                  </template>
                  <template #cell(total)="data">
                    <div hidden>
                      <!-- {{ (data.value = data.item.price * data.item.quantity) }} -->
                    </div>
                    <!--                    <div hidden> {{ totalArr.push(data.value) }} </div>-->
                    Rp. {{ formatPrice(data.value) }}
                  </template>
                  <template #cell(actions)="data">
                    <b-button
                      id="btnDelete"
                      variant="outline-danger"
                      size="sm"
                      @click="deleteOrder(data)"
                      class="mr-1"
                    >
                      <b-icon icon="x" class="text-danger"></b-icon>
                    </b-button>
                  </template>
                  <!--                  <template #cell(new)="data">-->
                  <!--                    {{ data.value = 0 }}-->
                  <!--                    {{ data.value = data.value + (data.item.price * data.item.quantity) }}-->
                  <!--                  </template>-->
                </b-table>
              </b-row>
              <hr class="py-0 pt-2" />
              <b-row>
                <b-col md="3" sm="12" class="pr-3">
                  <b>Subtotal</b>
                </b-col>
                <b-col md="3" sm="12" class="pr-5">
                  Rp. {{ formatPrice(this.subtotal) }}
                </b-col>
              </b-row>

              <b-row class="py-0 pt-2">
                <b-col md="3" sm="12" class="pr-3">
                  <b>Tax (10%)</b>
                </b-col>
                <b-col md="3" sm="12" class="pr-5">
                  Rp. {{ formatPrice(this.tax) }}
                </b-col>
              </b-row>

              <b-row class="py-0 pt-2">
                <b-col md="3" sm="12" class="pr-3">
                  <b>Shipping Cost</b>
                </b-col>
                <b-col md="3" sm="12" class="pr-5">
                  Rp. {{ formatPrice(this.shipping) }}
                </b-col>
              </b-row>

              <hr class="py-0 pt-2" />

              <b-row class="align-middle">
                <b-col md="3" sm="12" class="pr-5">
                  <b>Total Order</b>
                </b-col>
                <b-col md="3" sm="12" class="pr-5 pb-3">
                  <b>Rp. {{ formatPrice(this.grantTotal) }}</b>
                </b-col>
                <b-col md="6" sm="12" class="">
                  <b-button
                    @click="checkPayment"
                    class="float-right py-2 px-4 btn-primary border-0 font-weight-bold"
                    style="background-color: #151d65; border-radius: 0.5rem"
                    >Checkout</b-button
                  >
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
                    <b-select v-model="selectedRegency">
                      <option v-for="regions in region" :key="regions.region" 
                      @click="readDistrict(regions.region)">
                        {{ regions.region }}
                      </option>
                    </b-select>
                  </b-form-group>

                  <b-form-group class="pr-3" >
                    <b-select v-if="selectedRegency!=null" >
                      <option v-for="(value,index) in subDistrict" :key="index" @click="updateShipping(value)"
                      >
                        {{value.sub_district}}
                      </option>
                    </b-select>
                  </b-form-group>
                  <!-- <b-form-group class="" v-if="this.selectedRegency == null"> -->
                  <!-- <b-form-select
                      v-model="selectedSubdistrict"
                      :options="optionsBantul"
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group
                    class=""
                    v-if="this.selectedRegency == 'bantul'"
                  >
                    <b-form-select
                      v-model="selectedSubdistrict"
                      :options="optionsBantul"
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group
                    class=""
                    v-if="this.selectedRegency == 'gunungKidul'"
                  >
                    <b-form-select
                      v-model="selectedSubdistrict"
                      :options="optionsBantul"
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group
                    class=""
                    v-if="this.selectedRegency == 'kulonProgo'"
                  >
                    <b-form-select
                      v-model="selectedSubdistrict"
                      :options="optionsBantul"
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group
                    class=""
                    v-if="this.selectedRegency == 'sleman'"
                  >
                    <b-form-select
                      v-model="selectedSubdistrict"
                      :options="optionsBantul"
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group
                    class=""
                    v-if="this.selectedRegency == 'yogyakarta'"
                  >
                    <b-form-select
                      v-model="selectedSubdistrict"
                      :options="optionsBantul"
                    ></b-form-select>
                  </b-form-group> -->
                </b-form-row>

                <b-form-row>
                  <b-textarea placeholder="Address"></b-textarea>
                </b-form-row>
                <hr class="pt-3" />
                <b-form-row class="pt-3">
                  <b-col md="6" sm="12" cols="12">
                    <h6><b>Shipping Cost</b></h6>
                  </b-col>
                  <b-col md="6" sm="12" cols="12">
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
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="selectedRadio"
                    >
                      <b-form-radio id="visa" value="visa">
                        <b-img
                          class="py-3 px-3 border-1"
                          :src="require('../../assets/visa-logo.svg')"
                        ></b-img>
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
                      <b-form-input
                        type="text"
                        placeholder="Card Holder Name"
                      ></b-form-input>
                    </b-input-group>

                    <b-input-group class="mb-3">
                      <b-input-group-prepend is-text class="text">
                        <b-icon icon="credit-card-fill"></b-icon>
                      </b-input-group-prepend>
                      <b-form-input
                        type="text"
                        placeholder="Card Number (XXX-XXX-XXX-XXX)"
                      ></b-form-input>
                    </b-input-group>
                  </b-form-row>

                  <b-form-row class="pt-2">
                    <b-col md="6" class="mb-2 pl-0">
                      <b-input-group class="mb-3">
                        <b-input-group-prepend is-text class="text">
                          <b-icon icon="credit-card-fill"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                          type="text"
                          placeholder="CVC (XXX)"
                          pattern="^[0-9]"
                          minlength="3"
                          maxlength="3"
                        ></b-form-input>
                      </b-input-group>
                    </b-col>
                    <b-col md="6" class="mb-2 pr-0">
                      <b-input-group class="mb-3">
                        <b-form-datepicker
                          id="datepicker"
                          v-model="dateExpired"
                          class="mb-2"
                        ></b-form-datepicker>
                      </b-input-group>
                    </b-col>
                  </b-form-row>
                </div>
                <div v-if="selectedRadio == 'takeAway'">
                  <p class="text-muted">
                    Please pay and take the goods max. 1 hour at our store after
                    you place order
                  </p>
                </div>
              </b-card>
            </b-row>
          </b-col>
        </b-row>
      </b-form>
    </div>

    <div id="footer" class="pt-5">
      <footer
        class="footer static p-4 text-white"
        style="background-color: #151d65; bottom: 0"
      >
        <b-container>
          <img
            src="../../assets/logo-reversed.png"
            width="30"
            height="30"
            class="d-inline-block align-middle"
            alt="logo-froster"
          />
          <span class="d-inline-block align-middle pl-3"><b>Froster.</b></span>
          <div id="socmed" class="d-inline-block float-right">
            <a
              href="https://www.facebook.com/"
              class="align-middle pr-3"
              style="text-decoration: none; color: white"
              ><img src="../../assets/fb.png" height="16"
            /></a>
            <a
              href="https://www.instagram.com/"
              class="align-middle pr-3"
              style="text-decoration: none; color: white"
              ><img src="../../assets/ig.png" height="16"
            /></a>
            <a
              href="https://www.twitter.com/"
              class="align-middle pr-3"
              style="text-decoration: none; color: white"
              ><img src="../../assets/tw.png" height="16"
            /></a>
          </div>
        </b-container>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      kabupaten: null,
      id: null,
      token: null,
      load: false,
      snackbar: false,
      error_message: "",
      fields: [
        { key: "nama_product", sortable: true },
        { key: "harga_product", sortable: true },
        { key: "quantity", sortable: true },
        { key: "total", sortable: true },
        { key: "actions" },
      ],
      user: new FormData(),
      users: [],
      uOrder: new FormData(),
      form: {
        name: null,
        email: null,
        password: null,
        newPassword: null,
        confirmPassword: null,
        image: null,
      },
      deleteId: "",
      editId: "",
      foods: [
        {
          name: "Champs Chicken Ball",
          price: 200000,
          quantity: 2,
          totalPrice: 0,
          new: 0,
        },
        {
          name: "Fiesta Chicken Nuggets",
          price: 40000,
          quantity: 3,
          totalPrice: 0,
          new: 0,
        },
      ],
      selectedRadio: "visa",
      optionsPayment: [],
      options: [{ value: null, text: "Please select an Regency" }],
      optionsRegency: [
        { value: null, text: "Please select an Regency" },
        { value: "bantul", text: "Bantul" },
        { value: "gunungKidul", text: "Gunung Kidul" },
        { value: "kulonProgo", text: "Kulon Progo" },
        { value: "sleman", text: "Sleman" },
        { value: "yogyakarta", text: "Yogyakarta" },
      ],
      optionsBantul: [
        { value: null, text: "Please select an Sub District" },
        { value: "bantul", text: "Bantul" },
        { value: "gunungKidul", text: "Gunung Kidul" },
        { value: "kulonProgo", text: "Kulon Progo" },
        { value: "sleman", text: "Sleman" },
        { value: "yogyakarta", text: "Yogyakarta" },
      ],
      optionsGunungKidul: [
        { value: null, text: "Please select an Sub District" },
        { value: "bantul", text: "Bantul" },
        { value: "gunungKidul", text: "Gunung Kidul" },
        { value: "kulonProgo", text: "Kulon Progo" },
        { value: "sleman", text: "Sleman" },
        { value: "yogyakarta", text: "Yogyakarta" },
      ],
      optionsKulonProgo: [
        { value: null, text: "Please select an Sub District" },
        { value: "bantul", text: "Bantul" },
        { value: "gunungKidul", text: "Gunung Kidul" },
        { value: "kulonProgo", text: "Kulon Progo" },
        { value: "sleman", text: "Sleman" },
        { value: "yogyakarta", text: "Yogyakarta" },
      ],
      optionsSleman: [
        { value: null, text: "Please select an Sub District" },
        { value: "bantul", text: "Bantul" },
        { value: "gunungKidul", text: "Gunung Kidul" },
        { value: "kulonProgo", text: "Kulon Progo" },
        { value: "sleman", text: "Sleman" },
        { value: "yogyakarta", text: "Yogyakarta" },
      ],
      optionsYogyakarta: [
        { value: null, text: "Please select an Sub District" },
        { value: "bantul", text: "Bantul" },
        { value: "gunungKidul", text: "Gunung Kidul" },
        { value: "kulonProgo", text: "Kulon Progo" },
        { value: "sleman", text: "Sleman" },
        { value: "yogyakarta", text: "Yogyakarta" },
      ],
      selectedRegency: null,
      selectedSubdistrict: null,
      i: 0,
      subtotal: 0,
      shipping: 0,
      tax: 0,
      grantTotal: 0,
      totalArr: [],
      dateExpired: null,
      order: [],
      orders: null,
      ongkir: [],
      region: null,
      subDistrict:null,
      transaksi: new FormData(),
    };
  },
  methods: {
    updateShipping(value){
      this.shipping=value.harga_ongkir
      this.readDataOrder();
    },
    readDataOrder() {
      ///tinggal hapus local storage di set pas login
      var url = this.$api + "/orderuser/" + localStorage.getItem("id");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.order = response.data.data;
          this.setPrice(this.order);
          //console log bisa dihapus nnti kalo dah kelar
          // console.log(this.order);
        });
    },
   readDataRegion() {
      ///tinggal hapus local storage di set pas login
      var url = this.$api + "/showregion";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.region = response.data.data;
          console.log(this.selectedRegency);
        });
    },
     readDistrict(region) {
       console.log(region)

      var url = this.$api + "/showdistrict/"+region;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.subDistrict = response.data;
                 console.log(this.shipping);
        }
        );
    
    },
    // readDataOngkir() {
    //   var url = this.$api + "/showdistrict/" + this.region;
    //   this.$http
    //     .get(url, {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response.data.data);
    //       this.ongkir = response.data.data;
    //       // this.setRegion(this.region);
    //       //console log bisa dihapus nnti kalo dah kelar
    //       // console.log(this.ongkir);
    //     });
    // },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getTotal() {
      var i = 0;
      while (i < this.foods.length) {
        this.foods.totalPrice = this.foods.price * this.foods.quantity;
        this.totalArr.push({ items: this.foods.totalPrice[i] });
      }
      console.log(this.foods.length);
    },
    updateOrderMinus(data) {
      this.orders = data.item;
      if (this.orders.quantity > 1) {
        this.uOrder.append("nama_product", this.orders.nama_product);
        this.uOrder.append("harga_product", this.orders.harga_product);
        this.uOrder.append("quantity", -1);
        this.uOrder.append("id_user", this.orders.id_user);
        this.uOrder.append("id_product", this.orders.id_product);
        console.log(this.uOrder);

        var url = this.$api + "/order";
        this.load = true;
        this.$http
          .post(url, this.uOrder, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.readDataOrder();
            // this.close();
            // this.readData(); //mengambil data
            // this.resetForm();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },
    updateOrderPlus(data) {
      this.orders = data.item;

      this.uOrder.append("nama_product", this.orders.nama_product);
      this.uOrder.append("harga_product", this.orders.harga_product);
      this.uOrder.append("quantity", 1);
      this.uOrder.append("id_user", this.orders.id_user);
      this.uOrder.append("id_product", this.orders.id_product);
      console.log(this.uOrder);

      var url = this.$api + "/order";
      this.load = true;
      this.$http
        .post(url, this.uOrder, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.readDataOrder();
          // this.close();
          // this.readData(); //mengambil data
          // this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    readDataUser() {
      this.id = localStorage.getItem("id");
      console.log(this.id);
      this.token = localStorage.getItem("token");
      console.log(this.token);
      var url = this.$api + "/user/" + this.id;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.users = response.data.data;
          this.form.name = this.users.name;
          this.form.email = this.users.email;
          this.form.image = this.users.image;
        });
    },
    setPrice(order) {
      this.subtotal = 0;
      this.tax = 0;
      this.grantTotal = 0;
      for (let index = 0; index < order.length; index++) {
        this.subtotal = order[index].total + this.subtotal;
      }
      this.tax = this.subtotal * 0.1;
      this.grantTotal = this.subtotal + this.tax + this.shipping;
    },
    logout() {
      //sementara gini dlu method post logoutnya aneh :3
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      this.$router.push({
        name: "homepage",
      });
      // console.log(this.token);
      // var url = this.$api + "/logout";
      // this.$http
      //   .post(url, {
      //     headers: {
      //       Authorization: "Bearer " + this.token,
      //     },
      //   })
      //   .then((response) => {
      //     // localStorage.setItem("id", response.data.user.id); //menyimpan id user yang sedang login
      //     // localStorage.setItem("token", response.data.access_token); //menyimpan auth token
      //     // this.error_message = response.data.message;
      //     // this.color = "green";
      //     // this.snackbar = true;
      //     // this.load = false;
      //     localStorage.removeItem("token");
      //     localStorage.removeItem("id");
      //     location.reload();
      //     // this.$router.push({
      //     //   name: "products",
      //     // });
      //   })
      //   .catch((error) => {
      //     this.error_message = error.response.data.message;
      //     this.color = "red";
      //     this.snackbar = true;
      //     // localStorage.removeItem("token");
      //     this.load = false;
      //   });
      console.log(localStorage.getItem("id"));
      // console.log(localStorage.getItem("token"));
    },
    deleteOrder(data) {
      //menghapus data order
      console.log(data);
      var url = this.$api + "/order/" + data.item.id;
      //data dihapus berdasarkan id
      this.$http
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          // this.setPrice(this.order);
          this.readDataOrder(); //mengambildata
        })
        .catch((error) => {
          this.error_message = error.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    checkPayment() {
      console.log("test");
      this.transaksi.append("id_user", localStorage.getItem("id"));
      console.log(this.transaksi);

      var url = this.$api + "/transaksi";
      this.load = true;
      this.$http
        .post(url, this.transaksi, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.$router.push({
            name: "products",
          });
          // this.close();
          // this.readData(); //mengambil data
          // this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
  },
  mounted() {
    this.readDataUser();
    this.readDataOrder();
    this.readDataRegion();
  },
};
</script>

<style scoped>
.rounded {
  border-radius: 1rem !important;
}
::v-deep table {
  color: #151d65;
}
.mr-n5,
.mx-n5 {
  margin-right: -8rem !important;
}
::v-deep .table td,
.table th {
  vertical-align: middle;
}
/*dropdown sewaktu udah login*/
::v-deep .dropdown-menu {
  border: none !important;
  border-radius: 0.5rem !important;
  background-color: #f2f5f7 !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
::v-deep .dropdown-item {
  color: #151d65;
}
::v-deep .dropdown-item:hover {
  background-color: #dcdeec !important;
}
::v-deep #datepicker:hover {
  background-color: #ffff !important;
}
</style>