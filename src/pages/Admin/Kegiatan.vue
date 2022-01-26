<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
					<div class="p-3">
						<div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="title-content">Jadwal Kegiatan</div>
              <router-link :to="{name: 'Tambah Kegiatan Master'}" type="button" class="btn btn-success">+ Tambah</router-link>
            </div>
					</div>
        </div>
				<div class="card-shadow mb-3">
					<div class="py-3 pe-3">
						<Loader text="Sedang memuat data Kegiatan." v-if="!dataKegiatan" />
						<NoData v-else-if="dataKegiatan.code == 404" />
						<div class="row m-0" v-else>
							<div style="width: 100%;" class=" g-0 border-start border-dark ps-3">
								<div class="accordion mb-2" id="accordionExample" v-if="dataKegiatan" style="box-shadow: 0 1px 13px 0 rgb(27 27 27 / 10%);">
									<div v-for="(items,index) in dataKegiatan.data" :key="index">
										<div class="accordion-item shadow mb-2">
											<h2 class="accordion-header" :id="`heading${index}`">
												<button class="accordion-button collapsed" type="button" style="border:none;" data-bs-toggle="collapse" :data-bs-target="`#collapse${index}`" aria-expanded="true" aria-controls="collapseOne">
													<div class="d-flex w-100 align-items-center justify-content-between pe-2">
														<p>
															{{items.topik}}
														</p>
														<small>
															{{formatDate(items.start_date)}}
														</small>
													</div>
												</button>
											</h2>
											<div :id="`collapse${index}`" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
												<div class="accordion-body">
													<div>
														<div class="row justify-content-between my-0" style="margin-bottom: 32px;">
															<div class="col-lg-3">
																<div class="form-group">
																	<label for="lampirkan">Lampiran File</label>
																	<a target="_blank" :href="items.lampiran" download="lampiran.jpg" class="btn btn-orange">
																		<img src="../../assets/icons/download-lampiran.svg" alt=""> Download File
																	</a>
																</div>
															</div>
															<div class="col-lg-3 align-self-start">
																<div class="d-flex w-100 justify-content-end">
																	<router-link :to="{name: 'Edit Kegiatan Master', params: {id: items.uuid}}" class="btn btn-warning me-2"><i class="fas fa-pencil-alt text-white"></i> </router-link>
																	<button class="btn btn-danger" @click="deleted(items.uuid, items.topik)"><i class="fa fa-trash"></i> </button>
																</div>
															</div>
														</div>
														<div v-if="items.aktivitas.length !== null">
															<div v-for="(item, i) in items.aktivitas" :key="i">
																<div :class="`d-flex ${item.tipenya.status === 'SELESAI' ? 'selesai-kegiatan' : ''}`">
																	<div class="line-bot">
																		<div class="rounded-check">
																			<p>1</p>
																			<img class="checkmark" src="../../assets/icons/checkmark-circle.svg" alt="">
																		</div>
																		<div class="d-flex justify-content-center" style="height: calc(100% - 32px)">
																			<div class="garis-kebawah"></div>
																		</div>
																	</div>
																	<div class="row g-0 m-0" style="width: calc(100% - 32px - 16px);">
																		<div class="col-lg-10">
																			<div class="activity">
																				<h3>
																					{{item.nama}}
																				</h3>
																				<p>{{item.start_time}} - {{ item.end_time }}</p>
																				<p>
																					{{item.deskripsi}}
																				</p>
																			</div>
																		</div>
																		<div class="col-lg-2">
																			<button class="btn btn-light cursor-not-allowed" disabled v-if="item.tipenya.status === 'SELESAI'">Selesai</button>
																			<button class="btn btn-light cursor-not-allowed" disabled v-if="item.tipenya.status === 'BELUM MULAI'">Mulai</button>
																			<div v-if="item.tipenya.status === 'BERJALAN'">
																				<router-link class="btn btn-success" target="_blank" :to="{ name: 'Streaming Detail Master', params: {id: item.aktivitas_uuid}}" v-if="item.tipenya.nama == 'Streaming'">Mulai</router-link>
																				<router-link class="btn btn-success" target="_blank" :to="{ name: 'Detail Tugas', params: {id: item.aktivitas_uuid} }" v-if="item.tipenya.nama == 'Tugas'">Mulai</router-link>
																				<a class="btn btn-success" target="_blank" :href="item.aktivitas_uuid" v-if="item.tipenya.nama == 'Meeting'">Mulai</a>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
