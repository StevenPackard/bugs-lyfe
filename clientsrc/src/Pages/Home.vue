<template>
  <div class="home container-fluid">
    <div class="row justify-content-center">
      <div class="col-4 text-center bg-white mt-3 shadow">
        <h1>Track your Bugs Lyfe here!</h1>
      </div>
    </div>
    <!-- Bug Display -->
    <div class="row mt-4 justify-content-center">
      <div class="col-11 border bug-display bg-info shadow">
        <div class="row top-box bg-secondary text-center align-items-center custom-border-bottom">
          <div class="col-3">
            <h4>Title</h4>
          </div>
          <div class="col-1">
            <i class="fas fa-lg fa-bug"></i>
          </div>
          <div class="col-2">
            <h4>Reported By</h4>
          </div>
          <div class="col-1">
            <i class="fas fa-lg fa-bug"></i>
          </div>
          <div class="col-2">
            <h4>Status</h4>
          </div>
          <div class="col-1">
            <i class="fas fa-lg fa-bug"></i>
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
.top-box {
  height: 5vh;
}
.custom-border-bottom {
  border-bottom: 3px solid black;
}
.custom-border-left {
  border-left: 3px solid black;
}
</style>
