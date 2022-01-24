<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <router-link
                  :to="{
                    name: 'Materi Master',
                  }"
                  class="btn btn-primary me-2"
                  type="button"
                >
                  <i class="fas fa-arrow-left"></i>
                </router-link>
                <div>
                  <div class="title-content">
                    Detail Materi
                  </div>
                  <div class="title-type-soal">
                    {{ form.master.judul }}
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  :class="
                    `btn btn-sm ${
                      menu == 'Master Materi'
                        ? 'btn-primary'
                        : 'btn-outline-primary'
                    } me-2`
                  "
                  type="button"
                  @click="changeMenu('Master Materi')"
                >
                  Master Materi
                </button>
                <button
                  :class="
                    `btn btn-sm ${
                      menu == 'Departemen'
                        ? 'btn-primary'
                        : 'btn-outline-primary'
                    } me-2`
                  "
                  type="button"
                  @click="changeMenu('Departemen')"
                >
                  Departemen
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          :class="
            `${menu == 'Master Materi' ? 'd-block' : 'd-none'} card-shadow mb-3`
          "
        >
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="title-content">
                {{ menu }}
              </div>

              <button
                class="btn btn-outline-warning me-2"
                type="button"
                @click="changeStatus('edit')"
                v-if="status == 'default'"
              >
                Ubah
              </button>
              <button
                class="btn btn-danger me-2 text-white"
                type="button"
                @click="status = 'default'"
                v-else
              >
                Batal
              </button>
            </div>
            <div class="mt-4">
              <div class="row">
                <div class="col-md-4" v-if="status == 'default'">
                  <div
                    class="px-5 d-none d-md-flex justify-content-center pt-5"
                  >
                    <img
                      :src="form.master.cover_url"
                      alt=""
                      class="w-100"
                      style="max-width: 250px;"
                    />
                  </div>
                </div>
                <div :class="[status == 'default' ? 'col-md-8' : 'col-md-12']">
                  <div :class="`${status == 'default' ? 'd-block' : 'd-none'}`">
                    <div class="mb-3">
                      <label for="judul" class="d-block form-label"
                        >Judul</label
                      >
                      <div
                        class="d-inline-block border-radius px-3 py-2"
                        style="min-height: 40px; min-width: 100px; font-size: 16px; font-weight: 500; background-color: whitesmoke;"
                      >
                        {{ form.master.judul }}
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="isi" class="d-block form-label">Isi</label>
                      <div
                        v-html="form.master.isi"
                        class="border-radius px-3 py-2"
                        style="min-height: 100px; font-size: 16px; background-color: whitesmoke;"
                      ></div>
                    </div>
                    <div class="mb-3" v-if="form.master.file_url != ''">
                      <label for="file" class="d-block form-label">File</label>
                      <a
                        :href="form.master.file_url"
                        class="btn btn-primary btn-sm"
                        target="_blank"
                        ><i class="fas fa-external-link-alt"></i> File.{{
                          form.master.extension
                        }}</a
                      >
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <div class="mb-3">
                          <label class="form-label">Tipe</label>
                          <div style="font-size: 16px;">
                            <div>{{ form.master.tipe }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="mb-3">
                          <label class="form-label">Metode</label>
                          <div style="font-size: 16px;">
                            <div>{{ form.master.metode }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="mb-3">
                          <label class="form-label">Level</label>
                          <div style="font-size: 16px;">
                            <div>{{ form.master.level }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="mb-3">
                          <label class="form-label">Kempetensi</label>
                          <div style="font-size: 16px;">
                            <div>{{ form.master.kompetensi }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div :class="`${status == 'edit' ? 'd-block' : 'd-none'}`">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="judul" class="form-label">Judul</label>
                          <input
                            type="text"
                            class="form-control"
                            id="judul"
                            placeholder="Judul Materi"
                            v-model="form.master.judul"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="isi" class="form-label">Isi</label>
                          <textarea id="isi" class="d-none"></textarea>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-6">
                            <div class="mb-3">
                              <label for="bobot">Upload Cover</label>
                              <input
                                type="file"
                                id="gambarCover"
                                class="dropify"
                                @change="cekUploadCover()"
                              />
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="mb-3">
                              <label for="bobot">Upload File</label>
                              <input
                                type="file"
                                id="file"
                                class="dropify"
                                @change="cekUploadFile()"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <div class="mb-3">
                              <label for="kompetensi" class="form-label"
                                >Kompetensi</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Kompetensi"
                                id="kompetensi"
                                v-model="form.master.kompetensi"
                              />
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="mb-3">
                              <label for="tipe" class="form-label">Tipe</label>
                              <input
                                type="text"
                                class="form-control"
                                id="tipe"
                                placeholder="Tipe"
                                v-model="form.master.tipe"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <div class="mb-3">
                              <label for="metode" class="form-label"
                                >Metode</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Metode"
                                id="metode"
                                v-model="form.master.metode"
                              />
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="mb-3">
                              <label for="level" class="form-label"
                                >Level</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="level"
                                placeholder="Level"
                                v-model="form.master.level"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-end">
                      <button
                        class="btn btn-success px-5"
                        type="button"
                        @click="editMaster"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div :class="`${menu == 'Departemen' ? 'd-block' : 'd-none'}`">
          <div class="card-shadow mb-3">
            <div class="p-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="title-content">
                  {{ menu }}
                </div>

                <button
                  class="btn btn-outline-warning me-2"
                  type="button"
                  @click="changeStatus('edit')"
                  v-if="status == 'default'"
                >
                  Ubah
                </button>
                <div v-else>
                  <button
                    class="btn btn-success me-2"
                    type="button"
                    @click="editGugus"
                  >
                    Simpan
                  </button>
                  <button
                    class="btn btn-danger me-2 text-white"
                    type="button"
                    @click="status = 'default'"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            :class="
              `card-shadow ${
                form.setGugus.length > 0
                  ? 'success text-success'
                  : 'danger text-danger'
              } mb-3`
            "
            v-if="status == 'edit'"
          >
            <div class="p-3">
              <div class="d-flex align-items-center">
                <i class="fas fa-info-circle me-2" style="font-size: 22px;"></i>
                <div style="font-size: 18px; font-weight: 500;">
                  {{
                    form.setGugus.length > 0
                      ? form.setGugus.length + " departemen dipilih."
                      : "Pilih departemen yang mendapatkan tugas!"
                  }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="dataGugus">
            <div class="row" v-if="status == 'default'">
              <div
                class="col-md-4 col-sm-6"
                v-for="(item, id) in defaultGugus"
                :key="id"
              >
                <div class="card-shadow overflow-hidden position-relative mb-3">
                  <div class="p-3 position-relative" style="z-index: 2;">
                    <div class="title-soal mb-5">{{ item.name }}</div>
                    <div
                      class="d-flex justify-content-between align-items-center"
                      style="font-size: 16px; font-weight: 500;"
                    >
                      <div>{{ item.mahasiswa_count }} Staff</div>
                    </div>
                  </div>
                  <img
                    class="card-icon-bg"
                    src="../../assets/icons/card-bg.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="row" v-else>
              <div
                class="col-md-4 col-sm-6"
                v-for="(item, id) in dataGugus"
                :key="id"
              >
                <label
                  class="card-shadow hoverable overflow-hidden position-relative mb-3 w-100"
                  :for="`gugus${id}`"
                >
                  <div class="p-3 position-relative" style="z-index: 2;">
                    <div class="d-flex justify-content-between">
                      <div class="title-soal mb-5">{{ item.name }}</div>
                      <input
                        class="form-check-input cursor-pointer"
                        type="checkbox"
                        :id="`gugus${id}`"
                        v-model="form.setGugus"
                        :value="{ nama: item.name, uuid: item.uuid }"
                      />
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>{{ item.mahasiswa_count }} Staff</div>
                    </div>
                  </div>
                  <img
                    class="card-icon-bg"
                    src="../../assets/icons/card-bg.svg"
                    alt=""
                  />
                </label>
              </div>
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
import { mapState } from "vuex";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  computed: {
    ...mapState(["url"]),
  },
  data: function() {
    return {
      width: null,
      dataMateri: null,
      dataGugus: null,
      dataSoal: null,
      defaultGugus: [],
      defaultSoal: [],
      totalBobot: null,
      isFilledAll: true,
      menu: "Master Materi",
      status: "default",
      filter: {
        tipe: "default",
        kategori: "default",
      },
      form: {
        master: {
          judul: "",
          isi: "",
          cover: "",
          kompetensi: "",
          metode: "",
          tipe: "",
          level: "",
          file: "",
          extension: "",
        },
        setGugus: [],
      },
    };
  },
  methods: {
    cekUploadCover() {
      if (document.getElementById("gambarCover").files[0]) {
        this.uploadGambarCover(document.getElementById("gambarCover").files[0]);
      } else {
        this.form.master.cover = null;
      }
    },
    uploadGambarCover(selector) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.form.master.cover = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(selector);
    },
    cekUploadFile() {
      if (document.getElementById("file").files[0]) {
        this.uploadFile(document.getElementById("file").files[0]);
      } else {
        this.form.master.file = null;
      }
    },
    uploadFile(selector) {
      var reader = new FileReader();
      this.form.master.extension = document
        .getElementById("file")
        .value.split(".")
        .pop();
      reader.onload = (e) => {
        this.form.master.file = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(selector);
    },
    formatDate(date) {
      return moment(date).format("DD MMM YYYY");
    },
    changeStatus(status) {
      this.status = status;
      if (status == "edit") {
        $(".dropify").dropify({
          messages: {
            default: "Unggah file",
            replace: "Timpa dan file",
            remove: "hapus",
            error: "Ooops, telah terjadi kesalahan.",
          },
        });
      }
    },
    changeMenu(menu) {
      this.menu = menu;
      this.status = "default";
    },
    checkBobot(id) {
      var arr = [];
      var validation = 0;
      console.log(id);

      if (this.defaultSoal[id].bobot > 100) {
        this.defaultSoal[id].bobot = 100;
      } else if (this.defaultSoal[id].bobot < 0) {
        this.defaultSoal[id].bobot = 0;
      }

      for (let i = 0; i < this.defaultSoal.length; i++) {
        if (this.defaultSoal[i].bobot) {
          arr.push(parseInt(this.defaultSoal[i].bobot));
        } else {
          arr.push(0);
          validation++;
        }
      }

      this.totalBobot = arr.reduce((a, b) => a + b, 0);

      if (validation == 0) {
        this.isFilledAll = true;
      } else {
        this.isFilledAll = false;
      }
    },
    checkboxEvent() {
      var arr = [];
      var validation = 0;

      for (let i = 0; i < this.defaultSoal.length; i++) {
        if (this.defaultSoal[i].bobot) {
          arr.push(parseInt(this.defaultSoal[i].bobot));
        } else {
          arr.push(0);
          validation++;
        }
      }

      this.totalBobot = arr.reduce((a, b) => a + b, 0);

      if (validation == 0) {
        this.isFilledAll = true;
      } else {
        this.isFilledAll = false;
      }
    },
    editMaster() {
      Swal.fire({
        title: "Apakah anda yakin mengubah informasi materi?",
        text: "Data otomatis akan berubah!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0B7517",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Ubah",
      }).then((result) => {
        if (result.isConfirmed) {
          // eslint-disable-next-line
          var getText = tinymce.get("isi").getContent();
          this.form.master.isi = getText;

          axios
            .put(
              this.url + "tugas/superadmin/materi/" + this.$route.params.id,
              this.form.master,
              {
                headers: {
                  Authorization: localStorage.token,
                },
              }
            )
            .then((res) => {
              console.log(res);
              Swal.fire("Data telah diubah!", "", "success").then(() => {
                window.location.reload();
              });
            })
            .catch((err) => {
              Swal.fire("Gagal", err.response.data.message, "warning");
            });
        }
      });
    },
    editGugus() {
      Swal.fire({
        title: "Apakah anda yakin mengubah gugus yang mengikuti materi?",
        text: "Data otomatis akan berubah!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0B7517",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Ubah",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              this.url +
                "tugas/superadmin/materi/update-gugus/" +
                this.$route.params.id,
              {
                gugus: this.form.setGugus,
              },
              {
                headers: {
                  Authorization: localStorage.token,
                },
              }
            )
            .then((res) => {
              console.log(res);
              Swal.fire("Data telah diubah!", "", "success").then(() => {
                window.location.reload();
              });
            })
            .catch((err) => {
              Swal.fire("Gagal", err.response.data.message, "warning");
            });
        }
      });
    },
  },
  mounted() {
    this.width = $(document).width();
    var countEditor = 0;

    axios
      .get(this.url + "tugas/superadmin/materi/" + this.$route.params.id, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        this.dataMateri = res.data;
        this.form.master = res.data.data;

        var editorInterval = setInterval(() => {
          countEditor++;
          // eslint-disable-next-line
          tinymce.init({
            selector: "#isi",
            menubar: false,
            min_height: 250,
          });

          if (countEditor == 5) {
            clearInterval(editorInterval);
          }
        }, 1000);

        setTimeout(() => {
          // eslint-disable-next-line
          tinyMCE.get("isi").setContent(this.form.master.isi);
        }, 2500);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        this.url +
          "tugas/superadmin/materi/edit-gugus/" +
          this.$route.params.id,
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.dataGugus = res.data.data.gugus;
        this.form.setGugus = res.data.data.gugus_dipilih;
        var gugus = this.dataGugus;
        var set_gugus = this.form.setGugus;
        var arr = [];

        for (let i = 0; i < this.form.setGugus.length; i++) {
          for (let j = 0; j < gugus.length; j++) {
            if (set_gugus[i].uuid == gugus[j].uuid) {
              arr.push(gugus[j]);
            }
          }
        }

        this.defaultGugus = arr;
      })
      .catch((err) => {
        console.log(err);
      });

    $(document).ready(function() {});
  },
};
</script>

<style scoped>
/* tr th {
  text-align: center;
}
tr td {
  text-align: center;
} */
</style>
