<template>
  <div class="bug-component col-12 border-bottom my-1">
    <router-link class="nav-link" :to="{ name: 'BugPage', params: { id: bug.id }}">
      <div class="row text-center">
        <div class="col-3">
          <h4>{{bug.title}}</h4>
        </div>
        <div class="col-1 p-0">
          <h4>|</h4>
        </div>
        <div class="col-3 wrapper">
          <h4>{{bug.creator.name}}</h4>
        </div>
        <div class="col-1 p-0">
          <h4>|</h4>
        </div>
        <div class="col-1 p-0">
          <h4 v-if="bug.closed == false">Open</h4>
          <h4 v-if="bug.closed == true">Closed</h4>
        </div>
        <div class="col-1">
          <h4>|</h4>
        </div>
        <div class="col-2">
          <h4>
            {{ new Date(bug.createdAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            }) }}
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
  computed: {},
  methods: {},
  components: {},
  props: ["bug"]
};
</script>


<style scoped>
.wrapper {
  word-wrap: break-word;
}
</style>