<template>
  <div class="dashboard">
    <NavbarManageKursus :widthContent="width" />
    <div
      class="modal fade"
      id="tipeSoal"
      tabindex="-1"
      aria-labelledby="tipeSoalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <h5 class="card-title fw-bold">
              Pilih Tipe Soal
            </h5>
            <hr />
            <div class="row">
              <div class="col-lg-3 mb-4">
                <a
                  :href="
                    $router.resolve({
                      name: 'Manage Kursus Tugas Buat Soal',
                      params: {
                        id: $route.params.id,
                        topic: $route.params.topic,
                        task: $route.params.task,
                      },
                      query: {
                        tipe: 'MULTIPLE CHOICE',
                      },
                    }).href
                  "
                  class="btn btn-outline-primary d-block"
                >
                  <i class="fas fa-list"></i>
                  <br />
                  Choice
                </a>
              </div>
              <div class="col-lg-3 mb-4">
                <a
                  :href="
                    $router.resolve({
                      name: 'Manage Kursus Tugas Buat Soal',
                      params: {
                        id: $route.params.id,
                        topic: $route.params.topic,
                        task: $route.params.task,
                      },
                      query: {
                        tipe: 'MATCHING',
                      },
                    }).href
                  "
                  class="btn btn-outline-warning d-block"
                >
                  <i class="fas fa-equals"></i>
                  <br />
                  Matching
                </a>
              </div>
              <div class="col-lg-3 mb-4">
                <a
                  :href="
                    $router.resolve({
                      name: 'Manage Kursus Tugas Buat Soal',
                      params: {
                        id: $route.params.id,
                        topic: $route.params.topic,
                        task: $route.params.task,
                      },
                      query: {
                        tipe: 'SHORT',
                      },
                    }).href
                  "
                  class="btn btn-outline-info d-block"
                >
                  <i class="fas fa-sticky-note"></i>
                  <br />
                  Short
                </a>
              </div>
              <div class="col-lg-3 mb-4">
                <a
                  :href="
                    $router.resolve({
                      name: 'Manage Kursus Tugas Buat Soal',
                      params: {
                        id: $route.params.id,
                        topic: $route.params.topic,
                        task: $route.params.task,
                      },
                      query: {
                        tipe: 'ESSAY',
                      },
                    }).href
                  "
                  class="btn btn-outline-success d-block me-2"
                >
                  <i class="fas fa-file"></i>
                  <br />
                  Essay
                </a>
              </div>
              <div class="col-lg-3 mb-4">
                <a
                  :href="
                    $router.resolve({
                      name: 'Manage Kursus Tugas Buat Soal',
                      params: {
                        id: $route.params.id,
                        topic: $route.params.topic,
                        task: $route.params.task,
                      },
                      query: {
                        tipe: 'UPLOAD',
                      },
                    }).href
                  "
                  class="btn btn-outline-danger d-block me-2"
                >
                  <i class="fas fa-upload"></i>
                  <br />
                  Upload
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div class="title-content">
                  Soal Tugas Pertama
                </div>
              </div>
              <div>
                <router-link
                  :to="{
                    name: 'Manage Kursus Topik Lihat Tugas',
                    params: {
                      id: $route.params.id,
                      topic: $route.params.topic,
                      task: $route.params.task,
                    },
                  }"
                  class="btn btn-outline-secondary me-2"
                  type="button"
                >
                  <i class="fas fa-arrow-left"></i> Kembali
                </router-link>
                <button
                  class="btn btn-success me-2"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#tipeSoal"
                >
                  <i class="fas fa-plus"></i> Buat Soal
                </button>
                <router-link
                  :to="{
                    name: 'Manage Kursus Tugas Preview',
                    params: {
                      id: $route.params.id,
                      topic: $route.params.topic,
                      task: $route.params.task,
                    },
                  }"
                  class="btn btn-outline-primary"
                  type="button"
                >
                  <i class="fas fa-eye"></i> Preview
                </router-link>
              </div>
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
                        <th>Pertanyaan</th>
                        <th>Tipe</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <router-link
                            :to="{
                              name: 'Manage Kursus Tugas Ubah Soal',
                              params: {
                                id: $route.params.id,
                                topic: $route.params.topic,
                                task: $route.params.task,
                                question: 1,
                              },
                              query: {
                                tipe: 'MULTIPLE CHOICE',
                              },
                            }"
                          >
                            Dibawah ini bahasa pemrograman yang tidak ada konsep
                            OOP adalah?
                          </router-link>
                        </td>
                        <td>MULTIPLE CHOICE</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          <router-link
                            :to="{
                              name: 'Manage Kursus Tugas Ubah Soal',
                              params: {
                                id: $route.params.id,
                                topic: $route.params.topic,
                                task: $route.params.task,
                                question: 1,
                              },
                              query: {
                                tipe: 'MATCHING',
                              },
                            }"
                          >
                            Cocokkan bahasa pemrograma dan framwork yang
                            digunakan
                          </router-link>
                        </td>
                        <td>MATCHING</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>
                          <router-link
                            :to="{
                              name: 'Manage Kursus Tugas Ubah Soal',
                              params: {
                                id: $route.params.id,
                                topic: $route.params.topic,
                                task: $route.params.task,
                                question: 1,
                              },
                              query: {
                                tipe: 'SHORT',
                              },
                            }"
                          >
                            Bahasa pemrograman yang digunakan untuk membuat
                            Docker?
                          </router-link>
                        </td>
                        <td>SHORT</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>
                          <router-link
                            :to="{
                              name: 'Manage Kursus Tugas Ubah Soal',
                              params: {
                                id: $route.params.id,
                                topic: $route.params.topic,
                                task: $route.params.task,
                                question: 1,
                              },
                              query: {
                                tipe: 'ESSAY',
                              },
                            }"
                          >
                            Apa kegunaan GIT?
                          </router-link>
                        </td>
                        <td>ESSAY</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>
                          <router-link
                            :to="{
                              name: 'Manage Kursus Tugas Ubah Soal',
                              params: {
                                id: $route.params.id,
                                topic: $route.params.topic,
                                task: $route.params.task,
                                question: 1,
                              },
                              query: {
                                tipe: 'UPLOAD',
                              },
                            }"
                          >
                            Buat makalah dengan tema pemrograman!
                          </router-link>
                        </td>
                        <td>UPLOAD</td>
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
import NavbarManageKursus from "../../../../../../../components/NavbarManageKursus.vue";

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
