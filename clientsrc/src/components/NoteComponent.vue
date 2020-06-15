<template>
  <div class="note-component col-12 border-bottom my-1">
    <div class="row bg-light border text-center align-items-center">
      <div class="col-3 border-right">
        <h3>{{ note.creator.name }}</h3>
      </div>
      <div class="col-1">
        <i class="fas fa-lg fa-bug"></i>
      </div>
      <div class="col-5 border-left border-right">
        <h5>{{ note.content }}</h5>
      </div>
      <div class="col-1">
        <i class="fas fa-lg fa-bug"></i>
      </div>
      <div class="col-2 border-left">
        <button
          v-if="isCreator"
          @click="showDeleteNoteAlert"
          class="btn btn-danger"
        >
          X
        </button>
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
  computed: {
    isCreator() {
      return this.$store.state.profile.email == this.note.creatorEmail;
    },
  },
  methods: {
    deleteNote() {
      this.$store.dispatch("deleteNote", this.note);
    },
    showDeleteNoteAlert() {
      swal({
        title: "Are you sure?",
        text: "Once delete, you will not be able to recover this note!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // swal("List deleted!", {
          //   icon: "success",
          // });
          this.deleteNote();
        }
      });
    },
  },
  components: {},
  props: ["note"],
};
</script>

<style scoped>
.wrapper {
  word-wrap: break-word;
}
</style>
