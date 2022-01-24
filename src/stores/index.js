import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // put variables and collections here
    getUserLogin: null,
    userData: null,
    url: "https://gmedia.primakom.co.id/",
  },
  actions: {
    getMahasiswa({ commit }) {
      if (localStorage.token && localStorage.token !== undefined) {
        axios
          .get(`${this.state.url}auth/mahasiswa/profil`, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.message == 'Unauthorize') {
              Swal.fire(
                "Sesi habis!",
                "Mohon melakukan login ulang",
                "warning"
              ).then(() => {
                window.location.replace("/");
                localStorage.clear();
              });
            } else {
              commit("SET_POSTS", res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        window.location.replace("/");
        console.log("Login First");
      }
    },
    getPemandu({ commit }) {
      if (localStorage.token && localStorage.token !== undefined) {
        axios
          .get(`${this.state.url}auth/pemandu/profil/`, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            console.log("pemandu");
            if (res.data.message == 'Unauthorize') {
              Swal.fire(
                "Sesi habis!",
                "Mohon melakukan login ulang",
                "warning"
              ).then(() => {
                window.location.replace("/");
                localStorage.clear();
              });
            } else {
              commit("SET_POSTS", res.data);
            }
          })
          .catch((err) => {
            console.log(err);
            // localStorage.clear();
          });
      } else {
        window.location.replace("/");
        console.log("Login First");
      }
    },
    getAdmin({ commit }) {
      if (localStorage.token && localStorage.token !== undefined) {
        axios
          .get(`${this.state.url}bemkm/superadmin/profil/`, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.message == 'Unauthorize') {
              Swal.fire(
                "Sesi habis!",
                "Mohon melakukan login ulang",
                "warning"
              ).then(() => {
                window.location.replace("/");
                localStorage.clear();
              });
            } else {
              commit("SET_POSTS", res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        window.location.replace("/");
        console.log("Login First");
      }
    },
    getLogin({ commit }) {
      if (localStorage.token && localStorage.token !== undefined) {
        axios
          .get(`${this.state.url}auth/decodetoken`, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.code == 401) {
              // Swal.fire(
              //   "Sesi habis!",
              //   "Mohon melakukan login ulang",
              //   "warning"
              // ).then(() => {
              //   window.location.replace("/");
              //   localStorage.clear();
              // });
            } else {
              commit("GET_LOGIN", res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  getters: {
    // put sychronous functions for changing state e.g. add, edit, delete
  },
  mutations: {
    SET_POSTS(state, data) {
      state.userData = data;
    },
    GET_LOGIN(state, data) {
      state.getUserLogin = data
    }
    // put sychronous functions for changing state e.g. add, edit, delete
  },
});
