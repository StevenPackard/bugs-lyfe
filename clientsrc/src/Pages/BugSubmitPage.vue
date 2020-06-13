<template>
  <div class="bug-submit container-fluid">
    <div class="row">
      <form class="form-inline justify-content-center col-12 my-2" @submit.prevent="reportBug">
        <input
          class="form-control col-lg-3 mx-2"
          type="text"
          placeholder="title"
          v-model="newBug.title"
          required
        />
        <input
          class="form-control col-lg-3 mx-2"
          type="text"
          placeholder="description"
          v-model="newBug.description"
        />
        <button class="btn btn-success btn-outline-dark mt-md-0 mt-3" type="submit">Report</button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  name: "bug-submit",
  data() {
    return {
      newBug: {}
    };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>