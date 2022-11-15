<template>
	<view class="">
		<view class="cu-custom" :style="[{height: CustomBar+'px'}]">
			<view class="cu-bar fixed " :style="{height: CustomBar+'px',paddingTop: StatusBar+'px'}">
				<view class="action" @tap="isback">
					<text class="cuIcon-back "></text>
				</view>
				<view class="content f32" :style="{top:StatusBar + 'px'}">我要招人</view>
			</view>
		</view>

		<view class="padding">
			<view class="contant">
				<view class="margin-bottom-xs text-center" style="padding: 70upx 0;" @tap="gopage('../../pagesauthen/business?status='+status)"
				 v-if="businessHidden">
					<view class="bg_color">
						<image :src="IMG_URL + 'static/miniwechat/666666@2x.png'" mode="aspectFill"></image>
					</view>
					<view class="">企业招聘</view>
				</view>
				<view class="margin-bottom-xs text-center" style="padding: 70upx 0;overflow: hidden;" @tap="gopage('../../pagesauthen/company?status='+status)"
				 v-if="companyHidden">
					<view class="bg_color">
						<image :src="IMG_URL + 'static/miniwechat/3333@2x.png'" mode="aspectFill"></image>
					</view>
					<view class="">人力公司招聘</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				StatusBar: this.StatusBar,
				status: '', //认证状态 -1：未认证公司 0:审核中 1：已通过  2：已拒绝 3：未支付  4：注销中：您认证的公司已注销,  5：已注销,请重新认证
				propInfo: '', //提示信息
				type: '', //招聘类型
				isopen: true, //跳转页面
				IMG_URL:this.IMG_URL,
				businessHidden: false, //企业招聘显示隐藏
				companyHidden: false, //人力资源招聘显示隐藏
				is_pay: 0, //是否支付
				order_sn: '', //订单
				totalMoney: '', //已认证未支付的保证金
				voucher: '', //0：未关闭支付   1：关闭支付
				page: '', //页面类型   resiter  注册账号
			};
		},
		onLoad(e) {
			this.page = e.page
			uni.showLoading({})
			// if(!this.type){
			this.businessHidden = true;
			this.companyHidden = true;
			// }
			if (uni.getStorageSync('USERINFO').user_token) {
				this.getstatusInfo();
			}
			uni.$on('authen', data => {
				this.getstatusInfo();
			});
			uni.$on('updatePrice', data => {
				this.getPrice()
			})
			this.getPrice()
			this.get_plant_type()
		},
		onUnload() {
			uni.$off('authen');
			uni.$off('updatePrice');
		},
		methods: {
			get_plant_type() {
				this.$Request.get(this.$api.index.get_fuli_info).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			getstatusInfo() {
				//获取认证信息
				this.$Request.post(this.$api.user.user_certification_status).then(res => {
					uni.hideLoading()
					if (res.code == '1') {
						this.status = res.data.status;
						this.propInfo = res.msg;
						this.order_sn = res.data.order_sn;
						this.is_pay = res.data.is_company;
						if (res.data.type) {
							this.type = res.data.type;
							if (this.type == 1) {
								this.businessHidden = true;
								this.companyHidden = false;
							} else {
								this.companyHidden = true;
								this.businessHidden = false;
							}
						}
						if (this.status == 5) {
							this.companyHidden = true;
							this.businessHidden = true;
						}

					}
				});
			},
			isback() {
				if (this.page == 'resiter') {
					uni.reLaunch({
						url: '../../pages/index/index'
					})
				
				} else {
					uni.navigateBack()
				}
			},
			getPrice() { //获取保证金
				this.$Request.post(this.$api.company.getPrice).then(res => {
					if (res.code == '1') {
						if (res.data) {
							uni.hideLoading()
							if (this.type == 1) {
								this.totalMoney = res.data.enterprise_bond_money //企业招聘
							} else {
								this.totalMoney = res.data.manpower_company_bond_money //人力公司招聘
							}
						}
					}
				});
			},
			gopage(page) {
				if (this.status == -1 || this.status == 2 || this.status == 5) {
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
				} else if (this.status == 3) {
					this.getPrice()
					// console.log(this.type, this.totalMoney,'========type');
					setTimeout(() => {
						uni.navigateTo({
							url: '/pagescenter/zhaopinzhe/fabu?payType=认证&order_sn=' + this.order_sn + '&price=' + this.totalMoney
						})
					}, 400)

				} else if (this.status == 0) {
					this.$Common.toast('正在审核,请耐心等待');
				} else if (this.status == 4) {
					this.$Common.toast('公司注销中');
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	page {
		height: 100%;
		background-color: #ffffff;
	}

	.contant {
		width: 446upx;
		height: 100%;
		margin: 40upx auto;
		font-size: 32upx;
		font-weight: bold;

		.bg_color {
			width: 446upx;
			height: 260upx;
			background-color: #f7f7f7;
			margin-bottom: 50upx;
		}

		image {
			width: 100%;
			height: 260upx;
		}
	}
</style>
