<template>
  <div class="dashboard">
    <NavbarMahasiswa :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section" v-if="dataSoal">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="title-content">{{ dataSoal.tugas.nama }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-9 col-md-8">
            <div
              class="card-shadow mb-3 warning text-warning"
              v-if="loadingSend"
            >
              <div class="p-3">
                <div class="d-flex align-items-center">
                  <i
                    class="fas fa-info-circle me-2"
                    style="font-size: 22px;"
                  ></i>
                  <div style="font-size: 18px; font-weight: 500;">
                    Sedang mengirim jawaban! Mohon menunggu.
                  </div>
                </div>
              </div>
            </div>
            <div class="card-shadow mb-3">
              <div class="p-3">
                <div
                  class="d-flex align-items-start justify-content-between mb-4"
                >
                  <div>
                    <div class="title-soal">
                      Soal
                      {{ currentSoal + 1 }}
                    </div>
                    <div class="title-type-soal">
                      Tipe
                      <span class="text-capitalize">{{
                        collectSoal[currentSoal].tipe.toLowerCase()
                      }}</span>
                    </div>
                  </div>
                  <div
                    class="px-3 py-1 success text-success border-radius text-capitalize"
                    style="font-weight: 600;"
                    v-if="collectSoal[currentSoal].kategori == 'MUDAH'"
                  >
                    {{ collectSoal[currentSoal].kategori.toLowerCase() }}
                  </div>
                  <div
                    class="px-3 py-1 warning text-warning border-radius text-capitalize"
                    style="font-weight: 600;"
                    v-else-if="collectSoal[currentSoal].kategori == 'SEDANG'"
                  >
                    {{ collectSoal[currentSoal].kategori.toLowerCase() }}
                  </div>
                  <div
                    class="px-3 py-1 danger text-danger border-radius text-capitalize"
                    style="font-weight: 600;"
                    v-else-if="collectSoal[currentSoal].kategori == 'SULIT'"
                  >
                    {{ collectSoal[currentSoal].kategori.toLowerCase() }}
                  </div>
                </div>
                <div
                  class="img-soal mb-3 d-flex align-items-center justify-content-center"
                  v-if="collectSoal[currentSoal].gambar !== ''"
                >
                  <img
                    :src="collectSoal[currentSoal].gambar"
                    alt=""
                    class="w-100"
                    v-if="
                      ['jpg', 'png', 'jpeg', 'gif'].includes(
                        collectSoal[currentSoal].extension
                      )
                    "
                  />
                  <video
                    controls
                    v-if="
                      ['mp4', 'avi'].includes(
                        collectSoal[currentSoal].extension
                      )
                    "
                    style="width: 100%;"
                  >
                    <source
                      :src="collectSoal[currentSoal].gambar"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div
                  style="font-size: 16px;"
                  v-html="collectSoal[currentSoal].isi"
                ></div>
                <div
                  class="mt-4"
                  v-if="collectSoal[currentSoal].tipe == 'PILIHAN GANDA'"
                >
                  <div
                    class="d-flex align-items-center mb-3"
                    v-for="(item, id) in collectSoal[currentSoal].kuncijawaban"
                    :key="id"
                  >
                    <div class="me-2">
                      <label
                        :class="
                          `btn ${
                            collectSoal[currentSoal].kuncijawaban_id ==
                            item.uuid
                              ? 'btn-primary'
                              : 'btn-outline-primary'
                          } mb-0 text-uppercase text-center`
                        "
                        style="border-radius: 100px !important; min-width: 38px; max-width: 38px;"
                        :for="`jawaban${id}`"
                        >{{ dataLetter[id] }}</label
                      >
                      <input
                        type="radio"
                        :value="item.uuid"
                        :id="`jawaban${id}`"
                        class="d-none"
                        v-model="collectSoal[currentSoal].kuncijawaban_id"
                      />
                    </div>
                    <label
                      :for="`jawaban${id}`"
                      :class="
                        `${
                          collectSoal[currentSoal].kuncijawaban_id == item.uuid
                            ? 'text-primary fw-normal'
                            : ''
                        } mb-0 cursor-pointer px-1 py-2`
                      "
                      style="font-size: 16px; font-weight: 300;"
                    >
                      {{ item.jawaban }}
                    </label>
                  </div>
                </div>
                <div
                  :class="
                    `${
                      collectSoal[currentSoal].tipe == 'ESSAI'
                        ? 'd-block'
                        : 'd-none'
                    } mt-4`
                  "
                >
                  <textarea id="jawaban" class="d-none"></textarea>
                </div>
                <div
                  :class="
                    `${
                      collectSoal[currentSoal].tipe == 'UPLOAD'
                        ? 'd-block'
                        : 'd-none'
                    } mt-4`
                  "
                  style="max-width: 500px;"
                >
                  <div
                    v-for="(items, id) in dataSoal.tipe_soal.upload.soal"
                    :key="id"
                  >
                    <div
                      :class="
                        `${
                          id +
                            dataSoal.tipe_soal.pilihan_ganda.jumlah +
                            dataSoal.tipe_soal.essai.jumlah ==
                          currentSoal
                            ? 'd-block'
                            : 'd-none'
                        }`
                      "
                    >
                      <div
                        class="d-inline-block px-3 py-1 primary mb-2"
                        style="border-radius: 50px;"
                        v-if="collectSoal[currentSoal].nama_file"
                      >
                        <div class="d-flex align-items-center">
                          <div>
                            File saat ini:
                            <span
                              class="text-primary"
                              style="font-weight: 500;"
                              >{{ collectSoal[currentSoal].nama_file }}</span
                            >
                          </div>
                        </div>
                      </div>
                      <input
                        type="file"
                        :id="`gambar${id}`"
                        class="dropify"
                        data-max-file-size="10M"
                        data-allowed-file-extensions="jpeg jpg png docx doc txt pdf xlsx mp4 mpeg mov"
                        @change="cekUpload('gambar' + id)"
                      />
                      <div class="mt-3 p-3 border-radius warning">
                        <div
                          class="fw-bold mb-2"
                          style="opacity: .7; font-size: 16px;"
                        >
                          Perhatian!
                        </div>
                        <ol class="ps-3 mb-0" style="opacity: .7">
                          <li>
                            Ukuran file yang akan diupload maksimal
                            <b>10 Mb</b>.
                          </li>
                          <li>
                            Fileyang boleh diupload hanya berupa
                            <b>gambar (.jpeg, .jpg, .png)</b>,
                            <b>dokumen (.docx, .doc, .txt, .pdf, .xlsx)</b>, dan
                            <b>video (.mp4, .mpeg, .mov)</b>.
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="d-flex flex-column flex-md-row justify-content-between pt-5"
                  v-if="!loadingSend"
                >
                  <button
                    class="btn btn-secondary px-4 mb-3 mb-md-0"
                    type="button"
                    @click="
                      previousSoal(currentSoal, collectSoal[currentSoal].tipe)
                    "
                    :disabled="currentSoal == 0"
                  >
                    Sebelumnya
                  </button>
                  <button
                    class="btn btn-success px-4"
                    type="button"
                    @click="
                      submitSoal(
                        dataSoal.tugas.uuid,
                        currentSoal,
                        collectSoal[currentSoal].tipe
                      )
                    "
                    v-if="currentSoal + 1 == collectSoal.length"
                  >
                    Selesai
                  </button>
                  <button
                    class="btn btn-primary px-4"
                    type="button"
                    @click="
                      nextSoal(currentSoal, collectSoal[currentSoal].tipe)
                    "
                    v-else
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-4">
            <div class="card-shadow bg-count mb-3">
              <div class="p-3">
                <div
                  v-if="
                    countdown.days !== null &&
                      countdown.hours !== null &&
                      countdown.minutes !== null &&
                      countdown.seconds !== null
                  "
                  class="countdown text-white pb-3"
                >
                  <span class="count day">{{
                    countdown.days > 9 ? countdown.days : "0" + countdown.days
                  }}</span>
                  :
                  <span class="count hour">{{
                    countdown.hours > 9
                      ? countdown.hours
                      : "0" + countdown.hours
                  }}</span>
                  :
                  <span class="count minute">{{
                    countdown.minutes > 9
                      ? countdown.minutes
                      : "0" + countdown.minutes
                  }}</span>
                  :
                  <span class="count second"
                    >{{
                      countdown.seconds > 9
                        ? countdown.seconds
                        : "0" + countdown.seconds
                    }}
                  </span>
                </div>
                <div
                  v-else
                  class="text-center text-white py-3 fw-bold"
                  style="font-size: 20px;"
                >
                  Sedang Memuat.
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
import Swal from "sweetalert2";

