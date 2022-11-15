<template>
	<!-- 公司详情 -->
	<view class="" style="padding-top:50rpx;">
		<!-- <view> 状态栏下的文字 </view> -->
		<cu-custom bgColor="text-black bg-white" :isBack="true">
			<block slot="content"></block>
			<block slot="right">
				<view class="flex justify-between align-center padding">
					<image class="heart" @tap="getCol" :src="heart ? IMG_URL + 'static/miniwechat/heart_red.png' : IMG_URL + 'static/miniwechat/heart.png'" mode=""></image>
					<!-- <image class="heart" @tap="getCol" :src="" mode="" v-else></image> -->
					<!-- #ifndef MP-WEIXIN -->
					<image class="share" :src="IMG_URL + 'static/miniwechat/share.png'" mode="" @tap="share"></image>
					<!-- #endif -->
				</view>
			</block>
		</cu-custom>

		<!-- 头部 -->
		<view class="">
			<view class="padding">
				<view class="flex justify-between">
					<view class="flex align-center">
						<text class=" text-xxl">{{ data.vocation_type||'暂无' }}</text>
					</view>
					<view class="text-bold" style="color: #FA6B5A;" v-if="data.salary == '10000以上' ||data.salary == '2000以下'">{{ data.salary }}/月</view>
					<view class="text-bold" style="color: #FA6B5A;" v-else>{{ data.salary }} 元/月</view>
				</view>
				<view class="flex align-center margin-top">
					<view class="flex year align-center justify-center">
						<image :src="IMG_URL + 'static/miniwechat/03.png'" mode=""></image>
						<text class="text-sm margin-left-xs" v-if=" data.age">{{ data.age }}岁</text>
						<text class="text-sm margin-left-xs" v-else>未设置</text>
					</view>
					<view class="flex year align-center">
						<image :src="IMG_URL + 'static/miniwechat/02.png'" mode=""></image>
						<text class="text-sm margin-left-xs" v-if=" data.education">{{ data.education||'未设置' }}</text>
					</view>
					<view class="flex year align-center">
						<image :src="IMG_URL + 'static/miniwechat/01.png'" mode=""></image>
						<text class="text-sm margin-left-xs" v-if=" data.experience">{{ data.experience||'未设置' }}</text>
					</view>
				</view>
			</view>
			<view class="padding" style="border-bottom: 20rpx solid #F9F9F9;">
				<text class="tag1" v-for="(items, inx) in data.welfare" :key="inx">{{ items }}</text>
				<!-- <text class="tag1" > AJG</text> -->
			</view>
		</view>

		<!-- 工作地址 -->
		<view class="padding" style="border-bottom: 20rpx solid #F9F9F9;">
			<text class="text-xl">工作地址</text>
			<view class="page-body margin-top-sm">
				<view class="page-section page-section-gap">
					<map style="width: 100%; height: 350rpx;" v-if="latitude" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
				</view>
			</view>
		</view>
		<!-- 公司信息 -->
		<view class="padding" style="margin: 40upx auto;" @tap="gomsg(data.cid)">
			<view class="text-xl margin-bottom">公司信息</view>
			<view class="flex justify-between align-center">
				<view class="">
					<view class="text-md margin-bottom-sm">{{ data.company_name||'暂无' }}</view>
				</view>
				<view class="cuIcon-right"></view>
			</view>
		</view>
		<!-- 职位详情	 -->

		<view class="padding " style="margin-bottom: 180upx;">
			<view class="text-xl margin-bottom">职位详情</view>
			<!-- <rich-text v-if="data.content" :nodes="data.content"></rich-text> -->
			<view class="">
				<view class="text-df margin-bottom-xs">
					<text class="" style="line-height: 44upx;">{{ data.describe }}</text>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btn flex">
			<view class="jianli" @tap="toudi()">投简历</view>
			<view class="goutong text-white" @tap="gomianshi">立即沟通</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			aid: '',
			data: [],
			title: 'map',
			latitude: null,
			longitude: null,
			heart: false, //是否收藏
			IMG_URL:this.IMG_URL,
			covers: [
				{
					latitude: null,
					longitude: null,
					iconPath: this.IMG_URL + 'static/miniwechat/01.png'
				}
			],
			is_collection: null,
			vocation_type: '',//职位
			inviteinfo: [], //获取分享链接信息
			user_id: null,
			id: null,
			position: '' //职位详情
		};
	},
	onLoad(e) {
		this.aid = e.aid;
		this.getMsg();
		this.getInfo();
	},
	methods: {
		// 跳转公司信息
		gomsg(cid) {
			uni.navigateTo({
				url: 'company_msg?aid=' + cid
			});
		},
		// 点击立即沟通
		gomianshi() {
			uni.navigateTo({
				url: '../pagesmessage/userMsg?kfid='+this.data.user_id+'&type=user'+'&userName='+this.data.company_name+'&job_position_id='+this.aid,
				animationDuration: 300
			});

			let data = {
				avatar: this.data.head_img,
				nickName: this.data.full_name,
				name: this.data.jj_name,
				username: this.data.jj_name,
				extras: {
					delivery_user_id: this.user_id, //投递发布简历者会员id
					station_id: this.id //投递岗位id
				}
			};
			uni.setStorage({
				key: 'jiguang_chater_info',
				data: data
			});
			// uni.navigateTo({
			// 	url:'/pages/char/char',
			// 	animationDuration:300
			// })
		},
		// 获取详情信息
		getMsg() {
			
			this.$Request
				.post(this.$api.company.positionInfo, {
					aid: this.aid
				})
				.then(res => {
					if (res.code == 1) {
						this.data = res.data;
						this.latitude = res.data.lat;
						this.longitude = res.data.lon;
						this.covers.latitude = res.data.lat;
						this.covers.longitude = res.data.lon;
						this.user_id = res.data.user_id;
						this.id = res.data.aid;
						if (res.data.is_collect == 1) {
							this.heart = true;
						}
					} else {
						this.$Common.toast(res.msg);
					}
				})
				.catch(err => {
					this.$Common.toast('网络错误，请稍后重试');
				});
		},

		//添加/取消收藏  1:收藏应聘者 2:收藏招聘者 3:收藏店铺
		getCol() {
			this.heart = !this.heart;
			this.$Request
				.post(this.$api.company.set_collection, {
					collect_id: this.user_id,
					type: 1,
					vocation_type: this.aid
				})
				.then(res => {
					if (res.code == 1) {
						this.is_collection = res.data.is_collection;
						uni.$emit('collt',{msg:'collt'})
					} else {
						this.$Common.toast(res.msg);
					}
				});
		},
		getInfo() {
			//获取分享链接
			this.$Request.post(this.$api.user.get_my_code).then(res => {
				if (res.code == 1) {
					this.inviteinfo = res.data;
				}
			});
		},

		share() {
			//分享
			uni.share({
			    provider: "weixin",
			    scene: "WXSceneSession",
			   type: 5,
			  title: '欢迎体验保障网',
			  imageUrl: "",
			  miniProgram: {
			      id: 'gh_66b0749ac265',
			      path: `pagesHome/index/plant_detail?id=${this.aid}`,
			      type: 1,
			  },
			    success: function (res) {
			        console.log("success:" + JSON.stringify(res));
			    },
			    fail: function (err) {
			        console.log("fail:" + JSON.stringify(err));
			    }
			});
		},

		// 投递简历
		toudi() {
			this.$Request
				.post(this.$api.company.Delivery, {
					delivery_user_id: this.user_id,
					station_id: this.aid
				})
				.then(res => {
					if (res.code == 1) {
						this.$Common.toast('投递成功');
					} else {
						this.$Common.toast(res.msg);
					}
				});
		}
	}
};
</script>

