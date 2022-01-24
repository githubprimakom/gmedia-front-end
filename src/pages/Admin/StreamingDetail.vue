<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
		<div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
				<div class="card-shadow mb-3">
					<div class="p-3">
						<div class="d-flex">
							<router-link :to="{ name: 'Streaming Master' }" class="btn btn-outline-primary">Kembali</router-link>
							<div class="d-flex flex-wrap justify-content-center w-75 align-items-center" v-if="dataKonferensi">
								<div class="title-content text-capitalize">{{dataKonferensi.nama}}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row" id="content-online">
					<div class="col-lg-7">
						<div class="video" v-if="dataKonferensi">
							<iframe :src="dataKonferensi.link_video" autoplay="1" frameborder="0"></iframe>
							<!-- <img src="../../assets/videoconference.png" alt=""> -->
						</div>
						<!-- <div class="d-flex align-items-center subtitle">
							<img src="../../assets/icons/graphic_eq.svg" alt="">
							<div>
								<h6>Brian Barker:</h6>
								<p>Terima kasih atas partisipasinya teman teman semua, jaga kesehatan dan sehat selalu...</p>
							</div>
						</div> -->
					</div>
					<div class="col-lg-5">
						<div class="card-shadow card-chat mb-3">
							<div class="p-3 h-100">
								<div class="d-flex justify-content-between align-items-center">
									<div class="title-content">Chat</div>
								</div>
								<hr>
								<div class="box-message" id="box-message">
									<div v-if="recconect === true" class="ifdisconnect">
										<button @click="reconnects" class="btn btn-primary">Recconect</button>
									</div>
									<div v-else v-for="(items, index) in isiChat" :key="index">
										<div id="pesan_id" :class="`mb-4 d-flex ${items.uid === user.uid ? 'chatme' : ''}`">
											<div :class="`${items.uid === user.uid ? '' : 'd-flex'}`">
												<div :class="`img ${items.uid === user.uid ? 'd-none' : 'd-flex'} align-self-end justify-content-center`">
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
											<div :class="`img ${items.uid === user.uid ? 'd-flex' : 'd-none'} aa align-self-end justify-content-center`">
												{{items.initial}}
											</div>
										</div>
									</div>
								</div>
								<div class="row send-input">
									<form action="" @submit.prevent="kirimpesan">
										<div class="d-flex">
											<input type="text" required v-model="pesannya" class="form-control" placeholder="Tulis Pesan...">
											<button class="btn btn-primary send-button">S</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-12">
						<vue-internet-checker
							@status="status"
							@event="event"
						/>
					</div>
				</div>
				<div class=" justify-content-center align-items-center flex-column" style="height: 480px;display: none;" id="content-offline">
					<img src="../../assets/icons/no-connection.svg" alt="">
					<h1>Connect To Internet</h1>
					<button class="btn btn-outline-primary">Retry</button>
				</div>
				<Footer />
      </div>
    </div>
  </div>
</template>

<script>
import rcApi from '../Api/Index'
import axios from 'axios'
import moment from 'moment'
import vueInternetChecker from 'vue-internet-checker'
import { mapState } from 'vuex'

/* eslint-env jquery */
let api = null

