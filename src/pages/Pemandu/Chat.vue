<template>
  <div class="dashboard">
    <NavbarPemandu :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow " style="overflow: hidden;">
					<div class="row g-0 position-relative">
						<div class="col-lg-4 position-absolute" id="watchContact" style="left: -100%;top: 0;height: 600px;transition: .8s;">
							<div class="h-100 ">
								<div class="d-flex head-new-chat px-3">
									<div class="d-flex align-items-center">
										<i @click="backChat" class="fa fa-arrow-left cursor-pointer"></i>
										<p>Chat Baru</p>
									</div>
								</div>
								<div class="content-new-chat ">
									<div style="box-shadow: rgb(3 18 26 / 20%) 0px 1px 2px;padding-bottom: 16px">
										<div class="form-group pt-3 mb-3 px-3">
											<input type="text" class="form-control" placeholder="Cari">
										</div>
									</div>
									<div id="testscroll" style="height: calc(100% - 90px);overflow-y: auto;">
										<div class="d-flex align-items-center justify-content-center" v-if="dataMahasiswa.length < 0">
											<div class="loading">
												<span class="fa fa-spinner fa-spin"></span> Loading
											</div>
										</div>
										<div  v-if="dataMahasiswa.length > 0">
											<div class="d-flex align-items-center py-2 px-3 mb-2 profile-chat-new" @click="openNewChat(items.user.rusername)" v-for="(items,index) in dataMahasiswa" :key="index">
												<div class="img-profile-chat">
													<p class="text-uppercase">{{items.user.rusername.charAt(0)}}</p>
												</div>
												<div class="info-name h-100 " style="border-color: #ddd">
													<h4>{{items.user.rusername}}</h4>
													<p>Mahasiswa</p>
												</div>
											</div>
											<div class="d-flex align-items-center justify-content-center" v-if="loadings">
												<div class="loading">
													<span class="fa fa-spinner fa-spin"></span> Loading
												</div>
											</div>
										</div>
										<div class="text-center mt-4" v-else>
											<div class="d-flex align-items-center justify-content-center">
												<div class="loading">
													<span class="fa fa-spinner fa-spin"></span> Loading
												</div>
											</div>
										</div>
									</div>
									<!-- <div v-observe-visibility="handleScrollBottom"></div> -->
								</div>
							</div>
						</div>
						<div class="col-lg-4 border-end " id="backChat" style="border-color: rgba(221, 224, 228, 1);height: 600px">
							<div>
								<div class="padding-name-chat borbot-name-top">
									<div class="d-flex w-100">
										<div class="img-name-chat">
											<img src="../../assets/icons/profile.svg" alt="">
										</div>
										<div data-v-1602fd16="" class="form-group mb-0 search-name-chat d-flex align-items-center justify-content-start">
											<input data-v-1602fd16="" placeholder="Cari..." type="text" name="" id="" class="form-control icon-awesome">
											<div style="margin-left: 10px;">
												<div @click="showContact" class="new-chat cursor-pointer">
													<i class="fas fa-comment-dots " ></i>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<h3 class="title-name-chat">Percakapan</h3>
							<div class="d-flex flex-column" v-if="testChat" style="height: calc(100% - 124px);overflow-y: auto;">
								<div class="col-12" v-for="(item,index) in testChat" :key="index">
								<!-- <div class="col-12" v-for="(item,index) in listChat.update.slice().reverse()" :key="index"> -->
									<div class="d-flex align-items-center padding-name-chat card-name-chat" @click="getChat(item.id, index)">
										<!-- <img src="../../assets/icons/profile.svg" alt=""> -->
										<div class="img-profile-chat">
											<p>{{item.name.charAt(0)}}</p>
											<!-- <p v-if="item.name">{{item.name.charAt(0)}}</p> -->
											<!-- <p v-else>{{item.usernames[0].charAt(0)}}</p> -->
										</div>
										<div class="info-name">
											<h4>{{item.name}}</h4>
											<p>{{item.lastMessage}}</p>
										</div>
										<div class="tanggal-chat">
											<!-- <p>5 Juli 2021</p> -->
											<p>{{item.date}}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-8">
							<div class="message-box">
								<div class="name-chat" v-if="dataPesan">
									<div class="d-flex align-items-center">
										<img class="profile-42" src="../../assets/icons/profile.svg" alt="">
										<h3 class="name-profile">{{dataPesan.name}}</h3>
									</div>
									<div class="d-flex align-items-center">
										<img style="margin-right: 35px" src="../../assets/icons/search-2.svg" alt="">
										<img src="../../assets/icons/burger-circle.svg" alt="">
									</div>
								</div>
								<div class="box-message" id="box-message">
									<div class="d-flex align-items-center justify-content-center h-100 w-100" v-if="!dataPesan">
										<div class="d-flex align-items-center flex-column justify-content-center">
											<div class="round-start-chat cursor-pointer">
												<img src="../../assets/icons/startchat.svg" alt="">
											</div>
											<div class="start-chat cursor-pointer" >
												<p>Mulai Percakapan</p>
											</div>
										</div>
									</div>
									<div v-for="(items, index) in isiChats" :key="index">
										<div id="pesan_id" :class="`mb-4 d-flex ${items.uid === user.uid ? 'chatme' : ''}`">
											<div :class="`${items.uid === user.uid ? '' : 'd-flex'}`">
												<div :class="`img ${items.uid === user.uid ? 'd-none' : 'd-flex'} align-self-end justify-content-center text-uppercase`">
													{{items.initial}}
												</div>
												<div style="max-width: calc(271px - 45px)">
													<h6 class="text-box-name">{{items.nama}}</h6>
													<div class="text-section box-chat">
														<div class="chat-content">
															{{items.value}}
														</div>
														<small class="times">{{items.date}}</small>
													</div>
												</div>
											</div>
											<div :class="`img ${items.uid === user.uid ? 'd-flex' : 'd-none'} aa align-self-end justify-content-center text-uppercase`">
												{{items.initial}}
											</div>
										</div>
									</div>
									<div v-if="recconect === true" class="ifdisconnect">
										<button @click="reconnects" class="btn btn-primary">Recconect</button>
									</div>

								</div>
								<form v-if="dataPesan" action="" @submit.prevent="kirimpesan">
									<div class="send-box">
										<input type="text" name="sendmsg" id="sendmsg" class="form-control " v-model="pesann" placeholder="Tulis Pesan..">
										<div>
											<button class="btn btn-primary profile-42 ms-3"><img src="../../assets/icons/plane.svg" alt=""></button>
										</div>
									</div>
								</form>
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
import rcApi from '../Api/Index'
import moment from 'moment'
import axios from 'axios'
import { mapState } from 'vuex'
let api
let current_page = 1

