<template>
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
      <div class="col-lg-12 mb-2">
        <label for="pertanyaan" class="form-label">Pertanyaan</label>
        <VueEditor />
      </div>
      <div class="col-lg-10">
        <label for="bobot" class="mb-0"
          >Jawaban Soal <span class="text-info">*</span></label
        >
        <div style="font-weight: 300;">Tandai jawaban yang benar</div>
        <div class="mt-3">
          <div
            class="d-flex align-items-center mb-3"
            v-for="(item, id) in form.jawaban"
            :key="id"
          >
            <input
              :class="`form-control`"
              type="text"
              v-model="item.pertanyaan"
              :placeholder="`Pertanyaan ${dataLetter[id].toUpperCase()}`"
            />
            <i class="fas fa-arrows-alt-h mx-3"></i>
            <input
              :class="`form-control`"
              type="text"
              v-model="item.jawaban"
              :placeholder="`Jawaban ${dataLetter[id].toUpperCase()}`"
            />
            <i class="fas fa-equals mx-3"></i>
            <input
              :class="`form-control`"
              type="number"
              min="1"
              v-model="item.nilai"
              :placeholder="`Nilai ${dataLetter[id].toUpperCase()}`"
            />
          </div>
          <div class="row pt-2">
            <div class="col-lg-6">
              <button
                :class="
                  `btn ${
                    form.jawaban.length == 2
                      ? 'btn-outline-secondary'
                      : 'btn-outline-danger'
                  } w-100`
                "
                type="button"
                @click="deleteJawaban"
                :disabled="form.jawaban.length == 2"
              >
                - Hapus
              </button>
            </div>
            <div class="col-lg-6">
              <button
                :class="
                  `btn ${
                    form.jawaban.length == 8
                      ? 'btn-outline-secondary'
                      : 'btn-outline-success'
                  } w-100`
                "
                type="button"
                @click="addJawaban"
              >
                + Tambah
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <hr />
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
      dataLetter: [],
      form: {
        jawaban: [],
        benar: null,
      },
    };
  },
  components: {
    VueEditor,
  },
  methods: {
    addJawaban() {
      this.form.jawaban.push({
        pertanyaan: "",
        jawaban: "",
        nilai: 0,
      });
    },
    deleteJawaban() {
      this.form.jawaban.pop();
    },
  },
  mounted() {
    this.width = $(document).width();
    $(() => {
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
      this.dataLetter = alphabet;

      for (let i = 0; i < 4; i++) {
        this.form.jawaban.push({
          pertanyaan: "",
          jawaban: "",
          nilai: 0,
        });
      }
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
