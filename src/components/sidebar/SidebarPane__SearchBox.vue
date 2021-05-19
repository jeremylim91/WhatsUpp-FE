<template>
  <div class="searchbox">
    <!-- use v-model to do two-way binding (i.e. under-the-hood: state informs search box, but user input also updates the state) -->
    <input type="text" placeholder="Search" v-model="searchInput" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchInput: ""
    };
  }
  // methods() {
  //   function test1() {
  //   }
  // }
};
</script>
<style scoped>
.searchbox {
  border: 1px solid black;
  height: 1.5em;
  padding: 0.2em 0.4em 0.2em;
  border-radius: 50px;
  background-color: whitesmoke;
  /* manage the positioning of its contents (i.e. the span) */
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchbox input {
  height: 80%;
  width: 90%;
  /* re-config the default display of the html 'input' el  */
  font-size: 0.8em;
  background-color: transparent;
  border: none;
  outline: none;
}
</style>
