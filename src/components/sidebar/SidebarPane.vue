<template>
  <div class="sidebar-pane">
    <sidebar-header />
    <sidebar-searchbox />
    <sidebar-chats />
  </div>
</template>
<script>
import Chats from "./SidebarPane__Chats.vue";
import Header from "./SidebarPane__Header.vue";
import SearchBox from "./SidebarPane__SearchBox.vue";
export default {
  components: {
    "sidebar-header": Header,
    "sidebar-searchbox": SearchBox,
    "sidebar-chats": Chats
  }
};
</script>
<style scoped>
.sidebar-pane {
  padding: 20px 10px 20px;
  width: 10em;
  background-color: lightblue;
  height: 100vh;
}
</style>
