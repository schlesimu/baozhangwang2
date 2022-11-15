<template>
	<!-- 我的相册-->
	<view class="padding">
		<!-- 列表start -->
		<view class="head_list cu-list menu sm-border">
			<view class="" v-if="videoImg == ''">
				<view class=" margin-top  " style=" ">
					<view class="text-df margin-bottom">
						<strong>上传图片</strong>
						(图片和视频只能选择一种上传)
					</view>
					<view class="text-gray ml5" style="font-size: 24upx;margin-bottom: 10upx;">最多上传1张图片</view>
					<ben-upload v-if="defaultpic" :col="4" :max="1" @change="bannerLive" :defaultList="imgList" :uShow='uShow'></ben-upload>
				</view>
			</view>
			<view class="" v-if="imgList == ''">
				<view class=" margin-top  " style=" ">
					<view class="text-df margin-bottom bold">上传视频</view>
					<view class="cu-form-group">
						<view class="grid  grid-square flex-sub">
							<view class="bg-img" v-if="videoImg.length > 0">
								<image :src="videoImg" mode="aspectFill"></image>
								<view class="play" @tap="playVideo"><image :src="IMG_URL + 'static/miniwechat/play.png'" mode="aspectFill"></image></view>
								<view class="cu-tag bg-red" @tap.stop="DelImg" style="z-index: 100;"><text class="cuIcon-close"></text></view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="videoImg.length == 0">
								<image :src="IMG_URL + 'static/miniwechat/creame_gray.png'" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" style="border-bottom: 1px solid #eee;">
				<view class="" style=" ">
					<view class="text-df margin-bottom bold">请输入标题</view>
					<view class=" text-df">
						<input
							type="text"
							value=""
							placeholder="请输入标题"
							style="width: 100%;height: 50upx;"
							:style="title ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="title"
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="title ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						/>
					</view>
				</view>
			</view>
			<view class="pt10">
				<view class="   " style=" ">
					<view class="text-df margin-bottom bold">内容</view>
					<view class="areabox text-df" style="height: 220upx;">
						<textarea
							placeholder="请输入内容"
							maxlength="100"
							style="width: 100%;line-height: 1.5"
							:style="content ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="content"
							placeholder-style="font-size:32upx;color:#E6E6E6"
						/>
						<view class="text-gray txtnum" :class="content && content.length == 100 ? 'text-red' : 'text-gray'">{{ (content && content.length) || 0 }}/100</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 列表end -->
		<view class="margin-bottom mt30 flex">
			<!-- <view class="btn_next text-df btn" style="margin-top: 10upx;border-radius: 80upx;width: 320upx;" @tap="detel">删除</view> -->
			<view class="btn_next text-df" style="margin-top: 10upx;background-color: #1B90FF;border-radius: 80upx;" @tap="gopay">发布</view>
		</view>
	</view>
</template>

