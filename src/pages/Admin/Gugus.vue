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
              <div class="title-content">Data Departemen</div>
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
            <Loader text="Sedang memuat data gugus." v-if="!dataGugus" />
            <div class="table-responsive" v-else>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">NO</th>
                    <th scope="col">DEPARTEMEN</th>
                    <th scope="col">NAMA PEMANDU</th>
                    <th scope="col">EMAIL PEMANDU</th>
                    <th scope="col">TELEPON PEMANDU</th>
                    <th scope="col">AKSI</th>
                  </tr>
                </thead>
                <tbody v-if="dataGugus">
                  <tr v-for="(items, index) in dataGugus.data" :key="index">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td v-if="items.name">
                      {{ items.name }}
                    </td>
                    <td>
                      <!-- {{ items }} -->
                      <div v-if="items.pemandu.length >= 1">
                        <div v-for="(a, ii) in items.pemandu" :key="ii">
                          {{ a.nama }}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div v-if="items.pemandu.length >= 1">
                        <div v-for="(a, ii) in items.pemandu" :key="ii">
                          {{ a.email }}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div v-if="items.pemandu.length >= 1">
                        <div v-for="(a, ii) in items.pemandu" :key="ii">
                          {{ a.no_hp }}
                        </div>
                      </div>
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
                          @click="hapus(items.uuid, items.name)"
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
              :data="dataGugus"
              ammount="departemen"
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
            <h5 class="modal-title" id="exampleModalLabel">Edit Departemen</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <form action="" v-if="dataGugusOne" @submit.prevent="editGugus">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="nama">Nama Departemen</label>
                      <div class="check-error">
                        <input
                          type="text"
                          name="nama"
                          id="nama"
                          placeholder="Nama Pemandu"
                          class="form-control"
                          v-model="dataGugusOne.name"
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
                  <div class="col-lg-12 ">
                    <div class="modal-footer">
                      <div class="d-flex justify-content-end">
                        <button
                          class="btn btn-primary"
                          style="margin-right: 24px;"
                        >
                          Edit
                        </button>
                        <a
                          class="btn btn-outline-primary"
                          data-bs-dismiss="modal"
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
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Detail Departemen
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
              <form action="" v-if="dataGugusOne">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="nama">Nama Departemen</label>
                      <div class="check-error">
                        <input
                          type="text"
                          name="nama"
                          id="nama"
                          placeholder="Nama Pemandu"
                          class="form-control"
                          v-model="dataGugusOne.name"
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
                      <label for="list">List Pemandu</label>
                      <div class="d-flex flex-wrap">
                        <p
                          class="me-1"
                          v-for="(it, ind) in dataGugusOne.pemandu"
                          :key="ind"
                        >
                          {{ it.nama }},
                        </p>
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
              Tambah Departemen
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
              <form action="" @submit.prevent="tambahGugus">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="nama">Nama Departemen</label>
                      <div class="check-error">
                        <input
                          type="text"
                          name="nama"
                          id="nama"
                          placeholder="Nama Departemen"
                          class="form-control"
                          v-model="tambah.name"
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
      tambah: {
        name: null,
      },
      validationTambah: {
        nama: {
          status: true,
          message: null,
        },
        pemandu_id: {
          status: true,
          message: null,
        },
      },
      validationEdit: {
        nama: {
          status: true,
          message: null,
        },
        email: {
          status: true,
          message: null,
        },
        no_hp: {
          status: true,
          message: null,
        },
        gugus_id: {
          status: true,
          message: null,
        },
        alamat: {
          status: true,
          message: null,
        },
        foto: {
          status: true,
          message: null,
        },
      },
    };
  },
  methods: {
    navigation(url) {
      if (url) {
        this.dataGugus = null;

        axios
          .get(url, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            this.dataGugus = res.data.data;

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
    editGugus() {
      if (this.dataGugusOne) {
        setTimeout(() => {
          axios
            .put(
              `${this.url}bemkm/superadmin/gugus/${this.dataGugusOne.uuid}`,
              this.dataGugusOne,
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
      if (!this.dataOnePemandu.nama) {
        this.validationEdit.nama.status = false;
        this.validationEdit.nama.message = "Nama Pemandu harus diisi!";
      } else {
        this.validationEdit.nama.status = true;
        this.validationEdit.nama.message = null;
      }

      if (!this.dataOnePemandu.email) {
        this.validationEdit.email.status = false;
        this.validationEdit.email.message = "Email Pemandu harus diisi!";
      } else {
        this.validationEdit.email.status = true;
        this.validationEdit.email.message = null;
      }

      if (!this.dataOnePemandu.no_hp) {
        this.validationEdit.no_hp.status = false;
        this.validationEdit.no_hp.message = "Nomor Telepon harus diisi!";
      } else {
        this.validationEdit.no_hp.status = true;
        this.validationEdit.no_hp.message = null;
      }

      if (!this.dataOnePemandu.gugus_id) {
        this.validationEdit.gugus_id.status = false;
        this.validationEdit.gugus_id.message = "Gugus harus dipilih!";
      } else {
        this.validationEdit.gugus_id.status = true;
        this.validationEdit.gugus_id.message = null;
      }

      if (!this.dataOnePemandu.alamat) {
        this.validationEdit.alamat.status = false;
        this.validationEdit.alamat.message = "Alamat Pemandu harus diisi!";
      } else {
        this.validationEdit.alamat.status = true;
        this.validationEdit.alamat.message = null;
      }
    },
    openEdit(uuidGugus) {
      axios
        .get(`${this.url}bemkm/superadmin/gugus/${uuidGugus}`, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then((result) => {
          console.log(result);
          this.dataGugusOne = result.data.data;
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
              .delete(`${this.url}bemkm/superadmin/gugus/${uuidGugus}`, {
                headers: {
                  Authorization: localStorage.token,
                },
              })
              .then((res) => {
                console.log(res);
                if (res.data.success) {
                  Swal.fire(
                    "Deleted!",
                    `Akun Pemandu ${namaGugus} telah dihapus!`,
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
    tambahGugus() {
      if (this.tambah.name) {
        axios
          .post(`${this.url}bemkm/superadmin/gugus`, this.tambah, {
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
      if (!this.tambah.name) {
        this.validationTambah.nama.status = false;
        this.validationTambah.nama.message = "Nama Pemandu harus diisi!";
      } else {
        this.validationTambah.nama.status = true;
        this.validationTambah.nama.message = null;
      }

      if (!this.tambah.pemandu_id) {
        this.validationTambah.pemandu_id.status = false;
        this.validationTambah.pemandu_id.message = "Pemandu harus di pilih!";
      } else {
        this.validationTambah.pemandu_id.status = true;
        this.validationTambah.pemandu_id.message = null;
      }
    },
  },
  mounted() {
    $(".dropify").dropify();
    this.width = $(document).width();
    axios
      .get(`${this.url}bemkm/superadmin/pemandu`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        console.log(result);
        this.dataPemandu = result.data.data.data;
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
