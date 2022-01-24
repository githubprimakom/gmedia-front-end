<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-4">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="title-content">
                Penilaian
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="card-shadow mb-5">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="position-relative">
                  <img
                    src="../../assets/icons/search.svg"
                    alt=""
                    class="search-icon"
                  />
                  <input
                    type="text"
                    class="form-control search-custom"
                    placeholder="Cari . . ."
                  />
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <div class="d-flex justify-content-center" v-if="!dataGugus">
          <div class="card-shadow">
            <div class="px-5 py-3">
              <Loader text="Sedang memuat data gugus." />
            </div>
          </div>
        </div>
        <div class="row" v-if="dataGugus">
          <div
            class="col-md-4 col-sm-6"
            v-for="(item, id) in dataGugus.data"
            :key="id"
          >
            <router-link
              :to="{
                name: 'Penilaian Tugas',
                params: { name: item.name, id: item.uuid },
              }"
              style="color: inherit;"
            >
              <div
                class="card-shadow hoverable overflow-hidden position-relative mb-3"
              >
                <div class="p-3 position-relative" style="z-index: 2;">
                  <div class="title-soal mb-5">{{ item.name }}</div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
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
                      <div class="pemandu-gugus ms-2" v-if="item.pemandu[0]">
                        {{ item.pemandu[0].nama }}
                      </div>
                    </div>
                    <div>{{ item.mahasiswa_count }} Mahasiswa</div>
                  </div>
                </div>
                <img
                  class="card-icon-bg"
                  src="../../assets/icons/card-bg.svg"
                  alt=""
                />
              </div>
            </router-link>
          </div>
        </div>
        <div
          class="d-flex justify-content-center align-items-center mt-5 pb-5"
          v-if="dataGugus"
        >
          <div v-for="(item, id) in dataGugus.links" :key="id">
            <div
              :class="
                `pagination-arrow ${
                  dataGugus.prev_page_url
                    ? 'bg-primary cursor-pointer'
                    : 'bg-secondary'
                } me-3 d-flex align-items-center justify-content-center`
              "
              @click="navigation(dataGugus.prev_page_url)"
              v-if="item.label == 'pagination.previous'"
            >
              <i class="fas fa-chevron-left text-white"></i>
            </div>
            <div
              class="d-flex align-items-center"
              v-if="
                item.label !== 'pagination.previous' &&
                  item.label !== 'pagination.next'
              "
            >
              <div
                :class="
                  `pagination-number ${
                    item.active ? 'text-primary' : ''
                  } px-2 py-1 mx-2`
                "
                @click="navigation(item.url)"
              >
                {{ item.label }}
              </div>
            </div>
            <div
              :class="
                `pagination-arrow ${
                  dataGugus.next_page_url
                    ? 'bg-primary cursor-pointer'
                    : 'bg-secondary'
                } ms-3 d-flex align-items-center justify-content-center`
              "
              v-if="item.label == 'pagination.next'"
              @click="navigation(dataGugus.next_page_url)"
            >
              <i class="fas fa-chevron-right text-white"></i>
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

export default {
  computed: {
    ...mapState(["url"]),
  },
  data: function() {
    return {
      width: null,
      dataGugus: null,
    };
  },
  methods: {
    changeType(type) {
      this.type = type;
    },
    checkedAll() {
      if (this.setGugus.length == this.dataGugus.total) {
        this.setGugus = [];
      } else {
        for (let i = 0; i < this.dataGugus.data.length; i++) {
          this.setGugus.push(this.dataGugus.data[i].uuid);
        }
      }
    },
    next() {
      localStorage.removeItem("tempGugus");
      var array = JSON.stringify(this.setGugus);
      localStorage.tempGugus = array;
    },
    previous() {
      localStorage.removeItem("tempGugus");
      localStorage.removeItem("tempSoal");
      localStorage.removeItem("tempTugas");
      this.setGugus = [];
      this.status = "default";
    },
    navigation(url) {
      if (url) {
        this.dataGugus = null;

        axios
          .get(url, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            this.dataGugus = res.data.data;
          })
          .catch((err) => {
            console.log(err);
            // localStorage.clear();
          });
      }
    },
  },
  mounted() {
    this.width = $(document).width();

    axios
      .get(this.url + "tugas/superadmin/tugas/list-gugus", {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        console.log(res);
        this.dataGugus = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
