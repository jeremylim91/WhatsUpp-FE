import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import store /*, { socket }*/ from "./store.mjs";
import router from "./router.mjs";
// import { io } from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import socketIO from "vue-socket.io";
import "./assets/main.css";

// const vueSocketIO = new VueSocketIO({
//   debug: true,
//   // As the connection, use the sokect instance that was created in the store
//   connection: socket,
//   vuex: { store, actionPrefix: "SOCKET_", mutationPrefix: "SOCKET_" }
// });
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3004");
// socket.on("connect", () => console.log(`you connected with id: ${socket.id} `));

// Vue.use(
//   new VueSocketIO({
//     debug: true,
//     connection: "http://localhost:3004",
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_",
//       mutationPrefix: "SOCKET_"
//     }
//     // options: { path: "/my-app/" }
//     //Optional options
//   })
// );
// initialise a socket
// export const socketInstance = io("http://localhost:3004");
// Vue.use(socketIO, "http://localhost:3004");
Vue.use(/*socket,*/ store);

new Vue({
  el: "#app",
  // mounted: function() {
  //   this.$nextTick(function() {
  //     let socket = new SockJS("/chat");
  //     stompClient = Stomp.over(socket);
  //     stompClient.connect(
  //       {},
  //       function(frame) {
  //         console.log("Connected: " + frame);

  //         stompClient.subscribe("/info/values", function(val) {
  //           console.log(val);
  //           console.log(JSON.parse(val.body));
  //           vm.valuesList = JSON.parse(val.body);
  //         });
  //       }
  //     );
  //   });
  // },
  router,
  store,
  render: h => h(App)
});
