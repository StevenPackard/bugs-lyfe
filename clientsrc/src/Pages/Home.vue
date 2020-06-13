<template>
  <div class="home container-fluid">
    <div class="row justify-content-center">
      <div class="col-6 text-center">
        <h1>Track your Bugs Lyfe here!</h1>
      </div>
    </div>
    <!-- Bug Display -->
    <div class="row mt-5 justify-content-center">
      <div class="col-11 border bug-display bg-warning">
        <div class="row top-box bg-info text-center text-light">
          <div class="col-3">
            <h4>Title</h4>
          </div>
          <div class="col-1">
            <h4>|</h4>
          </div>
          <div class="col-3">
            <h4>Reported By</h4>
          </div>
          <div class="col-1">
            <h4>|</h4>
          </div>
          <div class="col-1">
            <h4>Status</h4>
          </div>
          <div class="col-1">
            <h4>|</h4>
          </div>
          <div class="col-2">
            <h4>Last Modified</h4>
          </div>
        </div>
        <div class="row">
          <!-- Bug Component -->
          <bug v-for="bug in bugs" :key="bug.id" :bug="bug" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bug from "@/components/BugComponent";
export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getAllBugs");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  },
  components: {
    Bug
  }
};
</script>
<style scoped>
.bug-display {
  height: 60vh;
  overflow-y: auto;
}
</style>