/* eslint-disable no-undef */

export default {
	computed: {
		...mapState(['url'])
	},
	data: function() {
    return {
			width: null,
			dataPesan: null,
      user: {
				uid: localStorage.uid
			},
      link: this.$route.fullPath.split("/"),
      dataPemandu: null,
      isiChats: [],
      webSocketUrl: 'wss://gmedia-chat.primakom.co.id/websocket',
      errors: [],
      messagess: [],
      lastSync: new Date ().getTime (),
      syncInterval: 30000,
      connectedToApi: true,
      pesann: null,
      pemanduuid: '',
      dmRoom: '',
      recconect: false,
			listChat: null,
			testChat: [],
			newChat: [],
			dataMahasiswa: [],
			lastPage: 1,
			loadings: false
		}
	},
	methods: {
		showContact() {
			document.getElementById('watchContact').style.left = '0px'
		},
		backChat() {
			document.getElementById('watchContact').style.left = '-100%'
		},
		openNewChat(username) {
			this.dataPesan = {name: username}
			api.sendMessage({
				"msg": "method",
				"method": "createDirectMessage",
				"id": "roomid",
				"params": [username]
			})
		},
		reconnects() {
			api = rcApi.connectToRocketChat (this.webSocketUrl)
			api.onError (error => this.errors.push (error))
			api.onCompletion (() =>{
				// this.recconect = true
				console.log ("finished")
			})
			api.onMessage (message => {
				let scrollDown = document.getElementById('box-message')
				if(message.msg === 'result' && message.id === 'getList') {
					// this.listChat = message.result
					this.testChat = []
					setTimeout(() => {
						for(let i = 0; i < message.result.update.length ;i++) {
							if(message.result.update[i].lastMessage) {
								if(message.result.update[i].name) {
									this.testChat.push({
										lastMessage: message.result.update[i].lastMessage.msg,
										name: message.result.update[i].name,
										userCount: message.result.update[i].usersCount,
										date: moment(message.result.update[i].ts.$date).lang("id").format('h:mm'),
										id: message.result.update[i]._id
									})
								} else{
									this.testChat.push({
										lastMessage: message.result.update[i].lastMessage.msg,
										name: message.result.update[i].usernames[0],
										userCount: message.result.update[i].usersCount,
										date: moment(message.result.update[i].ts.$date).lang("id").format('h:mm'),
										id: message.result.update[i]._id
									})
								}
							}
						}
					}, 200);
					console.log(this.testChat)
					console.log('this.testChat')
				}
				if(message.msg === 'changed' && message.collection === 'stream-room-messages'){
					let datenya = new Date(message.fields.args[0].ts.$date)
					this.isiChats.push({
						value: message.fields.args[0].msg,
						date: moment(datenya).lang("id").format('h:mm'),
						nama: message.fields.args[0].u.name,
						uid: message.fields.args[0].u._id,
						initial: message.fields.args[0].u.name.charAt(0)
					})
					setTimeout(() => {
						scrollDown.scrollTop = scrollDown.scrollHeight + scrollDown.clientHeight
					}, 200);
					return;
				}
				if(message.msg === 'sub' && message.id === 'stream-room-messages'){
					this.dmRoom = message.params[0]
					// this.connectRoom(message.para)
				}
				if(message.msg === 'result' && message.id === 'oldChat'){
					let dataReverse = message.result.messages.reverse()
					let arraynya = []
					for(let i = 0; i < dataReverse.length; i++) {
						if(message.result.messages[i].u.name) {
							arraynya.push({
								value: dataReverse[i].msg,
								date: moment(new Date(dataReverse[i].ts.$date)).lang("id").format('h:mm'),
								nama: dataReverse[i].u.name,
								uid: dataReverse[i].u._id,
								initial: dataReverse[i].u.name.charAt(0)
							})
						}else {
							console.log('joined')
						}
					}
					this.isiChats = arraynya
					console.log(arraynya)
					setTimeout(() => {
						scrollDown.scrollTop = scrollDown.scrollHeight + scrollDown.clientHeight
					}, 200);
					return;
				}
			})
			api.connectToServer ()
				.subscribe (() => {
					api.keepAlive () // Ping Server
				},
				(error) => {
					this.errors.push (error)
				})

			// vérification pour mobile devices
			setInterval (function () {
				let now = new Date ().getTime ()
				if ((now - this.lastSync) > this.syncInterval) {
					console.log ('out of sync')
					this.syncPage()
				}
			}, 2000) // vérifie toutes les 1 sec que 30 sec ont passé depuis la dernière synchro
			this.loginss()
			setTimeout(() => {
				this.recconect = false
			}, 500);
		},
		kirimpesan() {
			if(this.pesann) {
				api.sendMessage ({
					"msg": "method",
					"method": "sendMessage",
					"id": '' + new Date ().getTime (),
					"params": [
						{
							"_id": '' + new Date ().getTime (),
							"rid": this.dmRoom,
							"msg": this.pesann
						}
					]
				})
				this.pesann = ''
			}
		},
		getChat(idRoom, index) {
			api.sendMessage({
        "msg": "sub",
        "id": '' + new Date ().getTime (),
        "name": "stream-room-messages",
        "params": [
          idRoom,
          false
        ]
      });
			if(index === 'test') {
				console.log('aa')
				setTimeout(() => {
					api.sendMessage({
						"msg": "method",
						"method": "loadHistory",
						"id": "oldChat",
						"params": [ idRoom, null, 100000, { "$date": 1480377601 } ]
					})
					this.dmRoom = idRoom
				}, 200);
			} else {
				this.dataPesan = this.testChat[index]
				setTimeout(() => {
					api.sendMessage({
						"msg": "method",
						"method": "loadHistory",
						"id": "oldChat",
						"params": [ idRoom, null, 100000, { "$date": 1480377601 } ]
					})
					this.dmRoom = idRoom
				}, 200);
			}
		},
		getTimes(a) {
			return moment(a).lang("id").format('h:mm')
		},
		getlist(){
      api.sendMessage({
        "msg": "method",
        "method": "rooms/get",
        "id": "getList",
        // "params": [ { "$date": new Date ().getTime ()} ]
        "params": [ { "$date": 0} ]
      })
    },
		loginss() {
			api.loginWithAuthToken(localStorage.tkn)
				.subscribe (apiEvent => {
				if (apiEvent.msg === 'result') {
					// success
					this.messagess.push(apiEvent.msg)
					this.getlist()
				}
			}, (error) => {
				this.errors.push (error)
			})
    },
    syncPage() {
			this.lastSync = new Date ().getTime ()
			console.log ('Synch')
			if (this.connectedToApi && api && api.webSocket !== null && api.webSocket.socket == null) {
				// on log et on redémarre la fenêtre
				console.log ('reload')
				window.location.reload ()
			}
		},
		async getMahasiswa() {
			axios.get(`${this.url}bemkm/pemandu/mahasiswa?page=${current_page}`, {
				headers: {
					Authorization: localStorage.token
				}
			}).then((result) => {
				for(let i in result.data.data.data) {
					this.dataMahasiswa.push(result.data.data.data[i])
				}
				this.lastPage = result.data.data.last_page
				this.loadings = false
			}).catch((err) => {
				console.log(err)
			});
		},
	},
	mounted() {
		this.getMahasiswa()
		this.width = $(document).width();
		api = rcApi.connectToRocketChat (this.webSocketUrl)
		api.onError (error => this.errors.push (error))
		api.onCompletion (() =>{
			this.recconect = true
			console.log ("finished")
		})
		api.onMessage (message => {
			let scrollDown = document.getElementById('box-message')
			if(message.msg === 'result' && message.id === 'getList') {
				this.listChat = message.result
				this.testChat = []
				setTimeout(() => {
					for(let i = 0; i < message.result.update.length ;i++) {
						if(message.result.update[i].lastMessage) {
							if(message.result.update[i].name) {
								this.testChat.push({
									lastMessage: message.result.update[i].lastMessage.msg,
									name: message.result.update[i].name,
									userCount: message.result.update[i].usersCount,
									// date: new Date(message.result.update[i].lastMessage.ts.$date),
									date: moment(message.result.update[i].ts.$date).lang("id").format('h:mm'),
									id: message.result.update[i]._id
								})
							} else{
								this.testChat.push({
									lastMessage: message.result.update[i].lastMessage.msg,
									name: message.result.update[i].usernames[0],
									userCount: message.result.update[i].usersCount,
									// date: new Date(message.result.update[i].lastMessage.ts.$date),
									date: moment(message.result.update[i].ts.$date).lang("id").format('h:mm'),
									id: message.result.update[i]._id
								})
							}
						} else {
							this.testChat.push({
								lastMessage: '',
								name: message.result.update[i].usernames[0],
								userCount: message.result.update[i].usersCount,
								// date: new Date(message.result.update[i].lastMessage.ts.$date),
								date: moment(message.result.update[i].ts.$date).lang("id").format('h:mm'),
								id: message.result.update[i]._id
							})
						}
					}
				}, 200);
			}
			if(message.msg === 'result' && message.id === 'roomid'){
				this.dmRoom = message.result.rid
				this.getChat(message.result.rid, 'test')
				// this.connectRoom(message.result.rid)
			}
			if(message.msg === 'changed' && message.collection === 'stream-room-messages'){
				let datenya = new Date(message.fields.args[0].ts.$date)
				this.isiChats.push({
					value: message.fields.args[0].msg,
					date: moment(datenya).lang("id").format('h:mm'),
					nama: message.fields.args[0].u.name,
					uid: message.fields.args[0].u._id,
					initial: message.fields.args[0].u.name.charAt(0)
				})
				setTimeout(() => {
					scrollDown.scrollTop = scrollDown.scrollHeight + scrollDown.clientHeight
					this.getlist()
				}, 200);
				return;
			}
			if(message.msg === 'sub' && message.id === 'stream-room-messages'){
				console.log('room')
				this.dmRoom = message.params[0]
				// this.connectRoom(message.para)
			}
			if(message.msg === 'result' && message.id === 'oldChat'){
				let dataReverse = message.result.messages.reverse()
				let arraynya = []
				for(let i = 0; i < message.result.messages.length; i++) {
					if(message.result.messages[i].u.name) {
						arraynya.push({
							value: dataReverse[i].msg,
							date: moment(new Date(dataReverse[i].ts.$date)).lang("id").format('h:mm'),
							nama: dataReverse[i].u.name,
							uid: dataReverse[i].u._id,
							initial: dataReverse[i].u.name.charAt(0)
						})
					}else {
						console.log('joined')
					}
				}
				this.isiChats = arraynya
				setTimeout(() => {
					scrollDown.scrollTop = scrollDown.scrollHeight + scrollDown.clientHeight
				}, 200);
				return;
			}
		})
		api.connectToServer ()
			.subscribe (() => {
				api.keepAlive () // Ping Server
			},
			(error) => {
				this.errors.push (error)
			})

		// vérification pour mobile devices
		setInterval (function () {
			let now = new Date ().getTime ()
			if ((now - this.lastSync) > this.syncInterval) {
				console.log ('out of sync')
				this.syncPage()
			}
		}, 2000)
		this.loginss()
		document.getElementById('testscroll').addEventListener('scroll', () => {
			if(document.getElementById('testscroll').scrollTop + document.getElementById('testscroll').clientHeight >= document.getElementById('testscroll').scrollHeight) {
				if(current_page === this.lastPage) { this.loadings = false } else{
					this.loadings = true
					current_page += 1
					this.getMahasiswa()
				}
			}
		})
	}
}
</script>

