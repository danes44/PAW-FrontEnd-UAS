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
            <b-nav-item href="" class="pr-3" active>Products</b-nav-item>
            <b-nav-item href="/" class="pr-3">About Us</b-nav-item>
            <b-button
              v-if="id === null"
              class="my-3 my-sm-0 px-3 font-weight-bold border-0"
              to="/login"
              style="background-color: #151d65"
              >Login</b-button
            >
            <!-- Tambahan Satria -->
            <b-nav-item-dropdown right v-else>
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
              <b-dropdown-item href="/edit-profile" class="text-center"
                >Edit Profile</b-dropdown-item
              >
              <b-dropdown-item href="#" @click="logout" class="text-center text-danger"
                >Sign Out</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <!-- Tambahan Satria -->
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container>
      <div id="productList">
        <h1 class=""><b>Our Selling Products</b></h1>

        <b-row class="py-5">
          <b-col
            md="3"
            sm="6"
            cols="12"
            class="mb-4"
            v-for="product in products"
            :key="product.nama_product"
          >
          <!-- Gambar Product masih ambil dari local host -->
            <b-card
              class="h-100 no-gutters border-0 shadow rounded overflow-hidden mr-0"
              v-bind:img-src="'http://127.0.0.1:8000' + product.gambar_product"
              style="max-width: 255px"
            >
             <!-- v-bind:img-src="require('../../assets/' + food.image)" -->
              <b-link
                @click="toDetail(product)"
                class="stretched-link"
                style="text-decoration: none; color: inherit"
              >
                <b-card-body class="p-0">
                  <b-card-text>
                    <h6 class="font-weight-bold">{{ product.nama_product }}</h6>
                    <h6 class="font-weight-bold">Rp. {{ product.harga_product }}</h6>
                    Stok : {{ product.stok_product }}
                  </b-card-text>
                </b-card-body>
              </b-link>
            </b-card>
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
export default {
  name: "Products",
  data() {
    return {
      id: null,
      token: null,
      busy: true,
      load: false,
      snackbar: false,
      error_message: "",
      foods: [
        {
          name: "Champs Chicken Ball",
          price: 200000,
          stock: 52,
          image: "Group 612.png",
        },
        {
          name: "Fiesta Chicken Nuggets",
          price: 400000,
          stock: 53,
          image: "Group 613.png",
        },
        {
          name: "Champs Chicken Sausage",
          price: 240000,
          stock: 25,
          image: "Group 616.png",
        },
        {
          name: "Fiesta Chicken Slice",
          price: 360000,
          stock: 15,
          image: "Group 619.png",
        },
        {
          name: "Fiesta Keecho",
          price: 400000,
          stock: 45,
          image: "Group 617.png",
        },
      ],
      product: new FormData(),
      products: [],
      user: new FormData(),
      users: [],
      form: {
        id:null,
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
    readData() {
      var url = this.$api + '/product'
      this.$http.get(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.products = response.data.data
        console.log(this.products);
      })
    },
    toDetail(product){
      localStorage.setItem('id_product',product.id);
      console.log(localStorage.getItem('id_product'));
      this.$router.push({
        name: "detailProducts",
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
    this.readData()
  },
};
</script>

<style scoped>
.rounded {
  border-radius: 1rem !important;
}
.card {
  margin: 0;
  transition: 0.3s ease-in-out;
}
.card:hover {
  transform: scale(1.05);
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