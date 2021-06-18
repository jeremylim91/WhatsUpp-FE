<template>
  <div class="header">
    <div>{{ getRoomName }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getRoomName: "getRoomName"
    })
  }
};
</script>
<style scoped>
.header {
  grid-area: chatHeader;
  border: 1px solid #ededed;
  /* margin: 0px -10px 10px; */
  overflow: hidden;
  background-color: #ededed;
  padding: 0.2em 1em 0.2em;
  /* height: 2.5em; */
  display: flex;
  align-items: center;
  font-weight: 700;
}
</style>
