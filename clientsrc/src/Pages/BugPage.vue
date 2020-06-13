<template>
  <div class="bug-page container-fluid">
    <div class="row">
      <div class="col-12">
        <h3>Title</h3>
      </div>
      <div class="col">
        <h1>{{bug.title}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <h3>Reported By: {{bug.creator.name}}</h3>
      </div>
      <div class="col-6 text-right">
        <h2 v-if="bug.closed == true">
          Status:
          <span class="closed-color">Closed</span>
        </h2>
        <h2 v-if="bug.closed == false">
          Status:
          <span class="open-color">Open</span>
        </h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10 body-box bg-warning">
        <h5>{{bug.description}}</h5>
      </div>
      <div v-if="bug.closed == false" class="col-6 text-center mt-3">
        <button class="btn btn-danger">Close</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col">
        <h1>Notes</h1>
      </div>
      <div class="col-11 notes-box">
        <div class="row bg-light border text-center">
          <div class="col-3">
            <h3>Name</h3>
          </div>
          <div class="col-1">
            <h3>|</h3>
          </div>
          <div class="col-4">
            <h3>Message</h3>
          </div>
          <div class="col-1">
            <h3>|</h3>
          </div>
          <div class="col-3">
            <h3>Delete</h3>
          </div>
        </div>
        <div class="row notes-row">
          <note v-for="note in notes" :key="note.id" :note="note" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Note from "@/components/NoteComponent";
export default {
  name: "bug-page",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getActiveBug", this.$route.params.id);
    this.$store.dispatch("getNotes", this.$route.params.id);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    }
  },
  components: {
    Note
  }
};
</script>
<style scoped>
.closed-color {
  color: red;
}
.open-color {
  color: green;
}
.body-box {
  min-height: 30vh;
}
.notes-box {
  background-color: grey;
  height: 30vh;
}
.notes-row {
  overflow-x: auto;
  height: 100%;
}
</style>