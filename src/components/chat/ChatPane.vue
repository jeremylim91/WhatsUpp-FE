<template>
  <div class="chat-pane">
    <chat-pane__header />
    <chat-pane__chat />
    <chat-pane__text-input />
  </div>
</template>

<script>
import ChatPane__Header from "./ChatPane__Header";
import ChatPane__Chat from "./ChatPane__Chat";
import ChatPane__TextInput from "./ChatPane__TextInput";

export default {
  components: {
    "chat-pane__header": ChatPane__Header,
    "chat-pane__chat": ChatPane__Chat,
    "chat-pane__text-input": ChatPane__TextInput
  }
};
</script>

<style scoped>
.chat-pane {
  padding: 0px 10px 20px;
  width: 100vw !important;
  background-color: lightpink;
  height: 100vh;
  position: relative;
}
</style>
