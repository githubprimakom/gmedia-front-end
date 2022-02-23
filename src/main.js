import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./stores";
// import VueApexCharts from "vue-apexcharts";
// import NavbarAdmin from "./components/NavbarAdmin.vue";
// import NavbarPemandu from "./components/NavbarPemandu.vue";
// import NavbarMahasiswa from "./components/NavbarMahasiswa.vue";
// import Loader from "./components/Loader.vue";
// import Footer from "./components/Footer.vue";
// import Pagination from "./components/Pagination.vue";
// import NoData from "./components/NoData.vue";
// import { ObserveVisibility } from "vue-observe-visibility";

// Vue.directive("observe-visibility", ObserveVisibility);

Vue.config.productionTip = false;

// Vue.use(VueApexCharts);

// Vue.component("apexchart", VueApexCharts);
// Vue.component("NavbarAdmin", NavbarAdmin);
// Vue.component("NavbarPemandu", NavbarPemandu);
// Vue.component("NavbarMahasiswa", NavbarMahasiswa);
// Vue.component("Loader", Loader);
// Vue.component("Footer", Footer);
// Vue.component("Pagination", Pagination);
// Vue.component("NoData", NoData);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
