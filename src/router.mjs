import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "./components/Homepage.vue";
import Login from "./components/Login.vue";

// tell app to always run thru routers for this single page application
Vue.use(VueRouter);

// specify routes and associated UI component
const routes = [
  { path: "/login", component: Login },
  { path: "/", component: Homepage }
];

// create a VueRouter Instance and use the above info to tell app to route the accordingly
export default new VueRouter({
  // the value (i.e. 'routes) referse to the routes constant defined above
  routes: routes
});
