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
                  Bahasa pemrograman Backend
                </div>
              </div>
              <router-link
                :to="{
                  name: 'Manage Kursus Topik Lihat Forum',
                  params: {
                    id: $route.params.id,
                    topic: $route.params.topic,
                    forum: $route.params.forum,
                  },
                }"
                class="btn btn-outline-secondary"
                type="button"
              >
                <i class="fas fa-arrow-left"></i> Kembali
              </router-link>
            </div>
            <hr />
            <div class="card-text mb-2">
              <i class="fas fa-user me-2"></i> Aditya Ricki
              <i class="fas fa-graduation-cap mx-2"></i> Forum Diskusi
              <i class="fas fa-calendar-alt mx-2"></i>20 Januari 2022, 10:10
            </div>
            <div class="card-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
              commodi iure consequuntur ratione ipsam neque officia magnam
              repellendus unde, dicta sed blanditiis suscipit harum nostrum
              aliquid assumenda, aliquam ad deserunt?
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-12 mb-3">
                <div class="row">
                  <div class="col-lg-12 mb-2">
                    <VueEditor />
                  </div>
                  <div class="col-lg-12 mb-2">
                    <button class="btn btn-primary">Kirim Komentar</button>
                  </div>
                </div>
                <hr class="d-lg-none" />
              </div>
              <div class="col-lg-12 mb-3">
                <div class="row mb-2">
                  <div class="col-lg-12">
                    <div class="card bg-light border-0" id="parent-1">
                      <div class="card-body">
                        <h5 class="card-subtitle fw-bold mb-2">
                          <img
                            src="https://d17ivq9b7rppb3.cloudfront.net/small/avatar/pp.jpg"
                            alt="Putri Nur Fadillah avatar"
                            width="42"
                            height="42"
                            class="rounded-circle me-2"
                          />
                          Aditya Ricki . <i>1 jam yang lalu</i>
                        </h5>
                        <p class="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <a
                          href="#"
                          class="card-link"
                          data-bs-toggle="modal"
                          data-bs-target="#reply"
                        >
                          Balas
                        </a>
                        <a
                          href="#"
                          class="card-link"
                          data-bs-toggle="modal"
                          data-bs-target="#edit"
                        >
                          Ubah
                        </a>
                        <a
                          href="#"
                          class="card-link"
                          data-bs-toggle="modal"
                          data-bs-target="#delete"
                        >
                          Hapus
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-lg-12">
                    <div class="card bg-light border-0" id="parent-2">
                      <div class="card-body">
                        <h5 class="card-subtitle fw-bold mb-2">
                          <img
                            src="https://d17ivq9b7rppb3.cloudfront.net/small/avatar/pp.jpg"
                            alt="Putri Nur Fadillah avatar"
                            width="42"
                            height="42"
                            class="rounded-circle me-2"
                          />
                          Mela Sintiya . <i>55 menit yang lalu</i>
                        </h5>
                        <a
                          class="text-primary small replies"
                          href="#parent-1"
                          data-id="#parent-1"
                          id="child-1-parent-1"
                          >Re : Some quick example text to build...</a
                        >
                        <p class="card-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Sunt nemo voluptas voluptate quasi inventore
                          veniam aut minus, culpa dolore possimus animi quos,
                          facilis eveniet? Sunt exercitationem libero ex
                          corrupti accusantium?
                        </p>
                        <a
                          href="#"
                          class="card-link"
                          data-bs-toggle="modal"
                          data-bs-target="#reply"
                        >
                          Balas
                        </a>
                        <a
                          href="#"
                          class="card-link"
                          data-bs-toggle="modal"
                          data-bs-target="#edit"
                        >
                          Ubah
                        </a>
                        <a
                          href="#"
                          class="card-link"
                          data-bs-toggle="modal"
                          data-bs-target="#delete"
                        >
                          Hapus
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="d-lg-none" />
              </div>
            </div>
          </div>
        </div>
        <!-- MODAL REPLY -->
        <div
          class="modal fade"
          id="reply"
          tabindex="-1"
          aria-labelledby="replyLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <h5 class="card-title fw-bold">Buat Balasan</h5>
                <hr />
                <div class="row">
                  <div class="col-lg-12 mb-3">
                    <VueEditor />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <button class="btn btn-primary">Balas</button>
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
                <h5 class="card-title fw-bold">Ubah Komentar</h5>
                <hr />
                <div class="row">
                  <div class="col-lg-12 mb-3">
                    <VueEditor />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <button class="btn btn-primary">Ubah</button>
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
                <h5 class="card-title fw-bold">Hapus Komentar</h5>
                <hr />
                <p>Hapus komentar ini?</p>
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
      $(".replies").on("click", (e) => {
        setTimeout(() => {
          if ($(".border-info").length > 0) {
            $(".border-info").removeClass("border-3");
            $(".border-info").removeClass("border");
            $(".border-info").addClass("border-0");
            $(".border-info").removeClass("border-info");
          }
          $($(e.target).data("id")).removeClass("border-0");
          $($(e.target).data("id")).addClass(
            "border border-info border-3 rounded"
          );
        }, 500);
      });
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
