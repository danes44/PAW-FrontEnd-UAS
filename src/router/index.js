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
      path: '*',
      redirect: '/'
    },
  ],
});

//set judul
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
