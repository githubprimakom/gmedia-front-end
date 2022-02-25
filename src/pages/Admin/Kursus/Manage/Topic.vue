<template>
  <div class="dashboard">
    <NavbarManageKursus :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-2">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="d-flex align-items-center">
                <div class="title-content">
                  Topik 1
                </div>
              </div>
              <div>
                <button class="btn btn-info text-white me-2" type="button">
                  <i class="fas fa-copy"></i> Salin Link Topik
                </button>
                <router-link
                  :to="{
                    name: 'Manage Kursus Ubah Topik',
                    params: { id: 1, topic: 2 },
                  }"
                  class="btn btn-warning text-white"
                  type="button"
                >
                  <i class="fas fa-edit"></i> Ubah
                </router-link>
              </div>
            </div>
            <img
              src="https://glints.com/id/lowongan/wp-content/uploads/2019/12/code-coding-computer-data-574070-1.jpg"
              class="card-img-top"
              alt="..."
            />
            <hr />
            <div class="row">
              <div class="col-lg-12">
                <p>
                  Selamat datang di Kelas Cloud Practitioner Essentials! Kelas
                  ini adalah kelas dasar yang hadir untuk mengenalkan Anda pada
                  layanan komputasi cloud dengan Amazon Web Services atau biasa
                  disingkat AWS.
                </p>
                <p>
                  Amazon Web Services atau AWS adalah salah satu layanan
                  penyedia komputasi cloud yang telah hadir di seluruh dunia.
                  AWS merupakan platform cloud yang paling komprehensif dan
                  digunakan secara luas. Faktanya, jumlah layanan di AWS
                  mencapai lebih dari ratusan layanan unggulan dengan jutaan
                  pelanggan.
                </p>
                <p>
                  Dengan cloud seperti AWS ini, pengguna dari berbagai kalangan
                  perusahaan IT, pada umumnya, menjadi lebih tangkas dalam
                  menjalankan aktivitas operasional sehari-hari dan lebih cepat
                  dalam berinovasi.
                </p>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-10">
                <a
                  href="https://zoom.us"
                  class="text-decoration-none me-3"
                  target="_blank"
                >
                  <i class="fas fa-video me-2"></i>Video konferensi pembukaan
                  sesi</a
                >
              </div>
              <div class="col-lg-2">
                <div class="dropdown">
                  <button
                    class="btn btn-outline-primary dropdown-toggle btn-sm"
                    type="button"
                    id="aksi-1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Aksi
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="aksi-1">
                    <li>
                      <router-link
                        :to="{
                          name: 'Manage Kursus Topik Ubah Meet',
                          params: {
                            id: $route.params.id,
                            topic: $route.params.topic,
                            meet: 1,
                          },
                        }"
                        class="dropdown-item"
                        >Ubah</router-link
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Hapus</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-10">
                <a
                  href="https://zoom.us"
                  class="text-decoration-none me-3"
                  target="_blank"
                >
                  <i class="fas fa-bullhorn me-2"></i>Forum diskusi</a
                >
              </div>
              <div class="col-lg-2">
                <div class="dropdown">
                  <button
                    class="btn btn-outline-primary dropdown-toggle btn-sm"
                    type="button"
                    id="aksi-1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Aksi
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="aksi-1">
                    <li>
                      <router-link
                        :to="{
                          name: 'Manage Kursus Topik Ubah Forum',
                          params: {
                            id: $route.params.id,
                            topic: $route.params.topic,
                            meet: 1,
                          },
                        }"
                        class="dropdown-item"
                        >Ubah</router-link
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Hapus</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-10">
                <a
                  href="https://zoom.us"
                  class="text-decoration-none me-3"
                  target="_blank"
                >
                  <i class="fas fa-file me-2"></i>File materi 1</a
                >
              </div>
              <div class="col-lg-2">
                <div class="dropdown">
                  <button
                    class="btn btn-outline-primary dropdown-toggle btn-sm"
                    type="button"
                    id="aksi-1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Aksi
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="aksi-1">
                    <li>
                      <router-link
                        :to="{
                          name: 'Manage Kursus Topik Ubah File',
                          params: {
                            id: $route.params.id,
                            topic: $route.params.topic,
                            meet: 1,
                          },
                        }"
                        class="dropdown-item"
                        >Ubah</router-link
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Hapus</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-10">
                <router-link
                  :to="{
                    name: 'Manage Kursus Topik Lihat Tugas',
                    params: { id: 1, topic: 2, task: 1 },
                  }"
                  class="text-decoration-none me-3"
                >
                  <i class="fas fa-tasks me-2"></i>Tugas pertama</router-link
                >
              </div>
              <div class="col-lg-2">
                <div class="dropdown">
                  <button
                    class="btn btn-outline-primary dropdown-toggle btn-sm"
                    type="button"
                    id="aksi-1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Aksi
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="aksi-1">
                    <li><a class="dropdown-item" href="#">Ubah</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Hapus</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div
                class="modal fade"
                id="tambahAktifitas"
                tabindex="-1"
                aria-labelledby="tambahAktifitasLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body">
                      <h5 class="card-title fw-bold">
                        Tambah Aktifitas
                      </h5>
                      <hr />
                      <div class="row">
                        <div class="col-lg-3">
                          <a
                            :href="
                              $router.resolve({
                                name: 'Manage Kursus Topik Buat Meet',
                                params: { id: 1, topic: 2 },
                              }).href
                            "
                            class="btn btn-outline-primary d-block me-2 close-modal"
                          >
                            <i class="fas fa-video"></i>
                            <br />
                            Meet
                          </a>
                        </div>
                        <div class="col-lg-3">
                          <a
                            :href="
                              $router.resolve({
                                name: 'Manage Kursus Topik Buat Tugas',
                                params: { id: 1, topic: 2 },
                              }).href
                            "
                            class="btn btn-outline-warning d-block me-2"
                          >
                            <i class="fas fa-tasks"></i>
                            <br />
                            Tugas
                          </a>
                        </div>
                        <div class="col-lg-3">
                          <a
                            :href="
                              $router.resolve({
                                name: 'Manage Kursus Topik Buat Forum',
                                params: { id: 1, topic: 2 },
                              }).href
                            "
                            class="btn btn-outline-info d-block me-2"
                          >
                            <i class="fas fa-bullhorn"></i>
                            <br />
                            Forum
                          </a>
                        </div>
                        <div class="col-lg-3">
                          <a
                            :href="
                              $router.resolve({
                                name: 'Manage Kursus Topik Buat File',
                                params: { id: 1, topic: 2 },
                              }).href
                            "
                            class="btn btn-outline-success d-block me-2"
                          >
                            <i class="fas fa-file"></i>
                            <br />
                            File
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12 text-end">
                <i class="fas fa-plus"></i>
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#tambahAktifitas"
                  >Tambahkan aktifitas</a
                >
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
    };
  },
  components: {
    NavbarManageKursus,
  },
  methods: {},
  mounted() {
    this.width = $(document).width();
    $(() => {
      //
    });
  },
};
</script>
