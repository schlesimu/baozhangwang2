<!-- 与招聘者/应聘者沟通 -->
<template>
	<view class="">
		<view class="fixed">
			<cu-custom bgColor="bg-white text-black" :isBack="true">
				<block slot="backText">
					<!-- #ifdef MP-WEIXIN -->
					<text class="text_line1">{{ title || '昵称' }}</text>
					<!-- #endif -->
				</block>
				<!-- #ifndef MP-WEIXIN -->
				<block slot="content">{{ title || '昵称' }}</block>
				<!-- #endif -->
				<block slot="right">
					<text @tap='toReport' class="padding-right">举报</text>
				</block>
			</cu-custom>
		</view>
		<view class="cu-chat ">
			<view class="content" @touchstart="hideEmoji">
				<scroll-view class="msg-list" scroll-y="true" style="top: 180upx;"
					:scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView"
					@scrolltoupper="getMsgList()">
					<view class="row" v-for="(row, index) in msgList" :key="index" v-if="row.from_id"
						:id="'msg' + row.aid">
						<block v-if="row.from_id">
							<!-- <view class=" text-center margin-bottom text-sm" v-if="index%10==0">{{row.updateTime||row.time||''}}</view> -->
							<!-- 自己发出的消息 -->
							<view class="my flex-direction text-right" v-if="row.from_id == myuid">
								<view class="text-sm flex  padding-bottom align-center justify-end">
									<view class=""> {{row.updateTime||row.time}}</view>
									<!-- <view class=" padding-left"> {{row.from_name}}</view> -->
								</view>
								<view class="flex   justify-end">
									<view class="left" v-if="row.msg_type != 'msg'">
										<!-- :class="playMsgid == row.id ? 'play' : ''" -->
										<view style="background-color: #338fff;color: #FFFFFF;"
											v-if="row.msg_type == 'voice'" class="bubble voice" @tap="playVoice(row)">
											<view class="length">{{ JSON.parse(row.content)['length'] }}</view>
											<view class="icon my-voice"></view>
										</view>
										<view v-if="row.msg_type == 'img'" class="bubble img" @tap="showPic(row)">
											<image :src="row.content | msg_img" mode="aspectFill"></image>
										</view>
										<view style="background-color: #338fff;color: #FFFFFF;"
											v-if="row.msg_type == 'text'" class="bubble">
											<!-- #ifndef MP-WEIXIN -->
											<text :selectable='true' v-html="row.content"></text>
											<!-- #endif -->
											<!-- #ifdef MP-WEIXIN -->
											<rich-text :nodes="row.content" :selectable='true'></rich-text>
											<!-- #endif -->
										</view>
									</view>
									<view class="right" v-if="row.msg_type != 'msg'">
										<image :src="row.from_avatar || '/static/images/logo.png'" class="bg-gray">
										</image>
									</view>
								</view>
							</view>
							<!-- 别人发出的消息 -->
							<view class="other flex-direction" v-if="row.from_id != myuid && kf_id==row.from_id">
								<view class="text-sm flex  padding-bottom align-center ">
									<!-- <view class=" "> {{title}}</view> -->
									<view class=""> {{row.updateTime||row.time}}</view>
								</view>
								<view class="flex  ">
									<view class="left" v-if="row.msg_type != 'msg'">
										<image :src="row.from_avatar || '/static/images/logo.png'" class="bg-gray">
										</image>
									</view>
									<view class="right" v-if="row.msg_type != 'msg'">
										<view v-if="row.msg_type == 'voice'&&row.content!=''" class="bubble voice"
											@tap="playVoice(row)" :class="playMsgid == row.id ? 'play' : ''">
											<view class="icon other-voice"></view>
											<view class="length">{{ JSON.parse(row.content)['length'] }}</view>
										</view>
										<view v-if="row.msg_type == 'img'" class="bubble img" @tap="showPic(row)">
											<image :src="row.content | msg_img" mode="aspectFill"></image>
										</view>
										<view class="bubble" v-if="row.msg_type == 'text'">
											<!-- #ifndef MP-WEIXIN -->
											<text :selectable='true' v-html="row.content"></text>
											<!-- #endif -->
											<!-- #ifdef MP-WEIXIN -->
											<rich-text :nodes="row.content" :selectable='true'></rich-text>
											<!-- #endif -->
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
			<!-- 表情栏 -->
			<view class="emoji-box" :class="showEmji" @touchmove.stop.prevent="discard">
				<swiper class="swiper" indicator-dots="true" duration="150">
					<swiper-item v-for="(page, pid) in emojiList" :key="pid">
						<view v-for="(em, eid) in page" :key="eid" @tap="addEmoji(em)">
							<image mode="widthFix" :src="IMG_URL + 'static/images/emoji/' + em.url"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 底部输入栏 -->
			<view class="input-box flex  align-end" :class="showEmji" @touchmove.stop.prevent="discard">
				<view class="more" @tap="chooseImage">
					<view class="icon tupian"></view>
				</view>
				<view class="more" @tap="switchVoice">
					<view class="icon yuyin"></view>
					<!-- <image :src="IMG_URL + 'static/miniwechat/voice.png'" mode=""></image> -->
				</view>
				<view class="textbox">
					<view class="voice-mode" :class="[isVoice ? '' : 'hidden', recording ? 'recording' : '']"
						@touchstart.stop.prevent="voiceBegin" @touchmove.stop.prevent="voiceIng"
						@touchend.stop.prevent="voiceEnd" @touchcancel.stop.prevent="voiceCancel">
						{{ voiceTis }}
					</view>
					<view class="text-mode" :class="isVoice ? 'hidden' : ''">
						<view class="box">
							<textarea @focus="onKeyboard = true" auto-height="autoHeight" cursor-spacing="20"
								maxlength="-1" @linechange="lineChange" v-model="textMsg" id="textMsg" />
						</view>
						<view class="em" @tap="chooseEmoji">
							<view class="icon biaoqing"></view>
						</view>
					</view>
				</view>
				<label for="textMsg" v-if="textMsg!=''">
					<view class="send" :class="isVoice ? 'hidden' : ''" @tap="sendText">
						<view class="btn">发送</view>
					</view>
				</label>
			</view>
			<!-- 录音效果(上滑取消) -->
			<view class="record" :class="recording ? '' : 'hidden'">
				<view class="ing" :class="willStop ? 'hidden' : ''">
					<view class="icon luyin2"></view>
				</view>
				<view class="cancel" :class="willStop ? '' : 'hidden'">
					<view class="icon chehui"></view>
				</view>
				<view class="tis" :class="willStop ? 'change' : ''">{{ recordTis }}</view>
			</view>

			<!-- 全屏遮罩层，解决ios无法关闭软键盘 -->
			<view v-if="onKeyboard" class="prop_ios" @tap="hideKeyboard"></view>
		</view>
	</view>
