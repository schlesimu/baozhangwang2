<template>
	<!-- 反馈 -->
	<view class="change">
		<form @submit="formSubmit">
			<view class="warp">
				<view class="feedback">
					<view class="feedback_top"> 反馈类型</view>
					<view class="feedback_reason flex-wrap">
						<view v-for="(item, index) in type" :key="index" :class="item.id == active ? 'active' : ''"
							@click="reason(item.id)">{{ item.title }}</view>
					</view>
				</view>
				<view class="feedback_content">
					<view class="feedback_content_top">反馈内容</view>
					<view class="content">
						<textarea name="body" v-model="body" maxlength="600" placeholder="问题描述的越详细.有助于我们更快的解决问题"
							:placeholder-style="body?'color:#666':'color:#bfbfbf'" />
						<view class="text-gray flex justify-end" style="margin: 0 20upx 20upx 0;"
							:class="body&&body.length == 600 ? 'text-red' : 'text-gray'">{{ body&&body.length||0 }}/600
						</view>
					</view>
				</view>
				<view class="abc">

				</view>
				<view class="">
					<view class="padding"> 上传照片</view>
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item, index) in imgList" :key="index" @tap="ViewImage"
								:data-url="item.path">
								<image :src="item.path" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index"><text
										class="cuIcon-close"></text></view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="imgList.length < 4">
								<image :src="IMG_URL+'static/miniwechat/crame.png'" mode=""></image>
							</view>
						</view>
					</view>
				</view>

			</view>
			<view class="feedback_contact">
				<view class="feedback_contact_top">请留下您的联系方式</view>
				<view class="feedback_contact_content">
					<input type="number" name="contact" maxlength="11" v-model="contact" placeholder="请输入手机号/QQ号"
						placeholder-style="color:#e5e5e5" :placeholder-style="contact?'color:#666':'color:#e5e5e5'" />
				</view>
			</view>
			<view style="padding:30rpx;">
				<button style="margin-bottom:40upx;" class="btn_next bg_deep" formType="submit"
					type="primary">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				type: {},
				active: '',
				imgList: [],
				imgpath: [],
				IMG_URL:this.IMG_URL,
				max: 5,
				body: "", //反馈内容
				contact: "" ,//联系方式
				isopen: true, //跳转页面
			};
		},
		onLoad() {
			_self = this;
			this.get_feedback_type();
		},
		methods: {
			reason(type) { //选择反馈类型
				this.active = type;
			},
			get_feedback_type() { //获取反馈类型
				this.$Request.post(this.$api.operation.get_feedback_type).then(res => {
					if (res.code == 1) {
						_self.type = res.data;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
			ChooseImage() { //选择图片
				this.$Request.uploadImg(res => {
					var img = res.data[0];
					this.imgList.push(img);
					this.imgpath = this.imgpath.concat(img.id)
				}, this.max - this.imgList.length);
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) { //删除上传的图片
				uni.showModal({
					title: '友情提示',
					content: '确定要删除图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1);
							this.imgpath.splice(e.currentTarget.dataset.index, 1);
							console.log(this.imgpath);
						}
					}
				});
			},

			formSubmit: function(e) {
				//进行表单检查
				var formData = e.detail.value;
				if (!formData.body) {
					uni.showToast({
						title: '反馈内容不能为空',
						icon: 'none'
					});
					return false;
				}
				if (this.active == '') {
					uni.showToast({
						title: '请选择反馈类型',
						icon: 'none'
					});
					return false;
				}
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.contact)) {
					this.$Common.toast('请填写正确的联系方式')
					return false;
				}
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 3000);
				formData.thumb = this.imgpath;
				formData.type = this.active;
				formData.contact = this.contact
				this.$Request.post(this.$api.operation.feedback, formData).then(res => {
					this.$Common.toast(res.msg)
					if (res.code == 1) {
						setTimeout(function() {
							uni.navigateBack();
						}, 500)
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	page {
		font-size: 28upx;
		color: #333;
		// height: 100%;
		background: #fff;

		// overflow: hidden;
		.change {
			.warp {
				width: 100%;
				background: #fff;
				border-bottom: 20upx solid #fff;

				.feedback {
					padding: 0 25upx;

					.feedback_top {
						height: 30upx;
						line-height: 30upx;
						margin-bottom: 40upx;
						margin-top: 50upx;
					}

					.feedback_reason {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						justify-content: flex-start;

						view {
							width: 29.33%;
							height: 70upx;
							line-height: 70upx;
							text-align: center;
							margin: 0 2% 20upx;
							font-size: 26upx;
							border-radius: 10upx;
							border: 1px solid #e6e6e6;
							color: #999;
						}

						.active {
							color: #1B90FF;
							border: 1px solid #1B90FF;
							background-color: #ECF6FF;
						}
					}
				}

				.feedback_content {
					padding: 40upx 25upx;

					.feedback_content_top {
						height: 30upx;
						line-height: 30upx;
						margin-bottom: 40upx;
					}

					.content {
						border: 1px solid #CCCCCC;

						textarea {
							width: 100%;
							font-size: 28upx;
							height: 450upx;
							padding: 20upx 0;
						}
					}

					image {
						width: 164upx;
						height: 164upx;
						margin-bottom: 18upx;
					}
				}
			}

			.feedback_contact {
				padding: 0 25upx;
				background: #fff;

				.feedback_contact_top {
					height: 80upx;
					font-size: 28upx;
					line-height: 80upx;
				}

				.feedback_contact_content {
					input {
						height: 80upx;
						display: flex;
						flex-wrap: wrap;
						flex-direction: row;
						align-items: center;
						border-bottom: 2upx solid #eee;
						border-radius: 10upx;
					}
				}
			}

			.abc {
				width: 750upx;
				height: 20upx;
				background: #F7F7F7;
			}

			.sub {
				margin-top: 30%;
				line-height: 88upx;
				background-color: rgb(0, 129, 255);
				color: #fff;
				text-align: center;
				border-radius: 45px;
				margin-left: 25upx;
				margin-right: 25upx;
			}
		}

		.solids image {
			width: 140upx;
			height: 140upx;
		}

		.solids::after {
			border: 0;
		}
	}
</style>
