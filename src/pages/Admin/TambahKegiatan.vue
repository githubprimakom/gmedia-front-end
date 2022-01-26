<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
				<form action="" @submit.prevent="kirimKegiatan">
					<div class="card-shadow mb-3">
						<div class="padding-kegiatan">
							<div class="mb-3">
								<router-link :to="{name: 'Kegiatan Master'}" class="btn btn-outline-primary"><i class="fa fa-arrow-left"></i> Kembali</router-link>
							</div>
							<div class="jadwal-baru">
								<div class="top-tit">
									<h4>Tambah Jadwal Baru</h4>
									<hr class="line">
								</div>
								<div class="row tambahjadwal">
									<div class="col-lg-4">
										<div class="form-group">
											<label for="topik">Topik</label>
											<div class="check-error">
												<input type="text" v-model="jadwal.topik" name="topik" id="topik" placeholder="PKK-BN 2021 Sesi 1" class="form-control">
												<small :class="`text-danger d-flex ${validationTambah.topik.status === true ? 'd-none' : 'd-flex'}`">
													{{ validationTambah.topik.message }}
												</small>
											</div>
										</div>
									</div>
									<div class="col-lg-4">
										<div class="form-group">
											<label for="start_date">Tanggal Kegiatan</label>
											<div class="check-error">
												<input type="date" v-model="jadwal.start_date" name="start_date" id="start_date" class="form-control">
												<small :class="`text-danger d-flex ${validationTambah.start_date.status === true ? 'd-none' : 'd-flex'}`">
													{{ validationTambah.start_date.message }}
												</small>
											</div>
										</div>
									</div>
									<div class="col-lg-4">
										<div class="form-group">
											<label for="lampiran">Lampiran</label>
											<div class="check-error">
												<input type="file" name="lampiran" id="lampiran" class="form-control">
												<small :class="`text-danger d-flex ${validationTambah.lampiran.status === true ? 'd-none' : 'd-flex'}`">
													{{ validationTambah.lampiran.message }}
												</small>
											</div>
										</div>
									</div>
									<div class="col-lg-4">
										<div class="form-group">
											<label for="gugus">Departemen</label>
											<div class="check-error">
												<select v-if="dataGugus" name="gugus" id="gugus" class="form-select" v-model="jadwal.gugus_id" @change="getListTugas(jadwal.gugus_id)">
													<option value="" disabled selected>Pilih Departemen</option>
													<option :value="items.uuid" v-for="(items,index) in dataGugus" :key="index">{{items.name}}</option>
												</select>
												<small :class="`text-danger d-flex ${validationTambah.gugus_id.status === true ? 'd-none' : 'd-flex'}`">
													{{ validationTambah.gugus_id.message }}
												</small>
											</div>
										</div>
									</div>
									<div class="col-lg-4">
										<div class="form-group">
											<label for="deskripsi">Deskripsi</label>
											<div class="check-error">
												<textarea name="deskripsi" id="deskripsi" class="form-control" v-model="jadwal.deskripsi" placeholder="Deskripsi" style="height: 65px" cols="30" rows="10"></textarea>
												<small :class="`text-danger d-flex ${validationTambah.deskripsi.status === true ? 'd-none' : 'd-flex'}`">
													{{ validationTambah.deskripsi.message }}
												</small>
											</div>
										</div>
									</div>
								</div>
								<div class="padbot">
									<hr class="bot">
								</div>
							</div>
							<div class="jadwal-baru" v-if="dataTugas">
								<div class="top-tit">
									<h4>Detail Aktivitas</h4>
									<hr class="line">
								</div>
								<div v-for="(items,index) in jadwal.aktivitas" :key="index.id">
									<div class="row tambahjadwal">
										<div class="col-lg-3">
											<div class="form-group">
												<label for="aktivitas">Aktivitas</label>
												<div class="check-error">
													<input type="text" v-model="jadwal.aktivitas[index].nama" placeholder="PKK-BN 2021 Sesi 2" class="form-control">
													<small :class="`text-danger d-flex ${aktivitas[index].nama.status === true ? 'd-none' : 'd-flex'}`">
														{{ aktivitas[index].nama.message }}
													</small>
												</div>
											</div>
										</div>
										<div class="col-lg-3">
											<div class="form-group">
												<label for="start_date">Waktu Mulai</label>
												<div class="check-error">
													<input type="time" v-model="jadwal.aktivitas[index].start_time" id="start_date" class="form-control">
													<small :class="`text-danger d-flex ${aktivitas[index].start_time.status === true ? 'd-none' : 'd-flex'}`">
														{{ aktivitas[index].start_time.message }}
													</small>
												</div>
											</div>
										</div>
										<div class="col-lg-3">
											<div class="form-group">
												<label for="end_time">Waktu Selesai</label>
												<div class="check-error">
													<input type="time" v-model="jadwal.aktivitas[index].end_time" name="end_time" id="end_time" class="form-control">
													<small :class="`text-danger d-flex ${aktivitas[index].end_time.status === true ? 'd-none' : 'd-flex'}`">
														{{ aktivitas[index].end_time.message }}
													</small>
												</div>
											</div>
										</div>
										<div class="col-lg-3">
											<div class="form-group">
												<label for="tipe">Tipe Aktivitas</label>
												<div class="check-error">
													<select v-if="dataTipe" class="form-select" name="tipe" id="tipe" v-model="jadwal.aktivitas[index].tipe">
														<option value="" disabled selected>Pilih Tipe</option>
														<option :value="items.uuid" v-for="(items, index) in dataTipe.data" :key="index">{{items.nama}}</option>
													</select>
													<small :class="`text-danger d-flex ${aktivitas[index].tipe.status === true ? 'd-none' : 'd-flex'}`">
														{{ aktivitas[index].tipe.message }}
													</small>
												</div>
											</div>
										</div>
										<div class="col-lg-3" v-if="jadwal.aktivitas[index].tipe == 'eff1e631-3e18-4b91-a6e2-6a29af4b1554'">
											<div class="form-group">
												<label for="tugas">Tugas</label>
												<div class="check-error">
													<select name="tugas" v-model="jadwal.aktivitas[index].aktivitas_uuid" id="tugas" class="form-select">
														<option value="" selected disabled>Pilih Tugas</option>
														<option :value="items.uuid" v-for="(items, index) in dataTugas.data" :key="index">{{items.nama}}</option>
													</select>
													<small :class="`text-danger d-flex ${aktivitas[index].aktivitas_uuid.status === true ? 'd-none' : 'd-flex'}`">
														{{ aktivitas[index].aktivitas_uuid.message }}
													</small>
												</div>
											</div>
										</div>
										<div class="col-lg-3" v-if="jadwal.aktivitas[index].tipe == 'abadf8ed-1ef6-4857-add1-9b6b9bc911b1'">
											<div class="form-group">
												<label for="video">Link Meeting</label>
												<div class="check-error">
													<input type="url" required v-model="jadwal.aktivitas[index].aktivitas_uuid" name="video" id="video" class="form-control" placeholder="Cth: https://zoom.us/">
													<small :class="`text-danger d-flex ${aktivitas[index].aktivitas_uuid.status === true ? 'd-none' : 'd-flex'}`">
														{{ aktivitas[index].aktivitas_uuid.message }}
													</small>
												</div>
											</div>
										</div>
										<div class="col-lg-3" v-if="jadwal.aktivitas[index].tipe == 'ac23eded-d09b-41d2-92c7-a082f7621a21'">
											<div class="form-group">
												<label for="tugas">Streaming</label>
												<div class="check-error">
													<select name="tugas" v-model="jadwal.aktivitas[index].aktivitas_uuid" id="tugas" class="form-select">
														<option value="" selected disabled>Pilih Streaming</option>
														<option :value="items.uuid" v-for="(items,index) in dataStreaming.data" :key="index">{{items.nama}}</option>
													</select>
													<small :class="`text-danger d-flex ${aktivitas[index].aktivitas_uuid.status === true ? 'd-none' : 'd-flex'}`">
														{{ aktivitas[index].aktivitas_uuid.message }}
													</small>
												</div>
											</div>
										</div>
										<div class="col-lg-6">
											<div class="form-group">
												<label for="deskripsi">Deskripsi</label>
												<div class="check-error">
													<input type="text" v-model="jadwal.aktivitas[index].deskripsi" placeholder="Deskripsi" name="deskripsi" id="deskripsi" class="form-control">
													<small :class="`text-danger d-flex ${aktivitas[index].deskripsi.status === true ? 'd-none' : 'd-flex'}`">
														{{ aktivitas[index].deskripsi.message }}
													</small>
												</div>
											</div>
										</div>
										<div class="col-lg-3">
											<div class="form-group h-75">
												<div class="d-flex h-100 align-items-end">
													<div class="btn btn-danger"><i class="fa fa-trash"></i> Hapus</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
									<a @click="addfields" class="btn btn-outline-primary button-tambah-baris"><img src="../../assets/icons/add_circle.svg" alt=""> Tambah Baris</a>
								</div>
								<div class="padbot">
									<hr class="bot">
								</div>
								<div class="d-flex justify-content-end">
									<div>
										<button class="btn btn-primary submit-jadwal">Submit Jadwal</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
				<Footer />
			</div>
		</div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapState } from 'vuex';
