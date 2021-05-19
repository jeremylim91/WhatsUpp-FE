<template>
  <div class="container">
    <button
      type="button"
      class="chat-summary"
      v-for="chat in sampleChats"
      :key="chat.name"
    >
      <div>{{ chat.avatar }}</div>
      <div>
        <div class="name">{{ chat.name }}</div>
        <div class="latestmsg">{{ chat.latestMsg }}</div>
      </div>
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
