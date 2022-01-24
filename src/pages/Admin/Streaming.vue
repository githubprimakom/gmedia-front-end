<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
			<div class="section">
				<div class="row meet-top">
					<div class="col-lg-6">
						<div class="card-bag" style="min-height: 250px">
							<div class="paddingnya h-100">
								<div class="d-flex flex-wrap h-100 align-items-center justify-content-center">
									<div class="type" @click="openMeeting" data-bs-toggle="modal" data-bs-target="#meetingModal">
										<div class="card-type meet">
											<img src="../../assets/icons/Meet.svg" alt="">
										</div>
										<p>Conference Baru</p>
									</div>
									<!-- <div class="type">
										<div class="card-type ikut">
											<img src="../../assets/icons/Plus.svg" alt="">
										</div>
										<p>Ikut</p>
									</div>
									<div class="type">
										<div class="card-type ikut">
											<img src="../../assets/icons/agenda.svg" alt="">
										</div>
										<p>Jadwal</p>
									</div>
									<div class="type">
										<div class="card-type ikut">
											<img src="../../assets/icons/Share.svg" alt="">
										</div>
										<p>Bagikan Layar</p>
									</div> -->
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-6">
						<div class="card-bag">
							<div class="row g-0" style="height: 280px;">
								<div class="col-6">
									<div class="position-relative h-100" style="overflow: hidden;">
										<img class="img-stream-right" src="../../assets/icons/image.svg" alt="">
										<div class="pading-dalemnya">
											<div class="border-tengah-dalem">
												<h4>{{ new Date().toLocaleDateString()}}</h4>
											</div>
										</div>
									</div>
								</div>
								<div class="col-6">
									<h6 class="px-3 pt-3">List Meeting Hari Ini :</h6>
									<div class="d-flex h-100 align-items-center justify-content-center" v-if="konferesniToday.length < 1">
										<p class="no-meet">Tidak ada meeting hari ini</p>
									</div>
									<div v-if="konferesniToday.length >= 1" class="px-3 pt-2" style="height: 225px;">
										<div v-for="(items,index) in konferesniToday" :key="index" style="height: 100%;overflow-y: auto">
											<router-link :to="{ name: 'Streaming Detail Master', params: { id: items.uuid } }" class="btn text-start btn-outline-secondary mb-2 w-100" style="height: 38px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{items.nama}}</router-link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-12" style="margin-top: 58px;">
						<div class="card-shadow">
							<div class="p-3">
								<h4 class="judul-name">Data Streaming</h4>
								<Loader
									text="Sedang memuat data Streaming."
									v-if="!dataKonferensi"
								/>
								<div class="table-responsive" v-else>
									<table class="table dataTable">
										<thead>
											<tr>
												<th>Nama Konferensi</th>
												<th>Deskripsi</th>
												<th>Tanggal Mulai</th>
												<th>Nama Pemandu</th>
												<th>Aksi</th>
											</tr>
										</thead>
										
										<tbody v-if="dataKonferensi">
											<tr v-for="(items,index) in dataKonferensi.data" :key="index">
												<td>
													{{items.nama}}
												</td>
												<td>
													{{items.deskripsi}}
												</td>
												<td>
													{{formatDate(items.tanggal)}}
												</td>
												<td>
													<div v-if="items.pemandu">
														{{items.pemandu.nama}}
													</div>
												</td>
												<td>
													<div class="aksi-button">
														<router-link :to="{ name: 'Streaming Detail Master', params: { id: items.uuid } }" class="btn btn-shadow btn-primary">Join</router-link>
														<button data-bs-toggle="modal" data-bs-target="#edit" @click="openModals(items.uuid)" class="btn mx-2 btn-warning btn-sm text-white btn-shadow">
															<i class="fas fa-pencil-alt"></i>
														</button>
														<button @click="hapusData(items.uuid, items.nama)" class="btn btn-danger btn-sm text-white btn-shadow">
															<i class="fas fa-trash"></i>
														</button>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<Pagination :data="dataKonferensi" ammount="mahasiswa" :function="navigation" />
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</div>
		<div class="modal fade" id="meetingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Conference Baru</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="px-5 py-3 px-sm-2">
							<form action="" class="tambahmeeting" @submit.prevent="tambahMeeting">
								<div class="row">
									<div class="col-lg-6">
										<div class="form-group">
											<label for="namaMeeting">Nama Conference</label>
											<div class="check-error">
												<input type="text" placeholder="Nama Conference" name="namaMeeting" id="namaMeeting" v-model="tambah.nama" class="form-control">
												<small :class="`text-danger d-flex ${validationTambah.nama.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.nama.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="tanggal">Tanggal Mulai</label>
											<div class="check-error">
												<input type="date" v-model="tambah.tanggal" class="form-control" name="tanggal" id="tanggal">
												<small :class="`text-danger d-flex ${validationTambah.tanggal.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.tanggal.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="link_video">Link Embed Video Live</label>
											<div class="check-error">
												<input type="text" placeholder="https://www.youtube.com/embed/idUrl" class="form-control" name="link_video" id="link_video" v-model="tambah.link_video">
												<small :class="`text-danger d-flex ${validationTambah.link_video.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.link_video.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6" v-if="dataPemandu">
										<div class="form-group">
											<label for="pemandu">Pemandu</label>
											<div class="check-error">
												<select name="pemandu" id="pemandu" v-model="tambah.pemandu_id" class="form-select">
													<option value="" selected disabled> Pilih Pemandu </option>
													<option :value="items.uuid" v-for="(items, index) in dataPemandu" :key="index">{{items.nama}}</option>
												</select>
												<small :class="`text-danger d-flex ${validationTambah.pemandu_id.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.pemandu_id.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="deskripsi">Deskripsi Conference</label>
											<div class="check-error">
												<textarea name="deskripsi" id="deskripsi" v-model="tambah.deskripsi" placeholder="Deskripsi Conference" class="form-control" cols="30" rows="10"></textarea>
												<small :class="`text-danger d-flex ${validationTambah.deskripsi.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.deskripsi.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-12 footer-modal mb-2">
										<div class="d-flex justify-content-end">
											<button class="btn btn-primary" style="width: auto;margin-right: 24px;">Tambah Konferensi</button>
											<a
												href="#"
												data-bs-dismiss="modal"
												aria-label="Close"
												class="btn btn-outline-primary"
											>Batal</a
											>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="edit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-lg">
				<div class="modal-content" v-if="dataOneKonferensi">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Conference Baru</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="px-5 py-3 px-sm-2">
							<form action="" class="tambahmeeting" @submit.prevent="edits">
								<div class="row">
									<div class="col-lg-6">
										<div class="form-group">
											<label for="namaMeeting">Nama Conference</label>
											<div class="check-error">
												<input type="text" placeholder="Nama Conference" name="namaMeeting" id="namaMeeting" v-model="dataOneKonferensi.nama" class="form-control">
												<small :class="`text-danger d-flex ${validationEdit.nama.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.nama.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="tanggal">Tanggal Mulai</label>
											<div class="check-error">
												<input type="date" v-model="dataOneKonferensi.tanggal" class="form-control" name="tanggal" id="tanggal">
												<small :class="`text-danger d-flex ${validationEdit.tanggal.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.tanggal.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="link_video">Link Embed Video Live</label>
											<div class="check-error">
												<input type="text" placeholder="Cth: https://www.youtube.com/embed/idlivestream" class="form-control" name="link_video" id="link_video" v-model="dataOneKonferensi.link_video">
												<small :class="`text-danger d-flex ${validationEdit.link_video.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.link_video.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6" v-if="dataPemandu">
										<div class="form-group">
											<label for="pemandu">Pemandu</label>
											<div class="check-error">
												<select name="pemandu" id="pemandu" v-model="dataOneKonferensi.pemandu_id" class="form-select">
													<option value="" selected disabled> Pilih Pemandu </option>
													<option :value="items.uuid" v-for="(items, index) in dataPemandu" :key="index">{{items.nama}}</option>
												</select>
												<small :class="`text-danger d-flex ${validationEdit.pemandu_id.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.pemandu_id.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="deskripsi">Deskripsi Conference</label>
											<div class="check-error">
												<textarea name="deskripsi" id="deskripsi" v-model="dataOneKonferensi.deskripsi" placeholder="Deskripsi Conference" class="form-control" cols="30" rows="10"></textarea>
												<small :class="`text-danger d-flex ${validationEdit.deskripsi.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.deskripsi.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-12 footer-modal mb-2">
										<div class="d-flex justify-content-end">
											<button class="btn btn-primary" style="width: auto;margin-right: 24px;">Edit Konferensi</button>
											<a
												href="#"
												data-bs-dismiss="modal"
												aria-label="Close"
												class="btn btn-outline-primary"
											>Batal</a
											>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapState } from 'vuex'