export default {
	computed: {
		...mapState(["url"])
	},
	components: {
		vueInternetChecker,
	},
  data: function() {
    return {
			onLine: null,
			recconect: false,
			dataKonferensi: null,
			user: {
				uid: localStorage.uid
			},
			webSocketUrl: 'wss://gmedia-chat.primakom.co.id/websocket',
			connectedToApi: true,
			loggedIn: false,
			userId: 'ZkehsvNwF2dfYbE6G',
			authToken: 'O8kwYjJNUjot-4SagpN_8UjLbv2DG5FZKQPHAW2LnxV',
			username: 'gmedia190190',
			password: '190190gmediaaselole00',
			roomId: '',
			roomConnected: false,
			newMessage: '',
			messages: [],
			isiChat: [],
			errors: [],
			lastSync: new Date ().getTime (),
			syncInterval: 30000,
      width: null,
			pesannya: null,
			connect: true,
    };
  },
  mounted() {
		this.getConference()
		api = rcApi.connectToRocketChat (this.webSocketUrl)
		api.onError (error => this.errors.push (error))
		api.onCompletion (() => {
			this.recconect = true
			console.log ("finished")
		})
		api.onMessage (message => {
			let scrollDown = document.getElementById('box-message')
			this.messages.push(message)
			if(message.msg === 'changed' && message.collection === 'stream-room-messages'){
				let datenya = new Date(message.fields.args[0].ts.$date)
				this.isiChat.push({
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
			if(message.msg === 'result' && message.result){
				if(message.result.messages){
					let allMsgs =  message.result.messages;
					console.log('-----previous msgs---------------');
					allMsgs.map(x => console.log(x))
					console.log('---------------------------------')
				}
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
				this.isiChat = arraynya
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
    this.width = $(document).width();

    $(document).ready(function() {
      $(".table").DataTable();
    });
		this.loginss()
  },
	methods: {
		status(ele) {
			console.log(ele);
			if(ele === false) {
				document.getElementById('content-online').style.display = 'none'
				document.getElementById('content-offline').style.display = 'flex'
				// console.log('error')
			} else {
				document.getElementById('content-online').style.display = 'flex'
				document.getElementById('content-offline').style.display = 'none'
				// console.log('online')
			}
			// this.onLine = ele;
		},
		event(ele) {
			console.log(ele);
			if(ele.type === 'Offline') {
				this.connect = false
			} else{
				this.connect = true
			}
		},
		reconnects() {
			api = rcApi.connectToRocketChat (this.webSocketUrl)
			api.onError (error => this.errors.push (error))
			api.onCompletion (() => console.log ("finished"))
			api.onMessage (message => {
				let scrollDown = document.getElementById('box-message')
				this.messages.push(message)
				if(message.msg === 'changed' && message.collection === 'stream-room-messages'){
					let datenya = new Date(message.fields.args[0].ts.$date)
					this.isiChat.push({
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
				if(message.msg === 'result' && message.result){
					if(message.result.messages){
						let allMsgs =  message.result.messages;
						console.log('-----previous msgs---------------');
						allMsgs.map(x => console.log(x))
						console.log('---------------------------------')
					}
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
					this.isiChat = arraynya
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
			}, 1000);
		},
		getConference() {
			axios.get(`${this.url}bemkm/superadmin/konferensi/${ this.$route.params.id }`, {
				headers: {
					Authorization: localStorage.token
				}
			}).then((result) => {
				if(result.data.success) {
					this.dataKonferensi = result.data.data
					this.getOldChat(result.data.data.channel_name)
				}
			}).catch((err) => {
				console.log(err)
			});
		},
		getOldChat(channel_name) {
			api.sendMessage({
				"msg": "method",
				"method": "loadHistory",
				"id": "oldChat",
				"params": [ channel_name, null, 100000, { "$date": 0 } ]
			})
			// axios.get(`${this.url}bemkm/chat/${channel_name}`).then((result) => {
			// 	for(let i = 0; i < result.data.fields.args.length; i++) {
			// 		this.isiChat.push({
			// 			value: result.data.fields.args[i].msg,
			// 			nama: result.data.fields.args[i].u.name,
			// 			date: moment(result.data.fields.args[i].ts).lang("id").format('h:mm'),
			// 			uid: result.data.fields.args[i].u._id,
			// 			initial: result.data.fields.args[i].u.name.charAt(0)
			// 		})
			// 	}
			// 	let scrollDown = document.getElementById('box-message')
			// 	setTimeout(() => {
			// 		scrollDown.scrollTop = scrollDown.scrollHeight + scrollDown.clientHeight
			// 	}, 200);
			// }).catch((err) => {
			// 	console.log(err)
			// 	let scrollDown = document.getElementById('box-message')
			// 	setTimeout(() => {
			// 		scrollDown.scrollTop = scrollDown.scrollHeight + scrollDown.clientHeight
			// 	}, 200);
			// });
		},
		formatMessage(message) {
			let result = {message}
			if (message.fields !== undefined &&
				message.fields.args !== undefined &&
				message.fields.args.length > 0 &&
				message.fields.args[0].ts !== undefined &&
				message.fields.args[0].ts.$date !== undefined
			) {
				result.formattedDate = new Date (message.fields.args[0].ts.$date)
			}
			return result
		},
		loginss() {
			api.loginWithAuthToken (localStorage.tkn)
				.subscribe (apiEvent => {
				if (apiEvent.msg === 'result') {
					// success
					this.messages.push(apiEvent.msg)
					this.connectRoom()
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
		connectRoom() {
			setTimeout(() => {
				api.sendMessage ({
					"msg": "sub",
					"id": '' + new Date ().getTime (),
					"name": "stream-room-messages",
					"params": [
						this.dataKonferensi.channel_name,
						false
					]
				})
			}, 200);
		},
		kirimpesan() {
			if(this.pesannya) {
				api.sendMessage ({
					"msg": "method",
					"method": "sendMessage",
					"id": '' + new Date ().getTime (),
					"params": [
						{
							"_id": '' + new Date ().getTime (),
							"rid": this.dataKonferensi.channel_name,
							"msg": this.pesannya
						}
					]
				})
				this.pesannya = ''
			}
		},
	}
}
</script>

<style scoped>
.ifdisconnect{
	z-index: 5;
	top: 0;
	/* position: absolute; */
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	/* background: rgba(0, 0, 0, .5); */
}
.card-chat{
	height: 500px;
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
.form-control{
	margin-right: 15px;
	width: calc(100% - 15px - 48px);
	background: rgba(248, 248, 248, 1);
	height: 48px;
	border-radius: 30px !important;
	border: none !important;
}
.box-message{
	height: calc(100% - 134px);
	overflow-y: auto;
	position: relative;
}
.send-button{
	width: 48px;
	height: 48px;
	border-radius: 100% !important;
}
.send-input{
	margin-top: 20px;
}
.video{
	height: 470px;
	width: 100%;
	box-shadow: 0px 2px 18px rgba(3, 5, 16, 0.06);
	border-radius: 8px;
	overflow: hidden;
	background: none;
}
.video iframe{
	width: 100%;
	height: 470px;
}
</style>