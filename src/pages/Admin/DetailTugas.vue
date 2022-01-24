<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <router-link
                  :to="{
                    name: 'Tugas Master',
                  }"
                  class="btn btn-primary me-2"
                  type="button"
                >
                  <i class="fas fa-arrow-left"></i>
                </router-link>
                <div>
                  <div class="title-content">
                    Detail Tugas
                  </div>
                  <div class="title-type-soal">
                    {{ form.master.judul }}
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  :class="
                    `btn btn-sm ${
                      menu == 'Master Tugas'
                        ? 'btn-primary'
                        : 'btn-outline-primary'
                    } me-2`
                  "
                  type="button"
                  @click="changeMenu('Master Tugas')"
                >
                  Master Tugas
                </button>
                <button
                  :class="
                    `btn btn-sm ${
                      menu == 'Departemen'
                        ? 'btn-primary'
                        : 'btn-outline-primary'
                    } me-2`
                  "
                  type="button"
                  @click="changeMenu('Departemen')"
                >
                  Departemen
                </button>
                <button
                  :class="
                    `btn btn-sm ${
                      menu == 'Soal' ? 'btn-primary' : 'btn-outline-primary'
                    } me-2`
                  "
                  type="button"
                  @click="changeMenu('Soal')"
                >
                  Soal
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          :class="
            `${menu == 'Master Tugas' ? 'd-block' : 'd-none'} card-shadow mb-3`
          "
        >
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="title-content">
                {{ menu }}
              </div>

              <button
                class="btn btn-outline-warning me-2"
                type="button"
                @click="changeStatus('edit')"
                v-if="status == 'default'"
              >
                Ubah
              </button>
              <button
                class="btn btn-danger me-2 text-white"
                type="button"
                @click="status = 'default'"
                v-else
              >
                Batal
              </button>
            </div>
            <div class="mt-4">
              <div class="row">
                <div class="col-md-4">
                  <div
                    class="px-5 d-none d-md-flex justify-content-center pt-5"
                  >
                    <img
                      src="../../assets/ilustrasi/icon-book.svg"
                      alt=""
                      class="w-100"
                      style="max-width: 250px;"
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <div :class="`${status == 'default' ? 'd-block' : 'd-none'}`">
                    <div class="mb-3">
                      <label for="judul" class="d-block form-label"
                        >Judul</label
                      >
                      <div
                        class="d-inline-block border-radius px-3 py-2"
                        style="min-height: 40px; min-width: 100px; font-size: 16px; font-weight: 500; background-color: whitesmoke;"
                      >
                        {{ form.master.judul }}
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="judul" class="d-block form-label"
                        >Deskripsi</label
                      >
                      <div
                        v-html="form.master.deskripsi"
                        class="border-radius px-3 py-2"
                        style="min-height: 100px; font-size: 16px; background-color: whitesmoke;"
                      ></div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <div class="mb-3">
                          <label for="judul" class="form-label"
                            >Waktu Mulia</label
                          >
                          <div style="font-size: 16px;">
                            <div style="font-weight: 500;">
                              {{ formatDate(form.master.dateMulai) }}
                            </div>
                            <div>{{ form.master.timeMulai }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="mb-3">
                          <label for="judul" class="form-label"
                            >Waktu Selesai</label
                          >
                          <div style="font-size: 16px;">
                            <div style="font-weight: 500;">
                              {{ formatDate(form.master.dateSelesai) }}
                            </div>
                            <div>{{ form.master.timeSelesai }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div :class="`${status == 'edit' ? 'd-block' : 'd-none'}`">
                    <div class="mb-3">
                      <label for="judul" class="form-label">Judul</label>
                      <input
                        type="text"
                        class="form-control"
                        id="judul"
                        placeholder="Judul Tugas"
                        v-model="form.master.judul"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="judul" class="form-label">Deskripsi</label>
                      <textarea id="deskripsi" class="d-none"></textarea>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <div class="mb-3">
                          <label for="judul" class="form-label"
                            >Waktu Mulai</label
                          >
                          <input
                            type="date"
                            class="form-control"
                            placeholder="Judul Tugas"
                            v-model="form.master.dateMulai"
                          />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="mb-3">
                          <label
                            for="judul"
                            class="form-label"
                            style="opacity: 0;"
                            >date</label
                          >
                          <input
                            type="time"
                            class="form-control"
                            id="judul"
                            placeholder="Judul Tugas"
                            v-model="form.master.timeMulai"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <div class="mb-5">
                          <label for="judul" class="form-label"
                            >Waktu Berakhir</label
                          >
                          <input
                            type="date"
                            class="form-control"
                            placeholder="Judul Tugas"
                            v-model="form.master.dateSelesai"
                          />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="mb-5">
                          <label
                            for="judul"
                            class="form-label"
                            style="opacity: 0;"
                            >date</label
                          >
                          <input
                            type="time"
                            class="form-control"
                            id="judul"
                            placeholder="Judul Tugas"
                            v-model="form.master.timeSelesai"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-end">
                      <button
                        class="btn btn-success px-5"
                        type="button"
                        @click="editMaster"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div :class="`${menu == 'Departemen' ? 'd-block' : 'd-none'}`">
          <div class="card-shadow mb-3">
            <div class="p-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="title-content">
                  {{ menu }}
                </div>

                <button
                  class="btn btn-outline-warning me-2"
                  type="button"
                  @click="changeStatus('edit')"
                  v-if="status == 'default'"
                >
                  Ubah
                </button>
                <div v-else>
                  <button
                    class="btn btn-success me-2"
                    type="button"
                    @click="editGugus"
                  >
                    Simpan
                  </button>
                  <button
                    class="btn btn-danger me-2 text-white"
                    type="button"
                    @click="status = 'default'"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            :class="
              `card-shadow ${
                form.setGugus.length > 0
                  ? 'success text-success'
                  : 'danger text-danger'
              } mb-3`
            "
            v-if="status == 'edit'"
          >
            <div class="p-3">
              <div class="d-flex align-items-center">
                <i class="fas fa-info-circle me-2" style="font-size: 22px;"></i>
                <div style="font-size: 18px; font-weight: 500;">
                  {{
                    form.setGugus.length > 0
                      ? form.setGugus.length + " departemen dipilih."
                      : "Pilih departemen yang mendapatkan tugas!"
                  }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="dataGugus">
            <div class="row" v-if="status == 'default'">
              <div
                class="col-md-4 col-sm-6"
                v-for="(item, id) in defaultGugus"
                :key="id"
              >
                <div class="card-shadow overflow-hidden position-relative mb-3">
                  <div class="p-3 position-relative" style="z-index: 2;">
                    <div class="title-soal mb-5">{{ item.name }}</div>
                    <div
                      class="d-flex justify-content-between align-items-center"
                      style="font-size: 16px; font-weight: 500;"
                    >
                      <!-- <div class="d-flex align-items-center">
                        <div class="d-flex align-items-center">
                          <div
                            class="pemandu-img d-flex align-items-center justify-content-center"
                            v-if="item.pemandu.length > 0"
                          >
                            <img
                              src="../../assets/ilustrasi/avatar-admin-pemandu.svg"
                              alt=""
                              v-if="
                                item.pemandu[0].foto == '' ||
                                  item.pemandu[0].foto == 'foto.jpg'
                              "
                            />
                            <img :src="item.pemandu[0].foto" v-else alt="" />
                          </div>
                          <div
                            class="pemandu-gugus ms-2"
                            v-if="item.pemandu[0]"
                          >
                            {{ item.pemandu[0].nama }}
                          </div>
                        </div>
                      </div> -->
                      <div>{{ item.mahasiswa_count }} Staff</div>
                    </div>
                  </div>
                  <img
                    class="card-icon-bg"
                    src="../../assets/icons/card-bg.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="row" v-else>
              <div
                class="col-md-4 col-sm-6"
                v-for="(item, id) in dataGugus"
                :key="id"
              >
                <label
                  class="card-shadow hoverable overflow-hidden position-relative mb-3 w-100"
                  :for="`gugus${id}`"
                >
                  <div class="p-3 position-relative" style="z-index: 2;">
                    <div class="d-flex justify-content-between">
                      <div class="title-soal mb-5">{{ item.name }}</div>
                      <input
                        class="form-check-input cursor-pointer"
                        type="checkbox"
                        :id="`gugus${id}`"
                        v-model="form.setGugus"
                        :value="{ nama: item.name, uuid: item.uuid }"
                      />
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <!-- <div class="d-flex align-items-center">
                        <div
                          class="pemandu-img d-flex align-items-center justify-content-center"
                        >
                          <img src="../../assets/images/profile.jpeg" alt="" />
                        </div>
                        <div class="pemandu-gugus ms-2" v-if="item.pemandu[0]">
                          {{ item.pemandu[0].nama }}
                        </div>
                      </div> -->
                      <div>{{ item.mahasiswa_count }} Staff</div>
                    </div>
                  </div>
                  <img
                    class="card-icon-bg"
                    src="../../assets/icons/card-bg.svg"
                    alt=""
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div :class="`${menu == 'Soal' ? 'd-block' : 'd-none'}`">
          <div class="card-shadow mb-3">
            <div class="p-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="title-content">
                  {{ menu }}
                </div>

                <button
                  class="btn btn-outline-warning me-2"
                  type="button"
                  @click="changeStatus('edit')"
                  v-if="status == 'default'"
                >
                  Ubah
                </button>
                <div v-else>
                  <button
                    :class="
                      `btn ${
                        totalBobot !== 100 || !isFilledAll
                          ? 'btn-secondary'
                          : 'btn-success'
                      } me-2`
                    "
                    type="button"
                    :disabled="totalBobot !== 100 || !isFilledAll"
                    @click="editSoal"
                  >
                    Simpan
                  </button>
                  <button
                    class="btn btn-danger me-2 text-white"
                    type="button"
                    @click="status = 'default'"
                  >
                    Batal
                  </button>
                </div>
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
            v-if="status == 'edit'"
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
          <div class="row pb-4" v-if="dataSoal">
            <div
              class="col-md-4 col-sm-6"
              v-for="(item, id) in defaultSoal"
              :key="id"
            >
              <div class="d-block card-shadow mb-3">
                <div class="p-3">
                  <div class="mb-4" v-if="item.soal.foto !== ''">
                    <div
                      class="img-question d-flex align-items-center justify-content-center"
                    >
                      <img :src="item.soal.foto" alt="" />
                    </div>
                  </div>
                  <div>
                    <div class="fw-bold">
                      Soal
                      <span class="text-capitalize">{{
                        item.soal.tipe.toLowerCase()
                      }}</span>
                    </div>
                    <div
                      style="font-size: 16px; font-weight: 300;"
                      v-html="item.soal.isi"
                    ></div>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center mt-5"
                  >
                    <div>
                      <div
                        class="py-1 d-inline-block px-2 text-success success"
                        style="border-radius: 7px; font-weight: 500;"
                        v-if="item.soal.kategori == 'MUDAH'"
                      >
                        Mudah
                      </div>
                      <div
                        class="py-1 d-inline-block px-2 text-warning warning"
                        style="border-radius: 7px; font-weight: 500;"
                        v-else-if="item.soal.kategori == 'SEDANG'"
                      >
                        Sedang
                      </div>
                      <div
                        class="py-1 d-inline-block px-2 text-danger danger"
                        style="border-radius: 7px; font-weight: 500;"
                        v-else-if="item.soal.kategori == 'SULIT'"
                      >
                        Sulit
                      </div>
                      <div>
                        <div
                          v-if="status == 'default'"
                          class="mt-2 px-3 py-1 primary text-primary border-radius d-inline-block fw-bold"
                        >
                          Bobot {{ item.bobot }}
                        </div>
                        <input
                          type="number"
                          :class="
                            `form-control ${
                              item.bobot ? 'success' : ''
                            } mt-2 number-input`
                          "
                          style="width: 105px; !important; border-width: 2px;"
                          :id="`bobot${id}`"
                          @change="checkBobot(id)"
                          v-model="item.bobot"
                          placeholder="Bobot Soal"
                          min="0"
                          max="100"
                          v-else
                        />
                      </div>
                    </div>
                    <div style="opacity: .5">
                      {{ formatDate(item.soal.created_at) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="status == 'edit'">
            <div class="card-shadow warning mb-3">
              <div class="p-3">
                <div class="title-content text-warning">
                  Atur Soal
                </div>
                <!-- <div class="row">
                  <div class="col-lg-3 col-md-4 col-6">
                    <label class="form-label">Tipe Soal</label>
                    <select
                      v-model="filter.tipe"
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value="default" selected disabled
                        >- Pilih Tipe Soal -</option
                      >
                      <option value="essai">Essai</option>
                      <option value="pilihan_ganda">Pilihan Ganda</option>
                      <option value="upload">Upload</option>
                    </select>
                  </div>
                  <div class="col-lg-3 col-md-4 col-6">
                    <label class="form-label">Kategori Soal</label>
                    <select
                      v-model="filter.kategori"
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value="default" selected disabled
                        >- Pilih Kategori Soal -</option
                      >
                      <option value="mudah">Mudah</option>
                      <option value="sedang">Sedang</option>
                      <option value="sulit">Sulit</option>
                    </select>
                  </div>
                </div> -->
              </div>
            </div>

            <div class="row" v-if="dataSoal">
              <div
                class="col-md-4 col-sm-6"
                v-for="(item, id) in dataSoal"
                :key="id"
              >
                <label
                  :for="`soal${id}`"
                  class="d-block card-shadow hoverable mb-3"
                >
                  <div class="p-3">
                    <input
                      class="form-check-input cursor-pointer floating-check"
                      type="checkbox"
                      :id="`soal${id}`"
                      v-model="defaultSoal"
                      :value="{
                        id: item.uuid,
                        soal: dataSoal[id],
                        bobot: item.bobot,
                      }"
                      @change="checkboxEvent"
                    />
                    <div class="mb-4" v-if="item.foto !== ''">
                      <div
                        class="img-question d-flex align-items-center justify-content-center"
                      >
                        <img :src="item.foto" alt="" />
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
                      </div>
                      <div style="opacity: .5">
                        {{ formatDate(item.created_at) }}
                      </div>
                    </div>
                  </div>
                </label>
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
      dataGugus: null,
      dataSoal: null,
      defaultGugus: [],
      defaultSoal: [],
      totalBobot: null,
      isFilledAll: true,
      menu: "Master Tugas",
      status: "default",
      filter: {
        tipe: "default",
        kategori: "default",
      },
      form: {
        master: {
          judul: "",
          dateMulai: "",
          timeMulai: "",
          dateSelesai: "",
          timeSelesai: "",
          deskripsi: "",
        },
        setGugus: null,
        setSoal: null,
      },
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMM YYYY");
    },
    changeStatus(status) {
      this.status = status;
    },
    changeMenu(menu) {
      this.menu = menu;
      this.status = "default";
    },
    checkBobot(id) {
      var arr = [];
      var validation = 0;
      console.log(id);

      if (this.defaultSoal[id].bobot > 100) {
        this.defaultSoal[id].bobot = 100;
      } else if (this.defaultSoal[id].bobot < 0) {
        this.defaultSoal[id].bobot = 0;
      }

      for (let i = 0; i < this.defaultSoal.length; i++) {
        if (this.defaultSoal[i].bobot) {
          arr.push(parseInt(this.defaultSoal[i].bobot));
        } else {
          arr.push(0);
          validation++;
        }
      }

      this.totalBobot = arr.reduce((a, b) => a + b, 0);

      if (validation == 0) {
        this.isFilledAll = true;
      } else {
        this.isFilledAll = false;
      }
    },
    checkboxEvent() {
      var arr = [];
      var validation = 0;

      for (let i = 0; i < this.defaultSoal.length; i++) {
        if (this.defaultSoal[i].bobot) {
          arr.push(parseInt(this.defaultSoal[i].bobot));
        } else {
          arr.push(0);
          validation++;
        }
      }

      this.totalBobot = arr.reduce((a, b) => a + b, 0);

      if (validation == 0) {
        this.isFilledAll = true;
      } else {
        this.isFilledAll = false;
      }
    },
    deleteSoal(id) {
      const arr = this.defaultSoal;
      var removeIndex = arr
        .map(function(item) {
          return item.soal.uuid;
        })
        .indexOf(id);

      arr.splice(removeIndex, 1);
    },
    editMaster() {
      Swal.fire({
        title: "Apakah anda yakin mengubah informasi tugas?",
        text: "Data otomatis akan berubah!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0B7517",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Ubah",
      }).then((result) => {
        if (result.isConfirmed) {
          // eslint-disable-next-line
          var getText = tinymce.get("deskripsi").getContent();
          this.form.master.deskripsi = getText;

          axios
            .put(
              this.url +
                "tugas/superadmin/tugas/update-tugas/" +
                this.$route.params.id,
              {
                nama: this.form.master.judul,
                deskripsi: this.form.master.deskripsi,
                mulai:
                  this.form.master.dateMulai + " " + this.form.master.timeMulai,
                selesai:
                  this.form.master.dateSelesai +
                  " " +
                  this.form.master.timeSelesai,
              },
              {
                headers: {
                  Authorization: localStorage.token,
                },
              }
            )
            .then((res) => {
              console.log(res);
              Swal.fire("Data telah diubah!", "", "success").then(() => {
                window.location.reload();
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    editGugus() {
      Swal.fire({
        title: "Apakah anda yakin mengubah gugus yang mengikuti tugas?",
        text: "Data otomatis akan berubah!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0B7517",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Ubah",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              this.url +
                "tugas/superadmin/tugas/update-gugus/" +
                this.$route.params.id,
              {
                gugus: this.form.setGugus,
              },
              {
                headers: {
                  Authorization: localStorage.token,
                },
              }
            )
            .then((res) => {
              console.log(res);
              Swal.fire("Data telah diubah!", "", "success").then(() => {
                window.location.reload();
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    editSoal() {
      Swal.fire({
        title: "Apakah anda yakin mengubah soal?",
        text: "Data otomatis akan berubah!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0B7517",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Ubah",
      }).then((result) => {
        if (result.isConfirmed) {
          var arrSoal = [];

          for (let i = 0; i < this.defaultSoal.length; i++) {
            arrSoal.push({
              uuid: this.defaultSoal[i].soal.uuid,
              bobot: this.defaultSoal[i].bobot,
            });
          }

          axios
            .put(
              this.url +
                "tugas/superadmin/tugas/update-soal/" +
                this.$route.params.id,
              {
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
              Swal.fire("Data telah diubah!", "", "success").then(() => {
                window.location.reload();
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
    var countEditor = 0;

    axios
      .get(
        this.url + "tugas/superadmin/tugas/edit-tugas/" + this.$route.params.id,
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      )
      .then((res) => {
        this.dataTugas = res.data;
        this.form.master = res.data;

        this.form.master.judul = this.form.master.data.nama;
        this.form.master.dateMulai = this.form.master.data.mulai.split(" ")[0];
        this.form.master.timeMulai = this.form.master.data.mulai.split(" ")[1];
        this.form.master.dateSelesai = this.form.master.data.selesai.split(
          " "
        )[0];
        this.form.master.timeSelesai = this.form.master.data.selesai.split(
          " "
        )[1];
        this.form.master.deskripsi = this.form.master.data.deskripsi;

        var editorInterval = setInterval(() => {
          countEditor++;
          // eslint-disable-next-line
          tinymce.init({
            selector: "#deskripsi",
            menubar: false,
            min_height: 250,
          });

          if (countEditor == 5) {
            clearInterval(editorInterval);
          }
        }, 1000);

        setTimeout(() => {
          // eslint-disable-next-line
          tinyMCE.get("deskripsi").setContent(this.form.master.deskripsi);
        }, 2500);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        this.url + "tugas/superadmin/tugas/edit-gugus/" + this.$route.params.id,
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.dataGugus = res.data.data.gugus;
        this.form.setGugus = res.data.data.gugus_dipilih;
        var gugus = this.dataGugus;
        var set_gugus = this.form.setGugus;
        var arr = [];

        for (let i = 0; i < this.form.setGugus.length; i++) {
          for (let j = 0; j < gugus.length; j++) {
            if (set_gugus[i].uuid == gugus[j].uuid) {
              arr.push(gugus[j]);
            }
          }
        }

        this.defaultGugus = arr;
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        this.url + "tugas/superadmin/tugas/edit-soal/" + this.$route.params.id,
        {
          headers: {
            Authorization: localStorage.token,
          },
        }
      )
      .then((res) => {
        console.log(res);

        this.dataSoal = res.data.data.soal;
        this.form.setSoal = res.data.data.soal_dipilih;
        var soal = this.dataSoal;
        var set_soal = this.form.setSoal;
        var arr = [];
        var arrBobot = [];

        for (let i = 0; i < this.form.setSoal.length; i++) {
          for (let j = 0; j < soal.length; j++) {
            if (set_soal[i].uuid == soal[j].uuid) {
              arr.push({
                id: soal[j].uuid,
                soal: soal[j],
                bobot: set_soal[i].bobot,
              });
            }
          }
        }

        for (let k = 0; k < arr.length; k++) {
          arrBobot.push(parseInt(arr[k].bobot));
        }

        this.totalBobot = arrBobot.reduce((a, b) => a + b, 0);

        this.defaultSoal = arr;
      })
      .catch((err) => {
        console.log(err);
      });

    $(document).ready(function() {});
  },
};
</script>

<style scoped>
/* tr th {
  text-align: center;
}
tr td {
  text-align: center;
} */
</style>