export default {
  computed: {
    ...mapState(["url"]),
  },
  data: function() {
    return {
      width: null,
      dataSoal: null,
      jawaban: null,
      type: "Pilihan Ganda",
      currentSoal: 0,
      dataLetter: [],
      collectSoal: [],
      loadingSend: false,
      countdown: {
        days: null,
        hours: null,
        minutes: null,
        seconds: null,
      },
    };
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log("player play!", player);
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    // ...player event
    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
    },
    // player is ready
    playerReadied(player) {
      console.log("the player is readied", player);
      // you can use it to do something...
      // player.[methods]
    },
    cekUpload(id) {
      if (document.getElementById(id).files[0]) {
        this.uploadGambar(document.getElementById(id).files[0], id);
      } else {
        this.collectSoal[this.currentSoal].file = null;
      }
    },
    uploadGambar(selector, id) {
      var reader = new FileReader();
      reader.onload = (e) => {
        // console.log(e)
        this.collectSoal[this.currentSoal].file = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };

      const name = $("#" + id).val();
      const lastDot = name.lastIndexOf(".");

      const ext = name.substring(lastDot + 1);

      this.collectSoal[this.currentSoal].ekstensi = ext;
      this.collectSoal[this.currentSoal].nama_file = $("#" + id)
        .val()
        .split("\\")[2];

      console.log(this.collectSoal[this.currentSoal].file);

      reader.readAsDataURL(selector);
    },
    deleteFile() {
      this.collectSoal[this.currentSoal].file = "";
      this.collectSoal[this.currentSoal].nama_file = null;
    },
    nextSoal(idClicked, typeClicked) {
      this.currentSoal++;

      localStorage.removeItem("tempSoal");
      var array = JSON.stringify(this.collectSoal);
      localStorage.tempSoal = array;

      if (typeClicked == "ESSAI") {
        // eslint-disable-next-line
        var getText = tinymce.get("jawaban").getContent();
        this.collectSoal[idClicked].jawaban = getText;
      }

      if (this.collectSoal[this.currentSoal].tipe == "ESSAI") {
        // eslint-disable-next-line
        tinyMCE
          .get("jawaban")
          .setContent(this.collectSoal[this.currentSoal].jawaban);
      }
    },
    previousSoal(idClicked, typeClicked) {
      this.currentSoal--;

      localStorage.removeItem("tempSoal");
      var array = JSON.stringify(this.collectSoal);
      localStorage.tempSoal = array;

      if (typeClicked == "ESSAI") {
        // eslint-disable-next-line
        var getText = tinymce.get("jawaban").getContent();
        this.collectSoal[idClicked].jawaban = getText;
      }

      if (this.collectSoal[this.currentSoal].tipe == "ESSAI") {
        // eslint-disable-next-line
        tinyMCE
          .get("jawaban")
          .setContent(this.collectSoal[this.currentSoal].jawaban);
      }
    },
    submitSoal(id, idClicked, typeClicked) {
      if (typeClicked == "ESSAI") {
        // eslint-disable-next-line
        var getText = tinymce.get("jawaban").getContent();
        this.collectSoal[idClicked].jawaban = getText;
      }

      Swal.fire({
        title: "Apakah anda yakin untuk menyelesaikan tugas?",
        text:
          "Anda tidak dapat mengerjakan kembali tugas ini setelah diselesaikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0B7517",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Simpan Jawaban",
      }).then((result) => {
        if (result.isConfirmed) {
          this.loadingSend = true;
          axios
            .post(
              this.url + "tugas/mahasiswa/serahkan/" + id,
              {
                jawaban: this.collectSoal,
              },
              {
                headers: {
                  Authorization: localStorage.token,
                },
              }
            )
            .then((res) => {
              console.log(res);
              this.loadingSend = false;

              if (res.data.success) {
                Swal.fire(
                  "Tugas Dikirim!",
                  "Jawaban telah disimpan.",
                  "success"
                ).then(() => {
                  window.location.replace("/dashboard/tugas");
                  localStorage.removeItem("tempSoal");
                });
              } else {
                Swal.fire("Tugas Gagal Dikirim!", res.data.message, "warning");
              }
            })
            .catch((err) => {
              this.loadingSend = false;
              console.log(err);
            });
        }
      });
    },
  },
  mounted() {
    this.width = $(document).width();
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    this.dataLetter = alphabet;
    var countEditor = 0;

    const contentIsi = () => {
      this.collectSoal[this.currentSoal].file = "";
      this.collectSoal[this.currentSoal].nama_file = null;
    };

    const setTimer = (days, hours, minutes, seconds, duration) => {
      if (duration > 0) {
        this.countdown.days = days;
        this.countdown.hours = hours;
        this.countdown.minutes = minutes;
        this.countdown.seconds = seconds;
      }
    };

    var editorInterval = setInterval(() => {
      countEditor++;
      // eslint-disable-next-line
      tinymce.init({
        selector: "#jawaban",
        menubar: false,
        min_height: 250,
      });

      if (countEditor == 5) {
        clearInterval(editorInterval);
      }
    }, 1000);

    setTimeout(() => {
      const dropify = $(".dropify").dropify({
        messages: {
          default: "Unggah jawaban anda",
          replace: "Timpa dan upload jawaban",
          remove: "Hapus",
          error: "Ooops, telah terjadi kesalahan.",
        },
        error: {
          fileSize: "Ukuran file terlalu besar, maksimal {{ value }}b.",
          imageFormat: "File yg diupload hanya boleh berupa ({{ value }}).",
        },
      });

      dropify.on("dropify.afterClear", function() {
        contentIsi();
      });
      dropify.on("dropify.errors", function() {
        contentIsi();
      });
    }, 500);

    axios
      .get(this.url + "tugas/mahasiswa/kerjakan/" + this.$route.params.id, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        this.dataSoal = res.data.data;
        var duration = this.dataSoal.tugas.sisa_waktu;

        var x = setInterval(() => {
          --duration;
          var days = Math.floor(duration / 24 / 60 / 60);
          var hoursLeft = Math.floor(duration - days * 86400);
          var hours = Math.floor(hoursLeft / 3600);
          var minutesLeft = Math.floor(hoursLeft - hours * 3600);
          var minutes = Math.floor(minutesLeft / 60);
          var remainingSeconds = duration % 60;

          setTimer(days, hours, minutes, remainingSeconds, duration);

          // If the count down is over, write some text
          if (duration < 0) {
            clearInterval(x);
            axios
              .post(
                this.url +
                  "tugas/mahasiswa/serahkan/" +
                  this.dataSoal.tugas.uuid,
                {
                  jawaban: this.collectSoal,
                },
                {
                  headers: {
                    Authorization: localStorage.token,
                  },
                }
              )
              .then((res) => {
                console.log(res);
                Swal.fire(
                  "Waktu Habis!",
                  "Jawaban telah disimpan dan dikirim.",
                  "success"
                ).then(() => {
                  window.location.replace("/dashboard/tugas");
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }, 1000);

        console.log(res);

        if (localStorage.tempSoal) {
          var tempSoal = JSON.parse(localStorage.tempSoal);
          if (tempSoal[0].tugas_id == this.dataSoal.tugas.uuid) {
            this.collectSoal = tempSoal;
          } else {
            for (
              let i = 0;
              i < this.dataSoal.tipe_soal.pilihan_ganda.jumlah;
              i++
            ) {
              this.collectSoal.push({
                soal_id: this.dataSoal.tipe_soal.pilihan_ganda.soal[i].uuid,
                tipe: this.dataSoal.tipe_soal.pilihan_ganda.soal[i].tipe,
                extension: this.dataSoal.tipe_soal.pilihan_ganda.soal[i]
                  .extension,
                kuncijawaban_id: "",
                jawaban: "",
                file: "",
                ekstensi: "",
                nama_file: null,
                isi: this.dataSoal.tipe_soal.pilihan_ganda.soal[i].isi,
                kuncijawaban: this.dataSoal.tipe_soal.pilihan_ganda.soal[i]
                  .kuncijawaban,
                kategori: this.dataSoal.tipe_soal.pilihan_ganda.soal[i]
                  .kategori,
                gambar: this.dataSoal.tipe_soal.pilihan_ganda.soal[i].foto,
                tugas_id: this.dataSoal.tugas.uuid,
              });
            }

            for (let i = 0; i < this.dataSoal.tipe_soal.essai.jumlah; i++) {
              this.collectSoal.push({
                soal_id: this.dataSoal.tipe_soal.essai.soal[i].uuid,
                tipe: this.dataSoal.tipe_soal.essai.soal[i].tipe,
                extension: this.dataSoal.tipe_soal.essai.soal[i].extension,
                kuncijawaban_id: "",
                jawaban: "",
                file: "",
                ekstensi: "",
                nama_file: null,
                isi: this.dataSoal.tipe_soal.essai.soal[i].isi,
                kuncijawaban: null,
                kategori: this.dataSoal.tipe_soal.essai.soal[i].kategori,
                gambar: this.dataSoal.tipe_soal.essai.soal[i].foto,
                tugas_id: this.dataSoal.tugas.uuid,
              });
            }

            for (let i = 0; i < this.dataSoal.tipe_soal.upload.jumlah; i++) {
              this.collectSoal.push({
                soal_id: this.dataSoal.tipe_soal.upload.soal[i].uuid,
                tipe: this.dataSoal.tipe_soal.upload.soal[i].tipe,
                extension: this.dataSoal.tipe_soal.upload.soal[i].extension,
                kuncijawaban_id: "",
                jawaban: "",
                file: "",
                ekstensi: "",
                nama_file: null,
                isi: this.dataSoal.tipe_soal.upload.soal[i].isi,
                kuncijawaban: null,
                kategori: this.dataSoal.tipe_soal.upload.soal[i].kategori,
                gambar: this.dataSoal.tipe_soal.upload.soal[i].foto,
                tugas_id: this.dataSoal.tugas.uuid,
              });
            }
          }
        } else {
          for (
            let i = 0;
            i < this.dataSoal.tipe_soal.pilihan_ganda.jumlah;
            i++
          ) {
            this.collectSoal.push({
              soal_id: this.dataSoal.tipe_soal.pilihan_ganda.soal[i].uuid,
              tipe: this.dataSoal.tipe_soal.pilihan_ganda.soal[i].tipe,
              extension: this.dataSoal.tipe_soal.pilihan_ganda.soal[i]
                .extension,
              kuncijawaban_id: "",
              jawaban: "",
              file: "",
              ekstensi: "",
              nama_file: null,
              isi: this.dataSoal.tipe_soal.pilihan_ganda.soal[i].isi,
              kuncijawaban: this.dataSoal.tipe_soal.pilihan_ganda.soal[i]
                .kuncijawaban,
              kategori: this.dataSoal.tipe_soal.pilihan_ganda.soal[i].kategori,
              gambar: this.dataSoal.tipe_soal.pilihan_ganda.soal[i].foto,
              tugas_id: this.dataSoal.tugas.uuid,
            });
          }

          for (let i = 0; i < this.dataSoal.tipe_soal.essai.jumlah; i++) {
            this.collectSoal.push({
              soal_id: this.dataSoal.tipe_soal.essai.soal[i].uuid,
              tipe: this.dataSoal.tipe_soal.essai.soal[i].tipe,
              extension: this.dataSoal.tipe_soal.essai.soal[i].extension,
              kuncijawaban_id: "",
              jawaban: "",
              file: "",
              ekstensi: "",
              nama_file: null,
              isi: this.dataSoal.tipe_soal.essai.soal[i].isi,
              kuncijawaban: null,
              kategori: this.dataSoal.tipe_soal.essai.soal[i].kategori,
              gambar: this.dataSoal.tipe_soal.essai.soal[i].foto,
              tugas_id: this.dataSoal.tugas.uuid,
            });
          }

          for (let i = 0; i < this.dataSoal.tipe_soal.upload.jumlah; i++) {
            this.collectSoal.push({
              soal_id: this.dataSoal.tipe_soal.upload.soal[i].uuid,
              tipe: this.dataSoal.tipe_soal.upload.soal[i].tipe,
              extension: this.dataSoal.tipe_soal.upload.soal[i].extension,
              kuncijawaban_id: "",
              jawaban: "",
              file: "",
              ekstensi: "",
              nama_file: null,
              isi: this.dataSoal.tipe_soal.upload.soal[i].isi,
              kuncijawaban: null,
              kategori: this.dataSoal.tipe_soal.upload.soal[i].kategori,
              gambar: this.dataSoal.tipe_soal.upload.soal[i].foto,
              tugas_id: this.dataSoal.tugas.uuid,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    $(document).ready(function() {});
  },
};
</script>
