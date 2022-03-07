<template>
  <div class="dashboard">
    <NavbarMahasiswa :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <!-- <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="title-content">Presensi</div>
            </div>
          </div>
        </div> -->
        <div
          class="card-shadow mb-3"
          style="background-image: url('https://teladan.pelindo.co.id/img/cq.png'); background-repeat: no-repeat; background-size: cover; background-position: center; height: 200px; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover;"
        >
          <div class="p-3">
            <div
              class="d-flex flex-md-row flex-column justify-content-md-between align-items-md-center align-items-start"
            >
              <div>
                <div class="h2 text-white">Selamat datang, Aditya Ricki</div>
                <div class="p mb-4 text-white col-8">
                  Belajar dengan menyenangkan kapanpun dan dimanapun hanya
                  melalui aplikasi
                </div>
                <!-- <div class="third-content">
                  *Ambil gambar setengah badan Anda untuk melakukan Presensi
                  secara online!
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <div class="card-shadow mb-3">
              <div class="p-3">
                <h5 class="card-title">
                  <i class="fas fa-copy"></i> Aktivitas Belajar
                </h5>
                <hr />
                <div class="row">
                  <div class="col-lg-12 mb-3">
                    <div class="card border-0 bg-light">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-lg-9">
                            <span class="small text-secondary">
                              Sedang dipelajari <i class="fas fa-clock"></i>
                            </span>
                            <h6>Belajar Fundamental Aplikasi Back-End</h6>
                          </div>
                          <div class="col-lg-3 text-center p-3">
                            <router-link
                              :to="{
                                name: 'My Course Detail',
                                params: {
                                  id: '413d2ba-4494e2cb5-83e6b3e4a-8b094',
                                },
                              }"
                              class="text-decoration-underline"
                              >Lanjutkan</router-link
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 mb-3">
                    <div class="card border-0 bg-light">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-lg-9">
                            <span class="small text-secondary">
                              Sedang dipelajari <i class="fas fa-clock"></i>
                            </span>
                            <h6>
                              Belajar Membuat Aplikasi Back-End untuk Pemula
                            </h6>
                          </div>
                          <div class="col-lg-3 text-center p-3">
                            <router-link
                              :to="{
                                name: 'My Course Detail',
                                params: {
                                  id: '413d2ba-4494e2cb5-83e6b3e4a-8b094',
                                },
                              }"
                              class="text-decoration-underline"
                              >Lanjutkan</router-link
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 mb-3">
                    <div class="card border-0 bg-light">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-lg-9">
                            <span class="small text-secondary">
                              Sedang dipelajari <i class="fas fa-clock"></i>
                            </span>
                            <h6>
                              Architecting on AWS (Membangun Arsitektur Cloud di
                              AWS)
                            </h6>
                          </div>
                          <div class="col-lg-3 text-center p-3">
                            <router-link
                              :to="{
                                name: 'My Course Detail',
                                params: {
                                  id: '413d2ba-4494e2cb5-83e6b3e4a-8b094',
                                },
                              }"
                              class="text-decoration-underline"
                              >Lanjutkan</router-link
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 mb-3">
                    <div class="card border bg-light border-info">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-lg-9">
                            <small class="small text-secondary">
                              Telah diselesaikan
                              <i class="fas fa-check text-success"></i>
                            </small>
                            <h6>Belajar Dasar Pemrograman JavaScript</h6>
                          </div>
                          <div class="col-lg-3 text-center p-3">
                            <a
                              href="#"
                              class="text-decoration-underline"
                              data-bs-toggle="modal"
                              data-bs-target="#sertifikatModal"
                              >Lihat Sertifikat</a
                            >
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
        <div
          class="modal fade"
          id="sertifikatModal"
          tabindex="-1"
          aria-labelledby="sertifikatModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <h5>Masukkan Nama</h5>
                <input type="text" class="form-control mb-3" />
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
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */

export default {
  data: function() {
    return {
      width: null,
    };
  },
  mounted() {
    this.width = $(document).width();
  },
};
</script>
