import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./views/HomeView.vue";
import LoginView from "./views/LoginView.vue";
import RegistrationView from "./views/RegistrationView.vue";

const routes = [
  { path: "/", component: HomeView, name: "Home" },
  { path: "/login", component: LoginView, name: "Login" },
  { path: "/registration", component: RegistrationView, name: "Registration" },
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
