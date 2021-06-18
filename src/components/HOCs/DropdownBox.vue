<template>
  <div class="dropdown-container">
    <button class="toggle-btn" @click="handleClick">
      <slot name="toggler">
        Default toggle btn
      </slot>
    </button>

    <div
      class="content-container"
      v-if="isDropdownVisible"
      v-on-clickaway="away"
    >
      <slot name="dropdownContent">
        <div @click="handleSelect">This</div>
        <div @click="handleSelect">is</div>
        <div @click="handleSelect">default</div>
      </slot>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "DropdownBox",
  // props: ["isDropdownVisible"],
  mixins: [clickaway],
  data() {
    return {
      isDropdownVisible: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleClick() {
      console.log(`clicked!`);
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    handleSelect() {
      console.log(`clicked!`);
      // this.$emit("handleClick");
      this.close();
    },
    away: function() {
      this.isDropdownVisible = !this.isDropdownVisible;
    }
  }
};
</script>

<style>
.dropdown-container {
  position: relative;
  display: flex;
}
.content-container {
  background-color: limegreen;
  z-index: 20;
  position: absolute;
  top: 80%;
  left: 60%;
  padding: 0.8em 0.5em 0.8em;
}
.toggle-btn {
  vertical-align: middle;
}
</style>
