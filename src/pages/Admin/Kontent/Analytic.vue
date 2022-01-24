<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
					<div class="p-3">
            <div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="title-content">Logo & Nama Website</div>
              <!-- <div class="d-flex">
                <a href="#" type="button" class="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#tambahModal" >
                  + Tambah
                </a>
              </div> -->
            </div>
          </div>
				</div>
				<div class="card-shadow mb-3">
					<div class="p-3">
						<Loader text="Sedang memuat data Logo & Nama." v-if="datas === null" />
						<form v-else action="" @submit.prevent="edits">
							<div class="row">
								<div class="col-lg-6">
									<div class="form-group">
										<label for="mahasiswa">Jumlah Mahasiswa</label>
										<div class="check-error">
											<input style="border-radius: 8px !important;" type="number" name="mahasiswa" id="mahasiswa" v-model="datas.jumlah_mahasiswa" placeholder="Jumlah Mahasiswa" class="form-control">
											<small :class="`text-danger d-flex ${validationEdit.jumlah_mahasiswa.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.jumlah_mahasiswa.message}}</small>
										</div>
										<!-- <input type="file" name="file" id="file" class="form-control" v-model="logo.logo"> -->
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group">
										<label for="alumni">Jumlah Alumni</label>
										<div class="check-error">
											<input style="border-radius: 8px !important;" type="number" name="alumni" id="alumni" v-model="datas.jumlah_alumni" placeholder="Jumlah Alumni" class="form-control">
											<small :class="`text-danger d-flex ${validationEdit.jumlah_alumni.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.jumlah_alumni.message}}</small>
										</div>
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group">
										<label for="fakultas">Jumlah Fakultas</label>
										<div class="check-error">
											<input style="border-radius: 8px !important;" type="numbar" name="fakultas" id="fakultas" v-model="datas.jumlah_fakultas" placeholder="Jumlah Fakultas" class="form-control">
											<small :class="`text-danger d-flex ${validationEdit.jumlah_fakultas.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.jumlah_fakultas.message}}</small>
										</div>
										<!-- <input type="file" name="file" id="file" class="form-control" v-model="logo.logo"> -->
									</div>
								</div>
								<div class="col-lg-12">
									<div class="d-flex justify-content-end">
										<button class="text-white btn btn-warning">
											<i class="fa fa-pencil-alt text-white"></i>
											Edit
										</button>
									</div>
								</div>
							</div>
						</form>
						<!-- <div class="table-responsive" v-else>
							<table id="tablenya" class="table">
                <thead>
                  <tr>
                    <th scope="col">Logo</th>
										<th scope="col">Nama Website</th>
										<th scope="col">Aksi</th>
                  </tr>
                </thead>
								<tbody v-if="logo">
									<tr v-for="(items,index) in logo" :key="index">
										<td>{{items.nama}}</td>
										<td><img :src="items.logo" alt=""></td>
										<td>
											<div class="d-flex">
                        <button
                          type="button"
                          class="btn btn-primary btn-sm me-2"
                          data-bs-toggle="modal" data-bs-target="#lihatModal"
                        >
                          <i class="fas fa-eye"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning btn-sm text-white me-2"
                          data-bs-toggle="modal" data-bs-target="#editModal"
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
													@click="hapusData(items.uuid, items.nama)"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
										</td>
									</tr>
								</tbody>
							</table>
						</div> -->
						<!-- <Pagination :data="dataProdi" ammount="mahasiswa" :function="navigation" /> -->
					</div>
				</div>
				<Footer />
			</div>
		</div>
		<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Edit Prodi</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<form action="" v-if="dataOneProdi" @submit.prevent="editData">
								<div class="row">
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nama">Nama Prodi</label>
											<div class="check-error">
												<input type="text" name="nama" id="nama" placeholder="Nama Prodi" class="form-control" v-model="dataOneProdi.nama">
												<small :class="`text-danger d-flex ${validationEdit.nama.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.nama.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="gugus">Fakultas</label>
											<div class="check-error">
												<select name="gugus" id="gugus" v-model="dataOneProdi.fakultas_id" class="form-select">
													<option value="" selected disabled>Pilih Fakultas</option>
													<option :value="items.uuid" v-for="(items,index) in dataFakultas.data" :key="index">{{items.nama}}</option>
												</select>
												<small :class="`text-danger d-flex ${validationEdit.fakultas_id.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.fakultas_id.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-12">
										<div class="modal-footer">
											<div class="d-flex justify-content-end">
												<button class="btn btn-primary" style="margin-right: 24px;min-width: 100px;" type="submit">Edit</button>
												<a href="#" data-bs-dismiss="modal" aria-label="Close" style="width: 100px" class="btn btn-outline-primary">Batal</a>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="lihatModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Lihat Prodi</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<form action="" v-if="dataOneProdi" >
								<div class="row">
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nama">Nama Prodi</label>
											<div class="check-error">
												<input type="text" name="nama" id="nama" placeholder="Nama Prodi" class="form-control" v-model="dataOneProdi.nama">
												<small :class="`text-danger d-flex ${validationEdit.nama.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.nama.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="kode">Kode Prodi</label>
											<div class="check-error">
												<input type="text" name="kode" id="kode" placeholder="Kode Prodi" class="form-control" v-model="dataOneProdi.kode">
												<small :class="`text-danger d-flex ${validationEdit.kode.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.kode.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="gugus">Fakultas</label>
											<div class="check-error">
												<select name="gugus" id="gugus" v-model="dataOneProdi.fakultas_id" class="form-select">
													<option value="" selected disabled>Pilih Fakultas</option>
													<option :value="items.uuid" v-for="(items,index) in dataFakultas.data" :key="index">{{items.nama}}</option>
												</select>
												<small :class="`text-danger d-flex ${validationEdit.fakultas_id.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.fakultas_id.message}}</small>
											</div>
										</div>
									</div>
									<!-- <div class="col-lg-12">
										<div class="modal-footer">
											<div class="d-flex justify-content-end">
												<button class="btn btn-primary" style="margin-right: 24px;min-width: 100px;" type="submit">Edit</button>
												<a href="#" data-bs-dismiss="modal" aria-label="Close" style="width: 100px" class="btn btn-outline-primary">Batal</a>
											</div>
										</div>
									</div> -->
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="modal fade" id="tambahModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Tambah Prodi</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<form @submit.prevent="tambahProdi" action="">
								<div class="row">
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nama">Nama Prodi</label>
											<div class="check-error">
												<input type="text" name="nama" id="nama" placeholder="Nama Prodi" class="form-control" v-model="tambah.nama">
												<small :class="`text-danger d-flex ${validationTambah.nama.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.nama.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="kode">Kode</label>
											<div class="check-error">
												<input type="text" name="kode" id="kode" placeholder="Kode Prodi" class="form-control" v-model="tambah.kode">
												<small :class="`text-danger d-flex ${validationTambah.kode.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.kode.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="fakultas">Fakultas <span class="text-info">*</span></label>
											<div class="check-error" v-if="dataFakultas">
												<select name="fakultas" v-model="tambah.fakultas_id" id="fakultas" class="form-select">
													<option value="" selected>Pilih Fakultas</option>
													<option :value="items.uuid" v-for="(items,index) in dataFakultas.data" :key="index">{{items.nama}}</option>
												</select>
												<small :class="`text-danger d-flex ${validationTambah.fakultas_id.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.fakultas_id.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-12">
										<div class="modal-footer">
											<div class="d-flex justify-content-end">
												<button class="btn btn-primary" style="margin-right: 24px;width: 100px" type="submit">Tambah</button>
												<a href="#" data-bs-dismiss="modal" aria-label="Close" style="width: 100px" class="btn btn-outline-primary">Batal</a>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div> -->
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
// import Swal from 'sweetalert2';
/* eslint-disable no-undef */

