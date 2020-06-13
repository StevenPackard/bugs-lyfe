<template>
  <div class="bug-component col-12 border-bottom my-1">
    <div class="row text-center">
      <div class="col-2">
        <h3>{{bug.title}}</h3>
      </div>
      <div class="col-1">
        <h3>|</h3>
      </div>
      <div class="col-2">
        <h4>{{bug.creator.name}}</h4>
      </div>
      <div class="col-1">
        <h3>|</h3>
      </div>
      <div class="col-2">
        <h3>{{bug.closed}}</h3>
      </div>
      <div class="col-1">
        <h3>|</h3>
      </div>
      <div class="col-2">
        <h3>
          {{ new Date(bug.createdAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          }) }}
        </h3>
      </div>
    </div>
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
</style>