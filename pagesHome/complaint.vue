<template>
	<!-- 反馈 -->
	<view class="change">
		<form @submit="formSubmit">
			<view class="warp pb100">
				<view class="feedback">
					<view class="feedback_reason flex-wrap">
						<view v-for="(item, index) in typeList" :key="index" :class="item.checked  ? 'active' : ''"
							@click="reason(item)">{{ item.title }}</view>
					</view>
				</view>

				<view class="padding">
					<view class="pb10"> 上传凭证（必填）</view>
					<view class="text-grey f24  pb10" style="letter-spacing: 2upx;">请提供能明确指向举报原因的证据照片，如聊天截图，
						地址门店招牌等（要求平整清晰完整无修改）</view>
					<view class="cu-form-group" style="padding: 0;">
						<view class="  flex align-center">
							<view class="bg-img mr10" v-for="(item, index) in imgList" :key="index" @tap="ViewImage"
								:data-url="item.path">
								<image :src="item.path" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index"><text
										class="cuIcon-close"></text></view>
							</view>
							<view class="bg-img" @tap="ChooseImage" v-if="imgList.length < 3">
								<image :src="IMG_URL + 'static/miniwechat/upload.png'" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="feedback_content">
					<view class="feedback_content_top">描述（必填）</view>
					<view class="content">
						<textarea name="body" v-model="body" maxlength="600" placeholder="请描述举报内容"
							:placeholder-style="body?'color:#666':'color:#bfbfbf'" style="line-height: 1.5" />
						<!-- <view class="text-gray flex justify-end" style="margin: 0 20upx 20upx 0;" :class="body&&body.length == 600 ? 'text-red' : 'text-gray'">{{ body&&body.length||0 }}/600</view> -->
					</view>
				</view>
			</view>
			<view style="padding:0rpx;" class="fixed">
				<view class=" foot_pop f24">您的举报将对举报人保密</view>
				<button style="margin-top:0upx;width: 100%;" class="btn_next bg_deep" formType="submit"
					type="primary">提交举报资料</button>
			</view>
		</form>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				typeList: {},
				IMG_URL: this.IMG_URL,
				active: [],
				imgList: [],
				imgpath: [],
				max: 5,
				body: "", //反馈内容
				contact: "", //联系方式
				compand_id: '', //公司id
				job_id: '', //职位id
				checkArr: [], //选择的标签
				job_type: '', //1：举报职位或者公司 2：举报网约工
			};
		},
		onLoad(e) {
			_self = this;
			this.get_feedback_type();
			this.compand_id = e.compand_id || ''
			this.job_id = e.job_id
			this.job_type = e.job_type

		},
		methods: {
			// reason(type) {//选择反馈类型
			//     this.active = type;
			// },
			// 选中标签
			reason(item) { //选择反馈类型
				if (!item.checked) {
					item.checked = true;
					this.checkArr.push(item);
					this.active.push(item.aid)
				} else {
					item.checked = false;
					this.checkArr.map((val, key) => {
						if (val.aid == item.aid) {
							this.checkArr.splice(key, 1);
							this.active.splice(key, 1);
							return;
						}
					});
				}

				// this.countCheckArr(); //计算
			},
			get_feedback_type() { //获取反馈类型
				this.$Request.post(this.$api.operation.getComplaintSort).then(res => {
					if (res.code == 1) {
						// _self.type = res.data;
						res.data.map(item => {
							item.checked = false;
							for (var i in this.checkArr) {
								if (this.checkArr[i].aid == item.aid) {
									item.checked = true;
								}
							}
						});
						this.typeList = res.data;
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
						}
					}
				});
			},

			formSubmit: function(e) {
				//进行表单检查
				var formData = e.detail.value;
				if (this.active == '') {
					this.$Common.toast('请选择举报类型')
					return false;
				}
				if (!formData.body) {
					uni.showToast({
						title: '反馈内容不能为空',
						icon: 'none'
					});
					return false;
				}
				if (this.imgList == '') {
					this.$Common.toast('请上传凭证')
					return false;
				}

				formData.url = this.imgpath;
				formData.type_id = this.active;
				formData.content = this.body
				formData.compand_id = this.compand_id || ''
				formData.job_id = this.job_id
				formData.job_type = this.job_type
				this.$Request.post(this.$api.operation.comPlaint, formData).then(res => {
					this.$Common.toast(res.msg)
					if (res.code == 1) {
						setTimeout(function() {
							uni.redirectTo({
								url: 'submit_success'
							});
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
							background-color: #FAFAFA;
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
					padding: 20upx 25upx;

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
							height: 350upx;
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

		.bg-img {
			width: 140upx;
			height: 140upx;
			position: relative;

			image {
				width: 100%;
				height: 100%;
			}

			.cu-tag {
				position: absolute;
				top: 0;
				right: 0;
			}
		}

		.solids image {
			width: 140upx;
			height: 140upx;
		}

		.solids::after {
			border: 0;
		}

		.foot_pop {
			width: 100%;
			height: 68upx;
			text-align: center;
			line-height: 68upx;
			background-color: #F4F5F7;
		}

		.fixed {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}
	}
</style>
