import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import { io } from "socket.io-client";
import router from "./router.mjs";
// import SockJS from "sockjs-client";
// import Stomp from "@stomp/stompjs"
import { Client, Message } from "@stomp/stompjs";

const client = new Client({
  brokerURL: "ws://localhost:3005/chat",
  debug: function(str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000
});

client.onStompError = function(frame) {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log("Broker reported error: " + frame.headers["message"]);
  console.log("Additional details: " + frame.body);
};
client.deactivate();
client.activate();
// const stompClient = null;
// const socket = new SockJS("http://localhost:3005/chat");
// stompClient=

// https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html#include-stompjs

// initialise a socket
// export const socket = io("http://localhost:3005");

// socket.on("connect", () => console.log(`you connected with id: ${socket.id} `));
// const stompClient = Stomp.over(socket);

// stompClient.connect(
//   {},
//   frame => {
//     console.log("Attempting web socket connection")
//     this.connected = true;
//     console.log(frame);
//     this.stompClient.subscribe("/topic/greetings", tick => {
//       console.log(tick);
//       const roomsList= tick.body;
//       console.log(`roomsList is:`)
//       console.log(roomsList)
//       this.received_messages.push(JSON.parse(tick.body).content);

//     });
//   },
//   error=>{
//     console.log(error);
//     this.disconnected= false;
//   }
// )

// Configs for axios
const BACKEND_URL = "http://localhost:3005";

const Axios = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL
});

// Tell app to always use Vuex
Vue.use(Vuex);

