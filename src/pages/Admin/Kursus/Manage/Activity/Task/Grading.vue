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
                  Penilaian Tugas Pertama
                </div>
              </div>
              <router-link
                :to="{
                  name: 'Manage Kursus Topik Lihat Tugas',
                  params: {
                    id: $route.params.id,
                    topic: $route.params.topic,
                    task: $route.params.task,
                  },
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
                <div class="row">
                  <div class="col-lg-4">
                    <div class="row">
                      <div class="col-lg-12">
                        Kursus : Belajar Fundamental Aplikasi Back-End
                      </div>
                      <div class="col-lg-12">
                        Topik : Topik 1
                      </div>
                      <div class="col-lg-12">
                        Tugas : Tugas pertama
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <hr class="d-lg-none my-3" />
                    <div class="d-flex">
                      <img
                        src="https://sia.uty.ac.id/fotokecil/3183111056.jpg"
                        alt=""
                        class="img-fluid me-3"
                        width="50px"
                      />
                      <div>
                        <div class="col-12">Aditya Ricki Julianto</div>
                        <div class="col-12">adityaric72@gmail.com</div>
                        <div class="col-12">
                          Dikumpulkan pada 22 Februari 2022, 10:10
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <hr class="d-lg-none my-3" />
                    <div class="row">
                      <div class="col-lg-10">
                        <label for="cari_peserta" class="form-label"
                          ><i class="fas fa-search me-3"></i>Cari</label
                        >
                        <select
                          class="form-select my-select"
                          aria-label="Default select example"
                        >
                          <option value="1">Aditya</option>
                          <option value="2">Ricki</option>
                          <option value="3">Julianto</option>
                          <option value="3">Mela</option>
                          <option value="3">Sintiya</option>
                          <option value="3">Dewi</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <!-- PILIHAN GANDA -->
                  <div class="col-lg-12">
                    <table class="table border-0">
                      <tr>
                        <td class="text-danger">
                          1. Pertanyaan PG? (Jawaban salah)
                        </td>
                      </tr>
                      <tr>
                        <td><i class="far fa-circle me-2"></i>Jawaban 1</td>
                      </tr>
                      <tr>
                        <td>
                          <i class="fas fa-times text-danger me-2"></i>Jawaban 2
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i class="fas fa-check me-2 text-success"></i>Jawaban
                          3
                        </td>
                      </tr>
                      <tr>
                        <td><i class="far fa-circle me-2"></i>Jawaban 4</td>
                      </tr>
                      <tr>
                        <td><i class="far fa-circle me-2"></i>Jawaban 5</td>
                      </tr>
                    </table>
                  </div>
                  <!-- MATCHING -->
                  <div class="col-lg-12">
                    <table class="table border-0 table-hovered">
                      <tr>
                        <td>
                          2. Pertanyaan cocok?
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i class="fas fa-check text-success me-2"></i>A
                          <i class="fas fa-arrow-right"></i> A
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i class="fas fa-check text-success me-2"></i>B
                          <i class="fas fa-arrow-right"></i> B
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i class="fas fa-times text-danger me-2"></i>C
                          <i class="fas fa-arrow-right"></i> B
                          <span class="text-success"
                            >(C <i class="fas fa-arrow-right"></i> C)</span
                          >
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!-- ESSAY -->
                  <div class="col-lg-12">
                    <table class="table border-0 table-hovered">
                      <tr>
                        <td>
                          3. Pertanyaan Esai?
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Earum consectetur nihil vitae corrupti
                          reprehenderit beatae, est veniam eum suscipit, tempore
                          soluta quos accusamus at assumenda perspiciatis
                          officia, vel eligendi dolorum!
                        </td>
                      </tr>
                    </table>

                    <div class="row">
                      <div class="col-lg-2">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nilai nomor 3"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- SHORT QUESTION -->
                  <div class="col-lg-12">
                    <table class="table border-0 table-hovered">
                      <tr>
                        <td class="text-success">
                          4. Pertanyaan Esai Pendek? (Jawaban benar)
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i class="fas fa-check text-success me-2"></i> ipsum
                          dolor!
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!-- FILE QUESTION -->
                  <div class="col-lg-12">
                    <table class="table border-0 table-hovered">
                      <tr>
                        <td>
                          5. Pertanyaan Dokumen?
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#" class="text-primary"
                            ><i class="fas fa-file"></i> Lihat</a
                          >
                        </td>
                      </tr>
                    </table>

                    <div class="row">
                      <div class="col-lg-2">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nilai nomor 4"
                        />
                      </div>
                    </div>
                  </div>
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
      $(".my-select").select2({
        placeholder: "Cari Peserta",
        theme: "bootstrap-5",
      });
    });
  },
};
</script>
