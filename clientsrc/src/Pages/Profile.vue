<template>
  <div class="about container-fluid">
    <div class="row text-center">
      <div class="col">
        <h1>Welcome {{ profile.name }}</h1>
        <img class="rounded" :src="profile.picture" alt />
        <p>{{ profile.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
