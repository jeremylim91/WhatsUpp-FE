import Vue from "vue";
import App from "./App.vue";
import User from "./components/User.vue";
import VueRouter from "vue-router";
import Homepage from "./components/Homepage.vue";
import Login from "./components/Login.vue";

// Tell app to use Vue router for this single-page application
Vue.use(VueRouter);

// specify routes and associated UI component
const routes = [
  { path: "/login", component: Login },
  { path: "/", component: Homepage }
];
// create a VueRouter Instance and use the above info to tell app to route the accordingly
const router = new VueRouter({
  // the value (i.e. 'routes) referse to the routes constant defined above
  routes: routes
});

Vue.component("app-user", User);
new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
