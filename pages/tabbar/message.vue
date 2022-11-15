<template>
	<!-- #ifdef MP-WEIXIN -->
	<!-- <scroll-view scroll-y style="padding-bottom: 10rpx;" :style="[{ height: 'calc(100vh-100upx)' }]"> -->
	<!-- #endif -->
	<view class="bg-white" style="height: 100%;">
		<cu-custom bgColor="text-black bg-white">
			<block slot="content"><text class="text-bold">消息</text></block>
		</cu-custom>

		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="CustomBar * 2" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption">
			<view class="cu-list menu pb50 bg-white">
				<view class=" plr10 ptb15">
					<view class="cu-item arrow" @tap="gomsg">
						<view class=" flex" style="width: 100%;">
							<view class="bg-gray margin-right-sm" style="width: 96upx;height:96upx;border-radius: 50%;position: relative;flex-shrink: 0;">
								<image :src="IMG_URL + 'static/miniwechat/xiaoxi.png'" style="width: 100%;height: 100%;" mode="aspectFit"></image>
								<text class="msgnum" v-if="systm!=''&&systm.is_read == 0"></text>
								<!-- <text class="masgnum" v-else>{{systm.is_read}}</text> -->
							</view>
							<view class="flex column justify-between" style="flex:1;">
								<view class="flex justify-between ">
									<view class=""><text class="text-bold margin-right-xs text-df">系统通知</text></view>
									<view class="text-sm" style="color: #666;">{{ systm.create_time }}</view>
								</view>
								<!-- <view class="flex justify-between align-center " style="color: #666;"> -->
								<view class="">
									<text class="text-sm text-gray text_line2" style="word-wrap:break-word;word-break:break-all;
