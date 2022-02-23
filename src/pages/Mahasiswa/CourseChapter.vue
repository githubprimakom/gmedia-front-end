<template>
  <div class="dashboard">
    <NavbarMahasiswa :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-2">
            <div class="card-body">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item h6">
                    <a href="#">Kursus Saya</a>
                  </li>
                  <li class="breadcrumb-item h6">
                    <a href="#">Belajar Dasar Pemrograman Javascript</a>
                  </li>
                  <li class="breadcrumb-item h6 active" aria-current="page">
                    Persetujuan Hak Cipta
                  </li>
                </ol>
              </nav>
              <hr />
              <div class="row">
                <div class="col-lg-3 mb-3">
                  <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse-1"
                          aria-expanded="true"
                          aria-controls="collapse-1"
                        >
                          <div class="h5">Persiapan Belajar</div>
                        </button>
                      </h2>
                      <div
                        id="collapse-1"
                        class="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <ul class="list-group list-group-flush">
                            <li
                              class="list-group-item d-flex justify-content-between align-items-center"
                            >
                              <router-link
                                :to="{
                                  name: 'Course Chapter',
                                  params: {
                                    id: '413d2ba-4494e2cb5-83e6b3e4a-8b094',
                                    chapter:
                                      '413d2ba-4494e2cb5-83e6b3e4a-8b094',
                                  },
                                }"
                                >1. Persetujuan Hak Cipta</router-link
                              >
                            </li>
                            <li
                              class="list-group-item d-flex justify-content-between align-items-center"
                            >
                              2. Materi Android Pemula
                            </li>
                            <li
                              class="list-group-item d-flex justify-content-between align-items-center"
                            >
                              3. Mekanisme Belajar
                            </li>
                            <li
                              class="list-group-item d-flex justify-content-between align-items-center"
                            >
                              4. Forum Diskusi
                            </li>
                            <li
                              class="list-group-item d-flex justify-content-between align-items-center"
                            >
                              5. Glosarium
                            </li>
                            <li
                              class="list-group-item d-flex justify-content-between align-items-center"
                            >
                              6. Daftar Referensi
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingThree">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse-2"
                          aria-expanded="false"
                          aria-controls="collapse-2"
                        >
                          <div class="h5">Penutup</div>
                        </button>
                      </h2>
                      <div
                        id="collapse-2"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <ul class="list-group list-group-flush">
                            <li
                              class="list-group-item d-flex justify-content-between align-items-center"
                            >
                              1. Ujian Akhir
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-9">
                  <div class="card">
                    <div class="card-body">
                      <div class="h5 fw-bold">
                        Pengenalan Fundamentals JavaScript
                      </div>
                      <div class="row my-4">
                        <div class="col-lg-12">
                          <video controls style="width: 100%;">
                            <source
                              :src="'https://w3school.com/html/mov_bbb.mp4'"
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      </div>
                      <p>
                        Setelah kita mengetahui apa itu JavaScript dan sejarah
                        singkat di baliknya, pada modul ini Anda akan mulai
                        menuliskan kode JavaScript pertama. Sudah tidak sabar,
                        bukan? Yuk, kita mulai belajar.
                      </p>
                      <p>Pada akhir modul ini, Anda diharapkan dapat:</p>
                      <ul>
                        <li>
                          Menuliskan kode JavaScript dan menampilkannya ke
                          konsol
                        </li>
                        <li>
                          Memahami penggunaan komentar pada kode
                        </li>
                        <li>
                          Memahami konsep variabel pada JavaScript
                        </li>
                        <li>
                          Memahami beberapa jenis tipe data pada JavaScript
                        </li>
                        <li>
                          Mengenal operator pada JavaScript dan bagaimana
                          menggunakannya
                        </li>
                        <li>
                          Memahami konsep percabangan pada pemrograman
                        </li>
                        <li>Memahami konsep perulangan pada pemrograman</li>
                      </ul>
                      <p>
                        Apabila sudah memahami materi, anda dapat mengerjakan
                        tugas
                        <router-link
                          :to="{
                            name: 'Do Tugas',
                            params: {
                              id: '1f6a5840-fbe8-4da3-9e5a-095ee962ecb6',
                            },
                          }"
                          class="badge bg-danger text-decoration-none text-white"
                          >DI SINI</router-link
                        >.
                      </p>
                      <hr />
                      <div class="row">
                        <div class="col-lg-6">
                          <a href="#" class="btn btn-outline-secondary"
                            >Sebelumnya</a
                          >
                        </div>
                        <div class="col-lg-6 text-end">
                          <a href="#" class="btn btn-primary">Selanjutnya</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
