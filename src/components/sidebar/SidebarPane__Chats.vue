<template>
  <div class="container">
    <div v-for="room in allRooms" :key="room._id">
      <button
        class="chat-summary"
        type="button"
        @click="updateSelectedRoom($event, room)"
      >
        <div><img :src="room.image" alt="avatar" /></div>
        <div>
          <div class="name">{{ room.name }}</div>
          <div class="latestmsg">{{ room.lastMsg }}</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import axios from "axios";

export default {
  computed: {
    ...mapGetters({
      allRooms: "getAllRooms"
    })
  },
  mounted() {
    this.$store.dispatch("fetchAllRooms");
  },

  data() {
    return {
      // allRooms: "",
    };
  },
  methods: {
    updateSelectedRoom(event, room) {
      this.$store.dispatch("updateSelectedRoom", { room });
    }
  }
};
</script>
<style scoped>
.chat-summary {
  width: 100%;
  margin: 0.5em 0.2em 0.5em;
  overflow: scroll;

  /* override original button styles */
  border: none;
  border-bottom: 0.2em solid lightgrey;
  text-align: left;
  display: flex;
}
.chat-summary .name {
  font-weight: 600;
  margin: 5px;
}
.chat-summary .latestMsg {
  font-size: 0.6em;
  width: 100%;
  margin: 5px;
  /* max-height: 1em; */
  text-overflow: ellipsis;
}
</style>