">{{ systm.title || '暂无新消息' }}</text>
									<!-- </view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 用户列表 -->
				<view class=" cu-item" v-for="(item, index) in list" :key="index" @tap="navTo(item)" @touchstart="ListTouchStart"
				 @touchmove="ListTouchMove" @touchend="ListTouchEnd" :class="modalName == 'move-box-' + index ? 'move-cur' : ''"
				 :data-target="'move-box-' + index">
					<view class=" flex content">
						<view class="bg-gray margin-right-sm" style="width: 96upx;height:96upx;border-radius: 50%;position: relative;flex-shrink: 0;">
							<image :src="item.picture ? item.picture :'/static/images/logo.png'" style="width: 100%;height: 100%;border-radius: 50%"
							 mode="aspectFit"></image>
							<text class="masgnum" v-if="item.count && item.count > 0">{{ item.count }}</text>
							<!-- <text class="masgnum" >{{ item.count }}1</text> -->
						</view>
						<view class="" style="flex:1;">
							<view class="flex justify-between ">
								<view class="">
									<text class="text-bold margin-right-xs">{{ item.name || '昵称' }}</text>
								</view>
								<view class="text-sm" style="color: #666;">{{ item.create_time }}</view>
							</view>
							<view class="flex justify-between align-center " style="color: #666;">
								<view class="overflow-two">
									<view class="text-sm text-gray">
										<text class="text-df" v-if="item.data.msg_type == 'img'">[图片]</text>
										<text class="text-df" v-if="item.data.msg_type == 'voice'">语音</text>
										<view class="text-df" v-if="item.data.msg_type != 'voice'&&item.data.msg_type != 'img'">
											<rich-text :nodes="item.data.content"></rich-text>
										</view>
										<text class="text-df" v-show="!item.data.content">暂无新消息</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="move" style="width: 140rpx;">
						<view class="bg-red" @click.stop="delete_msg(item.friend_id)">删除</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
	<!-- #ifdef MP-WEIXIN -->
	<!-- </scroll-view> -->
	<!-- #endif -->
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	var socketOpen = false;
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				CustomBar: this.CustomBar,
				PageCur: 'homepage',
				cardCur: 0,
				swiperList: [],
				user: [], //用户信息
				user_type: 1,
				isopen: true, //跳转页面
				modalName: null,
				systm: [], //系统信息
				conversations: [], //会话列表
				IMG_URL:this.IMG_URL,
				syncConversation: [], //离线消息
				user_token: {}, //用户缓存信息
				list: [], //用户聊天列表
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认false
				},
				// 上拉加载的常用配置
				upOption: {
					isBounce: false,
					use: true, // 是否启用上拉加载; 默认true
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '',
						icon: '',
					}
				},
			};
		},
		created() {
			this.user = uni.getStorageSync('USERINFO');
			this.user_type = this.user.user_type;
			uni.$on('number', data => {
				this.getSystemnews();
				this.mescroll && this.mescroll.resetUpScroll();
			});
			if (this.user.user_token) {
				this.getSystemnews();
				this.downOption.auto = true
				this.upOption.auto = true
				this.mescroll && this.mescroll.resetUpScroll();
			} else {
				this.list = []
			}
			uni.$on('delet', data => {
				if (data.msg == 'del') {
					this.mescroll && this.mescroll.resetUpScroll();
				}
			});
			uni.$on('onSocketMessage_list', data => {
				if (data.message_type == 'chatMessage') {
					this.mescroll && this.mescroll.resetUpScroll(false);
				}
			});
			uni.$on('openPage', data => {
				this.mescroll && this.mescroll.resetUpScroll();
			})
			uni.$on('updata', () => {
				this.mescroll && this.mescroll.resetUpScroll(false);
			});
			uni.$on('wechatLogin', () => { //通知成功
				this.mescroll && this.mescroll.resetUpScroll();
			})
		},
		mounted() {
			uni.$on('openPage', data => {
				this.mescroll && this.mescroll.resetUpScroll();
			})
		},
		destroyed() {
			//销毁组件
			uni.$off('delet');
			uni.$off('number');
			uni.$off('onSocketMessage_list');
			uni.$off('wechatLogin');
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
		methods: {
			navTo(item) {
				if (this.modalName != null) {
					return;
				}
				//点击聊天
				if (item.data != '') {
					item.data.uid = Number(item.data.uid);
				}
				uni.setStorageSync('setData', item.data);
				if (this.isopen == false) {
					return;
				}
				if (!this.user.user_token) {
					this.$Common.toast('您还没有登录，请先登录');
					setTimeout(() => {
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '../../pagessignup/login'
						});
						// #endif

						// #ifdef MP-WEIXIN
						uni.navigateTo({ //微信授权后直接返回上一级不能使用 redirectTo
							url: '/pagessignup/wechat/wxlog?page=outLogin'
						});
						// #endif
					}, 500);
					return
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.$emit('jump', {})
				uni.$emit('number', {
					msg: 'number'
				});
				uni.navigateTo({
					url: '../../pagesmessage/userMsg?kfid=' +
						item.uid +
						'&userName=' +
						(item.name || item.user_nickname) +
						'&job_position_id=' +
						item.job_position_id +
						'&friendId=' +
						item.friend_id,
					animationDuration: 300
				});
			},
			upCallback(mescroll) {
				let that = this;
				// 此时mescroll会携带page的参数:
				let page = mescroll.num; // 页码, 默认从1开始
				let list_rows = mescroll.size; // 页长, 默认每页10条
				// 将获取的经纬度传给后台
				if (this.user.user_token) {
					this.$Request
						.post(this.$api.msg.doctor_list, {
							type: 1,
							page: page,
							list_rows: 10
						})
						.then(res => {
							if (res.code == 1) {
								let curPageData = res.data.data;
								let total = res.data.total;
								if (page == 1) that.list = []; //如果是第一页需手动置空列表
								that.list = that.list.concat(curPageData); //追加新数据
								mescroll.endBySize(curPageData.length, total);
							} else {
								this.mescroll.endErr();
							}
						})
						.catch(err => {
							this.$Common.toast('网络错误，请稍后再试')
							this.mescroll.endErr();
						});
				} else {
					this.mescroll.endErr();
				}
			},

			getSystemnews() {
				//获取系统消息
				this.$Request.post(this.$api.operation.get_message_type_list).then(res => {
					if (res.code == 1) {
						this.systm = res.data[0].new_msg;
					} else {
						this.$Common.toast(res.msg);
					}
				});
			},
			delete_msg(id) {
				uni.showModal({
					content: '确定要删除此好友吗？',
					success: (res) => {
						if (res.confirm) {
							// 删除消息
							this.$Request
								.post(this.$api.msg.deletFriend, {
									ids: id
								})
								.then(res => {
									if (res.code == 1) {
										this.$Common.toast('删除成功')
										this.mescroll && this.mescroll.resetUpScroll(false);
									} else {
										this.$Common.toast(res.msg);
									}
								});
						}
					}
				})

			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX;
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left';
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target;
				} else {
					setTimeout(() => {
						this.modalName = null;
					}, 100);
				}
				this.listTouchDirection = null;
			},

			// 点击系统消息进入详情
			gomsg() {
				if (!this.user.user_token) {
					this.$Common.toast('您还没有登录，请先登录');
					setTimeout(() => {
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '../../pagessignup/login'
						});
						// #endif

						// #ifdef MP-WEIXIN
						uni.navigateTo({ //微信授权后直接返回上一级不能使用 redirectTo
							url: '/pagessignup/wechat/wxlog?page=outLogin'
						});
						// #endif
					}, 500);
					return
				} else {
					if (this.isopen == false) {
						return;
					}
					this.isopen = false;
					setTimeout(() => {
						this.isopen = true;
					}, 1500);
					this.$Request.post(this.$api.msg.user_token_msg).then(res => {});
					uni.$emit('number', {
						msg: 'number'
					});
					uni.navigateTo({
						url: '../../pagesmessage/msg'
					});
				}
			}
		}
	};
</script>

<style lang="scss">
	.cu-list>.cu-item.move-cur {
		transform: translateX(-140rpx);
	}

	.cu-list>.cu-item {
		transition: all 0.3s ease-in-out 0s;
	}

	page {
		// padding-bottom: 100rpx;
		background-color: #fff !important;
		height: 100%;
	}

	.nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 750upx;
		padding: 0 26upx;
		z-index: 10;
		min-height: 110rpx;
		// text-align: center;
		line-height: 110rpx;
		background-color: #fff;
	}

	.lunbo {
		padding: 0 32rpx 0;

		border-radius: 20rpx;

		image {
			border-radius: 20rpx;
		}
	}

	.box {
		image {
			width: 106rpx;
			height: 106rpx;
		}
	}

	.cu-list.menu>.cu-item .content uni-image {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
	}

	.cu-list.menu>.cu-item {
		padding: 30rpx 0;
	}

	.msgnum {
		position: absolute;
		top: 0;
		right: 8upx;
		z-index: 100;
		width: 22upx;
		height: 22upx;
		background: #ff5656;
		border-radius: 50%;
		font-size: 22upx;
		color: #fff;
		text-align: center;
		line-height: 28upx;
	}

	.masgnum {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 100;
		width: 32upx;
		height: 32upx;
		background: #ff5656;
		border-radius: 50%;
		font-size: 22upx;
		color: #fff;
		text-align: center;
		line-height: 28upx;
	}

	.sm-border {
		margin-bottom: 80upx;
	}
</style>
