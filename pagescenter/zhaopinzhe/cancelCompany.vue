<!-- 
	修改人：王正航
	修改日期：2020/10/19
 -->
<!-- 李爽 10/22 -->
<template>
	<view class="change">
		<!-- 头部 -->
		<view class="warp solid-top">
			<view class="feedback padding">
				<view class="feedback_top text-333 f32">
					类型
				</view>
				<view class="feedback_reason">
					<view class="round margin-top-sm text-cut plr10" v-for="(item, index) in type" :key="index" :class="item.aid == active ? 'bg-theme text-white' : ''"
					 @click="reason(item.aid)">{{ item.name_type }}</view>
				</view>
			</view>
			<view class="feedback_content">
				<view class="feedback_content_top">反馈内容</view>
				<view class="content">
					<textarea name="content" v-model="content" maxlength="600" placeholder="请输入原因" :placeholder-style="content?'color:#666':'color:#bfbfbf'" />
					<view class="text-gray flex justify-end" style="margin: 0 20upx 20upx 0;" :class="content&&content.length == 600 ? 'text-red' : 'text-gray'">{{ content&&content.length||0 }}/600</view>
					</view>
			</view>
		</view>
		
			<view style="padding:30rpx; margin-bottom: 30rpx; " class="bg-white">
				<view class="btn-primary bg-theme " @tap='submit' >提交</view>
			</view>
	</view>
</template>

<script>
import benUpload from '@/components/ben-upload/ben-upload.vue';
	export default {
		components: {
			benUpload,
		},
		data() {
			return {
				type: [],
				active: 0,
				imgpath: [],
				max: 4,
				content: "",
				contact: "",
				images: [],
				company_id:uni.getStorageSync('roleinfo').info.aid
			};
		},
		onLoad() {
			this.get_feedback_type();
		},
		methods: {
			back(){
				uni.navigateBack();
			},
			reason(type) {
				this.active = type;
			},
			get_feedback_type() {
				this.$Request.post(this.$api.company.get_cancel_type)
				.then(res => {
					if (res.code == 1) {
						this.type = res.data;
					} else {
						uni.showToast({ title: res.msg, icon: 'none' });
					}
				});
			},
			chooseImages(e){
				this.imgpath = e;
			},
			submit(e) {
				//进行表单检查
				if(!this.active){
					this.$Common.toast('请选择注销的类型');
					return false;
				}
				let that=this
					uni.showModal({
						title: '你确定要注销公司吗',
						success: function(res) {
							if (res.confirm) {
								that.$Request.post(that.$api.company.cancel_company, {
									type:that.active,
									content:that.content,
									company_id:that.company_id,//公司id
								}).then(res => {
									uni.showToast({ title: res.msg, icon: 'none' });
									if (res.code == 1) {
										uni.setStorageSync('USERINFO', res.data);
										uni.removeStorageSync('PageCur');
										uni.$emit('userinfo', {});
										setTimeout(() => {
											uni.reLaunch({
												url: '/pages/index/index'
											}, 300);
										})
										setTimeout(function(){
											uni.navigateBack();
										},500)
									}
								});
								
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				
			}
		}
	};
</script>

<style lang="scss">
	page {
		height: calc(100%);
		font-size: 28upx;
		color: #333;
		overflow: hidden;
		.change {
			.warp {
				background: #fff;
				.feedback {
					.feedback_top {
						display: flex;
						align-items: center;
					}
					.feedback_reason {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						justify-content: space-between;
						view {
							width: 29.33%;
							height: 70upx;
							line-height: 70upx;
							text-align: center;
							// margin: 0 2% 20upx;
							font-size: 26upx;
							color: #333;
							background: #F6F7F9;
						}
					}
				}
				
			}
		.btn-primary{
			position: fixed;
			bottom: 90upx;
			left: 0;
			right: 0;
			width: 686upx;
			margin: auto;
			border-radius: 40upx;
			padding: 15upx 0;
			text-align: center;
			color: #FFFFFF;
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
					height: 300upx;
					padding: 20upx 0;
		        }
		    }
		    image {
		        width: 164upx;
		        height: 164upx;
		        margin-bottom: 18upx;
		    }
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
	}
</style>