<style scoped>
.loading{
	text-align: center;
	z-index: 9;
	color: #6E8CFC;
	padding: 8px 18px;
	border-radius: 5px;
	width: 75%;
	font-size: 18px;
}
.profile-chat-new{
	transition: .5s;
	cursor: pointer;
}
.profile-chat-new:hover{
	background: #324159;
}
.profile-chat-new:hover > .info-name h4, .profile-chat-new:hover > .info-name p{
	color: white;
}
.content-new-chat{
	width: 100%;
	height: calc(100% - 90px);
	background: white;
	position: relative;
	top: -35px;
	border-top-left-radius: 30px;
	border-top-right-radius: 30px;
}
.head-new-chat{
	width: 100%;
	height: 125px;
	align-items: flex-end;
	background: #6E8CFC;
	padding-bottom: 45px;
	color: white;
}
.head-new-chat i{
	font-size: 22px;
}
.head-new-chat p{
	margin: 0 0 0 20px;
	font-size: 22px;
	font-weight: 500;
}
.new-chat{
	box-shadow: rgb(3 18 26 / 40%) 0px 3px 8px;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 100%;
	background: rgba(20, 97, 245, 1);
	color: white;
	box-sizing: border-box;
}
.start-chat p {
	color: rgba(20, 97, 245, 1);
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	text-align: center;
}
.start-chat{
	padding: 9px 24px;
	border-radius: 30px;
	background: white;
}
.round-start-chat{
	width: 81px;
	height: 81px;
	border-radius: 100%;
	background: white;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 21px;
}
.ifdisconnect{
	z-index: 5;
	top: 0;
	left: 0;
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, .2);
}
.img-profile-chat{
	width: 42px;
	height: 42px;
	border-radius: 100%;
	background: #ddd;
	display: flex;
	align-items: center;
	justify-content: center;
}
.img-profile-chat p{
	margin: 0;
}
.card-name-chat{
	cursor: pointer;
}
.card-name-chat:hover{
	background: #f8f8f8;
}
.send-box{
  width: 100%;
  height: 70px;
  padding: 14px 24px;
  background: white;
  display: flex;
}
.box-message{
	padding: 10px 24px;
	height: calc(100% - 70px - 70px);
	overflow-y: auto;
}
.name-chat{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background: white;
  padding: 14px 24px;
}
.name-profile{
  margin-left: 12px;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 600;
  color: black;
}
.profile-42{
  width: 42px;
  height: 42px;
  border-radius: 100% !important;
  object-fit: cover;
}
.message-box{
	background-image: url('../../assets/icons/chat-background.svg');
	height: 600px;
	position: relative;
}
.title-name-chat{
	color: rgba(20, 97, 245, 1);
	font-size: 18px;
	font-weight: 700;
	margin: 16px 0 12px 24px;
}
.borbot-name-top{
	border-bottom: 1px solid rgba(221, 224, 228, 1);
}
.search-name-chat{
	margin: 0 0 0 18px;
	width: 100%;
}
.padding-name-chat{
	padding: 16px 24px;
}
.img-name-chat img{
	width: 42px;
	height: 42px;
	border-radius: 100%;
	object-fit: cover;
}
.chatme .no-me{
  display: block !important;
}
.no-me{
  display: flex;
}
.chatme{
	justify-content: flex-end;
}
.box-chat{
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
.chatme small.times{
	color: #333 !important;
}
.box-chat small.times{
	position: absolute;
	right: 10px;
	bottom: 3px;
	font-size: 10px;
	color: #ddd;
}
.chatme .box-chat{
	background: #DDE0E4;
	color: rgba(40, 40, 40, 1);
	margin: 0 16px 0 0;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 0;
}
.chatme .text-box-name{
	text-align: end;
	margin: 0 20px 8px 0;
}
.text-box-name{
	margin: 0 0 8px 16px;
	font-size: 14px;
	font-weight: 700;
	color: rgba(40, 40, 40, 1);
}

.img{
  width: 32px;
  height: 32px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
}
.info-name{
	margin: 0 0 0 12px;
	width: calc(100% - 42px - 75px - 12px);
}
.info-name h4{
	font-size: 16px;
	transition: .5s;
	font-weight: 600;
	color: black;
	margin: 0;
	overflow: hidden;
	height: 19px;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.info-name p{
	transition: .5s;
	color: rgba(79, 86, 101, 1);
	font-size: 14px;
	font-weight: 400;
	margin: 6px 0 0 0;
}
.tanggal-chat{
	width: 75px;
}
.tanggal-chat p{
	font-size: 14px;
	text-align: end;
	font-weight: 400;
	color: rgba(79, 86, 101, 1);
}
</style>