<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
					<div class="p-3">
            <div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="title-content">Header</div>
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
										<label for="judulheader">Judul Header</label>
										<div class="check-error">
											<input style="border-radius: 8px !important;" type="text" name="judulheader" id="judulheader" v-model="datas.judul_header" class="form-control">
											<small :class="`text-danger d-flex ${validationEdit.judul_header.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.judul_header.message}}</small>
										</div>
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group">
										<label for="subjudul">Sub Judul Header</label>
										<div class="check-error">
											<input style="border-radius: 8px !important;" type="text" name="subjudul" id="subjudul" v-model="datas.sub_judul" class="form-control">
											<small :class="`text-danger d-flex ${validationEdit.sub_judul_header.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.sub_judul_header.message}}</small>
										</div>
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group">
										<label for="isiheader">Isi Header</label>
										<div class="check-error">
											<vue-editor v-model="datas.isi_header"></vue-editor>
											<small :class="`text-danger d-flex ${validationEdit.isi_header.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.isi_header.message}}</small>
										</div>
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group">
										<label for="file">Gambar Header</label>
										<input type="file" name="file" class="dropify" id="file" :data-default-file="datas.gambar_header">
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
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
import Swal from 'sweetalert2';
import { VueEditor } from 'vue2-editor'

/* eslint-disable no-undef */

export default {
	components: {
		VueEditor
	},
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
				judul_header: {
					status: true,
					message: null
				},
				sub_judul_header: {
					status: true,
					message: null
				},
				isi_header: {
					status: true,
					message: null
				},
				gambar_header: {
					status: true,
					message: null
				},
			}
		}
	},
	methods: {
		uploadEdit(asd) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e);
        this.datas.gambar_header = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(asd);
    },
		edits() {
			if (document.getElementById('file').files[0]) {
				console.log('a')
				this.uploadEdit(document.getElementById('file').files[0])
			} else {
				console.log('b')
				this.datas.gambar_header = null
			}
			setTimeout(() => {
				if(this.datas.isi_header && this.datas.judul_header && this.datas.sub_judul) {
					axios.post(`${this.url}bemkm/landing/header/`, {
						judul_header: this.datas.judul_header,
						sub_judul: this.datas.sub_judul,
						isi_header: this.datas.isi_header,
						gambar_header: this.datas.gambar_header
					}, {
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
				if(!this.datas.judul_header) {
					this.validationEdit.judul_header.status = false
					this.validationEdit.judul_header.message = "Judul Header Harus Diisi"
				} else {
					this.validationEdit.judul_header.status = true
					this.validationEdit.judul_header.message = null
				}
				if(!this.datas.sub_judul) {
					this.validationEdit.sub_judul_header.status = false
					this.validationEdit.sub_judul_header.message = "Sub Judul Header Harus Diisi"
				} else {
					this.validationEdit.sub_judul_header.status = true
					this.validationEdit.sub_judul_header.message = null
				}
				if(!this.datas.isi_header) {
					this.validationEdit.isi_header.status = false
					this.validationEdit.isi_header.message = "Isi Header Harus Diisi"
				} else {
					this.validationEdit.isi_header.status = true
					this.validationEdit.isi_header.message = null
				}
			}, 500);
		}
	},
	mounted() {
		this.width = $(document).width();
		axios.get(`${this.url}bemkm/landing/header`, {
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