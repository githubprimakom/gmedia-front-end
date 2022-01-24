<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div class="title-content">
                  Materi
                </div>
              </div>
              <router-link
                :to="{ name: 'Pilih Gugus Materi' }"
                class="btn btn-success"
                type="button"
              >
                + Tambah Materi
              </router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 mb-3">
            <div class="card-shadow mb-3">
              <div class="p-3">
                <Loader text="Sedang memuat data materi." v-if="!dataMateri" />
                <div class="table-responsive" v-else>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">NO</th>
                        <th scope="col">JUDUL</th>
                        <th scope="col" class="text-center">DIBUAT</th>
                        <th scope="col" class="text-center">TIPE</th>
                        <th scope="col" class="text-center">KOMPETENSI</th>
                        <th scope="col" class="text-center">LEVEL</th>
                        <th scope="col" class="text-center">METODE</th>
                        <th scope="col" class="text-center">AKSI</th>
                      </tr>
                    </thead>
                    <tbody v-if="dataMateri">
                      <tr
                        class="align-middle"
                        v-for="(item, id) in dataMateri.data.data"
                        :key="id"
                      >
                        <td>
                          <p class="text-td">
                            {{ id + 1 }}
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            {{ item.judul }}
                          </p>
                        </td>
                        <td class="text-center">
                          <div>
                            <div class="main-text">
                              {{ formatDate(item.created_at.split(" ")[0]) }}
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-td">
                            {{ item.tipe }}
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            {{ item.kompetensi }}
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            {{ item.level }}
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            {{ item.kompetensi }}
                          </p>
                        </td>
                        <td>
                          <div class="d-flex justify-content-center">
                            <a
                              :href="
                                $router.resolve({
                                  name: 'Detail Materi',
                                  params: {
                                    id: item.uuid,
                                  },
                                }).href
                              "
                              class="
                                btn btn-primary btn-sm me-2
                              "
                              ><i class="fas fa-eye"></i
                            ></a>
                            <button
                              class="btn btn-danger btn-sm text-white"
                              type="button"
                              @click="deleteMateri(item.uuid)"
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
      dataTugas: null,
      dataMateri: null,
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMM YYYY");
    },
    deleteMateri(id) {
      console.log(id);

      Swal.fire({
        title: "Apakah anda yakin menghapus materi ini?",
        text: "Data anda tidak dapat dikembalikan setelah dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fb4b4b",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Hapus Materi!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(this.url + "tugas/superadmin/materi/" + id, {
              headers: {
                Authorization: localStorage.token,
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                Swal.fire("Materi telah dihapus!", "", "success").then(() => {
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
              Swal.fire({
                position: "center",
                icon: "error",
                title: err.response.data.message,
              });
            });
        }
      });
    },
  },
  mounted() {
    this.width = $(document).width();

    axios
      .get(this.url + "tugas/superadmin/materi", {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        this.dataMateri = res.data;
        console.log(res);
        setTimeout(() => {
          $(".table").DataTable({
            ordering: false,
          });
        }, 500);
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
