<template>
	<!-- 简历附件 -->
	<view class="">
		<!-- 头部 -->
		<view class=" text-bold" style="font-size: 40upx;padding: 40upx 30upx;">
			上传简历照片
		</view>
		<view class="mb10 plr15" style="position: relative;" v-for='(item,index) in imgList' :key='index'>
			<image style="width: 100%;height: 403upx;" :src="item.path||'/static/images/logo.png'" mode="aspectFill" @tap.stop='yulan(item,index)'></image>
			<view class="cu-tag bg-red" @tap.stop="DelImg(item,index)" style="z-index: 100;"><text class="cuIcon-close"></text></view>
		</view>
		<view class="card_item" @tap='chooseImg()' v-if="imgList==''||imgList.length<9">
			<view class=" margin-tb-sm">
				<view class="">
					<image class="bg_img" :src="IMG_URL+'static/miniwechat/cardbg.png'" mode="aspectFill"></image>
				</view>
				<view class="btn_chuan ">
					<view class="btn_center flex align-center justify-center">
						<image :src="IMG_URL+'static/miniwechat/xiangji@2x.png'" mode="aspectFill"></image>
						<view class="" style="">上传简历照片</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btn_next bg_deep " style="margin-bottom: 20upx;" @tap="sub">确定</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				imgList: [], //简历照片
				maxNum: 9,
				imgList_path: [], //
				IMG_URL:this.IMG_URL,
			};
		},
		onLoad() {
			this.user = uni.getStorageSync('USERINFO');
			uni.showLoading({})
			this.getInfo()
			this.imgList_path = []
		},
		methods: {
			getInfo() {
				this.$Request.post(this.$api.company.upload_resume, {
					type: 0 //获取简历
				}).then(res => {
					if (res.code == '1') {
						uni.hideLoading()
						if (res.data == '') {
							this.imgList = []
							return
						}
						this.imgList = res.data.resume_id_url
						this.imgList.map(item => {
							this.imgList_path.push(item.path);
						});
						// this.imgList_id=res.data.resume_id
					}
				});
			},
			chooseImg() {
				this.$Request.uploadImg((res) => {
					this.$Common.toast(res.msg);
					if (res.code == 1) {
						let pic = []
						pic = res.data;
						this.imgList_path = []
						this.imgList = this.imgList.concat(pic)
						this.imgList.map(item => {
							this.imgList_path.push(item.path);
						});
						console.log(this.imgList, '图片');

					}
				}, this.maxNum)
			},
			yulan(pic, index) { //预览
				this.$Common.lookImg(this.imgList_path, index);
			},
			DelImg(item, index) {
				//删除视频
				uni.showModal({
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(index, 1);
						}
					}
				});

			},
			sub() { //提交
				if (this.imgList == '') {
					this.$Common.toast('请先上传简历照片');
					return false;
				}
				var skill_certificate = [];
				this.imgList &&
					this.imgList.map(item => {
						skill_certificate.push(item.id);
					});
				this.$Request.post(this.$api.company.upload_resume, {
					type: 1, //上传
					resume_id: skill_certificate,
				}).then(res => {
					this.$Common.toast(res.msg)
					if (res.code == '1') {
						uni.$emit('authen', {})
						setTimeout(() => {
							uni.navigateBack({})
						}, 600)
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.card_item {
		width: 686upx;
		height: 403upx;
		margin: auto;
		position: relative;
		margin-bottom: 40upx;

		.bg_img {
			width: 686upx;
			height: 403upx;
		}
	}

	.cu-tag {
		position: absolute;
		right: 30upx;
		top: 0;
		z-index: 10;
	}

	.btn_chuan {
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 370upx;
		height: 77upx;
		background-color: #1B90FF;
		color: #FFFFFF;
		font-size: 28upx;
		border-radius: 39upx;
		text-align: center;
		z-index: 10;

		.btn_center {
			margin: auto;
			width: 370upx;
			padding: 20upx 0;
			line-height: 1.2;
			text-align: center;

			image {
				width: 34upx;
				margin-right: 17upx;
				height: 26upx;
			}
		}

	}
</style>
