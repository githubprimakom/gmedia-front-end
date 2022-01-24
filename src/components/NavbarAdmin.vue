<template>
  <div class="dashboard-navigation">
    <div :class="`sidebar ${$attrs.widthContent > 992 ? '' : 'hide'}`">
      <div
        class="btn btn-light d-flex align-items-center d-lg-none d-block mb-4"
        @click="sidebar"
      >
        <i class="fas fa-times me-2"></i>
        Close
      </div>
      <router-link :to="{ name: 'Index' }">
        <div class="d-flex align-items-center mb-4">
          <img :src="dataLanding.logo" alt="" style="height: 45px;" />
          <div class="logo-text ms-2">
            {{ dataLanding.nama }}
          </div>
        </div>
      </router-link>
      <div class="height-hide">
        <div class="menu-wrapper">
          <router-link :to="{ name: 'Dashboard Admin' }">
            <div
              :class="
                `item ${
                  $route.fullPath == '/admin' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-chart-line text-primary none"></i>
                <i class="fas fa-chart-line text-white active"></i>
              </div>
              <div class="text">Dashboard</div>
            </div>
          </router-link>
        </div>
        <div class="menu-wrapper">
          <div class="menu-name">Menu</div>
          <router-link :to="{ name: 'Fakultas Master' }">
            <div
              :class="
                `item ${
                  link[2] == 'perusahaan' ? 'active' : ''
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
                <i class="far fa-building text-primary none"></i>
                <i class="far fa-building text-white active"></i>
              </div>
              <div class="text">Data Perusahaan</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'Prodi Master' }">
            <div
              :class="
                `item ${
                  link[2] == 'kantor-cabang' ? 'active' : ''
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
                <i class="fas fa-code-branch text-primary none"></i>
                <i class="fas fa-code-branch text-white active"></i>
              </div>
              <div class="text">Data Kantor Cabang</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'Gugus Master' }">
            <div
              :class="
                `item ${
                  link[2] == 'departemen' ? 'active' : ''
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
                <i class="fas fa-university text-primary none"></i>
                <i class="fas fa-university text-white active"></i>
              </div>
              <div class="text">Data Departemen</div>
            </div>
          </router-link>

          <router-link :to="{ name: 'Mahasiswa Master' }">
            <div
              :class="
                `item ${
                  link[2] == 'staff' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-users text-primary none"></i>
                <i class="fas fa-users text-white active"></i>
              </div>
              <div class="text">Data Staff</div>
            </div>
          </router-link>

          <router-link :to="{ name: 'Materi Master' }">
            <div
              :class="
                `item ${
                  link[2] == 'materi' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-book text-primary none"></i>
                <i class="fas fa-book text-white active"></i>
              </div>
              <div class="text">Materi</div>
            </div>
          </router-link>

          <div
            :class="
              `item ${
                link[2] == 'order' ? 'active' : ''
              } d-flex align-items-center`
            "
            data-bs-toggle="collapse"
            data-bs-target="#order"
            aria-expanded="false"
            aria-controls="order"
          >
            <div
              style="width: 20px"
              class="icons d-flex justify-content-center me-2"
            >
              <i class="fas fa-tasks text-primary none"></i>
              <i class="fas fa-tasks text-white active"></i>
            </div>
            <div class="text">Penugasan</div>
          </div>
          <div class="collapse show" id="order">
            <router-link :to="{ name: 'Bank Soal' }">
              <div
                :class="
                  `item sub ${
                    link[2] == 'bank-soal' ? 'active' : ''
                  } d-flex align-items-center`
                "
              >
                <div class="icons me-2">
                  <i class="far fa-circle text-primary none"></i>
                  <i class="far fa-circle text-white active"></i>
                </div>
                <div class="text">Bank Soal</div>
              </div>
            </router-link>
            <router-link :to="{ name: 'Tugas Master' }">
              <div
                :class="
                  `item sub ${
                    link[2] == 'tugas' ? 'active' : ''
                  } d-flex align-items-center`
                "
              >
                <div class="icons me-2">
                  <i class="far fa-circle text-primary none"></i>
                  <i class="far fa-circle text-white active"></i>
                </div>
                <div class="text">Tugas</div>
              </div>
            </router-link>
            <router-link :to="{ name: 'Penilaian Master' }">
              <div
                :class="
                  `item sub ${
                    link[2] == 'penilaian' ? 'active' : ''
                  } d-flex align-items-center`
                "
              >
                <div class="icons me-2">
                  <i class="far fa-circle text-primary none"></i>
                  <i class="far fa-circle text-white active"></i>
                </div>
                <div class="text">Penilaian</div>
              </div>
            </router-link>
          </div>

          <router-link :to="{ name: 'Kegiatan Master' }">
            <div
              :class="
                `item ${
                  $route.fullPath == '/admin/kegiatan' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-calendar-alt text-primary none"></i>
                <i class="fas fa-calendar-alt text-white active"></i>
              </div>
              <div class="text">Jadwal Kegiatan</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'Streaming Master' }">
            <div
              :class="
                `item ${
                  $route.fullPath == '/admin/streaming' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-video text-primary none"></i>
                <i class="fas fa-video text-white active"></i>
              </div>
              <div class="text">Streaming</div>
            </div>
          </router-link>

          <div
            :class="
              `item ${
                link[2] == 'order' ? 'active' : ''
              } d-flex align-items-center`
            "
            data-bs-toggle="collapse"
            data-bs-target="#konten"
            aria-expanded="false"
            aria-controls="order"
          >
            <div
              style="width: 20px"
              class="icons d-flex justify-content-center me-2"
            >
              <i class="fas fa-cog text-primary none"></i>
              <i class="fas fa-cog text-white active"></i>
            </div>
            <div class="text">Kontent & Informasi</div>
          </div>
          <div class="collapse show" id="konten">
            <router-link :to="{ name: 'Kontent Logo Master' }">
              <div
                :class="
                  `item sub ${
                    link[3] == 'logo' ? 'active' : ''
                  } d-flex align-items-center`
                "
              >
                <div class="icons me-2">
                  <i class="far fa-circle text-primary none"></i>
                  <i class="far fa-circle text-white active"></i>
                </div>
                <div class="text">Nama & Logo</div>
              </div>
            </router-link>
            <router-link :to="{ name: 'Kontent Header Master' }">
              <div
                :class="
                  `item sub ${
                    link[3] == 'header' ? 'active' : ''
                  } d-flex align-items-center`
                "
              >
                <div class="icons me-2">
                  <i class="far fa-circle text-primary none"></i>
                  <i class="far fa-circle text-white active"></i>
                </div>
                <div class="text">Header</div>
              </div>
            </router-link>
            <router-link :to="{ name: 'Kontent Analytic Master' }">
              <div
                :class="
                  `item sub ${
                    link[3] == 'analytic' ? 'active' : ''
                  } d-flex align-items-center`
                "
              >
                <div class="icons me-2">
                  <i class="far fa-circle text-primary none"></i>
                  <i class="far fa-circle text-white active"></i>
                </div>
                <div class="text">Analytic</div>
              </div>
            </router-link>
            <router-link :to="{ name: 'Kontent VisiMisi Master' }">
              <div
                :class="
                  `item sub ${
                    link[3] == 'visimisi' ? 'active' : ''
                  } d-flex align-items-center`
                "
              >
                <div class="icons me-2">
                  <i class="far fa-circle text-primary none"></i>
                  <i class="far fa-circle text-white active"></i>
                </div>
                <div class="text">Visi & Misi</div>
              </div>
            </router-link>
            <router-link :to="{ name: 'Kontent Tentang Master' }">
              <div
                :class="
                  `item sub ${
                    link[3] == 'tentang' ? 'active' : ''
                  } d-flex align-items-center`
                "
              >
                <div class="icons me-2">
                  <i class="far fa-circle text-primary none"></i>
                  <i class="far fa-circle text-white active"></i>
                </div>
                <div class="text">Tentang</div>
              </div>
            </router-link>
            <router-link :to="{ name: 'Kontent Footer Master' }">
              <div
                :class="
                  `item sub ${
                    link[3] == 'footer' ? 'active' : ''
                  } d-flex align-items-center`
                "
              >
                <div class="icons me-2">
                  <i class="far fa-circle text-primary none"></i>
                  <i class="far fa-circle text-white active"></i>
                </div>
                <div class="text">Footer</div>
              </div>
            </router-link>
          </div>
          <router-link :to="{ name: 'Superadmin Management' }">
            <div
              :class="
                `item ${
                  link[2] == 'superadmin' ? 'active' : ''
                } d-flex align-items-center`
              "
              data-bs-toggle="collapse"
              data-bs-target="#userManagement"
              aria-expanded="false"
              aria-controls="order"
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-user-circle text-primary none"></i>
                <i class="fas fa-user-circle text-white active"></i>
              </div>
              <div class="text">User Management</div>
            </div>
          </router-link>

          <router-link :to="{ name: 'Presensi Master' }">
            <div
              :class="
                `item ${
                  link[2] == 'presensi' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="far fa-id-card text-primary none"></i>
                <i class="far fa-id-card text-white active"></i>
              </div>
              <div class="text">Data Presensi</div>
            </div>
          </router-link>
        </div>
        <div class="menu-wrapper">
          <div class="menu-name">Lainnya</div>
          <router-link :to="{ name: 'Logout' }">
            <div class="item logout d-flex align-items-center">
              <div class="icons me-2">
                <i class="fas fa-sign-out-alt text-primary none"></i>
                <i class="fas fa-sign-out-alt text-white active"></i>
              </div>
              <div class="text">Logout</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div :class="`content ${$attrs.widthContent > 992 ? '' : 'hide'}`">
      <div class="section pt-3 mb-5">
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
