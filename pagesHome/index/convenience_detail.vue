<template>
	<view style="padding-bottom: 100upx;">
		<!-- #ifdef APP-PLUS -->
		<view class="flex align-center bg-white justify-between plr20 topBar ptb10"
			:style="[{ paddingTop: StatusBar + 'px',height:CustomBar+'px' }]">
			<view class=""><text class="cuIcon-back " @tap.stop="back"></text></view>
			<view>详情</view>
			<view class="">
				<view class="share">
					<image class="share" :src="IMG_URL + 'static/miniwechat/new/share_black.png'" mode="aspectFill"
						@tap="share"></image>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view class="padding" :style="[{ paddingTop: CustomBar + 'px' }]">
			<!-- #endif -->
			<!-- #ifndef APP-PLUS -->
			<view class="padding">
				<!-- #endif -->
				<view class="title"><text style="font-weight: 700;" :style="category_id == 13 ? 'color: #007AFF;' : 'color: #e43d33;'" v-if="category_id == 13 || category_id == 14">[{{category_id == 13 ? '招聘信息' : '求职信息'}}]</text>{{ plant_detail.title ||''}}</view>
				<view class="text-gray text-sm mb10">{{ plant_detail.update_time||'' }}</view>
				<swiper class="screen-swiper" :indicator-dots="true" :circular="true" :autoplay="true" interval="2000"
					duration="500" v-if="plant_detail.video_id != '' || plant_detail.img_url != ''"
					style="height: 500upx;">
					<swiper-item v-if="plant_detail.video_id != '' && plant_detail.video_url != ''" @tap="toPage()">
						<view class="flex alcenter justify-center" style="position: relative;height: 500upx;">
							<image :src="plant_detail.video_id" mode="aspectFill" class="video_image"></image>
							<view class="play_tag flex justify-center alcenter">
								<!-- <text class="f64  cuIcon-playfill"></text> -->
								<image class="" :src="IMG_URL + 'static/miniwechat/play.png'" mode="aspectFill"></image>
							</view>
						</view>
					</swiper-item>
					<swiper-item v-for="(item, index) in plant_detail.img_url" v-if="plant_detail.img_url != '' "
						:key="index" @tap="yulan(item,index)" style="height: 500rpx;background-color: #F7F7F7;">
						<image :src="item" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<!-- <view class="text-gray mtb20"><image :src="plant_detail.img_url" mode="aspectFill"></image></view> -->
				<view class="text-df mt10  " style="word-wrap:break-word;word-break:break-all;">
					<jyf-parser :selectable='true' :html="plant_detail.body" ref="article"></jyf-parser>
					<!-- <text class="" :html="plant_detail.body"  @tap="copy(plant_detail.body)"></text> -->
				</view>
				<view class="mt10 f32">
					<text selectable="true">{{plant_detail.phone_content}}</text>
				</view>
				<view class=" f32" v-if="plant_detail.resident_manager_name!=''">
					<text selectable="true">{{plant_detail.resident_manager_name}}:</text>
					<text selectable="true" class="txt-theme"
						@tap='call(plant_detail.resident_manager_phone)'>{{plant_detail.resident_manager_phone|filterMobile}}</text>
				</view>
				<view class=" f32" v-if="plant_detail.finance_manager_name!=''">
					<text selectable="true">{{plant_detail.finance_manager_name}}:</text>
					<text selectable="true" class="txt-theme"
						@tap='call(plant_detail.finance_manager_phone)'>{{plant_detail.finance_manager_phone|filterMobile}}</text>
				</view>
				<view class=" f32" v-if="category_id != 13 && category_id != 14 && plant_detail.driver_name!=''">
					<text selectable="true">{{plant_detail.driver_name}}:</text>
					<text selectable="true" class="txt-theme"
						@tap='call(plant_detail.driver_phone)'>{{plant_detail.driver_phone|filterMobile}}</text>
				</view>
				<!-- 此处区分系统跟小程序，小程序的address本身就是完整地址，无需系统拼接的地址有重复 -->
				<!-- 1是系统2是小程序 -->
				<view class="flex align-center txt-theme" @tap='choose_location'
					v-if="plant_detail.city_name">
					<view class="">
						地址：{{plant_detail.source == 1 ? plant_detail.city_name : plant_detail.address}}
					</view>
					<text class="cuIcon-right pl10"></text>
				</view>
				<view class=" f32" v-if="category_id == 13 || category_id == 14">
					<text selectable="true">性别{{category_id == 13 ? '要求' : ''}}:</text>
					<text selectable="true" class="txt-theme">{{plant_detail.sex == 1 ? '男' : plant_detail.sex == 2 ? '女' : '男女不限'}}</text>
				</view>
				<view class=" f32" v-if="category_id == 13 && plant_detail.min_age && plant_detail.max_age">
					<text selectable="true">年龄要求:</text>
					<text selectable="true" class="txt-theme">{{plant_detail.min_age}}岁至{{plant_detail.max_age}}岁</text>
				</view>
				<view class=" f32" v-if="category_id == 14">
					<text selectable="true">年龄:</text>
					<text selectable="true" class="txt-theme">{{plant_detail.age}}岁</text>
				</view>
				<view class=" f32" v-if="category_id == 13 || category_id == 14">
					<text selectable="true">{{category_id == 13 ? '岗位要求' : '期望岗位'}}:</text>
					<text selectable="true" class="txt-theme">{{plant_detail.station_name}}</text>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="bg-white pb50" style="border-top: 1px solid #EEEEEE;" v-if="type != 20190118">
				<view class="bg-white">
					<view class="flex  align-center justify-between padding">
						<view class="text-lg  padding-bottom-0">
							评论
							<text>（{{commonInfo!=''&&commonInfo.length||0}}）</text>
						</view>
						<view class=" text-df" @tap='lookAll()'>
							查看全部
							<text class="cuIcon-right"></text>
						</view>
					</view>
					<view class="plr15 bg-white">
						<view class="flex pb10" v-for="(item, index) in commonInfo" :key="index">
							<view class="flex_shrink mr10" style="width: 80rpx;height: 80rpx;">
								<image :src="item.head_img||'/static/images/logo.png'" class="round"
									style="width: 80rpx;height: 80rpx;background: #ccc;"></image>
							</view>
							<view class=" align-center pl5" style="width: 90%;">
								<view class=" text-black text-df ewrap">{{item.user_nickname||''}}</view>
								<view class=" text-999 text-sm">{{item.create_time||""}}</view>
								<view class="w100">
									<view class="text-df ewrap w100" style="padding: 14upx;">{{item.content||''}} <text
											class="replyTxt margin-left-sm text-df" @tap='replyItem(item)'>回复</text>
									</view>
								</view>
								<view class="padding-top-xs" v-if="item.child" v-for="(itm, indx) in item.child"
									:key="indx">
									<view class="flex ">
										<view class="flex_shrink mr10" style="width: 60rpx;height: 60rpx;">
											<image :src="itm.head_img||'/static/images/logo.png'" class="round"
												style="width: 60rpx;height: 60rpx;background: #ccc;"></image>
										</view>
										<view class="w100">
											<view class=" text-black text-df ewrap">{{itm.user_nickname||''}}</view>
											<view class=" text-999 text-sm">{{itm.create_time||""}}</view>
											<view class="w100 text-df ewrap w100">
												回复<text class="txt-theme">{{itm.usernicknamed}} </text> :
												{{itm.content||''}} <text class="replyTxt margin-left-sm"
													@tap='replyItemSecond(item,itm)'>回复</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- v-if="info.allowComment&&info.author.authorId!=authorId" -->
					<!-- <view class="cu-bar foot search bg-f6" style="box-shadow: none;">
						<view class="search-form round bg-white padding-left" style="background-color: #fff;">
							<input type="text" placeholder="添加评论" confirm-type="确定" @comfirm="replay" :focus="isfocus"
								@blur="isfocus = false" v-model="commentVal"></input>
						</view>
						<view class="action">
							<button class="cu-btn bg-f6 shadow-blur round" @tap="replay">发布</button>
						</view>
					</view> -->
					<view style="height:200rpx;" class="bg-white" v-if="commonInfo.length > 0"></view>
				</view>
			</view>
			<view class="cu-bar foot search bg-white" style="border-top: 1px solid #EEEEEE;" v-if="type != 20190118">
				<view class="search-form round bg-white padding-left" style="border-top: 1px solid #EEEEEE;">
					<input type="text" placeholder="发布评论" confirm-type="search" @comfirm="replay" :focus="isfocus"
						@blur="txtBlur" v-model="commentVal"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-blue shadow-blur round text-theme" @tap="replay">发布</button>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="box_h5 bg-theme text-white f28" @tap='goDownLoad'>
				去下载APP
			</view>
			<!-- #endif -->
			<uni-popup type="bottom" ref="shareType">
				<view class="bg-white ptb20" style="border-radius: 20upx 20upx 0 0;">
					<view class="text-bold text-md text-center mb30 posRelt">
						分享
						<view class="icon_x" @tap="close">X</view>
					</view>
					<view class="flex justify-around align-center">
						<view class="pictype" @tap="wefriend">
							<image :src="IMG_URL + 'static/miniwechat/weixin.png'" mode="aspectFill"></image>
							<view class="text-df">微信好友</view>
						</view>
						<view class="pictype" @tap="wecircle">
							<image :src="IMG_URL + 'static/miniwechat/pengyouquan.png'" mode="aspectFill"></image>
							<view class="text-df">朋友圈</view>
						</view>
					</view>
				</view>
			</uni-popup>
			<!-- 评论弹窗 -->
			<lsComment :article_id='id' :modalName="modalName" @modelName='modelName' ref='lscomment'
				v-if="modalName=='bottomModal'"></lsComment>
		</view>
