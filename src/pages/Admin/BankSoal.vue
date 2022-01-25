<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-5">
          <div class="p-3">
            <div class="row justify-content-between align-items-center">
              <div class="col-lg-6 col-sm-12 mb-2">
                <div class="title-content">Bank Soal</div>
                <div class="title-type-soal">
                  Soal
                  <span class="text-capitalize">{{ type.toLowerCase() }}</span>
                </div>
              </div>
              <div
                class="col-lg-6 col-sm-12 mb-2 d-flex justify-content-end align-items-center"
              >
                <button
                  class="btn btn-outline-success me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#tambahModal"
                >
                  <i class="fas fa-plus"></i> Add tag
                </button>
                <div class="dropdown">
                  <button
                    class="btn btn-outline-primary dropdown-toggle"
                    type="button"
                    id="tipeSoal"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Pilih Tipe Soal
                  </button>
                  <ul class="dropdown-menu me-2" aria-labelledby="tipeSoal">
                    <li>
                      <div
                        class="dropdown-item cursor-pointer d-flex align-items-center"
                        @click="changeType('ESSAI')"
                      >
                        <div
                          class="d-flex justify-content-center me-2"
                          style="width: 20px;"
                        >
                          <img src="../../assets/icons/essay.svg" alt="" />
                        </div>
                        <div>Esai</div>
                      </div>
                    </li>
                    <li>
                      <div
                        class="dropdown-item cursor-pointer d-flex align-items-center"
                        @click="changeType('PILIHAN GANDA')"
                      >
                        <div
                          class="d-flex justify-content-center me-2"
                          style="width: 20px;"
                        >
                          <img
                            src="../../assets/icons/pilihan_ganda.svg"
                            alt=""
                          />
                        </div>
                        <div>Pilihan Ganda</div>
                      </div>
                    </li>
                    <li>
                      <div
                        class="dropdown-item cursor-pointer d-flex align-items-center"
                        @click="changeType('UPLOAD')"
                      >
                        <div
                          class="d-flex justify-content-center me-2"
                          style="width: 20px;"
                        >
                          <img
                            src="../../assets/icons/pilihan_ganda.svg"
                            alt=""
                          />
                        </div>
                        <div>Upload</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-2" v-for="(tag, id) in tags" :key="id">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="id"
                    name="selected-tag"
                    :value="tag"
                    v-model="selectedTags"
                    @click="selectTag"
                  />
                  <label class="form-check-label" :for="id">
                    {{ tag }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mb-3">
          <router-link
            v-if="type == 'ESSAI'"
            :to="{ name: 'Buat Soal Esai' }"
            class="btn btn-success"
            type="button"
          >
            + Buat Soal Esai
          </router-link>
          <router-link
            v-else-if="type == 'PILIHAN GANDA'"
            :to="{ name: 'Buat Soal Pilihan Ganda' }"
            class="btn btn-success"
            type="button"
          >
            + Buat Soal Pilihan Ganda
          </router-link>
          <router-link
            v-else-if="type == 'UPLOAD'"
            :to="{ name: 'Buat Soal Upload' }"
            class="btn btn-success"
            type="button"
          >
            + Buat Soal yang Jawabannya Diupload
          </router-link>
        </div>
        <div class="d-flex justify-content-center" v-if="!dataSoal">
          <div class="card-shadow">
            <div class="px-5 py-3">
              <Loader text="Sedang memuat data soal." />
            </div>
          </div>
        </div>
        <div class="row" v-if="dataSoal">
          <div
            class="col-md-4 col-sm-6"
            v-for="(item, id) in dataSoal.data"
            :key="id"
          >
            <div class="card-shadow mb-3">
              <div class="p-3">
                <div class="menu-float-card">
                  <div class="dropstart">
                    <div
                      class="menu-float d-flex align-items-center justify-content-center"
                      :id="`menus${id}`"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fas fa-ellipsis-h"></i>
                    </div>
                    <ul class="dropdown-menu" :aria-labelledby="`menus${id}`">
                      <li>
                        <router-link
                          :to="{
                            name: 'Edit Soal Esai',
                            params: { id: item.uuid },
                          }"
                          class="dropdown-item d-flex align-items-center"
                          v-if="type == 'ESSAI'"
                        >
                          <div
                            class="d-flex justify-content-center me-2"
                            style="width: 20px;"
                          >
                            <img src="../../assets/icons/edit.svg" alt="" />
                          </div>
                          <div>Ubah</div>
                        </router-link>
                        <router-link
                          :to="{
                            name: 'Edit Soal Pilihan Ganda',
                            params: { id: item.uuid },
                          }"
                          class="dropdown-item d-flex align-items-center"
                          v-else-if="type == 'PILIHAN GANDA'"
                        >
                          <div
                            class="d-flex justify-content-center me-2"
                            style="width: 20px;"
                          >
                            <img src="../../assets/icons/edit.svg" alt="" />
                          </div>
                          <div>Ubah</div>
                        </router-link>
                        <router-link
                          :to="{
                            name: 'Edit Soal Upload',
                            params: { id: item.uuid },
                          }"
                          class="dropdown-item d-flex align-items-center"
                          v-else-if="type == 'UPLOAD'"
                        >
                          <div
                            class="d-flex justify-content-center me-2"
                            style="width: 20px;"
                          >
                            <img src="../../assets/icons/edit.svg" alt="" />
                          </div>
                          <div>Ubah</div>
                        </router-link>
                      </li>
                      <li>
                        <div
                          class="dropdown-item d-flex align-items-center cursor-pointer"
                          @click="deleteSoal(item.uuid)"
                        >
                          <div
                            class="d-flex justify-content-center me-2"
                            style="width: 20px;"
                          >
                            <img src="../../assets/icons/hapus.svg" alt="" />
                          </div>
                          <div>Hapus</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="mb-4" v-if="item.foto !== ''">
                  <div
                    class="img-question d-flex align-items-center justify-content-center"
                  >
                    <img
                      :src="item.foto"
                      alt=""
                      class="w-100"
                      v-if="
                        ['jpg', 'png', 'jpeg', 'gif'].includes(item.extension)
                      "
                    />
                    <a
                      :href="item.foto"
                      v-if="['mp4', 'avi'].includes(item.extension)"
                      target="_blank"
                    >
                      <i class="fas fa-video fa-5x"></i>
                    </a>
                  </div>
                </div>
                <div>
                  <div class="fw-bold mb-2">Soal</div>
                  <div
                    style="font-size: 16px; font-weight: 300;"
                    v-html="item.isi"
                  ></div>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center mt-5"
                >
                  <div
                    class="py-1 px-2 text-success success"
                    style="border-radius: 7px; font-weight: 500;"
                    v-if="item.kategori == 'MUDAH'"
                  >
                    Mudah
                  </div>
                  <div
                    class="py-1 px-2 text-warning warning"
                    style="border-radius: 7px; font-weight: 500;"
                    v-else-if="item.kategori == 'SEDANG'"
                  >
                    Sedang
                  </div>
                  <div
                    class="py-1 px-2 text-danger danger"
                    style="border-radius: 7px; font-weight: 500;"
                    v-else-if="item.kategori == 'SULIT'"
                  >
                    Sulit
                  </div>
                  <div style="opacity: .5">
                    {{ formatDate(item.created_at) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="d-flex justify-content-center align-items-center mt-5 pb-5"
          v-if="dataSoal"
        >
          <div v-for="(item, id) in dataSoal.links" :key="id">
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
    <div
      class="modal fade"
      id="tambahModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Tambah Tag
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <form action="" @submit.prevent="tambahTag">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="tag">Tag</label>
                      <div class="check-error">
                        <input
                          type="text"
                          name="name"
                          id="tag"
                          placeholder="Tag"
                          class="form-control"
                          v-model="newTag.name"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 footer-modal">
                    <div class="d-flex justify-content-end">
                      <button
                        class="btn btn-success"
                        style="margin-right: 24px;"
                        :disabled="!newTag.name"
                      >
                        Tambah
                      </button>
                      <a class="btn btn-outline-success" data-bs-dismiss="modal"
                        >Batal</a
                      >
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
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
      type: "ESSAI",
      tags: [],
      dataSoal: null,
      newTag: {
        name: "",
      },
      selectedTags: [],
    };
  },
  methods: {
    formatDate(date) {
      return moment(date)
        .locale("id")
        .format("DD MMM YY");
    },
    changeType(type) {
      this.dataSoal = null;
      this.type = type;
      axios
        .get(`${this.url}tugas/superadmin/soal?tipe=` + type, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.dataSoal = res.data.data;
        })
        .catch((err) => {
          console.log(err);
          // localStorage.clear();
        });
    },
    selectTag() {
      setTimeout(() => {
        this.dataSoal = null;
        axios
          .get(
            `${this.url}tugas/superadmin/soal?tipe=${this.type}&tags=${this.selectedTags}`,
            {
              headers: {
                Authorization: localStorage.token,
              },
            }
          )
          .then((res) => {
            console.log(res);
            this.dataSoal = res.data.data;
          })
          .catch((err) => {
            console.log(err);
            // localStorage.clear();
          });
      }, 100);
    },
    navigation(type, url) {
      if (url) {
        this.dataSoal = null;

        axios
          .get(url + "&tipe=" + type, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            this.dataSoal = res.data.data;
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
    tambahTag() {
      axios
        .post(`${this.url}tugas/superadmin/tag`, this.newTag, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.tags.unshift(this.newTag.name);
            this.newTag.name = "";
            $("#tambahModal").modal("toggle");
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: res.data.messages,
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    axios
      .get(`${this.url}tugas/superadmin/soal?tipe=` + this.type, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        console.log(res);
        this.dataSoal = res.data.data;
      })
      .catch((err) => {
        console.log(err);
        // localStorage.clear();
      });
    axios
      .get(`${this.url}tugas/superadmin/tag`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        console.log(res);
        this.tags = res.data.data;
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
