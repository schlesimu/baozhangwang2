<template>
	<view class="brt_e">
		<!-- 公司信息 -->
		<view class="plr15">
			<view class="pt10 pb20">
				<block v-for="(item,index) in salaryList" :key='index'>
					<view class="shadow radius_16 mt10 padding" @tap='toDetail(item)'>
						<view class="flex align-center justify-between">
							<text class=" f28 text-666">入职公司：{{item.company_name||''}}</text>
							<text class=" f28 text-666">{{item.month||''}}月份</text>
						</view>
						<view class=" flex align-center justify-between pt10">
							<text class=" f32 bold ewrap overflow-one">{{item.name||''}}</text>
							<text class=" f28 text-666 ewrap overflow-one">{{item.gender||''}}</text>
							<text class=" f28 text-666 ewrap overflow-one">{{item.id_number||''}}</text>
						</view>
						<view class=" flex align-center  pt10">
							<text class=" f28  ewrap overflow-one">手机号：</text>
							<text class=" f28 text-666 ewrap overflow-one">{{item.moble||''}}</text>
						</view>
						<view class="ptb15 flex align-center bold">
							<text class=" f32 ">应发工资：{{item.wages_payable||''}}</text>
							<text class=" f32  plr10">实发工资：{{item.net_salary||''}}</text>
						</view>
						<view class="flex align-center justify-end" style="color:#1B90FF ;">
							<text class=" f28 ">查看详情</text>
							<text class=" f28 text-666 cuIcon-right pl5"></text>
						</view>
					</view>
				</block>
				<view class=" plr15 pt10 te-c" v-if="salaryList==''"> 暂无您的工资单 </view>
			</view>
		</view>
	</view>
	</view>
</template>
<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import albumCompontents from '@/pagesHome/conpoments/album_components.vue'
	import noticeCompontents from '@/pagesHome/conpoments/notice_components.vue'
	import jyfParser from "@/components/jyf-parser/jyf-parser.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			albumCompontents,
			noticeCompontents,
			jyfParser

		},
		data() {
			return {
				salaryList: [], //工资列表
				isopen: true, //跳转页面
				CustomBar: this.CustomBar, //兼容小程序
				plant_detail: '', //详情
				followStatus: false, //关注状态
				lisdata: [], // 列表数组
				virtrue: '', //搜索框内容
				lon: '', //公司地址经度
				lat: '', //公司地址纬度
				current: 0, //选择分类
				pageOpen: '', //是否从引导页跳过来的

				voucher: '', //是否开启支付
				mobile: '', //查询工资的手机号
				code: '', //查询工资的验证码
			};
		},
		onLoad(e) {
			let url = decodeURIComponent(e.q);
			if (url != 'undefined') {
				let index = url.lastIndexOf('/id/');
				let str = url.substring(index + 4, url.length);
				let strArr = str.split('_');
				this.aid = strArr[1];
			} else {
				this.aid = e.id;
			}
			this.pageOpen = e.page
			this.followStatus = e.follow || false //收藏状态			
			if (e.mobile) {
				uni.showLoading({})
				this.mobile = e.mobile
				this.code = e.code
				this.getSaraly()
			}
			this.get_plant_type()

		},

		onShow() {
			uni.$on('phoneCode', data => {
				uni.showLoading({})
				// 获取手机号验证码
				console.log(data, '----------');
				this.mobile = data.mobile
				this.code = data.code
				this.getSaraly()
			})
		},
		onUnload() {
			uni.$off('phoneCode')
			uni.removeStorageSync('job_detail');
		},
		methods: {
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			getSaraly() { //获取工资列表
				this.$Request
					.post(this.$api.company.salaryList, {
						keyword: this.virtrue || '',
						company_id: this.plant_detail.aid || 0,
						code: this.code, //验证码
						moble: this.mobile, //手机号
					})
					.then(res => {
						// console.log(res,'------------res');
						uni.hideLoading()
						if (res.code == 1) {
							this.salaryList = res.data.data
						} else {
						this.$Common.toast(res.msg)
						}
					}).catch((err) => {
						this.$Common.toast('网络错误，请稍后重试')
					})
			},
			back() {
				uni.navigateBack();
			},

			call(phone) {
				//拨打电话
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			copy(body) {
				//复制文字到剪切板
				uni.setClipboardData({
					data: body,
					success: function() {
						this.$Common.toast('复制成功');
					}
				});
			},
			toDetail(item) { //去工资详情
				uni.navigateTo({
					url: '../../pagesHome/index/salary_detail?aid=' + item.aid
				})
			},
		}
	};
</script>
<style lang="scss">
	page {
		background: #fff;
	}

	.banner {
		width: 686upx;
		height: 386upx;
		position: relative;
		margin: auto;
	}

	.banner_img {
		width: 100%;
		display: block;
		background-color: #F7F7F7;
		height: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.downImg {
		width: 30rpx;
		height: 24rpx;
	}

	.inputBox {
		width: 686rpx;
		height: 72rpx;
		border-radius: 34rpx;
		box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04);
		border: 1px solid #EEEEEE;
		margin: auto;
	}

	.shadow {
		box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04);
	}

	.video_image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 10;
	}

	.cuIcon-playfill {
		z-index: 100;
	}

	.bg_img {
		width: 106upx;
		height: 106upx;
		margin-right: 20upx;
		background-color: #eeeeee;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.returnBox {
		min-width: 97rpx;
		height: 87rpx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid #cccccc;
		opacity: 1;
		border-radius: 4rpx;
		box-sizing: border-box;

		.top_blue {
			height: 50%;
			background-color: #50aeff;
			margin-top: -3upx;
			color: #ffffff;
			width: 100%;
		}
	}

	.box_sort {
		width: 97upx;
		height: 90upx;
		border: 1px solid #cccccc;
		text-align: center;
		line-height: 45upx;

		view {
			font-size: 12px;
		}
	}

	.titItem:nth-child(4) {
		margin-right: 0;
	}

	.save {
		position: absolute;
		right: 0rpx;
		bottom: -24rpx;
		width: 170rpx;
		height: 50rpx;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 28rpx;
	}

	.shop_img {
		width: 106upx;
		height: 106upx;
		background-color: #f7f7f7;
		margin-right: 18upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.theme_tag {
		width: 120upx;
		height: 64upx;
		border: 1px solid #1b90ff;
		color: #1b90ff;
		border-radius: 32upx;
		font-size: 28upx;
	}

	button {
		border-radius: 0;
	}

	button:after {
		border: none;
	}
</style>
