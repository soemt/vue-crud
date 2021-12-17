import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import PostList from "../pages/post/PostList";
import PostDetail from "../pages/post/PostDetail";
import PostEdit from "../pages/post/PostEdit";
import CreateUser from "../pages/user/CreateUser";
import UserList from "../pages/user/UserList";
import UserDetail from "../pages/user/UserDetail";
import UserEdit from "../pages/user/UserEdit";
import PostConfirm from "../pages/post/PostConfirm";
import UserConfirm from "../pages/user/UserConfirm"
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/post/list",
    name: "post-list",
    component: PostList,
  },
  {
    path: "/post/detail/:id",
    name: "post-detail",
    component: PostDetail,
    props: true,
  },
  {
    path: "/post/edit/:id",
    name: "post-edit",
    component: PostEdit,
    props: true,
  },
  {
    path: "/create/user",
    name: "create-user",
    component: CreateUser,
  },
  {
    path: "/user/list",
    name: "user-list",
    component: UserList,
    beforeEnter(to, from, next) {
      const is_admin = store.getters.isAdmin;
      if (!is_admin) {
        return next("post/list")
      } else {
        next();
      }
    }
  },
  {
    path: "/user/detail/:id",
    name: "user-detail",
    component: UserDetail,
    props: true,
  },
  {
    path: "/user/edit/:id",
    name: "user-edit",
    component: UserEdit,
    props: true,
  },
  {
    path: "/post-confirmation",
    name: "post-confirm",
    component: PostConfirm,
  },
  {
    path: "/user-confirmation",
    name: "user-confirm",
    component: UserConfirm,
  },
  {
    path: "/*",
    redirect: "/post/list",
  },
];

//const PostConfirm = { template: '<div>Home</div>' } 
export const router = new VueRouter({
  mode: "history",
  routes,
  //routes: [
  //  {
  //    path: "/confirmation",
  //    component: Confirmation,
  //  }
  //]
});

/**
 * This is to handle and check authentication for routing.
 */
router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.isLoggedIn;
  if (!loggedIn && to.name != "login") {
    return next("/login");
  }
  next();
});

export default router;
