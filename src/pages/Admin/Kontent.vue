<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div
              class="d-flex flex-wrap justify-content-between align-items-center"
            >
              <div class="title-content">Konten dan Informasi</div>
              <div class="d-flex">
                <a
                  href="#"
                  type="button"
                  class="btn btn-success me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#tambahModal"
                >
                  + Tambah
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="card-shadow mb-3">
          <div class="p-3">
            <Loader text="Sedang memuat data presensi." v-if="!dataKonten" />
            <div class="table-responsive" v-else>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">JUDUL</th>
                    <th scope="col">ISI</th>
                    <th scope="col">UPDATE TERAKHIR</th>
                    <th scope="col">AKSI</th>
                  </tr>
                </thead>
                <tbody v-if="dataKonten">
                  <tr
                    v-for="(items, index) in dataKonten.data"
                    :key="index"
                    class="align-middle"
                  >
                    <td>
                      {{ items.judul }}
                    </td>
                    <td>
                      <div v-html="items.isi"></div>
                    </td>
                    <td>
                      {{ dateChange(items.updated_at) }}
                    </td>
                    <td>
                      <div class="d-flex">
                        <button
                          type="button"
                          class="btn btn-primary btn-sm me-2"
                          @click="detailKonten(items, 'detail')"
                        >
                          <i class="fas fa-eye"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning btn-sm text-white me-2"
                          @click="detailKonten(items, 'edit')"
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="hapusKonten(items.uuid, items.judul)"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination
              :data="dataKonten"
              ammount="konten"
              :function="navigation"
            />
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
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Tambah Konten dan Informasi
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
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="judul" class="form-label"
                    >Upload Gambar Konten</label
                  >
                  <input
                    type="file"
                    id="gambarKonten"
                    class="dropify"
                    @change="cekUpload()"
                    data-allowed-file-extensions="jpeg jpg png"
                  />
                  <div class="mt-3 p-3 border-radius warning">
                    <div
                      class="fw-bold mb-2"
                      style="opacity: .7; font-size: 16px;"
                    >
                      Perhatian!
                    </div>
                    <ol class="ps-3 mb-0" style="opacity: .7">
                      <li>
                        File yang boleh diupload hanya berupa
                        <b>gambar (.jpeg, .jpg, .png)</b>.
                      </li>
                    </ol>
                  </div>
                </div>
                <div class="col-lg-10 mb-3">
                  <label for="nama" class="form-label"
                    >Judul <span class="text-danger fw-bold">*</span></label
                  >
                  <div class="check-error">
                    <input
                      type="text"
                      name="judul"
                      id="judul"
                      placeholder="Contoh: Pemilihan Ketua Gugus"
                      class="form-control"
                      v-model="tambah.judul"
                    />
                    <div
                      class="invalid-feedback d-block danger px-3 py-2 border-radius"
                      v-if="validationTambah.judul"
                    >
                      {{ validationTambah.judul }}
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-3">
                  <label for="judul" class="form-label"
                    >Isi Konten
                    <span class="text-danger fw-bold">*</span></label
                  >
                  <textarea id="isiKonten" class="d-none"></textarea>
                  <div
                    class="invalid-feedback d-block danger px-3 py-2 border-radius"
                    v-if="validationTambah.isi"
                  >
                    {{ validationTambah.isi }}
                  </div>
                </div>
                <div class="col-lg-12 footer-modal mt-5">
                  <div class="d-flex justify-content-end">
                    <button
                      class="btn btn-primary"
                      style="margin-right: 24px;"
                      @click="tambahKonten"
                    >
                      Tambah
                    </button>
                    <a class="btn btn-outline-secondary" data-bs-dismiss="modal"
                      >Batal</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="detailModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Detail Konten
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" v-if="dataDetailKonten">
            <div class="mb-3" v-if="dataDetailKonten.gambar !== ''">
              <div
                class="d-flex align-items-center justify-content-center overflow-hidden border-radius"
                style="max-height: 400px;"
              >
                <img :src="dataDetailKonten.gambar" class="w-100" alt="" />
              </div>
            </div>
            <div class="mb-4">
              <div style="font-size: 18px; font-weight: 600;">
                {{ dataDetailKonten.judul }}
              </div>
              <div style="font-weight: 300; opacity: .5;">
                {{ dateChange(dataDetailKonten.updated_at) }}
              </div>
            </div>
            <div v-html="dataDetailKonten.isi"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Ubah Konten dan Informasi
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" v-if="dataDetailKonten">
            <div class="container">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="judul" class="form-label"
                    >Upload Gambar Konten</label
                  >
                  <input
                    type="file"
                    id="editGambarKonten"
                    class="dropify"
                    @change="cekEditUpload()"
                    :data-default-file="dataDetailKonten.gambar"
                    data-allowed-file-extensions="jpeg jpg png"
                  />
                  <div class="mt-3 p-3 border-radius warning">
                    <div
                      class="fw-bold mb-2"
                      style="opacity: .7; font-size: 16px;"
                    >
                      Perhatian!
                    </div>
                    <ol class="ps-3 mb-0" style="opacity: .7">
                      <li>
                        File yang boleh diupload hanya berupa
                        <b>gambar (.jpeg, .jpg, .png)</b>.
                      </li>
                    </ol>
                  </div>
                </div>
                <div class="col-lg-10 mb-3">
                  <label for="nama" class="form-label"
                    >Judul <span class="text-danger fw-bold">*</span></label
                  >
                  <div class="check-error">
                    <input
                      type="text"
                      name="judul"
                      id="judul"
                      placeholder="Contoh: Pemilihan Ketua Gugus"
                      class="form-control"
                      v-model="dataDetailKonten.judul"
                    />
                    <div
                      class="invalid-feedback d-block danger px-3 py-2 border-radius"
                      v-if="validationEdit.judul"
                    >
                      {{ validationEdit.judul }}
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-3">
                  <label for="judul" class="form-label"
                    >Isi Konten
                    <span class="text-danger fw-bold">*</span></label
                  >
                  <textarea id="editIsiKonten" class="d-none"></textarea>
                  <div
                    class="invalid-feedback d-block danger px-3 py-2 border-radius"
                    v-if="validationEdit.isi"
                  >
                    {{ validationEdit.isi }}
                  </div>
                </div>
                <div class="col-lg-12 footer-modal mt-5">
                  <div class="d-flex justify-content-end">
                    <button
                      class="btn btn-primary"
                      style="margin-right: 24px;"
                      @click="editKonten(dataDetailKonten.uuid)"
                    >
                      Ubah
                    </button>
                    <a class="btn btn-outline-secondary" data-bs-dismiss="modal"
                      >Batal</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { mapState } from 'vuex';
