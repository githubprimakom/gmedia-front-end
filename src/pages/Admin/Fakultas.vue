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
              <div class="title-content">Data Perusahaan</div>
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
            <Loader
              text="Sedang memuat data Perusahaan."
              v-if="!dataFakultas"
            />
            <div class="table-responsive" v-else>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">NO</th>
                    <th scope="col">PERUSAHAAN</th>
                    <th scope="col">KODE PERUSAHAAN</th>
                    <th scope="col">DIBUAT</th>
                    <th scope="col">AKSI</th>
                  </tr>
                </thead>
                <tbody v-if="dataFakultas">
                  <tr v-for="(items, index) in dataFakultas.data" :key="index">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td v-if="items.nama">
                      {{ items.nama }}
                    </td>
                    <td>
                      {{ items.kode }}
                    </td>
                    <td>
                      {{ items.created_at }}
                    </td>
                    <td>
                      <div class="d-flex">
                        <button
                          type="button"
                          class="btn btn-primary btn-sm me-2"
                          @click="openEdit(items.uuid)"
                          data-bs-toggle="modal"
                          data-bs-target="#lihatModal"
                        >
                          <i class="fas fa-eye"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning btn-sm text-white me-2"
                          @click="openEdit(items.uuid)"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="hapus(items.uuid, items.nama)"
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
              :data="dataFakultas"
              ammount="perusahaan"
              :function="navigation"
            />
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
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Perusahaan</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <form action="" v-if="dataFakultasOne" @submit.prevent="editData">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="fakultas">Nama Perusahaan</label>
                      <div class="check-error">
                        <input
                          type="text"
                          name="fakultas"
                          id="fakultas"
                          class="form-control"
                          placeholder="Masukkan Nama Perusahaan"
                          v-model="dataFakultasOne.nama"
                        />
                        <small
                          :class="
                            `text-danger d-flex ${
                              validationEdit.nama.status === true
                                ? 'd-none'
                                : 'd-flex'
                            }`
                          "
                          >{{ validationEdit.nama.message }}</small
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="kode">Kode Perusahaan</label>
                      <div class="check-error">
                        <input
                          type="number"
                          name="kode"
                          id="kode"
                          placeholder="Kode Perusahaan"
                          class="form-control"
                          v-model="dataFakultasOne.kode"
                        />
                        <small
                          :class="
                            `text-danger d-flex ${
                              validationEdit.kode.status === true
                                ? 'd-none'
                                : 'd-flex'
                            }`
                          "
                          >{{ validationEdit.kode.message }}</small
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 footer-modal">
                    <div class="d-flex justify-content-end">
                      <button
                        class="btn btn-primary"
                        style="margin-right: 24px;"
                      >
                        Edit
                      </button>
                      <a class="btn btn-outline-primary" data-bs-dismiss="modal"
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
    <div
      class="modal fade"
      id="lihatModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Detail Perusahaan
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
              <form action="" v-if="dataFakultasOne">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="fakultas">Nama Perusahaan</label>
                      <div class="check-error">
                        <input
                          readonly
                          type="text"
                          name="fakultas"
                          id="fakultas"
                          class="form-control"
                          placeholder="Masukkan Nama Perusahaan"
                          v-model="dataFakultasOne.nama"
                        />
                        <small
                          :class="
                            `text-danger d-flex ${
                              validationEdit.fakultas_id.status === true
                                ? 'd-none'
                                : 'd-flex'
                            }`
                          "
                          >{{ validationEdit.fakultas_id.message }}</small
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="kode">Kode Perusahaan</label>
                      <div class="check-error">
                        <input
                          readonly
                          type="number"
                          name="kode"
                          id="kode"
                          placeholder="Kode Perusahaan"
                          class="form-control"
                          v-model="dataFakultasOne.kode"
                        />
                        <small
                          :class="
                            `text-danger d-flex ${
                              validationEdit.kode.status === true
                                ? 'd-none'
                                : 'd-flex'
                            }`
                          "
                          >{{ validationEdit.kode.message }}</small
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <a type="button" class="btn btn-secondary" data-bs-dismiss="modal"
              >Close</a
            >
          </div>
        </div>
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
              Tambah Perusahaan
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
              <form action="" @submit.prevent="tambahFakultas">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="nama">Nama Perusahaan</label>
                      <div class="check-error">
                        <input
                          type="text"
                          name="nama"
                          id="nama"
                          placeholder="Nama Perusahaan"
                          class="form-control"
                          v-model="tambah.nama"
                        />
                        <small
                          :class="
                            `text-danger d-flex ${
                              validationTambah.nama.status === true
                                ? 'd-none'
                                : 'd-flex'
                            }`
                          "
                          >{{ validationTambah.nama.message }}</small
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="kode">Kode Perusahaan</label>
                      <div class="check-error">
                        <input
                          type="number"
                          name="kode"
                          id="kode"
                          class="form-control"
                          placeholder="Kode Perusahaan"
                          v-model="tambah.kode"
                        />
                        <small
                          :class="
                            `text-danger d-flex ${
                              validationTambah.kode.status === true
                                ? 'd-none'
                                : 'd-flex'
                            }`
                          "
                          >{{ validationTambah.kode.message }}</small
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 footer-modal">
                    <div class="d-flex justify-content-end">
                      <button
                        class="btn btn-primary"
                        style="margin-right: 24px;"
                      >
                        Tambah
                      </button>
                      <a class="btn btn-outline-primary" data-bs-dismiss="modal"
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
import axios from "axios";
import Swal from "sweetalert2";
import { mapState } from "vuex";
/* eslint-disable no-undef */

