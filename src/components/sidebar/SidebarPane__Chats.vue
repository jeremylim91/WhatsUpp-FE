<template>
  <div>
    <div class="chat-summary" v-for="chat in sampleChats" :key="chat.name">
      <div class="name">{{ chat.name }}</div>
      <div class="latestmsg">{{ chat.latestMsg }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sampleChats: [
        { name: "Joel", avatar: ":)", latestMsg: "sup bro" },
        { name: "Justin", avatar: ":)", latestMsg: "Eh wanna go lunch?" }
        //
      ]
    };
  }
};
</script>
<style scoped>
.chat-summary {
  margin: 0.5em 0.2em 0.5em;
  border-bottom: 0.1em solid lightgrey;
  overflow: scroll;
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
