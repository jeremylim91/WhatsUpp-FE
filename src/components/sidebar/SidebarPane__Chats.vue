<template>
  <div class="container">
    <button
      type="button"
      class="chat-summary"
      v-for="room in allRooms"
      :key="room._id"
    >
      <div><img :src="room.image" alt="avatar" /></div>
      <div>
        <div class="name">{{ room.name }}</div>
        <div class="latestmsg">{{ room.lastMsg }}</div>
      </div>
    </button>
  </div>
</template>
<script>
import axios from "axios";
import { getAllRooms } from "../../../store.mjs";

export default {
  mounted() {
    axios.get("http://localhost:3004/rooms/index").then(({ data }) => {
      console.log(data);
      this.allRooms = [...data];
    });
    // const self = this.allRooms;
    // this.allRooms = getAllRooms(this.allRooms);
  },
  data() {
    return {
      allRooms: "",
      sampleChats: [
        { name: "Joel", avatar: ":)", latestMsg: "sup bro" },
        { name: "Justin", avatar: ":)", latestMsg: "Eh wanna go lunch?" }
      ]
    };
  }
};
</script>
<style scoped>
.chat-summary {
  display: grid;
  grid-template-columns: 1fr 6fr;
  width: 100%;
  margin: 0.5em 0.2em 0.5em;
  overflow: scroll;
  height: 3em;
  /* override original button styles */
  border: none;
  border-bottom: 0.2em solid lightgrey;
  text-align: left;
}
.chat-summary .name {
  font-weight: 600;
}
.chat-summary .latestMsg {
  font-size: 0.6em;
  width: 100%;
  text-overflow: ellipsis;
}
</style>
