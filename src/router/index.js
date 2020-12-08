import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path) {
  return () => import(`../components/${path}.vue`)
}

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "homepage",
      meta: {title: 'Home - Froster'},
      component: importComponent('HomePage'),
    },
    {
      path: "/login",
      name: "login",
      meta: {title: 'Sign In - Froster'},
      component: importComponent('auth/Login'),
    },
    {
      path: "/signup",
      name: "signup",
      meta: {title: 'Sign Up - Froster'},
      component: importComponent('auth/SignUp'),
    },
    {
      path: "/unverified",
      name: "unverified",
      meta: {title: 'Sign Up [Unverified] - Froster'},
      component: importComponent('auth/Unverified'),
    },
    {
      path: "/verified",
      name: "verified",
      meta: {title: 'Sign Up [Verified] - Froster'},
      component: importComponent('auth/Verified'),
    },
    {
      path: "/products",
      name: "products",
      meta: {title: 'Products - Froster'},
      component: importComponent('products/Products'),
    },
    {
      path: "/detail-product",
      name: "detailProducts",
      meta: {title: 'Detail Product - Froster'},
      component: importComponent('products/DetailProduct'),
    },
    {
      path: "/cart",
      name: "cart",
      meta: {title: 'Cart - Froster'},
      component: importComponent('products/Cart'),
    },
    {
      path: "/profile",
      name: "profile",
      meta: {title: 'Profile - Froster'},
      component: importComponent('profile/Profile'),
    },
    {
      path: "/edit-profile",
      name: "editProfile",
      meta: {title: 'Edit Profile - Froster'},
      component: importComponent('profile/EditProfile'),
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: "/",
      name: "admin",
      meta: {title: 'Admin'},
      component: importComponent('DashboardLayout'),
      children: [
          //Account
          {
              path: "/adminaccount",
              name: "adminaccount",
              meta: {title: 'Account - Admin'},
              component: importComponent('admin/Account'),
          },
          // Products
          {
              path:"/adminproducts",
              name: "adminproducts",
              meta: {title: 'Product - Admin'},
              component: importComponent('admin/Products'),
          },
          // Transaction
          {
              path:"/admintransaction",
              name: "admintransaction",
              meta: {title: 'Transaction - Admin'},
              component: importComponent('admin/Transaction'),
          },
          // Location
          {
              path:"/adminlocation",
              name: "adminlocation",
              meta: {title: 'Location - Admin'},
              component: importComponent('admin/Location'),
          },
      ]
  },
  ],
});

//set judul
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
  //masih kasar :'3
  // if(to.name !='login' && !localStorage.getItem('token')){
  //   next({
  //     path:'/login',
  //     query:{ redirect: to.fullPath}
  //   })
  // }else next()
})

export default router