<script>
import benUpload from '@/components/ben-upload/ben-upload.vue';
export default {
	components: {
		benUpload
	},
	data() {
		return {
			content: '', // 职位描述
			imgOne: [], //职位主图
			defaultpic: false, //是否显示图片
			videoImg: [], //职位视频缩略图
			video: '', //职位视频
			IMG_URL:this.IMG_URL,
			imgList: [], //职位轮播
			imgpath: [],
			aid: '', //相册id
			max: 4, //图片最大数量
			uShow:false,//图片上传成功在展示
			check: '',
			type: 1, //1 图片 2 视频
			hidden: true, //职位描述隐藏
			title: '', //职位标题
			city: '', //城市
			lon: '', //公司经度
			isopen: true, //跳转页面
			lat: '', //公司纬度
			open: false //返回视频
		};
	},
	computed: {
		totalMoney() {
			return ((this.zhaopin_number * (this.priceOne * 100)) / 100).toFixed(2);
		}
	},
	onLoad(option) {
		uni.removeStorageSync('fuliTag');
		this.aid = option.aid; //相册id
		setTimeout(() => {
			this.defaultpic = true;
		}, 300);
		uni.$on('video', data => {
			console.log(data, '监听选择视频');
			this.video = data.msg;
			if (data.msg != '') {
				this.videoImg = data.msg + '?x-oss-process=video/snapshot,t_10000,f_jpg,w_800,h_600,m_fast';
				this.open = true;
			}
			console.log(this.videoImg);
		});
	},
	onUnload() {
		uni.$off('video');
	},
	methods: {
		bannerLive(e) {
			//图片轮播
			this.imgList = e;
			this.type = 1;
			if(e!=''){
				this.uShow=true
				// uni.hideLoading()
			}
		},
		ChooseImage() {
			//选择视频
			if (this.isopen == false) {
				return;
			}
			this.isopen = false;
			this.type = 2;
			setTimeout(() => {
				this.isopen = true;
			}, 1500);
			uni.navigateTo({
				url: 'upload_video'
			});
		},
		DelImg() {
			//删除视频
			uni.showModal({
				content: '确定要删除视频吗？',
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if (res.confirm) {
						this.videoImg = '';
						this.open = false;
					}
				}
			});
		},

		playVideo() {
			//播放视频
			uni.navigateTo({
				url: 'play_video?url=' + this.video
			});
		},

		
		detel() {
			//删除
			this.$Request.post(this.$api.Community.add_notice, { aid: this.aid }).then(res => {
				if (res.code == 1) {
					this.$Common.toast(res.msg);
					if (this.isopen == false) {
						return;
					}
					this.isopen = false;
					setTimeout(() => {
						this.isopen = true;
					}, 1500);
					uni.navigateBack({});
				} else {
					this.$Common.toast(res.msg);
				}
			});
		},
		gopay() {
			//完成发布
			// 验证

			console.log(this.imgList);
			if (this.imgList == '' && this.videoImg == '') {
				this.$Common.toast('请上传图片或视频');
				return false;
			}
			if (!this.title) {
				this.$Common.toast('请输入标题');
				return false;
			}
			// var skill_certificate = [];
			// this.imgList &&
			// 	this.imgList.map(item => {
			// 		skill_certificate.push(item.aid);
			// 	});
			let formData = {
				title: this.title, //标题
				linking: (this.imgList != '' && this.imgList[0].aid) || '', //图片
				describe: this.content || '', //详细内容
				company_id: uni.getStorageSync('roleinfo').info.aid,
				type: this.type, // 1图片 2视频
				video: this.video || '', //视频
				user_id: uni.getStorageSync('USERINFO').id
			};
			if (this.isopen == false) {
				return;
			}
			this.isopen = false;
			setTimeout(() => {
				this.isopen = true;
			}, 1500);
			this.$Request.post(this.$api.Community.addAlbum, formData).then(res => {
				// console.log(res,'发布职位');
				if (res.code == 1) {
					this.$Common.toast(res.msg);
					uni.$emit('albumUpdate', {});
					
					uni.navigateBack({});
				} else {
					this.$Common.toast(res.msg);
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
	height: 100%;
	letter-spacing: 1px;
}

.areabox {
	width: 686upx;
	height: 80upx;
	border: 1px solid #cccccc;
	padding: 20upx;
	position: relative;
	.txtnum {
		position: absolute;
		font-size: 24upx;
		bottom: 8upx;
		right: 20upx;
	}
	// textarea{
	// 	position: relative;
	// 	z-index: -1;
	// }
}
uni-textarea {
	width: 560rpx;
	height: 150rpx;
}
// .btn {
// 	width: 100%;
// 	height: 88rpx;
// 	line-height: 88rpx;
// 	text-align: center;
// 	background: #2a89ff;
// 	color: #fff;
// }

.biaoqian {
	padding: 8rpx 10rpx;
	background-color: #50aeff;
	border-radius: 10rpx;
	font-size: 22rpx;
	margin-right: 20rpx;
	margin-bottom: 16upx;
	position: relative;
	text-align: center;
	image {
		width: 38rpx;
		height: 38rpx;
		position: absolute;
		right: -19rpx;
		top: -19rpx;
	}
}
.solids image {
	width: 140upx;
	height: 140upx;
}
.solids::after {
	border: 0;
}
.bom {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}

.btn {
	text-align: center;
	color: #50aeff;
	border-radius: 4px;
	font-size: 17px;
	border: 1px solid #50aeff;
	background-color: #fff;
}

.cu-form-group {
	padding: 0;
	.bg-img {
		width: 300upx;
		height: 200upx;
		position: relative;
		.play {
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			top: 0;
			z-index: 10;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(255, 255, 255, 0.3);
			image {
				max-width: 80upx;
				max-height: 80upx;
			}
		}
	}
	.bg-img > image {
		width: 100%;
		height: 100%;
	}
}
.cu-list.menu.sm-border > .cu-item:after {
	left: 0;
}
.cu-list.menu > .cu-item.arrow {
	padding: 0;
	min-height: 140upx;
}
.cu-list.menu > .cu-item.arrow:before {
	top: 58upx;
	opacity: 0.6;
}
.cu-list.menu > .cu-item.arrow:nth-child(10):before,
.cu-list.menu > .cu-item.arrow:nth-child(8):before,
.cu-list.menu > .cu-item.arrow:nth-child(7):before {
	opacity: 0;
}
</style>
