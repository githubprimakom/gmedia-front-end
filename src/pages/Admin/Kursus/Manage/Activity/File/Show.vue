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
                  File
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
            <hr />
            <div class="row">
              <div class="col-lg-12">
                <video controls style="width: 100%;">
                  <source
                    :src="'https://w3school.com/html/mov_bbb.mp4'"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
            <div class="card-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
              commodi iure consequuntur ratione ipsam neque officia magnam
              repellendus unde, dicta sed blanditiis suscipit harum nostrum
              aliquid assumenda, aliquam ad deserunt?
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

export default {
  data: function() {
    return {
      width: null,
    };
  },
  components: {
    NavbarManageKursus,
  },
  mounted() {
    this.width = $(document).width();
    $(() => {
      //
    });
  },
};
</script>
