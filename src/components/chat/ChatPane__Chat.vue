<template>
  <div class="container">
    <div
      v-for="message in chatContents"
      class="message-field"
      :class="alignMsgs(message)"
      :key="message.id"
    >
      <!-- :class="{ myMsg: message.username === sessionDetails.username }" -->
      <!-- <div class="test1"> -->
      <span class="username-field">{{ message.username }}</span>
      <span class="message-box">
        <div>{{ message.message }}</div>
        <div class="timestamp">{{ getTime(message.timestamp) }}</div>
      </span>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import { io } from "socket.io-client";

export default {
  data() {
    return {
      isMyMsg: false
    };
  },
  computed: {
    ...mapGetters({
      chatContents: "getChatContents",
      selectedRoom: "getSelectedRoom",
      sessionDetails: "getSessionDetails"
    })
  },
  watch: {
    // both args below are provided automatically by vue
    // new value is the latest value of the state
    selectedRoom(newValue, oldValue) {
      this.$store.dispatch("fetchChatContents");
    }
  },
  mounted() {
    // make an axios request to get all the chats and update the state on which chat is open
    this.$store.dispatch("fetchChatContents");
    //
  },
  methods: {
    // if the user created the message, align it to the right of the pane; else align left
    alignMsgs(message) {
      if (message.username === this.sessionDetails.username) {
        return "myMsg";
      }
      return;
    },
    getTime(timestamp) {
      return moment(timestamp).format("h:mma");
    }
  }
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.message-field {
  display: flex;
  flex-direction: column;
  margin: 0.5em 0em 0.5em;
  font-weight: 600;
  font-size: 0.6rem;
}

.test1 {
  display: inline-flex;
  flex-direction: column;
}
.message-box {
  display: inline-flex;
  font-weight: 500;
  font-size: 1rem;
  flex-direction: column;
  background-color: lightgrey;
  border-radius: 15px;
  padding: 0.2em 0.5em 0.2em;
  max-width: 15em;
}
.myMsg {
  align-self: flex-end;
}
.timestamp {
  font-size: 0.6rem;
}
</style>
