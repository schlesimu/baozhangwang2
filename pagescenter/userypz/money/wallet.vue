<template>
	<view>
		<view class="nav">
			<cu-custom bgColor="text-white" :isFixed="false" :isBack="true">
				<block slot="content">钱包</block>
				<block slot="right">
					<view class="f24 pr10" @tap='toPage("./bind_account")'>绑定账号</view>
				</block>
			</cu-custom>
			<!-- 余额 -->
			<view class="flex alcenter justify-around rest">
				<view class="white flex column alcenter justify-center">
					<view class="">
						<text class="f64">{{ wallet_info.user_money || '0.00'}}元</text>
					</view>
					<view class="text-df">我的余额</view>
				</view>
				<view class="white flex column alcenter justify-center">
					<view class="">
						<text class="f64">{{ wallet_info.total_revenue_money || '0.00'}}元</text>
					</view>
					<view class="text-df">我的兼职收入</view>
				</view>
			</view>
			<view class="btn_t flex align-center justify-center" @tap='toPage("./withdraw?money="+wallet_info.user_money)'>
				提现
			</view>
		</view>
		<!-- 充值提现按钮 -->
		<!-- <view class="flex alcenter justify-center" v-if="showOauth">
			<view class="handle flex around">
				<view class="flex alcenter" @tap="navTo('/pages/wallet/Recharge')">
					<image src="../../static/images/wallet/recharge.png" mode="" class="icon_recharge mr10"></image>
					<text class="text-lg gray3">充值</text>
				</view>
				<view class="flex alcenter" @tap="navTo('/pages/wallet/withdraw')">
					<image src="../../static/images/wallet/recharge.png" mode="" class="icon_recharge mr10"></image>
					<text class="text-lg gray3">提现</text>
				</view>
			</view>
		</view> -->

		<!-- 操作列表 -->
		<view class="">
			<mescroll-uni ref="mescrollRef" :top=" 552 + CustomBar * 2" @init="mescrollInit" @down="downCallback" @up="upCallback"
			 :down="downOption" :up="upOption" :fixed="true">
			 <view class="plr15 bg-white" >
			 	<view class=" flex align-center justify-between ptb10 brb_e" v-for="(item,index) in detail_list" :key='index'>
			 		<view class=" flex column">
			 			<text class="mb5 f32 bold text_line2">{{item.remark}}</text>
			 			<text class="f28 text-gray">{{item.create_time}}</text>
			 		</view>
					<view class="flex_shrink text_1b9">{{item.change_money}}</view>
			 	</view>
			 </view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				showOauth: false,
				CustomBar: this.CustomBar,
				wallet_info: '',
				bargin: 0,
				detail_list:[],
				upOption: {
					isBounce: false,
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无提现明细',
					}
				},
			};
		},
		onLoad() {
			const userInfo = uni.getStorageSync('USERINFO');
			if (userInfo) {
				this.get_wallet_info();
			};
			uni.$on('withdraw',()=>{
				this.get_wallet_info();
				this.mescroll && this.mescroll.resetUpScroll();
			})
			uni.$on('updateMoney',()=>{
				// 提现之后刷新页面
				this.get_wallet_info();
				this.mescroll && this.mescroll.resetUpScroll();
			})
			
		},
		onUnload() {
			uni.$off('withdraw')
			uni.$off('updateMoney')
		},
		methods: {
			// 获取站内信数量
			get_msg_num() {
				this.$Request.get(this.$api.user.get_msg_num, {}).then(res => {
					if (res.code == 1) {
						this.msg_num = res.data
					} else {

					}
				});
			},
			// 获取金额信息
			get_wallet_info() {
				this.$Request
					.get(this.$api.money.get_my_money)
					.then(res => {
						if (res.code == 1) {
							this.wallet_info = res.data;
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					});
			},
			// 获取余额明细
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				let that = this;
				this.$Request
					.post(this.$api.money.get_money_detail,{page:pageNum})
					.then(res => {
						if (res.code == 1) {
							let curPageLen = res.data.total;
							let curData = res.data.data;
							if (page.num == 1) this.detail_list = []; //如果是第一页需手动置空列表
							this.detail_list = this.detail_list.concat(curData); //追加新数据
							//每页数据条数  后台接口有总数据量
							that.mescroll.endBySize(curPageLen, res.data.total);
							
						}
					})
					.catch(err => {
						console.log('err: ' + JSON.stringify(err));
					});
			},
			toPage(page) {
				uni.navigateTo({
					url: page
				});
			}
		}
	};
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.nav {
		height: 552rpx;
		background: url('https://app.chongdarenli.com/static/miniwechat/new/wallet_bg.png') no-repeat;
		background-size: 100% 100%;
	}

	.handle {
		width: 686rpx;
		height: 140rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 24px rgba(153, 153, 153, 0.16);
		position: relative;
		top: -60rpx;
	}

	.icon_recharge {
		width: 40rpx;
		height: 40rpx;
	}

	.rest {
		height: 40%;
	}

	.btn_t {
		width: 240upx;
		line-height: 72upx;
		text-align: center;
		height: 72upx;
		background: #ECF6FF;
		border: 1px solid #1B90FF;
		border-radius: 4upx;
		margin: auto;
		color: #1B90FF;
	}
</style>
