import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import( "./../views/Login.vue"),
  },
  {
    path: "/comm",
    name: "Comm",
    // redirect:'/comm/workbench',
    component: () =>
      import( "@/components/Comm.vue"),
    children: [
      {
        path: "workbench",
        name: "WorkBench",
        component: () =>
          import("./../views/workbench.vue"
          ),
      },
      {
        path: "productList",
        name: "ProductList",
        component: () =>
          import("./../views/ProductList.vue"
          ),
      },
      {
        path: "supplierManagement",
        name: "SupplierManagement",
        component: () =>
          import("./../views/SupplierManagement.vue"
          ),
      },
      {
        path: "storeConsumption",
        name: "StoreConsumption",
        component: () =>
          import( "./../views/StoreConsumption.vue"
          ),
      },
      {
        path: "addGoods",
        name: "AddGoods",
        component: () =>
          import(
           "./../views/AddGoods.vue"
          ),
      },
  {
        path: "addSupplier",
        name: "AddSupplier",
        component: () =>
          import(
            "./../views/AddSupplier.vue"
          ),
      },
      {
        path: "operation",
        name: "operation",
        component: () => import("@/views/Operation.vue"),
      },
      {
        path: "freight",
        name: "freight",
        meta: {
          keepAlive: true,
        }, 
        component: () => import("@/views/Freight.vue"),
      },
      {
        path: "redact",
        name: "redact",
        meta: {
          keepAlive: true,
        }, 
        component: () => import("@/views/Redact.vue"),
      },
      {
        path: "storement",
        name: "storement",
        component: () => import("@/views/Storement.vue"),
      },
      {
        path: "inventory",
        name: "inventory",
        component: () => import("@/views/Inventory.vue"),
      },
      {
        path: "immediatelyshop",
        name: "Immediatelyshop",
        component: () => import("./../views/Immediatelyshop.vue"),
      },
      {
        path: 'adddata',
        name: 'Adddata',
        component: () => import('@/views/Adddata.vue')
      },
      {
        path: "pretaxmargin",
        name: "Pretaxmargin",
        component: () => import("./../views/Pretaxmargin.vue"),
      },
      {
        path: "storestheorder",
        name: "Storestheorder",
        component: () => import("./../views/Storestheorder.vue"),
      },
      {
        path: "theorderdetails",
        name: "Theorderdetails",
        component: () => import("./../views/Theorderdetails.vue"),
      },
      {
        path: "manage",
        name: "manage",
        component: () =>
          import("./../views/manage.vue"),
      },
      {
        path: "record",
        name: "record",
        component: () =>
          import("./../views/record.vue"),
      },
      {
        path: 'userList',
        name: 'userList',
        component: () => import('./../views/userList.vue')
      },
      {
        path: 'withdrawalmanagement',
        name: 'Withdrawalmanagement',
        component: () => import('./../views/Withdrawalmanagement.vue')
      },
      {
        path: 'adminlist',
        name: 'adminList',
        component: () => import('./../views/adminList.vue')
      },
      {
        path: 'perm',
        name: 'permissions',
        component: () => import('./../views/permissions.vue')
      },
 {
        path: "",
        component: () =>
          import("./../views/Welcome.vue"),
      },
    ],
  },
  {
    path: "*", // *表示 任意的URL。
    name: "Page404",
    component: () => import("../views/Page404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
