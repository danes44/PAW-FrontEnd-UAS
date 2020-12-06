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
            <b-nav-item href="/products" class="pr-3">Products</b-nav-item>
            <b-nav-item href="/" class="pr-3">About Us</b-nav-item>
            <b-nav-item-dropdown right>
              <template #button-content>
                <b-img src="../../assets/avatar.png" width="30" left class="mr-2"></b-img>
                Frumentius
              </template>
              <b-dropdown-group>
                <b-dropdown-item to="/profile" class="text-center">
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

    <div id="editProfile">
      <b-container class="align-self-center">
        <b-card class="rounded shadow-lg border-0 px-4 container " style="width: 70%">
          <div class="d-flex flex-wrap">
            <b-img :src="require('../../assets/avatar.svg')" width="200" class="mr-3 rounded-circle"></b-img>
            <div class="selectPhoto">
              <label id="changePicture" for="file-upload" class="btn btn-light py-2 px-3 shadow border-0" style="margin-top:0;">
                <b-icon icon="pencil-fill" class="mr-3"></b-icon><b>Change</b>
              </label>
              <input id="file-upload" name="foto" type="file"  style="display:none;">
              <label id="file-name"></label>
            </div>
          </div>
          <h1 class="py-4"><b> Edit Profile </b></h1>
          <b-form ref="form" @submit.stop.prevent="handleSubmit">'

            <b-form-group
                :state="state"
                invalid-feedback="Full name is required"
                class="pb-1 border-0">
              <b-input-group class="">
                <b-input-group-prepend is-text class="text">
                  <b-icon icon="person-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input placeholder="Full Name"
                              v-model="name"
                              :state="state"
                              required type="text"
                              class="border-0"></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-row >
              <b-col md="6" class="">
                <b-form-group description="We're sorry you cant change email.">
                  <b-input-group>
                    <b-input-group-prepend is-text class="text">
                      <b-icon icon="envelope-fill" style="color: #898CA6"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input placeholder="Email"
                                  v-model="email"
                                  class="text-muted"
                                  required type="email" disabled ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>

              <b-col md="6" class="">
                <b-form-group
                    :state="state"
                    invalid-feedback="Phone number is required">
                  <b-input-group>
                    <b-input-group-prepend is-text class="text">
                      <b-icon icon="telephone-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input placeholder="Phone Number"
                                  v-model="phone"
                                  :state="state"
                                  pattern="^08[0-9]{8,10}" minlength="9" maxlength="13"
                                  required type="text"></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-form-row>

            <b-form-group
                :state="state"
                invalid-feedback="Address is required"
                class="pb-1 border-0 mb-3">
              <b-input-group class="">
                <b-input-group-prepend is-text class="text">
                  <b-icon icon="house-door-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-textarea placeholder="Address"
                              v-model="address"
                              :state="state"
                              min="6"
                              required
                              class="border-0">
                </b-form-textarea>
              </b-input-group>
            </b-form-group>

            <b-form-row class="pt-5 pb-3 float-right">
              <b-button to="/profile" class="cancel text-center py-2 px-5 border-0 font-weight-bold"
                        style="background-color: white;text-decoration: none; color: #151d65;">
                Cancel
              </b-button>
              <b-button @click="save" class="text-center py-2 px-5 font-weight-bold"
                        style="background-color: #151d65; border-radius: .5rem">
                Save
              </b-button>
            </b-form-row>
          </b-form>

        </b-card>
      </b-container>
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
  import router from "@/router";

  export default {
    name: "EditProfile",
    data(){
      return{
        name:'Frumentius',
        email:'frumentius@gmail.com',
        phone:'0831241051309',
        address:'Jalan Di Rumah',
        password: 'adadeh',
        state: null,
      }
    },
    methods:{
      save(){
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        this.resetForm()
        // Push the name to submitted names
        this.password = this.newPassword
        // Hide the modal manually
        this.$nextTick(() => {
          router.back()
        })
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.state = valid
        return valid
      },
      resetForm() {
        this.oldPassword = ''
        this.newPassword = ''
        this.state = null
      },
    }
  }
</script>

<style scoped>
  #editProfile {
    padding-top: 10%;
    padding-bottom: 10%;
  }
  .card-body {
    margin-top: -16%;
  }
  .rounded {
    border-radius: 1rem!important;
  }
  #profile .d-flex #btnChangePassword {
    background-color: #FF7278;
  }
  #profile .d-flex #btnChangePassword:hover {
    background-color: #c63f43 !important;
  }
  #profile .d-flex #btnEditProfile {
    background-color: #151D65;
  }
  .form-row .cancel:hover {
    background-color: #ffff !important;
    color: #9b9ecb !important;
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
  ::v-deep #modalPassword{
    border: none !important;
    border-radius: 1rem !important;
  }
  #editProfile #changePicture{
    color: #151d65!important;
    position: absolute;
    left: 163px;
    top: 47px;
    text-align: center;
    border-radius: 30px 30px 30px 30px;
    padding:5px 10px;
    font-size:13px;
  }
  #editProfile #changePicture:hover{
    background-color: #c4c8e5 !important;
  }
</style>