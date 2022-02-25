<template>
  <div class="dashboard">
    <NavbarManageKursus :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div class="title-content">
                  Pengerjaan Tugas Pertama
                </div>
              </div>
              <router-link
                :to="{
                  name: 'Manage Kursus Topik Lihat Tugas',
                  params: {
                    id: $route.params.id,
                    topic: $route.params.topic,
                    task: $route.params.task,
                  },
                }"
                class="btn btn-success"
                type="button"
              >
                <i class="fas fa-arrow-left"></i> Kembali
              </router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 mb-3">
            <div class="card-shadow mb-3">
              <div class="p-3">
                <div class="table-responsive">
                  <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Foto</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Nilai</th>
                        <th>Dikerjakan</th>
                        <th>Dinilai</th>
                        <th>Nilai Akhir</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <img
                            src="https://sia.uty.ac.id/fotokecil/3183111056.jpg"
                            alt=""
                            class="img-fluid"
                            width="50px"
                          />
                        </td>
                        <td>Aditya Ricki Julianto</td>
                        <td>adityaric72@gmail.com</td>
                        <td>Belum Dinilai</td>
                        <td>
                          <router-link
                            :to="{
                              name: 'Manage Kursus Topik Penilaian Tugas',
                              params: {
                                id: $route.params.id,
                                topic: $route.params.topic,
                                task: $route.params.task,
                              },
                            }"
                            class="btn btn-primary"
                            >Nilai</router-link
                          >
                        </td>
                        <td>20 Maret 2022, 10:10</td>
                        <td>-</td>
                        <td>0 / 100</td>
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
import NavbarManageKursus from "../../../../../../components/NavbarManageKursus.vue";

export default {
  data: function() {
    return {
      width: null,
    };
  },
  components: {
    NavbarManageKursus,
  },
  mounted() {
    this.width = $(document).width();
    $(() => {
      $(".table").DataTable();
    });
  },
};
</script>
