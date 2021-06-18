<template>
  <div class="sidebar-header">
    <DropdownBox @isDropdownBoxVisible="isDropdownBoxVisible">
      <template v-slot:toggler>
        <img src="../../assets/profilePic.png" />
      </template>

      <template v-slot:dropdownContent>
        <button @click="signOut">Sign out</button>
      </template>
    </DropdownBox>
    <DropdownBox @isDropdownBoxVisible="isDropdownBoxVisible">
      <template v-slot:toggler>
        <img src="../../assets/addContact.png" />
      </template>
    </DropdownBox>
    <!-- <button type="button">
      <img src="../../assets/profilePic.png" />
    </button> -->
    <!-- <button type="button"><img src="../../assets/addContact.png" /></button> -->
    <button type="button" class="btn" @click="showModal">
      <img src="../../assets/messageAdd.png" />
    </button>
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
      @handleSubmit="createRoom({ roomName: textInput })"
    >
      <template v-slot:header>
        Create a new room
      </template>
      <template v-slot:body>
        <form>
          <label for="fRoomName">Room name</label>
          <input
            id="fRoomName"
            type="text"
            placeholder="Name of new room"
            v-model="textInput"
          />
        </form>
      </template>
      <template v-slot:footer> &nbsp</template>
    </Modal>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Modal from "../HOCs/Modal.vue";
import DropdownBox from "../HOCs/DropdownBox.vue";

export default {
  components: {
    Modal,
    DropdownBox
  },
  data() {
    return {
      isDropdownBoxVisible: false,
      isModalVisible: false,
      textInput: ""
    };
  },
  methods: {
    ...mapActions(["createRoom", "signOut"]),

    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showDropdown() {
      this.isModalVisible = true;
    },
    closeDropdown() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style>
.sidebar-header {
  grid-area: sidebarHeader;
  border: 1px solid #ededed;
  /* margin: 0px -10px 10px; */
  /* overflow: hidden; */
  /* height: 100%; */
  background-color: #ededed;
  padding: 0.2em 0.2em 0.2em;
  /* height: 2.5em; */
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
label {
  display: none;
}

#fRoomName {
  width: 100%;
}
</style>