<style lang="scss">
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}

page {
	background-color: #fff;
}

.active {
	color: red;
}
.heart {
	width: 44upx;
	height: 38upx;
	margin-right: 15upx;
}
.share {
	width: 38upx;
	height: 38upx;
}
.tag {
	padding: 2rpx 8rpx;
	background-color: #ffe6e4;
	font-size: 24rpx;
	border-radius: 4rpx;
	margin-right: 10rpx;
	color: #fa6b5a;
}

.tag1 {
	padding: 4rpx 12rpx;
	border: 1rpx solid #74b0ff;
	font-size: 24rpx;
	border-radius: 4rpx;
	margin-right: 10rpx;
	// background-color: #FFE7E2;
	color: #2a89ff;
}

.year {
	image {
		width: 28rpx;
		height: 26rpx;
	}

	margin-right: 40rpx;
}

.tag2 {
	.txt {
		padding: 5rpx 10rpx;
		background: linear-gradient(136deg, rgba(252, 227, 143, 1) 0%, rgba(242, 164, 87, 1) 100%);
		border-radius: 6rpx;
	}
}

.btn {
	position: fixed;
	bottom: 0;
	left: 0;
	height: 100rpx;
	width: 100%;
	box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.08);

	.jianli {
		width: 50%;
		height: 100%;
		text-align: center;
		line-height: 100rpx;
		background-color: #fff;
	}

	.goutong {
		width: 50%;
		height: 100%;
		line-height: 100rpx;
		text-align: center;
		background: #2a89ff;
	}
}
</style>
