import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./views/HomeView.vue";
import AuthView from "./views/AuthView.vue";

const routes = [
  { path: "/", component: HomeView, name: "Home" },
  {
    path: "/login",
    component: AuthView,
    name: "Login",
    props: { action: "login" },
  },
  {
    path: "/registration",
    component: AuthView,
    name: "Registration",
    props: { action: "registration" },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  // const isAuth = false;
  // if (!isAuth && to.name !== "Login") {
  //   return { name: "Login" };
  // }

  return true;
});
