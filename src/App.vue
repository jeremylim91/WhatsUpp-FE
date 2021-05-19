<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  // "the value stored in the data property is a function"
  data() {
    return {
      msg: "This is 'msg' in the data obj"
    };
  }
};
</script>
