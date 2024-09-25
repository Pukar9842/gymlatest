import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
  } from "vue-router"; 
import Sales from "../products/Sales.vue";
  


  const routes: Array<RouteRecordRaw> = [
    {
    path: "/",
     redirect: "/dashboard",
      component: () => import("../components/body/AdminDashboard.vue"),
      meta: { 

      },
      children: [
        {
          path:"/dashboard",
          name:"AdminDashboard",
        component: () => import("../components/body/AdminDashboard.vue")      
        },

      ]
    },

  {
    path:"/membersAccount",
    name:"MembersAccount",
    component:() => import("../accounts/MembersAccounts.vue")
  },
    {
      path:"/products",
      name:"Products",
      component:() => import("../products/Products.vue")
    },
    {
    path:"/sales",
    name:"Sales",
    component:() => import("../products/Sales.vue")
  }
  ]
    const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes,
      
    });

    export default router