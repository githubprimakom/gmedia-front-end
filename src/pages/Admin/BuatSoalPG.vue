<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="title-content">Buat Soal Pilihan Ganda</div>
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
                  <label for="soalPG"
                    >Soal <span class="text-info">*</span></label
                  >
                  <textarea
                    id="soalPG"
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
                <label for="bobot" class="mb-0"
                  >Jawaban Soal <span class="text-info">*</span></label
                >
                <div style="font-weight: 300;">Tandai jawaban yang benar</div>
                <div class="mt-3">
                  <div
                    class="d-flex align-items-center mb-3"
                    v-for="(item, id) in form.jawaban"
                    :key="id"
                  >
                    <div class="me-3">
                      <label
                        :class="
                          `btn ${
                            form.benar == id
                              ? 'btn-primary'
                              : 'btn-outline-primary'
                          } ${
                            validation.benar ? 'border-danger' : ''
                          } mb-0 text-uppercase text-center`
                        "
                        style="border-radius: 100px !important; min-width: 38px; max-width: 38px;"
                        :for="`jawaban${id}`"
                        >{{ dataLetter[id] }}</label
                      >
                      <input
                        type="radio"
                        :value="id"
                        v-model="form.benar"
                        :id="`jawaban${id}`"
                        class="d-none"
                      />
                    </div>
                    <input
                      :class="
                        `form-control ${validation.jawaban ? 'is-invalid' : ''}`
                      "
                      type="text"
                      v-model="item.jawaban"
                      :placeholder="
                        `Ketik jawaban ${dataLetter[id].toUpperCase()}`
                      "
                    />
                  </div>
                  <div
                    class="invalid-feedback d-block danger px-3 py-2 border-radius"
                    v-if="validation.jawaban || validation.benar"
                  >
                    {{ validation.jawaban }} <br />
                    {{ validation.benar }}
                  </div>
                  <div class="row pt-2">
                    <div class="col-6 offset-lg-2 col-lg-5">
                      <button
                        :class="
                          `btn ${
                            form.jawaban.length == 2
                              ? 'btn-outline-secondary'
                              : 'btn-outline-danger'
                          } w-100`
                        "
                        type="button"
                        @click="deleteJawaban"
                        :disabled="form.jawaban.length == 2"
                      >
                        - Hapus Jawaban
                      </button>
                    </div>
                    <div class="col-6 col-lg-5">
                      <button
                        :class="
                          `btn ${
                            form.jawaban.length == 8
                              ? 'btn-outline-secondary'
                              : 'btn-outline-success'
                          } w-100`
                        "
                        type="button"
                        @click="addJawaban"
                        :disabled="form.jawaban.length == 8"
                      >
                        + Tambah Jawaban
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <label>Pilih tag <span class="text-info">*</span></label>
              <div class="col-lg-2" v-for="(tag, id) in tags" :key="id">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="id"
                    name="selected-tag"
                    :value="tag"
                    v-model="form.tags"
                  />
                  <label class="form-check-label" :for="id">
                    {{ tag }}
                  </label>
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
      dataLetter: [],
      tags: [],
      form: {
        foto: null,
        kategori: "default",
        jawaban: [],
        benar: null,
        extension: null,
        tags: [],
      },
      validation: {
        foto: null,
        isi: null,
        kategori: null,
        jawaban: null,
        benar: null,
      },
    };
  },
  methods: {
    addJawaban() {
      this.form.jawaban.push({
        jawaban: "",
        benar: 0,
      });
    },
    deleteJawaban() {
      this.form.jawaban.pop();
    },
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
        // console.log(e)
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
      var getText = tinymce.get("soalPG").getContent();
      var countJawaban = 0;

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

      if (this.form.benar == null) {
        this.validation.benar = "Pilih salah jawaban yang benar!";
      } else {
        this.validation.benar = null;
      }

      for (let i = 0; i < this.form.jawaban.length; i++) {
        if (!this.form.jawaban[i].jawaban) {
          countJawaban++;
        }
      }

      if (countJawaban > 0) {
        this.validation.jawaban = "Isi seluruh pilihan jawaban yang tersedia!";
      } else {
        this.validation.jawaban = null;
      }

      if (
        !this.validation.isi &&
        !this.validation.kategori &&
        !this.validation.benar &&
        !this.validation.jawaban
      ) {
        console.log("success");
        for (let i = 0; i < this.form.jawaban.length; i++) {
          if (this.form.benar == i) {
            this.form.jawaban[i].benar = 1;
          }
        }
        console.log(this.form);

        axios
          .post(
            `${this.url}tugas/superadmin/soal/`,
            {
              foto: this.form.foto,
              isi: getText,
              tipe: "PILIHAN GANDA",
              kategori: this.form.kategori,
              jawaban: this.form.jawaban,
              extension: this.form.extension,
              tags: this.form.tags,
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
              "Soal Pilihan Ganda berhasil dibuat.",
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

    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    this.dataLetter = alphabet;

    for (let i = 0; i < 4; i++) {
      this.form.jawaban.push({
        jawaban: "",
        benar: 0,
      });
    }

    $(document).ready(function() {
      setTimeout(() => {
        // eslint-disable-next-line
        tinymce.init({
          selector: "#soalPG",
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
