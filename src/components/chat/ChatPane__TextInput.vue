<template>
  <div class="text-input-container">
    <input
      type="text"
      class="input-box"
      v-model="textInput"
      @keyup.enter="emitInputToDb"
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
  position: absolute;
  bottom: 0px;
  height: 3em;
  background-color: lightsalmon;
  width: 100%;
  margin: 0px -10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-box {
  font-size: 1em;
  height: 70%;
  width: 90%;
  border-radius: 50px;
  padding: 0px 0.5em 0px;
  outline: none;
}
</style>
