<template>
  <div class="text-input-container">
    <input type="text" class="input-box" v-model="textInput" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      textInput: ""
    };
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
}
</style>
