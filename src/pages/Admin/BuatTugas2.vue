<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <a
                  :href="$router.resolve({ name: 'Atur Tugas' }).href"
                  class="btn btn-primary me-2"
                  type="button"
                >
                  <i class="fas fa-arrow-left"></i>
                </a>
                <div>
                  <div class="title-content">
                    Tambah Tugas
                  </div>
                  <div class="title-type-soal">
                    3 - Atur Bobot Soal
                  </div>
                </div>
              </div>
              <button
                :class="
                  `btn ${
                    totalBobot !== 100 || !isFilledAll
                      ? 'btn-secondary'
                      : 'btn-success'
                  }`
                "
                type="button"
                :disabled="totalBobot !== 100 || !isFilledAll"
                @click="submit"
              >
                Buat Tugas
              </button>
            </div>
          </div>
        </div>
        <div
          :class="
            `card-shadow ${
              totalBobot == 0 || totalBobot > 100
                ? 'danger text-danger'
                : totalBobot == 100 && isFilledAll
                ? 'success text-success'
                : 'warning text-warning'
            } mb-3`
          "
        >
          <div class="p-3">
            <div class="d-flex align-items-center">
              <i class="fas fa-info-circle me-2" style="font-size: 22px;"></i>
              <div style="font-size: 18px; font-weight: 500;">
                {{
                  totalBobot > 0
                    ? totalBobot > 100
                      ? "Total bobot nilai melebihi 100! (Total " +
                        totalBobot +
                        ")"
                      : totalBobot == 100
                      ? isFilledAll
                        ? "Total bobot nilai 100."
                        : "Total bobot nilai 100 namun ada bobot soal yang belum diisi!"
                      : "Total bobot nilai " +
                        totalBobot +
                        ". Sesuaikan bobot nilai hingga mencapai nilai 100"
                    : "Input bobot nilai soal yang telah anda pilih!"
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="dataSoal">
          <div
            class="col-md-4 col-sm-6"
            v-for="(item, id) in dataSoal"
            :key="id"
          >
            <div class="d-block card-shadow mb-3">
              <div class="p-3">
                <div class="mb-4" v-if="item.foto !== ''">
                  <div
                    class="img-question d-flex align-items-center justify-content-center"
                  >
                    <img
                      :src="item.foto"
                      alt=""
                      class="w-100"
                      v-if="
                        ['jpg', 'png', 'jpeg', 'gif'].includes(item.extension)
                      "
                    />
                    <a
                      :href="item.foto"
                      v-if="['mp4', 'avi'].includes(item.extension)"
                      target="_blank"
                    >
                      <i class="fas fa-video fa-5x"></i>
                    </a>
                  </div>
                </div>
                <div>
                  <div class="fw-bold">
                    Soal
                    <span class="text-capitalize">{{
                      item.tipe.toLowerCase()
                    }}</span>
                  </div>
                  <div
                    style="font-size: 16px; font-weight: 300;"
                    v-html="item.isi"
                  ></div>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center mt-5"
                >
                  <div>
                    <div
                      class="py-1 d-inline-block px-2 text-success success"
                      style="border-radius: 7px; font-weight: 500;"
                      v-if="item.kategori == 'MUDAH'"
                    >
                      Mudah
                    </div>
                    <div
                      class="py-1 d-inline-block px-2 text-warning warning"
                      style="border-radius: 7px; font-weight: 500;"
                      v-else-if="item.kategori == 'SEDANG'"
                    >
                      Sedang
                    </div>
                    <div
                      class="py-1 d-inline-block px-2 text-danger danger"
                      style="border-radius: 7px; font-weight: 500;"
                      v-else-if="item.kategori == 'SULIT'"
                    >
                      Sulit
                    </div>
                    <input
                      type="number"
                      :class="
                        `form-control ${
                          bobotSoal[id].bobot ? 'success' : ''
                        } mt-2 number-input`
                      "
                      style="width: 105px; !important; border-width: 2px;"
                      :id="`bobot${id}`"
                      @change="checkBobot(id)"
                      v-model="bobotSoal[id].bobot"
                      placeholder="Bobot Soal"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div style="opacity: .5">
                    {{ formatDate(item.created_at) }}
                  </div>
                </div>
                <hr />
                <div class="d-flex">
                  <div v-for="(tag, id) in item.tags" :key="id" class="me-2">
                    <span class="badge bg-secondary">#{{ tag }}</span>
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
import axios from "axios";
import { mapState } from "vuex";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  computed: {
    ...mapState(["url"]),
  },
  data: function() {
    return {
      width: null,
      dataGugus: null,
      dataSoal: null,
      dataTugas: null,
      bobotSoal: [],
      totalBobot: 0,
      isFilledAll: false,
    };
  },
  methods: {
    checkBobot(id) {
      var arr = [];
      var validation = 0;

      if (this.bobotSoal[id].bobot > 100) {
        this.bobotSoal[id].bobot = 100;
      } else if (this.bobotSoal[id].bobot < 0) {
        this.bobotSoal[id].bobot = 0;
      }

      for (let i = 0; i < this.bobotSoal.length; i++) {
        if (this.bobotSoal[i].bobot) {
          arr.push(parseInt(this.bobotSoal[i].bobot));
        } else {
          arr.push(0);
          validation++;
        }
      }

      this.totalBobot = arr.reduce((a, b) => a + b, 0);

      if (validation == 0) {
        this.isFilledAll = true;
      }
    },
    formatDate(date) {
      return moment(date)
        .locale("id")
        .format("DD MMM YY");
    },
    submit() {
      Swal.fire({
        title: "Apakah anda yakin untuk membuat tugas",
        text: "Periksa kembali seluruh data yang akan disimpan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0B7517",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Buat",
      }).then((result) => {
        if (result.isConfirmed) {
          var arrSoal = [];
          for (let i = 0; i < this.bobotSoal.length; i++) {
            arrSoal.push({
              id: this.bobotSoal[i].id,
              bobot: parseInt(this.bobotSoal[i].bobot),
            });
          }

          axios
            .post(
              this.url + "tugas/superadmin/tugas/",
              {
                nama: this.dataTugas.judul,
                deskripsi: this.dataTugas.deskripsi,
                mulai:
                  this.dataTugas.dateMulai + " " + this.dataTugas.timeMulai,
                selesai:
                  this.dataTugas.dateSelesai + " " + this.dataTugas.timeSelesai,
                gugus: this.dataGugus,
                soal: arrSoal,
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
                "Tugas Dikirim!",
                "Jawaban telah disimpan.",
                "success"
              ).then(() => {
                window.location.replace("/admin/tugas");
                localStorage.removeItem("tempGugus");
                localStorage.removeItem("tempSoal");
                localStorage.removeItem("tempTugas");
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
  mounted() {
    this.width = $(document).width();

    var tempGugus = JSON.parse(localStorage.tempGugus);
    var tempSoal = JSON.parse(localStorage.tempSoal);
    var tempTugas = JSON.parse(localStorage.tempTugas);

    this.dataGugus = tempGugus;
    this.dataSoal = tempSoal;
    this.dataTugas = tempTugas;

    for (let i = 0; i < this.dataSoal.length; i++) {
      this.bobotSoal.push({
        id: this.dataSoal[i].id,
        bobot: this.dataSoal[i].bobot,
      });
    }
  },
};
</script>
