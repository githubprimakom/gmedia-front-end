<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div class="title-content">
                  Kursus
                </div>
              </div>
              <router-link
                :to="{ name: 'Tambah Kursus' }"
                class="btn btn-success"
                type="button"
              >
                + Tambah Kursus
              </router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 mb-3">
            <div class="card-shadow mb-3">
              <div class="p-3">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">NO</th>
                        <th scope="col">JUDUL</th>
                        <th scope="col" class="text-center">DIBUAT</th>
                        <th scope="col" class="text-center">LEVEL</th>
                        <th scope="col" class="text-center">KATEGORI</th>
                        <th scope="col" class="text-center">MULAI - SELESAI</th>
                        <th scope="col" class="text-center">TERBIT</th>
                        <th scope="col" class="text-center">PENGAMPU</th>
                        <th scope="col" class="text-center">AKSI</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="align-middle">
                        <td>
                          <p class="text-td">
                            1
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            Belajar Fundamental Aplikasi Back-End
                          </p>
                        </td>
                        <td class="text-center">
                          <div>
                            <div class="main-text">
                              20 Juni 2021, 10:00
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-td">
                            Menengah
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            Cloud Computing
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            20 Juni 2021, 10:00 - 20 Juni 2022, 10:00
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            YES
                          </p>
                        </td>
                        <td>
                          <p class="text-td">
                            ADITYA
                          </p>
                        </td>
                        <td>
                          <div class="d-flex justify-content-center">
                            <router-link
                              :to="{
                                name: 'Manage Kursus Index',
                                params: { id: 1 },
                              }"
                              class="
                                btn btn-primary btn-sm me-2
                              "
                              ><i class="fas fa-eye"></i
                            ></router-link>
                            <button
                              class="btn btn-danger btn-sm text-white"
                              type="button"
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default {
  data: function() {
    return {
      width: null,
    };
  },
  methods: {},
  mounted() {
    setTimeout(() => {
      $(".table").DataTable({
        ordering: false,
      });
    }, 500);
    this.width = $(document).width();
  },
};
</script>