export default {
  computed: {
    ...mapState(["url"]),
  },
  data: function() {
    return {
      width: null,
      dataPemandu: null,
      dataGugus: null,
      dataGugusOne: null,
      dataFakultasOne: null,
      tambah: {
        name: null,
      },
      validationTambah: {
        nama: {
          status: true,
          message: null,
        },
        kode: {
          status: true,
          message: null,
        },
      },
      validationEdit: {
        fakultas_id: {
          status: true,
          message: null,
        },
        nama: {
          status: true,
          message: null,
        },
        kode: {
          status: true,
          message: null,
        },
      },
      dataFakultas: null,
    };
  },
  methods: {
    navigation(url) {
      if (url) {
        this.dataFakultas = null;

        axios
          .get(url, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            this.dataFakultas = res.data.data;

            $(document).ready(function() {
              $(".table").DataTable({
                pageLength: 25,
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
    uploadEdit(asd) {
      var reader = new FileReader();
      reader.onload = (e) => {
        console.log(e);
        var ee = e.target.result;
        this.dataOnePemandu.foto = ee.replace("data:image/jpeg;base64,", "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(asd);
    },
    editData() {
      console.log("edit");
      if (this.dataFakultasOne.nama && this.dataFakultasOne.kode) {
        setTimeout(() => {
          axios
            .put(
              `${this.url}bemkm/superadmin/fakultas/${this.dataFakultasOne.uuid}`,
              this.dataFakultasOne,
              {
                headers: {
                  Authorization: localStorage.token,
                },
              }
            )
            .then((result) => {
              console.log(result);
              if (result.data.success) {
                Swal.fire(
                  "Berhasil Edit!",
                  `${result.data.message}!`,
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
                Swal.fire("Gagal!", res.data.message, "warning");
              }
            })
            .catch((err) => {
              Swal.fire("Gagal", `${err.response.data.message}`, "warning");
            });
        }, 500);
      }
      if (!this.dataFakultasOne.nama) {
        this.validationEdit.nama.status = false;
        this.validationEdit.nama.message = "Nama perusahaan harus diisi!";
      } else {
        this.validationEdit.nama.status = true;
        this.validationEdit.nama.message = null;
      }

      if (!this.dataFakultasOne.kode) {
        this.validationEdit.kode.status = false;
        this.validationEdit.kode.message = "Kode perusahaan harus diisi!";
      } else {
        this.validationEdit.kode.status = true;
        this.validationEdit.kode.message = null;
      }
    },
    openEdit(uuid) {
      axios
        .get(`${this.url}bemkm/superadmin/fakultas/${uuid}`, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then((result) => {
          console.log(result);
          this.dataFakultasOne = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hapus(uuidGugus, namaGugus) {
      Swal.fire({
        title: `Hapus Akun ${namaGugus}`,
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
        .then((result) => {
          console.log(result);
          if (result.isConfirmed) {
            axios
              .delete(`${this.url}bemkm/superadmin/fakultas/${uuidGugus}`, {
                headers: {
                  Authorization: localStorage.token,
                },
              })
              .then((res) => {
                console.log(res);
                if (res.data.success) {
                  Swal.fire(
                    "Deleted!",
                    `Fakultas ${namaGugus} telah dihapus!`,
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
                  Swal.fire("Gagal!", res.data.message, "warning");
                }
              })
              .catch((err) => {
                Swal.fire("Gagal", `${err.response.data.message}`, "warning");
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    upload(asd) {
      var reader = new FileReader();
      reader.onload = (e) => {
        console.log(e);
        var ee = e.target.result;
        this.tambah.foto = ee.replace("data:image/jpeg;base64,", "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(asd);
    },
    tambahFakultas() {
      if (this.tambah.nama && this.tambah.kode) {
        axios
          .post(`${this.url}bemkm/superadmin/fakultas`, this.tambah, {
            headers: {
              Authorization: localStorage.token,
            },
          })
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
              Swal.fire("Gagal", `${result.data.message}`, "warning");
            }
          })
          .catch((err) => {
            Swal.fire("Gagal", `${err.response.data.message}`, "warning");
          });
      }
      if (!this.tambah.nama) {
        this.validationTambah.nama.status = false;
        this.validationTambah.nama.message = "Nama perusahaan harus diisi!";
      } else {
        this.validationTambah.nama.status = true;
        this.validationTambah.nama.message = null;
      }

      if (!this.tambah.kode) {
        this.validationTambah.kode.status = false;
        this.validationTambah.kode.message = "Kode perusahaan harus diisi!";
      } else {
        this.validationTambah.kode.status = true;
        this.validationTambah.kode.message = null;
      }
    },
  },
  mounted() {
    $(".dropify").dropify();
    this.width = $(document).width();
    axios
      .get(`${this.url}bemkm/superadmin/fakultas`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        console.log(result);
        this.dataFakultas = result.data.data;
        $(document).ready(function() {
          $(".table").DataTable({
            pageLength: 25,
            ordering: false,
            paging: false,
            info: false,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${this.url}bemkm/superadmin/gugus`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        console.log(result);
        this.dataGugus = result.data.data.data;
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
