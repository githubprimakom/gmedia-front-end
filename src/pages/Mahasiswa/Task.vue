<template>
  <div class="dashboard">
    <NavbarMahasiswa :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="title-content">Tugas Pertama</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-9 col-md-8" v-if="false">
            <div class="card-shadow mb-3 warning text-warning">
              <div class="p-3">
                <div class="d-flex align-items-center">
                  <i
                    class="fas fa-info-circle me-2"
                    style="font-size: 22px;"
                  ></i>
                  <div style="font-size: 18px; font-weight: 500;">
                    Sedang mengirim jawaban! Mohon menunggu.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-9 mb-3">
            <div class="card-shadow mb-3">
              <div class="card-body">
                <MultipleChoice v-if="types[now] == 'multiple choice'" />
                <Matching v-if="types[now] == 'matching'" />
                <Short v-if="types[now] == 'short'" />
                <Essay v-if="types[now] == 'essay'" />
                <Upload v-if="types[now] == 'upload'" />
                <div
                  class="d-flex flex-column flex-md-row justify-content-between pt-5"
                >
                  <button
                    class="btn btn-secondary px-4 mb-3 mb-md-0"
                    type="button"
                    @click="prev"
                    :disabled="now == 0"
                  >
                    Sebelumnya
                  </button>
                  <router-link
                    :to="{
                      name: 'My Course Detail',
                      params: {
                        id: $route.params.id,
                      },
                    }"
                    class="btn btn-danger px-4"
                    @click="finish"
                    v-if="now + 1 == types.length"
                  >
                    Selesai
                  </router-link>
                  <button
                    :class="
                      `btn btn-primary px-4 ${
                        now == types.length ? 'd-none' : ''
                      }`
                    "
                    type="button"
                    @click="next"
                    v-else
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-4">
            <div class="card-shadow bg-count mb-3">
              <div class="p-3">
                <div
                  v-if="
                    countdown.days !== null &&
                      countdown.hours !== null &&
                      countdown.minutes !== null &&
                      countdown.seconds !== null
                  "
                  class="countdown text-white pb-3"
                >
                  <span class="count day">{{
                    countdown.days > 9 ? countdown.days : "0" + countdown.days
                  }}</span>
                  :
                  <span class="count hour">{{
                    countdown.hours > 9
                      ? countdown.hours
                      : "0" + countdown.hours
                  }}</span>
                  :
                  <span class="count minute">{{
                    countdown.minutes > 9
                      ? countdown.minutes
                      : "0" + countdown.minutes
                  }}</span>
                  :
                  <span class="count second"
                    >{{
                      countdown.seconds > 9
                        ? countdown.seconds
                        : "0" + countdown.seconds
                    }}
                  </span>
                </div>
                <div
                  v-else
                  class="text-center text-white py-3 fw-bold"
                  style="font-size: 20px;"
                >
                  Sedang Memuat.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import NavbarMahasiswa from "../../components/NavbarMahasiswa.vue";
import Essay from "../../components/Question/Do/Essay.vue";
import Matching from "../../components/Question/Do/Matching.vue";
import MultipleChoice from "../../components/Question/Do/MultipleChoice.vue";
import Short from "../../components/Question/Do/Short.vue";
import Upload from "../../components/Question/Do/Upload.vue";

export default {
  data: function() {
    return {
      width: null,
      countdown: {
        days: null,
        hours: null,
        minutes: null,
        seconds: null,
      },
      types: ["upload", "essay", "short", "matching", "multiple choice"],
      now: 0,
    };
  },
  components: {
    NavbarMahasiswa,
    Essay,
    Matching,
    MultipleChoice,
    Short,
    Upload,
  },
  methods: {
    next() {
      this.now++;
    },
    prev() {
      this.now--;
    },
    finish() {
      alert("Selesai");
    },
  },
  mounted() {
    this.width = $(document).width();
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    const countDown = new Date("20 May 2022, 10:10").getTime(),
      x = setInterval(() => {
        const now = new Date().getTime(),
          distance = countDown - now;

        this.countdown.days = Math.floor(distance / day);
        this.countdown.hours = Math.floor((distance % day) / hour);
        this.countdown.minutes = Math.floor((distance % hour) / minute);
        this.countdown.seconds = Math.floor((distance % minute) / second);

        if (distance < 0) {
          clearInterval(x);
        }
      }, 0);
  },
};
</script>
