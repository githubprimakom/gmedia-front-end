<template>
  <div class="dashboard">
    <NavbarPemandu :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="row">
          <div class="col-lg-4 col-md-4">
            <div class="card-shadow mb-3">
              <div class="p-3">
                <div class="title-content mb-2">Selamat Datang 🎉</div>
                <div style="font-size: 18px;">Presensi terpagi hari ini</div>
                <div class="time-presensi mt-4 mb-3 text-primary">
                  06.32 WIB
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4">
            <div class="card-shadow mb-3">
              <div class="p-3" v-if="datas">
                <div style="height: 150px;" class="d-flex flex-column justify-content-between">
                  <div class="d-flex justify-content-between">
                    <h5 class="title-card-dash">Mahasiswa</h5>
                    <h3 class="value">
                      {{datas.mahasiswa.total}}
                    </h3>
                  </div>
                  <div  class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="rad-icon red">
                        <img src="../../assets/icons/user-red.svg" alt="">
                      </div>
                      <div>
                        <h3 class="value">
                          {{datas.mahasiswa.laki}}
                        </h3>
                        <p class="kelamin">Laki-Laki</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="rad-icon green">
                        <img src="../../assets/icons/user-green.svg" alt="">
                      </div>
                      <div>
                        <h3 class="value">
                          {{datas.mahasiswa.perempuan}}
                        </h3>
                        <p class="kelamin">Perempuan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4">
            <div class="card-shadow mb-3">
              <div class="p-3" v-if="datas">
                <div style="height: 150px;" class="d-flex flex-column justify-content-between">
                  <div class="d-flex justify-content-between">
                    <h5 class="title-card-dash">Pemandu</h5>
                    <h3 class="value">
                      {{datas.pemandu.total}}
                    </h3>
                  </div>
                  <div  class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="rad-icon yellow">
                        <img src="../../assets/icons/user-yellow.svg" alt="">
                      </div>
                      <div>
                        <h3 class="value">
                          {{datas.pemandu.laki}}
                        </h3>
                        <p class="kelamin">Laki-Laki</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="rad-icon blue">
                        <img src="../../assets/icons/user-blue.svg" alt="">
                      </div>
                      <div>
                        <h3 class="value">
                          {{datas.pemandu.perempuan}}
                        </h3>
                        <p class="kelamin">Perempuan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="card-shadow mb-3">
              <div class="p-3"></div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-shadow mb-3">
              <div class="p-3"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState} from 'vuex'
/* eslint-env jquery */

export default {
  computed: {
    ...mapState(['url'])
  },
  data: function() {
    return {
      width: null,
      datas: null
    };
  },
  mounted() {
    axios.get(`${this.url}bemkm/pemandu/dashboard`, {
      headers: {
        Authorization: localStorage.token
      }
    }).then((result) => {
      if(result.data.success) {
        this.datas = result.data.data
      }else if(result.message === 'Unauthorize') {
        localStorage.clear()
        this.$router.push({ name: 'Landing Page' })
      }
    }).catch((err) => {
      console.log(err)
    });
    this.width = $(document).width();

    $(document).ready(function() {
      $(".table").DataTable();
    });
  },
};
</script>

<style scoped>
.kelamin{
  margin-bottom: 0;
  font-size: 12px;
  font-weight: 400;
  color: rgba(79, 86, 101, 1);
}
.rad-icon.blue{
  background-color: rgba(10, 212, 237, 0.1);
}
.rad-icon.yellow{
  background-color: rgba(255, 200, 107, 0.1);
}
.rad-icon.green{
  background-color: rgba(40, 199, 111, 0.1);
}
.rad-icon.red{
  background-color: rgba(234, 84, 85, 0.1);
}
.rad-icon{
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  margin-right: 15px;
}
</style>