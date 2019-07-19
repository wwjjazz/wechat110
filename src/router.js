import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./pages/Index.vue";
import Detail from "./pages/Detail.vue";
import More from "./pages/More.vue";
import Info from "./pages/Info.vue";

Vue.use(VueRouter);
export default new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/detail",
      name: "detail",
      component: Detail
    },
    {
      path: "/more/:id",
      name: "more",
      component: More
    },
    {
      path: "/info",
      name: "info",
      component: Info
    }
  ]
});
