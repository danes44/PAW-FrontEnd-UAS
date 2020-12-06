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
           <b-button class="my-3 my-sm-0 px-3 font-weight-bold border-0" to="/login" style="background-color: #151D65;">Login</b-button>
         </b-navbar-nav>
       </b-collapse>

     </b-container>
   </b-navbar>

   <b-container>
     <div id="productList">
       <h1 class=""><b>Our Selling Products</b></h1>

       <b-row class="py-5">
         <b-col md="3" sm="6" cols="12" class="mb-4" v-for="food in foods" :key="food.name">
           <b-card class="h-100 no-gutters border-0 shadow rounded overflow-hidden mr-0"
             v-bind:img-src="require('../../assets/'+food.image)"
             style="max-width: 255px;">
               <b-link to="/detail-product" class="stretched-link" style="text-decoration: none; color: inherit;">
                   <b-card-body class="p-0">
                     <b-card-text >
                       <h6 class="font-weight-bold"> {{ food.name }} </h6>
                       <h6 class="font-weight-bold"> Rp. {{ formatPrice(food.price) }}</h6>
                       Stok : {{ food.stock }}
                     </b-card-text>
                   </b-card-body>
               </b-link>
           </b-card>
         </b-col>
       </b-row>
     </div>
   </b-container>


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
    name: "Products",
    data(){
      return {
       foods:[
         { name: 'Champs Chicken Ball', price: 20000, stock: 52, image: 'Group 612.png'},
         { name: 'Fiesta Chicken Nuggets', price: 40000, stock: 53, image: 'Group 613.png'},
         { name: 'Champs Chicken Sausage', price: 24000, stock: 25, image: 'Group 616.png'},
         { name: 'Fiesta Chicken Slice', price: 36000, stock: 15, image: 'Group 619.png'},
         { name: 'Fiesta Keecho', price: 40000, stock: 45, image: 'Group 617.png'},
       ],

      }
    },
    methods:{
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
    }
  }
</script>

<style scoped>
  .rounded {
    border-radius: 1rem!important;
  }
  .card{
    margin: 0;
    transition: 0.3s ease-in-out;
  }
  .card:hover {
    transform: scale(1.05);
  }
  #productList{
    padding-top: 7%;
    padding-bottom: 8%;
  }
</style>