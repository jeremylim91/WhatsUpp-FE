import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { io } from "socket.io-client";

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
      // temporarily static until authentication is complete
      sessionDetails: {
        username: "jeremylim_91",
        name: "jeremy",
        sessionId: "testSession"
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
      console.log(`state.chatContents is;`);
      console.log(state.chatContents);
      console.log("new message data is:");
      console.log(data);
      state.chatContents.push(data);
    }
  },
  // place all async code here
  actions: {
    // get all contents
    fetchUserChatHistory(context, payload) {
      Axios.get("/messages/allMsgsByRoom")
        .then(({ data }) => {
          context.commit("fetchUserChatHistory", data);
        })
        .catch(error => console.log(error));
    },
    // used in SidebarPane__chats to display a all the rooms in a list
    updateSelectedRoom(context, payload) {
      context.commit("updateSelectedRoom", payload);
    },
    fetchAllRooms(context, payload) {
      Axios.get("/rooms/index")
        .then(({ data }) => {
          context.commit("fetchAllRooms", data);
        })
        .catch(error => console.log(error));
    },

    // used in ChatPane__Chat to get contents of all the chats for a given room
    fetchChatContents(context, payload) {
      // const roomObjectId = payload._id;
      const roomObjectId = context.state.selectedRoom.id;
      Axios.get(`/messages/getAllMsgsInRoom/${roomObjectId}`)
        .then(({ data }) => {
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
