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
  const isAuth = Boolean(localStorage.getItem("token"));
  const publicRoutes = ["Login", "Registration"];

  if (!isAuth) {
    if (!publicRoutes.includes(String(to.name))) {
      return { name: "Login" };
    }
    return true;
  } else {
    if (publicRoutes.includes(String(to.name))) {
      return { name: "Home" };
    }
    return true;
  }
});
