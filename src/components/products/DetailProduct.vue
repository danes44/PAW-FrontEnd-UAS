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
                  :src="'http://127.0.0.1:8000' + form.image"
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
                    :src="'http://127.0.0.1:8000' + form.image"
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
              <b-dropdown-item href="#" class="text-center"
                >Edit Profile</b-dropdown-item
              >
              <b-dropdown-item href="#" class="text-center text-danger"
                >Sign Out</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container>
      <div id="productList">
        <b-row>
          <b-col md="6" sm="12" cols="12" class="mb-4 pr-5">
            <b-img
              fluid
              class="rounded"
              :src="require('../../assets/' + foods.image)"
            ></b-img>
          </b-col>
          <b-col md="6" sm="12" cols="12" class="mb-4 pr-5">
            <b-row>
              <h1>
                <b>{{ foods.name }}</b>
              </h1>
            </b-row>
            <b-row class="py-2">
              <h4>Rp. {{ foods.price }}</h4>
            </b-row>
            <b-row>
              <p>{{ foods.desc }}</p>
            </b-row>
            <b-row class="pt-4">
              <b-col md="6" sm="12" cols="12" class="mb-1 px-0"> </b-col>
            </b-row>

            <b-form>
              <b-row>
                <b-col md="6" sm="12" cols="12" class="mb-4 px-0">
                  <h5><b>Stocks</b></h5>
                  <h5>{{ foods.stock }} pcs</h5>
                </b-col>
                <b-col md="6" sm="12" cols="12" class="mb-4 px-0 pr-5">
                  <h5><b>Quantity</b></h5>
                  <b-form-row>
                    <b-col md="2" sm="2" cols="2" class="mb-4 px-0">
                      <b-button @click="plus" class="py-1 px-1 border-0"
                        ><b-icon icon="caret-up-fill"></b-icon
                      ></b-button>
                    </b-col>
                    <b-col md="3" sm="2" cols="2" class="mb-4 px-1">
                      <b-form-input
                        v-model="quantity"
                        class="border-0"
                        readonly
                        value="1"
                        min="1"
                        max="3"
                        style="background-color: #f2f5f7"
                      ></b-form-input>
                    </b-col>
                    <b-col md="2" sm="2" cols="2" class="mb-4 px-0">
                      <b-button @click="minus" class="py-1 px-1 border-0"
                        ><b-icon icon="caret-down-fill"></b-icon
                      ></b-button>
                    </b-col>
                  </b-form-row>
                </b-col>
              </b-row>

              <b-row>
                <b-button
                  @click="cekAmount"
                  to=""
                  class="px-5 py-3 border-0 font-weight-bold"
                  style="background-color: #151d65; border-radius: 0.5rem"
                >
                  <b-icon icon="cart-plus-fill" class="mr-3"></b-icon>
                  Add to Cart
                </b-button>
              </b-row>
            </b-form>
          </b-col>
        </b-row>
      </div>
    </b-container>

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
import router from "@/router";

export default {
  name: "DetailProduct",
  data() {
    return {
      busy: true,
      load: false,
      snackbar: false,
      error_message: "",
      foods: {
        name: "Champs Chicken Ball",
        price: 200000,
        stock: 52,
        image: "Group 612.png",
        desc: "Delicious Beef Steak",
      },
      quantity: 1,
      user: new FormData(),
      users: [],
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
    };
  },
  methods: {
    plus() {
      if (this.foods.stock > this.quantity) {
        this.quantity++;
      }
    },
    cekAmount() {
      if (this.quantity >= 1 && this.foods.stock >= this.quantity) {
        this.foods.stock = this.foods.stock - this.quantity;
        router.push({ name: "cart" });
        console.log(this.foods.stock);
      }
    },
    minus() {
      if (this.quantity > 1) this.quantity--;
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
      console.log(localStorage.getItem("token"));
    },
  },
  mounted() {
    this.readDataUser();
  },
};
</script>

<style scoped>
.rounded {
  border-radius: 1rem !important;
}
#productList {
  padding-top: 7%;
  padding-bottom: 8%;
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
</style>