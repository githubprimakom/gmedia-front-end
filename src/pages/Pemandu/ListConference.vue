<template>
  <div class="dashboard">
    <NavbarPemandu :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
					<div class="p-3">
						<div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="title-content">List Konferensi</div>
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
						<Loader text="Sedang memuat data konfrensi." v-if="!dataKonferensi" />

						<div class="table-responsive" v-else>
							<table class="table" id="table">
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
											<div>
												<router-link :to="{ name: 'Conference Pemandu', params: { id: items.uuid } }" class="btn btn-shadow btn-primary">Join</router-link>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<Pagination :data="dataKonferensi" ammount="mahasiswa" :function="navigation" />
					</div>
				</div>
				<Footer />

			</div>
		</div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import axios from 'axios'
import moment from "moment";
import { mapState } from 'vuex'

export default {
	computed: {
    ...mapState(["url"]),
  },
	data: function() {
    return {
      width: null,
			dataKonferensi: null,
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
		getConference() {
			axios.get(`${this.url}bemkm/pemandu/konferensi`, {
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
		formatDate(date) {
			return moment(date).locale("id").format("DD MMMM YYYY");
		},
	},
	mounted() {
		this.width = $(document).width();
		this.getConference()
	}
}
</script>

<style scoped>
.btn{
	transition: .3s all;
	padding: .375rem .75rem;
	border-radius: .25rem !important;
}
.btn-shadow{
	box-shadow: 0 7px 14px 0 rgb(80 110 228 / 50%);
}
.btn-primary{
	background: #506ee4;
	border-color: #506ee4;
}
.btn-primary:hover {
	color: #fff;
	box-shadow: none;
	background-color: #2f53df;
	border-color: #2449dd;
}
</style>