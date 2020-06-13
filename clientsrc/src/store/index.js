import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true,
});

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    notes: [],
    activeBug: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setAllBugs(state, bugs) {
      state.bugs = bugs;
    },
    setActiveBug(state, bug) {
      state.activeBug = bug;
    },
    setNotes(state, notes) {
      state.notes = notes;
    },
    addToNotes(state, note) {
      state.notes.push = note;
    },
    resetActive(state) {
      state.activeBug = {};
    },
  },
  actions: {
    //#region Profile Functions
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
    //#region Bug Functions
    async getAllBugs({ commit, dispatch }) {
      try {
        let res = await api.get("bugs");
        commit("setAllBugs", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getActiveBug({ commit, dispatch }, id) {
      try {
        let res = await api.get("bugs/" + id);
        commit("setActiveBug", res.data);
        console.log(this.state.activeBug);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
    //#region Note Functions
    async getNotes({ commit, dispatch }, id) {
      try {
        let res = await api.get("bugs/" + id + "/notes");
        commit("setNotes", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addNote({ commit, dispatch }, noteData) {
      try {
        let res = await api.post("notes", noteData);
        commit("addToNotes", res.data);
        dispatch("getNotes", noteData.bugId);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteNote({ commit, dispatch }, data) {
      try {
        let res = await api.delete("notes/" + data.id);
        dispatch("getNotes", data.bugId);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
  },
});
