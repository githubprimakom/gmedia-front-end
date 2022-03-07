<template>
  <div class="dashboard">
    <NavbarMahasiswa :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="row g-0 mb-5">
              <div class="col-md-2">
                <img
                  src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/72/413d2ba4494e2cb583e6b3e4a8b094/Logotipo_1.jpg"
                  class="img-fluid rounded-start"
                  alt="..."
                  width="100%"
                />
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title">
                    Belajar Membuat Aplikasi Android untuk Pemula
                  </h5>
                  <p class="card-text">
                    Disusun oleh : Aditya
                  </p>
                  <p class="card-text">
                    <span class="me-3">
                      <i class="far fa-chart-bar"></i> Level : Pemula
                    </span>
                    <span class="me-3">
                      <i class="far fa-clock"></i> Estimasi : 40 jam
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="info-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#info"
                      type="button"
                      role="tab"
                      aria-controls="info"
                      aria-selected="true"
                    >
                      <i class="fas fa-info-circle fa-2x"></i>
                      <p class="h6">Informasi</p>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="silabus-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#silabus"
                      type="button"
                      role="tab"
                      aria-controls="silabus"
                      aria-selected="false"
                    >
                      <i class="fas fa-file-alt fa-2x"></i>
                      <p class="h6">Silabus</p>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="tugas-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#tugas"
                      type="button"
                      role="tab"
                      aria-controls="tugas"
                      aria-selected="false"
                    >
                      <i class="fas fa-tasks fa-2x"></i>
                      <p class="h6">Tugas</p>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="forum-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#forum"
                      type="button"
                      role="tab"
                      aria-controls="forum"
                      aria-selected="false"
                    >
                      <i class="fas fa-comments fa-2x"></i>
                      <p class="h6">Forum</p>
                    </button>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active p-3"
                    id="info"
                    role="tabpanel"
                    aria-labelledby="info-tab"
                  >
                    <div class="row">
                      <div class="col-lg-8">
                        <div
                          class="card-without-border bg-light text-center rounded pb-4 mb-5"
                        >
                          <div class="card-body">
                            <h5 class="card-title font-weight-bold mt-4 mb-3">
                              <img
                                src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/graduation-confetti.png"
                                height="40px"
                                class="mr-2"
                              />
                              Selamat, Kamu Lulus Kelas ini!
                            </h5>
                            <h5
                              class="card-text font-weight-light mb-5 text-muted"
                            >
                              Terus belajar dan praktikkan ilmu menuju Developer
                              andal
                            </h5>
                            <div class="row">
                              <div class="col-lg-2"></div>
                              <div class="col-lg-4 px-2 pr-lg-4">
                                <div class="bg-white text-center rounded">
                                  <div class="card-body p-2">
                                    <img
                                      alt="sertifikat"
                                      src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/graduation-sertifikat.png"
                                      width="75%"
                                      class="px-3 mb-3"
                                    />
                                    <br />
                                    <b class="card-title font-weight-bold mb-3"
                                      >Sertifikat</b
                                    >
                                    <br />
                                    <small class="card-text mb-3 d-block"
                                      >Cetak sertifikat kamu sekarang
                                      juga</small
                                    >
                                    <div
                                      class="modal fade"
                                      id="sertifikatModal"
                                      tabindex="-1"
                                      aria-labelledby="sertifikatModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div class="modal-dialog">
                                        <div class="modal-content">
                                          <div class="modal-body text-start">
                                            <h6>Masukkan Nama</h6>
                                            <input
                                              type="text"
                                              class="form-control mb-3"
                                            />
                                            <a
                                              :href="
                                                $router.resolve({
                                                  name: 'Sertifikat',
                                                  params: { id: 1 },
                                                }).href
                                              "
                                              class="btn btn-primary"
                                            >
                                              Generate
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <a
                                      href="#"
                                      class="btn btn-primary mb-3"
                                      data-bs-toggle="modal"
                                      data-bs-target="#sertifikatModal"
                                    >
                                      Lihat Sertifikat
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-4 px-2 pl-lg-4 mt-4 mt-lg-0">
                                <div class="bg-white text-center rounded">
                                  <div class="card-body p-2">
                                    <img
                                      alt="feedback"
                                      src="https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/graduation-feedback.png"
                                      width="75%"
                                      class="px-3 mb-3"
                                    />
                                    <br />
                                    <b class="card-title font-weight-bold mb-3"
                                      >Feedback</b
                                    >
                                    <br />
                                    <small class="card-text mb-3 d-block"
                                      >Berikan feedback &amp; testimoni
                                      kamu</small
                                    >
                                    <div
                                      class="modal fade"
                                      id="feedback"
                                      tabindex="-1"
                                      aria-labelledby="feedbackLabel"
                                      aria-hidden="true"
                                    >
                                      <div class="modal-dialog">
                                        <div class="modal-content">
                                          <div class="modal-body text-start">
                                            <h6>Masukkan Testimoni</h6>
                                            <textarea
                                              cols="30"
                                              rows="3"
                                              class="form-control mb-3"
                                            ></textarea>
                                            <a
                                              :href="
                                                $router.resolve({
                                                  name: 'My Course Detail',
                                                  params: { id: 1 },
                                                }).href
                                              "
                                              class="btn btn-primary"
                                            >
                                              Kirim
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <a
                                      href="#"
                                      class="btn btn-primary mb-3"
                                      data-bs-toggle="modal"
                                      data-bs-target="#feedback"
                                      >Beri Feedback</a
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="h5">Deskripsi</div>
                        <p class="card-text">
                          Android merupakan sistem operasi mobile dengan
                          pengguna terbesar di Indonesia, yakni sekitar 90%.
                          Karena itulah banyak perusahaan yang membuat versi
                          Android-nya supaya lebih dekat dengan pelanggannya,
                          seperti Youtube, Facebook, dan Twitter. Perusahaan
                          kecil pun turut membutuhkan aplikasi Android untuk
                          menyelesaikan masalah yang ada. Ini juga menandakan
                          bahwa kebutuhan akan Android developer semakin
                          meningkat. Tak heran, profesi Android developer
                          merupakan 1 dari 5 profesi yang paling diincar
                          perusahaan.
                        </p>
                        <ul>
                          <li>
                            Sebagian besar masyarakat Indonesia memiliki
                            handphone dengan Android sebagai sistem operasinya,
                            ini merupakan potensi yang besar.
                          </li>
                          <li>
                            Android terbukti menjadi solusi untuk permasalahan
                            yang ada di masyarakat, sehingga bisa bermanfaat
                            lebih luas.
                          </li>
                          <li>
                            Banyak perusahaan yang membutuhkan Android Developer
                            namun resource yang ada masih sangat sedikit, bahkan
                            dinyatakan darurat.
                          </li>
                          <li>
                            Menjadi Android Developer merupakan salah satu
                            pekerjaan yang bisa dilakukan secara freelance,
                            sehingga waktunya bisa lebih fleksibel.
                          </li>
                          <li>
                            Android memiliki potensi yang besar untuk
                            menghasilkan uang, seperti melalui iklan Admob,
                            In-App purchase dan membuat proyek aplikasi.
                          </li>
                        </ul>
                      </div>
                      <div class="col-lg-4">
                        <div class="alert alert-success" role="alert">
                          Anda belum dapat mempelajari kelas ini. Yuk
                          berlangganan sekarang agar bisa belajar di Kelas ini
                          dan juga Kelas Dicoding Academy lainnya.
                        </div>
                        <p>
                          Daftar sekarang untuk dapat mengikuti pembelajaran
                        </p>
                        <hr />
                        <router-link
                          :to="{
                            name: 'Course Chapter',
                            params: {
                              id: '413d2ba-4494e2cb5-83e6b3e4a-8b094',
                              chapter: '413d2ba-4494e2cb5-83e6b3e4a-8b094',
                            },
                          }"
                          class="btn btn-primary"
                          >MASUK KELAS</router-link
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade p-3"
                    id="silabus"
                    role="tabpanel"
                    aria-labelledby="silabus-tab"
                  >
                    <div class="row">
                      <div class="col-lg-8">
                        <div class="accordion" id="accordionExample">
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                              <button
                                class="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse-1"
                                aria-expanded="true"
                                aria-controls="collapse-1"
                              >
                                <div class="h5">Persiapan Belajar</div>
                              </button>
                            </h2>
                            <div
                              id="collapse-1"
                              class="accordion-collapse collapse show"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body">
                                <ul class="list-group list-group-flush">
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    <span>1. Persetujuan Hak Cipta</span>
                                    <span class="text-success"
                                      ><i class="fas fa-check me-3"></i
                                      >Selesai</span
                                    >
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    <span>2. Materi Android Pemula</span>
                                    <router-link
                                      class="text-decoration-underline"
                                      :to="{
                                        name: 'Course Chapter',
                                        params: {
                                          id:
                                            '413d2ba-4494e2cb5-83e6b3e4a-8b094',
                                          chapter:
                                            '413d2ba-4494e2cb5-83e6b3e4a-8b094',
                                        },
                                      }"
                                    >
                                      Lanjutkan&nbsp;
                                    </router-link>
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    <span>3. Mekanisme Belajar</span>
                                    <span>Menunggu</span>
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    <span>4. Forum Diskusi</span>
                                    <span>Menunggu</span>
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    <span>5. Glosarium</span>
                                    <span>Menunggu</span>
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    <span>6. Daftar Referensi</span>
                                    <span>Menunggu</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThree">
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse-2"
                                aria-expanded="false"
                                aria-controls="collapse-2"
                              >
                                <div class="h5">Penutup</div>
                              </button>
                            </h2>
                            <div
                              id="collapse-2"
                              class="accordion-collapse collapse"
                              aria-labelledby="headingThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body">
                                <ul class="list-group list-group-flush">
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    <span>Ujian Akhir</span>
                                    <span>Menunggu</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="alert alert-success" role="alert">
                          Anda belum dapat mempelajari kelas ini. Yuk
                          berlangganan sekarang agar bisa belajar di Kelas ini
                          dan juga Kelas Dicoding Academy lainnya.
                        </div>
                        <p>
                          Daftar sekarang untuk dapat mengikuti pembelajaran
                        </p>
                        <hr />
                        <router-link
                          :to="{
                            name: 'Course Chapter',
                            params: {
                              id: '413d2ba-4494e2cb5-83e6b3e4a-8b094',
                              chapter: '413d2ba-4494e2cb5-83e6b3e4a-8b094',
                            },
                          }"
                          class="btn btn-primary"
                          >MASUK KELAS</router-link
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade p-3"
                    id="tugas"
                    role="tabpanel"
                    aria-labelledby="tugas-tab"
                  >
                    <div class="alert alert-danger" role="alert">
                      Anda belum melakukan pengumpulan tugas di kelas ini.
                    </div>
                  </div>
                  <div
                    class="tab-pane fade p-3"
                    id="forum"
                    role="tabpanel"
                    aria-labelledby="forum-tab"
                  >
                    <div class="alert alert-danger" role="alert">
                      Belum ada forum
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["url"]),
  },
  data: function() {
    return {
      width: null,
      dataMateri: null,
    };
  },
  mounted() {
    this.width = $(document).width();
  },
};
</script>
