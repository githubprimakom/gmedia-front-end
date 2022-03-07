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
                  Preview Tugas
                </div>
              </div>
              <router-link
                :to="{
                  name: 'Manage Kursus Tugas Soal',
                  params: {
                    id: $route.params.id,
                    topic: $route.params.topic,
                    task: $route.params.task,
                  },
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
              <div class="card-body">
                <MultipleChoice v-if="types[now] == 'multiple choice'" />
                <Matching v-if="types[now] == 'matching'" />
                <Short v-if="types[now] == 'short'" />
                <Essay v-if="types[now] == 'essay'" />
                <Upload v-if="types[now] == 'upload'" />
                <div
                  class="d-flex flex-column flex-md-row justify-content-between pt-5"
                >
                  <button
                    class="btn btn-secondary px-4 mb-3 mb-md-0"
                    type="button"
                    @click="prev"
                    :disabled="now == 0"
                  >
                    Sebelumnya
                  </button>
                  <router-link
                    :to="{
                      name: 'Manage Kursus Tugas Soal',
                      params: {
                        id: $route.params.id,
                        topic: $route.params.topic,
                        task: $route.params.task,
                      },
                    }"
                    class="btn btn-danger px-4"
                    @click="finish"
                    v-if="now + 1 == types.length"
                  >
                    Selesai
                  </router-link>
                  <button
                    :class="
                      `btn btn-primary px-4 ${
                        now == types.length ? 'd-none' : ''
                      }`
                    "
                    type="button"
                    @click="next"
                    v-else
                  >
                    Selanjutnya
                  </button>
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
import NavbarManageKursus from "../../../../../../../components/NavbarManageKursus.vue";
import Essay from "../../../../../../../components/Question/Preview/Essay.vue";
import Matching from "../../../../../../../components/Question/Preview/Matching.vue";
import MultipleChoice from "../../../../../../../components/Question/Preview/MultipleChoice.vue";
import Short from "../../../../../../../components/Question/Preview/Short.vue";
import Upload from "../../../../../../../components/Question/Preview/Upload.vue";

export default {
  data: function() {
    return {
      width: null,
      types: ["upload", "essay", "short", "matching", "multiple choice"],
      now: 0,
    };
  },
  components: {
    NavbarManageKursus,
    Essay,
    Matching,
    MultipleChoice,
    Short,
    Upload,
  },
  methods: {
    next() {
      this.now++;
    },
    prev() {
      this.now--;
    },
    finish() {
      alert("Selesai");
    },
  },
  mounted() {
    this.width = $(document).width();
    $(() => {
      //
    });
  },
};
</script>
