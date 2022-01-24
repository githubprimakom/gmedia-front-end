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
              <div class="title-content">Data Kantor Cabang</div>
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
            <Loader text="Sedang memuat data gugus." v-if="!dataProdi" />

            <div class="table-responsive" v-else>
              <table id="tablenya" class="table">
                <thead>
                  <tr>
                    <th scope="col">NO</th>
                    <th scope="col">NAMA KANTOR CABANG</th>
                    <th scope="col">KODE KANTOR CABANG</th>
                    <th scope="col">NAMA PERUSAHAAN</th>
                    <th scope="col">KODE PERUSAHAAN</th>
                    <th scope="col">AKSI</th>
                  </tr>
                </thead>
                <tbody v-if="dataProdi">
                  <tr v-for="(items, index) in dataProdi.data" :key="index">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>{{ items.nama }}</td>
                    <td>{{ items.kode }}</td>
                    <td>{{ items.fakultas.nama }}</td>
                    <td>{{ items.fakultas.kode }}</td>
                    <td>
                      <div class="d-flex">
                        <button
                          type="button"
                          class="btn btn-primary btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#lihatModal"
                          @click="openEdit(items.uuid)"
                        >
                          <i class="fas fa-eye"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning btn-sm text-white me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          @click="openEdit(items.uuid)"
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="hapusData(items.uuid, items.nama)"
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
              :data="dataProdi"
              ammount="kantor cabang"
              :function="navigation"
            />
          </div>
        </div>
        <Footer />
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
            <h5 class="modal-title" id="exampleModalLabel">
              Edit Kantor Cabang
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
              <form action="" v-if="dataOneProdi" @submit.prevent="editData">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nama">Nama Kantor Cabang</label>
                      <div class="check-error">
                        <input
                          type="text"
                          name="nama"
                          id="nama"
                          placeholder="Nama Kantor Cabang"
                          class="form-control"
                          v-model="dataOneProdi.nama"
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
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="gugus">Perusahaan</label>
                      <div class="check-error">
                        <select
                          name="gugus"
                          id="gugus"
                          v-model="dataOneProdi.fakultas_id"
                          class="form-select"
                        >
                          <option value="" selected disabled
                            >Pilih Perusahaan</option
                          >
                          <option
                            :value="items.uuid"
                            v-for="(items, index) in dataFakultas.data"
                            :key="index"
                            >{{ items.nama }}</option
                          >
                        </select>
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
                    <div class="modal-footer">
                      <div class="d-flex justify-content-end">
                        <button
                          class="btn btn-primary"
                          style="margin-right: 24px;min-width: 100px;"
                          type="submit"
                        >
                          Edit
                        </button>
                        <a
                          href="#"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          style="width: 100px"
                          class="btn btn-outline-primary"
                          >Batal</a
                        >
                      </div>
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Lihat Kantor Cabang
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
              <form action="" v-if="dataOneProdi">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nama">Nama Kantor Cabang</label>
                      <div class="check-error">
                        <input
                          type="text"
                          name="nama"
                          id="nama"
                          placeholder="Nama Kantor Cabang"
                          class="form-control"
                          v-model="dataOneProdi.nama"
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
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="kode">Kode Kantor Cabang</label>
                      <div class="check-error">
                        <input
                          type="text"
                          name="kode"
                          id="kode"
                          placeholder="Kode Kantor Cabang"
                          class="form-control"
                          v-model="dataOneProdi.kode"
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
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="gugus">Perusahaan</label>
                      <div class="check-error">
                        <select
                          name="gugus"
                          id="gugus"
                          v-model="dataOneProdi.fakultas_id"
                          class="form-select"
                        >
                          <option value="" selected disabled
                            >Pilih Perusahaan</option
                          >
                          <option
                            :value="items.uuid"
                            v-for="(items, index) in dataFakultas.data"
                            :key="index"
                            >{{ items.nama }}</option
                          >
                        </select>
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
                </div>
              </form>
            </div>
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
              Tambah Kantor Cabang
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
              <form @submit.prevent="tambahProdi" action="">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nama">Nama Kantor Cabang</label>
                      <div class="check-error">
                        <input
                          type="text"
                          name="nama"
                          id="nama"
                          placeholder="Nama Kantor Cabang"
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
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="kode">Kode Kantor Cabang</label>
                      <div class="check-error">
                        <input
                          type="text"
                          name="kode"
                          id="kode"
                          placeholder="Kode Kantor Cabang"
                          class="form-control"
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
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="fakultas"
                        >Perusahaan <span class="text-info">*</span></label
                      >
                      <div class="check-error" v-if="dataFakultas">
                        <select
                          name="fakultas"
                          v-model="tambah.fakultas_id"
                          id="fakultas"
                          class="form-select"
                        >
                          <option value="" selected>Pilih Perusahaan</option>
                          <option
                            :value="items.uuid"
                            v-for="(items, index) in dataFakultas.data"
                            :key="index"
                            >{{ items.nama }}</option
                          >
                        </select>
                        <small
                          :class="
                            `text-danger d-flex ${
                              validationTambah.fakultas_id.status === true
                                ? 'd-none'
                                : 'd-flex'
                            }`
                          "
                          >{{ validationTambah.fakultas_id.message }}</small
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="modal-footer">
                      <div class="d-flex justify-content-end">
                        <button
                          class="btn btn-primary"
                          style="margin-right: 24px;width: 100px"
                          type="submit"
                        >
                          Tambah
                        </button>
                        <a
                          href="#"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          style="width: 100px"
                          class="btn btn-outline-primary"
                          >Batal</a
                        >
                      </div>
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
      dataProdi: null,
      dataGugus: null,
      dataOneProdi: null,
      dataFakultas: null,
      tambah: {
        nama: null,
        fakultas_id: "",
        kode: null,
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
        fakultas_id: {
          status: true,
          message: null,
        },
      },
      validationEdit: {
        nama: {
          status: true,
          message: null,
        },
        kode: {
          status: true,
          message: null,
        },
        fakultas_id: {
          status: true,
          message: null,
        },
      },
    };
  },
  methods: {
    navigation(url) {
      if (url) {
        this.dataProdi = null;

        axios
          .get(url, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            this.dataProdi = res.data.data;

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
        this.dataOnePemandu.foto = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(asd);
    },
    editData() {
      if (this.dataOneProdi.nama && this.dataOneProdi.fakultas_id) {
        setTimeout(() => {
          axios
            .put(
              `${this.url}bemkm/superadmin/prodi/${this.dataOneProdi.uuid}`,
              this.dataOneProdi,
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
              }
            })
            .catch((err) => {
              Swal.fire("Gagal", `${err.response.data.message}`, "warning");
            });
        }, 500);
      }
      if (!this.dataOneProdi.nama) {
        this.validationEdit.nama.status = false;
        this.validationEdit.nama.message = "Nama Kantor Cabang harus diisi!";
      } else {
        this.validationEdit.nama.status = true;
        this.validationEdit.nama.message = null;
      }

      if (!this.dataOneProdi.fakultas_id) {
        this.validationEdit.fakultas_id.status = false;
        this.validationEdit.fakultas_id.message = "Perusahaan harus dipilih!";
      } else {
        this.validationEdit.fakultas_id.status = true;
        this.validationEdit.fakultas_id.message = null;
      }
    },
    openEdit(uuid) {
      setTimeout(() => {
        $(".dropify").dropify({
          messages: {
            default: "Unggah Foto Mahasiswa",
            replace: "Timpa dan upload gambar",
            remove: "hapus",
            error: "Ooops, telah terjadi kesalahan.",
          },
        });
      }, 200);
      axios
        .get(`${this.url}bemkm/superadmin/prodi/${uuid}`, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then((result) => {
          console.log(result);
          this.dataOneProdi = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hapusData(uuid, nama) {
      Swal.fire({
        title: `Hapus Prodi ${nama}`,
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
              .delete(`${this.url}bemkm/superadmin/prodi/${uuid}`, {
                headers: {
                  Authorization: localStorage.token,
                },
              })
              .then((res) => {
                console.log(res);
                if (res.data.success) {
                  Swal.fire(
                    "Deleted!",
                    `Akun Kantor Cabang ${nama} telah dihapus!`,
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
    tambahProdi() {
      if (this.tambah.nama && this.tambah.fakultas_id && this.tambah.kode) {
        axios
          .post(`${this.url}bemkm/superadmin/prodi`, this.tambah, {
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
            Swal.fire("Gagal", `${err.response.data.message}`, "warning");
          });
      }
      if (!this.tambah.nama) {
        this.validationTambah.nama.status = false;
        this.validationTambah.nama.message = "Nama Kantor Cabang harus diisi!";
      } else {
        this.validationTambah.nama.status = true;
        this.validationTambah.nama.message = null;
      }
      if (!this.tambah.kode) {
        this.validationTambah.kode.status = false;
        this.validationTambah.kode.message = "Kode harus diisi!";
      } else {
        this.validationTambah.kode.status = true;
        this.validationTambah.kode.message = null;
      }

      if (!this.tambah.fakultas_id) {
        this.validationTambah.fakultas_id.status = false;
        this.validationTambah.fakultas_id.message =
          "Perusahaan harus di pilih!";
      } else {
        this.validationTambah.fakultas_id.status = true;
        this.validationTambah.fakultas_id.message = null;
      }
    },
  },
  mounted() {
    $(".dropify").dropify();
    this.width = $(document).width();
    axios
      .get(`${this.url}bemkm/superadmin/prodi`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        console.log(result);
        this.dataProdi = result.data.data;
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
        this.dataGugus = result.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${this.url}bemkm/superadmin/fakultas`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        console.log(result);
        this.dataFakultas = result.data.data;
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
