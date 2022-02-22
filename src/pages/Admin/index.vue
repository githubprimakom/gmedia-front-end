<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="row">
          <div
            class="col-lg-6 col-md-6"
            v-if="gugusMahasiswa.options.xaxis.categories.length > 0"
            id="gugusMahasiswa"
          >
            <div class="card-shadow mb-3">
              <div class="card-header">
                <div class="h5">Staff per departemen</div>
              </div>
              <div class="card-body">
                <apexchart
                  type="bar"
                  :width="widthGugusMahasiswa"
                  height="400"
                  :options="gugusMahasiswa.options"
                  :series="gugusMahasiswa.series"
                ></apexchart>
              </div>
            </div>
          </div>
          <div
            class="col-lg-6 col-md-6"
            v-if="gugusTugas.options.labels.length > 0"
            id="gugusTugas"
          >
            <div class="card-shadow mb-3">
              <div class="card-header">
                <div class="h5">Tugas per departemen</div>
              </div>
              <div class="card-body">
                <apexchart
                  type="pie"
                  :width="widthGugusTugas"
                  height="400"
                  :options="gugusTugas.options"
                  :series="gugusTugas.series"
                ></apexchart>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="card-shadow mb-3">
              <div class="p-3" v-if="datas">
                <router-link
                  :to="{ name: 'Mahasiswa Master' }"
                  style="height: 150px;"
                  class="d-flex flex-column justify-content-between"
                >
                  <div class="d-flex justify-content-between">
                    <h5 class="title-card-dash">Staff</h5>
                    <h3 class="value">
                      {{ datas.mahasiswa.total }}
                    </h3>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="rad-icon red">
                        <img src="../../assets/icons/user-red.svg" alt="" />
                      </div>
                      <div>
                        <h3 class="value">
                          {{ datas.mahasiswa.laki }}
                        </h3>
                        <p class="kelamin">Laki-Laki</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="rad-icon green">
                        <img src="../../assets/icons/user-green.svg" alt="" />
                      </div>
                      <div>
                        <h3 class="value">
                          {{ datas.mahasiswa.perempuan }}
                        </h3>
                        <p class="kelamin">Perempuan</p>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="card-shadow mb-3">
              <div class="p-3" v-if="datas">
                <router-link
                  :to="{ name: 'Tugas Master' }"
                  style="height: 150px;"
                  class="d-flex flex-column justify-content-between"
                >
                  <div class="d-flex justify-content-between">
                    <h5 class="title-card-dash">Tugas</h5>
                    <h3 class="value">
                      {{ datas.tugas.total }}
                    </h3>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="rad-icon red">
                        <i class="fas fa-check text-danger"></i>
                      </div>
                      <div>
                        <h3 class="value">
                          {{ datas.tugas.selesai }}
                        </h3>
                        <p class="kelamin">Selesai</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="rad-icon green">
                        <i class="far fa-clock text-success"></i>
                      </div>
                      <div>
                        <h3 class="value">
                          {{ datas.tugas.berjalan }}
                        </h3>
                        <p class="kelamin">Berjalan</p>
                      </div>
                    </div>
                  </div>
                </router-link>
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
import axios from "axios";
import { mapState } from "vuex";
/* eslint-env jquery */

export default {
  computed: {
    ...mapState(["url"]),
  },
  data: function() {
    return {
      width: null,
      datas: null,
      widthGugusMahasiswa: 100,
      widthGugusTugas: 100,
      gugusMahasiswa: {
        options: {
          stroke: {
            curve: "smooth",
          },
          responsive: [
            {
              breakpoint: 100,
              options: {
                chart: {
                  width: 25,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
          colors: ["#0B7517"],
          xaxis: {
            categories: [],
            convertedCatToNumeric: false,
          },
          yaxis: {
            labels: {
              formatter: function(val) {
                return val;
              },
            },
          },
          dataLabels: {
            formatter: function(val) {
              return `${val} Staff`;
            },
          },
        },
        series: [
          {
            name: "Jumlah staff",
            data: [3, 3],
          },
        ],
      },
      gugusTugas: {
        options: {
          chart: {
            type: "pie",
          },
          labels: [],
          responsive: [
            {
              breakpoint: 100,
              options: {
                chart: {
                  width: 25,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
          dataLabels: {
            formatter: function(val, opts) {
              return `${opts.w.config.series[opts.seriesIndex]} Tugas`;
            },
          },
        },
        series: [0, 9, 0],
      },
    };
  },
  mounted() {
    this.width = $(document).width();
    axios
      .get(`${this.url}bemkm/superadmin/dashboard`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        if (result.data.success) {
          this.datas = result.data.data;
          this.gugusMahasiswa.options.xaxis.categories = result.data.data.gugus;
          this.gugusMahasiswa.series[0].data = result.data.data.mahasiswa_count;
          this.gugusTugas.series = result.data.data.tugas_count;
          this.gugusTugas.options.labels = result.data.data.gugus;
          setTimeout(() => {
            this.widthGugusMahasiswa = $("#gugusMahasiswa").width() - 32;
            this.widthGugusTugas = $("#gugusTugas").width() - 32;
          }, 100);
        } else if (result.message === "Unauthorize") {
          localStorage.clear();
          this.$router.push({ name: "Landing Page" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.kelamin {
  margin-bottom: 0;
  font-size: 12px;
  font-weight: 400;
  color: rgba(79, 86, 101, 1);
}
.rad-icon.blue {
  background-color: rgba(10, 212, 237, 0.1);
}
.rad-icon.yellow {
  background-color: rgba(255, 200, 107, 0.1);
}
.rad-icon.green {
  background-color: rgba(40, 199, 111, 0.1);
}
.rad-icon.red {
  background-color: rgba(234, 84, 85, 0.1);
}
.rad-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  margin-right: 15px;
}
.title-card-dash {
  font-size: 18px;
  font-weight: 400;
}
.value {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}
</style>
