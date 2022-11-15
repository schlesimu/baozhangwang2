<template>
	<!-- 服务经纪人列表 -->
	<view class="plr15 padding-bottom " style="height: 100%;">
		<view class="pb20" v-if="brokerList != ''">
			<view class="mb20 brb_e padding-bottom" v-for="(item, index) in brokerList" :key="index" @tap="navTo('/pagesHome/index/broker_detail?id=' + item.user_id+'&lon='+item.lon+'&lat='+item.lat,1)">
				<view class="flex ">
					<view class="bg-gray job_img mr10" style="flex-shrink: 0;">
						<image :src="item.head_img || '/static/images/logo.png'" mode="aspectFill" class="mr10"></image>
					</view>
					<view class="" style="width: 82%;">
						<view class="flex align-center justify-between pb10">
							<view class="overflow-one ewrap  f32 bold text-black">{{item.agent_name||''}}</view>
							<view class="align-center flex ">
								<text class="cuIcon-servicefill  mr10 " style="font-size: 21px;" @tap.stop="navTo('/pagesmessage/userMsg?kfid='+item.user_id+'&userName='+item.agent_name+'&friendId='+item.user_id,0)"></text>
								<image :src="IMG_URL + 'static/miniwechat/new/phone_icon.png'" mode="aspectFill" style=";width: 40upx;height: 40upx;"
								 @tap.stop='call(item)'></image>
								<!-- <text class="cuIcon-phone f40 txt-theme" ></text> -->
							</view>

						</view>
						<view class="flex align-center justify-between pb5 w100">
							<view class="text-cut ewrap  text-666 f28">{{item.province}}-{{item.city}}-{{item.district}}
							</view>
						</view>

						<view class=" flex  align-center justify-between">
							<view class="">
								<text class="mr5 ewrap text-cut f28">{{item.distance||0}}km</text>
							</view>
							<text class=" btn_btn" @click.stop="navTo('/pagesHome/index/signUp_morker?id='+item.user_id,0)" v-if="item.is_signup==0">报名</text>
							<text class=" btn_btn" v-if="item.is_signup==1">已报名</text>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" icon-type="iconType" :load-text="loadText" />
		</view>
		<u-empty text="暂无相关内容" mode="list" v-if="brokerList == ''"></u-empty>
	</view>
</template>
<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		name: 'convenience',
		props: {
			latitude: {
				type: [String, Number]
			},
			longitude: {
				type: [String, Number]
			},
		},
		data() {
			return {
				is_top: false,
				lat: '',
				lon: '',
				IMG_URL:this.IMG_URL,
				iconType: 'flower',
				page: 1,
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				last_page: '', //总页数
				brokerList: '', //经纪人列表
				voucher: '', //是否开启支付
			};
		},

		created() {
			this.get_list()
		},
		mounted() {
			uni.$on('updatesignUpList', data => {
				this.get_list()
			})
		},
		destroyed() {
			uni.$off('updatesignUpList')
		},
		methods: {
			navTo(page, e) {
				//跳转详情，判断是否登录
				if (e == 0) {
					if (!uni.getStorageSync('userToken')) {
						this.$Common.toast('登录后才能操作哦')
						return
					}
				}
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: page
				});
			},
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			call(item) {
				uni.makePhoneCall({
					phoneNumber: item.phone
				});
			},
			get_list() {
				let that = this;
				this.$Common.getLocation(e => {
					this.$Request
						.post(this.$api.job.serviceBrokerList, {
							tab: 2, //距离排序
							page: that.page,
							longitude: e.longitude || '',
							latitude: e.latitude || '',
							page: that.page,
							is_recommend:1,//推荐经纪人
							list_rows: 15,
							user_id: uni.getStorageSync('USERINFO').id || 0, //
						})
						.then(res => {
							uni.hideLoading();
							if (res.code == 1) {
								// uni.hideLoading()
								if (that.page == 1) that.brokerList = []
								res.data.data.map(item => {
									item.distance = parseFloat(item.distance).toFixed(2)
								})

								that.brokerList = that.brokerList.concat(res.data.data); //追加新数据
								that.last_page = res.data.last_page;
								that.status = res.data.last_page <= that.page ? 'nomore' : 'loading';
								setTimeout(() => {
									that.$emit('getData', 111);
								}, 100);
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								});
							}
						})
				});
			},
		}
	};
</script>
<style lang="scss">
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

	.picitem {
		width: 215upx;
		height: 152upx;
		border-radius: 20upx;
		overflow: hidden;
		margin-right: 20upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.btn_btn {
		width: 154upx;
		height: 64upx;
		background: #50aeff;
		border: 1px solid #50aeff;
		color: #ffffff;
		text-align: center;
		line-height: 64upx;
		font-size: 11px;
		border-radius: 45upx;
	}

	.picitem:nth-child(3) {
		margin-right: 0;
	}

	.job_img {
		width: 106rpx;
		height: 106rpx;
		border-radius: 8upx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
