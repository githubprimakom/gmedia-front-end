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
                  Penugasan
                </div>
              </div>
              <router-link
                :to="{ name: 'Pilih Gugus' }"
                class="btn btn-success"
                type="button"
              >
                + Tambah Tugas
              </router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 mb-3">
            <div class="card-shadow mb-3">
              <div class="p-3">
                <Loader text="Sedang memuat data tugas." v-if="!dataTugas" />
                <div class="table-responsive" v-else>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">NO</th>
                        <th scope="col">JUDUL</th>
                        <th scope="col" class="text-center">DIBUAT</th>
                        <th scope="col" class="text-center">MULAI</th>
                        <th scope="col" class="text-center">DEADLINE</th>
                        <th scope="col" class="text-center">AKSI</th>
                      </tr>
                    </thead>
                    <tbody v-if="dataTugas">
                      <tr
                        class="align-middle"
                        v-for="(item, id) in dataTugas.data.data"
                        :key="id"
                      >
                        <td>
                          <p class="text-td">
                            {{ id + 1 }}
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            {{ item.nama }}
                          </p>
                        </td>
                        <td class="text-center">
                          <div>
                            <div class="main-text">
                              {{ formatDate(item.created_at.split(" ")[0]) }}
                            </div>
                          </div>
                        </td>
                        <td class="text-center">
                          <div>
                            <div class="main-text">
                              {{ formatDate(item.mulai.split(" ")[0]) }}
                            </div>
                            <div class="sub-text">
                              {{ item.mulai.split(" ")[1] }}
                            </div>
                          </div>
                        </td>
                        <td class="text-center">
                          <div class="text-danger">
                            <div class="main-text">
                              {{ formatDate(item.selesai.split(" ")[0]) }}
                            </div>
                            <div class="sub-text">
                              {{ item.selesai.split(" ")[1] }}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex justify-content-center">
                            <a
                              :href="
                                $router.resolve({
                                  name: 'Detail Tugas',
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
                              @click="deleteTugas(item.uuid)"
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
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMM YYYY");
    },
    deleteTugas(id) {
      console.log(id);

      Swal.fire({
        title: "Apakah anda yakin menghapus tugas ini?",
        text: "Data anda tidak dapat dikembalikan setelah dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fb4b4b",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Hapus Tugas!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(this.url + "tugas/superadmin/tugas/" + id, {
              headers: {
                Authorization: localStorage.token,
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                Swal.fire("Tugas telah dihapus!", "", "success").then(() => {
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
              console.log(err);
            });
        }
      });
    },
  },
  mounted() {
    this.width = $(document).width();

    axios
      .get(this.url + "tugas/superadmin/tugas", {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        this.dataTugas = res.data;
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
