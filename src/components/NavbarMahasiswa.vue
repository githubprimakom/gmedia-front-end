<template>
  <div>
    <div class="chat">
      <div class="box-chats shadow" id="box-chat">
        <div class="name-chat">
          <div class="d-flex align-items-center">
            <img class="profile-42" src="../assets/icons/profile.svg" alt="" />
            <h3 class="name-profile">Admin Pemandu</h3>
          </div>
          <div class="d-flex align-items-center">
            <img
              @click="getlist"
              style="margin-right: 35px"
              src="../assets/icons/search-2.svg"
              alt=""
            />
            <img src="../assets/icons/burger-circle.svg" alt="" />
          </div>
        </div>
        <div class="message-box" id="box-messages">
          <div v-if="recconect === true" class="ifdisconnect">
            <button @click="reconnects" class="btn btn-primary">
              Recconect
            </button>
          </div>
          <div v-else v-for="(items, index) in isiChats" :key="index">
            <div
              id="pesan_id"
              :class="`mb-4 d-flex ${items.uid === user.uid ? 'chatme' : ''}`"
            >
              <div :class="`${items.uid === user.uid ? '' : 'd-flex'}`">
                <div
                  :class="
                    `img ${
                      items.uid === user.uid ? 'd-none' : 'd-flex'
                    } align-self-end justify-content-center`
                  "
                >
                  {{ items.initial }}
                </div>
                <div style="max-width: calc(271px - 45px)">
                  <h6 class="text-box-name">{{ items.nama }}</h6>
                  <div class="text-section box-chat">
                    <div class="chat-content">
                      {{ items.value }}
                    </div>
                    <small class="times">{{ items.date }}</small>
                  </div>
                </div>
              </div>
              <div
                :class="
                  `img ${
                    items.uid === user.uid ? 'd-flex' : 'd-none'
                  } aa align-self-end justify-content-center`
                "
              >
                {{ items.initial }}
              </div>
            </div>
          </div>
        </div>
        <form action="" @submit.prevent="kirimpesan">
          <div class="send-box">
            <input
              type="text"
              name="sendmsg"
              id="sendmsg"
              class="form-control "
              v-model="pesann"
              placeholder="Tulis Pesan.."
            />
            <div>
              <button class="btn btn-primary profile-42 ms-3">
                <img src="../assets/icons/plane.svg" alt="" />
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="box-chats shadow" id="box-pemandu">
        <div class="row h-100 align-items-center m-0">
          <div class="px-4">
            <div class="card-shadow">
              <div class="p-3">
                <form action="" @submit.prevent="pilihPemandu">
                  <div class="form-group mb-4" v-if="dataPemandu">
                    <label for="pemandu">Pilih Pemandu</label>
                    <select
                      name="pemandu"
                      required
                      v-model="pemanduuid"
                      id="pemandu"
                      class="form-select"
                    >
                      <option value="" selected disabled>Pilih</option>
                      <option
                        :value="items.user.rusername"
                        v-for="(items, index) in dataPemandu.data[0].pemandu"
                        :key="index"
                        >{{ items.nama }}</option
                      >
                    </select>
                  </div>
                  <div class="">
                    <button class="btn btn-primary w-100">
                      <img
                        src="../assets/icons/plane.svg"
                        class="me-2"
                        alt=""
                      />
                      Kirim Pesan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end w-100">
        <div @click="openChat" class="around-chat">
          <img src="../assets/icons/chat.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="dashboard-navigation">
      <div :class="`sidebar ${$attrs.widthContent > 992 ? '' : 'hide'}`">
        <div
          class="btn btn-light d-flex align-items-center d-lg-none d-block mb-4"
          @click="sidebar"
        >
          <i class="fas fa-times me-2"></i>
          Close
        </div>
        <router-link :to="{ name: 'Index' }">
          <div class="d-flex align-items-center mb-4">
            <img :src="dataLanding.logo" alt="" style="height: 45px;" />
            <div class="logo-text ms-2">
              {{ dataLanding.nama }}
            </div>
          </div>
        </router-link>
        <div class="menu-wrapper">
          <router-link :to="{ name: 'Dashboard Mahasiswa' }">
            <div
              :class="
                `item ${
                  $route.fullPath == '/dashboard' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-chart-line text-primary none"></i>
                <i class="fas fa-chart-line text-white active"></i>
              </div>
              <div class="text">Dashboard</div>
            </div>
          </router-link>
        </div>
        <div class="menu-wrapper">
          <div class="menu-name">Menu</div>
          <!-- <router-link :to="{ name: 'Presensi Mahasiswa' }">
            <div
              :class="
                `item ${
                  $route.fullPath == '/dashboard/presensi' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="far fa-id-card text-primary none"></i>
                <i class="far fa-id-card text-white active"></i>
              </div>
              <div class="text">Presensi</div>
            </div>
          </router-link>

          <router-link :to="{ name: 'Aktivitas Mahasiswa' }">
            <div
              :class="
                `item ${
                  $route.fullPath == '/dashboard/aktivitas' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-chart-line text-primary none"></i>
                <i class="fas fa-chart-line text-white active"></i>
              </div>
              <div class="text">Aktifitas</div>
            </div>
          </router-link>

          <router-link :to="{ name: 'Materi Mahasiswa' }">
            <div
              :class="
                `item ${
                  link[2] == 'materi' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-book text-primary none"></i>
                <i class="fas fa-book text-white active"></i>
              </div>
              <div class="text">Materi</div>
            </div>
          </router-link> -->

          <router-link :to="{ name: 'My Course' }">
            <div
              :class="
                `item ${
                  link[2] == 'course' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-book text-primary none"></i>
                <i class="fas fa-book text-white active"></i>
              </div>
              <div class="text">Kursus Saya</div>
            </div>
          </router-link>

          <!-- <div
            :class="
              `item ${
                link[2] === 'tugas' || link[2] === 'kuis' ? 'collapsed' : ''
              } d-flex align-items-center`
            "
            data-bs-toggle="collapse"
            data-bs-target="#order"
            aria-expanded="false"
            aria-controls="order"
          >
            <div
              style="width: 20px"
              class="icons d-flex justify-content-center me-2"
            >
              <i class="fas fa-tasks text-primary none"></i>
              <i class="fas fa-tasks text-white active"></i>
            </div>
            <div class="text">Penugasan</div>
          </div>
          <div
            :class="
              `collapse ${
                link[2] === 'tugas' || link[2] === 'kuis' ? 'show' : ''
              }`
            "
            id="order"
          >
            <router-link :to="{ name: 'Tugas Mahasiswa' }">
              <div
                :class="
                  `item sub ${
                    link[2] == 'tugas' ? 'active' : ''
                  } d-flex align-items-center`
                "
              >
                <div class="icons me-2">
                  <i class="far fa-circle text-primary none"></i>
                  <i class="far fa-circle text-white active"></i>
                </div>
                <div class="text">Tugas</div>
              </div>
            </router-link>
          </div>

          <router-link :to="{ name: 'List Conference' }">
            <div
              :class="
                `item ${
                  link[2] == 'conference' ? 'active' : ''
                } d-flex align-items-center`
              "
            >
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-video text-primary none"></i>
                <i class="fas fa-video text-white active"></i>
              </div>
              <div class="text">Streaming</div>
            </div>
          </router-link> -->
        </div>
        <div class="menu-wrapper">
          <div class="menu-name">Lainnya</div>
          <div class="item logout d-flex align-items-center" @click="logout">
            <div class="icons me-2">
              <i class="fas fa-sign-out-alt text-primary none"></i>
              <i class="fas fa-sign-out-alt text-white active"></i>
            </div>
            <div class="text">Log out</div>
          </div>
        </div>
      </div>
      <div :class="`content ${$attrs.widthContent > 992 ? '' : 'hide'}`">
        <div class="section pt-3">
          <nav>
            <div class="card-shadow mb-4">
              <div class="py-2 px-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="menu-bar" @click="sidebar">
                    <i class="fas fa-bars"></i>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center" v-if="userData">
                      <div class="text-end me-2">
                        <div class="username">{{ userData.data.nama }}</div>
                        <div class="role">Mahasiswa</div>
                      </div>
                      <div
                        class="profile align-items-center justify-content-center"
                      >
                        <img
                          src="../assets/ilustrasi/avatar-mahasiswa.svg"
                          alt=""
                          v-if="
                            userData.data.foto == '' ||
                              userData.data.foto == 'foto.jpg'
                          "
                        />
                        <img :src="userData.data.foto" v-else alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import Swal from "sweetalert2";
import { mapState } from "vuex";
import axios from "axios";
import rcApi from "../pages/Api/Index";
import moment from "moment";
let api;

export default {
  computed: {
    ...mapState(["userData", "url"]),
  },
  data: function() {
    return {
      dataLanding: {
        logo: "",
        name: "",
      },
      user: {
        uid: localStorage.uid,
      },
      link: this.$route.fullPath.split("/"),
      dataPemandu: null,
      isiChats: [],
      webSocketUrl: "wss://gmedia-chat.primakom.co.id/websocket",
      errors: [],
      messagess: [],
      lastSync: new Date().getTime(),
      syncInterval: 30000,
      connectedToApi: true,
      pesann: null,
      pemanduuid: "",
      dmRoom: "",
      recconect: false,
    };
  },
  beforeCreate() {
    this.$store.dispatch("getMahasiswa");
  },
  methods: {
    getlist() {
      api.sendMessage({
        msg: "method",
        method: "subscriptions/get",
        id: "getList",
        params: [{ $date: 1480377601 }],
      });
    },
    checkOnline() {
      api.sendMessage({
        msg: "method",
        method: "livechat:getInitialData",
        params: ["YhrWFbohXDSYzsG9m"],
        id: "1",
      });
    },
    reconnects() {
      console.log("reload");
    },
    kirimpesan() {
      if (this.pesann) {
        api.sendMessage({
          msg: "method",
          method: "sendMessage",
          id: "" + new Date().getTime(),
          params: [
            {
              _id: "" + new Date().getTime(),
              rid: this.dmRoom,
              msg: this.pesann,
            },
          ],
        });
        this.pesann = "";
      }
    },
    openChat() {
      if (!this.dmRoom) {
        document.getElementById("box-pemandu").classList.toggle("d-block");
        if (document.querySelector("#box-chat").classList.contains("d-block")) {
          document.getElementById("box-chat").classList.remove("d-block");
          document.getElementById("box-pemandu").classList.remove("d-block");
        }
      } else {
        document.getElementById("box-chat").classList.toggle("d-block");
      }
    },
    pilihPemandu() {
      if (this.pemanduuid) {
        api.sendMessage({
          msg: "method",
          method: "createDirectMessage",
          id: "roomid",
          params: [this.pemanduuid],
        });
        document.getElementById("box-pemandu").classList.remove("d-block");
        document.getElementById("box-chat").classList.add("d-block");
      } else {
        Swal.fire("Gagal!", "Mohon maaf Belum ada pemandu", "warning");
      }
    },
    submit() {
      this.section = 0;
      Swal.fire("Data Berhasil Disimpan", "", "success");
      $("#request-modal").modal("hide");
    },
    sidebar() {
      $(".sidebar").toggleClass("hide");
      $(".content").toggleClass("hide");
    },
    logout() {
      localStorage.clear();
      window.location.replace("/");
    },
    getPemandu() {
      axios
        .get(`${this.url}bemkm/mahasiswa/gugus`, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then((result) => {
          this.dataPemandu = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    connectRoom(a) {
      api.sendMessage({
        msg: "sub",
        id: "" + new Date().getTime(),
        name: "stream-room-messages",
        params: [a, false],
      });
      setTimeout(() => {
        api.sendMessage({
          msg: "method",
          method: "loadHistory",
          id: "oldChat",
          params: [a, null, 10000000, { $date: 1480377601 }],
        });
      }, 200);
    },
    loginss() {
      api.loginWithAuthToken(localStorage.tkn).subscribe(
        (apiEvent) => {
          if (apiEvent.msg === "result") {
            // success
            this.messagess.push(apiEvent.msg);
            // this.createDirectMessage()
            // this.connectRoom()
          }
        },
        (error) => {
          this.errors.push(error);
        }
      );
    },
    syncPage() {
      this.lastSync = new Date().getTime();
      console.log("Synch");
      if (
        this.connectedToApi &&
        api &&
        api.webSocket !== null &&
        api.webSocket.socket == null
      ) {
        // on log et on redémarre la fenêtre
        console.log("reload");
        window.location.reload();
      }
    },
  },
  mounted() {
    this.getPemandu();
    axios
      .get(`https://gmedia.primakom.co.id/bemkm/landing/dashboard-navbar`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        console.log(result);
        this.dataLanding = result.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    api = rcApi.connectToRocketChat(this.webSocketUrl);
    api.onError((error) => this.errors.push(error));
    api.onCompletion(() => console.log("finished"));
    api.onMessage((message) => {
      let scrollDown = document.getElementById("box-messages");
      if (
        message.msg === "changed" &&
        message.collection === "stream-room-messages"
      ) {
        let datenya = new Date(message.fields.args[0].ts.$date);
        this.isiChats.push({
          value: message.fields.args[0].msg,
          date: moment(datenya)
            .lang("id")
            .format("h:mm"),
          nama: message.fields.args[0].u.name,
          uid: message.fields.args[0].u._id,
          initial: message.fields.args[0].u.name.charAt(0),
        });
        setTimeout(() => {
          scrollDown.scrollTop =
            scrollDown.scrollHeight + scrollDown.clientHeight;
        }, 200);
        return;
      }
      if (message.msg === "result" && message.id === "roomid") {
        this.dmRoom = message.result.rid;
        this.connectRoom(message.result.rid);
      }
      if (message.msg === "result" && message.id === "oldChat") {
        let dataReverse = message.result.messages.reverse();
        for (let i = 0; i < dataReverse.length; i++) {
          this.isiChats.push({
            value: dataReverse[i].msg,
            date: moment(new Date(dataReverse[i].ts.$date))
              .lang("id")
              .format("h:mm"),
            nama: dataReverse[i].u.name,
            uid: dataReverse[i].u._id,
            initial: dataReverse[i].u.name.charAt(0),
          });
        }
        setTimeout(() => {
          scrollDown.scrollTop =
            scrollDown.scrollHeight + scrollDown.clientHeight;
        }, 200);
        return;
      }
    });
    api.connectToServer().subscribe(
      () => {
        api.keepAlive(); // Ping Server
      },
      (error) => {
        this.errors.push(error);
      }
    );

    // vérification pour mobile devices
    setInterval(function() {
      let now = new Date().getTime();
      if (now - this.lastSync > this.syncInterval) {
        console.log("out of sync");
        this.syncPage();
      }
    }, 2000); // vérifie toutes les 1 sec que 30 sec ont passé depuis la dernière synchro
    this.loginss();
  },
};
</script>

