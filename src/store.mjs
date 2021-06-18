import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { io } from "socket.io-client";
import router from "./router.mjs";

// initialise a socket
export const socket = io("http://localhost:3004");

socket.on("connect", () => console.log(`you connected with id: ${socket.id} `));

// Configs for axios
const BACKEND_URL = "http://localhost:3004";

const Axios = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL
});

// Tell app to always use Vuex
Vue.use(Vuex);

export default new Vuex.Store({
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
      console.log(`data in mutations`);
      console.log(data);
      state.allRooms = [...data];
    },
    // addMsgToRoom(state, data) {
    //   console.log(`msg data is:`);
    //   console.log(data);
    //   state.chatContents.push(data);
    // },
    SOCKET_receiveNewMsg(state, data) {
      state.chatContents.push(data);
    },
    signIn(state, data) {
      // destructure data
      const { username, _id, name } = data.user;
      state.sessionDetails.username = username;
      state.sessionDetails.name = name;
      state.sessionDetails.userId = _id;
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
      const roomObjectId = context.state.selectedRoom.id;
      Axios.get(`/messages/getAllMsgsInRoom/${roomObjectId}`)
        .then(({ data }) => {
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
      socket.emit("addMsgToDb", { msgContent, roomId, username });
    },
    addMsgToRoom(context, payload) {
      console.log(`payload in store is:`);
      console.log(payload);
      context.commit("addMsgToRoom", payload);
    },
    SOCKET_receiveNewMsg(context, msg) {
      console.log(`msg received in client:`);
      console.log(msg);
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
      socket.emit("createRoom", payload);

      //   Axios.post("/rooms/create", payload)
      //     .then(({ data }) => {
      //       context.commit("createRoom", data);
      //     })
      //     .catch(error => console.log(error));
    },
    SOCKET_updateRoomsList(context, rooms) {
      // query db for all the rooms
      context.dispatch("fetchAllRooms");

      console.log(rooms);
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
      console.log("getting chat contents");
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

// export default storeContent;

/*////////////////////////////////////////////////
       Manage all sockets
////////////////////////////////////////////////*/
// receive the msg from the server
socket.on("receiveNewMsg", msg => {
  console.log(`msg received in client:`);
  console.log(msg);
  store.commit("addMsgToRoom", msg);
});

socket.on("testFromServer", payload => {
  console.log(`payload is:`);
  console.log(payload);
});
