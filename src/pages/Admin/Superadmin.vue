<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
					<div class="p-3">
            <div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="title-content">Superadmin Management</div>
              <div class="d-flex">
                <a href="#" type="button" class="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#tambahModal" >
                  + Tambah
                </a>
              </div>
            </div>
          </div>
				</div>
				<div class="card-shadow mb-3">
					<div class="p-3">
						<Loader text="Sedang memuat data gugus." v-if="!dataAdmin" />

						<div class="table-responsive" v-else>
							<table id="tablenya" class="table">
                <thead>
                  <tr>
                    <th scope="col">NAMA</th>
										<th scope="col">EMAIL</th>
                    <th scope="col">NO. TELEPON</th>
                    <th scope="col">ALAMAT</th>
                    <th scope="col">AKSI</th>
                  </tr>
                </thead>
								<tbody v-if="dataAdmin">
									<tr v-for="(items,index) in dataAdmin.data" :key="index">
										<td>
											<div>
                        <div class="d-flex align-items-center">
                          <div class="image d-flex align-items-center justify-content-center">
                            <img :src="items.foto" alt="" />
                          </div>
                          <div class="ms-3">
														<div class="main-text">
															{{items.nama}}
														</div>
													</div>
												</div>
											</div>
										</td>
										<td>{{items.email}}</td>
										<td>{{items.no_hp}}</td>
										<td>{{items.alamat}}</td>
										<td>
											<div class="d-flex">
                        <button
                          type="button"
                          class="btn btn-primary btn-sm me-2"
                          data-bs-toggle="modal" data-bs-target="#lihatModal"
													@click="openEdit(items.uuid)"
                        >
                          <i class="fas fa-eye"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning btn-sm text-white me-2"
                          data-bs-toggle="modal" data-bs-target="#editModal"
													@click="openEdit(items.uuid)"
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
						</div>
						<Pagination :data="dataAdmin" ammount="mahasiswa" :function="navigation" />
					</div>
				</div>
				<Footer />
			</div>
		</div>
		<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Edit Superadmin</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<form action="" v-if="dataOneAdmin" @submit.prevent="editData">
								<div class="row">
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nama">Nama Superadmin</label>
											<div class="check-error">
												<input type="text" name="nama" id="nama" placeholder="Nama Superadmin" class="form-control" v-model="dataOneAdmin.nama">
												<small :class="`text-danger d-flex ${validationEdit.nama.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.nama.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="email">Email</label>
											<div class="check-error">
												<input type="email" name="email" id="email" placeholder="Email" class="form-control" v-model="dataOneAdmin.email">
												<small :class="`text-danger d-flex ${validationEdit.email.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.email.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="password">Password</label>
											<div class="check-error">
												<input type="password" name="password" id="passowrd" class="form-control" placeholder="Masukkan Password" v-model="dataOneAdmin.password">
												<small class="text-warning">Kosongi bila tidak ingin merubah password</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="jeniskelamin">Jenis Kelamin</label>
											<div class="check-error">
												<select name="jeniskelamin" id="jeniskelamin" v-model="dataOneAdmin.jenis_kelamin" class="form-select">
													<option value="" selected disabled>Pilih Kelamin</option>
													<option value="LAKI-LAKI">Laki - Laki</option>
													<option value="PEREMPUAN">Perempuan</option>
												</select>
												<small :class="`text-danger d-flex ${validationEdit.jenis_kelamin.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.jenis_kelamin.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nohp">No. Telepon</label>
											<div class="check-error">
												<input type="number" name="nohp" id="nohp" class="form-control" v-model="dataOneAdmin.no_hp" placeholder="No. Telepon">
												<small :class="`text-danger d-flex ${validationEdit.no_hp.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.no_hp.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="alamat">Alamat</label>
											<div class="check-error">
												<textarea name="alamat" id="alamat" class="form-control" v-model="dataOneAdmin.alamat" placeholder="Alamat" cols="30" rows="10"></textarea>
												<small :class="`text-danger d-flex ${validationEdit.alamat.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.alamat.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="foto">Foto</label>
											<div class="check-error">
												<!-- <img :src="dataOneAdmin.foto" class="img-fluid" alt=""> -->
												<input type="file" class="dropify" :data-default-file="dataOneAdmin.foto" name="foto" id="foto">
												<small :class="`text-danger d-flex ${validationEdit.foto.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.foto.message}}</small>
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
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Lihat Superadmin</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<form action="" v-if="dataOneAdmin" >
								<div class="row">
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nama">Nama Superadmin</label>
											<div class="check-error">
												<input type="text" name="nama" id="nama" placeholder="Nama Superadmin" class="form-control" v-model="dataOneAdmin.nama">
												<small :class="`text-danger d-flex ${validationEdit.nama.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.nama.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="email">Email</label>
											<div class="check-error">
												<input type="email" name="email" id="email" placeholder="Email" class="form-control" v-model="dataOneAdmin.email">
												<!-- <small :class="`text-danger d-flex ${validationEdit.kode.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.kode.message}}</small> -->
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="jeniskelamin">Jenis Kelamin</label>
											<div class="check-error">
												<select name="jeniskelamin" id="jeniskelamin" v-model="dataOneAdmin.jenis_kelamin" class="form-select">
													<option value="" selected disabled>Pilih Kelamin</option>
													<option value="LAKI-LAKI">Laki - Laki</option>
													<option value="PEREMPUAN">Perempuan</option>
												</select>
												<!-- <small :class="`text-danger d-flex ${validationEdit.fakultas_id.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.fakultas_id.message}}</small> -->
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nohp">No. Telepon</label>
											<div class="check-error">
												<input type="number" name="nohp" id="nohp" class="form-control" v-model="dataOneAdmin.no_hp" placeholder="No. Telepon">
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="alamat">Alamat</label>
											<div class="check-error">
												<textarea name="alamat" id="alamat" class="form-control" v-model="dataOneAdmin.alamat" placeholder="Alamat" cols="30" rows="10"></textarea>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="foto">Foto</label>
											<div class="check-error">
												<img :src="dataOneAdmin.foto" class="img-fluid" alt="">
												<!-- <input type="file" class="dropify" name="" id=""> -->
											</div>
										</div>
									</div>
									<div class="col-lg-12">
										<div class="modal-footer">
											<div class="d-flex justify-content-end">
												<!-- <button class="btn btn-primary" style="margin-right: 24px;min-width: 100px;" type="submit">Edit</button> -->
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

		<div class="modal fade" id="tambahModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Tambah Superadmin</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<form @submit.prevent="tambahmodal" action="">
								<div class="row">
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nama">Nama Superadmin</label>
											<div class="check-error">
												<input type="text" name="nama" id="nama" placeholder="Nama Superadmin" class="form-control" v-model="tambah.nama">
												<small :class="`text-danger d-flex ${validationTambah.nama.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.nama.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="email">Email</label>
											<div class="check-error">
												<input type="email" name="email" id="email" placeholder="Email" class="form-control" v-model="tambah.email">
												<small :class="`text-danger d-flex ${validationTambah.email.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.email.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="password">Password</label>
											<div class="check-error">
												<input type="password" name="password" id="passowrd" class="form-control" placeholder="Masukkan Password" v-model="tambah.password">
												<small class="text-warning">Kosongi bila tidak ingin merubah password</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="jeniskelamin">Jenis Kelamin</label>
											<div class="check-error">
												<select name="jeniskelamin" id="jeniskelamin" v-model="tambah.jenis_kelamin" class="form-select">
													<option value="" selected disabled>Pilih Kelamin</option>
													<option value="LAKI-LAKI">Laki - Laki</option>
													<option value="PEREMPUAN">Perempuan</option>
												</select>
												<small :class="`text-danger d-flex ${validationTambah.jenis_kelamin.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.jenis_kelamin.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nohp">No. Telepon</label>
											<div class="check-error">
												<input type="number" name="nohp" id="nohp" class="form-control" v-model="tambah.no_hp" placeholder="No. Telepon">
												<small :class="`text-danger d-flex ${validationTambah.no_hp.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.no_hp.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="alamat">Alamat</label>
											<div class="check-error">
												<textarea name="alamat" id="alamat" class="form-control" v-model="tambah.alamat" placeholder="Alamat" cols="30" rows="10"></textarea>
												<small :class="`text-danger d-flex ${validationTambah.alamat.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.alamat.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="foto">Foto</label>
											<div class="check-error">
												<!-- <img :src="tambah.foto" class="img-fluid" alt=""> -->
												<input type="file" class="dropify" :data-default-file="tambah.foto" name="fototambah" id="fototambah">
												<small :class="`text-danger d-flex ${validationTambah.foto.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.foto.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-12">
										<div class="modal-footer">
											<div class="d-flex justify-content-end">
												<button class="btn btn-success" style="margin-right: 24px;min-width: 100px;" type="submit">Tambah</button>
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
			dataProdi: null,
			dataGugus: null,
			dataOneAdmin: null,
			dataFakultas: null,
			tambah: {
				nama: null,
				email: null,
				no_hp: null,
				alamat: null,
				foto: null,
				jenis_kelamin: ''
			},
			validationTambah: {
				nama: {
					status: true,
					message: null
				},
				email: {
					status: true,
					message: null
				},
				jenis_kelamin: {
					status: true,
					message: null
				},
				no_hp: {
					status: true,
					message: null
				},
				alamat: {
					status: true,
					message: null
				},
				foto: {
					status: true,
					message: null
				},
			},
			validationEdit: {
				nama: {
					status: true,
					message: null
				},
				email: {
					status: true,
					message: null
				},
				jenis_kelamin: {
					status: true,
					message: null
				},
				no_hp: {
					status: true,
					message: null
				},
				alamat: {
					status: true,
					message: null
				},
				foto: {
					status: true,
					message: null
				},
			},
			dataAdmin: null
		}
	},
	methods: {
		navigation(url) {
      if (url) {
        this.dataAdmin = null;

        axios
          .get(url, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            this.dataAdmin = res.data.data;

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
		uploadEdit(asd) {
      var reader = new FileReader();
      reader.onload = (e) => {
				this.dataOneAdmin.foto = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(asd);
    },
		editData() {
			if(this.dataOneAdmin.nama && this.dataOneAdmin.email && this.dataOneAdmin.jenis_kelamin && this.dataOneAdmin.no_hp && this.dataOneAdmin.alamat) {
				if (document.getElementById('foto').files[0]) {
					this.uploadEdit(document.getElementById('foto').files[0])
				} else {
					this.dataOneAdmin.foto = null
				}
				setTimeout(() => {
					axios.put(`${this.url}bemkm/superadmin/list-admin/${this.dataOneAdmin.uuid}`, this.dataOneAdmin, {
						headers: {
							Authorization: localStorage.token
						}
					}).then((result) => {
						console.log(result)
						if(result.data.success){
							Swal.fire(
								'Berhasil Edit!',
								`${result.data.message}!`,
								'success'
							).then(() => {
								window.location.reload()
							}).catch((err) => {
								window.location.reload()
								console.log(err)
							});
						}
					}).catch((err) => {
						console.log(err)
					});
				}, 500);
			} else {
				console.log('ece')
			}
			if(!this.dataOneAdmin.nama) {
				this.validationEdit.nama.status = false
				this.validationEdit.nama.message = 'Nama Superadmin harus diisi!'
			} else {
				this.validationEdit.nama.status = true
				this.validationEdit.nama.message = null
			}
			if(!this.dataOneAdmin.email) {
				this.validationEdit.email.status = false
				this.validationEdit.email.message = 'Email harus diisi!'
			} else {
				this.validationEdit.email.status = true
				this.validationEdit.email.message = null
			}
			if(!this.dataOneAdmin.no_hp) {
				this.validationEdit.no_hp.status = false
				this.validationEdit.no_hp.message = 'No. Telepon harus diisi!'
			} else {
				this.validationEdit.no_hp.status = true
				this.validationEdit.no_hp.message = null
			}
			if(!this.dataOneAdmin.alamat) {
				this.validationEdit.alamat.status = false
				this.validationEdit.alamat.message = 'Alamat harus diisi!'
			} else {
				this.validationEdit.alamat.status = true
				this.validationEdit.alamat.message = null
			}
			// if(!this.dataOneAdmin.foto) {
			// 	this.validationEdit.foto.status = false
			// 	this.validationEdit.foto.message = 'Foto harus diisi!'
			// } else {
			// 	this.validationEdit.foto.status = true
			// 	this.validationEdit.foto.message = null
			// }

			if(!this.dataOneAdmin.jenis_kelamin) {
				this.validationEdit.jenis_kelamin.status = false
				this.validationEdit.jenis_kelamin.message = 'Jenis Kelamin harus di pilih!'
			} else {
				this.validationEdit.jenis_kelamin.status = true
				this.validationEdit.jenis_kelamin.message = null
			}
		},
		openEdit(uuid) {
			setTimeout(() => {
        $(".dropify").dropify({
          messages: {
            default: "Unggah Foto Mahasiswa",
            replace: "Timpa dan upload gambar",
            remove: "hapus",
            error: "Ooops, telah terjadi kesalahan.",
          },
        });
      }, 200);
			axios.get(`${this.url}bemkm/superadmin/list-admin/${uuid}`, {
				headers: {
					Authorization: localStorage.token
				}
			}).then((result) => {
				console.log(result)
				this.dataOneAdmin = result.data.data
			}).catch((err) => {
				console.log(err)
			});
		},
		hapusData(uuid, nama) {
			Swal.fire({
        title: `Hapus Superadmin ${nama}`,
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
				console.log(result)
				if(result.isConfirmed) {
					axios.delete(`${this.url}bemkm/superadmin/list-admin/${uuid}`,{
						headers: {
							Authorization: localStorage.token
						}
					}).then((res) => {
						console.log(res)
						if(res.data.success) {
              Swal.fire(
                'Deleted!',
                `Akun Superadmin ${nama} telah dihapus!`,
                'success'
              ).then(() => {
                window.location.reload()
              }).catch((err) => {
                window.location.reload()
                console.log(err)
              });
            } else{
              Swal.fire(
                'Gagal!',
                res.data.message,
                'warning'
              ).then(() => {
                window.location.reload()
              }).catch((err) => {
                console.log(err)
                window.location.reload()
              });
            }
					}).catch((errs) => {
						console.log(errs)
					});
				}
			}).catch((err) => {
				console.log(err)
			})

		},
		upload(asd) {
      var reader = new FileReader();
      reader.onload = (e) => {
        console.log(e)
        this.tambah.foto = e.target.result
					.replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(asd);
    },
		tambahmodal() {
			if (document.getElementById('fototambah').files[0]) {
				console.log('aa')
				this.upload(document.getElementById('fototambah').files[0])
			} else {
				console.log('bb')
				this.tambah.foto = null
			}
			setTimeout(() => {
				if(this.tambah.nama && this.tambah.email && this.tambah.jenis_kelamin && this.tambah.no_hp && this.tambah.alamat && this.tambah.foto) {
					axios.post(`${this.url}bemkm/superadmin/list-admin`, this.tambah, {
						headers: {
							Authorization: localStorage.token
						}
					}).then((result) => {
						console.log(result)
						if(result.data.success) {
							Swal.fire(
								'Berhasil',
								`${result.data.message}`,
								'success'
							).then(() => {
								window.location.reload()
							}).catch(() => {
								window.location.reload()
							});
						} else {
							Swal.fire(
								'Gagal',
								`${result.data.message}`,
								'warning'
							).then(() => {
								window.location.reload()
							}).catch(() => {
								window.location.reload()
							});
						}
					}).catch((err) => {
						console.log(err)
					});
				}
			}, 500);
			if(!this.tambah.nama) {
				this.validationTambah.nama.status = false
				this.validationTambah.nama.message = 'Nama Superadmin harus diisi!'
			} else {
				this.validationTambah.nama.status = true
				this.validationTambah.nama.message = null
			}
			if(!this.tambah.email) {
				this.validationTambah.email.status = false
				this.validationTambah.email.message = 'Email harus diisi!'
			} else {
				this.validationTambah.email.status = true
				this.validationTambah.email.message = null
			}
			if(!this.tambah.no_hp) {
				this.validationTambah.no_hp.status = false
				this.validationTambah.no_hp.message = 'No. Telepon harus diisi!'
			} else {
				this.validationTambah.no_hp.status = true
				this.validationTambah.no_hp.message = null
			}
			if(!this.tambah.alamat) {
				this.validationTambah.alamat.status = false
				this.validationTambah.alamat.message = 'Alamat harus diisi!'
			} else {
				this.validationTambah.alamat.status = true
				this.validationTambah.alamat.message = null
			}
			if(!this.tambah.foto) {
				this.validationTambah.foto.status = false
				this.validationTambah.foto.message = 'Foto harus diisi!'
			} else {
				this.validationTambah.foto.status = true
				this.validationTambah.foto.message = null
			}

			if(!this.tambah.jenis_kelamin) {
				this.validationTambah.jenis_kelamin.status = false
				this.validationTambah.jenis_kelamin.message = 'Jenis Kelamin harus di pilih!'
			} else {
				this.validationTambah.jenis_kelamin.status = true
				this.validationTambah.jenis_kelamin.message = null
			}
		}
	},
	mounted() {
		$('.dropify').dropify()
		this.width = $(document).width();
		axios.get(`${this.url}bemkm/superadmin/list-admin`, {
			headers: {
				Authorization: localStorage.token
			}
		}).then((result) => {
			console.log(result)
			this.dataAdmin = result.data.data
			$(document).ready(function() {
				$(".table").DataTable({
					pageLength: 25,
					ordering: false,
					paging: false,
					info: false,
				});
			});
		}).catch((err) => {
			console.log(err)
		});
		axios.get(`${this.url}bemkm/superadmin/gugus`, {
			headers: {
				Authorization: localStorage.token
			}
		}).then((result) => {
			console.log(result)
			this.dataGugus = result.data.data
		}).catch((err) => {
			console.log(err)
		});
		axios.get(`${this.url}bemkm/superadmin/fakultas`, {
      headers: {
        Authorization : localStorage.token
      }
    }).then((result) => {
      console.log(result)
      this.dataFakultas = result.data.data
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