<template>
  <div class="dashboard">
    <NavbarManageKursus :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div class="title-content">
                  Ubah File
                </div>
              </div>
              <router-link
                :to="{
                  name: 'Manage Kursus Lihat Topik',
                  params: { id: $route.params.id, topic: $route.params.topic },
                }"
                class="btn btn-success"
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
                      <label for="nama" class="form-label">Nama</label>
                      <input
                        type="text"
                        class="form-control"
                        id="nama"
                        aria-describedby="nama"
                      />
                      <div id="nama" class="form-text text-danger">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                      </div>
                    </div>
                    <div class="col-lg-6 mb-2">
                      <label for="file" class="form-label">File</label>
                      <input
                        type="file"
                        class="form-control dropify"
                        id="file"
                        aria-describedby="file"
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
import NavbarManageKursus from "../../../../../../components/NavbarManageKursus.vue";
import { VueEditor } from "vue2-editor";

export default {
  data: function() {
    return {
      width: null,
    };
  },
  components: {
    VueEditor,
    NavbarManageKursus,
  },
  mounted() {
    this.width = $(document).width();
    $(() => {
      setTimeout(() => {
        $(".dropify").dropify();
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
