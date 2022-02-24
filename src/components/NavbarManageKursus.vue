<template>
  <div class="dashboard-navigation">
    <div :class="`sidebar ${$attrs.widthContent > 992 ? '' : 'hide'}`">
      <div class="btn btn-dark d-flex d-none d-lg-block text-start">
        <router-link :to="{ name: 'Kursus Master' }" class="text-white">
          <i class="fas fa-arrow-left me-2"></i>
          Kembali
        </router-link>
      </div>
      <div class="d-flex justify-content-between d-lg-none">
        <div class="col-9 btn btn-dark d-flex align-items-center me-1">
          <router-link :to="{ name: 'Kursus Master' }" class="text-white">
            <i class="fas fa-arrow-left me-2"></i>
            Kembali
          </router-link>
        </div>
        <div
          class="col-2 btn btn-light d-flex align-items-center"
          @click="sidebar"
        >
          <i class="fas fa-bars me-2"></i>
        </div>
      </div>
      <div class="height-hide">
        <div class="menu-wrapper">
          <router-link :to="{ name: 'Manage Kursus Index' }">
            <div
              :class="
                `item ${
                  $route.name == 'Manage Kursus Index' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-home text-primary none"></i>
                <i class="fas fa-home text-white active"></i>
              </div>
              <div class="text">Dashboard</div>
            </div>
          </router-link>
        </div>
        <div class="menu-wrapper">
          <div class="menu-name">Menu</div>
          <router-link
            :to="{ name: 'Manage Kursus Peserta', params: { id: 1 } }"
          >
            <div
              :class="
                `item ${
                  $route.name == 'Manage Kursus Peserta' ? 'active' : ''
                } d-flex align-items-center`
              "
              data-bs-toggle="collapse"
              aria-expanded="false"
              aria-controls="order"
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-users text-primary none"></i>
                <i class="fas fa-users text-white active"></i>
              </div>
              <div class="text">Data Peserta</div>
            </div>
          </router-link>
        </div>
        <div
          :class="`item d-flex align-items-center`"
          data-bs-toggle="collapse"
          data-bs-target="#order"
          aria-expanded="false"
          aria-controls="order"
        >
          <div
            style="width: 20px"
            class="icons d-flex justify-content-center me-2"
          >
            <i class="fas fa-file text-primary none"></i>
            <i class="fas fa-file text-white active"></i>
          </div>
          <div class="text">Topik</div>
        </div>
        <div class="collapse show" id="order">
          <router-link
            :to="{
              name: 'Manage Kursus Lihat Topik',
              params: { id: 1, topic: 1 },
            }"
          >
            <div
              :class="
                `item sub ${
                  $route.name == 'Manage Kursus Lihat Topik' &&
                  $route.params.topic == 1
                    ? 'active'
                    : ''
                } d-flex align-items-center`
              "
            >
              <div class="icons me-2">
                <i class="far fa-circle text-primary none"></i>
                <i class="far fa-circle text-white active"></i>
              </div>
              <div class="text">Topik 1</div>
            </div>
          </router-link>
        </div>
        <div class="collapse show" id="order">
          <router-link
            :to="{
              name: 'Manage Kursus Lihat Topik',
              params: { id: 1, topic: 2 },
            }"
          >
            <div
              :class="
                `item sub ${
                  $route.name == 'Manage Kursus Lihat Topik' &&
                  $route.params.topic == 2
                    ? 'active'
                    : ''
                } d-flex align-items-center`
              "
            >
              <div class="icons me-2">
                <i class="far fa-circle text-primary none"></i>
                <i class="far fa-circle text-white active"></i>
              </div>
              <div class="text">Topik 2</div>
            </div>
          </router-link>
        </div>
        <div class="collapse show" id="order">
          <router-link
            :to="{
              name: 'Manage Kursus Buat Topik',
              params: { id: 1 },
            }"
          >
            <div
              :class="
                `item sub ${
                  $route.name == 'Manage Kursus Buat Topik' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div class="icons me-2">
                <i class="fas fa-plus text-primary none"></i>
                <i class="fas fa-plus text-white active"></i>
              </div>
              <div class="text">Tambah</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div :class="`content ${$attrs.widthContent > 992 ? '' : 'hide'}`">
      <div class="section pt-3 mb-3">
        <nav>
          <div class="card-shadow">
            <div class="py-2 px-3">
              <div class="d-flex align-items-center justify-content-between">
                <div class="menu-bar" @click="sidebar">
                  <i class="fas fa-bars"></i>
                </div>
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center" v-if="userData">
                    <div class="text-end me-2">
                      <div class="username">{{ userData.data.nama }}</div>
                      <div class="role">Superadmin</div>
                    </div>
                    <div
                      class="profile align-items-center justify-content-center"
                    >
                      <img
                        src="../assets/ilustrasi/avatar-superadmin.svg"
                        alt=""
                        v-if="
                          userData.data.foto == '' ||
                            userData.data.foto == 'foto.jpg'
                        "
                      />
                      <img :src="userData.data.foto" v-else alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import Swal from "sweetalert2";
import { mapState } from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapState(["userData"]),
  },
  data: function() {
    return {
      link: this.$route.fullPath.split("/"),
      dataLanding: {
        logo: "",
        name: "",
      },
    };
  },
  beforeCreate() {
    this.$store.dispatch("getAdmin");
  },
  methods: {
    submit() {
      this.section = 0;
      Swal.fire("Data Berhasil Disimpan", "", "success");
      $("#request-modal").modal("hide");
    },
    sidebar() {
      $(".sidebar").toggleClass("hide");
      $(".content").toggleClass("hide");
    },
    logout() {
      localStorage.clear();
      window.location.replace("/");
    },
  },
  mounted() {
    axios
      .get(`https://gmedia.primakom.co.id/bemkm/landing/dashboard-navbar`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        console.log(result);
        this.dataLanding = result.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped></style>