/* eslint-disable no-undef */

export default {
	computed: {
		...mapState(['url'])
	},
	data: function() {
    return {
      width: null,
			dataTipe: null,
			dataGugus: null,
			jadwal: {
				topik: null,
				aktivitas: [{ nama: '', start_time: '', end_time: '',tipe: '', aktivitas_uuid: '', deskripsi: '', }],
				lampiran: null,
				gugus_id: '',
				start_date: null,
				deskripsi: null
			},
			dataStreaming: null,
			dataTugas: null,
			validationTambah: {
        start_date: {
          status: true,
          message: null,
        },
        deskripsi: {
          status: true,
          message: null,
        },
        topik: {
          status: true,
          message: null,
        },
        gugus_id: {
          status: true,
          message: null,
        },
        lampiran: {
          status: true,
          message: null,
        },
			},
			aktivitas: [
				{
					nama: {
						status: true,
						message: null
					},
					start_time: {
						status: true,
						message: null
					},
					end_time:{
						status: true,
						message: null
					},
					tipe: {
						status: true,
						message: null
					},
					aktivitas_uuid: {
						status:true,
						message: null
					},
					deskripsi: {
						status: true,
						message: null
					}
				}
			],
			errorAktivitas: []
		}
	},
	methods: {
		getGugus() {
			axios.get(`${this.url}bemkm/superadmin/gugus-nonpaginate`, {
				headers: {
					Authorization : localStorage.token
				}
			}).then((result) => {
				console.log(result)
				this.dataGugus = result.data.data
			}).catch((err) => {
				console.log(err)
			});
		},
		getTipe() {
			axios.get(`${this.url}bemkm/superadmin/tipeaktivitas`, {
				headers: {
					Authorization: localStorage.token
				}
			}).then((result) => {
				this.dataTipe = result.data.data
			}).catch((err) => {
				console.log(err)
			});
		},
		addfields() {
			this.jadwal.aktivitas.push({ nama: '', start_time: '', end_time: '',tipe: '', aktivitas_uuid: '', deskripsi: '', })
			this.aktivitas.push({nama: { status: true, message: null },start_time: {status: true, message: null},end_time:{status: true, message: null},tipe: {status: true, message: null}, aktivitas_uuid: {status:true, message: null}, deskripsi: {status: true, message: null}})
		},
		upload(asd) {
      var reader = new FileReader();
      reader.onload = (e) => {
        console.log(e)
				this.jadwal.lampiran = e.target.result
				.replace("data:", "")
				.replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(asd);
    },
		kirimKegiatan() {
			if (document.getElementById('lampiran').files[0]) {
        this.upload(document.getElementById('lampiran').files[0])
				console.log('1')
      } else {
				console.log('2')
        this.jadwal.lampiran = null
      }
			let aktivitas = this.jadwal.aktivitas
			let count = 0
			console.log(aktivitas.length)
			for(let i = 0; i < aktivitas.length; i++) {
				console.log(aktivitas[i])
				if(!aktivitas[i].nama) {
					this.aktivitas[i].nama.status = false
					this.aktivitas[i].nama.message = 'Nama Aktivitas harus diisi'
				} else {
					this.aktivitas[i].nama.status = true
					this.aktivitas[i].nama.message = null
				}
				if(!aktivitas[i].start_time) {
					this.aktivitas[i].start_time.status = false
					this.aktivitas[i].start_time.message = 'Waktu mulai harus diisi'
				} else {
					this.aktivitas[i].start_time.status = true
					this.aktivitas[i].start_time.message = null
				}
				if(!aktivitas[i].end_time) {
					this.aktivitas[i].end_time.status = false
					this.aktivitas[i].end_time.message = 'Waktu selesai harus diisi'
				} else {
					this.aktivitas[i].end_time.status = true
					this.aktivitas[i].end_time.message = null
				}
				if(!aktivitas[i].tipe) {
					this.aktivitas[i].tipe.status = false
					this.aktivitas[i].tipe.message = 'Tipe Aktivitas harus dipilih'
				} else {
					this.aktivitas[i].tipe.status = true
					this.aktivitas[i].tipe.message = null
				}
				if(!aktivitas[i].aktivitas_uuid) {
					this.aktivitas[i].aktivitas_uuid.status = false
					this.aktivitas[i].aktivitas_uuid.message = 'Harus diisi'
				} else {
					this.aktivitas[i].aktivitas_uuid.status = true
					this.aktivitas[i].aktivitas_uuid.message = null
				}
				if(!aktivitas[i].deskripsi) {
					this.aktivitas[i].deskripsi.status = false
					this.aktivitas[i].deskripsi.message = 'Deskripsi Aktivitas harus diisi'
				} else {
					this.aktivitas[i].deskripsi.status = true
					this.aktivitas[i].deskripsi.message = null
				}
				if(aktivitas[i].deskripsi && aktivitas[i].aktivitas_uuid && aktivitas[i].nama && aktivitas[i].tipe && aktivitas[i].start_time && aktivitas[i].end_time) {
					count += 1
				}
			}
			setTimeout(() => {
				if( this.jadwal.topik && this.jadwal.gugus_id && this.jadwal.start_date && this.jadwal.deskripsi && count == this.jadwal.aktivitas.length && this.jadwal.lampiran) {
					axios.post(`${this.url}bemkm/superadmin/kegiatanaktivitas`, this.jadwal, {
						headers: {
							Authorization : localStorage.token
						}
					}).then((result) => {
						console.log(result)
						if(result.data.success) {
							Swal.fire(
								'Berhasil Tambah!',
								result.data.message,
								'success'
							).then((a) => {
								if(a.isConfirmed) {
									window.location.reload()
								}
							}).catch((err) => {
								window.location.reload()
								console.log(err)
							});
						} else if (result.data.message == "Unauthorize") {
							localStorage.clear()
							console.log('el')
							this.$router.push({ name: 'Landing Page' })
						} else{
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
			}, 300);

			if (!this.jadwal.topik) {
        this.validationTambah.topik.status = false;
        this.validationTambah.topik.message = "Topik Kegiatan harus diisi!";
      } else {
        this.validationTambah.topik.status = true;
        this.validationTambah.topik.message = null;
      }
			
			if (!this.jadwal.deskripsi) {
        this.validationTambah.deskripsi.status = false;
        this.validationTambah.deskripsi.message = "Deskripsi Kegiatan harus diisi!";
      } else {
        this.validationTambah.deskripsi.status = true;
        this.validationTambah.deskripsi.message = null;
      }

			if (!this.jadwal.lampiran) {
        this.validationTambah.lampiran.status = false;
        this.validationTambah.lampiran.message = "Lampiran Kegiatan harus diisi!";
      } else {
        this.validationTambah.lampiran.status = true;
        this.validationTambah.lampiran.message = null;
      }

			if (!this.jadwal.gugus_id) {
        this.validationTambah.gugus_id.status = false;
        this.validationTambah.gugus_id.message = "Gugus harus dipilih!";
      } else {
        this.validationTambah.gugus_id.status = true;
        this.validationTambah.gugus_id.message = null;
      }

			if (!this.jadwal.start_date) {
        this.validationTambah.start_date.status = false;
        this.validationTambah.start_date.message = "Tanggal Kegiatan harus diisi!";
      } else {
        this.validationTambah.start_date.status = true;
        this.validationTambah.start_date.message = null;
      }
		},
		getListStream() {
			axios.get(`${this.url}bemkm/superadmin/konferensi`, {
				headers: {
					Authorization: localStorage.token
				}
			}).then((result) => {
				this.dataStreaming = result.data.data
			}).catch((err) => {
				console.log(err)
			});
		},
		getListTugas(id) {
			axios.get(`${this.url}tugas/superadmin/tugas/list-tugas-per-gugus/` + id, {
				headers: {
					Authorization: localStorage.token
				}
			}).then((result) => {
				console.log(result)
				this.dataTugas = result.data
			}).catch((err) => {
				console.log(err)
			});
		},
	},
	mounted() {
    this.width = $(document).width();
		this.getTipe()
		this.getGugus()
		this.getListStream()
		// this.getListTugas()
	}
}
</script>

<style scoped>
.submit-jadwal{
	width: 134px;
	height: 36px;
	font-size: 14px;
	font-weight: 700;
	margin-bottom: 12px;
}
.button-tambah-baris{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 144px;
	height: 36px;
	font-size: 14px;
	font-weight: 700;
	margin: 12px 0 40px 0;
}
.button-tambah-baris img {
	margin-right: 8px;
}
.padding-kegiatan{
	padding: 20px;
}
.top-tit{
	margin-bottom: 32px;
}
hr.line{
	border: .5px solid rgba(221, 224, 228, 1);
	width: 100%;
	margin: 12px 0;
}
.padbot{
	padding: 0 30px;
	margin-bottom: 40px;
}
hr.bot{
	border: .5px solid rgba(221, 224, 228, 1);
	width: 100%;
}
.form-group{
	margin-bottom: 20px;
}
.jadwal-baru h4{
	font-size: 18px;
	font-weight: 700;
	color: rgba(40, 40, 40, 1);
	margin-bottom: 0px;
}
.tambahjadwal .form-control{
	border-radius: 8px !important;
	height: 36px;
	border: 1px solid rgba(221, 224, 228, 1);
}
.tambahjadwal input[type='text'] {
	background: #F8F8F8;
	border: 1px solid hsl(0, 0%, 97%) !important;
}
</style>