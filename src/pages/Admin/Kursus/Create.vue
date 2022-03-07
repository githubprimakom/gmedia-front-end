<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div class="title-content">
                  Tambah Kursus
                </div>
              </div>
              <router-link
                :to="{ name: 'Kursus Master' }"
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
                      <label for="level" class="form-label">Level</label>
                      <select
                        class="form-select my-select-2"
                        aria-label="Default select example"
                        id="level"
                      >
                        <option selected>Pilih Level</option>
                        <option value="1">Mudah</option>
                        <option value="2">Menengah</option>
                        <option value="3">Sulit</option>
                      </select>
                    </div>
                    <div class="col-lg-4 mb-2">
                      <label for="kategori" class="form-label">Kategori</label>
                      <select
                        class="form-select my-select-2"
                        aria-label="Default select example"
                        id="kategori"
                      >
                        <option>Pilih Kategori</option>
                        <option value="1">Mudah</option>
                        <option value="2">Menengah</option>
                        <option value="3">Sulit</option>
                      </select>
                    </div>
                    <div class="col-lg-4 mb-2">
                      <label for="mulai" class="form-label">Mulai</label>
                      <input
                        type="date"
                        class="form-control material-datepicker"
                        id="mulai"
                        aria-describedby="mulai"
                      />
                    </div>
                    <div class="col-lg-4 mb-2">
                      <label for="selesai" class="form-label">Selesai</label>
                      <input
                        type="date"
                        class="form-control material-datepicker"
                        id="selesai"
                        aria-describedby="selesai"
                      />
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
                      <label for="deskripsi" class="form-label"
                        >Deskripsi</label
                      >
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
                      <router-link
                        :to="{ name: 'Manage Kursus Index', params: { id: 1 } }"
                        class="btn btn-primary"
                      >
                        Simpan
                      </router-link>
                      <!-- <button type="submit" class="btn btn-primary">
                        Simpan
                      </button> -->
                    </div>
                  </div>
                </form>
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
import { VueEditor } from "vue2-editor";

export default {
  data: function() {
    return {
      width: null,
    };
  },
  components: {
    VueEditor,
  },
  mounted() {
    this.width = $(document).width();
    $(() => {
      setTimeout(() => {
        $(".my-select-2").select2({
          theme: "bootstrap-5",
        });
        $(".material-datepicker").bootstrapMaterialDatePicker({
          format: "YYYY-MM-DD HH:mm",
          time: false,
        });
      }, 500);
    });
  },
};
</script>

<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
</style>
