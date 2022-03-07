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
                  Meet
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
            <div class="row mb-2">
              <div class="col-lg-12">
                <a
                  href="https://zoom.us"
                  class="btn btn-primary"
                  target="_blank"
                >
                  <i class="fas fa-sign-in"></i> Klik untuk mengikuti
                </a>
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
