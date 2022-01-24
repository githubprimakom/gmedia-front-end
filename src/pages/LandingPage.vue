<template>
  <div style="position: relative;">
    <div class="navbars navbar">
      <div class="logo-img" v-if="landing">
        <a href="#" class="logo-dinsos">
          <!-- <img
						src="../assets/PKKBN.png"
						alt=""
					/> -->
          <img width="48px" :src="landing.aplikasi.logo" alt="" />
          <div>
            <!-- <h5>BEM KM UPN "Veteran" YogyakartaPKK-BN <strong>2021</strong></h5> -->
            <!-- <h5 class="fw-bold d-none d-sm-block">BEM KM UPN "Veteran" Yogyakarta</h5> -->
            <h5 class="fw-bold d-none d-sm-block">
              {{ landing.aplikasi.nama }}
            </h5>
            <h5 class="fw-bold d-sm-none d-block">PJB Services</h5>
          </div>
        </a>
      </div>
      <div class="menu-list" id="navbars">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a href="#home" class="menunya nav-link">Beranda</a>
          </li>
          <li class="nav-item">
            <a href="#visi-misi" class="menunya nav-link">Visi-Misi</a>
          </li>
          <!-- <li class="nav-item">
						<a
							href="#testimoni"
							class="menunya nav-link"
						>Testimoni</a	>
					</li> -->
          <li class="nav-item">
            <a href="#tentang" class="menunya nav-link">Tentang</a>
          </li>
        </ul>
      </div>
      <div class="navbar-click">
        <a
          v-if="!getUserLogin"
          href="#"
          class="d-flex align-items-center justify-content-center btn fw-bold btn-outline-primary"
          style="height: 44px;"
          data-bs-toggle="modal"
          data-bs-target="#login"
          >Login</a
        >
        <div v-else class="dropdown">
          <button
            type="button"
            id="dropdownmenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-toggle="dropdown"
            href="#"
            class="btn text-muted dropdown-toggle"
          >
            Hi, {{ getUserLogin.username }}
          </button>
          <ul role="menu" aria-labelledby="dropdownmenu" class="dropdown-menu">
            <li>
              <a
                v-if="getUserLogin.role == 'MHS'"
                href="/dashboard"
                class="dropdown-item"
              >
                Dashboard
              </a>
              <a
                v-if="getUserLogin.role == 'SPA'"
                href="/admin"
                class="dropdown-item"
              >
                Dashboard
              </a>
              <a
                v-if="getUserLogin.role == 'PMD'"
                href="/pemandu"
                class="dropdown-item"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a href="/logout" class="dropdown-item">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="p-100" data-spy="scroll" data-target="#navbars" data-offset="0">
      <div id="home">
        <header>
          <div class="row h-100 align-items-center" v-if="landing">
            <div class="col-lg-6">
              <div class="content-header">
                <h1>
                  {{ landing.header.judul }} <br /><b>{{
                    landing.header.sub_judul
                  }}</b>
                </h1>
                <!-- <p>Universitas Pembangunan Nasional (UPN) "Veteran" semula adalah suatu lembaga pendidikan tinggi yang didirikan atas prakarsa para pejuang kemerdekaan R.I dengan nama Akademi Pembangunan Nasional (APN) "Veteran" yang didirikan dikota Yogyakarta...</p> -->
                <div v-html="landing.header.isi"></div>
                <!-- <button class="btn btn-primary selengkapnya" style="box-shadow: -2px 4px 32px rgba(20, 97, 245, 0.2);">
									Baca Selengkapnya
								</button> -->
              </div>
            </div>
            <div class="col-lg-6">
              <!-- <img class="img-fluid" src="../assets/ilustrasi/ilustrasi-landing-page-1.svg" alt=""> -->
              <img class="img-fluid" :src="landing.header.logo" alt="" />
            </div>
          </div>
        </header>
      </div>
      <!-- <section class="tambahan">
				<div class="card-shadow">
					<div class="row g-0 h-100" v-if="landing">
						<div class="col-lg-4 h-100">
							<div class="h-100 d-flex justify-content-center align-items-center padding-card-mid">
								<div class="frame">
									<img src="../assets/icons/person.svg" alt="">
								</div>
								<div>
									<h4>
										{{landing.analitik.jumlah_mahasiswa}}
										+</h4>
									<p>Mahasiswa</p>
								</div>
							</div>
						</div>
						<div class="col-lg-4 h-100">
							<div class="h-100 d-flex justify-content-center align-items-center padding-card-mid">
								<div class=" middle-content-landing h-100 d-flex justify-content-center w-100 align-items-center ">
									<div class="frame">
										<img src="../assets/icons/school.svg" alt="">
									</div>
									<div>
										<h4>
											{{landing.analitik.jumlah_alumni}}
											+</h4>
										<p>Alumni</p>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-4 h-100">
							<div class="h-100 d-flex justify-content-center align-items-center padding-card-mid">
								<div class="frame">
									<img src="../assets/icons/icon-fakultas.svg" alt="">
								</div>
								<div>
									<h4>
										{{landing.analitik.jumlah_fakultas}}
									</h4>
									<p>Fakultas</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section> -->
      <section id="visi-misi">
        <div class="row" v-if="landing">
          <div class="col-lg-6">
            <!-- <img src="../assets/ilustrasi/ilustrasi-landing-page-2.svg" class="img-fluid" alt=""> -->
            <img :src="landing.visi_misi.gambar" class="img-fluid" alt="" />
          </div>
          <div class="col-lg-6">
            <div class="visi-misi">
              <!-- <h3>Visi & Misi UPN <br> Veteran Yogyakarta</h3> -->
              <h3>
                {{ landing.visi_misi.judul_visi }}
              </h3>
              <h5>Visi :</h5>
              <div class="list-visi" v-html="landing.visi_misi.visi">
                <!-- <li>
									<div class="d-flex align-items-start">
										<img src="../assets/icons/icon-checklist.svg" class="me-3" alt="">
										<p class="m-0">
											Menjadi Universitas Pionir Pembangunan yang dilandasi jiwa bela negara di era global.
										</p>
									</div>
								</li> -->
              </div>
              <h5>Misi :</h5>
              <div v-html="landing.visi_misi.misi" class="list-visi">
                <!-- <li>
									<div class="d-flex align-items-start">
										<img src="../assets/icons/icon-checklist.svg" class="me-3" alt="">
										<p class="m-0">
											Menghasilkan lulusan yang berdaya saing global dan berjiwa bela negara 	melalui pembelajaran berkualitas.
										</p>
									</div>
								</li>
								<li>
									<div class="d-flex align-items-start">
										<img src="../assets/icons/icon-checklist.svg" class="me-3" alt="">
										<p class="m-0">
											Mengembangkan konsepsi ilmu pengetahuan, teknologi, sains dan kemanusiaan melalui Pengembangan Program Studi/proses belajar mengajar dan pengayaan keilmuan.
										</p>
									</div>
								</li>
								<li>
									<div class="d-flex align-items-start">
										<img src="../assets/icons/icon-checklist.svg" class="me-3" alt="">
										<p class="m-0">
											Meningkatkan kualitas penelitian melalui program terencana, terintegrasi dan berkelanjutan.
										</p>
									</div>
								</li> -->
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- <section id="testimoni" style="background: #FDFDFD;">
				<div class="row flex-column align-items-center justify-content-center">
					<h1 class="title-sections">Testimoni dari beberapa alumni</h1>
					<p class="sub-head-title">
						Berikut beberapa tanggapan dari alumni kampus UPN Veteran :
					</p>
				</div>
				<div class="d-flex testimoni flex-wrap">
					<div class=" mb-3">
						<div class="card active">
							<div class="card-body">
								<div class="d-flex" style="margin-bottom: 20px;">
									<div>
										<img class="img-orang-card" src="../assets/gambarorang.jpg" alt="">
									</div>
									<div class="info-card">
										<h4>Dave Lombardo</h4>
										<p>Asistant Director</p>
									</div>
								</div>
								<p class="description-card">“Saya sangat senang bisa belajar di kampus yang sangat luar biasa ini. Lingkungan yang nyaman dan pembelajaran yang sangat baik”.</p>
							</div>
						</div>
					</div>
					<div class=" mb-3">
						<div class="card">
							<div class="card-body">
								<div class="d-flex" style="margin-bottom: 20px;">
									<div>
										<img class="img-orang-card" src="../assets/gambarorang.jpg" alt="">
									</div>
									<div class="info-card">
										<h4>Dave Lombardo</h4>
										<p>Asistant Director</p>
									</div>
								</div>
								<p class="description-card">“Saya sangat senang bisa belajar di kampus yang sangat luar biasa ini. Lingkungan yang nyaman dan pembelajaran yang sangat baik”.</p>
							</div>
						</div>
					</div>
				</div>
			</section> -->
      <section id="tentang" v-if="landing" style="background: #FDFDFD;">
        <div class="row flex-column align-items-center justify-content-center">
          <!-- <h1 class="title-sections">Tentang UPN Veteran Yogyakarta</h1> -->
          <h1 class="title-sections">
            {{ landing.tentang.judul }}
          </h1>
          <!-- <p class="sub-head-title">
						Ulasan mengenai UPN Yogyakarta :
					</p> -->
          <p class="sub-head-title">
            {{ landing.tentang.subtitle }}
          </p>
        </div>
        <div class="row">
          <div class="col-lg-6 tentang-text">
            <div class="tentang">
              <!-- <h4>Tentang UPN Veteran</h4> -->
              <h4>
                {{ landing.tentang.title }}
              </h4>
              <div class="divider"></div>
              <!-- <p>Universitas Pembangunan Nasional "Veteran" Yogyakarta atau biasa disingkat UPN "Veteran", merupakan salah satu Perguruan Tinggi Negeri (PTN) di Indonesia yang berlokasi di Kecamatan Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta. Pada saat didirikan, UPN "Veteran" Yogyakarta hanya memiliki 3 jurusan. Sekarang UPN "Veteran" Yogyakarta memiliki 5 fakultas yang terdiri dari 1 program studi untuk D-3, 21 program studi untuk S-1, 8 program studi untuk S-2, serta 1 program studi untuk S-3.</p> -->
              <p v-html="landing.tentang.isi"></p>
            </div>
          </div>
          <div class="col-lg-6">
            <!-- <img src="../assets/tentang.jpg" class="img-fluid" alt=""> -->
            <img
              v-if="
                landing.tentang.ekstensi == 'jpg' ||
                  landing.tentang.ekstensi == 'png' ||
                  landing.tentang.ekstensi == 'jpeg'
              "
              :src="landing.tentang.gambar"
              class="img-fluid"
              alt=""
            />
            <video
              v-if="
                landing.tentang.ekstensi == 'mov' ||
                  landing.tentang.ekstensi == 'mp4' ||
                  landing.tentang.ekstensi == 'mpeg'
              "
              class="video-tentang"
              controls
            >
              <source
                :src="landing.tentang.gambar"
                :type="`video/${landing.tentang.ekstensi}`"
              />
              Your browser does not support HTML video.
            </video>
            <!-- <iframe :src="landing.tentang.gambar" class="video-tentang" frameborder="0"></iframe> -->
          </div>
        </div>
      </section>
      <div class="footers">
        <div class="foot-top" v-if="landing">
          <div class="row m-0">
            <div class="col-lg-4 menufooter">
              <div class="logo-img">
                <a href="#" class="logo-dinsos-footer">
                  <!-- <img
										src="../assets/LogoPKK-BN.png"
										alt=""
									/> -->
                  <img width="36px" :src="landing.aplikasi.logo" alt="" />
                  <div>
                    <!-- <h5>PKK-BN <strong>2021</strong></h5> -->
                    <h5>
                      {{ landing.aplikasi.nama }}
                    </h5>
                  </div>
                </a>
              </div>
              <h5 class="foot-one-col">
                {{ landing.footer.subtitle_footer }}
              </h5>
              <div class="d-flex socmed">
                <a :href="landing.footer.sosmed.facebook" target="_blank">
                  <img src="../assets/icons/icon-facebook.svg" alt="" />
                </a>
                <a :href="landing.footer.sosmed.twitter" target="_blank">
                  <img src="../assets/icons/icon-twitter.svg" alt="" />
                </a>
                <a :href="landing.footer.sosmed.instagram" target="_blank">
                  <img src="../assets/icons/icon-instagram.svg" alt="" />
                </a>
              </div>
            </div>
            <!-- <div class="col-lg-4 menufooter">
							<div>
								<div class="title-footer">
									<h3>Kampus I</h3>
								</div>
								<p>Jl. Padjajaran, Sleman, Yogyakarta, Indonesia. 55283</p>
								<p>(0274) 486733</p>
								<p>info@upnyk.ac.id</p>
							</div>
						</div> -->
            <div
              v-for="(items, index) in landing.footer.kampus"
              :key="index"
              class="col-lg-4 menufooter"
            >
              <div>
                <div class="title-footer">
                  <h3>
                    {{ items.nama }}
                  </h3>
                </div>
                <p>
                  {{ items.alamat }}
                </p>
                <p>
                  {{ items.telepon }}
                </p>
                <p>
                  {{ items.email }}
                </p>
              </div>
            </div>
            <!-- <div class="col-lg-4 menufooter">
							<div>
								<div class="title-footer">
									<h3>Kampus II</h3>
								</div>
								<p>Jl. Babarsari 2 Yogyakarta, Indonesia. 55281</p>
								<p>(0274) 486733</p>
								<p>info@upnyk.ac.id</p>
							</div>
						</div> -->
          </div>
        </div>
        <div class="foot-bot">
          <p>@PJBServices</p>
          <p style="opacity: .3">v0.10.3</p>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div
          class="modal-content"
          style="border: none;border-radius: 20px !important;"
        >
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <div class="modal-body modal-login">
            <div class="judul-modal-login">
              <h3>Login</h3>
              <p>Masukkan Username dan Password</p>
            </div>
            <form action="" @submit.prevent="logins">
              <div class="row position-relative">
                <div
                  :class="
                    `col-lg-12 margin-err ${
                      validation.status === true ? 'd-none' : 'd-flex'
                    }`
                  "
                >
                  <div class="badge-error d-flex">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>{{ validation.message }}</p>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group">
                    <label for="nim"
                      >Username <span class="text-info">*</span></label
                    >
                    <div class="position-relative">
                      <img
                        :class="
                          `iconss ${login.nim !== null ? 'd-flex' : 'd-none'}`
                        "
                        @click="clearInput"
                        src="../assets/icons/icon-cancel.svg"
                        alt=""
                      />
                      <div class="check-error">
                        <input
                          type="text"
                          v-model="login.nim"
                          name="nim"
                          id="nim"
                          class="form-control"
                          placeholder="Nomor Induk Mahasiswa"
                        />
                        <small
                          :class="
                            `text-danger ${
                              validation.nim.status === true
                                ? 'd-none'
                                : 'd-flex'
                            }`
                          "
                          >{{ validation.nim.message }}</small
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group">
                    <label for="password"
                      >Password <span class="text-info">*</span></label
                    >
                    <div class="position-relative">
                      <img
                        :class="`iconss d-none`"
                        src="../assets/icons/icon-show.svg"
                        alt=""
                      />
                      <div class="check-error">
                        <input
                          type="password"
                          name="password"
                          v-model="login.password"
                          id="password"
                          class="form-control"
                          placeholder="min. 8 Karakter"
                        />
                        <small
                          :class="
                            `text-danger ${
                              validation.password.status === true
                                ? 'd-none'
                                : 'd-flex'
                            }`
                          "
                          >{{ validation.password.message }}</small
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <button class="btn btn-primary w-100 btn-login">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import axios from "axios";
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["url"]),
    ...mapState(["getUserLogin"]),
  },
  data() {
    return {
      landing: null,
      validation: {
        status: true,
        message: null,
        nim: {
          status: true,
          message: null,
        },
        password: {
          status: true,
          message: null,
        },
      },
      login: {
        nim: null,
        password: null,
      },
    };
  },
  methods: {
    clearInput() {
      this.login.nim = null;
    },
    logins() {
      this.validation.status = true;
      if (
        this.login.nim &&
        this.login.password &&
        this.login.password.length >= 8
      ) {
        axios
          .post(`${this.url}auth/login`, {
            username: this.login.nim,
            password: this.login.password,
          })
          .then((result) => {
            if (result.data.success) {
              localStorage.token = result.data.data.token;
              localStorage.tkn = result.data.data.rusertoken;
              localStorage.uid = result.data.data.ruserid;

              if (result.data.data.role == "MHS") {
                window.location.replace("/dashboard");
              }

              if (result.data.data.role == "PMD") {
                window.location.replace("/pemandu");
              }

              if (result.data.data.role == "SPA") {
                // router.push({ name: 'Dashboard Mahasiswa'})
                window.location.replace("/admin");
              }
            } else {
              this.validation.status = false;
              this.validation.message = result.data.message;
            }
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (!this.login.nim) {
        this.validation.nim.status = false;
        this.validation.nim.message = "Nomor Induk Mahasiswa harus Diisi!";
      } else {
        this.validation.nim.status = true;
        this.validation.nim.message = null;
      }
      if (!this.login.password) {
        this.validation.password.status = false;
        this.validation.password.message = "Password harus Diisi!";
      } else if (this.login.password.length < 8) {
        this.validation.password.status = false;
        this.validation.password.message = "Password minimal 8 karakter!";
      } else {
        this.validation.password.status = false;
        this.validation.password.message = null;
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch("getLogin");
  },
  mounted() {
    // eslint-disable-next-line no-undef
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: "#navbars",
    });
    axios
      .get(`${this.url}bemkm/landing/`)
      .then((result) => {
        this.landing = result.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style src="../assets/style/landing.css"></style>

<style scoped>
.visi-misi ul {
  list-style-image: url("../assets/icons/icon-checklist.svg");
}
.video-tentang {
  width: 100%;
  min-height: 300px;
}
.margin-err {
  margin-bottom: 15px;
}
.badge-error {
  align-items: center;
  width: 100%;
  position: absolute;
  top: -35px;
  padding: 10px 10px 10px 20px;
  border-radius: 5px;
  border: 1px solid #c72e2e;
}
.badge-error p {
  margin: 0;
}
.badge-error i {
  margin-right: 5px;
  color: #c72e2e;
}
body {
  position: relative;
}
/* @import "../assets/style/landing.css"; */
</style>
