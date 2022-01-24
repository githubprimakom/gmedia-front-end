<template>
  <div class="dashboard">
    <NavbarMahasiswa :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-5">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="title-content">List Materi</div>
                <div class="title-type-soal">
                  Materi
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center" v-if="!dataMateri">
          <div class="card-shadow">
            <div class="px-5 py-3">
              <Loader text="Sedang memuat data materi." />
            </div>
          </div>
        </div>
        <div class="row" v-if="dataMateri">
          <div
            class="col-md-4 col-sm-6"
            v-for="(item, id) in dataMateri.data"
            :key="id"
          >
            <router-link
              :to="{
                name: 'Detail Materi Mahasiswa',
                params: { id: item.uuid },
              }"
            >
              <div class="card-shadow mb-3">
                <div class="p-3">
                  <div class="mb-4">
                    <div
                      class="img-question d-flex align-items-center justify-content-center"
                    >
                      <img :src="item.cover_url" alt="" class="w-100" />
                    </div>
                  </div>
                  <div>
                    <h6>{{ item.judul }}</h6>
                    <p
                      style="font-size: 16px; font-weight: 300; display: -webkit-box; overflow: hidden !important; -webkit-line-clamp: 3; -webkit-box-orient: vertical;"
                      v-html="item.isi"
                    ></p>
                  </div>
                  <hr />
                  <div
                    class="d-flex justify-content-between align-items-center mt-5"
                  >
                    <div
                      class="py-1 px-2 text-success success"
                      style="border-radius: 7px; font-weight: 500;"
                    >
                      {{ item.level }}
                    </div>
                    <div style="opacity: .5">
                      {{ formatDate(item.created_at) }}
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div
          class="d-flex justify-content-center align-items-center mt-5 pb-5"
          v-if="dataMateri"
        >
          <div v-for="(item, id) in dataMateri.links" :key="id">
            <div
              :class="
                `pagination-arrow ${
                  item.active ? 'bg-primary cursor-pointer' : 'bg-secondary'
                } me-3 d-flex align-items-center justify-content-center`
              "
              @click="navigation(type, item.url)"
              v-if="item.label == 'pagination.previous'"
            >
              <i class="fas fa-chevron-left text-white"></i>
            </div>
            <div
              class="d-flex align-items-center"
              v-if="
                item.label !== 'pagination.previous' &&
                  item.label !== 'pagination.next'
              "
            >
              <div
                :class="
                  `pagination-number ${
                    item.active ? 'text-primary' : ''
                  } px-2 py-1 mx-2`
                "
                @click="navigation(type, item.url)"
              >
                {{ item.label }}
              </div>
            </div>
            <div
              :class="
                `pagination-arrow ${
                  item.active ? 'bg-primary cursor-pointer' : 'bg-secondary'
                } ms-3 d-flex align-items-center justify-content-center`
              "
              v-if="item.label == 'pagination.next'"
              @click="navigation(type, item.url)"
            >
              <i class="fas fa-chevron-right text-white"></i>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["url"]),
  },
  data: function() {
    return {
      width: null,
      dataMateri: null,
    };
  },
  methods: {
    formatDate(date) {
      return moment(date)
        .locale("id")
        .format("DD MMM YY");
    },
    changeType(type) {
      this.dataMateri = null;
      this.type = type;
      axios
        .get(`${this.url}tugas/superadmin/soal?tipe=` + type, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.dataMateri = res.data.data;
        })
        .catch((err) => {
          console.log(err);
          // localStorage.clear();
        });
    },
    navigation(type, url) {
      if (url) {
        this.dataMateri = null;

        axios
          .get(url + "&tipe=" + type, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            this.dataMateri = res.data.data;
          })
          .catch((err) => {
            console.log(err);
            // localStorage.clear();
          });
      }
    },
    deleteSoal(id) {
      console.log(id);

      Swal.fire({
        title: "Apakah anda yakin menghapus soal ini?",
        text: "Data anda tidak dapat dikembalikan setelah dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fb4b4b",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Hapus Soal!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${this.url}tugas/superadmin/soal/` + id, {
              headers: {
                Authorization: localStorage.token,
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                Swal.fire("Soal telah dihapus!", "", "success").then(() => {
                  location.reload();
                });
              } else {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: res.data.messages,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
  mounted() {
    axios
      .get(`${this.url}tugas/mahasiswa/materi`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        console.log(res);
        this.dataMateri = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.width = $(document).width();

    $(document).ready(function() {
      $(".table").DataTable();
    });
  },
};
</script>
