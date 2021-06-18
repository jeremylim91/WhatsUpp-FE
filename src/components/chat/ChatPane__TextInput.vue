<template>
  <div class="text-input-container">
    <input
      type="text"
      class="input-box"
      v-model="textInput"
      @keyup.enter="emitInputToDb"
      placeholder="Type a message"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      textInput: ""
    };
  },
  // dispatch an action to save the user's input to the db
  methods: {
    emitInputToDb(event) {
      const msgContent = event.target.value;
      this.$store.dispatch("emitInputToDb", { msgContent });
      // empty the input field
      this.textInput = "";
    }
  }
};
</script>
<style scoped>
.text-input-container {
  /* position: fixed; */
  /* bottom: 0px; */
  /* height: 3em; */
  width: 100%;
  grid-area: textInputArea;
  background-color: #f0f0f0;
  /* margin: 0px -10px 0px; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
}
.input-box {
  font-size: 1em;
  height: 70%;
  width: 90%;
  border-radius: 50px;
  padding: 0px 0.5em 0px;
  outline: none;
  border: 1px solid #f0f0f0;
}
</style>
