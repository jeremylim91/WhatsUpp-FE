<template>
  <div class="container">
    <div v-for="room in allRooms" :key="room._id">
      <button
        class="chat-summary"
        type="button"
        @click="updateSelectedRoom($event, room)"
      >
        <div class=chat-img-container><img :src="room.image" alt="avatar" /></div>
        <div class="chat-details-container">
          <div class="name">{{ room.name }}</div>
          <div class="latest-msg">{{ room.lastMsg }}</div>
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
.container{
width: 100%;

}
.chat-summary {
  width: 100%;
  margin: 0.5em 0.2em 0.5em;
  /* override original button styles */
  border: none;
  border-bottom: 0.2em solid lightgrey;
  text-align: left;
  display: flex;
}

.name {
  font-weight: 600;
  margin: 5px;
}
.latest-msg {
  font-size: 0.8em;
  margin: 5px;
  text-overflow: ellipsis;
}

.latest-msg {
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
}

.chat-details-container{
  width: 100%;
  overflow: hidden;
}
</style>
