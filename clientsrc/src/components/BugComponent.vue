<template>
  <div class="bug-component col-12 border-bottom my-1 bg-secondary">
    <router-link
      class="nav-link"
      :to="{ name: 'BugPage', params: { id: bug.id } }"
    >
      <div class="row text-center align-items-center">
        <div class="col-3">
          <h4>{{ bug.title }}</h4>
        </div>
        <div class="col-1">
          <i class="fas fa-lg fa-bug"></i>
        </div>
        <div class="col-2">
          <h4>{{ bug.creator.name }}</h4>
        </div>
        <div class="col-1">
          <i class="fas fa-lg fa-bug"></i>
        </div>
        <div class="col-2">
          <h4 class="open-color" v-if="bug.closed == false">Open</h4>
          <h4 class="closed-color" v-if="bug.closed == true">Closed</h4>
        </div>
        <div class="col-1">
          <i class="fas fa-lg fa-bug"></i>
        </div>
        <div class="col-2">
          <h4>
            {{
              new Date(bug.updatedAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </h4>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "bug-component",
  data() {
    return {};
  },
  computed: {
    timeAgo() {},
  },
  methods: {},
  components: {},
  props: ["bug"],
};
</script>

<style scoped>
.wrapper {
  word-wrap: break-word;
}
.open-color {
  color: green;
}
.closed-color {
  color: red;
}
.custom-border-right {
  border-right: 3px solid black;
}
.custom-border-left {
  border-left: 3px solid black;
}
</style>
