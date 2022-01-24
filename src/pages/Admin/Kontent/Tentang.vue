<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
					<div class="p-3">
            <div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="title-content">Tentang</div>
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
										<label for="judultentang">Judul Tentang</label>
										<div class="check-error">
											<input style="border-radius: 8px !important;" type="text" name="judultentang" id="judultentang" v-model="datas.judul_tentang" class="form-control">
											<small :class="`text-danger d-flex ${validationEdit.judul_tentang.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.judul_tentang.message}}</small>
										</div>
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group">
										<label for="subtitletentang">Subtitle Tentang</label>
										<div class="check-error">
											<input style="border-radius: 8px !important;" type="text" name="subtitletentang" id="subtitletentang" v-model="datas.subtitle_tentang" class="form-control">
											<small :class="`text-danger d-flex ${validationEdit.subtitle_tentang.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.subtitle_tentang.message}}</small>
										</div>
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group">
										<label for="titletentang">Title Tentang</label>
										<div class="check-error">
											<input style="border-radius: 8px !important;" type="text" name="titletentang" id="titletentang" v-model="datas.title_tentang" class="form-control">
											<small :class="`text-danger d-flex ${validationEdit.title_tentang.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.title_tentang.message}}</small>
										</div>
									</div>
								</div>
								<div class="col-lg-6"></div>
								<div class="col-lg-6">
									<div class="form-group">
										<label for="isiheader">Isi Tentang</label>
										<div class="check-error">
											<vue-editor v-model="datas.isi_tentang"></vue-editor>
											<small :class="`text-danger d-flex ${validationEdit.isi_tentang.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.isi_tentang.message}}</small>
										</div>
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group">
										<label for="file">Video Tentang</label>
										<input type="file" name="file" class="dropify" id="file" :data-default-file="datas.gambar_tentang">
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
				judul_tentang: {
					status: true,
					message: null
				},
				isi_tentang: {
					status: true,
					message: null
				},
				gambar_tentang: {
					status: true,
					message: null
				},
				title_tentang: {
					status: true,
					message: null
				},
				subtitle_tentang: {
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
        this.datas.gambar_tentang = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(asd);
    },
		edits() {
			let extension
			if (document.getElementById('file').files[0]) {
				let nameFile = $('#file').val()
				let lastDot = nameFile.lastIndexOf(".")
				extension = nameFile.substring(lastDot + 1)
				console.log(extension)
				this.uploadEdit(document.getElementById('file').files[0])
			} else {
				console.log('b')
				this.datas.gambar_tentang = null
			}
			setTimeout(() => {
				if(this.datas.isi_tentang && this.datas.judul_tentang && this.datas.title_tentang) {
					axios.post(`${this.url}bemkm/landing/tentang/`, {
						ekstensi: extension,
						judul_tentang: this.datas.judul_tentang,
						title_tentang: this.datas.title_tentang,
						subtitle_tentang: this.datas.subtitle_tentang,
						isi_tentang: this.datas.isi_tentang,
						gambar_tentang: this.datas.gambar_tentang
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
				if(!this.datas.judul_tentang) {
					this.validationEdit.judul_tentang.status = false
					this.validationEdit.judul_tentang.message = "Judul Tentang Harus Diisi"
				} else {
					this.validationEdit.judul_tentang.status = true
					this.validationEdit.judul_tentang.message = null
				}
				if(!this.datas.title_tentang) {
					this.validationEdit.title_tentang.status = false
					this.validationEdit.title_tentang.message = "Title Tentang Harus Diisi"
				} else {
					this.validationEdit.title_tentang.status = true
					this.validationEdit.title_tentang.message = null
				}
				if(!this.datas.subtitle_tentang) {
					this.validationEdit.subtitle_tentang.status = false
					this.validationEdit.subtitle_tentang.message = "Subtitle Tentang Harus Diisi"
				} else {
					this.validationEdit.subtitle_tentang.status = true
					this.validationEdit.subtitle_tentang.message = null
				}
				if(!this.datas.isi_tentang) {
					this.validationEdit.isi_tentang.status = false
					this.validationEdit.isi_tentang.message = "Isi Tentang Harus Diisi"
				} else {
					this.validationEdit.isi_tentang.status = true
					this.validationEdit.isi_tentang.message = null
				}
			}, 500);
		}
	},
	mounted() {
		this.width = $(document).width();
		axios.get(`${this.url}bemkm/landing/tentang`, {
			headers: {
				Authorization: localStorage.token
			}
		}).then((result) => {
			console.log(result)
			this.datas = result.data.data
			$(document).ready(function() {
				$('.dropify').dropify()
				tinymce.init({
          selector: "#isiheader",
          menubar: false,
          min_height: 300,
        });
				tinymce.get("isiheader").setContent(result.data.data.isi_header);
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