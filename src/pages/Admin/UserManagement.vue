<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
					<div class="p-3">
            <div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="title-content">User & Management</div>
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
						<Loader text="Sedang memuat data user." v-if="!dataUser" />
						<div class="table-responsive" v-else>
							<table id="tablenya" class="table">
                <thead>
                  <tr>
                    <th scope="col">USERNAME</th>
                    <th scope="col">NAMA</th>
										<th scope="col">EMAIL</th>
										<th scope="col">Aksi</th>
                  </tr>
                </thead>
								<tbody>
									<tr v-for="(items, index) in dataUser.data" :key="index">
										<td>
											<div v-if="items.username">
												{{items.username}}
											</div>
											<div v-else>
												-
											</div>
										</td>
										<td>
											<div v-if="items.mahasiswa">
												{{items.mahasiswa.nama}}
											</div>
											<div v-else-if="items.pemadu">
												{{items.pemandu.nama}}
											</div>
											<div v-else-if="items.role">
												{{items.role.name}}
											</div>
											<div v-else>
												None
											</div>
										</td>
										<td>
											<div v-if="items.mahasiswa">
												{{items.mahasiswa.email}}
											</div>
											<div v-else-if="items.pemandu">
												{{items.pemandu.email}}
											</div>
											<div v-else-if="items.role">
												-
											</div>
											<div v-else>
												None
											</div>
										</td>
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
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<Pagination :data="dataUser" ammount="mahasiswa" :function="navigation" />
					</div>
				</div>
				<Footer />
			</div>
		</div>
		<!-- <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Edit Pemandu</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<form action="" v-if="dataOnePemandu" @submit.prevent="editPemandu">
								<div class="row">
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nama">Nama Pemandu</label>
											<div class="check-error">
												<input type="text" name="nama" id="nama" placeholder="Nama Pemandu" class="form-control" v-model="dataOnePemandu.nama">
												<small :class="`text-danger d-flex ${validationEdit.nama.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.nama.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="email">Email</label>
											<div class="check-error">
												<input type="email" name="email" id="email" class="form-control" placeholder="Contoh: nama@email.com" v-model="dataOnePemandu.email">
												<small :class="`text-danger d-flex ${validationEdit.email.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.email.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nohp">Nomor Telepon</label>
											<div class="check-error">
												<input type="number" name="nohp" id="nohp" class="form-control" placeholder="Contoh: 08123456789" v-model="dataOnePemandu.no_hp">
												<small :class="`text-danger d-flex ${validationEdit.no_hp.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.no_hp.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="gugus">Gugus</label>
											<div class="check-error">
												<select name="gugus" id="gugus" v-model="dataOnePemandu.gugus_id" class="form-select">
													<option value="" selected disabled>Pilih Gugus</option>
													<option :value="items.uuid" v-for="(items,index) in dataGugus" :key="index">{{items.name}}</option>
												</select>
												<small :class="`text-danger d-flex ${validationEdit.gugus_id.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.gugus_id.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="alamat">Alamat</label>
											<div class="check-error">
												<textarea name="alamat" id="alamat" class="form-control" v-model="dataOnePemandu.alamat" placeholder="Masukkan Alamat" cols="30" rows="10"></textarea>
												<small :class="`text-danger d-flex ${validationEdit.alamat.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.alamat.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="foto">Foto Pemandu</label>
											<div class="check-error">
												<input type="file" name="foto" id="fotoEdit" :data-default-file="dataOnePemandu.foto" class="dropify">
												<small :class="`text-danger d-flex ${validationEdit.foto.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.foto.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-12 footer-modal">
										<div class="d-flex justify-content-end">
											<button class="btn btn-primary" style="margin-right: 24px;">Edit</button>
											<a class="btn btn-outline-primary" data-bs-dismiss="modal">Batal</a>
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
						<h5 class="modal-title" id="exampleModalLabel">Edit Pemandu</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<form action="" v-if="dataOnePemandu">
								<div class="row">
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nama">Nama Pemandu</label>
											<input type="text" readonly name="nama" id="nama" placeholder="Nama Pemandu" class="form-control" v-model="dataOnePemandu.nama">
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="email">Email</label>
											<input type="email" readonly name="email" id="email" class="form-control" placeholder="Contoh: nama@email.com" v-model="dataOnePemandu.email">
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nohp">Nomor Telepon</label>
											<input type="number" readonly name="nohp" id="nohp" class="form-control" placeholder="Contoh: 08123456789" v-model="dataOnePemandu.no_hp">
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="gugus">Gugus</label>
											<select name="gugus" disabled id="gugus" v-model="dataOnePemandu.gugus_id" class="form-select">
												<option value="" selected disabled>Pilih Gugus</option>
												<option :value="items.uuid" v-for="(items,index) in dataGugus" :key="index">{{items.name}}</option>
											</select>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="alamat">Alamat</label>
											<textarea readonly name="alamat" id="alamat" class="form-control" v-model="dataOnePemandu.alamat" placeholder="Masukkan Alamat" cols="30" rows="10"></textarea>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="foto">Foto Pemandu</label>
											<img :src="dataOnePemandu.foto" class="img-show" alt="">
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div class="modal-footer">
						<a type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</a>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="tambahModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Tambah Pemandu</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<form action="" @submit.prevent="tambahPemandu">
								<div class="row">
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nama">Nama Pemandu</label>
											<div class="check-error">
												<input type="text" name="nama" id="nama" placeholder="Nama Pemandu" class="form-control" v-model="tambah.nama">
												<small :class="`text-danger d-flex ${validationTambah.nama.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.nama.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="email">Email</label>
											<div class="check-error">
												<input type="email" name="email" id="email" class="form-control" placeholder="Contoh: nama@email.com" v-model="tambah.email">
												<small :class="`text-danger d-flex ${validationTambah.email.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.email.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="nohp">Nomor Telepon</label>
											<div class="check-error">
												<input type="number" name="nohp" id="nohp" class="form-control" placeholder="Contoh: 08123456789" v-model="tambah.no_hp">
												<small :class="`text-danger d-flex ${validationTambah.no_hp.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.no_hp.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="gugus">Gugus</label>
											<div class="check-error">
												<select name="gugus" id="gugus" v-model="tambah.gugus_id" class="form-select">
													<option value="" selected disabled>Pilih Gugus</option>
													<option :value="items.uuid" v-for="(items,index) in dataGugus" :key="index">{{items.name}}</option>
												</select>
												<small :class="`text-danger d-flex ${validationTambah.gugus_id.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.gugus_id.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="alamat">Alamat</label>
											<div class="check-error">
												<textarea name="alamat" id="alamat" class="form-control" v-model="tambah.alamat" placeholder="Masukkan Alamat" cols="30" rows="10"></textarea>
												<small :class="`text-danger d-flex ${validationTambah.alamat.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.alamat.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="form-group">
											<label for="foto">Foto Pemandu</label>
											<div class="check-error">
												<input type="file" name="foto" id="fotoTambah" class="dropify">
												<small :class="`text-danger d-flex ${validationTambah.foto.status === true ? 'd-none' : 'd-flex'}`">{{validationTambah.foto.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-12 footer-modal">
										<div class="d-flex justify-content-end">
											<button class="btn btn-primary" style="margin-right: 24px;">Tambah</button>
											<a class="btn btn-outline-primary" data-bs-dismiss="modal">Batal</a>
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
			dataPemandu: null,
			dataUser: null,
			dataGugus: null,
			dataOnePemandu: null,
			tambah: {
				nama: null,
				alamat: null,
				no_hp: null,
				foto: null,
				email: null,
				gugus_id: ''
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
				no_hp: {
					status: true,
					message: null
				},
				gugus_id: {
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
				}
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
				no_hp: {
					status: true,
					message: null
				},
				gugus_id: {
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
				}
			}
		}
	},
	methods: {
		navigation(url) {
      if (url) {
        this.dataUser = null;

        axios
          .get(url, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            this.dataUser = res.data.data;

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
        console.log(e)
        var ee = e.target.result
				this.dataOnePemandu.foto = ee.replace("data:image/jpeg;base64,", "")
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(asd);
    },
		editPemandu() {
			if(this.dataOnePemandu.nama && this.dataOnePemandu.email && this.dataOnePemandu.no_hp && this.dataOnePemandu.gugus_id && this.dataOnePemandu.alamat) {
				if (document.getElementById('fotoEdit').files[0]) {
					this.uploadEdit(document.getElementById('fotoEdit').files[0])
				} else {
					this.dataOnePemandu.foto = null
				}
				setTimeout(() => {
					axios.put(`${this.url}bemkm/superadmin/pemandu/${this.dataOnePemandu.uuid}`, this.dataOnePemandu, {
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
			}
			if(!this.dataOnePemandu.nama) {
				this.validationEdit.nama.status = false
				this.validationEdit.nama.message = 'Nama Pemandu harus diisi!'
			} else {
				this.validationEdit.nama.status = true
				this.validationEdit.nama.message = null
			}

			if(!this.dataOnePemandu.email) {
				this.validationEdit.email.status = false
				this.validationEdit.email.message = 'Email Pemandu harus diisi!'
			} else {
				this.validationEdit.email.status = true
				this.validationEdit.email.message = null
			}

			if(!this.dataOnePemandu.no_hp) {
				this.validationEdit.no_hp.status = false
				this.validationEdit.no_hp.message = 'Nomor Telepon harus diisi!'
			} else {
				this.validationEdit.no_hp.status = true
				this.validationEdit.no_hp.message = null
			}

			if(!this.dataOnePemandu.gugus_id) {
				this.validationEdit.gugus_id.status = false
				this.validationEdit.gugus_id.message = 'Gugus harus dipilih!'
			} else {
				this.validationEdit.gugus_id.status = true
				this.validationEdit.gugus_id.message = null
			}

			if(!this.dataOnePemandu.alamat) {
				this.validationEdit.alamat.status = false
				this.validationEdit.alamat.message = 'Alamat Pemandu harus diisi!'
			} else {
				this.validationEdit.alamat.status = true
				this.validationEdit.alamat.message = null
			}

			// if(!this.dataOnePemandu.foto) {
			// 	this.validationEdit.foto.status = false
			// 	this.validationEdit.foto.message = 'Foto Pemandu harus diisi!'
			// } else{
			// 	this.validationEdit.foto.status = true
			// 	this.validationEdit.foto.message = null
			// }
		},
		openEditPemandu(uuidPemandu) {
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
			axios.get(`${this.url}bemkm/superadmin/pemandu/${uuidPemandu}`, {
				headers: {
					Authorization: localStorage.token
				}
			}).then((result) => {
				console.log(result)
				this.dataOnePemandu = result.data.data
			}).catch((err) => {
				console.log(err)
			});
		},
		hapusPemandu(uuidPemandu, namaPemandu) {
			Swal.fire({
        title: `Hapus Akun ${namaPemandu}`,
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
				console.log(result)
				if(result.isConfirmed) {
					axios.delete(`${this.url}bemkm/superadmin/pemandu/${uuidPemandu}`,{
						headers: {
							Authorization: localStorage.token
						}
					}).then((res) => {
						console.log(res)
						if(res.data.success) {
              Swal.fire(
                'Deleted!',
                `Akun Pemandu ${namaPemandu} telah dihapus!`,
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
        var ee = e.target.result
				this.tambah.foto = ee.replace("data:image/jpeg;base64,", "")
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(asd);
    },
		tambahPemandu() {
			if(this.tambah.nama && this.tambah.email && this.tambah.no_hp && this.tambah.gugus_id && this.tambah.alamat && document.getElementById('fotoTambah').files[0]) {
				if (document.getElementById('fotoTambah').files[0]) {
					this.upload(document.getElementById('fotoTambah').files[0])
				} else {
					this.tambah.foto = null
				}
				setTimeout(() => {
					axios.post(`${this.url}bemkm/superadmin/pemandu`, this.tambah, {
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
				}, 500);
			}
			if(!this.tambah.nama) {
				this.validationTambah.nama.status = false
				this.validationTambah.nama.message = 'Nama Pemandu harus diisi!'
			}else {
				this.validationTambah.nama.status = true
				this.validationTambah.nama.message = null
			}

			if(!this.tambah.email) {
				this.validationTambah.email.status = false
				this.validationTambah.email.message = 'Email Pemandu harus diisi!'
			} else {
				this.validationTambah.email.status = true
				this.validationTambah.email.message = null
			}

			if(!this.tambah.no_hp) {
				this.validationTambah.no_hp.status = false
				this.validationTambah.no_hp.message = 'Nomor Telepon harus diisi!'
			} else {
				this.validationTambah.no_hp.status = true
				this.validationTambah.no_hp.message = null
			}

			if(!this.tambah.gugus_id) {
				this.validationTambah.gugus_id.status = false
				this.validationTambah.gugus_id.message = 'Gugus harus dipilih!'
			} else {
				this.validationTambah.gugus_id.status = true
				this.validationTambah.gugus_id.message = null
			}

			if(!this.tambah.alamat) {
				this.validationTambah.alamat.status = false
				this.validationTambah.alamat.message = 'Alamat Pemandu harus diisi!'
			} else {
				this.validationTambah.alamat.status = true
				this.validationTambah.alamat.message = null
			}

			if(!document.getElementById('fotoTambah').files[0]) {
				this.validationTambah.foto.status = false
				this.validationTambah.foto.message = 'Foto Pemandu harus diisi!'
			} else {
				this.validationTambah.foto.status = true
				this.validationTambah.foto.message = null
			}
		}
	},
	mounted() {
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
		axios.get(`${this.url}bemkm/superadmin/user`, {
			headers: {
				Authorization: localStorage.token
			}
		}).then((result) => {
			console.log(result)
			this.dataUser = result.data.data
			if(this.dataPemandu){
				setTimeout(() => {
					$(".table").DataTable({
						pageLength: 25,
						ordering: false,
						paging: false,
						info: false,
					});
				}, 500);
			}
		}).catch((err) => {
			console.log(err)
		});
		axios.get(`${this.url}bemkm/superadmin/gugus`, {
      headers: {
        Authorization : localStorage.token
      }
    }).then((result) => {
      console.log(result)
      this.dataGugus = result.data.data.data
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