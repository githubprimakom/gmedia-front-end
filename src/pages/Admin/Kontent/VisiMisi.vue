<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
					<div class="p-3">
            <div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="title-content">Visi & Misi</div>
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
										<label for="judultentang">Judul Visi & Misi</label>
										<div class="check-error">
											<input style="border-radius: 8px !important;" type="text" name="judultentang" id="judultentang" v-model="datas.judul_visi" class="form-control">
											<small :class="`text-danger d-flex ${validationEdit.judul_visi.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.judul_visi.message}}</small>
										</div>
									</div>
								</div>
								<div class="col-lg-6">
								</div>
								<div class="col-lg-6">
									<div class="form-group">
										<label for="isiheader">Visi</label>
										<div class="check-error">
											<vue-editor v-model="datas.visi"></vue-editor>
											<small :class="`text-danger d-flex ${validationEdit.visi.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.visi.message}}</small>
										</div>
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group">
										<label for="misitentang">Misi</label>
										<div class="check-error">
											<vue-editor v-model="datas.misi"></vue-editor>
											<small :class="`text-danger d-flex ${validationEdit.misi.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.misi.message}}</small>
										</div>
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group">
										<label for="file">Gambar Tentang</label>
										<input type="file" name="file" class="dropify" id="file" :data-default-file="datas.gambar_visi">
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
import { VueEditor } from 'vue2-editor'
import Swal from 'sweetalert2';
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
				judul_visi: {
					status: true,
					message: null
				},
				visi: {
					status: true,
					message: null
				},
				misi: {
					status: true,
					message: null
				},
				gambar_visi: {
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
        this.datas.gambar_visi = e.target.result
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
				this.uploadEdit(document.getElementById('file').files[0])
			} else {
				console.log('b')
				this.datas.gambar_visi = null
			}
			setTimeout(() => {
				if(this.datas.misi && this.datas.visi && this.datas.judul_visi) {
					axios.post(`${this.url}bemkm/landing/visi/`, {
						judul_visi: this.datas.judul_visi,
						visi: this.datas.visi,
						misi: this.datas.misi,
						gambar_visi: this.datas.gambar_visi
					}, {
						headers: {
							Authorization: localStorage.token
						}
					}).then((result) => {
						console.log(result)
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
				if(!this.datas.judul_visi) {
					this.validationEdit.judul_visi.status = false
					this.validationEdit.judul_visi.message = "Judul Visi & Misi Harus Diisi"
				} else {
					this.validationEdit.judul_visi.status = true
					this.validationEdit.judul_visi.message = null
				}
				if(!tinymce.get("isiheader").getContent()) {
					this.validationEdit.visi.status = false
					this.validationEdit.visi.message = "Visi Harus Diisi"
				} else {
					this.validationEdit.visi.status = true
					this.validationEdit.visi.message = null
				}
				if(!tinymce.get("misitentang").getContent()) {
					this.validationEdit.misi.status = false
					this.validationEdit.misi.message = "Misi Harus Diisi"
				} else {
					this.validationEdit.misi.status = true
					this.validationEdit.misi.message = null
				}
			}, 500);
		}
	},
	mounted() {
		this.width = $(document).width();
		axios.get(`${this.url}bemkm/landing/visi`, {
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