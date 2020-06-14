<template>
  <div class="note-component col-12 border-bottom my-1">
    <div class="row bg-light border text-center align-items-center">
      <div class="col-4 border-right">
        <h3>{{note.creator.name}}</h3>
      </div>

      <div class="col-6 border-left border-right">
        <h5>{{note.content}}</h5>
      </div>

      <div class="col-2 border-left">
        <button @click="deleteNote" class="btn btn-danger">X</button>
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
  methods: {
    deleteNote() {
      this.$store.dispatch("deleteNote", this.note);
    }
  },
  components: {},
  props: ["note"]
};
</script>


<style scoped>
.wrapper {
  word-wrap: break-word;
}
</style>