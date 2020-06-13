<template>
  <div class="bug-page container-fluid">
    <div class="row">
      <div class="col">
        <h1>{{bug.title}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <h3>Reported By: {{bug.creatorEmail}}</h3>
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
    <div class="row justify-content-center mt-3">
      <div class="col-6">
        <h1>Notes</h1>
      </div>
      <div class="col-6 text-right">
        <button @click="noteForm = !noteForm" class="btn btn-success mr-5">Add Note</button>
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
        <div class="row">
          <note
            v-for="note in notes"
            :key="note.id"
            :note="note"
            :profile="profile"
            :bugId="bug.id"
          />
        </div>
      </div>
      <div class="col-10">
        <form v-if="noteForm" @submit.prevent="addNote" class="row justify-content-center">
          <div class="form-group col-10">
            <label for="new-comment">New Note</label>
            <input
              class="form-control form-control-lg wide-note"
              type="text"
              placeholder="new note..."
              v-model="newNote.content"
            />
          </div>
          <div class="col-2">
            <button type="submit" class="btn btn-success mt-4">+</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Note from "@/components/NoteComponent";
export default {
  name: "bug-page",
  data() {
    return {
      noteForm: false,
      newNote: {
        bugId: this.$route.params.id
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("resetActive");
    next();
  },
  mounted() {
    this.$store.dispatch("getActiveBug", this.$route.params.id);
    this.$store.dispatch("getNotes", this.$route.params.id);
  },
  methods: {
    addNote() {
      this.$store.dispatch("addNote", { ...this.newNote });
      this.newNote = {
        bugId: this.$route.params.id
      };
    }
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    },
    profile() {
      return this.$store.state.profile;
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
  min-height: 20vh;
}
.notes-box {
  background-color: grey;
  height: 30vh;
  overflow-y: auto;
}
.notes-row {
  overflow-x: auto;
  height: 100%;
}
.wide-note {
  width: 80%;
}
</style>