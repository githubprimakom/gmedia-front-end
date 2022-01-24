<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="title-content">Buat Soal Esai</div>
            </div>
          </div>
        </div>
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="row">
              <div class="col-lg-6 col-md-10">
                <div class="mb-3">
                  <label for="bobot">Upload Gambar Soal</label>
                  <input
                    type="file"
                    id="gambarSoal"
                    class="dropify"
                    @change="cekUpload()"
                  />
                </div>
                <div class="mb-3">
                  <label for="bobot"
                    >Tingkat Kesulitan <span class="text-info">*</span></label
                  >
                  <select
                    :class="
                      `form-select ${validation.kategori ? 'is-invalid' : ''}`
                    "
                    aria-label="Default select example"
                    v-model="form.kategori"
                  >
                    <option value="default" selected disabled
                      >- Pilih Tingkat Kesulitan -</option
                    >
                    <option value="MUDAH">Mudah</option>
                    <option value="SEDANG">Sedang</option>
                    <option value="SULIT">Sulit</option>
                  </select>
                  <div
                    class="invalid-feedback d-block danger px-3 py-2 border-radius"
                    v-if="validation.kategori"
                  >
                    {{ validation.kategori }}
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-10">
                <label for="soalPG"
                  >Soal <span class="text-info">*</span></label
                >
                <textarea
                  id="soalEsai"
                  v-model="form.isi"
                  class="d-none"
                ></textarea>
                <div
                  class="invalid-feedback d-block danger px-3 py-2 border-radius"
                  v-if="validation.isi"
                >
                  {{ validation.isi }}
                </div>
              </div>
            </div>
            <div
              class="d-flex justify-content-center justify-content-lg-end mt-5"
            >
              <router-link
                :to="{ name: 'Bank Soal' }"
                class="btn btn-outline-secondary px-4 me-3"
                type="button"
              >
                Batal
              </router-link>
              <button
                class="btn btn-primary px-4"
                type="button"
                @click="submit"
              >
                Simpan
              </button>
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
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["url"]),
  },
  data: function() {
    return {
      width: null,
      form: {
        foto: null,
        tipe: "ESSAI",
        kategori: "default",
        extension: null,
      },
      validation: {
        foto: null,
        isi: null,
        kategori: null,
      },
    };
  },
  methods: {
    cekUpload() {
      if (document.getElementById("gambarSoal").files[0]) {
        this.uploadGambar(document.getElementById("gambarSoal").files[0]);
      } else {
        this.form.foto = null;
      }
    },
    uploadGambar(selector) {
      var reader = new FileReader();
      this.form.extension = document
        .getElementById("gambarSoal")
        .value.split(".")
        .pop();
      reader.onload = (e) => {
        this.form.foto = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(selector);
    },
    submit() {
      // eslint-disable-next-line
      var getText = tinymce.get("soalEsai").getContent();

      if (!getText) {
        this.validation.isi = "Soal wajib diisi!";
      } else {
        this.validation.isi = null;
      }

      if (this.form.kategori == "default") {
        this.validation.kategori = "Tingkat kesulitan soal wajib diisi!";
      } else {
        this.validation.kategori = null;
      }

      if (!this.validation.isi && !this.validation.kategori) {
        axios
          .post(
            `${this.url}tugas/superadmin/soal/`,
            {
              foto: this.form.foto,
              isi: getText,
              tipe: "ESSAI",
              kategori: this.form.kategori,
              extension: this.form.extension,
            },
            {
              headers: {
                Authorization: localStorage.token,
              },
            }
          )
          .then((res) => {
            console.log(res);
            Swal.fire(
              "Data Disimpan!",
              "Soal Esai berhasil dibuat.",
              "success"
            ).then(() => {
              window.location.replace("/admin/bank-soal");
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("failed");
      }
    },
  },
  mounted() {
    this.width = $(document).width();

    $(document).ready(function() {
      setInterval(() => {
        // eslint-disable-next-line
        tinymce.init({
          selector: "#soalEsai",
          menubar: false,
          min_height: 300,
        });
      }, 2000);

      $(".dropify").dropify({
        messages: {
          default: "Unggah gambar pendukung soal",
          replace: "Timpa dan upload gambar",
          remove: "hapus",
          error: "Ooops, telah terjadi kesalahan.",
        },
      });
    });
  },
};
</script>
