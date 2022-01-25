<template>
  <div class="dashboard penilaian">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`" v-if="dataTugas">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <router-link
                  :to="{
                    name: 'Penilaian Tugas',
                    params: {
                      name: $route.params.name_gugus,
                      id: $route.params.id_gugus,
                    },
                  }"
                  class="btn btn-primary me-2"
                  type="button"
                >
                  <i class="fas fa-arrow-left"></i>
                </router-link>
                <div>
                  <div class="title-content">
                    Penilaian
                  </div>
                  <div class="title-type-soal">
                    {{ $route.params.name_tugas }}
                  </div>
                </div>
              </div>
              <div
                :class="
                  `me-2 px-3 py-2 ${
                    countMahasiswa == dataTugas.data.length
                      ? 'primary text-primary'
                      : 'danger text-danger'
                  } border-radius d-inline-block`
                "
                style="font-weight: 600; font-size: 16px;"
              >
                {{
                  countMahasiswa == dataTugas.data.length
                    ? "Tugas telah dinilai"
                    : countMahasiswa +
                      "/" +
                      dataTugas.data.length +
                      " telah dinilai"
                }}
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-4">
                <select
                  class="form-select"
                  aria-label="Filter"
                  name="filter"
                  v-model="filter"
                  @change="selectFilter($event)"
                >
                  <option value="" selected>Filter</option>
                  <option value="1">Sudah dinilai</option>
                  <option value="2">Belum dinilai</option>
                  <option value="3">Sudah dikerjakan</option>
                  <option value="4">Belum dikerjakan</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="card-shadow" v-if="!dataTugas">
          <div class="p-3">
            <Loader text="Sedang memuat data tugas mahasiswa." />
          </div>
        </div>
        <div v-for="(items, id) in dataTugas.data" :key="id">
          <div class="card-shadow mb-3" v-if="!items.dikerjakan">
            <div class="p-3">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div
                    class="image d-md-flex d-none align-items-center justify-content-center"
                  >
                    <img
                      src="../../assets/ilustrasi/avatar-admin-pemandu.svg"
                      alt=""
                      v-if="items.foto == '' || items.foto == 'foto.jpg'"
                    />
                    <img :src="items.foto" v-else alt="" />
                  </div>
                  <div class="ms-2">
                    <div class="main-text">{{ items.nama }}</div>
                    <div class="sub-text">{{ items.nim }}</div>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div
                    class="py-1 px-2 text-danger danger d-inline-block"
                    style="border-radius: 7px; font-weight: 500;"
                  >
                    Belum Dikerjakan
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-shadow mb-3" v-else>
            <div
              class="p-3 collapsed"
              data-bs-toggle="collapse"
              :href="`#nilai${id}`"
              role="button"
              aria-expanded="false"
              :aria-controls="`nilai${id}`"
            >
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div
                    class="image d-md-flex d-none align-items-center justify-content-center"
                  >
                    <img :src="items.foto" alt="" />
                  </div>
                  <div class="ms-2">
                    <div class="main-text">{{ items.nama }}</div>
                    <div class="sub-text">{{ items.nim }}</div>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div
                    class="py-1 px-2 text-success success"
                    style="border-radius: 7px; font-weight: 500;"
                    v-if="items.nilai || items.nilai == 0"
                  >
                    Dinilai
                  </div>
                  <div
                    class="py-1 px-2 text-warning warning"
                    style="border-radius: 7px; font-weight: 500;"
                    v-else
                  >
                    Belum Dinilai
                  </div>
                  <i class="fas fa-chevron-right ms-3"></i>
                </div>
              </div>
            </div>
            <div class="collapse" :id="`nilai${id}`">
              <div class="soal-section p-3">
                <div v-if="items.soal_pg.length > 0">
                  <div
                    class="mb-5"
                    v-for="(soalPG, idPG) in items.soal_pg"
                    :key="soalPG.isi + idPG"
                  >
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="d-flex align-items-center">
                        <div
                          class="number-soal primary text-primary d-flex align-items-center justify-content-center"
                        >
                          {{ idPG + 1 }}
                        </div>
                        <div class="type-soal">Soal Pilihan Ganda</div>
                      </div>
                      <div
                        :class="
                          `py-1 px-2 ${
                            soalPG.data_jawaban.benar == 1
                              ? 'text-success success'
                              : 'text-danger danger'
                          }`
                        "
                        style="border-radius: 7px; font-weight: 500;"
                      >
                        {{
                          total[id].nilai[idPG].nilai
                            ? total[id].nilai[idPG].nilai
                            : 0
                        }}
                        / {{ soalPG.bobot }}
                      </div>
                    </div>
                    <div style="padding-left: 40px;">
                      <div v-if="soalPG.foto_soal !== ''">
                        <img :src="soalPG.foto_soal" alt="" />
                      </div>
                      <div
                        v-html="soalPG.isi"
                        class="mt-1"
                        style="font-size: 16px; font-weight: 400;"
                      ></div>
                      <div class="mt-2">
                        <div
                          v-for="(kunci, idKunci) in soalPG.kuncijawaban"
                          :key="idKunci"
                        >
                          <div
                            class="d-flex align-items-center mb-3"
                            v-if="kunci.benar == 1"
                          >
                            <div class="me-2">
                              <button
                                class="
                                btn btn-success mb-0 text-uppercase text-center
                              "
                                style="border-radius: 100px !important; min-width: 38px; max-width: 38px;"
                                disabled
                              >
                                {{ dataLetter[idKunci] }}
                              </button>
                            </div>
                            <div
                              class="
                              text-success mb-0 px-1 py-2
                            "
                              style="font-size: 16px; font-weight: 300;"
                            >
                              {{ kunci.jawaban }}
                            </div>
                          </div>
                          <div class="d-flex align-items-center mb-3" v-else>
                            <div class="me-2">
                              <button
                                :class="
                                  `btn ${
                                    soalPG.data_jawaban.jawaban == kunci.jawaban
                                      ? 'btn-danger'
                                      : 'btn-outline-primary'
                                  } mb-0 text-uppercase text-center`
                                "
                                style="border-radius: 100px !important; min-width: 38px; max-width: 38px;"
                                disabled
                              >
                                {{ dataLetter[idKunci] }}
                              </button>
                            </div>
                            <div
                              :class="
                                `${
                                  soalPG.data_jawaban.jawaban == kunci.jawaban
                                    ? 'text-danger fw-normal'
                                    : ''
                                } mb-0 px-1 py-2`
                              "
                              style="font-size: 16px; font-weight: 300;"
                            >
                              {{ kunci.jawaban }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="items.soal_essai.length > 0">
                  <div
                    class="mb-5"
                    v-for="(soalEsai, idEsai) in items.soal_essai"
                    :key="soalEsai.isi + idEsai"
                  >
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="d-flex align-items-center">
                        <div
                          :class="
                            `number-soal ${
                              total[id].nilai[items.soal_pg.length + idEsai]
                                .nilai
                                ? 'primary text-primary'
                                : 'warning text-warning'
                            } d-flex align-items-center justify-content-center`
                          "
                        >
                          {{ items.soal_pg.length + idEsai + 1 }}
                        </div>
                        <div class="type-soal">Soal Pilihan Ganda</div>
                      </div>
                      <div class="d-flex align-items-center">
                        <input
                          class="form-control form-control-sm"
                          type="number"
                          placeholder="Nilai"
                          style="width: 55px;"
                          maxlength="3"
                          v-model="
                            total[id].nilai[items.soal_pg.length + idEsai].nilai
                          "
                          @change="
                            checkBobot(id, items.soal_pg.length + idEsai)
                          "
                          v-if="!items.nilai"
                        />
                        <div
                          :class="
                            `py-1 px-2 ${
                              total[id].nilai[items.soal_pg.length + idEsai]
                                .nilai
                                ? total[id].nilai[items.soal_pg.length + idEsai]
                                    .nilai >= soalEsai.bobot
                                  ? 'text-success success'
                                  : 'text-primary primary'
                                : 'text-warning warning'
                            } ms-2`
                          "
                          style="border-radius: 7px; font-weight: 500;"
                        >
                          {{
                            total[id].nilai[items.soal_pg.length + idEsai].nilai
                              ? total[id].nilai[items.soal_pg.length + idEsai]
                                  .nilai
                              : 0
                          }}
                          / {{ soalEsai.bobot }}
                        </div>
                      </div>
                    </div>
                    <div style="padding-left: 40px;">
                      <div v-if="soalEsai.foto_soal !== ''">
                        <img
                          :src="soalEsai.foto_soal"
                          alt=""
                          class="w-100"
                          v-if="
                            ['jpg', 'png', 'jpeg', 'gif'].includes(
                              soalEsai.extension
                            )
                          "
                        />
                        <video
                          controls
                          v-if="['mp4', 'avi'].includes(soalEsai.extension)"
                          style="width: 100%;"
                        >
                          <source :src="soalEsai.foto_soal" type="video/mp4" />
                        </video>
                      </div>
                      <div
                        v-html="soalEsai.isi"
                        class="mt-1"
                        style="font-size: 16px; font-weight: 400;"
                      ></div>
                      <div class="type-soal mt-3">Jawaban</div>
                      <div class="mt-1">
                        <textarea
                          :id="`esai${id}${idEsai}`"
                          class="d-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="items.soal_upload.length > 0">
                  <div
                    class="mb-5"
                    v-for="(soalUpload, idUpload) in items.soal_upload"
                    :key="soalUpload.isi + idUpload"
                  >
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="d-flex align-items-center">
                        <div
                          :class="
                            `number-soal ${
                              total[id].nilai[
                                items.soal_pg.length +
                                  items.soal_essai.length +
                                  idUpload
                              ].nilai
                                ? 'primary text-primary'
                                : 'warning text-warning'
                            } d-flex align-items-center justify-content-center`
                          "
                        >
                          {{
                            items.soal_pg.length +
                              items.soal_essai.length +
                              idUpload +
                              1
                          }}
                        </div>
                        <div class="type-soal">Soal Upload</div>
                      </div>
                      <div class="d-flex align-items-center">
                        <input
                          class="form-control form-control-sm"
                          type="number"
                          placeholder="Nilai"
                          style="width: 55px;"
                          maxlength="3"
                          v-model="
                            total[id].nilai[
                              items.soal_pg.length +
                                items.soal_essai.length +
                                idUpload
                            ].nilai
                          "
                          @change="
                            checkBobot(
                              id,
                              items.soal_pg.length +
                                items.soal_essai.length +
                                idUpload
                            )
                          "
                          v-if="!items.nilai"
                        />
                        <div
                          :class="
                            `py-1 px-2 ${
                              total[id].nilai[
                                items.soal_pg.length +
                                  items.soal_essai.length +
                                  idUpload
                              ].nilai
                                ? total[id].nilai[
                                    items.soal_pg.length +
                                      items.soal_essai.length +
                                      idUpload
                                  ].nilai >= soalUpload.bobot
                                  ? 'text-success success'
                                  : 'text-primary primary'
                                : 'text-warning warning'
                            } ms-2`
                          "
                          style="border-radius: 7px; font-weight: 500;"
                        >
                          {{
                            total[id].nilai[
                              items.soal_pg.length +
                                items.soal_essai.length +
                                idUpload
                            ].nilai
                              ? total[id].nilai[
                                  items.soal_pg.length +
                                    items.soal_essai.length +
                                    idUpload
                                ].nilai
                              : 0
                          }}
                          / {{ soalUpload.bobot }}
                        </div>
                      </div>
                    </div>
                    <div style="padding-left: 40px;">
                      <div v-if="soalUpload.foto_soal !== ''">
                        <img :src="soalUpload.foto_soal" alt="" />
                      </div>
                      <div
                        v-html="soalUpload.isi"
                        class="mt-1"
                        style="font-size: 16px; font-weight: 400;"
                      ></div>
                      <div class="type-soal mt-3">Jawaban</div>
                      <div class="mt-1">
                        <div
                          class="image-jawaban mb-3"
                          v-if="
                            soalUpload.data_jawaban.ekstensi == 'jpeg' ||
                              soalUpload.data_jawaban.ekstensi == 'jpg' ||
                              soalUpload.data_jawaban.ekstensi == 'png'
                          "
                        >
                          <img :src="soalUpload.data_jawaban.jawaban" alt="" />
                        </div>

                        <div
                          class="mb-3"
                          v-else-if="
                            soalUpload.data_jawaban.ekstensi == 'mov' ||
                              soalUpload.data_jawaban.ekstensi == 'mpeg' ||
                              soalUpload.data_jawaban.ekstensi == 'mp4'
                          "
                        >
                          <video width="400" controls>
                            <source
                              :src="soalUpload.data_jawaban.jawaban"
                              :type="
                                `video/${soalUpload.data_jawaban.ekstensi}`
                              "
                            />
                            Your browser does not support HTML video.
                          </video>
                        </div>

                        <div
                          v-else
                          class="file-other mb-3 p-3 secondary border-radius"
                        >
                          <div class="d-flex align-items-center">
                            <i
                              class="fas fa-info-circle me-2"
                              style="font-size: 22px; opacity: .7;"
                            ></i>
                            <div style="opacity: .7;">
                              File tidak dapat ditampilkan. Anda dapat
                              mendownload file untuk membuka file melalui
                              perangkat anda.
                            </div>
                          </div>
                        </div>

                        <div>
                          <a
                            target="_blank"
                            :href="soalUpload.data_jawaban.jawaban"
                            :download="soalUpload.data_jawaban.nama_file"
                            class="btn btn-primary btn-sm"
                            >Download {{ soalUpload.data_jawaban.nama_file }}</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div
                    class="px-3 py-2 primary text-primary border-radius d-inline-block"
                    style="font-weight: 600; font-size: 16px;"
                  >
                    Nilai Akhir: {{ total[id].totalNilai }}
                  </div>
                  <div class="d-flex">
                    <button
                      :class="
                        `btn ${
                          items.nilai || items.nilai == 0
                            ? 'btn-secondary'
                            : 'btn-success'
                        } px-4`
                      "
                      type="button"
                      @click="submitNilai(dataTugas.data[id], id)"
                      :disabled="items.nilai || items.nilai == 0"
                    >
                      {{
                        items.nilai || items.nilai == 0 ? "Dinilai" : "Simpan"
                      }}
                    </button>
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
      dataTugas: null,
      dataLetter: [],
      total: [],
      countMahasiswa: 0,
      filter: "",
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMM YYYY");
    },
    selectFilter(e) {
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
      this.dataLetter = alphabet;
      var countEditor = 0;
      this.filter = e.target.value;
      if (this.filter != "") {
        axios
          .get(
            this.url +
              "tugas/superadmin/tugas/pengerjaan/" +
              this.$route.params.id_gugus +
              "/" +
              this.$route.params.id_tugas +
              "?filter=" +
              this.filter,
            {
              headers: {
                Authorization: localStorage.token,
              },
            }
          )
          .then((res) => {
            this.dataTugas = res.data;
            var data = this.dataTugas.data;
            var arrNilai = [];
            var count = 0;

            for (let k = 0; k < data.length; k++) {
              arrNilai.push({ nilai: [], totalNilai: 0 });
              if (data[k].dikerjakan) {
                var arrTotal = [];

                if (data[k].soal_pg.length > 0) {
                  for (let n = 0; n < data[k].soal_pg.length; n++) {
                    arrNilai[k].nilai.push({
                      nilai: data[k].soal_pg[n].data_jawaban.nilai
                        ? data[k].soal_pg[n].data_jawaban.nilai
                        : 0,
                      uuid: data[k].soal_pg[n].data_jawaban.uuid,
                      benar: data[k].soal_pg[n].data_jawaban.benar,
                      jawaban: data[k].soal_pg[n].data_jawaban.jawaban,
                      bobot: data[k].soal_pg[n].bobot,
                      type: "pg",
                    });

                    if (data[k].soal_pg[n].data_jawaban.nilai) {
                      arrTotal.push(
                        parseInt(data[k].soal_pg[n].data_jawaban.nilai)
                      );
                    } else {
                      arrTotal.push(0);
                    }
                  }
                }

                if (data[k].soal_essai.length > 0) {
                  for (let l = 0; l < data[k].soal_essai.length; l++) {
                    arrNilai[k].nilai.push({
                      nilai: data[k].soal_essai[l].data_jawaban.nilai
                        ? data[k].soal_essai[l].data_jawaban.nilai
                        : null,
                      uuid: data[k].soal_essai[l].data_jawaban.uuid,
                      benar: data[k].soal_essai[l].data_jawaban.benar,
                      jawaban: data[k].soal_essai[l].data_jawaban.jawaban,
                      bobot: data[k].soal_essai[l].bobot,
                      type: "essai",
                    });

                    if (data[k].soal_essai[l].data_jawaban.nilai) {
                      arrTotal.push(
                        parseInt(data[k].soal_essai[l].data_jawaban.nilai)
                      );
                    } else {
                      arrTotal.push(0);
                    }
                  }
                }

                if (data[k].soal_upload.length > 0) {
                  for (let m = 0; m < data[k].soal_upload.length; m++) {
                    arrNilai[k].nilai.push({
                      nilai: data[k].soal_upload[m].data_jawaban.nilai
                        ? data[k].soal_upload[m].data_jawaban.nilai
                        : null,
                      uuid: data[k].soal_upload[m].data_jawaban.uuid,
                      benar: data[k].soal_upload[m].data_jawaban.benar,
                      jawaban: data[k].soal_upload[m].data_jawaban.jawaban,
                      bobot: data[k].soal_upload[m].bobot,
                      type: "upload",
                    });

                    if (data[k].soal_upload[m].data_jawaban.nilai) {
                      arrTotal.push(
                        parseInt(data[k].soal_upload[m].data_jawaban.nilai)
                      );
                    } else {
                      arrTotal.push(0);
                    }
                  }
                }

                arrNilai[k].totalNilai = arrTotal.reduce((a, b) => a + b, 0);
              }

              if (data[k].nilai) {
                count++;
              }
            }

            this.countMahasiswa = count;
            this.total = arrNilai;

            var editorInterval = setInterval(() => {
              for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].soal_essai.length; j++) {
                  // eslint-disable-next-line
                  tinymce.init({
                    selector: `#esai${i}${j}`,
                    menubar: false,
                    min_height: 400,
                    readonly: 1,
                  });
                }
              }

              countEditor++;

              if (countEditor == 3) {
                clearInterval(editorInterval);
              }
            }, 1000);

            setTimeout(() => {
              for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].soal_essai.length; j++) {
                  // eslint-disable-next-line
                  tinyMCE
                    .get(`esai${i}${j}`)
                    .setContent(data[i].soal_essai[j].data_jawaban.jawaban);
                }
              }
            }, 3500);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    checkBobot(id, idSoal) {
      // var data = this.total[id].totalNilai;
      var dataSoal = this.total[id].nilai;
      var bobot = this.total[id].nilai[idSoal].bobot;
      var nilai = this.total[id].nilai[idSoal].nilai;
      var arrNilai = [];
      // var validation = 0;
      // if(bobot.nilai > ){}

      if (nilai > bobot) {
        nilai = bobot;
      } else if (nilai < 0) {
        nilai = 0;
      }

      this.total[id].nilai[idSoal].nilai = parseInt(nilai);

      for (let i = 0; i < dataSoal.length; i++) {
        if (dataSoal[i].nilai) {
          arrNilai.push(dataSoal[i].nilai);
        } else {
          arrNilai.push(0);
        }
      }

      this.total[id].totalNilai = arrNilai.reduce((a, b) => a + b, 0);
    },
    submitNilai(data, id) {
      var validation = 0;
      for (let z = 0; z < this.total[id].nilai.length; z++) {
        if (
          this.total[id].nilai[z].type == "essai" ||
          this.total[id].nilai[z].type == "upload"
        ) {
          if (
            !this.total[id].nilai[z].nilai ||
            this.total[id].nilai[z].nilai == ""
          ) {
            validation++;
          }
        }
      }

      console.log(validation);
      console.log(data);

      if (validation == 0) {
        Swal.fire({
          title: `Apakah anda yakin untuk menyimpan nilai ${data.nama}?`,
          text: "Nilai yang dimasukkan akan disimpan!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0B7517",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Simpan",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .post(
                this.url + "tugas/superadmin/tugas/penilaian",
                {
                  nim: data.nim,
                  gugus_id: this.$route.params.id_gugus,
                  tugas_id: this.$route.params.id_tugas,
                  data_nilai: this.total[id].nilai,
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
                  Swal.fire(`Nilai ${data.nama} Disimpan!`, "", "success").then(
                    () => {
                      window.location.reload();
                    }
                  );
                } else {
                  Swal.fire(
                    "Nilai Gagal Disimpan!",
                    res.data.message,
                    "warning"
                  );
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      } else {
        Swal.fire(
          "Nilai Belum Dimasukkan!",
          "Cek kembali apakah seluruh soal telah diberi nilai atau belum.",
          "warning"
        );
      }
    },
  },
  mounted() {
    this.width = $(document).width();
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    this.dataLetter = alphabet;
    var countEditor = 0;

    axios
      .get(
        this.url +
          "tugas/superadmin/tugas/pengerjaan/" +
          this.$route.params.id_gugus +
          "/" +
          this.$route.params.id_tugas,
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      )
      .then((res) => {
        this.dataTugas = res.data;
        var data = this.dataTugas.data;
        var arrNilai = [];
        var count = 0;

        for (let k = 0; k < data.length; k++) {
          arrNilai.push({ nilai: [], totalNilai: 0 });
          if (data[k].dikerjakan) {
            var arrTotal = [];

            if (data[k].soal_pg.length > 0) {
              for (let n = 0; n < data[k].soal_pg.length; n++) {
                arrNilai[k].nilai.push({
                  nilai: data[k].soal_pg[n].data_jawaban.nilai
                    ? data[k].soal_pg[n].data_jawaban.nilai
                    : 0,
                  uuid: data[k].soal_pg[n].data_jawaban.uuid,
                  benar: data[k].soal_pg[n].data_jawaban.benar,
                  jawaban: data[k].soal_pg[n].data_jawaban.jawaban,
                  bobot: data[k].soal_pg[n].bobot,
                  type: "pg",
                });

                if (data[k].soal_pg[n].data_jawaban.nilai) {
                  arrTotal.push(
                    parseInt(data[k].soal_pg[n].data_jawaban.nilai)
                  );
                } else {
                  arrTotal.push(0);
                }
              }
            }

            if (data[k].soal_essai.length > 0) {
              for (let l = 0; l < data[k].soal_essai.length; l++) {
                arrNilai[k].nilai.push({
                  nilai: data[k].soal_essai[l].data_jawaban.nilai
                    ? data[k].soal_essai[l].data_jawaban.nilai
                    : null,
                  uuid: data[k].soal_essai[l].data_jawaban.uuid,
                  benar: data[k].soal_essai[l].data_jawaban.benar,
                  jawaban: data[k].soal_essai[l].data_jawaban.jawaban,
                  bobot: data[k].soal_essai[l].bobot,
                  type: "essai",
                });

                if (data[k].soal_essai[l].data_jawaban.nilai) {
                  arrTotal.push(
                    parseInt(data[k].soal_essai[l].data_jawaban.nilai)
                  );
                } else {
                  arrTotal.push(0);
                }
              }
            }

            if (data[k].soal_upload.length > 0) {
              for (let m = 0; m < data[k].soal_upload.length; m++) {
                arrNilai[k].nilai.push({
                  nilai: data[k].soal_upload[m].data_jawaban.nilai
                    ? data[k].soal_upload[m].data_jawaban.nilai
                    : null,
                  uuid: data[k].soal_upload[m].data_jawaban.uuid,
                  benar: data[k].soal_upload[m].data_jawaban.benar,
                  jawaban: data[k].soal_upload[m].data_jawaban.jawaban,
                  bobot: data[k].soal_upload[m].bobot,
                  type: "upload",
                });

                if (data[k].soal_upload[m].data_jawaban.nilai) {
                  arrTotal.push(
                    parseInt(data[k].soal_upload[m].data_jawaban.nilai)
                  );
                } else {
                  arrTotal.push(0);
                }
              }
            }

            arrNilai[k].totalNilai = arrTotal.reduce((a, b) => a + b, 0);
          }

          if (data[k].nilai) {
            count++;
          }
        }

        this.countMahasiswa = count;
        this.total = arrNilai;

        var editorInterval = setInterval(() => {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].soal_essai.length; j++) {
              // eslint-disable-next-line
              tinymce.init({
                selector: `#esai${i}${j}`,
                menubar: false,
                min_height: 400,
                readonly: 1,
              });
            }
          }

          countEditor++;

          if (countEditor == 3) {
            clearInterval(editorInterval);
          }
        }, 1000);

        setTimeout(() => {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].soal_essai.length; j++) {
              // eslint-disable-next-line
              tinyMCE
                .get(`esai${i}${j}`)
                .setContent(data[i].soal_essai[j].data_jawaban.jawaban);
            }
          }
        }, 3500);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    $(document).ready(function() {});
  },
};
</script>
