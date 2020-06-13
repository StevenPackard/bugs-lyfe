<template>
  <div id="app" class="app-grow">
    <navbar />
    <router-view class="grow" />
    <footer>
      <p class="text-center">Made by Steven Packard</p>
      <p></p>
    </footer>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    if (this.$auth.isAuthenticated) {
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
    }
  },
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";
</style>
<style>
.app-grow {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: auto;
}
.grow {
  flex-grow: 1;
}
</style>
