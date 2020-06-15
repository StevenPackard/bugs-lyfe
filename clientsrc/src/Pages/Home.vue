<template>
  <div class="home container-fluid">
    <div class="row justify-content-center">
      <div class="col-3 text-center bg-white mt-3 shadow">
        <h1>Track your Bugs Lyfe here!</h1>
      </div>
    </div>
    <!-- Bug Display -->
    <div class="row mt-4 justify-content-center">
      <div class="col-11 border bug-display bg-info shadow">
        <div
          class="row top-box bg-secondary text-center align-items-center custom-border-bottom"
        >
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
          <div class="col-2 d-flex justify-content-center align-items-center">
            <h4>Status</h4>
            <div class="dropdown show">
              <a
                class="dropdown-toggle ml-2"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a
                  class="dropdown-item"
                  @click="(showSortOpen = true), (showSortClosed = false)"
                  href="#"
                  >Sort By Open</a
                >
                <a
                  class="dropdown-item"
                  @click="(showSortClosed = true), (showSortOpen = false)"
                  href="#"
                  >Sort By Closed</a
                >
              </div>
            </div>
          </div>
          <div class="col-1">
            <i class="fas fa-lg fa-bug"></i>
          </div>
          <div class="col-2">
            <h4>Last Modified</h4>
          </div>
        </div>
        <div v-if="showSortClosed" class="row">
          <!-- Bug Component -->
          <bug v-for="bug in bugsSortClosed" :key="bug.id" :bug="bug" />
        </div>
        <div v-if="showSortOpen" class="row">
          <!-- Bug Component -->
          <bug v-for="bug in bugsSortOpen" :key="bug.id" :bug="bug" />
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
    return {
      showSortOpen: true,
      showSortClosed: false,
    };
  },
  mounted() {
    this.$store.dispatch("getAllBugs");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
    bugsSortClosed() {
      return this.$store.state.bugs.sort((a, b) => {
        return b.closed - a.closed;
      });
    },
    bugsSortOpen() {
      return this.$store.state.bugs.sort((a, b) => {
        return a.closed - b.closed;
      });
    },
  },
  methods: {},
  components: {
    Bug,
  },
};
</script>
<style scoped>
.bug-display {
  height: 70vh;
  overflow-y: auto;
}
.top-box {
  height: 5vh;
}
.custom-border-bottom {
  border: 3px solid black;
}
.custom-border-left {
  border-left: 3px solid black;
}
.action {
  cursor: pointer;
}
</style>

let index = bugs.indexOf({_id: this.bug.id}) = 2 bugs[bugs.indexOf()++] if(index
== 0){ bugs[bugs.length - 1] }
