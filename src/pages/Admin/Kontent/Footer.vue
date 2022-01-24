<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
					<div class="p-3">
            <div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="title-content">Footer</div>
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
										<label for="judultentang">Subtitle Footer</label>
										<div class="check-error">
											<input style="border-radius: 8px !important;" type="text" name="judultentang" id="judultentang" v-model="datas.subtitle_footer" class="form-control">
											<small :class="`text-danger d-flex ${validationEdit.subtitle_footer.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.subtitle_footer.message}}</small>
										</div>
									</div>
								</div>
								<div class="col-lg-6"></div>
								<div class="col-lg-12 mt-2">
									<h5>Social Media</h5>
									<hr class="borbot">
								</div>
								<div class="row">
									<div class="col-lg-4">
										<div class="form-group">
											<label for="Facebook">Facebook</label>
											<div class="check-error">
												<input type="text" name="Facebook" v-model="datas.sosmed.facebook" id="Facebook" class="form-control">
												<small :class="`text-danger d-flex ${validationEdit.facebook.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.facebook.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-4">
										<div class="form-group">
											<label for="Twitter">Twitter</label>
											<div class="check-error">
												<input type="text" name="Twitter" v-model="datas.sosmed.twitter" id="Twitter" class="form-control">
												<small :class="`text-danger d-flex ${validationEdit.twitter.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.twitter.message}}</small>
											</div>
										</div>
									</div>
									<div class="col-lg-4">
										<div class="form-group">
											<label for="Instagram">Instagram</label>
											<div class="check-error">
												<input type="text" name="Instagram" v-model="datas.sosmed.instagram" id="Instagram" class="form-control">
												<small :class="`text-danger d-flex ${validationEdit.instagram.status === true ? 'd-none' : 'd-flex'}`">{{validationEdit.instagram.message}}</small>
											</div>
										</div>
									</div>
								</div>
								<div class="col-lg-12 mt-2">
									<h5>Kontent Footer</h5>
									<hr class="borbot">
								</div>
								<div class="row">
									<div class="col-lg-6" v-for="(items,index) in datas.kampus" :key="index">
										<div class="form-group">
											<label :for="'namefoot'+[index]">Title Footer</label>
											<div class="check-error">
												<input type="text" class="form-control" :name="'namefoot'+[index]" :id="'namefoot'+[index]" v-model="items.nama">
												<small :class="`text-danger d-flex ${kampus[index].nama.status === true ? 'd-none' : 'd-flex'}`">{{kampus[index].nama.message}}</small>
											</div>
										</div>
										<div class="form-group">
											<label :for="'alamat'+[index]">Alamat</label>
											<div class="check-error">
												<textarea v-model="items.alamat" :name="'alamat'+[index]" :id="'alamat'+[index]" class="form-control"></textarea>
												<small :class="`text-danger d-flex ${kampus[index].alamat.status === true ? 'd-none' : 'd-flex'}`">{{kampus[index].alamat.message}}</small>
											</div>
										</div>
										<div class="form-group">
											<label :for="'numphone'+[index]">No. Telepon</label>
											<div class="check-error">
												<input type="number" :name="'numphone'+[index]" v-model="items.telepon" :id="'numphone'+[index]" class="form-control">
												<small :class="`text-danger d-flex ${kampus[index].telepon.status === true ? 'd-none' : 'd-flex'}`">{{kampus[index].telepon.message}}</small>
											</div>
										</div>
										<div class="form-group">
											<label :for="'email'+[index]">Email</label>
											<div class="check-error">
												<input type="email" :name="'email'+[index]" :id="'email'+[index]" class="form-control" v-model="items.email">
												<small :class="`text-danger d-flex ${kampus[index].email.status === true ? 'd-none' : 'd-flex'}`">{{kampus[index].email.message}}</small>
											</div>
										</div>
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
// import { VueEditor } from 'vue2-editor'
import Swal from 'sweetalert2';
/* eslint-disable no-undef */

