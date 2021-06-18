<template>
  <div class="Homepage__container">
    <sidebar-header></sidebar-header>
    <chat-header></chat-header>
    <sidebar-pane></sidebar-pane>
    <chat-pane></chat-pane>
  </div>
</template>

<script>
import SidebarPane from "./sidebar/SidebarPane";
import ChatPane from "./chat/ChatPane";
import { mapActions } from "vuex";
import SidebarHeader from "./sidebar/SidebarPane__Header.vue";
import ChatHeader from "./chat/ChatPane__Header.vue";

export default {
  // methods: {
  //   ...mapActions(["fetchUserChatHistory"])
  // },
  // created() {
  //   this.fetchUserChatHistory;
  // },
  mounted() {
    this.$store.dispatch("fetchUserChatHistory");
  },
  components: {
    SidebarHeader,
    ChatHeader,
    SidebarPane,
    ChatPane
  }
};
</script>

<style scoped>
.Homepage__container {
  /* display: flex; */
  /* width: 100%;
  height: 100vh;
  background: yellow;
  display: grid;
  grid-template-rows: 20% 80%;
  grid-template-columns: 1fr 1fr; */
}
</style>