<style scoped>
.chatme .no-me {
  display: block !important;
}
.no-me {
  display: flex;
}
.chatme {
  justify-content: flex-end;
}
.box-chat {
  position: relative;
  max-width: 290px;
  box-shadow: 0px 2px 5px 2px #00000012 !important;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  /* padding: 18px; */
  padding: 6px 60px 8px 9px;
  /* background: rgba(20, 104, 245, 1); */
  background: rgba(114, 142, 224, 1);
  color: white;
  margin: 0 0 0 16px;
}
.chatme small.times {
  color: #333 !important;
}
.box-chat small.times {
  position: absolute;
  right: 10px;
  bottom: 3px;
  font-size: 10px;
  color: #ddd;
}
.chatme .box-chat {
  background: #dde0e4;
  color: rgba(40, 40, 40, 1);
  margin: 0 16px 0 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 0;
}
.chatme .text-box-name {
  text-align: end;
  margin: 0 20px 8px 0;
}
.text-box-name {
  margin: 0 0 8px 16px;
  font-size: 14px;
  font-weight: 700;
  color: rgba(40, 40, 40, 1);
}

.img {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
}
.send-box {
  width: 100%;
  height: 70px;
  padding: 14px 24px;
  background: white;
  display: flex;
}
/* .send-box  */
.message-box {
  width: 100%;
  height: 360px;
  overflow-y: auto;
  padding: 10px 24px 10px 24px;
}
.name-profile {
  margin-left: 12px;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 600;
  color: black;
}
.profile-42 {
  width: 42px;
  height: 42px;
  border-radius: 100% !important;
  object-fit: cover;
}
.name-chat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background: white;
  padding: 14px 24px;
}
.chat {
  position: fixed;
  bottom: 50px;
  right: 28px;
  z-index: 2;
}
.box-chats {
  display: none;
  position: relative;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
  width: 400px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.5);
  background-image: url("../assets/icons/chat-background.svg");
}
.around-chat {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 47px;
  height: 47px;
  transition: 0.5s all;
  border-radius: 100%;
  background: rgba(20, 97, 245, 1);
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.4) !important;
}
.around-chat:hover {
  background: rgb(74, 129, 233);
}
</style>
