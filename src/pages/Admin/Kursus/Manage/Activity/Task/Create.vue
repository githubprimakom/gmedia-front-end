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
                  Buat Tugas
                </div>
              </div>
              <router-link
                :to="{
                  name: 'Manage Kursus Lihat Topik',
                  params: { id: $route.params.id, topic: $route.params.topic },
                }"
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
                    <div class="col-lg-12 mb-2">
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
                    <div class="col-lg-4 mb-2">
                      <label for="mulai" class="form-label">Mulai</label>
                      <input
                        type="date"
                        class="form-control material-datepicker"
                        id="mulai"
                        aria-describedby="mulai"
                      />
                    </div>
                    <div class="col-lg-2 mb-2">
                      <label class="form-label">&nbsp;</label>
                      <input
                        type="time"
                        class="form-control"
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
                    <div class="col-lg-2 mb-2">
                      <label class="form-label">&nbsp;</label>
                      <input
                        type="time"
                        class="form-control"
                        aria-describedby="mulai"
                      />
                    </div>
                    <div class="col-lg-12 mb-2">
                      <label for="deskripsi" class="form-label"
                        >Deskripsi</label
                      >
                      <VueEditor />
                    </div>
                    <div class="col-lg-12">
                      <button type="submit" class="btn btn-primary">
                        Simpan
                      </button>
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
        // $(".material-datepicker").bootstrapMaterialDatePicker({
        //   format: "YYYY-MM-DD HH:mm",
        //   time: false,
        // });
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
