<template>
  <div class="dashboard">
    <NavbarMahasiswa :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-4">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="title-content">Detail Materi</div>
                <div class="title-type-soal">
                  {{ dataMateri ? dataMateri.judul : "@judul" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center" v-if="!dataMateri">
          <div class="card-shadow">
            <div class="px-5 py-3">
              <Loader text="Sedang memuat data materi." />
            </div>
          </div>
        </div>
        <div class="row mb-4" v-else>
          <div class="col-lg-12">
            <div class="card-shadow">
              <img :src="dataMateri.cover_url" class="card-img-top" alt="..." />
              <div class="card-body p-3">
                <div class="row">
                  <div class="h5 col-2">Judul</div>
                  <div class="h5 col-10">{{ dataMateri.judul }}</div>
                </div>
                <div class="row">
                  <div class="h5 col-2">Tipe</div>
                  <div class="h5 col-10">{{ dataMateri.tipe }}</div>
                </div>
                <div class="row">
                  <div class="h5 col-2">Kompetensi</div>
                  <div class="h5 col-10">{{ dataMateri.kompetensi }}</div>
                </div>
                <div class="row">
                  <div class="h5 col-2">Metode</div>
                  <div class="h5 col-10">{{ dataMateri.metode }}</div>
                </div>
                <div class="row">
                  <div class="h5 col-2">Level</div>
                  <div class="h5 col-10">{{ dataMateri.level }}</div>
                </div>
                <div class="row" v-if="dataMateri.file">
                  <div class="h5 col-2">File</div>
                  <div class="h5 col-10">
                    <a
                      :href="dataMateri.file_url"
                      class="btn btn-primary btn-sm"
                      target="_blank"
                      ><i class="fas fa-external-link-alt"></i> File.{{
                        dataMateri.extension
                      }}</a
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="h5 col-2">Isi</div>
                  <div class="col-10" v-html="dataMateri.isi"></div>
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
import moment from "moment";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["url"]),
  },
  data: function() {
    return {
      width: null,
      dataMateri: null,
    };
  },
  methods: {
    formatDate(date) {
      return moment(date)
        .locale("id")
        .format("DD MMM YY");
    },
  },
  mounted() {
    axios
      .get(`${this.url}tugas/mahasiswa/materi/${this.$route.params.id}`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        console.log(res);
        this.dataMateri = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.width = $(document).width();

    $(document).ready(function() {
      $(".table").DataTable();
    });
  },
};
</script>
