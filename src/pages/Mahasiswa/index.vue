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
                <div class="h2 text-white">Selamat datang</div>
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
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="h5">
              Selamat datang {{ userData ? userData.data.nama : "@Staff" }}, ayo
              segera selesaikan tugas kamu ya
            </div>
            <hr />
            <div class="row">
              <div class="col-md-6 mb-3">
                <div
                  class="card "
                  style="border-bottom: 4px solid rgb(1, 103, 143);"
                >
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-3 d-flex align-items-center">
                        <img
                          src="https://teladan.pelindo.co.id/img/elearning.png"
                          alt=""
                          style="margin-top: 0%;"
                          class="img-fluid"
                        />
                      </div>
                      <div class="col-md-9">
                        <h4>Materi</h4>
                        <hr />
                        <div class="row">
                          <div class="col-md-8">
                            <strong><p>Materi tersedia</p></strong>
                          </div>
                          <div class="col-md-4 text-right">
                            <h3>{{ materi }}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div
                  class="card"
                  style="border-bottom: 4px solid rgb(203, 128, 58);"
                >
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-3 d-flex align-items-center">
                        <img
                          src="https://teladan.pelindo.co.id/img/counseling.png"
                          alt=""
                          style="margin-top: 0%;"
                          class="img-fluid"
                        />
                      </div>
                      <div class="col-md-9">
                        <strong><h4>Tugas</h4></strong>
                        <hr />
                        <div class="row">
                          <div class="col-md-8">
                            <strong><p>Diselesaikan</p></strong>
                          </div>
                          <div class="col-md-4 text-right">
                            <h3>{{ complete }}</h3>
                          </div>
                        </div>
                        <div class="row mt-1">
                          <div class="col-md-8">
                            <strong><p>Belum diselesaikan</p></strong>
                          </div>
                          <div class="col-md-4 text-right">
                            <h3>{{ incomplete }}</h3>
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
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import { mapState } from "vuex";
import axios from "axios";
import moment from "moment";
// import faceapi from 'face-api.js'
// import smartcrop from "smartcrop";

export default {
  computed: {
    ...mapState(["userData", "url"]),
  },
  data: function() {
    return {
      width: null,
      incomplete: 0,
      complete: 0,
      materi: 0,
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
    axios
      .get(`${this.url}tugas/mahasiswa/belum-selesai`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        console.log(res);
        this.incomplete = res.data.data.length;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${this.url}tugas/mahasiswa/sudah-selesai`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        console.log(res);
        this.complete = res.data.data.length;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${this.url}tugas/mahasiswa/materi/total`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        console.log(res);
        this.materi = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.width = $(document).width();
  },
};
</script>
