<template>
  <div class="chat-pane">
    <!-- <chat-pane__chat /> -->
    <chat-pane-chat v-if="selectedRoom"></chat-pane-chat>
    <chat-pane-text-input v-if="selectedRoom"></chat-pane-text-input>
    <div v-else>Select on a chat room to begin</div>
  </div>
</template>

<script>
import ChatPaneChat from "./ChatPane__Chat";
import ChatPaneTextInput from "./ChatPane__TextInput";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      selectedRoom: "getSelectedRoom"
    })
  },
  components: {
    ChatPaneChat,
    ChatPaneTextInput
  }
};
</script>

<style scoped>
/* .chat-pane {
  padding: 0px 10px 20px;
  width: 100vw !important;
  background-color: lightpink;
  height: 100vh; */
/* position: relative; */
/* display: flex;
  flex: 1;
} */
</style>
