<template>
  <div class="page-container">
    <div class="background-container">
      <div class="header"></div>
      <div class="body"></div>
    </div>
    <div class="content">
      <div class="hero">
        <h3>Welcome to the Whatsupp instant messenger.</h3>
      </div>
      <div class="form-content">
        <h5>Please login to proceed</h5>
        <form>
          <div>
            <label for="fUsername">Username:</label>
            <input
              type="text"
              class="input-box"
              v-model="username"
              id="fUsername"
              name="fUsername"
            />
          </div>
          <div>
            <label for="fPassword">Password:</label>
            <input
              type="password"
              class="input-box"
              v-model="password"
              id="fPassword"
              name="fPassword"
            />
          </div>
          <div class="submit-row">
            <input class="btn" type="submit" @click="handleSubmit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["signIn"]),
    // handle form submission
    handleSubmit(event) {
      // prevent page refresh
      event.preventDefault();
      // es6 destructure to get username and password from state
      const { username, password } = this;
      // dispatch action
      this.signIn({ username, password });
    }
  }
};
</script>
<style scoped>
.page-container {
  display: flex;
  justify-content: center;
}
.background-container {
  height: 100vh;
  width: 100%;
  z-index: 0;
  position: relative;
}
.header {
  height: 25%;
  background-color: #03bea4;
}

.body {
  background-color: #d7dbd6;
  height: 75%;
  z-index: 0;
}
.content {
  background-color: #ffffff;
  display: inline-block;
  width: 60%;
  height: 50%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  z-index: 20;
  top: 15%;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 5px 10px;
  align-items: center;
}
.hero {
  padding-top: 0px;
  background-color: #d1e4e0;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.form-content {
  padding: 5px 20px 5px;
  max-width: 400px;
}
.submit-row {
  margin: 15px;
  display: flex;
  justify-content: center;
}
.btn {
  width: 60%;
  background-color: #2ebea4;
  height: 2em;
  border: none;
  border-radius: 25px;
}
</style>
