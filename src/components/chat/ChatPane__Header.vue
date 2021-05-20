<template>
  <div class="header">
    <div>{{ name }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "chat name"
    };
  }
};
</script>
<style scoped>
.header {
  border: 1px solid black;
  margin: 0px -10px 10px;
  overflow: hidden;
  background-color: lightgoldenrodyellow;
  padding: 0.2em 1em 0.2em;
  height: 2.5em;
  display: flex;
  align-items: center;
}
</style>