</template>

<script>
	var that;
	var socketOpen = true;
	var socketMsgQueue = [];
	var kf_id = 0;
	var kf_name = '';
	// 是否点击显示表情的标志
	var flag = 1;
	var commChat = 1;
	import jyfParser from '@/components/jyf-parser/jyf-parser';
	import emojiList from '@/common/js/emojList.js';
	const recorderManager = uni.getRecorderManager();
	var innerAudioContext;
	// innerAudioContext.autoplay = true;
	export default {
		components: {
			jyfParser
		},
		data() {
			let BASE_URL = this.$Config("APIHOST");
			return {
				kf_id: '',
				BASE_URL,
				massage_type: 1, // 用户聊天1 还是 与后台聊天 0
				user_type: 1, //用户身份 1应聘端 2招聘端
				title: '', //导航标题
				onKeyboard: false, //是否打开了软键盘
				imgUrl: this.$apiurl, //远程图片地址
				user: {}, //会员信息
				autoHeight: true, //输入框自动高度
				kfdata: [], //
				limitHour: false, //面试时间选择
				//文字消息
				textMsg: '', //文字加表情包
				IMG_URL:this.IMG_URL,
				//消息列表
				scrollAnimation: false,
				scrollTop: 0,
				scrollToView: '',
				friendId: '', //朋友id
				job_position_id: '', //职位id
				msgList: [], //聊天列表
				msgImgList: [], //聊天图片列表
				emojiList: emojiList,
				isstop: true,
				msg_code: [{
					//聊天列表里的字段定义
					id: 0,
					uid: -1,
					username: '系统助手',
					face: this.imgUrl + 'static/miniwechat/none4x3.jpg',
					time: '',
					type: 'system',
					content: '您好，有问题请留言'
				}],
				myuid: 0, //我的uid
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER: uni.getRecorderManager(),
				// #endif
				isVoice: false,
				voiceTis: '按住 说话',
				recordTis: '手指上滑 取消发送',
				recording: false,
				willStop: false,
				jobData: [], //职位展示信息
				initPoint: {
					identifier: 0,
					Y: 0
				},
				recordTimer: null,
				recordLength: 0,
				//播放语音相关参数
				AUDIO: uni.createInnerAudioContext(),
				playMsgid: null,
				VoiceTimer: null,
				//表情定义
				showEmji: '',
				setList: [],
				page: 1, //页码
				isLoading: false,
			};
		},
		onLoad(option) {
			that = this;
			this.kf_id = option.kfid;
			this.friendId = option.friendId;
			kf_id = option.kfid;
			this.job_position_id = option.job_position_id;
			if (option.userName) {
				this.title = option.userName;
			}
			//语音自然播放结束
			this.AUDIO.onEnded(res => {
				this.playMsgid = null;
			});
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart(e => {
				this.recordBegin(e);
			});
			recorderManager.onStop(function(res) {
				uni.saveFile({
					tempFilePath: res.tempFilePath,
					success: function(res) {
						var savedFilePath = res.savedFilePath;
						that.recordEnd(savedFilePath);
					}
				});
				// self.voicePath = res.tempFilePath;
			});
			// #endif
			// 获取用户自己的信息
			this.user_data = uni.getStorageSync('USERINFO');
			// console.log(this.user_data, '用户缓存信息');
			if (this.user_data) {
				this.myuid = this.user_data.id;
				this.user.id = this.user_data.id;
				this.user.name = this.user_data.user_nickname;
				this.user.avatar = this.user_data.head_img;
				this.user.group = 1;
			} else {
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: '../pagessignup/login'
				});
				// #endif

				// #ifdef MP-WEIXIN
				uni.navigateTo({ //微信授权后直接返回上一级不能使用 redirectTo
					url: '/pagessignup/wechat/wxlog'
				});
				// #endif
			}
			this.user_type = this.user_data.user_type;
			this.changeStatus(); //修改已读未读消息
			this.addFriend()
			this.getMsgList(); //获取聊天记录
			setTimeout(() => { // 创建连接只能同时创建一次
				this.connectSocket();
			}, 500)
		},
		filters: {
			msg_img(msg) {
				let str = '';
				if (msg) {
					if (msg.indexOf('img[') >= 0) {
						str = msg.substr(4, msg.length - 5);
					}
				}
				return str;
			}
		},
		onUnload() {
			this.changeStatus();
			// 刷新消息角标
			uni.$emit('updata', {});
			if (innerAudioContext) {
				innerAudioContext.stop();
			}
			uni.$emit('openAll', {})
		},

		methods: {
			// 举报
			toReport(){
				uni.navigateTo({
					url:'/pagesHome/complaint?job_id='+this.kf_id+'&&job_type=1'
				})
			},
			hideKeyboard(e) {
				//隐藏软键盘
				uni.hideKeyboard();
				this.onKeyboard = false;
			},
			lineChange(e) {
				//监听高度
				if (e.detail.lineCount > 3) {
					this.autoHeight = false;
				}
			},
			addFriend(id) { //进页面添加好友
				if (id != 1) {
					this.$Request.post(this.$api.msg.addFriend, {
						user_id: this.kf_id,
						job_position_id: this.job_position_id
					}).then(res => {
						if (res.code == 1) {}
					});
				}
			},
			connectSocket() { //接收消息  创建连接
				let that = this
				// #ifdef MP-WEIXIN
				uni.connectSocket({
					// url: this.$Request.config('WS_HOST')
					url: 'wss://websocket.chongdarenli.com?from_id=' + this.user.id + '&to_id=' + this.kf_id
				});
				// #endif
				// #ifndef MP-WEIXIN
				uni.connectSocket({
					url: 'ws://123.56.143.238:9502?from_id=' + this.user.id + '&to_id=' + this.kf_id
				})
				// #endif
				// uni.connectSocket({
				//     //创建连接
				//     url: 'ws://123.56.143.238:9502?from_id='+this.user.id+'&to_id='+this.kf_id
				// });
				console.log('websocket已打开')
				uni.onSocketOpen(function(res) {
					// 登录
					var login_data =
						'{"type":"userInit", "uid": ' + that.user_data.id +
						', "name" : "' + that.user.name +
						'", "avatar" : "' + that.user.avatar +
						'", "group" : ' + that.user.group +
						', "user_type" : ' + that.user_type + '}';
					socketOpen = true;
					for (var i = 0; i < socketMsgQueue.length; i++) {
						that.sendSocketMessage(socketMsgQueue[i]);
					}
					socketMsgQueue = [];
					// 刷新 tiken 10 秒一次保持心跳
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
				uni.onSocketMessage(function(res) {
					console.log(res);
					// 非心跳
					if (res.data != 'success') {
						that.changeStatus();
						var arr = JSON.parse(res.data)
						if (!arr) {
							return
						};
						uni.$emit('updata', {}) //通知消息列表刷新数据
						console.log(arr);
						// 接收消息
						if (arr.event == 'saveMessage' || arr.event == 'message') {
							that.msgList.push(arr);
							that.msgList.map((item, index) => {
								item.updateTime = this.$Common.formatTime(item.update_time, 'Y-M-D h:m:s')			
							});
							console.log(that.msgList);
							that.$nextTick(function() {
								that.scrollToView = 'msg2';
								that.$nextTick(() => {
									that.scrollAnimation = true;
									that.scrollToView = 'msg' + that.msgList[that.msgList.length -
										1].aid;
								})
								// console.log(that.scrollToView,'============')
								uni.$emit('updata', {}) //通知消息列表刷新数据
							});
						} else if (arr.event == 'getOfflineMessage') { // 读取消息列表
							// that.msgList = arr.msgs;
						}
					}
				});
				uni.onSocketClose(function(res) {
					console.log('WebSocket 已关闭！', res);
				});
			},
			getMsgList() {
				// 读取本地聊天记录
				let that = this
				if (this.isLoading) {
					return
				}
				let kf_id = that.kf_id;
				this.isLoading = true;
				this.$Request
					.post(this.$api.msg.msg_List, {
						to_id: kf_id,
						page: this.page,
						list_rows: 30
					})
					.then(res => {
						that.addFriend(kf_id);
						if (res.code == 1) {
							if (res.data.data.length > 0) {
								let arr = res.data.data,
									oldId;
								arr.map((item, index) => {
									item['id'] = index + 1;
								});
								// if(that.msgList==''){
								oldId = arr[arr.length - 1].aid
								// }else{
								// 	oldId=that.msgList[that.msgList.length-1].id
								// }
								that.msgList = [...arr, ...that.msgList]
								that.msgList.map((item, index) => {
									item.updateTime = this.$Common.formatTime(item.create_time, 'Y-M-D h:m:s')
									item['id'] = index + 1;
								});
								that.$nextTick(function() {
									that.scrollAnimation = false;
									that.scrollToView = 'msg2';
									that.$nextTick(() => {
										that.scrollToView = 'msg' + oldId;
										setTimeout(() => {
											that.scrollAnimation = true;
										}, 1000)
									})
								});
								// this.msgList = arr;
								if (res.data.last_page <= that.page) {
									return
								} else {
									this.page++
								}

							} else {
								this.msgList = this.msg_code;
							}
						}

						this.isLoading = false;
					});
			},
			sendSocketMessage(msg) { //发送消息
				let that = this;
				if (socketOpen) {
					uni.sendSocketMessage({
						data: msg,
						success: function(res) {
							console.log(res);
							let arr = JSON.parse(msg);
							if (!arr) {
								return;
							}
							that.msgList.push(arr);
							// console.log(that.msgList,'===')

						},
						fail: function(err) {
							that.$Common.toast('连接失败，请退出重试')
						}
					});
				} else {
					socketMsgQueue.push(msg);
				}
			},

			// 发送消息
			sendMsg(content, type) {
				var nowDate = new Date();
				let lastid = this.msgList.length;
				lastid++;
				let dataTime = ''
				dataTime = new Date().getTime()
				let msg = {
					id: lastid,
					aid: dataTime,
					username: this.user.name,
					face: this.user.avatar,
					time: nowDate.getHours() + ':' + nowDate.getMinutes(),
					msg_type: type,
					to_id: parseInt(kf_id),
					msg: content,
					from_name: this.user.name,
					from_avatar: this.user.avatar,
					updateTime: this.$Common.formatTime(dataTime, 'Y-M-D h:m:s')
				};
				// 接收  自己发送的
				this.screenMsg(msg);
				let send_data = JSON.stringify({
					id: lastid,
					aid: dataTime,
					event: 'saveMessage',
					to_id: parseInt(kf_id),
					to_name: kf_name,
					content: content,
					msg_type: type,
					from_name: this.user.name,
					from_id: this.user.id,
					from_avatar: this.user.avatar,
					// user_type: this.massage_type
					updateTime: this.$Common.formatTime(dataTime / 1000, 'Y-M-D h:m:s')
				});
				// console.log(this.msgList)
				console.log(send_data);
				// 发送
				this.sendSocketMessage(send_data);
			},

			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(row) {
				if (typeof row.msg == 'object') {
					return row;
				}
				let url = row.msg;
				let pa = /.*\[(.*)\]/;
				let path = url.match(pa) ? url.match(pa)[1] : '';
				row.msg = path || row.msg;
				return row;
				/* 下方为原始逻辑，已废弃 */
				let maxW = uni.upx2px(350);
				let maxH = uni.upx2px(350);
				if (row.msg.w > maxW || row.msg.h > maxH) {
					let scale = row.msg.w / row.msg.h;
					if (row.msg.w > row.msg.h) {
						row.msg.w = maxW;
						row.msg.h = row.msg.w / scale;
					} else {
						row.msg.h = maxH;
						row.msg.w = row.msg.h * scale;
					}
				}
				return row;
			},
			changeStatus() {
				//修改已读未读
				this.$Request.post(this.$api.msg.user_token_msg, {
					from_id: this.kf_id
				}).then(res => {});
			},
			// 接受消息(筛选处理)
			screenMsg(msg) {
				this.changeStatus();
				uni.$emit('updata', {});
				//从长连接处转发给这个方法，进行筛选处理
				if (msg.uid != this.myuid) {}
				// let oldId=msg.id+1
				this.$nextTick(function() {
					that.scrollToView = 'msg2';
					that.$nextTick(() => {
						that.scrollAnimation = true;
						that.scrollToView = 'msg' + msg.aid;
					})
				});
				switch (msg.type) {
					case 'text':
						this.addTextMsg(msg);
						break;
					case 'voice':
						this.addVoiceMsg(msg);
						break;
					case 'img':
						this.addImgMsg(msg);
						break;
						// case 'msg':
						// 	this.addResume(msg);
						// 	break;
				}
				// plus.audio.createPlayer("/static/wangwang.mp3").play();  铃声提示
			},
			// 选择表情
			chooseEmoji() {
				this.hideKeyboard(); //隐藏软键盘
				this.showEmji = this.showEmji == 'showEmoji' ? 'hideEmoji' : 'showEmoji';
			},
			// 隐藏表情
			hideEmoji() {
				this.showEmji = this.showEmji == 'showEmoji' ? 'hideEmoji' : '';
				this.hideKeyboard(); //隐藏软键盘
			},
			//添加表情
			addEmoji(em) {
				this.textMsg += em.alt;
			},
			sendText() {
				// 发送文字消息
				this.hideEmoji();
				if (!this.textMsg) {
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				this.sendMsg(content, 'text');
				this.textMsg = '';
			},
			//替换表情符号为图片
			replaceEmoji(str) {
				if (this.massage_type != 1) {
					str = str.replace(/emoji/g, ' '); // 去除 emoji 这个字符串
				} else {
					str = this.sysReplaceEmoji(str);
				}
				// console.log(str, '1');
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					for (let i = 0; i < this.emojiList.length; i++) {
						let row = this.emojiList[i];
						for (let j = 0; j < row.length; j++) {
							let EM = row[j];
							if (EM.alt == item) {
								//在线表情路径，图文混排必须使用网络路径
								let onlinePath = this.IMG_URL + 'static/images//emoji/';
								let imgstr = '<img src="' + onlinePath + EM.url + '">';
								return imgstr;
							}
						}
					}
				});
				return replacedStr;
			},
			sysReplaceEmoji(content) {
				content = (content || '')
					.replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
					// .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;') // XSS
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					.replace(/&#39;/g, "'")
					.replace(/&quot;/g, '"') // XSS
					.replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2') // 转义@
					.replace(/emoji\[([^\s\[\]]+?)\]/g, function(face) {
						// 转义表情
						var alt = face.replace(/^emoji/g, '');
						return '<img alt="' + alt + '" title="' + alt + '" src="' + faces[alt] + '">';
					})
					.replace(/img\[([^\s]+?)\]/g, function(img) {
						// 转义图片
						return '<img class="layui-whisper-photos" src="' + img.replace(/(^img\[)|(\]$)/g, '') +
							'" width="100px" height="100px">';
					})
					.replace(/file\([\s\S]+?\)\[[\s\S]*?\]/g, function(str) {
						// 转义文件
						var href = (str.match(/file\(([\s\S]+?)\)\[/) || [])[1];
						var text = (str.match(/\)\[([\s\S]*?)\]/) || [])[1];
						if (!href) return str;
						return '<a class="layui-whisper-file" href="' + href +
							'" download target="_blank"><i class="layui-icon">&#xe61e;</i><cite>' + (text || href) +
							'</cite></a>';
					})
					.replace(/\n/g, '<br>'); // 转义换行
				return content;
			},
			// 选择图片发送
			chooseImage() {
				this.hideEmoji();
				this.$Request.uploadImg(res => {
					let msg = 'img[' + res.data[0].path + ']';
					this.sendMsg(msg, 'img');
				});
				return false;
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg) {
				this.msgList.push(msg);
			},
			// 处理文字消息
			addTextMsg(msg) {
				this.msgList.push(msg);
			},

			// 处理语音消息
			addVoiceMsg(msg) {
				this.msgList.push(msg);
			},
			// 处理图片消息
			addImgMsg(msg) {
				let setMsg = this.setPicSize(msg);
				this.msgImgList.push(setMsg.msg);
				this.msgList.push(setMsg);
			},
			// 预览图片
			showPic(row, ) {
				let str = [];
				let imgurl = row.content;
				if (imgurl.indexOf('img[') >= 0) {
					str.push(imgurl.substr(4, imgurl.length - 5));
				}
				uni.previewImage({
					indicator: 'none',
					current: imgurl,
					urls: str
				});
			},

			// 播放语音
			playVoice(msg) {
				//暂停功能暂时不可用
				// if(this.isstop==false){  
				// 	 innerAudioContext.stop();
				// 	 return
				// }
				innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = JSON.parse(msg.content).url;
				innerAudioContext.onPlay(() => {});
			},
			// 录音开始
			voiceBegin(e) {
				let _self = this;
				// #ifndef H5
				recorderManager.start();
				this.initPoint.Y = e.touches[0].clientY;
				// #endif
				// #ifdef H5
				uni.uploadFile({ //上传后台
					url: this.BASE_URL + _self.$api.common.upload,
					filePath: '_doc/uniapp_save/1602033561081.mp3',
					name: 'file[]',
					formData: {},
					success: function(upRes) { //上传成功
						//uni.hideLoading();
					},
					fail: function(err) {
						uni.showToast({
							title: '语音上传失败，请稍后再试.' + err.errMsg,
							icon: 'none'
						})
					}
				});
				// #endif
				// if (e.touches.length > 1) {
				// 	return;
				// }
				// this.initPoint.identifier = e.touches[0].identifier;
				// this.RECORDER.start({ format: 'aac' }); //录音开始,
			},
			//录音开始UI效果
			recordBegin(e) {
				this.recording = true;
				this.voiceTis = '松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(() => {
					this.recordLength++;
				}, 1000);
			},
			// 录音被打断
			voiceCancel() {
				// 	this.recording = false;
				// 	this.voiceTis = '按住 说话';
				// 	this.recordTis = '手指上滑 取消发送';
				// 	this.willStop = true; //不发送录音
				// 	recorderManager.stop();
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e) {
				if (!this.recording) {
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
					this.willStop = true;
					this.recordTis = '松开手指 取消发送';
				} else {
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送';
				}
			},
			// 结束录音
			voiceEnd(e) {
				if (!this.recording) {
					return;
				}
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送';
				// this.RECORDER.stop(); //录音结束
				recorderManager.stop();
			},
			//录音结束(回调文件)
			async recordEnd(res) {
				clearInterval(this.recordTimer);
				let _self = this
				if (!_self.willStop) {
					let msg = {
						length: 0,
						url: res,
					};
					let data = {}
					let min = parseInt(this.recordLength / 60);
					let sec = _self.recordLength % 60;
					min = min < 10 ? '0' + min : min;
					sec = sec < 10 ? '0' + sec : sec;
					msg.length = min + ':' + sec;
					if (min <= 0 && sec <= 0) {
						this.$Common.toast('录音时间过短')
						return
					}
					let fileList = {}
					// let url = plus.io.convertLocalFileSystemURL(res.tempFilePath);				
					let url = res;
					fileList['uploadTask'] = uni.uploadFile({ //上传后台
						url: this.BASE_URL + _self.$api.common.singupAudio,
						filePath: url,
						name: 'file[]',
						formData: data,
						success: function(upRes) { //上传成功
							//uni.hideLoading();
							if (upRes.statusCode == 200) {
								let data = JSON.parse(upRes.data);
								msg.url = data.data[0].path
								let sendMsg = JSON.stringify(msg)
								console.log(sendMsg, '----语音信息======')
								setTimeout(() => {
									_self.sendMsg(sendMsg, 'voice');
								}, 100)
							} else {
								uni.showToast({
									title: upRes.errMsg,
									icon: 'none'
								})
							}
						},
						fail: function(err) {
							uni.showToast({
								title: '音频上传失败，请稍后再试.' + err.errMsg,
								icon: 'none'
							})
						}
					});

				} else {}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice() {
				this.hideEmoji();
				this.isVoice = this.isVoice ? false : true;
			},
			discard() {
				return;
			},
			getCacheChat(key) {
				return uni.getStorageSync(key);
			},
			setCacheChat(obj) {
				uni.setStorageSync(obj.key, obj.data);
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.fixed {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 9999;
	}

	.tag {
		padding: 2rpx 8rpx;
		border: 1rpx solid #74b0ff;
		font-size: 24rpx;
		border-radius: 4rpx;
		margin-right: 10rpx;
		color: #74b0ff;
	}

	.prop_ios {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: calc(100% - 100upx);
		background: rgba(0, 0, 0, 0);
	}

	@font-face {
		font-family: 'HMfont-home';
		src: url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');
	}

	.icon {
		font-family: 'HMfont-home' !important;
		font-size: 56upx;
		font-style: normal;
		color: #333;

		&.biaoqing:before {
			content: '\e797';
		}

		&.jianpan:before {
			content: '\e7b2';
		}

		&.yuyin:before {
			content: '\e805';
		}

		&.tupian:before {
			content: '\e639';
		}

		&.chehui:before {
			content: '\e904';
		}

		&.luyin:before {
			content: '\e905';
		}

		&.luyin2:before {
			content: '\e677';
		}

		&.other-voice:before {
			content: '\e667';
		}

		&.my-voice:before {
			content: '\e906';
		}
	}

	.hidden {
		display: none !important;
	}

	@keyframes showEM {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-42vw);
		}
	}

	@keyframes hideEM {
		0% {
			transform: translateY(-42vw);
		}

		100% {
			transform: translateY(0);
		}
	}

	.emoji-box {
		&.hideEmoji {
			animation: hideEM 0.15s linear both;
		}

		&.showEmoji {
			animation: showEM 0.15s linear both;
		}

		width: 100%;
		height: 42vw;
		padding: 20upx 2%;
		background-color: #fff;
		border-top: solid 1upx #ddd;
		position: fixed;
		z-index: 20;
		top: 100%;

		.swiper {
			swiper-item {
				display: flex;
				flex-wrap: wrap;

				view {
					width: 12vw;
					height: 12vw;
					display: flex;
					justify-content: center;

					image {
						width: 60%;
					}
				}
			}
		}
	}

	.hidden {
		display: none;
	}

	.input-box {
		&.hideEmoji {
			animation: hideEM 0.15s linear both;
		}

		&.showEmoji {
			animation: showEM 0.15s linear both;
		}

		image {
			width: 48upx;
			height: 48upx;
		}

		width: 100%;
		min-height: 100upx;
		// max-height: 300upx;
		overflow: hidden;
		padding: 20upx 1%;
		background-color: #fff;
		display: flex;
		position: fixed;
		z-index: 20;
		bottom: 0;

		.voice,
		.more {
			flex-shrink: 0;
			width: 72upx;
			height: 70upx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 60upx;
				height: 60upx;
			}
		}

		.send {
			//H5发送按钮左边距
			/* #ifdef H5 */
			margin-left: 20upx;
			/* #endif */
			flex-shrink: 0;
			width: 100upx;
			height: 70upx;
			display: flex;
			align-items: center;

			.btn {
				width: 90upx;
				height: 56upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #338fff;
				color: #fff;
				border-radius: 6upx;
				font-size: 24upx;
			}
		}

		.textbox {
			width: 82%;
			min-height: 70upx;

			.voice-mode {
				width: calc(100% - 2upx);
				height: 68upx;
				border-radius: 70upx;
				border: solid 1upx #cdcdcd;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28upx;
				background-color: #fff;
				color: #555;

				&.recording {
					background-color: #e5e5e5;
				}
			}

			.text-mode {
				width: 96%;
				min-height: 70upx;
				display: flex;
				align-items: flex-end;
				background-color: #f7f7f7;
				border-radius: 40upx;

				.box {
					width: 100%;
					padding-left: 30upx;
					min-height: 70upx;
					display: flex;
					align-items: center;

					textarea {
						width: 100%;
						min-height: 56upx !important;
						max-height: 210upx;
						height: 35upx;
						line-height: 1.7;
					}
				}

				.em {
					flex-shrink: 0;
					width: 80upx;
					height: 70upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}

	.record {
		width: 40vw;
		height: 40vw;
		position: fixed;
		top: 55%;
		left: 30%;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 20upx;

		.ing {
			width: 100%;
			height: 30vw;
			display: flex;
			justify-content: center;
			align-items: center;

			@keyframes volatility {
				0% {
					background-position: 0% 130%;
				}

				20% {
					background-position: 0% 150%;
				}

				30% {
					background-position: 0% 155%;
				}

				40% {
					background-position: 0% 150%;
				}

				50% {
					background-position: 0% 145%;
				}

				70% {
					background-position: 0% 150%;
				}

				80% {
					background-position: 0% 155%;
				}

				90% {
					background-position: 0% 140%;
				}

				100% {
					background-position: 0% 135%;
				}
			}

			.icon {
				background-image: linear-gradient(to bottom, #f09b37, #fff 50%);
				background-size: 100% 200%;
				animation: volatility 1.5s ease-in-out -1.5s infinite alternate;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				font-size: 150upx;
				color: #f09b37;
			}
		}

		.cancel {
			width: 100%;
			height: 30vw;
			display: flex;
			justify-content: center;
			align-items: center;

			.icon {
				color: #fff;
				font-size: 150upx;
			}
		}

		.tis {
			width: 100%;
			height: 10vw;
			display: flex;
			justify-content: center;
			font-size: 28upx;
			color: #fff;

			&.change {
				color: #f09b37;
			}
		}
	}

	.content {
		width: 100%;

		.msg-list {
			width: 96%;
			padding: 0 2%;
			position: absolute;
			top: 100upx;
			bottom: 100upx;

			.row {
				.system {
					display: flex;
					justify-content: center;

					view {
						padding: 0 30upx;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #c9c9c9;
						color: #fff;
						font-size: 24upx;
						border-radius: 40upx;
					}

					.red-envelope {
						image {
							margin-right: 5upx;
							width: 30upx;
							height: 30upx;
						}
					}
				}

				&:first-child {
					margin-top: 20upx;
				}

				padding: 20upx 0;

				.my .left,
				.other .right {
					width: 100%;
					display: flex;

					.bubble {
						max-width: 85%;
						min-height: 50upx;
						border-radius: 10upx;
						padding: 15upx 20upx;
						display: flex;
						align-items: center;
						font-size: 32upx;
						word-break: break-word;

						&.img {
							background-color: transparent;
							padding: 0;
							overflow: hidden;

							image {
								max-width: 350upx;
								max-height: 350upx;
							}
						}

						&.interview {
							background-color: #ffffff;
							padding: 20upx 30upx;
							min-width: 400upx;
							border-radius: 20upx 20upx 0px 20upx;
						}

						&.voice {
							.icon {
								font-size: 40upx;
								display: flex;
								align-items: center;
							}

							.icon:after {
								content: ' ';
								width: 53upx;
								height: 53upx;
								border-radius: 100%;
								position: absolute;
								box-sizing: border-box;
							}

							.length {
								font-size: 28upx;
							}
						}
					}
				}

				.my .right,
				.other .left {
					flex-shrink: 0;
					width: 80upx;
					height: 80upx;

					image {
						width: 80upx;
						height: 80upx;
						border-radius: 10upx;
					}
				}

				.my {
					width: 100%;
					display: flex;
					justify-content: flex-end;

					.left {
						min-height: 80upx;

						align-items: center;
						justify-content: flex-end;

						.bubble {
							background-color: #fff;
							color: #333;

							&.voice {
								.icon {
									color: #fff;
								}

								.length {
									margin-right: 20upx;
								}
							}

							&.play {
								@keyframes my-play {
									0% {
										transform: translateX(80%);
									}

									100% {
										transform: translateX(0%);
									}
								}

								.icon:after {
									border-left: solid 10upx #333;
									animation: my-play 1s linear infinite;
								}
							}
						}
					}

					.right {
						margin-left: 15upx;
					}
				}

				.center {
					width: 100%;
					display: flex;
					font-size: 12px;
					justify-content: center;
					align-items: center;
				}

				.other {
					width: 100%;
					display: flex;

					.left {
						margin-right: 15upx;
					}

					.right {
						flex-wrap: wrap;

						.username {
							width: 100%;
							height: 45upx;
							font-size: 24upx;
							color: #999;
							display: flex;

							.name {
								margin-right: 50upx;
							}
						}

						.bubble {
							background-color: #fff;
							color: #333;

							&.voice {
								.icon {
									color: #333;
								}

								.length {
									margin-left: 20upx;
								}
							}

							&.play {
								@keyframes other-play {
									0% {
										transform: translateX(-80%);
									}

									100% {
										transform: translateX(0%);
									}
								}

								.icon:after {
									border-right: solid 10upx rgba(255, 255, 255, 0.8);

									animation: other-play 1s linear infinite;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
