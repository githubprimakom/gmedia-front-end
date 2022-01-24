<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <router-link
                  :to="{ name: 'Penilaian Master' }"
                  class="btn btn-primary me-2"
                  type="button"
                >
                  <i class="fas fa-arrow-left"></i>
                </router-link>
                <div>
                  <div class="title-content">
                    Penilaian
                  </div>
                  <div class="title-type-soal">
                    List Tugas - {{ $route.params.name }}
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
                <h4 class="judul">Tugas</h4>
                <Loader text="Sedang memuat data tugas." v-if="!dataTugas" />
                <div class="table-responsive" v-else>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">NO</th>
                        <th scope="col">JUDUL</th>
                        <th scope="col" class="text-center">MULAI</th>
                        <th scope="col" class="text-center">DEADLINE</th>
                        <th scope="col" class="text-center">STATUS</th>
                        <th scope="col" class="text-center">AKSI</th>
                      </tr>
                    </thead>
                    <tbody v-if="dataTugas">
                      <tr
                        class="align-middle"
                        v-for="(item, id) in dataTugas.data"
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
                              {{ formatDate(item.mulai.split(" ")[0]) }}
                            </div>
                            <div class="sub-text">
                              {{ item.mulai.split(" ")[1] }}
                            </div>
                          </div>
                        </td>
                        <td class="text-center">
                          <div>
                            <div class="main-text">
                              {{ formatDate(item.selesai.split(" ")[0]) }}
                            </div>
                            <div class="sub-text">
                              {{ item.selesai.split(" ")[1] }}
                            </div>
                          </div>
                        </td>
                        <td class="text-center">
                          <div class="d-flex flex-column align-items-baseline">
                            <div
                              class="px-3 py-1 success text-success border-radius mb-2"
                              style="font-weight: 600;"
                              v-if="item.dinilai > 0"
                            >
                              {{
                                item.belum_mengerjakan == 0
                                  ? "Semua telah dinilai"
                                  : item.dinilai + " dinilai"
                              }}
                            </div>
                            <div
                              class="px-3 py-1 primary text-primary border-radius mb-2"
                              style="font-weight: 600;"
                              v-if="
                                item.pengerjaan > 0 &&
                                  item.pengerjaan > item.dinilai
                              "
                            >
                              {{ item.pengerjaan - item.dinilai }}
                              telah mengerjakan
                            </div>
                            <div
                              class="px-3 py-1 danger text-danger border-radius"
                              style="font-weight: 600;"
                              v-if="item.belum_mengerjakan > 0"
                            >
                              {{ item.belum_mengerjakan }}
                              belum mengerjakan
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex justify-content-center">
                            <a
                              :href="
                                $router.resolve({
                                  name: 'Detail Penilaian',
                                  params: {
                                    name_gugus: $route.params.name,
                                    id_gugus: $route.params.id,
                                    name_tugas: item.nama,
                                    id_tugas: item.uuid,
                                  },
                                }).href
                              "
                              class="
                                btn btn-primary btn-sm
                              "
                              v-if="!item.penilaian"
                              >Detail</a
                            >
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
        <!-- <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div></div>
                <div>Tugas</div>
              </div>
              <div>Tenggat Waktu: 10 Agustus, 12:00</div>
            </div>
          </div>
          <div class="p-3">
            <div></div>
            <div class="row">
              <div class="col-md-6">
                <div>
                  Kerjakan soal yang diberikan dengan teliti. Kerjakan dengan
                  ketulusan hati dan yang terpenting adalah kejujuran.
                </div>
              </div>
              <div class="col-md-6"></div>
            </div>
          </div>
        </div> -->
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
  },
  mounted() {
    this.width = $(document).width();

    console.log(this.$route.params.id);
    axios
      .get(
        this.url +
          "tugas/superadmin/tugas/list-tugas-per-gugus/" +
          this.$route.params.id,
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      )
      .then((res) => {
        this.dataTugas = res.data;
        console.log(res);
        setTimeout(() => {
          $(".table").DataTable();
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
