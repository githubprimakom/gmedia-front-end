<template>
  <div class="dashboard">
    <NavbarMahasiswa :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="title-content">Presensi</div>
              <button
                type="button"
                class="btn btn-outline-warning"
                @click="openModalLearning('relearning')"
                v-if="
                  userData &&
                    loadedPresensi &&
                    userData.data.face_recognition == 1
                "
              >
                Ulangi Verifikasi Wajah
              </button>
            </div>
          </div>
        </div>
        <div v-if="userData && loadedPresensi">
          <div
            class="card-shadow mb-3"
            v-if="userData.data.face_recognition == 1"
          >
            <div class="p-3">
              <div class="">
                <div>
                  <div
                    :class="
                      `title-content text-center ${
                        !presensi ? 'text-danger' : 'text-success'
                      }`
                    "
                  >
                    {{
                      !presensi
                        ? "Anda belum melakukan " +
                          (!masuk ? "Presensi Masuk dan " : "") +
                          (!keluar ? "Presensi Keluar" : "") +
                          "!"
                        : "Terima kasih telah melakukan presensi hari ini."
                    }}
                  </div>
                  <!-- <div class="sub-content text-center">
                  Anda belum melakukan Presensi Masuk!
                </div> -->
                  <div class="third-content text-center mb-4">
                    *Ambil gambar setengah badan Anda untuk melakukan Presensi
                    secara online!
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div
                      :class="`card ${masuk ? 'success' : ''} p-3 mb-sm-0 mb-3`"
                    >
                      <div
                        class="d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <div class="presensi-title">Presensi Masuk</div>
                          <div class="presensi-subtitle text-success">
                            {{ masuk ? masuk : "--:--:--" }}
                          </div>
                        </div>
                        <button
                          type="button"
                          :class="
                            `btn ${masuk ? 'btn-secondary' : 'btn-success'}`
                          "
                          data-toggle="modal"
                          data-backdrop="static"
                          data-keyboard="false"
                          @click="openModalPresensi('masuk')"
                          :disabled="masuk"
                        >
                          Masuk
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div :class="`card ${keluar ? 'danger' : ''} p-3 mb-0`">
                      <div
                        class="d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <div class="presensi-title">Presensi Keluar</div>
                          <div class="presensi-subtitle text-danger">
                            {{ keluar ? keluar : "--:--:--" }}
                          </div>
                        </div>
                        <button
                          type="button"
                          :class="
                            `btn ${
                              (keluar && masuk) || !masuk
                                ? 'btn-secondary'
                                : 'btn-danger'
                            }`
                          "
                          data-toggle="modal"
                          data-backdrop="static"
                          data-keyboard="false"
                          @click="openModalPresensi('keluar')"
                          :disabled="(keluar && masuk) || !masuk"
                        >
                          Keluar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card-shadow warning mb-3"
            v-else-if="userData.data.face_recognition == 0"
          >
            <div class="p-3">
              <div
                class="d-flex flex-md-row flex-column justify-content-md-between align-items-md-center align-items-start"
              >
                <div>
                  <div class="title-content text-danger">Verifikasi Wajah</div>
                  <div class="sub-content mb-4">
                    Anda wajib melakukan verifikasi wajah sebelum melakukan
                    presensi!
                  </div>
                  <div class="third-content">
                    *Ambil gambar setengah badan Anda untuk melakukan Presensi
                    secara online!
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-primary mt-3 mt-md-0"
                  data-toggle="modal"
                  data-backdrop="static"
                  data-keyboard="false"
                  @click="openModalLearning('learning')"
                >
                  Verifikasi
                </button>
              </div>
            </div>
          </div>

          <!-- <div class="card-shadow success mb-3" v-else-if="presensi">
            <div class="p-3">
              <div class="title-content text-success">Presensi Diterima</div>
              <div class="sub-content">
                Terima kasih, anda telah melakukan presensi hari ini.
              </div>
            </div>
          </div> -->
        </div>
        <div class="card-shadow mb-3">
          <div class="p-3">
            <Loader
              text="Sedang memuat data tugas tiap mahasiswa."
              v-if="!dataLogPresensi"
            />
            <div class="table-responsive" v-else>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">FOTO WAJAH</th>
                    <th scope="col">TANGGAL</th>
                    <th scope="col">JAM</th>
                    <th scope="col">LOKASI</th>
                    <th scope="col">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="align-middle"
                    v-for="(item, id) in dataLogPresensi.data"
                    :key="id"
                  >
                    <td>
                      <div>
                        <div class="d-flex align-items-center">
                          <div
                            class="image-presensi d-flex align-items-center justify-content-center"
                          >
                            <img :src="item.foto" alt="" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {{ formatDate(item.created_at.split(" ")[0]) }}
                    </td>
                    <td>
                      {{ item.created_at.split(" ")[1] }}
                    </td>
                    <td>
                      {{ item.alamat }}
                    </td>
                    <td>
                      <div
                        :class="
                          `badge-custom ${
                            item.jenis == 'masuk'
                              ? 'success text-success'
                              : 'danger text-danger'
                          } text-capitalize`
                        "
                      >
                        {{ item.jenis }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination :data="dataLogPresensi" ammount="presensi" :function="navigation" />
          </div>
        </div>
        <Footer />
      </div>
    </div>

    <div
      class="modal fade"
      id="presensiModal"
      tabindex="-1"
      no-close-on-backdrop
      no-close-on-keyboard
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body" id="widthModal">
            <div class="d-flex justify-content-between mb-4">
              <div>
                <h5 class="modal-title text-capitalize" id="exampleModalLabel">
                  Presensi {{ menuPresensi }}
                </h5>
                <div
                  class="d-flex align-items-center mt-2"
                  style="opacity: .7;"
                >
                  <i
                    class="fas fa-map-marked-alt me-2"
                    style="font-size: 20px;"
                  ></i
                  ><span id="location">Sedang memuat</span>
                </div>
              </div>
              <button
                type="button"
                class="btn-close position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              class="p-3 warning mb-3 d-flex align-items-center"
              style="border-radius: 7px;"
            >
              <i
                class="fas fa-exclamation-circle text-danger me-2"
                style="font-size: 26px;"
              ></i>
              <span style="font-size: 16px;">
                Pastikan anda berada di ruangan yang terang dan wajah di layar
                tertampil jelas.
              </span>
            </div>
            <div class="w-100 position-relative">
              <!-- <canvas id="canvasDraw"></canvas> -->
              <div
                v-if="statusCounter || rePresensi"
                :class="
                  `status-video ${
                    submitPresensi && successPresensi ? 'success' : 'ongoing'
                  } animate__animated animate__fadeIn animate__fast`
                "
              >
                <div v-if="counterPresensi < 4 && !rePresensi">
                  Tahan posisi anda, anda akan difoto dalam hitungan ke-3!
                </div>
                <div
                  class="fw-bold"
                  style="font-size: 24px"
                  v-if="counterPresensi < 7 && !successPresensi && !rePresensi"
                >
                  {{
                    counterPresensi > 3
                      ? "Foto didapatkan dan mengirim data."
                      : counterPresensi
                  }}
                </div>
                <div class="fw-bold" style="font-size: 24px" v-if="rePresensi">
                  Presensi Gagal! <br />
                  Wajah anda tidak dikenali
                </div>
                <div
                  class="fw-bold"
                  style="font-size: 24px"
                  v-if="submitPresensi && successPresensi"
                >
                  Presensi Berhasil
                </div>
              </div>
              <video
                id="webcamPresensi"
                autoplay
                playsinline
                height="100"
                :onloadedmetadata="onPlay(this)"
              ></video>
              <canvas id="canvasPresensi" class="d-none"></canvas>
              <audio
                id="snapSoundPresensi"
                src="audio/snap.wav"
                preload="auto"
              ></audio>
            </div>
            <div class="d-flex justify-content-center mt-4">
              <button
                type="button"
                :class="
                  `btn ${statusCounter ? 'btn-secondary' : 'btn-primary'}`
                "
                @click="doPresensi"
                :disabled="statusCounter"
              >
                Ambil Presensi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="learningModal"
      tabindex="-1"
      no-close-on-backdrop
      no-close-on-keyboard
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body" id="widthModal">
            <div class="d-flex justify-content-between mb-4">
              <h5 class="modal-title" id="exampleModalLabel">
                Verifikasi
                {{ menuLearning == "relearning" ? "Ulang" : "" }} Wajah
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              class="p-3 warning mb-3 d-flex align-items-center"
              style="border-radius: 7px;"
            >
              <i
                class="fas fa-exclamation-circle text-danger me-2"
                style="font-size: 26px;"
              ></i>
              <span style="font-size: 16px;">
                Pastikan anda berada di ruangan yang terang dan wajah di layar
                tertampil jelas.
              </span>
            </div>
            <div class="w-100 position-relative">
              <div
                v-if="statusCounter"
                :class="
                  `status-video ${
                    submitLearning && successLearning ? 'success' : 'ongoing'
                  } animate__animated animate__fadeIn animate__fast`
                "
              >
                <div v-if="counterLearning < 11">
                  Tahan posisi anda selama 10 detik!
                </div>
                <div
                  class="fw-bold"
                  style="font-size: 24px"
                  v-if="counterLearning < 13 && !successLearning"
                >
                  {{
                    counterLearning > 10
                      ? "Sedang Mengirim Data."
                      : counterLearning
                  }}
                </div>
                <div
                  class="fw-bold"
                  style="font-size: 24px"
                  v-if="submitLearning && successLearning"
                >
                  Data Berhasil Dikirim
                </div>
              </div>
              <video
                id="webcamLearning"
                autoplay
                playsinline
                height="100"
              ></video>
              <canvas id="canvasLearning" class="d-none"></canvas>
              <audio
                id="snapSoundLearning"
                src="audio/snap.wav"
                preload="auto"
              ></audio>
            </div>
            <div class="d-flex justify-content-center mt-4">
              <button
                type="button"
                class="btn btn-primary"
                @click="doLearning"
                v-if="counterLearning == 0 && !statusCounter"
              >
                Verifikasi Wajah
              </button>
              <button type="button" class="btn btn-secondary" disabled v-else>
                Dalam Proses Verifikasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import Webcam from "webcam-easy";
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
      dataLogPresensi: null,
      masuk: null,
      keluar: null,
      widthModal: null,
      presensi: false,
      rePresensi: false,
      loadedPresensi: false,
      learning: false,
      location: {
        long: null,
        lat: null,
      },
      camPresensi: {
        webcamElement: null,
        canvasElement: null,
        snapSoundElement: null,
        webcam: null,
      },
      camLearning: {
        webcamElement: null,
        canvasElement: null,
        snapSoundElement: null,
        webcam: null,
      },
      address: null,
      counterLearning: 0,
      counterPresensi: 0,
      statusCounter: false,
      submitLearning: false,
      submitPresensi: false,
      successLearning: false,
      successPresensi: false,
      menuLearning: null,
      menuPresensi: null,
    };
  },
  methods: {
    navigation(url) {
      if (url) {
        this.dataLogPresensi = null;

        axios
          .get(url, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            this.dataLogPresensi = res.data.data;

            $(document).ready(function() {
              $(".table").DataTable({
                pageLength: 25,
                ordering: false,
                paging: false,
                info: false,
              });
            });
          })
          .catch((err) => {
            console.log(err);
            // localStorage.clear();
          });
      }
    },
    onPlay() {
      // const videoEl = $('#webcamPresensi').get(0)
      // console.log(faceapi.detectSingleFace())
    },
    formatDate(date) {
      return moment(date)
        .locale("id")
        .format("DD MMMM YYYY");
    },
    getLocation(longitude, latitude) {
      var address;
      const setLocation = (address) => {
        this.address = address;
      };

      $("#location").text(address);
      var GEOCODING =
        "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&localityLanguage=id";
      $.getJSON(GEOCODING).done(function(location) {
        console.log(location);
        address =
          location.localityInfo.administrative[3].name +
          ", " +
          location.localityInfo.administrative[2].name +
          ", " +
          location.localityInfo.administrative[1].name;

        $("#location").text(address);

        setLocation(address);
      });

      console.log(this.address);
    },
    openModalPresensi(status) {
      this.menuPresensi = status;
      $("#presensiModal").modal("show");

      this.camPresensi.webcam
        .start()
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });

      const dataLocation = (position) => {
        this.location.long = position.coords.longitude;
        this.location.lat = position.coords.latitude;

        this.getLocation(position.coords.longitude, position.coords.latitude);

        console.log(this.location);
      };

      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          dataLocation,
          console.log
        );
        console.log("Ambil lokasi berhasil");
      } else {
        alert("Ambil lokasi gagal");
      }
    },

    openModalLearning(status) {
      this.menuLearning = status;
      $("#learningModal").modal("show");

      this.camLearning.webcam
        .start()
        .then((result) => {
          console.log("webcam started");
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    doPresensi() {
      this.statusCounter = true;
      this.rePresensi = false;

      var picture = null;

      // ===============================
      // Crop gambar, jangan dihapus!!!
      // ===============================

      // picture = this.camPresensi.webcam.snap();

      // const test =
      //   "https://images.unsplash.com/photo-1626565244076-18b0e7676aa9?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

      // var img = new Image();
      // img.src = picture;
      // img.crossOrigin = "Anonymous";

      // var options = {
      //   width: 200,
      //   height: 200,
      //   debug: true,
      // };

      // img.onload = function() {
      //   smartcrop.crop(img, options, function(result) {
      //     console.log(result);
      //     console.log("submit");

      //     var crop = result.topCrop;
      //     console.log(options);

      //     const canvas = document.getElementById("canvasDraw");
      //     console.log(canvas);
      //     const ctx = canvas.getContext("2d");
      //     ctx.drawImage(
      //       img,
      //       crop.x,
      //       crop.y,
      //       crop.width,
      //       crop.height,
      //       0,
      //       0,
      //       options.width,
      //       options.height
      //     );
      //   });
      // };

      // ===============================
      // Crop gambar, jangan dihapus!!!
      // ===============================

      const interval = setInterval(() => {
        if (this.counterPresensi < 4) {
          this.counterPresensi++;
        }

        if (this.counterPresensi == 4) {
          picture = this.camPresensi.webcam.snap();
          this.counterPresensi++;
          console.log(picture);
        }

        if (this.counterPresensi == 5) {
          this.counterPresensi++;
          this.submitPresensi = true;

          if (this.menuPresensi == "masuk") {
            axios
              .post(
                `${this.url}presensi/mahasiswa/masuk`,
                {
                  alamat: this.address,
                  long: this.location.long,
                  lat: this.location.lat,
                  foto: picture.split(",")[1],
                  media: "web",
                },
                {
                  headers: {
                    Authorization: localStorage.token,
                  },
                }
              )
              .then((res) => {
                console.log(res);
                if (res.data.face_recognition.success) {
                  this.successPresensi = true;
                  setTimeout(() => {
                    location.reload();
                  }, 2000);
                } else {
                  this.rePresensi = true;
                  this.counterPresensi = 0;
                  this.submitPresensi = false;
                  this.statusCounter = false;
                  clearInterval(interval);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.menuPresensi == "keluar") {
            axios
              .post(
                `${this.url}presensi/mahasiswa/keluar`,
                {
                  alamat: this.address,
                  long: this.location.long,
                  lat: this.location.lat,
                  foto: picture.split(",")[1],
                  media: "web",
                },
                {
                  headers: {
                    Authorization: localStorage.token,
                  },
                }
              )
              .then((res) => {
                console.log(res);
                if (res.data.face_recognition.success) {
                  this.successPresensi = true;
                  setTimeout(() => {
                    location.reload();
                  }, 2000);
                } else {
                  this.rePresensi = true;
                  this.counterPresensi = 0;
                  this.submitPresensi = false;
                  this.statusCounter = false;
                  clearInterval(interval);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      }, 1000);
    },

    doLearning() {
      this.statusCounter = true;
      let arr = [];
      var picture1 = null;
      var picture2 = null;
      var picture3 = null;
      var picture4 = null;
      var picture5 = null;

      setInterval(() => {
        if (this.counterLearning < 11) {
          this.counterLearning++;
        }

        if (this.counterLearning == 2) {
          picture1 = this.camLearning.webcam.snap();
          console.log(picture1);
        }

        if (this.counterLearning == 4) {
          picture2 = this.camLearning.webcam.snap();
          console.log(picture2);
        }

        if (this.counterLearning == 6) {
          picture3 = this.camLearning.webcam.snap();
          console.log(picture3);
        }

        if (this.counterLearning == 8) {
          picture4 = this.camLearning.webcam.snap();
          console.log(picture4);
        }

        if (this.counterLearning == 10) {
          picture5 = this.camLearning.webcam.snap();
          console.log(picture5);
        }

        if (this.counterLearning == 11) {
          this.submitLearning = true;
          this.counterLearning++;

          arr = [
            picture1.split(",")[1],
            picture2.split(",")[1],
            picture3.split(",")[1],
            picture4.split(",")[1],
            picture5.split(",")[1],
          ];

          console.log(arr);

          axios
            .post(
              `${this.url}bemkm/mahasiswa/learn`,
              {
                media: "web",
                foto: arr,
              },
              {
                headers: {
                  Authorization: localStorage.token,
                },
              }
            )
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                this.successLearning = true;
                setTimeout(() => {
                  location.reload();
                }, 2000);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, 1000);
    },
  },
  mounted() {
    axios
      .get(`${this.url}presensi/mahasiswa`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        this.dataLogPresensi = res.data.data;
        console.log(res);
        setTimeout(() => {
          $(".table").DataTable({
            responsive: true,
            ordering: false,
            paging: false,
            info: false,
          });
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${this.url}presensi/mahasiswa/hari-ini`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        console.log("Hari ini");
        console.log(res.data);
        this.loadedPresensi = true;
        if (res.data.success) {
          if (res.data.data.mulai) {
            this.masuk = res.data.data.mulai.split(" ")[1];
          }

          if (res.data.data.keluar) {
            this.keluar = res.data.data.keluar.split(" ")[1];
          }

          if (res.data.data.mulai && res.data.data.keluar) {
            this.presensi = true;
          }
        } else {
          this.presensi = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    this.width = $(document).width();
    this.camPresensi.webcamElement = document.getElementById("webcamPresensi");
    this.camPresensi.canvasElement = document.getElementById("canvasPresensi");
    this.camPresensi.snapSoundElement = document.getElementById(
      "snapSoundPresensi"
    );
    this.camPresensi.webcam = new Webcam(
      this.camPresensi.webcamElement,
      "",
      this.camPresensi.canvasElement,
      this.camPresensi.snapSoundElement
    );

    this.camLearning.webcamElement = document.getElementById("webcamLearning");
    this.camLearning.canvasElement = document.getElementById("canvasLearning");
    this.camLearning.snapSoundElement = document.getElementById(
      "snapSoundLearning"
    );
    this.camLearning.webcam = new Webcam(
      this.camLearning.webcamElement,
      "",
      this.camLearning.canvasElement,
      this.camLearning.snapSoundElement
    );

    var newCamPresensi = this.camPresensi.webcam;
    var presensi = document.getElementById("presensiModal");
    presensi.addEventListener("hidden.bs.modal", function() {
      // do something...
      newCamPresensi.stop();
      $("#location").text("Sedang memuat.");
    });

    var newCamLearning = this.camLearning.webcam;
    var learning = document.getElementById("learningModal");
    learning.addEventListener("hidden.bs.modal", function() {
      // do something...
      newCamLearning.stop();
    });
  },
};
</script>