import moment from 'moment'
/* eslint-env jquery */
/* eslint-disable no-mixed-spaces-and-tabs */

export default {
	computed: {
		...mapState(["url"])
	},
	data: function() {
    return {
			konferesniToday: null,
			dataKonferensi: null,
			dataOneKonferensi: null,
			dataPemandu: null,
			width: null,
			tambah: {
				link_video: null,
				pemandu_id: '',
				nama: null,
				tanggal: null,
				deskripsi: null
			},
			validationTambah: {
				link_video: {
					status: true,
					message: null
				},
				pemandu_id: {
					status: true,
					message: null
				},
				nama: {
					status: true,
					message: null
				},
				tanggal: {
					status: true,
					message: null
				},
				deskripsi: {
					status: true,
					message: null
				},
			},
			validationEdit: {
				link_video: {
					status: true,
					message: null
				},
				pemandu_id: {
					status: true,
					message: null
				},
				nama: {
					status: true,
					message: null
				},
				tanggal: {
					status: true,
					message: null
				},
				deskripsi: {
					status: true,
					message: null
				},
			}
		}
	},
	methods: {
		navigation(url) {
      if (url) {
        this.dataKonferensi = null;

        axios
          .get(url, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            this.dataKonferensi = res.data.data;

            $(document).ready(function() {
              $(".table").DataTable({
                pageLength: 25,
                ordering: false,
                paging: false,
                info: false,
              });
            });
          })
          .catch((err) => {
            console.log(err);
            // localStorage.clear();
          });
      }
    },
		konferensiTodays() {
			axios.get(`${this.url}konferensi/konferensi/hari-ini`, {
				headers: {
					Authorization: localStorage.token
				}
			}).then((result) => {
				this.konferesniToday = result.data.data
			}).catch((err) => {
				console.log(err)
			});
		},
		hapusData(uuid, nama) {
			Swal.fire({
        title: `Hapus Konferensi ${nama}?`,
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
					axios.delete(`${this.url}bemkm/superadmin/konferensi/${uuid}`, {
						headers: {
							Authorization: localStorage.token
						}
					}).then((res) => {
						if (res.data.success) {
							Swal.fire(
								"Deleted!",
								`Konferensi ${nama} telah dihapus!`,
								"success"
							).then(() => {
								window.location.reload();
							})
							.catch((err) => {
								window.location.reload();
								console.log(err);
							});
						} else {
							Swal.fire("Gagal!", res.data.message, "warning");
						}
					}).catch((err) => {
						console.log(err)
					});
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		edits() {
			if(this.dataOneKonferensi.nama && this.dataOneKonferensi.tanggal && this.dataOneKonferensi.link_video && this.dataOneKonferensi.pemandu_id && this.dataOneKonferensi.deskripsi) {
				axios.put(`${this.url}bemkm/superadmin/konferensi/${this.dataOneKonferensi.uuid}`, this.dataOneKonferensi, {
					headers: {
						Authorization: localStorage.token
					}
				}).then((result) => {
					// console.log(result)
					if(result.data.success) {
						Swal.fire(
							'Berhasil!',
							`${result.data.message}!`,
							'success'
						).then(() => {
							window.location.reload()
						}).catch((err) => {
							window.location.reload()
							console.log(err)
						});
					} else {
						Swal.fire(
							'Gagal!',
							result.data.message,
							'warning'
						)
					}
				}).catch((err) => {
					console.log(err)
				});
			}
			if (!this.dataOneKonferensi.nama) {
        this.validationEdit.nama.status = false;
        this.validationEdit.nama.message = "Nama Konference harus diisi!";
      } else {
        this.validationEdit.nama.status = true;
        this.validationEdit.nama.message = null;
      }
			if (!this.dataOneKonferensi.tanggal) {
        this.validationEdit.tanggal.status = false;
        this.validationEdit.tanggal.message = "Tanggal harus diisi!";
      } else {
        this.validationEdit.tanggal.status = true;
        this.validationEdit.tanggal.message = null;
      }
			if (!this.dataOneKonferensi.link_video) {
        this.validationEdit.link_video.status = false;
        this.validationEdit.link_video.message = "Link Video harus diisi!";
      } else {
        this.validationEdit.link_video.status = true;
        this.validationEdit.link_video.message = null;
      }
			if (!this.dataOneKonferensi.pemandu_id) {
        this.validationEdit.pemandu_id.status = false;
        this.validationEdit.pemandu_id.message = "Pemandu harus di pilih!";
      } else {
        this.validationEdit.pemandu_id.status = true;
        this.validationEdit.pemandu_id.message = null;
      }
			if (!this.dataOneKonferensi.deskripsi) {
        this.validationEdit.deskripsi.status = false;
        this.validationEdit.deskripsi.message = "Deskripsi harus diisi!";
      } else {
        this.validationEdit.deskripsi.status = true;
        this.validationEdit.deskripsi.message = null;
      }
		},
		openModals(uuid) {
			console.log('aa')
			axios.get(`${this.url}bemkm/superadmin/konferensi/${uuid}`, {
				headers: {
					Authorization: localStorage.token
				}
			}).then((result) => {
				this.dataOneKonferensi = result.data.data
			}).catch((err) => {
				console.log(err)
			});
		},
		formatDate(date) {
			return moment(date).locale("id").format("DD MMMM YYYY");
		},
		getConference() {
			axios.get(`${this.url}bemkm/superadmin/konferensi`, {
				headers: {
					Authorization: localStorage.token
				}
			}).then((result) => {
				if(result.data.success) {
					this.dataKonferensi = result.data.data
					setTimeout(() => {
						$(".table").DataTable({
							pageLength: 25,
							ordering: false,
							paging: false,
							info: false,
						});
					}, 200);
				}
			}).catch((err) => {
				console.log(err)
			});
		},
		tambahMeeting(){
			if(this.tambah.nama && this.tambah.tanggal && this.tambah.link_video && this.tambah.pemandu_id && this.tambah.deskripsi) {
				axios.post(`${this.url}bemkm/superadmin/konferensi`, this.tambah, {
					headers: {
						Authorization: localStorage.token
					}
				}).then((result) => {
					console.log(result)
					if(result.data.success) {
						Swal.fire(
							'Berhasil!',
							`${result.data.message}!`,
							'success'
						).then(() => {
							window.location.reload()
						}).catch((err) => {
							window.location.reload()
							console.log(err)
						});
					} else {
						Swal.fire(
							'Gagal!',
							result.data.message,
							'warning'
						)
					}
				}).catch((err) => {
					console.log(err)
				});
			}
			if (!this.tambah.nama) {
        this.validationTambah.nama.status = false;
        this.validationTambah.nama.message = "Nama Konference harus diisi!";
      } else {
        this.validationTambah.nama.status = true;
        this.validationTambah.nama.message = null;
      }
			if (!this.tambah.tanggal) {
        this.validationTambah.tanggal.status = false;
        this.validationTambah.tanggal.message = "Tanggal harus diisi!";
      } else {
        this.validationTambah.tanggal.status = true;
        this.validationTambah.tanggal.message = null;
      }
			if (!this.tambah.link_video) {
        this.validationTambah.link_video.status = false;
        this.validationTambah.link_video.message = "Link Video harus diisi!";
      } else {
        this.validationTambah.link_video.status = true;
        this.validationTambah.link_video.message = null;
      }
			if (!this.tambah.pemandu_id) {
        this.validationTambah.pemandu_id.status = false;
        this.validationTambah.pemandu_id.message = "Pemandu harus di pilih!";
      } else {
        this.validationTambah.pemandu_id.status = true;
        this.validationTambah.pemandu_id.message = null;
      }
			if (!this.tambah.deskripsi) {
        this.validationTambah.deskripsi.status = false;
        this.validationTambah.deskripsi.message = "Deskripsi harus diisi!";
      } else {
        this.validationTambah.deskripsi.status = true;
        this.validationTambah.deskripsi.message = null;
      }
		},
		openMeeting() {
			console.log('aa')
		}
	},
	mounted() {
		this.getConference()
		this.konferensiTodays()
		this.width = $(document).width();
		axios.get(`${this.url}bemkm/superadmin/pemandu`, {
			headers: {
				Authorization: localStorage.token
			}
		}).then((result) => {
			console.log(result)
			this.dataPemandu = result.data.data.data
		}).catch((err) => {
			console.log(err)
		});
	}
}
</script>

<style scoped>
.aksi-button .btn{
	height: 38px;
	font-size: 1rem;
	min-width: 40px;
}
.tambahmeeting .form-control{
	height: 36px;
	border: none;
  border-radius: 8px !important;
  background: #F8F8F8;
}
textarea.form-control{
	height: 65px !important;
	background: white !important;
	border: 1px solid #ddd !important;
}
.no-meet{
	font-size: 14px;
	font-weight: 400;
	width: 124px;
	color: rgba(11, 19, 42, 1);
	text-align: center;
}
.pading-dalemnya{
	padding: 20px 0 20px 20px;
	width: 100%;
	height: 100%;
}
.border-tengah-dalem{
	border-right: 1px solid rgba(221, 224, 228, 1);
	height: 100%;
}
.pading-dalemnya h4{
	font-size: 18px;
	font-weight: 700;
	color: rgba(40, 40, 40, 1);
}
.img-stream-right{
	position: absolute;
	bottom: 0;
	left: -20px;
}
.card-bag{
	background: white;
	border-radius: 8px;
	box-shadow: 0px 2px 18px rgba(3, 5, 16, 0.06);
	border: none;
	overflow: hidden;
}
.paddingnya{
	padding: 31px 100px 0 100px;
}
.type{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 25px 31px 25px;
	cursor: pointer;
	width: 100px;
}
.type p{
	font-size: 14px;
	font-weight: 400;
	margin-bottom: 0;
	color: rgba(11, 19, 42, 1);
	text-align: center;
}
.card-type{
	width: 68px;
	height: 68px;
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 8px;
}
.card-type.meet{
	background: rgba(255, 170, 41, 1);
}
.card-type.ikut{
	background: rgba(20, 97, 245, 1);
}
@media only screen and (max-width: 600px) {
	.paddingnya {
		padding: 25px !important;
	}
	.meet-top .col-lg-6{
		margin-bottom: 20px;
	}
	.img-stream-right{
		display: none;
	}
	.modal-body .px-5{
		padding-left: 20px !important;
		padding-right: 20px !important;
	}
}
</style>