<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["setUserCredentialsInStore"])
  },
  created() {
    // When the app loads, or each time it reloads: check if the user has login credentials stored in cookies. If so, save these to the store
    this.setUserCredentialsInStore();
  }
};
</script>
<style>
/* body,
html {
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
}
* {
  box-sizing: border-box;
} */
</style>
