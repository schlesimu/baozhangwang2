<script>
	import Vue from 'vue'
	// 引入检查更新模块
	import {
		checkUpdater
	} from '@/common/checkUpdater';
	import {
		permissions
	} from '@/common/Permissions.js'
	var that;
	var pushMessage = []
	export default {
		onLaunch: function() {
			that = this;
			uni.removeStorageSync('PageCur');
			uni.removeStorageSync('chooseCity');
			// 清除缓存的本地定位
			uni.removeStorageSync('position_const');
			// 微信登录获取的unionid
			// uni.removeStorageSync('unionid');

			uni.setStorageSync('istoken', true)
			uni.setStorageSync('openHomePop', 1)
			// app打开时先检查是否有更新记录（更新记录会被保存在storage中）
			// 更新记录的内容为 { 更新标记, 安装包位置 }

			// 如果存在更新记录，且更新标记（complete=true）则删除上次使用过的安装包，达到存储释放空间的目的

			// 如果存在更新记录，且更新标记（complete=false）则进行安装更新 - 2019年3月27日 新增强制更新内容
			const _self = this;

			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); //竖屏正方向锁定
			var platform = uni.getSystemInfoSync().platform;
			if (platform == 'ios') {
				//监听系统通知栏消息事件
				plus.push.addEventListener('receive', function(message) {
					console.log(message, '---receive');
				})
				//监听系统通知栏消息点击事件  
				plus.push.addEventListener('click', function(message) {
					//处理点击消息的业务逻辑代码
					console.log(message, '---push');
					// 获取透传消息的 对应动作的action 来判断要跳到那个详情页面
					if (message.payload.action == 6) { //报名状态 报名列表
						let aid = message.payload.extra.position_id
						uni.navigateTo({
							url: '/pagescenter/userypz/singUpStatus?id=' + aid
						})
					} else if (message.payload.action == 7) { //网约工详情  我的接单列表 我是接单者
						let aid = message.payload.extra.partjob_id
						uni.navigateTo({
							url: '/pagescenter/userypz/my_order'
						})

					} else if (message.payload.action == 10) { //网约工详情  查看接单人  我是发布者 
						let aid = message.payload.extra.paryjob_id
						uni.navigateTo({
							url: '/pagescenter/userypz/pick_up_person?pushMsg=1&aid=' + aid
						})
					} else if (message.payload.action == 8) { //报名详情  查看简历
						let aid = message.payload.extra.delivery_id
						let user_id = message.payload.extra.user_id
						uni.navigateTo({
							url: '/pagesHome/look_resume?uid=' + user_id + '&aid=' + aid +
								'&set_up_status=0'

						})
					} else if (message.payload.action == 9) { //进最新通知详情
						let aid = message.payload.extra.notice_id
						uni.navigateTo({
							url: '/pagescenter/zhaopinzhe/noticeDetail?aid=' + aid
						})
					} else if (message.payload.action == 11) { //聊天消息页面
						let kfid = message.payload.extra.my_id
						let userName = message.payload.extra.friend_nickname
						let position_id = message.payload.extra.friend_job_position_id
						uni.navigateTo({
							url: '/pagesmessage/userMsg?kfid=' + kfid + '&friendId=' + kfid +
								'&userName=' + userName +
								'&job_position_id=' + position_id
						})
					} else if (message.payload.action == 13) { //便民信息页面  后台推送咨讯
						let aid = message.payload.extra.aid
						uni.navigateTo({
							url: '/pagesHome/index/convenience_detail?id=' + aid
						})
					} else if (message.payload.action == 14) { //职位详情页面  后台推送职位
						let aid = message.payload.extra.position_id
						uni.navigateTo({
							url: '/pagesHome/index/plant_detail?id=' + aid
						})
					} else if (message.payload.action == 1) { //系统消息页面
						uni.navigateTo({
							url: '/pagesmessage/msg'
						})
					}
				}, false);
				// plus.push.addEventListener('receive', function(message) {
				// 	console.log(message, '=============receive-------ios');

				// }, false);
			} else if (platform == 'android') { //执行跳转判断 
				//监听系统通知栏消息点击事件
				plus.push.addEventListener('click', function(message) {
					//处理点击消息的业务逻辑代码
					console.log(message, '---push');
					_self._handlePush(message);
					// 获取透传消息的 对应动作的action 来判断要跳到那个详情页面
				}, false);
				//监听接收透传消息事件  
				plus.push.addEventListener('receive', function(message) {
					console.log(message, '=============receive-------00');
					if (message.payload.action == 6) { //报名状态 报名列表
						let aid = message.payload.extra.position_id
						uni.navigateTo({
							url: '/pagescenter/userypz/singUpStatus?id=' + aid
						})
					} else if (message.payload.action == 7) { //网约工详情  我的接单列表 我是接单者
						let aid = message.payload.extra.partjob_id
						uni.navigateTo({
							url: '/pagescenter/userypz/my_order'
						})

					} else if (message.payload.action == 10) { //网约工详情  查看接单人  我是发布者 
						let aid = message.payload.extra.paryjob_id
						uni.navigateTo({
							url: '/pagescenter/userypz/pick_up_person?pushMsg=1&aid=' + aid
						})
					} else if (message.payload.action == 8) { //报名详情  查看简历
						let aid = message.payload.extra.delivery_id
						let user_id = message.payload.extra.user_id
						uni.navigateTo({
							url: '/pagesHome/look_resume?uid=' + user_id + '&aid=' + aid +
								'&set_up_status=0'

						})
					} else if (message.payload.action == 9) { //进最新通知详情
						let aid = message.payload.extra.notice_id
						uni.navigateTo({
							url: '/pagescenter/zhaopinzhe/noticeDetail?aid=' + aid
						})
					} else if (message.payload.action == 11) { //聊天消息页面
						let kfid = message.payload.extra.my_id
						let userName = message.payload.extra.friend_nickname
						let position_id = message.payload.extra.friend_job_position_id
						uni.navigateTo({
							url: '/pagesmessage/userMsg?kfid=' + kfid + '&friendId=' + kfid +
								'&userName=' + userName +
								'&job_position_id=' + position_id
						})
					} else if (message.payload.action == 13) { //便民信息页面  后台推送咨讯
						let aid = message.payload.extra.aid
						uni.navigateTo({
							url: '/pagesHome/index/convenience_detail?id=' + aid
						})
					} else if (message.payload.action == 14) { //职位详情页面  后台推送职位
						let aid = message.payload.extra.position_id
						uni.navigateTo({
							url: '/pagesHome/index/plant_detail?id=' + aid
						})
					} else if (message.payload.action == 1) { //系统消息页面
						uni.navigateTo({
							url: '/pagesmessage/msg'
						})
					}
					_self._handlePush(message);
				}, false);
			}
			const updated = uni.getStorageSync('updated'); // 尝试读取storage
			if (updated.completed === true) {
				// 如果上次刚更新过
				// 删除安装包及安装记录
				// console.log('安装记录被删除，更新成功');
				uni.removeSavedFile({
					filePath: updated.packgePath,
					success: res => {
						uni.removeStorageSync('updated');
					}
				});
			} else if (updated.completed === false) {
				uni.removeStorageSync('updated');
				plus.runtime.install(updated.packgePath, {
					force: true
				});
				uni.setStorage({
					key: 'updated',
					data: {
						completed: true,
						packgePath: updated.packgePath
					},
					success: res => {
						console.log('成功安装上次的更新，应用需要重启才能继续完成');
					}
				});
				uni.showModal({
					title: '提示',
					content: '应用将重启以完成更新',
					showCancel: false,
					complete: () => {
						plus.runtime.restart();
					}
				});
			} else {
				// 检查更新，参数：{ 当前版本号，跳转到更新页面的url }
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					//"versionCode": "100",
					//"version": "1.0.0",
					checkUpdater(widgetInfo.versionCode, '/pagescommon/update');
				});
			}
			// #endif
			// 读取系统信息，设置全局导航高度
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});
			// 监听登录，更新websocket链接
			// this.initializeSocket();
			// uni.$on('appLoginSuccess', () => {
			// 	console.log('appLoginSuccess，接收链接通知');
			//   // uni.closeSocket()
			//   // this.initializeSocket()
			// })
			this.initializeSocket();
			// 监听登录
			uni.$on('appLoginSuccess', () => {
				console.log('微信登录，通知开启websocket');
				uni.closeSocket();
				this.initializeSocket()
			});
			// 监听进入聊天页面
			uni.$on('jump', res => {
				uni.closeSocket();
				console.log('关闭');
			});
			// 监听退出聊天页面
			uni.$on('openAll', () => {
				uni.closeSocket();
				this.initializeSocket()
			});
			
			this.$Request.get(this.$api.common.fetchAppSetting).then(res => {
				console.log(res);
				uni.setStorageSync('is_contact', res.data.is_contact*1)
			});
		},
		onShow: function() {
			console.log('App Show');
			// #ifdef APP-PLUS
			console.log('cid', plus.push.getClientInfo().clientid);
			// #endif
			uni.$emit('openPage', {}) //开启页面  打开定位返回页面刷新数据
			this.initializeSocket()
			setTimeout(() => {
				permissions()
			}, 200)
			uni.hideLoading()
		},
		onHide: function() {
			console.log('App Hide');
			uni.removeStorageSync('chooseCity');
			// 下面的方法都要写上


			uni.closeSocket();
			uni.onSocketOpen(function() {
				uni.closeSocket();
			});
			if(uni.getStorageSync('wechet')){
				
			}else{
				uni.removeStorageSync('launchFlag')
			}
			uni.onSocketClose(function(res) {
				console.log('WebSocket 已关闭全局！');
			});
		},
		methods: {
			initializeSocket() {
				let userToKen = uni.getStorageSync('USERINFO');
				if (userToKen.user_token) {
					// 链接socket
					// #ifdef MP-WEIXIN
					uni.connectSocket({
						// url: this.$Request.config('WS_HOST')
						url: 'wss://websocket.chongdarenli.com?from_id=' + userToKen.id + '&to_id=0'
					});
					// #endif
					// #ifndef MP-WEIXIN
					uni.connectSocket({
						url: 'ws://123.56.143.238:9502?from_id=' + userToKen.id + '&to_id=0'
					})
					// #endif
					// 链接成功
					uni.onSocketOpen((res) => {
						// 登录
						// var login_data =
						// 	'{"type":"userInit", "uid": ' +
						// 	userToKen.id +
						// 	', "from_name" : "' +
						// 	userToKen.user_name +
						// 	'", "from_avatar" : "' +
						// 	userToKen.head_img +
						// 	'", "group" : ' +
						// 	1 +
						// 	', "user_type" : ' +
						// 	1 +
						// 	'}';
						// that.sendSocketMessage(login_data);
						setInterval(function() {
							uni.sendSocketMessage({
								data: 'pong',
								success: function(res) {}
							});
						}, 10000);
					});
					uni.onSocketError(function(res) {
						console.log('WebSocket连接打开失败，请检查！');

					});
					// 监听收到消息
					uni.onSocketMessage(function(res) {
						// 非心跳
						console.log(res, '========'); //心跳
						if (res.data != 'success') {
							var arr = JSON.parse(res.data)
							if (!arr) {
								return
							};
							// 接收消息
							if (arr.event == 'saveMessage') {
								console.log('在全局接收到信息');
								setTimeout(() => {
									uni.$emit('receiveMsg', '接收消息')
								}, 200)
								uni.setStorageSync('sevice', true)
								let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
								if (routes != '') {
									let curRoute = routes[routes.length - 1].route //获取当前页面路由
									if (curRoute != 'pagesmessage/userMsg') {
										uni.vibrateLong();
										uni.$emit('updata', {}) //刷新聊天列表
									}
								}
							}
						};
						// var data;
						// try{
						// 	data = JSON.parse(res.data);
						// }catch(e){//TODO handle the exception
						// }
						// if( data && data.message_type ){
						// 	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
						// 	console.log( routes , '路由' );
						// 	if(routes!=''){
						// 		let curRoute = routes[routes.length - 1].route //获取当前页面路由
						// 		if(data.message_type=='chatMessage' && curRoute!='pagesmessage/userMsg'){
						// 			uni.vibrateLong();
						// 		}
						// 	}
						// 	switch (data.message_type) {
						// 		// 服务端ping客户端
						// 		case 'ping':
						// 			that.sendSocketMessage('{"type":"ping"}');
						// 			break;
						// 		default:
						// 			uni.$emit('onSocketMessage_detail',data);
						// 			uni.$emit('onSocketMessage_list',data);
						// 			break;
						// 	}
						// }
					});
					// socket 断开链接后尝试重新链接
					uni.onSocketError(res => {
						uni.closeSocket();
						console.log('WebSocket 已关闭！');
						// setTimeout(()=>{
						// this.initializeSocket();
						// },1000)
					});
				}
			},
			sendSocketMessage(msg) { //发送消息
				let that = this;
				uni.sendSocketMessage({
					data: msg,
					success: (res) => {}
				});
			},
			// 判断是否有引导图
			getGuide: function() {
				this.$Request.post(this.$api.operation.get_ads, {
					typeid: 2
				}).then(res => {
					if (res.code == 1) {
						if (res.data.video == '') {
							if (!uni.getStorageSync('USERINFO').user_token) {
								uni.setStorageSync('USERINFO', {
									user_type: 1,
									id: ''
								})
							}
							uni.reLaunch({
								url: '/pages/guide/guide'
							});
						}
					}
				})
			}
		}
	};
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*UI自带CSS,请勿修改*/
	@import 'colorui/main.css';
	@import 'colorui/icon.css';
	/*自定义CSS*/
	@import './static/css/common.css';
	@import './static/iconfont/iconfont.css';
	@import './common/css/common.css';

	/*如 : 去除导航背景 点击时透明度 0.8*/
	.navigator {
		opacity: 1;
		background: none;
	}

	.navigator-hover {
		background: none;
		opacity: 0.8;
	}

	.APP_pays {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	page {
		background-color: #fff;
	}

	.uni-popup {
		z-index: 99999;
	}

	.uni-textarea-compute {
		height: 100%;
		overflow: auto;
	}
</style>
