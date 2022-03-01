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
                  Ubah Soal {{ $route.query.tipe }}
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
              <div class="p-3" v-if="$route.query.tipe == 'MULTIPLE CHOICE'">
                <MultipleChoice />
              </div>
              <div class="p-3" v-if="$route.query.tipe == 'MATCHING'">
                <Matching />
              </div>
              <div class="p-3" v-if="$route.query.tipe == 'SHORT'">
                <Short />
              </div>
              <div class="p-3" v-if="$route.query.tipe == 'ESSAY'">
                <Essay />
              </div>
              <div class="p-3" v-if="$route.query.tipe == 'UPLOAD'">
                <Upload />
              </div>
              <div class="p-3 text-center" v-else>
                Salah Tipe Soal
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
import Essay from "../../../../../../../components/Question/Edit/Essay.vue";
import Matching from "../../../../../../../components/Question/Edit/Matching.vue";
import MultipleChoice from "../../../../../../../components/Question/Edit/MultipleChoice.vue";
import Short from "../../../../../../../components/Question/Edit/Short.vue";
import Upload from "../../../../../../../components/Question/Edit/Upload.vue";

export default {
  data: function() {
    return {
      width: null,
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
  mounted() {
    this.width = $(document).width();
    $(() => {
      //
    });
  },
};
</script>