/* eslint-disable no-undef */

export default {
  computed: {
    ...mapState(['url'])
  },
  data: function() {
    return {
      width: null,
      dataKonten: null,
      dataDetailKonten: null,
      ubah_gambar: false,
      tambah: {
        judul: "",
        isi: null,
        gambar: null,
      },
      validationTambah: {
        judul: null,
        isi: null,
        gambar: null,
      },
      validationEdit: {
        judul: null,
        isi: null,
        gambar: null,
      },
    };
  },
  methods: {
    navigation(url) {
      if (url) {
        this.dataKonten = null;

        axios
          .get(url, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            this.dataKonten = res.data.data;

            $(document).ready(function() {
              $(".table").DataTable({
                ordering: false,
                paging: false,
                info: false,
              });
            });
          })
          .catch((err) => {
            console.log(err);
            // localStorage.clear();
          });
      }
    },
    cekUpload() {
      if (document.getElementById("gambarKonten").files[0]) {
        this.uploadGambar(document.getElementById("gambarKonten").files[0]);
      } else {
        this.tambah.gambar = null;
      }
    },
    uploadGambar(selector) {
      var reader = new FileReader();
      reader.onload = (e) => {
        // console.log(e)
        this.tambah.gambar = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(selector);
    },
    cekEditUpload() {
      if (document.getElementById("editGambarKonten").files[0]) {
        this.ubah_gambar = true;
        this.uploadEditGambar(
          document.getElementById("editGambarKonten").files[0]
        );
      } else {
        this.dataDetailKonten.gambar = null;
      }
    },
    uploadEditGambar(selector) {
      var reader = new FileReader();
      reader.onload = (e) => {
        // console.log(e)
        this.dataDetailKonten.gambar = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(selector);
    },
    dateChange(a) {
      return moment(a)
        .locale("id")
        .format("DD MMMM YYYY HH:MM");
    },
    detailKonten(data, menu) {
      this.dataDetailKonten = null;
      const contentIsi = () => {
        this.ubah_gambar = true;
        this.dataDetailKonten.gambar = null;
      };
      console.log(data, menu);
      var countEditor = 0;

      if (menu == "edit") {
        $("#editModal").modal("show");
        this.dataDetailKonten = data;

        setTimeout(() => {
          var editorInterval = setInterval(() => {
            countEditor++;
            // eslint-disable-next-line
            tinymce.init({
              selector: "#editIsiKonten",
              menubar: false,
              min_height: 450,
            });

            if (countEditor == 5) {
              clearInterval(editorInterval);
            }
          }, 1000);
        }, 1000);

        setTimeout(() => {
          var dropify = $(".dropify").dropify({
            messages: {
              default: "Unggah gambar konten",
              replace: "Timpa dan upload gambar",
              remove: "hapus",
              error: "Ooops, telah terjadi kesalahan.",
            },
          });

          dropify.on("dropify.afterClear", function() {
            contentIsi();
          });
        }, 1500);

        setTimeout(() => {
          // eslint-disable-next-line
          tinyMCE.get("editIsiKonten").setContent(this.dataDetailKonten.isi);
        }, 2500);
      } else {
        $("#detailModal").modal("show");
        this.dataDetailKonten = data;
      }
    },
    hapusKonten(id, judul) {
      Swal.fire({
        title: `Hapus konten ${judul}?`,
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fb4b4b",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Hapus Konten!",
      })
        .then((result) => {
          console.log(result);
          if (result.isConfirmed) {
            axios
              .delete(
                `${this.url}bemkm/superadmin/informasi/${id}`,
                {
                  headers: {
                    Authorization: localStorage.token,
                  },
                }
              )
              .then((res) => {
                console.log(res);
                if (res.data.success) {
                  Swal.fire(
                    "Konten Dihapus!",
                    `Konten ${judul} telah dihapus!`,
                    "success"
                  )
                    .then(() => {
                      window.location.reload();
                    })
                    .catch((err) => {
                      window.location.reload();
                      console.log(err);
                    });
                } else {
                  Swal.fire("Gagal!", res.data.message, "warning")
                    .then(() => {
                      window.location.reload();
                    })
                    .catch((err) => {
                      console.log(err);
                      window.location.reload();
                    });
                }
              })
              .catch((errs) => {
                console.log(errs);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tambahKonten() {
      var getText = tinymce.get("isiKonten").getContent();
      console.log(getText);
      this.tambah.isi = getText;

      if (this.tambah.judul == "") {
        this.validationTambah.judul = "Judul harus diisi!";
      } else {
        this.validationTambah.judul = null;
      }

      if (getText == "") {
        this.validationTambah.isi = "Isi konten harus diisi!";
      } else {
        this.validationTambah.isi = null;
      }

      if (!this.validationTambah.nama && !this.validationTambah.isi) {
        axios
          .post(
            `${this.url}bemkm/superadmin/informasi/`,
            this.tambah,
            {
              headers: {
                Authorization: localStorage.token,
              },
            }
          )
          .then((result) => {
            console.log(result);
            if (result.data.success) {
              Swal.fire("Berhasil", `${result.data.message}`, "success")
                .then(() => {
                  window.location.reload();
                })
                .catch(() => {
                  window.location.reload();
                });
            } else {
              Swal.fire("Gagal", `${result.data.message}`, "warning")
                .then(() => {
                  window.location.reload();
                })
                .catch(() => {
                  window.location.reload();
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    editKonten(id) {
      var getText = tinymce.get("editIsiKonten").getContent();
      console.log(getText);
      this.dataDetailKonten.isi = getText;

      if (this.dataDetailKonten.judul == "") {
        this.validationEdit.judul = "Judul harus diisi!";
      } else {
        this.validationEdit.judul = null;
      }

      if (getText == "") {
        this.validationEdit.isi = "Isi konten harus diisi!";
      } else {
        this.validationEdit.isi = null;
      }

      if (!this.validationEdit.nama && !this.validationEdit.isi) {
        console.log("judul");
        console.log(this.dataDetailKonten.judul);
        console.log("isi");
        console.log(this.dataDetailKonten.isi);
        console.log("gambar");
        console.log(this.dataDetailKonten.gambar);
        console.log("status gambar");
        console.log(this.ubah_gambar);
        axios
          .put(
            `${this.url}bemkm/superadmin/informasi/` + id,
            {
              judul: this.dataDetailKonten.judul,
              isi: this.dataDetailKonten.isi,
              gambar: this.dataDetailKonten.gambar,
              ubah_gambar: this.ubah_gambar,
            },
            {
              headers: {
                Authorization: localStorage.token,
              },
            }
          )
          .then((result) => {
            console.log(result);
            if (result.data.success) {
              Swal.fire("Berhasil", `${result.data.message}`, "success")
                .then(() => {
                  window.location.reload();
                })
                .catch(() => {
                  window.location.reload();
                });
            } else {
              Swal.fire("Gagal", `${result.data.message}`, "warning")
                .then(() => {
                  window.location.reload();
                })
                .catch(() => {
                  window.location.reload();
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  mounted() {
    $(".dropify").dropify({
      messages: {
        default: "Unggah gambar konten",
        replace: "Timpa dan upload gambar",
        remove: "hapus",
        error: "Ooops, telah terjadi kesalahan.",
      },
      error: {
        fileSize: "Ukuran file terlalu besar, maksimal {{ value }}b.",
        imageFormat: "File yg diupload hanya boleh berupa ({{ value }}).",
      },
    });
    this.width = $(document).width();
    var countEditor = 0;

    axios
      .get(`${this.url}bemkm/superadmin/informasi/`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        console.log(result);
        this.dataKonten = result.data.data;
        if (this.dataKonten) {
          setTimeout(() => {
            $(".table").dataTable({
              ordering: false,
              paging: false,
              info: false,
            });
          }, 500);
          var editorInterval = setInterval(() => {
            countEditor++;
            // eslint-disable-next-line
            tinymce.init({
              selector: "#isiKonten",
              menubar: false,
              min_height: 450,
            });
            // eslint-disable-next-line
            // tinymce.init({
            //   selector: "#editKonten",
            //   menubar: false,
            //   min_height: 450,
            // });

            if (countEditor == 5) {
              clearInterval(editorInterval);
            }
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.modal .form-control {
  height: 36px;
  border-radius: 8px !important;
  background: #f8f8f8;
}
.modal input[type="text"],
.modal input[type="email"],
.modal input[type="number"],
.modal textarea {
  border: none !important;
}
.modal .form-control,
.modal .form-select {
  border-color: rgba(221, 224, 228, 1);
}
.modal .form-control::placeholder {
  color: rgba(175, 181, 192, 1);
  font-weight: 400;
  font-size: 14px;
}
textarea.form-control {
  height: 65px !important;
  background: white !important;
  border: 1px solid #ddd !important;
}
</style>
