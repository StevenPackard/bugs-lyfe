<template>
  <div class="bug-page container-fluid">
    <div class="row justify-content-center my-2">
      <div class="col-11 bg-white mb-2">
        <div class="row">
          <div class="col">
            <h1 class="m-0">{{ bug.title }}</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <h3>Reported By: {{ bug.creatorEmail }}</h3>
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
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-10 body-box bg-white shadow">
        <h5 class="p-2">{{ bug.description }}</h5>
      </div>
      <div class="col-12">
        <div v-if="bug.closed == false" class="row justify-content-center">
          <div v-if="isCreator" class="col-3 text-center mt-3">
            <button @click="showCloseBugAlert" class="btn btn-danger shadow">
              Close
            </button>
          </div>
          <div
            v-if="isCreator"
            data-toggle="modal"
            data-target="#editBugModal"
            class="col-3 text-center mt-3"
          >
            <button class="btn btn-primary shadow">Edit</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-3">
      <div class="col-11">
        <div class="row mb-2">
          <div class="col-2">
            <h1 class="bg-white text-center shadow">Notes</h1>
          </div>
          <div class="col-10 text-right">
            <button
              v-if="bug.closed == false"
              data-toggle="modal"
              data-target="#addNoteModal"
              class="btn btn-success mr-5 shadow"
            >
              Add Note
            </button>
          </div>
        </div>
      </div>

      <div class="col-11 notes-box shadow bg-info">
        <div class="row justify-content-center ">
          <div class="col-12">
            <div class="row bg-light text-center align-items-center">
              <div class="col-3 border-right">
                <h3>Name</h3>
              </div>
              <div class="col-1">
                <i class="fas fa-lg fa-bug"></i>
              </div>
              <div class="col-5 border-left border-right">
                <h3>Message</h3>
              </div>
              <div class="col-1">
                <i class="fas fa-lg fa-bug"></i>
              </div>
              <div class="col-2 border-left">
                <h3>Delete</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <note
            v-for="note in notes"
            :key="note.id"
            :note="note"
            :profile="profile"
          />
        </div>
      </div>
    </div>
    <!-- add note modal -->
    <div
      class="modal fade"
      id="addNoteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addNoteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addNoteModalLabel">Add a note</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <!-- <label for="bug-description" class="col-form-label">Description:</label> -->
                <textarea
                  class="form-control"
                  v-model="newNote.content"
                  id="note-description"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="addNote">
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- edit bug modal -->
    <div
      class="modal fade"
      id="editBugModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editBugModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editBugModalLabel">Edit Bug</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="bug-title-edit" class="col-form-label"
                  >Title:</label
                >
                <input
                  type="text"
                  v-model="bug.title"
                  class="form-control"
                  id="bug-title-edit"
                />
              </div>
              <div class="form-group">
                <label for="bug-description-edit" class="col-form-label"
                  >Description:</label
                >
                <textarea
                  class="form-control"
                  v-model="bug.description"
                  id="bug-description-edit"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary" @click="editBug">
              Edit Bug
            </button>
          </div>
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
    return {
      noteForm: false,
      newNote: {
        bugId: this.$route.params.id,
      },
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
      $("#addNoteModal").modal("hide");
      this.newNote = {
        bugId: this.$route.params.id,
      };
    },
    closeBug() {
      this.$store.dispatch("closeBug", this.bug.id);
    },
    editBug() {
      this.$store.dispatch("editBug", this.bug);
    },
    showCloseBugAlert() {
      swal({
        title: "Are you sure?",
        text:
          "Once closed, you will not be able to edit or add notes to this bug!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          $("#editBugModal").modal("hide");
          this.closeBug();
        }
      });
    },
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
    },
    isCreator() {
      return this.$store.state.profile.email == this.bug.creatorEmail;
    },
  },
  components: {
    Note,
  },
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
  overflow-y: auto;
  word-wrap: normal;
}
.notes-box {
  height: 35vh;
  overflow-y: auto;
}
.notes-row {
  overflow-x: auto;
  height: 100%;
}
.wide-note {
  width: 80%;
}
.text-color-blue {
  color: rgb(0, 0, 0);
}
</style>