export default {
	computed: {
		...mapState(['url'])
	},
	data: function() {
    return {
      width: null,
			datas: null,
			dataGugus: null,
			dataOneProdi: null,
			dataFakultas: null,
			tambah: {
				nama: null,
				fakultas_id: '',
				kode: null
			},
			validationTambah: {
				nama: {
					status: true,
					message: null
				},
				kode: {
					status: true,
					message: null
				},
				fakultas_id: {
					status: true,
					message: null
				}
			},
			validationEdit: {
				jumlah_alumni: {
					status: true,
					message: null
				},
				jumlah_mahasiswa: {
					status: true,
					message: null
				},
				jumlah_fakultas: {
					status: true,
					message: null
				},
			}
		}
	},
	methods: {
		edits() {
			if(this.datas.jumlah_mahasiswa && this.datas.jumlah_fakultas && this.datas.jumlah_alumni) {
				axios.post(`${this.url}bemkm/landing/mahasiswaalumnifakultas/`, this.datas, {
					headers: {
						Authorization: localStorage.token
					}
				}).then((result) => {
					if(result.data.success){
						Swal.fire(
							'Berhasil Edit!',
							`Berhasil diedit!`,
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
			if(!this.datas.jumlah_fakultas) {
				this.validationEdit.jumlah_fakultas.status = false
				this.validationEdit.jumlah_fakultas.message = "Jumlah Fakultas Harus Diisi"
			} else {
				this.validationEdit.jumlah_fakultas.status = true
				this.validationEdit.jumlah_fakultas.message = null
			}
			if(!this.datas.jumlah_mahasiswa) {
				this.validationEdit.jumlah_mahasiswa.status = false
				this.validationEdit.jumlah_mahasiswa.message = "Jumlah Mahasiswa Harus Diisi"
			} else {
				this.validationEdit.jumlah_mahasiswa.status = true
				this.validationEdit.jumlah_mahasiswa.message = null
			}
			if(!this.datas.jumlah_alumni) {
				this.validationEdit.jumlah_alumni.status = false
				this.validationEdit.jumlah_alumni.message = "Jumlah Alumni Harus Diisi"
			} else {
				this.validationEdit.jumlah_alumni.status = true
				this.validationEdit.jumlah_alumni.message = null
			}
		}
	},
	mounted() {
		this.width = $(document).width();
		axios.get(`${this.url}bemkm/landing/mahasiswaalumnifakultas`, {
			headers: {
				Authorization: localStorage.token
			}
		}).then((result) => {
			console.log(result)
			this.datas = result.data.data
			$(document).ready(function() {
				$('.dropify').dropify()
			});
		}).catch((err) => {
			console.log(err)
		});
	}
}
</script>

<style scoped>
.modal .form-control{
  height: 36px;
  border-radius: 8px !important;
  background: #F8F8F8;
}
.modal input[type="text"], .modal input[type="email"], .modal input[type="number"], .modal textarea {
	border: none !important;
}
.modal .form-control, .modal .form-select{
	border-color: rgba(221, 224, 228, 1);
}
.modal .form-control::placeholder{
	color: rgba(175, 181, 192, 1);
  font-weight: 400;
  font-size: 14px;
}
textarea.form-control{
	height: 65px !important;
	background: white !important;
	border: 1px solid #ddd !important;
}

</style>