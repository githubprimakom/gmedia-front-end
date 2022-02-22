<template>
  <div class="dashboard">
    <NavbarMahasiswa :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-5">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="title-content">List Kursus</div>
                <div class="title-type-soal">
                  Kursus
                </div>
              </div>
              <div>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Status
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Berjalan</a></li>
                    <li><a class="dropdown-item" href="#">Selesai</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-6">
            <router-link
              :to="{
                name: 'My Course Detail',
                params: { id: '413d2ba-4494e2cb5-83e6b3e4a-8b094' },
              }"
              class="text-decoration-none text-dark"
            >
              <div class="card-shadow mb-3">
                <div class="p-3">
                  <div class="mb-4">
                    <div
                      class="img-question d-flex align-items-center justify-content-center"
                    >
                      <img
                        src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/72/413d2ba4494e2cb583e6b3e4a8b094/Logotipo_1.jpg"
                        alt=""
                        class="w-100"
                      />
                    </div>
                  </div>
                  <div>
                    <h6>Cybersecurity Awareness and Innovation</h6>
                    <p
                      style="font-size: 16px; font-weight: 300; display: -webkit-box; overflow: hidden !important; -webkit-line-clamp: 3; -webkit-box-orient: vertical;"
                    >
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Corporis sapiente deleniti, ...
                    </p>
                  </div>
                  <hr />
                  <div
                    class="d-flex justify-content-between align-items-center mb-n2"
                  >
                    <span>Disusun oleh</span>
                    <span>Aditya</span>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Level</span>
                    <span>Pemula</span>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>Progress</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["url"]),
  },
  data: function() {
    return {
      width: null,
      dataMateri: null,
    };
  },
  mounted() {
    this.width = $(document).width();
  },
};
</script>
