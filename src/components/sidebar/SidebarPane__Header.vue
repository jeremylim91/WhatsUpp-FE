<template>
  <div class="sidebar-header">
    <button type="button"><img src="../../assets/profilePic.png" /></button>
    <button type="button"><img src="../../assets/addContact.png" /></button>
    <button type="button"><img src="../../assets/messageAdd.png" /></button>
  </div>
</template>
<script>
export default {};
</script>

<style>
.sidebar-header {
  border: 1px solid black;
  margin: 0px -10px 10px;
  overflow: hidden;
  background-color: lightgoldenrodyellow;
  padding: 0.2em 0.2em 0.2em;
  /* display: flex;
  justify-content: flex-start; */
}
img {
  height: 2em;
  vertical-align: middle;
}
button {
  background-color: transparent;
  border: none;
  vertical-align: middle;
}
</style>
