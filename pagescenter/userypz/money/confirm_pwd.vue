<template>
	<!-- =========================设置支付密码=================== -->
	<view class="content">
		<view class="login">
			<view class="l_top" style="margin-bottom:10upx;">
				<view class="l_text fangshi">请再次输入支付密码</view>
			</view>
			<view class="">
				<view class="mima">
					<view class="item">
						<view v-if="len<=0" :class="{line:show}"></view>
						<view v-if="len>=1" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==1" :class="{line:show}"></view>
						<view v-if="len>=2" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==2" :class="{line:show}"></view>
						<view v-if="len>=3" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==3" :class="{line:show}"></view>
						<view v-if="len>=4" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==4" :class="{line:show}"></view>
						<view v-if="len>=5" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==5" :class="{line:show}"></view>
						<view v-if="len>=6" class="dot"></view>

					</view>
					<view v-if="len>5" class="dot">{{numlength}}</view>
					<input class="trade_pwd" disabled="disabled" maxlength="6" id="targetInput" @focus="focus1" @blur="blur1" type="number"
					 v-model="trade_pwd" />
				</view>
			</view>
			<!-- <view class="mt30 padding text-center">
				<view class="" @tap='fogetpass'>忘记密码？</view>
			</view> -->
		</view>

		<view class="keypan">
			<view class="titles">
				<span @click="back()">取消</span>
				<span @click='setpwd'>确认</span>
			</view>
			<view class="keyNumbers">
				<view class="pan_num_key" :class="[items.checked?'pan_num_checked':'pan_num_key', (items.id==10 || items.id == 12)?'gray':'' ]"
				 v-for="(items,index) in boardlists" :key="index" @click="writepwd(items.id)">
					<text v-if="items.con == 'del' " class="iconfont" style="font-size: 50rpx;"> x </text>
					<text v-else>{{items.con}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex';


	export default {

		computed: {
			...mapGetters(['statusBarHeight'])
		},
		data() {
			return {
				trade_pwd: '',//确认的密码
				focus: true,
				show: false,
				numarr: [],
				d_time: 10,
				nextsteep: false,
				money:'',//提现金额
				type:'',//提现类型
				tel: 0,
				numlength: "",
				gopen: false,
				isactive: true,
				resgetcode: false,
				isopen:true,
				firstPass:'',//第一次设置的密码
				boardlists: [{
						id: 1,
						con: 1,
						checked: false
					}, {
						id: 2,
						con: 2,
						checked: false
					}, {
						id: 3,
						con: 3,
						checked: false
					}, {
						id: 4,
						con: 4,
						checked: false
					}, {
						id: 5,
						con: 5,
						checked: false
					}, {
						id: 6,
						con: 6,
						checked: false
					}, {
						id: 7,
						con: 7,
						checked: false
					}, {
						id: 8,
						con: 8,
						checked: false
					}, {
						id: 9,
						con: 9,
						checked: false
					}, {
						id: 10,
						con: "",
						checked: false
					}, {
						id: 11,
						con: 0,
						checked: false
					},
					{
						id: 12,
						con: "del",
						checked: false
					},

				]
			};
		},
		computed: {
			len: function() {
				if (this.trade_pwd.length == 6) {
					// 第一次进来可以点击的

				}
				return this.trade_pwd.length
			}
		},
		onLoad(e) {
			// 获取uid
			this.userinfo = uni.getStorageSync("USERINFO");
			this.firstPass=e.pass
			this.money = uni.getStorageSync('withdraw_money').money
			this.type = uni.getStorageSync('withdraw_money').type
		},
		methods: {
			writepwd(num) {
				if (num == 12) {
					this.close();
					return;
				}
				if (num == 10) {
					return;
				}
				if (num == 11) {
					num = 0;
					this.boardlists[10].checked = true;
				} else {
					this.boardlists[num - 1].checked = true;
				}
				this.numarr.push(num);
				if (this.numarr.length > 6) {
					return
				}
				var that = this;
				setTimeout(function() {
					for (var i = 0; i < that.boardlists.length; i++) {
						that.boardlists[i].checked = false;
					}
				}, 200)
				this.trade_pwd = this.numarr.join("");
				console.log(this.numarr, this.trade_pwd, '摁下');
				// if( this.numarr.length == 6 ){
				// 	this.$Common.toast('您输入的密码：'+ this.trade_pwd );
				// }
			},
			next() { //下一步
				uni.navigateTo({
					url: 'pay_success'
				})
			},
			//密码框
			back() {
				uni.navigateBack();
			},
			//回退方法
			close() {
				this.numarr.pop();
				if (this.trade_pwd.length > 0) {
					this.trade_pwd = this.trade_pwd.substring(0, this.trade_pwd.length - 1);
				}
				// console.log(this.numarr, this.trade_pwd, '删除');
			},
			blur1() {
				this.show = false
			},
			focus1() {
				this.show = true
			},
			// 确认执行的方法
			// setpwd() {
			// 	if (this.trade_pwd.length < 6) {
			// 		console.log('密码长度不能少于6位');
			// 		return;
			// 	}
			// 	// 密码长度为6位以后执行方法
			// 	console.log(this.trade_pwd);
			// },
			// 设置支付密码
			setpwd() {
				if (this.trade_pwd.length < 6) {
					uni.showToast({
						title: '密码长度不能少于6位',
						icon: "none"
					});
					return;
				}
				
				if (this.trade_pwd!=this.firstPass) {
					uni.showToast({
						title: '两次密码不一致',
						icon: "none"
					});
					return;
				}
				if(this.isopen==false){
					return
				}
				this.isopen=false
				setTimeout(()=>{
					this.isopen=true
				},3000)
				// 1、设置支付密码 
				this.$Request.post(this.$api.money.setpay_password, {
					pay_pwd: this.trade_pwd,
				}).then(res => {
					if (res.code == 1) {
						//2、提现
						this.$Request.post(this.$api.money.withdraw, {
							money: this.money,
							type: this.type,
							pay_password: this.trade_pwd
						}).then(res => {
							uni.hideLoading();
							uni.showToast({
								title: res.msg,
								icon: "none"
							});
							if (res.code == 1) {
								uni.$emit('withdraw',{})//通知提现成功
								setTimeout(() => {
									uni.redirectTo({
										url: 'pay_success?money='+this.money
									})
								}, 200)
							} else {
								this.numarr = [];
								this.trade_pwd = "";
							}
						})
					} else {
						this.$Common.toast(res.msg)
					}
				});

			},
		}

	};
</script>
<style lang="scss">
	// *{ background: #fff; }
	page {
		height: 100%;
		background: #fff;
	}

	.btn_wc {
		width: 338upx;
		height: 68upx;
		background: #ff3134;
		border-radius: 34upx;
		text-align: center;
		line-height: 68upx;
		color: #ffffff;
		margin: auto;
	}

	.content {
		width: 100%;
		height: 100%;
		font-size: 28upx;
		background: #fff;
		color: #555;
		height: 100%;
		font-weight: 400;

		.keypan {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;

			.titles {
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: space-between;
				line-height: 80upx;
				padding: 0 5%;
				font-size: 32upx;
				background: #fff;
				color: #292824;

				span {
					width: 100upx;
					height: 70upx;
					display: inline-block;
					padding-left: 30upx;
				}

			}

			.keyNumbers {
				display: flex;
				flex-wrap: wrap;
			}

			.pan_num_key {
				width: 33.33%;
				height: 110upx;
				line-height: 110upx;
				text-align: center;
				background: #fff;
				font-size: 48upx;
				border: 1rpx solid #F7F7F7;

				&.gray {
					background: #ECECEC;
				}

				&:active {
					background: #EEEEEE;
					transform: all .5s;
				}
			}

			.pan_num_checked {
				// animation: checked_bg 0.5s ease;

			}
		}

		.navigation_bar {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-top: 60upx;

			.back-icon {
				width: 18upx;
				height: 34upx;
			}
		}

		.login {
			width: 100%;
			// height: 300upx;
			height: 100%;
			background: #fff;

			.l_top {
				width: 100%;
				// height: 200upx;
				margin: 150upx auto 0;
				position: relative;
				background: #fff;

				.l_text {
					width: 445upx;
					height: 69upx;
					font-size: 56upx;
					font-weight: bold;
					text-align: center;
					margin: auto;

				}

				.fangshi {
					font-size: 30rpx;
					color: #666666;
					margin-top: 20rpx;
				}

				.lt {
					margin-top: -20upx;
					font-size: 25upx;
					color: #555
				}
			}
		}

		.title {
			color: #616161;
			text-align: center;
			font-size: 30upx;
			margin-bottom: 34upx;
		}

		.mima {
			flex-direction: row;
			width: 750upx;
			height: 96upx;
			margin: 60upx auto 0;
			display: flex;
			justify-content: center;
			position: relative;

			.item {
				width: 79upx;
				height: 79upx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				// border: 1upx solid #E5E5E5;
				margin-right: 20upx;
				background-color: #F2F2F2;

				.line {
					width: 2upx;
					height: 40upx;
					background: #979797;
					animation: shan 1s ease infinite;
				}

				.dot {
					width: 20upx;
					height: 20upx;
					border-radius: 20upx;
					background: black;
				}

				&:nth-child(-n+5) {
					border-right: none;
				}
			}

			.trade_pwd {
				position: absolute;
				height: 78upx !important;
				width: 480upx;
				opacity: 0;
			}
		}
	}

	@keyframes shan {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	@keyframes checked_bg {
		0% {
			background: #fff
		}

		50% {
			background: #D3D1E2
		}

		100% {
			background: #fff
		}
	}
</style>
