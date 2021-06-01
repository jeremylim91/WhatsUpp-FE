<template>
  <div class="Homepage__container">
    <sidebar-pane />
    <chat-pane />
  </div>
</template>

<script>
import SidebarPane from "./sidebar/SidebarPane";
import ChatPane from "./chat/ChatPane";

export default {
  components: {
    "sidebar-pane": SidebarPane,
    "chat-pane": ChatPane
  }
};
</script>

<style scoped>
.Homepage__container {
  display: flex;
}
</style>