</template>

<script>
	import jyfParser from '@/components/jyf-parser/jyf-parser';
	import lsComment from './component/ls-comment.vue'
	export default {
		components: {
			jyfParser,
			lsComment
		},
		data() {
			return {
				plant_detail: {}, //便民信息
				id: 17,
				StatusBar: this.StatusBar,
				IMG_URL:this.IMG_URL,
				isfocus: false, // 获取焦点
				commentVal: "", // 评论内容
				total: '0', //评论总数
				type: '', //页面类型 1 本地信息圈
				commonInfo: '', //评论信息
				modalName: null, //评论弹框
				comment_id: '', //评论id
				commentUserId: '', //评论人的id
				pid: '', //上级评论的aid
				// lon: '',
				// lat: '',
				category_id: 0
			};
		},
		onLoad(e) {
			console.error(e);
			uni.showLoading({});
			this.id = e.id;
			this.type = e.type;
			this.category_id = e.category_id;
			// let lon = Number(e.lon);
			// let lat = Number(e.lat);
			this.get_detail();
			this.get_shareUrl()
		},
		onShow() {
			this.$refs.shareType && this.$refs.shareType.close();
		},
		onUnload() {
			this.$refs.shareType.close();
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.plant_detail.title,
				path: 'pagesHome/index/convenience_detail?id=' + this.id+'&type='+this.type,
			}
		},
		// 转发至朋友圈
		onShareTimeline() {
			let imageUrl = '/static/images/logo.png';
			return {
				title: this.plant_detail.title,
				imageUrl,	
				query: 'id='+this.id+'&type='+this.type
			};
		},
		methods: {
			get_detail() {
				this.$Request.post(this.$api.operation.get_art_detail, {
					id: this.id
				}).then(res => {
					uni.hideLoading();
					if (res.code == 1) {
						this.plant_detail = res.data;
						this.commonInfo = res.data.comment
						if (res.data.driver_name == 0 || res.data.driver_name == null) {
							this.plant_detail.driver_name = '';
						}
						if (res.data.finance_manager_name == 0 || res.data.finance_manager_name == null) {
							this.plant_detail.finance_manager_name = '';
						}
						if (res.data.resident_manager_name == 0 || res.data.resident_manager_name == null) {
							this.plant_detail.resident_manager_name = '';
						}
						if (res.data.driver_phone == 0 || res.data.driver_name == null) {
							this.plant_detail.driver_phone = '';
						}
						if (res.data.finance_manager_phone == 0 || res.data.finance_manager_phone == null) {
							this.plant_detail.finance_manager_phone = '';
						}
						if (res.data.resident_manager_phone == 0 || res.data.resident_manager_phone == null) {
							this.plant_detail.resident_manager_phone = '';
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
			toPage() {
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: '../../pagescenter/zhaopinzhe/play_video?url=' + this.plant_detail.video_url
				});

			},
			// 回复一级评论
			replyItem(item) {
				this.isfocus = true
				console.log(	this.isfocus,'===2222222========');
				this.pid = item.aid
				this.commentUserId = item.user_id
			},
			// 回复二级评论
			replyItemSecond(item, itm) {
				this.isfocus =true
				console.log(	this.isfocus,'===========');
				this.pid = item.aid
				this.commentUserId = itm.user_id
			},
			// 失去焦点
			txtBlur(){
				this.isfocus = false
			},
			// 输入评论获取评论列表
			modelName() {
				this.modalName = null
				setTimeout(() => {
					this.status = 'more'
					this.page = 1
					this.get_detail();
				}, 300)
			},
			// 发布评论
			replay() {
				if (this.commentVal == '') {
					this.$Common.toast("请输入评论内容");
					return
				}
				uni.showLoading({
					mask: true
				});
				this.$Request.post(this.$api.common.conver_comment, {
					"content": this.commentVal, //评论内容
					"article_id": this.id, //文章id
					pid: this.pid, //上级评论id
					touid: this.commentUserId, //评论人id
				}).then(res => {
					uni.hideLoading();
					if (res.code == 1) {
						this.$Common.toast("发布成功");
						this.commentVal = "";
						this.isfocus = false;
						this.get_detail();
						this.commentUserId = ''
						this.pid = ''
					} else {
						this.$Common.toast(res.msg);
					}
				}).catch(() => {
					uni.hideLoading();
				});
			},
			call(phone) {
				//拨打电话
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			// 查看全部评论
			lookAll() {
				this.modalName = 'bottomModal'
				setTimeout(() => {
					this.$refs.lscomment && this.$refs.lscomment.loadData()
				}, 400)
			},
			back() {
				uni.navigateBack();
			},
			//详细地址放大地图 导航
			choose_location() {
				let that = this;
				uni.openLocation({
					latitude: Number(that.plant_detail.lat),
					longitude: Number(that.plant_detail.lon),
					name: that.plant_detail.city_name,
					// address: that.plant_detail.address,
					success: function(res) {
						// console.log('地图', res);
					},
					fail(res) {
						this.$Common.toast('网络错误，请稍后重试');
					}
				});
			},
			share() {
				//分享
				// #ifdef MP-WEIXIN
				uni.showModal({
					title: '请使用右上角按钮进行分享',
					icon: 'none'
				})
				// #endif
				// #ifndef MP-WEIXIN
				this.$refs.shareType.open();
				// #endif
			},
			close() {
				this.$refs.shareType.close();
			},
			goDownLoad() { //跳转下载页
				// var tempwindow = window.open('_blank');
				window.location.href = this.inviteinfo.invite_url;
			},
			get_shareUrl() {
				//获取分享链接
				this.$Request.post(this.$api.user.get_invite).then(res => {
					if (res.code == 1) {
						this.inviteinfo = res.data;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
			wefriend() {
				//分享微信好友					path: `pagesHome/index/plant_detail?id=${this.aid}`,
				// let imgOne=this.plant_detail.ads_imgas[0].url
				// console.log(this.plant_detail.imgas_thumb,'-------');
				uni.share({
					provider: 'weixin',
					scene: 'WXSceneSession',
					type: 5,
					imageUrl: this.plant_detail.imgas_thumb + '?x-oss-process=style/compression' || this.IMG_URL +
						'static/miniwechat/logo.png', //不能改成接口返回的
					title: this.plant_detail.title,
					miniProgram: {
						id: 'gh_66b0749ac265',
						path: 'pagesHome/index/convenience_detail?conven=1&id=' + this.id+'&type='+this.type,
						type: 0,
						webUrl: 'http://uniapp.dcloud.io'
					},
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						this.$Common.toast('网络错误，请稍后再试')
					}
				});
			},
			wecircle() {
				//分享微信朋友圈
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: 'https://app.chongdarenli.com/h5/#/pagesHome/index/convenience_detail?conven=1&id=' +
						this.id+'&type='+this.type,
					title: this.plant_detail.title,
					summary: "我正在使用人民保障网，赶紧跟我一起来体验吧！",
					imageUrl: this.plant_detail.imgas_thumb + '?x-oss-process=style/compression' || this.IMG_URL +
						'static/miniwechat/logo.png',
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						this.$Common.toast('网络错误，请稍后再试')
					}
				});
			},
			// copy(body) {
			// 	//复制文字到剪切板
			// 	// console.log(111111111111111);
			// 	uni.setClipboardData({
			// 		data: body,
			// 		success: function() {
			// 			this.$Common.toast('复制成功');
			// 		}
			// 	});
			// },
			yulan(item, index) {
				this.$Common.lookImg(this.plant_detail.img_url, index)
			}
		},
		// 手机号加密处理
		filters: {
			filterMobile(val) {
				if (!val) return '';
				return val.substr(0, 3) + '****' + val.substr(-4);
			}
		},
	};
</script>

<style lang="scss">
	page,
	body {
		background: #fff !important;
	}

	.title {
		font-size: 32upx;
		font-weight: bold;
		line-height: 1.2;
		letter-spacing: 1;
		margin-bottom: 10upx;
		overflow: hidden;
		text-overflow: ellipsis;
		line-clamp: 2;
	}

	.share {
		width: 38upx;
		height: 38upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.box_h5 {
		position: fixed;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 12%;
		width: 200upx;
		height: 70upx;
		line-height: 70upx;
		border-radius: 60upx;
		text-align: center;
	}

	.replyTxt {
		background-color: rgba($color: #50AEFF, $alpha: .1);
		color: rgba($color: #50AEFF, $alpha: .9);
		padding: 6upx 12upx;
		border-radius: 30upx;
	}

	.topBar {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;

	}

	.icon_x {
		position: absolute;
		right: 40upx;
		top: 2upx;
	}

	.pictype {
		image {
			width: 88upx;
			height: 88upx;
		}
	}

	.video_image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 10;
	}

	.play_tag {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 80upx;
		height: 80upx;
		right: 0;
		margin: auto;
		z-index: 100;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
