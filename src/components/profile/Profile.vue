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
            <b-nav-item href="/products" class="pr-3">Products</b-nav-item>
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
                <b-dropdown-item to="/profile" class="text-center">
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

    <div id="profile">
      <b-container class="align-self-center">
        <b-card
          class="rounded shadow-lg border-0 px-4 container"
          style="width: 70%"
        >
          <div class="d-flex flex-wrap">
            <b-img
              :src="'http://127.0.0.1:8000' + form.image"
              width="200"
              class="mr-3 rounded-circle"
              v-if="form.image != null"
            ></b-img>
            <b-img
              :src="require('../../assets/avatar.svg')"
              width="200"
              v-else
              class="mr-3 rounded-circle"
            ></b-img>

            <b-button
              id="btnChangePassword"
              v-b-modal="'modalPassword'"
              class="py-3 px-4 mx-4 align-self-center border-0 font-weight-bold"
              style="border-radius: 0.5rem"
            >
              <b-icon class="mr-3" icon="lock-fill"></b-icon>Change Password
            </b-button>
            <b-button
              id="btnEditProfile"
              to="/edit-profile"
              class="py-3 px-4 align-self-center border-0 font-weight-bold"
              style="border-radius: 0.5rem"
            >
              <b-icon class="mr-3" icon="pencil-fill"></b-icon>Edit Profile
            </b-button>
          </div>
          <h1 class="pt-3">
            <b> {{ form.name }} </b>
          </h1>
          <h5 class="pt-3">
            <b>Email Address</b>
          </h5>
          <p>{{ form.email }}</p>
          <h5><b>Phone Number</b></h5>
          <p>{{ form.no_tlp }}</p>
          <h5><b>Address</b></h5>
          <p>{{ form.alamat }}</p>
        </b-card>
      </b-container>
    </div>

    <b-modal
      id="modalPassword"
      modal-class="border-0 rounded"
      ref="modal"
      hide-header
      hide-footer
      centered
    >
      <div class="px-4">
        <h3 class="py-5 text-center"><b>Change Password</b></h3>
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="state"
            invalid-feedback="Old password is required"
            class="pb-1 border-0"
          >
            <b-input-group class="">
              <b-input-group-prepend is-text class="text">
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                placeholder="Old Password"
                v-model="formPassword.password"
                :state="state"      
                min="6"
                required
                type="password"
                class="border-0"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group
            :state="state"
            invalid-feedback="New password is required"
          >
            <b-input-group>
              <b-input-group-prepend is-text class="text">
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                placeholder="New Password"
                v-model="formPassword.newPassword"
                :state="state"
                min="6"
                required
                type="password"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group
            :state="state"
            invalid-feedback="Confirm password is required"
          >
            <b-input-group>
              <b-input-group-prepend is-text class="text">
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                placeholder="Confirm Password"
                v-model="formPassword.confirmPassword"
                :state="state"
                min="6"
                required
                type="password"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-row class="pt-5 pb-3 float-right">
            <b-button
              @click="hideModal"
              class="cancel text-center py-2 px-5 border-0 font-weight-bold"
              style="
                background-color: white;
                text-decoration: none;
                color: #151d65;
              "
            >
              Cancel
            </b-button>
            <b-button
              @click="updatePassword"
              class="text-center py-2 px-5 font-weight-bold"
              style="background-color: #151d65; border-radius: 0.5rem"
            >
              Save
            </b-button>
          </b-form-row>
        </b-form>
      </div>
    </b-modal>

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
  name: "Profile",
  data() {
    return {
      id:null,
      token:null,
      name: "",
      email: "frumentius@gmail.com",
      no_tlp: "0831241051309",
      alamat: "Jalan Di Rumah",
      password: "asdaqwesazxc",
      oldPassword: "",
      newPassword: "",
      state: null,
      users: [],
      user: new FormData(),
      form: {
        name: "",
        email: "",
        no_tlp: "",
        alamat: "",
        image: null,
      },
      formPassword: {
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    readData() {
      this.id = localStorage.getItem("id");
      console.log(this.id);
      var url = this.$api + "/user/" + this.id;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.users = response.data.data;
          console.log(this.user);
          this.form.name = this.users.name;
          this.form.email = this.users.email;
          this.form.image = this.users.image;
          this.form.no_tlp = this.users.no_tlp;
          this.form.alamat = this.users.alamat;
        });
    },
    updatePassword() {
      console.log(this.formPassword);
      let newData = {
        password: this.formPassword.password,
        newPassword: this.formPassword.newPassword,
        confirmPassword: this.formPassword.confirmPassword,
      };
      console.log(newData);
      this.id = localStorage.getItem("id");
      var url = this.$api + "/changepassword/" + this.id;
      this.load = true;
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          // this.close();
          this.readData(); //mengambildata
          // this.resetForm();
          // this.inputType = "Tambah";
          this.resetModal();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
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
    // feedbackPassword() {
    //   if (this.oldPassword != this.newPassword) {
    //     if (this.checkFormValidity()==true)
    //     {
    //       return 'The old password must be same as current password'
    //     }
    //   }
    //   return 'Old Password is required'
    // },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.state = valid;
      return valid;
    },
    resetModal() {
      this.formPassword.password = "";
      this.formPassword.newPassword = "";
      this.formPassword.confirmPassword = "";
      this.$bvModal.hide("modalPassword");
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      // Push the name to submitted names
      this.password = this.newPassword;
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modalPassword");
      });
    },
    hideModal() {
      this.resetModal();
      this.$bvModal.hide("modalPassword");
    },
  },
  mounted() {
    this.readData();
  },
};
</script>

<style scoped>
#profile {
  padding-top: 10%;
  padding-bottom: 10%;
}
.card-body {
  margin-top: -16%;
}
.rounded {
  border-radius: 1rem !important;
}
#profile .d-flex #btnChangePassword {
  background-color: #ff7278;
}
#profile .d-flex #btnChangePassword:hover {
  background-color: #c63f43 !important;
}
#profile .d-flex #btnEditProfile {
  background-color: #151d65;
}
.form-row .cancel:hover {
  background-color: #ffff !important;
  color: #9b9ecb !important;
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
.form-row .cancel:hover {
  background-color: #ffff !important;
  color: #9b9ecb !important;
}
</style>