export default {
	components: {
		// VueEditor
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
				subtitle_footer: {
					status: true,
					message: null
				},
				facebook: {
					status: true,
					message: null
				},
				twitter: {
					status: true,
					message: null
				},
				instagram: {
					status: true,
					message: null
				},
			},
			kampus: []
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
			let count = 0
			for(let i = 0; i < this.datas.kampus.length;i++) {
				if(!this.datas.kampus[i].alamat) {
					this.kampus[i].alamat.status = false
					this.kampus[i].alamat.message = "Alamat Footer Harus Diisi"
				} else {
					this.kampus[i].alamat.status = true
					this.kampus[i].alamat.message = null
				}
				if(!this.datas.kampus[i].nama) {
					this.kampus[i].nama.status = false
					this.kampus[i].nama.message = "Title Footer Harus Diisi"
				} else {
					this.kampus[i].nama.status = true
					this.kampus[i].nama.message = null
				}
				if(!this.datas.kampus[i].email) {
					this.kampus[i].email.status = false
					this.kampus[i].email.message = "Email Footer Harus Diisi"
				} else {
					this.kampus[i].email.status = true
					this.kampus[i].email.message = null
				}
				if(!this.datas.kampus[i].telepon) {
					this.kampus[i].telepon.status = false
					this.kampus[i].telepon.message = "Telepon Footer Harus Diisi"
				} else {
					this.kampus[i].telepon.status = true
					this.kampus[i].telepon.message = null
				}
				if(this.datas.kampus[i].telepon && this.datas.kampus[i].nama && this.datas.kampus[i].email && this.datas.kampus[i].alamat) {
					count++
				}
			}
			if(this.datas.subtitle_footer && this.datas.sosmed.facebook && this.datas.sosmed.twitter && this.datas.sosmed.instagram && count == this.datas.kampus.length) {
				axios.put(`${this.url}bemkm/landing/kampus/`, this.datas,{
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
			if(!this.datas.subtitle_footer) {
				this.validationEdit.subtitle_footer.status = false
				this.validationEdit.subtitle_footer.message = "Subtitle Footer Harus Diisi"
			} else {
				this.validationEdit.subtitle_footer.status = true
				this.validationEdit.subtitle_footer.message = null
			}
			if(!this.datas.sosmed.facebook) {
				this.validationEdit.facebook.status = false
				this.validationEdit.facebook.message = "Facebook Link Harus Diisi"
			} else {
				this.validationEdit.facebook.status = true
				this.validationEdit.facebook.message = null
			}
			if(!this.datas.sosmed.twitter) {
				this.validationEdit.twitter.status = false
				this.validationEdit.twitter.message = "Twitter Link Harus Diisi"
			} else {
				this.validationEdit.twitter.status = true
				this.validationEdit.twitter.message = null
			}
			if(!this.datas.sosmed.instagram) {
				this.validationEdit.instagram.status = false
				this.validationEdit.instagram.message = "Instagram Link Harus Diisi"
			} else {
				this.validationEdit.instagram.status = true
				this.validationEdit.instagram.message = null
			}
		}
	},
	mounted() {
		this.width = $(document).width();
		axios.get(`${this.url}/bemkm/landing/kampus`, {
			headers: {
				Authorization: localStorage.token
			}
		}).then((result) => {
			console.log(result)
			this.datas = result.data.data
			for(let i = 0;i < result.data.data.kampus.length;i++) {
				this.kampus.push({
					alamat: {
						status: true,
						message: null
					},
					nama: {
						status: true,
						message: null
					},
					telepon: {
						status: true,
						message: null
					},
					email: {
						status: true,
						message: null
					},
				})
			}
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
hr.borbot{
	width: 70px;
	height: 4px;
	border-radius: 20px;
	background-color: #ffc107;
	opacity: .7;
}
.form-control{
  border-radius: 8px !important;
  /* background: #F8F8F8; */
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