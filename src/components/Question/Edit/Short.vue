<template>
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
        <label for="nilai" class="form-label">Nilai</label>
        <input
          type="number"
          class="form-control"
          id="nilai"
          aria-describedby="nilai"
        />
      </div>
      <div class="col-lg-12 mb-2">
        <label for="pertanyaan" class="form-label">Pertanyaan</label>
        <VueEditor />
      </div>
      <div class="col-lg-12">
        <router-link
          :to="{
            name: 'Manage Kursus Tugas Soal',
            params: { id: 1, topic: 2, task: 1 },
          }"
          type="submit"
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
      //
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
