<template>
  <div class="dashboard">
    <NavbarManageKursus :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card shadow border-0 mb-2">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div class="title-content">
                  Peserta
                </div>
              </div>
              <button
                class="btn btn-primary text-white"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#create"
              >
                <i class="fas fa-lock-open"></i> Enroll
              </button>
              <!-- CREATE -->
              <div
                class="modal fade"
                id="create"
                tabindex="-1"
                aria-labelledby="createLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body">
                      <h5 class="card-title fw-bold">Tambah Peserta</h5>
                      <hr />
                      <div class="row">
                        <div class="col-lg-12 mb-3">
                          <label for="status-edit" class="form-label"
                            >Peserta
                            <small class="text-danger text-small"
                              >(Klik untuk hapus)</small
                            ></label
                          >
                          <br />
                          <span
                            class="badge bg-success me-2"
                            v-for="(peserta, index) in pesertaDipilih"
                            :key="index"
                            @click="hapusPeserta(peserta)"
                            style="cursor: pointer;"
                            >{{ peserta }}</span
                          >
                        </div>
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <select
                              class="form-select my-select-2"
                              aria-label="Default select example"
                              id="select-peserta"
                            >
                              <option selected>Pilih Peserta</option>
                              <option
                                :value="data"
                                v-for="(data, index) in peserta"
                                :key="index"
                                >{{ data }}</option
                              >
                            </select>
                          </div>
                        </div>
                        <div class="row mb-2">
                          <div class="col-lg-6 mb-3">
                            <label for="mulai-edit" class="form-label"
                              >Mulai</label
                            >
                            <input
                              type="date"
                              class="form-control"
                              id="mulai-edit"
                              :disabled="unlimited"
                            />
                          </div>
                          <div class="col-lg-6 mb-3">
                            <label for="selesai-edit" class="form-label"
                              >Selesai</label
                            >
                            <input
                              type="date"
                              class="form-control"
                              id="selesai-edit"
                              :disabled="unlimited"
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="mb-3">
                            <input
                              type="checkbox"
                              class="form-check-input me-2"
                              id="tanpa-batas"
                              v-model="unlimited"
                            />
                            <label class="form-check-label" for="tanpa-batas"
                              >Tidak terbatas</label
                            >
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-4">
                          <button class="btn btn-primary" @click="submit">
                            Simpan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 mb-3">
            <div class="card-shadow mb-3">
              <div class="p-3">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">NO</th>
                        <th scope="col">NAMA</th>
                        <th scope="col" class="text-center">EMAIL</th>
                        <th scope="col" class="text-center">PERAN</th>
                        <th scope="col" class="text-center">TERAKHIR AKSES</th>
                        <th scope="col" class="text-center">STATUS</th>
                        <th scope="col" class="text-center">AKSI</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="align-middle">
                        <td>
                          <p class="text-td">
                            1
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            Aditya Ricki Julianto
                          </p>
                        </td>
                        <td class="text-center">
                          <div>
                            <div class="main-text">
                              adityaric72@gmail.com
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-td">
                            Siswa
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            5 hari yang lalu
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            <span class="badge bg-success">Aktif</span>
                          </p>
                        </td>
                        <td>
                          <div class="d-flex justify-content-center">
                            <button
                              class="btn btn-primary btn-sm text-white me-1"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#show"
                            >
                              <i class="fas fa-info"></i>
                            </button>
                            <button
                              class="btn btn-warning btn-sm text-white me-1"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#edit"
                            >
                              <i class="fas fa-cog"></i>
                            </button>
                            <button
                              class="btn btn-danger btn-sm text-white me-1"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#delete"
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- SHOW -->
        <div
          class="modal fade"
          id="show"
          tabindex="-1"
          aria-labelledby="showLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <h5 class="card-title fw-bold">Detail Peserta</h5>
                <hr />
                <div class="row">
                  <div class="col-lg-2">
                    Nama
                    <hr />
                  </div>
                  <div class="col-lg-10">
                    : Aditya Ricki Julianto
                    <hr />
                  </div>
                  <div class="col-lg-2">
                    Peran
                    <hr />
                  </div>
                  <div class="col-lg-10">
                    : Siswa
                    <hr />
                  </div>
                  <div class="col-lg-2">
                    Status
                    <hr />
                  </div>
                  <div class="col-lg-10">
                    : <span class="badge bg-success">Aktif</span>
                    <hr />
                  </div>
                  <div class="col-lg-2">
                    Mulai
                    <hr />
                  </div>
                  <div class="col-lg-10">
                    : 20 Juli 2020, 10:10
                    <hr />
                  </div>
                  <div class="col-lg-2">
                    Berakhir
                    <hr />
                  </div>
                  <div class="col-lg-10">
                    : 20 Juli 2022, 10:10
                    <hr />
                  </div>
                  <div class="col-lg-2">
                    Dibuat
                    <hr />
                  </div>
                  <div class="col-lg-10">
                    : 20 Juli 2020, 10:10
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- EDIT -->
        <div
          class="modal fade"
          id="edit"
          tabindex="-1"
          aria-labelledby="editLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <h5 class="card-title fw-bold">Ubah Peserta</h5>
                <hr />
                <div class="row">
                  <div class="col-lg-5 mb-3">
                    <label for="status-edit" class="form-label">Status</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      id="status-edit"
                    >
                      <option selected>Pilih Status</option>
                      <option value="1">Aktif</option>
                      <option value="2">Dibekukan</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-5 mb-3">
                    <label for="mulai-edit" class="form-label">Mulai</label>
                    <input
                      type="date"
                      class="form-control"
                      id="mulai-edit"
                      :disabled="unlimited"
                    />
                  </div>
                  <div class="col-lg-5 mb-3">
                    <label for="selesai-edit" class="form-label">Selesai</label>
                    <input
                      type="date"
                      class="form-control"
                      id="selesai-edit"
                      :disabled="unlimited"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input me-2"
                      id="tanpa-batas"
                      v-model="unlimited"
                    />
                    <label class="form-check-label" for="tanpa-batas"
                      >Tidak terbatas</label
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3">
                    <label
                      class="form-check-label text-danger"
                      for="tanpa-batas"
                      >Dibuat pada 22 Juni 2020, 10:10</label
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <button class="btn btn-primary" @click="submit">
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- DELETE -->
        <div
          class="modal fade"
          id="delete"
          tabindex="-1"
          aria-labelledby="deleteLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <h5 class="card-title fw-bold">Hapus Peserta</h5>
                <hr />
                <p>
                  Apakah Anda yakin ingin menghapus peserta Aditya Ricki
                  Julianto (sebelumnya terdaftar pada 22 Juni 2020, 10:10) dari
                  "Belajar Fundamental Aplikasi Back-End"?
                </p>
                <div class="row">
                  <div class="col-lg-4">
                    <button class="btn btn-primary" @click="submit">
                      Simpan
                    </button>
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
import NavbarManageKursus from "../../../../components/NavbarManageKursus.vue";

export default {
  data: function() {
    return {
      width: null,
      unlimited: false,
      pesertaDipilih: ["Aditya"],
      peserta: ["Ricki", "Julianto", "Mela", "Sintiya", "Dewi"],
    };
  },
  components: {
    NavbarManageKursus,
  },
  methods: {
    hapusPeserta: function(peserta) {
      this.pesertaDipilih.splice(this.pesertaDipilih.indexOf(peserta), 1);
      this.peserta.push(peserta);
    },
    submit: function() {
      window.location.reload();
    },
  },
  mounted() {
    this.width = $(document).width();
    $(() => {
      setTimeout(() => {
        $(".my-select-2").select2({
          theme: "bootstrap-5",
          dropdownParent: $("#create"),
        });
      }, 500);

      $("#select-peserta").on("change", () => {
        this.pesertaDipilih.push($("#select-peserta").val());
        this.peserta.splice(
          this.peserta.indexOf($("#select-peserta").val()),
          1
        );
        $("#select-peserta").val("");
      });
    });
  },
};
</script>
