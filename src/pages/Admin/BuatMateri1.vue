<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-4">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <a
                  :href="$router.resolve({ name: 'Pilih Gugus Materi' }).href"
                  @click="previous"
                  class="btn btn-primary me-2"
                  type="button"
                >
                  <i class="fas fa-arrow-left"></i>
                </a>
                <div>
                  <div class="title-content">
                    Tambah Materi
                  </div>
                  <div class="title-type-soal">
                    2 - Atur Materi
                  </div>
                </div>
              </div>

              <button
                v-if="
                  form.judul == '' ||
                    form.isi == '' ||
                    form.cover == '' ||
                    form.kompetensi == '' ||
                    form.level == '' ||
                    form.metode == '' ||
                    form.gugus == [] ||
                    form.tipe == ''
                "
                class="btn btn-secondary ms-2"
                type="button"
                disabled
              >
                Selanjutnya
              </button>
              <a
                href="#"
                class="btn btn-primary"
                type="button"
                @click="submit"
                v-else
              >
                Selanjutnya
              </a>
            </div>
          </div>
        </div>
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="judul" class="form-label">Judul</label>
                  <input
                    type="text"
                    class="form-control"
                    id="judul"
                    placeholder="Judul Materi"
                    v-model="form.judul"
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
                      <label for="bobot"
                        >Upload File
                        <span class="text-danger small">*mp4/pdf</span></label
                      >
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
                        v-model="form.kompetensi"
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
                        v-model="form.tipe"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label for="metode" class="form-label">Metode</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Metode"
                        id="metode"
                        v-model="form.metode"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label for="level" class="form-label">Level</label>
                      <input
                        type="text"
                        class="form-control"
                        id="level"
                        placeholder="Level"
                        v-model="form.level"
                      />
                    </div>
                  </div>
                </div>
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
      form: {
        judul: "",
        isi: "",
        cover: "",
        kompetensi: "",
        metode: "",
        tipe: "",
        level: "",
        file: "",
        extension: "",
        gugus: [],
      },
    };
  },
  methods: {
    cekUploadCover() {
      if (document.getElementById("gambarCover").files[0]) {
        this.uploadGambarCover(document.getElementById("gambarCover").files[0]);
      } else {
        this.form.cover = null;
      }
    },
    uploadGambarCover(selector) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.form.cover = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(selector);
    },
    cekUploadFile() {
      if (
        !["mp4", "pdf"].includes(
          document
            .getElementById("file")
            .value.split(".")
            .pop()
        )
      ) {
        Swal.fire({
          icon: "warning",
          title: "Format file salah",
          text: "Format file yang diijinkan hanya mp4 dan pdf",
        });
        return;
      } else {
        if (document.getElementById("file").files[0]) {
          this.uploadFile(document.getElementById("file").files[0]);
        } else {
          this.form.file = null;
        }
      }
    },
    uploadFile(selector) {
      var reader = new FileReader();
      this.form.extension = document
        .getElementById("file")
        .value.split(".")
        .pop();
      reader.onload = (e) => {
        this.form.file = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(selector);
    },
    formatDate(date) {
      return moment(date)
        .locale("id")
        .format("DD MMM YY");
    },
    previous() {
      var array2 = JSON.stringify(this.form);
      localStorage.tempMateri = array2;
    },
    next() {
      var array2 = JSON.stringify(this.form);
      localStorage.tempMateri = array2;
    },
    submit() {
      axios
        .post(this.url + "tugas/superadmin/materi/", this.form, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then((res) => {
          Swal.fire("Materi Dikirim!", res.data.message, "success").then(() => {
            window.location.replace("/admin/materi");
            localStorage.removeItem("tempGugus");
          });
        })
        .catch((err) => {
          Swal.fire("Gagal!", err.response.data.message, "warning");
        });
    },
  },
  mounted() {
    this.width = $(document).width();
    var countEditor = 0;
    this.form.gugus = JSON.parse(localStorage.tempGugus);

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
      setInterval(() => {
        // eslint-disable-next-line
        var getText = tinymce.get("isi").getContent();
        this.form.isi = getText;
      }, 1000);

      $(".dropify").dropify({
        messages: {
          default: "Unggah file",
          replace: "Timpa dan file",
          remove: "hapus",
          error: "Ooops, telah terjadi kesalahan.",
        },
      });
    }, 2000);
  },
};
</script>