const storeContent = new Vuex.Store({
  state() {
    return {
      chatData: {},
      allRooms: [],
      selectedRoom: null,
      chatContents: null,
      sessionDetails: {
        // username: ,
        // name: ,
        // userId:,
      }
    };
  },
  // note: mutations must be sychronous
  mutations: {
    fetchUserChatHistory(state, payload) {
      state.chatData = payload;
    },
    updateSelectedRoom(state, payload) {
      state.selectedRoom = payload.room;
    },
    fetchChatContents(state, data) {
      state.chatContents = data;
    },
    fetchAllRooms(state, data) {
      console.log(`all rooms data:`);
      console.log(data);
      state.allRooms = [...data];
      console.log("state.allRooms is:");
      console.log(state.allRooms);
    },
    addMsgToRoom(state, data) {
      console.log(`msg data is:`);
      console.log(data);
      console.log(`state.chatContents is:`);
      console.log(state.chatContents);
      console.log(`state is`);
      console.log(state);
      if (state.chatContents === null) {
        state.chatContents = [data];
      } else {
        state.chatContents.push(data);
      }
    },

    // SOCKET_receiveNewMsg(state, data) {
    //   state.chatContents.push(data);
    // },
    signIn(state, data) {
      // destructure data
      const { username, _id, name } = data.user;
      state.sessionDetails.username = username;
      state.sessionDetails.name = name;
      state.sessionDetails.userId = _id;
      client.activate();
      router.push("/");
    },
    setUserCredentialsInStore(state, data) {
      console.log(`data in setUserCredentialsInStore`);
      console.log(data);

      // set the credentials in the state
      const { loggedInUserId, loggedInName, loggedInUsername } = data;
      state.sessionDetails.username = loggedInUsername;
      state.sessionDetails.name = loggedInName;
      state.sessionDetails.userId = loggedInUserId;
      console.log(`router full path is:`);
      console.log(router.currentRoute.fullPath);
      // If the user is not on the main page, direct him to the main page (but why?)
    },

    signOut(state, data) {
      console.log("commencing sign out");
      // remove user's details from the store
      state.sessionDetails = {};
      // Deactivate the socket
      client.deactivate();

      // bring user to login page
      router.push("/login");
    }
  },
  // place all async code here
  actions: {
    // get all contents
    fetchUserChatHistory(context, payload) {
      Axios.get("/messages/allMsgsByRoom")
        .then(({ data }) => {
          console.log(`data is:`);
          console.log(data);
          context.commit("fetchUserChatHistory", data);
        })
        .catch(error => {
          console.log("There was an error!:");
          console.log(error);
        });
    },
    // used in SidebarPane__chats to display a all the rooms in a list
    updateSelectedRoom(context, payload) {
      console.log("payload in update selected room is:");
      console.log(payload);
      context.commit("updateSelectedRoom", payload);
    },
    fetchAllRooms(context, payload) {
      Axios.get("/rooms/index")
        .then(({ data }) => {
          console.log(`data is:`);
          console.log(data);
          context.commit("fetchAllRooms", data);
        })
        .catch(error => {
          // Handle scenario where error is caused by failure to authenticate user credentials from his cookies

          if (
            error.response.data === "unauthenticated" &&
            router.currentRoute.fullPath !== "/login"
          ) {
            // if the error says 'unauthenticated AND the user is not at login page, bring the user to the login page
            router.push("/login");
          }
        });
    },

    // used in ChatPane__Chat to get contents of all the chats for a given room
    fetchChatContents(context, payload) {
      // const roomObjectId = payload._id;
      console.log(context.state.selectedRoom);
      const roomObjectId = context.state.selectedRoom.id;
      console.log("roomObjectId is:");
      console.log(roomObjectId);
      // Axios.get(`/messages/getAllMsgsInRoom/${roomObjectId}`)
      Axios.get(`/messages/getAllMsgsInRoom/?roomId=${roomObjectId}`)
        .then(({ data }) => {
          console.log("getAllMsgs worked!!!");
          console.log(`data is:`);
          console.log(data);
          context.commit("fetchChatContents", data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    emitInputToDb(context, payload) {
      // emit the msg to the server, sending the msg and the roomId
      const { msgContent } = payload;
      const { id: roomId } = context.state.selectedRoom;
      const { username } = context.state.sessionDetails;
      console.log("emmitting to server...");
      client.publish({
        destination: "/wsToServer/addMsgToDb",
        body: JSON.stringify({ msgContent, roomId, username })
      });
      // socket.emit("addMsgToDb", { msgContent, roomId, username });
    },
    addMsgToRoom(context, payload) {
      console.log(`payload in store is:`);
      console.log(payload);
      context.commit("addMsgToRoom", payload);
    },
    // SOCKET_receiveNewMsg(context, msg) {
    //   console.log(`msg received in client:`);
    //   console.log(msg);
    // },
    receiveNewMsg(context, data) {
      console.log(`msg received in client:`);
      console.log(data);
    },

    signIn(context, payload) {
      // make a req to the db to verify credentials. use a post request because the data is sensitive
      Axios.post("/users/signIn", payload)
        .then(({ data }) => {
          context.commit("signIn", data);
        })
        .catch(error => console.log(error));
    },
    setUserCredentialsInStore(context, payload) {
      // make a req to db to verify credentials using the cookies supplied.
      Axios.post("/users/setUserCredentialsInStore", payload)
        .then(({ data }) => {
          console.log(`check credentials data is: `);
          console.log(data);
          context.commit("setUserCredentialsInStore", data);
        })
        .catch(error => console.log(error));
    },
    // create a new room upon user's request
    createRoom(context, payload) {
      // console.log(context.state.sessionDetails);
      // add the userId into the payload
      payload.userId = context.state.sessionDetails.userId;
      console.log(`payload.userId is:`);
      console.log(payload.userId);
      // socket.emit("createRoom", payload);
      client.publish({
        destination: "/wsToServer/createRoom",
        body: JSON.stringify(payload)
      });

      //   Axios.post("/rooms/create", payload)
      //     .then(({ data }) => {
      //       context.commit("createRoom", data);
      //     })
      //     .catch(error => console.log(error));
    },
    // query db for all the rooms

    // SOCKET_updateRoomsList(context, rooms) {
    //   context.dispatch("fetchAllRooms");

    //   console.log(rooms);
    // },

    updateRoomList(context, rooms) {
      console.log("inside updateRoomList");
      // client.publish({});
      // Query db for the rooms
      // this.socket = new SockJS("http://localhost:3005/chat");
      // this.stompClient = Stomp.over(this.socket);
      // this.stompClient.connect(
      //   {},
      //   frame => {
      //     this.connected = true;
      //     console.log(frame);
      //     this.stompClient.subscribe("/topic/greetings", tick => {
      //       console.log(tick);
      //       const roomsList = tick.body;
      //       console.log(`roomsList is:`);
      //       console.log(roomsList);
      //       this.received_messages.push(JSON.parse(tick.body).content);
      //     });
      //   },
      //   error => {
      //     console.log(error);
      //     this.disconnected = false;
      //   }
      // );
    },
    signOut(context, payload) {
      console.log("commencing signOut1");
      // make a BE query that responds by remove all user's cookies that are relevant to auth
      Axios.get("/users/signOut")
        .then(({ data }) => {
          context.commit("signOut");
        })
        .catch(err => console.log(err));
    }
  },
  getters: {
    getSelectedRoom(state, otherGetters) {
      return state.selectedRoom;
    },
    getAllRooms(state, otherGetters) {
      return state.allRooms;
    },
    getChatContents(state, otherGetters) {
      console.log("getting chat contents:");
      console.log(state.chatContents);
      return state.chatContents;
    },
    getSessionDetails(state, otherGetters) {
      return state.sessionDetails;
    },
    getRoomName(state, otherGetters) {
      if (!state.selectedRoom) {
        return "Chat name";
      }
      return state.selectedRoom.name.toUpperCase();
    }
  }
});

client.onConnect = function(frame) {
  console.log("WS handshake successful!");
  // Do something, all subscribes must be done is this callback
  // This is needed because this will be executed after a (re)connect
  client.subscribe("/wsFromServer/testingRoute", () =>
    storeContent.dispatch("fetchAllRooms")
  );
  client.subscribe("/wsFromServer/receiveNewMsg", () =>
    storeContent.dispatch("receiveNewMsg")
  );

  client.subscribe("/wsFromServer/createRoom", message => {
    console.log(message.body);
    storeContent.dispatch("fetchAllRooms");
  });
  client.subscribe("/wsFromServer/addMsgToDb", message => {
    const msgData = JSON.parse(message.body);
    storeContent.dispatch("addMsgToRoom", msgData);
  });
  // client.subscribe("/topic/testingRoute", testCallBack);
};

export default storeContent;
// export default storeContent;

/*////////////////////////////////////////////////
       Manage all sockets
////////////////////////////////////////////////*/
// receive the msg from the server
// socket.on("receiveNewMsg", msg => {
//   console.log(`msg received in client:`);
//   console.log(msg);
//   store.commit("addMsgToRoom", msg);
// });

// socket.on("testFromServer", payload => {
//   console.log(`payload is:`);
//   console.log(payload);
// });
