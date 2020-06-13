<template>
  <div class="note-component col-12 border-bottom my-1">
    <div class="row bg-light border text-center">
      <div class="col-3">
        <h3>{{note.creator.name}}</h3>
      </div>
      <div class="col-1">
        <h3>|</h3>
      </div>
      <div class="col-4">
        <p>{{note.content}}</p>
      </div>
      <div class="col-1">
        <h3>|</h3>
      </div>
      <div class="col-3">
        <button class="btn btn-danger">X</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "note-component",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
  props: ["note"]
};
</script>


<style scoped>
.wrapper {
  word-wrap: break-word;
}
</style>