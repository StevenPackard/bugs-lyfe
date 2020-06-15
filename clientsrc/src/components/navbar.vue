<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <i class="fas fa-bug"></i> Lyfe
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link"
            >Home</router-link
          >
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Profile' }"
        >
          <router-link class="nav-link" :to="{ name: 'Profile' }"
            >Profile</router-link
          >
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-info mx-5"
          data-toggle="modal"
          data-target="#reportBugModal"
          v-if="$auth.isAuthenticated"
        >
          Report a bug
        </button>
      </span>
      <span class="navbar-text">
        <button
          class="btn btn-success mx-2"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >
          Login
        </button>
        <button class="btn btn-danger" @click="logout" v-else>logout</button>
      </span>
    </div>
    <div
      class="modal fade"
      id="reportBugModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="reportBugModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="reportBugModalLabel">Report a Bug</h5>
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
                <label for="bug-title" class="col-form-label">Title:</label>
                <input
                  type="text"
                  v-model="newBug.title"
                  class="form-control"
                  id="bug-title"
                />
              </div>
              <div class="form-group">
                <label for="bug-description" class="col-form-label"
                  >Description:</label
                >
                <textarea
                  class="form-control"
                  v-model="newBug.description"
                  id="bug-description"
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
            <button
              type="submit"
              class="btn btn-primary"
              id="submitButton"
              @click="showSubmitBugAlert"
            >
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
export default {
  name: "Navbar",
  data() {
    return {
      newBug: {},
    };
  },
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
      this.$store.dispatch("getProfile");
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    },
    submitBug() {
      this.$store.dispatch("submitBug", { ...this.newBug });
      this.newBug = {};
    },
    showSubmitBugAlert() {
      swal({
        title: "Are you sure?",
        text:
          "Once you report this bug everyone will be able to see it and it cannot be deleted.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // swal("List deleted!", {
          //   icon: "success",
          // });
          $("#reportBugModal").modal("hide");
          this.submitBug();
        }
      });
    },
  },
};
</script>

<style>
/* .navbar {
  background-image: linear-gradient(
    110deg,
    rgba(28, 181, 224, 0.4) 0,
    #000046 90%
  );
} */
</style>
