<template>
  <div class="dashboard">
    <NavbarMahasiswa :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="title-content">Tugas</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 mb-3">
            <div class="card-shadow mb-3">
              <div class="p-3">
                <!-- <h4 class="judul">Tugas</h4> -->
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">JUDUL</th>
                        <th scope="col">DEADLINE</th>
                        <th scope="col">WAKTU KIRIM</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">NILAI</th>
                        <th scope="col">AKSI</th>
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
                            {{ item.tugas.nama }}
                          </p>
                        </td>
                        <td>
                          <div class="text-danger">
                            <div class="main-text">
                              {{ formatDate(item.tugas.selesai.split(" ")[0]) }}
                            </div>
                            <div class="sub-text">
                              {{ item.tugas.selesai.split(" ")[1] }}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div class="main-text">
                              {{
                                item.tugas.penilaian_formated.created_at
                                  ? formatDate(
                                      item.tugas.penilaian_formated.created_at.split(
                                        " "
                                      )[0]
                                    )
                                  : "-"
                              }}
                            </div>
                            <div class="sub-text">
                              {{
                                item.tugas.penilaian_formated.created_at
                                  ? item.tugas.penilaian_formated.created_at.split(
                                      " "
                                    )[1]
                                  : "-"
                              }}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            class="px-3 py-1 primary text-primary border-radius d-inline-block"
                            style="font-weight: 600;"
                            v-if="!item.tugas.penilaian"
                          >
                            Aktif
                          </div>
                          <div
                            class="px-3 py-1 warning text-warning border-radius d-inline-block"
                            style="font-weight: 600;"
                            v-else-if="!item.tugas.penilaian_formated.nilai"
                          >
                            Sedang dinilai
                          </div>
                          <div
                            class="px-3 py-1 success text-success border-radius d-inline-block"
                            style="font-weight: 600;"
                            v-else-if="item.tugas.penilaian_formated.nilai"
                          >
                            Dinilai
                          </div>
                        </td>
                        <td>
                          <span
                            style="font-weight: 600;"
                            v-if="
                              !item.tugas.penilaian ||
                                !item.tugas.penilaian_formated.nilai
                            "
                            >-</span
                          >
                          <span
                            class="text-success"
                            style="font-weight: 600;"
                            v-else
                            >{{ item.tugas.penilaian_formated.nilai }}</span
                          >
                        </td>
                        <td>
                          <div class="d-flex justify-content-start">
                            <a
                              :href="
                                $router.resolve({
                                  name: 'Do Tugas',
                                  params: { id: item.tugas_id },
                                }).href
                              "
                              class="
                                btn btn-primary btn-sm me-2
                              "
                              v-if="!item.tugas.penilaian"
                              >Kerjakan</a
                            >
                            <button
                              class="
                                btn btn-secondary btn-sm me-2
                              "
                              disabled
                              v-else
                            >
                              Selesai
                            </button>
                            <a
                              v-if="
                                item.tugas.certificate_url &&
                                  item.tugas.penilaian
                              "
                              aria-disabled="true"
                              :href="item.tugas.certificate_url"
                              target="_blank"
                              class="
                                btn btn-success btn-sm me-2
                              "
                            >
                              Sertifikat
                            </a>
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
      return moment(date)
        .locale("id")
        .format("DD MMMM YYYY");
    },
  },
  mounted() {
    this.width = $(document).width();

    axios
      .get(this.url + "tugas/mahasiswa/tugas/", {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        this.dataTugas = res.data.data;
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
tr th {
  text-align: center;
}
tr td {
  text-align: center;
}
/* .judul {
  color: rgba(40, 40, 40, 1);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}
.badge {
  padding: 8px 18px !important;
  font-size: 14px;
  font-weight: 700;
}
.badge-success {
  background-color: rgba(40, 199, 111, 0.1);
}
.text-success {
  color: rgba(40, 199, 111, 1) !important;
} */
</style>
