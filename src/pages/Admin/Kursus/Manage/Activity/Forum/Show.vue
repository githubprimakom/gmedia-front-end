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
                  Forum Diskusi
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
            <div class="card-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
              commodi iure consequuntur ratione ipsam neque officia magnam
              repellendus unde, dicta sed blanditiis suscipit harum nostrum
              aliquid assumenda, aliquam ad deserunt?
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 mb-3">
            <div class="card-shadow mb-3">
              <div class="p-3">
                <button
                  class="btn btn-success mb-2"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#create"
                >
                  <i class="fas fa-plus me-2"></i> Tambah
                </button>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">NO</th>
                        <th scope="col">DISKUSI</th>
                        <th scope="col" class="text-center">OLEH</th>
                        <th scope="col" class="text-center">BALASAN</th>
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
                          <router-link
                            :to="{
                              name: 'Manage Kursus Topik Diskusi Forum',
                              params: {
                                id: $route.params.id,
                                topic: $route.params.topic,
                                forum: $route.params.forum,
                                discuss: 1,
                              },
                            }"
                          >
                            Bahasa pemrograman Backend
                          </router-link>
                        </td>
                        <td class="text-center">
                          <div class="d-flex juctify-content-between">
                            <img
                              src="https://sia.uty.ac.id/fotokecil/3183111056.jpg"
                              alt=""
                              width="50"
                              class="me-2 mb-2"
                            />
                            <div class="main-text text-start">
                              adityaric72@gmail.com
                              <br />
                              20 Januari 2022, 10:10
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="main-text">
                            2
                          </div>
                        </td>
                        <td>
                          <div class="d-flex justify-content-center">
                            <button
                              class="btn btn-warning btn-sm text-white me-1"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#edit"
                            >
                              <i class="fas fa-cog"></i>
                            </button>
                            <button
                              class="btn btn-danger btn-sm text-white me-1"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#delete"
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
        <!-- MODAL CREATE -->
        <div
          class="modal fade"
          id="create"
          tabindex="-1"
          aria-labelledby="createLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <h5 class="card-title fw-bold">Buat Diskusi</h5>
                <hr />
                <div class="row">
                  <div class="col-lg-12 mb-3">
                    <label for="diskusi-create" class="form-label"
                      >Diskusi</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="diskusi-create"
                    />
                  </div>
                  <div class="col-lg-12 mb-3">
                    <label for="deskripsi-create" class="form-label"
                      >Deskripsi</label
                    >
                    <VueEditor />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <button class="btn btn-primary">Simpan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- MODAL CREATE -->
        <!-- MODAL EDIT -->
        <div
          class="modal fade"
          id="edit"
          tabindex="-1"
          aria-labelledby="editLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <h5 class="card-title fw-bold">Ubah Diskusi</h5>
                <hr />
                <div class="row">
                  <div class="col-lg-12 mb-3">
                    <label for="diskusi-edit" class="form-label">Diskusi</label>
                    <input type="text" class="form-control" id="diskusi-edit" />
                  </div>
                  <div class="col-lg-12 mb-3">
                    <label for="deskripsi-edit" class="form-label"
                      >Deskripsi</label
                    >
                    <VueEditor />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <button class="btn btn-primary">Simpan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- MODAL EDIT -->
        <!-- MODAL DELETE -->
        <div
          class="modal fade"
          id="delete"
          tabindex="-1"
          aria-labelledby="deleteLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <h5 class="card-title fw-bold">Hapus Diskusi</h5>
                <hr />
                <p>Hapus semua komentar yang ada didalam diskusi?</p>
                <div class="row">
                  <div class="col-lg-4">
                    <button class="btn btn-danger">Hapus</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- MODAL DELETE -->
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import NavbarManageKursus from "../../../../../../components/NavbarManageKursus.vue";
import { VueEditor } from "vue2-editor";

export default {
  data: function() {
    return {
      width: null,
    };
  },
  components: {
    VueEditor,
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

<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
</style>
