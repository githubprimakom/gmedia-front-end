<template>
  <div class="dashboard">
    <NavbarManageKursus :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-2">
          <div class="p-3">
            <form>
              <div class="row">
                <div class="col-lg-6 mb-2">
                  <label for="judul" class="form-label">Judul</label>
                  <input
                    type="text"
                    class="form-control"
                    id="judul"
                    aria-describedby="judul"
                  />
                  <div id="judul" class="form-text text-danger">
                    Lorem ipsum dolor sit amet, consectetur adipisicing
                  </div>
                </div>
                <div class="col-lg-6 mb-2">
                  <label for="sampul" class="form-label">Sampul</label>
                  <input
                    type="file"
                    class="form-control dropify"
                    id="sampul"
                    aria-describedby="sampul"
                  />
                  <div id="judul" class="form-text text-danger">
                    Lorem ipsum dolor sit amet, consectetur adipisicing
                  </div>
                </div>
                <div class="col-lg-12 mb-2">
                  <label for="deskripsi_singkat" class="form-label"
                    >Deskripsi Singkat</label
                  >
                  <textarea
                    id="deskripsi_singkat"
                    cols="30"
                    rows="2"
                    maxlength="255"
                    class="form-control"
                  ></textarea>
                  <div class="form-text text-danger">
                    Maksimal 255 karakter
                  </div>
                </div>
                <div class="col-lg-12 mb-2">
                  <label for="deskripsi" class="form-label">Deskripsi</label>
                  <VueEditor />
                </div>
                <div class="col-lg-6 mb-2">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="exampleCheck1"
                    />
                    <label class="form-check-label" for="exampleCheck1"
                      >Ceklis untuk menerbitkan kursus ini</label
                    >
                  </div>
                </div>
                <div class="col-lg-12">
                  <button type="submit" class="btn btn-primary me-2">
                    Simpan
                  </button>
                  <router-link
                    :to="{
                      name: 'Manage Kursus Lihat Topik',
                      params: { id: 1, topic: 2 },
                    }"
                    class="btn btn-outline-secondary"
                  >
                    Batal
                  </router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import NavbarManageKursus from "../../../../components/NavbarManageKursus.vue";
import { VueEditor } from "vue2-editor";

export default {
  data: function() {
    return {
      width: null,
    };
  },
  components: {
    NavbarManageKursus,
    VueEditor,
  },
  methods: {},
  mounted() {
    this.width = $(document).width();
    $(() => {
      setTimeout(() => {
        $(".dropify").dropify({
          messages: {
            default: "Unggah file",
            replace: "Timpa dan file",
            remove: "hapus",
            error: "Ooops, telah terjadi kesalahan.",
          },
        });
      }, 500);
    });
  },
};
</script>
