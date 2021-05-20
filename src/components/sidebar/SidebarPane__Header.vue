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
  height: 2.5em;
  display: flex;
}
img {
  height: 2.5em;
  vertical-align: middle;
}
button {
  background-color: transparent;
  border: none;
}
</style>
