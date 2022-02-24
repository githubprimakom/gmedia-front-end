<template>
  <div class="dashboard">
    <NavbarManageKursus :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-2">
          <div class="p-3">
            <div class="d-flex justify-content-between">
              <div
                class="d-flex flex-column justify-content-between"
                style="min-height: 180px;"
              >
                <div>
                  <div style="font-size: 22px; font-weight: 700;">
                    Belajar Fundamental Aplikasi Back-End
                  </div>
                  <div class="d-flex align-items-center mt-1">
                    <i
                      class="far fa-calendar-alt"
                      style="font-size: 20px; margin-right: 8px; opacity: 0.8;"
                    ></i>
                    <div
                      style="font-size: 18px; font-weight: 500; opacity: 0.8;"
                    >
                      12 Maret 2022 - 12 Maret 2023
                    </div>
                  </div>
                </div>
                <div>
                  <div class="d-flex align-items-center mt-5">
                    <i
                      class="fas fa-eye"
                      style="font-size: 20px; margin-right: 8px; opacity: 0.8;"
                    ></i>
                    Terbit
                  </div>
                </div>
              </div>
              <div
                style="background-color: rgba(196, 221, 255, 0.35); margin: -16px; padding: 25px 20px 25px 21px; border-radius: 120px 7px 7px; align-self: flex-end;"
              >
                <img
                  src="/assets/images/event-header.svg"
                  alt=""
                  style="transform: scaleX(-1); height: 100px;"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card shadow border-0">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div class="title-content">
                  Belajar Fundamental Aplikasi Back-End
                </div>
              </div>
              <button class="btn btn-info text-white" type="button">
                <i class="fas fa-copy"></i> Salin Link Kursus
              </button>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-4">
                <img
                  src="https://glints.com/id/lowongan/wp-content/uploads/2019/12/code-coding-computer-data-574070-1.jpg"
                  alt=""
                  class="img-fluid"
                />
              </div>
              <div class="col-lg-8">
                <p>
                  Back-End Developer memiliki peran penting dalam membangun
                  sistem aplikasi, karena ia bertanggung jawab membuat service
                  yang dapat mengelola serta mengamankan data yang digunakan
                  oleh suatu aplikasi. Pengelolaan yang tidak baik dan tidak
                  aman akan menimbulkan banyak kerugian bagi perusahaan, bahkan
                  bisa memicu kebangkrutan. Kelas ini membahas tuntas materi
                  dalam membangun RESTful service yang canggih dan aman seperti
                  database, storage, hingga authentication, dan authorization.
                </p>
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
import NavbarManageKursus from "../../../../components/NavbarManageKursus.vue";

export default {
  data: function() {
    return {
      width: null,
    };
  },
  components: {
    NavbarManageKursus,
  },
  methods: {},
  mounted() {
    this.width = $(document).width();
    $(() => {
      //
    });
  },
};
</script>
