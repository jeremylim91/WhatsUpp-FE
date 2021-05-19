<template>
  <div>
    This is chat pane
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
