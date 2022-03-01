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
                  Tugas Pertama
                </div>
              </div>
              <router-link
                :to="{
                  name: 'Manage Kursus Lihat Topik',
                  params: { id: $route.params.id, topic: $route.params.topic },
                }"
                class="btn btn-outline-secondary"
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
                <div class="d-flex justify-content-between">
                  <div>
                    <p>Petunjuk pengerjaan :</p>
                    <p>1. Kerjakan soal yang mudah-mudah terlebih dahulu</p>
                    <p>2. Berdoa</p>
                  </div>
                  <div>
                    <router-link
                      :to="{
                        name: 'Manage Kursus Tugas Soal',
                        params: {
                          id: $route.params.id,
                          topic: $route.params.topic,
                          task: $route.params.task,
                        },
                      }"
                      class="btn btn-success"
                    >
                      <i class="fas fa-plus me-2"></i> Lihat Soal
                    </router-link>
                  </div>
                </div>
                <hr />
                <div class="h5 fw-bold">Ringkasan penilaian</div>
                <div class="row py-2 border-bottom bg-light">
                  <div class="col-lg-4">Peserta</div>
                  <div class="col-lg-8">20</div>
                </div>
                <div class="row py-2 border-bottom">
                  <div class="col-lg-4">Mengerjakan</div>
                  <div class="col-lg-8">19</div>
                </div>
                <div class="row py-2 border-bottom bg-light">
                  <div class="col-lg-4">Belum Dinilai</div>
                  <div class="col-lg-8">5</div>
                </div>
                <div class="row py-2 border-bottom">
                  <div class="col-lg-4">Batas Pengumpulan</div>
                  <div class="col-lg-8">20 Mei 2022, 10:10</div>
                </div>
                <div class="row py-2 border-bottom bg-light mb-3">
                  <div class="col-lg-4">Sisa Waktu</div>
                  <div class="col-lg-8" id="sisa"></div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <router-link
                      :to="{
                        name: 'Manage Kursus Topik Pengerjaan Tugas',
                        params: {
                          id: $route.params.id,
                          topic: $route.params.topic,
                          task: 1,
                        },
                      }"
                      class="btn btn-outline-secondary me-2"
                      >Pengerjaan</router-link
                    >
                    <router-link
                      :to="{
                        name: 'Manage Kursus Topik Penilaian Tugas',
                        params: {
                          id: $route.params.id,
                          topic: $route.params.topic,
                          task: 1,
                        },
                      }"
                      class="btn btn-primary"
                      >Penilaian</router-link
                    >
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
      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      const countDown = new Date("20 May 2022, 10:10").getTime(),
        x = setInterval(function() {
          const now = new Date().getTime(),
            distance = countDown - now;

          $("#sisa").html(
            `${Math.floor(distance / day)} hari ${Math.floor(
              (distance % day) / hour
            )} jam ${Math.floor((distance % hour) / minute)} menit ${Math.floor(
              (distance % minute) / second
            )} detik`
          );

          if (distance < 0) {
            $("#sisa").html("Waktu Habis");
            clearInterval(x);
          }
        }, 0);
    });
  },
};
</script>
