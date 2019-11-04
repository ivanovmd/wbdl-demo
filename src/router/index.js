import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User";
import Post from "../views/Post";
import NotFound from '../views/404'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/users/:id",
    name: "user",
    component: User
  },
  {
    path: "/posts/:id",
    name: "post",
    component: Post
  },
  {
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