/* eslint-disable no-undef */

export default {
	computed: {
		...mapState(['url'])
	},
	data: function() {
    return {
			loaderPopUp: false,
      width: null,
			dataKegiatan: null
		}
	},
	methods: {
		changeTime(time) {
			return moment(time).locale("id").format('H:mm')
		},
		formatDate(date) {
			return moment(date).locale("id").format('DD MMMM YYYY')
		},
		deleted(uuid, topik) {
			Swal.fire({
        title: `Hapus Aktivitas ${topik}`,
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${this.url}bemkm/superadmin/kegiatanaktivitas/${uuid}`, {
            headers: {
              Authorization: localStorage.token
            }
          }).then((res) => {
            console.log(res)
            if(res.data.success) {
              Swal.fire(
                'Deleted!',
                `Topik ${topik} telah dihapus!`,
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
              )
            }
          }).catch((err) => {
            console.log(err)
          });
					}
      }).catch((errs) => {
				console.log(errs)
			})
			console.log(uuid)
			console.log(topik)
		}
	},
	mounted() {
		$('.dropify').dropify()
		this.width = $(document).width();
		axios.get(`${this.url}bemkm/superadmin/kegiatanaktivitas`,{
			headers:{
				Authorization: localStorage.token
			}
		}).then((result) => {
			console.log(result)
			this.dataKegiatan = result.data
		}).catch((err) => {
			console.log(err)
		});
	}
}
</script>

<style scoped>
.accordion-item.shadow{
	box-shadow: 0px 2px 18px rgb(0 0 0 / 8%) !important;
}
.cursor-not-allowed{
	cursor: not-allowed;
}
.btn-light{
	background: #DDE0E4;
	color: white;
	border-color: #DDE0E4;
}
.activity h3{
	font-size: 14px;
	font-weight: 700;
	color: rgba(19, 15, 38, 1);
	margin: 8px 0 16px 0;
}
.activity p {
	font-size: 14px;
	font-weight: 400;
	color: #130F26;
	margin-bottom: 12px;
}
.line-bot{
	margin-right: 16px;
}
.checkmark{
	display: none;
}
.selesai-kegiatan .checkmark{
	display: block;
}
.rounded-check p{
	color: white;
	font-size: 16px;
	font-weight: 600;
	margin: 0;
}
.selesai-kegiatan .rounded-check p{
	display: none;
}
.selesai-kegiatan .rounded-check, .selesai-kegiatan .garis-kebawah{
	background: rgba(20, 97, 245, 1) !important;
}
.garis-kebawah{
	width: 2px;
	height: 100%;
	display: flex;
	justify-content: center;
	background: rgba(221, 224, 228, 1);
}

.rounded-check{
	width: 32px;
	height: 32px;
	background: rgba(221, 224, 228, 1);
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.input-group .form-control{
	background: white;
	border-radius: 8px !important;
	border-top-right-radius: 0 !important;
	border-bottom-right-radius: 0 !important;
}
.input-group .input-group-text{
	margin-left: -1px !important;
	border-top-left-radius: 0 !important;
	border-bottom-left-radius: 0 !important;
}
.btn-orange{
	background: rgba(255, 170, 41, 1);
	color: white;
	box-shadow: -2px 4px 24px rgba(255, 170, 41, 0.32);
}
.accordion-button{
	background: #F8F8F8 !important;
	border-color: rgba(221, 224, 228, 1) !important;
}
.border-dark{
	border-color: rgba(221, 224, 228, 1) !important;
}
.accordion-button p {
	font-size: 16px;
	font-weight: 600;
	color: rgba(0, 0, 0, 1);
	margin-bottom: 0;
}
.accordion-button small{
	margin-bottom: 0;
	font-size: 16px;
	font-weight: 600;
	color: rgba(79, 86, 101, 1);
}
.first-kegiatan-top{
	/* margin-top: 19px; */
	margin: 19px 0 32px 0;
}
.button-right-left{
	margin: 0 28px 0 36px;
}
a.button-firstnya{
	margin-right: 42px;
}
.first-kegiatan-top h4{
	margin-bottom: 0;
	font-size: 18px;
	font-weight: 600;
	color: rgba(11, 19, 42, 1);
}
</style>