<!-- 招聘者 个人空间 -->
<template>
	<view class="">
		<!-- <cu-custom bgColor="text-black bg-white" :isBack="true">
			<block slot="content">
				<text class="text-md">{{ title == 'fabu' ? '' : '支付订单' }}</text>
			</block>
			<block slot="right"><view class="text-sm"></view></block>
		</cu-custom> -->
		<view class="contant ">
			<image :src="IMG_URL + 'static/miniwechat/new/big_bg.png'" mode="aspectFill"></image>
			<view class="success_txt">
				报名成功
			</view>
			<view class="img_b">
				<image :src="IMG_URL + 'static/miniwechat/new/bom_bg.png'" mode="aspectFill"></image>
				<view class="tex1 flex align-center justify-center column" @tap='help'>
					<text>助力</text>
					<text>加薪</text>
				</view>
				<view class="tex2" @tap='giveUp'>放弃助力</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '' ,//标题
				delivery_id:'',//报名id
				IMG_URL:this.IMG_URL,
			};
		},
		onLoad(e) {
			this.title = e.type;
			this.delivery_id=e.delivery_id
			this.company_id=e.company_id
			this.job_id=e.job_id
		},

		methods: {
			returnIndex() {
				uni.reLaunch({
					url: '../pages/index/index'
				})
			},
			help() { //助力				
				this.$Request.post(this.$api.help_red.help_getHb, {
					delivery_id: this.delivery_id, //报名主键id
					job_position_id: this.job_id,
					company_id: this.company_id
				}).then(res => {
					if (res.code == 1) {
						//delivery_id 报名id
						uni.redirectTo({
							url:'../pagescenter/userypz/share_help_list?red_envelope_aid='+res.data.delivery_id+'&job_title='+res.data.name+'&salary_money='+res.data.salary_money+'&jobImage='+res.data.image
						})
					} else {						
					this.$Common.toast(res.msg)
					}
				});

			},
			giveUp() { //放弃
				uni.navigateBack({
					delta: 1
				})
			}

		}
	};
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.contant {
		width: 100%;
		height: 100vh;
		position: relative;

		image:nth-child(1) {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
		}

		.success_txt {
			width: 100%;
			text-align: center;
			position: absolute;
			top: 35%;
			left: 0;
			right: 0;
			color: #FAE1B6;
			font-size: 46upx;
			margin: auto;
		}

		.img_b {
			width: 100%;
			height: 499upx;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 100;

			image {
				width: 100%;
				height: 100%;

			}

			view {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				text-align: center;
				z-index: 9999;
				color: #FAE1B6;
			}

			.tex1 {
				top: 30%;
				color: #303030;
				font-size: 53upx;
			}

			.tex2 {
				bottom: 10%;
				font-size: 38upx;
			}
		}
	}
</style>
