<template>
	<!-- 公司管理 -->
	<view class="">
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="cu-list menu">
				<view class="cu-item arrow">
					<view class="" style="font-size: 32upx;width: 100%;">
						<view class="" style="margin-bottom: 12upx;font-size: 28upx;">公司名称</view>
						<input type="text" class="input" name="company_name" v-model="company_name" placeholder="请输入公司名称"
						 placeholder-style="font-size: 32rpx;color:#BFBFBF" :style="company_name ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
					</view>
				</view>

				<view class="padding-lr">
					<view class=" margin-top  " style=" ">
						<view class="text-df margin-bottom">公司主图(选填) ({{ (imgOne!=''?1:0)}}/1) </view>
						<view class="grid grid-square">
							<view class="solids"  @tap="ViewImage" v-if="imgOne!=''">
								<image :src="imgOne.url" mode="aspectFill"></image>
								<view class="cu-tag bg-red" style="z-index: 100;" @tap.stop="DelImgOne"><text class="cuIcon-close"></text></view>								
							</view>
							<view class="solids" @tap="upload" v-if="imgOne==''">
								<image :src="IMG_URL + 'static/miniwechat/creame_gray.png'" mode="aspectFill"></image>
							</view>
						</view>
						<!-- <ben-upload v-if="defaultpic" :col="4" :max="1" @change="chooseLive" :defaultList="imgOne" :uShow='uShow'></ben-upload> -->
					</view>
				</view>
				<view class=" margin-top  plr15" style=" ">
					<view class="text-df margin-bottom">公司视频(选填) ({{ videoImg!='' ? 1 : 0 }}/1)</view>
					<view class="cu-form-group">
						<view class="grid  grid-square flex-sub">
							<view class="bg-img" v-if="videoImg!=''">
								<image :src="videoImg" mode="aspectFill"></image>
								<view class="play" @tap="playVideo">
									<image :src="IMG_URL + 'static/miniwechat/play.png'" mode="aspectFill"></image>
								</view>
								<view class="cu-tag bg-red" @tap.stop="DelImg" style="z-index: 100;"><text class="cuIcon-close"></text></view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="videoImg==''">
								<image :src="IMG_URL + 'static/miniwechat/creame_gray.png'" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item arrow" @tap="getLocation">
					<view class="padding-top">
						<view class="" style="margin-bottom: 12upx;font-size: 28upx;">公司地址</view>
						<view class="text-gray" v-if="!company_address">请选择地址</view>
						<view v-else class=" text-black text-bold text-md" style="padding-right: 50upx;">{{ company_address }}</view>
					</view>
				</view>
				<view class=" padding-lr">
					<view class=" margin-top  " style=" ">
						<view class="text-df margin-bottom">公司轮播图(选填)  ({{ (imgList && imgList.length) || 0 }}/9)</view>
						<view class="text-gray" style="font-size: 24upx;margin-bottom: 10upx;">（请上传尺寸为375*375像素的图片)</view>
						<ben-upload v-if="defaultpic" :col="4" :max="9" @change="bannerLive" :defaultList="imgList" :uShow='uShow'></ben-upload>
					</view>
				</view>
			</view>
			<view class="padding" style="margin-bottom: 200upx;">
				<view class=" margin-bottom">公司简介</view>
				<view class="areabox text-df" style="height: 300upx;">
					<textarea placeholder="填写公司描述，增加招人成功率" maxlength="1500" style="width: 100%;height: 260upx;font-size:32upx;line-height: 1.5"
					 :style="content ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="content" name='content'
					 placeholder-style="font-size:32upx;color:#BFBFBF" />
					<view class=" txtnum" :class="content && content.length == 1500 ? 'text-red' : 'text-gray'">{{ (content && content.length) || 0 }}/1500</view>
				</view>
			</view>
			<!-- 底部按钮 -->
			
				<view class="mb10">
					<button class="btn_next " style="background-color: #1B90FF;"  formType="submit">保存</button>
				</view>
		</form>
	</view>
</template>

<script>
import wPicker from '@/components/w-picker/w-picker.vue';
import benUpload from '@/components/ben-upload/ben-upload.vue';
import { scale_list } from '@/common/js/mockData.js';
const Checker = require('@/common/js/formValidation.js');
export default {
	components: {
		wPicker,
			benUpload
	},
	data() {
		return {
			user_type: 2, //绑定用户的类型 1=应聘者  2=招聘者
			company_name:'',//公司名称
			company_address:'',//公司地址
			IMG_URL:this.IMG_URL,
			content:'',//公司简介
			imgOne: {}, //职位主图
			videoImg:'',//公司视频缩略图
			uShow:false,//图片上传成功在展示
			video: '', //公司视频
			defaultpic: false, //是否展示图片
			imgList: [], //职位轮播
			lon: '', //经度
			lat: '', //维度
		};
	},
	onLoad(option) {
		uni.showLoading({})
		this.getinfo(); //获取用户信息
		setTimeout(()=>{
			this.defaultpic = true;
		},500)
		uni.$on('video', data => {
			this.video = data.msg;
			if (data.msg != '') {
				this.videoImg = data.msg + '?x-oss-process=video/snapshot,t_10000,f_jpg,w_800,h_600,m_fast';
			}
		});
		// 监听上传公司主图
		uni.$on('upHeadImg', data => {
			this.imgOne={
				url:data.avatar,
				aid:data.path
			}
			// this.imgOne.aid= data.path;
		});
		// 监听选择地点
		// #ifdef APP-PLUS
		uni.$on('chooseLocation',data=>{
			this.company_address = data.name;
					this.lon = data.longitude;
					this.lat = data.latitude;
			
		})
		// #endif
	},
	onUnload() {
		uni.$off('changeFuli')
			uni.$off('video');
	},
	onShow() {},
	methods: {
		upload() {
			uni.chooseImage({
				count: 1, // 默认9
				sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success(res) {
					const src = res.tempFilePaths[0];
					uni.navigateTo({
						url: '/pagescommon/upload?src=' + src
					});
				}
			});
		},
		bannerLive(e) {
			//图片轮播
			this.imgList = e;
			if(e!=''){
				this.uShow=true
				uni.hideLoading()
			}
		},
		playVideo() {
			//播放视频
			uni.navigateTo({
				url: 'play_video?url=' + this.video
			});
		},
		DelImg() {
			//删除视频
			uni.showModal({
				content: '确定要删除吗？',
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if (res.confirm) {
						this.videoImg = '';
						this.video= '';
						this.open = false;
					}
				}
			});
		},
		ViewImage(url) {
			uni.previewImage({
				urls: url,
				current: url
			});
		},
		DelImgOne(){//删除主图
			uni.showModal({
				content: '确定要删除吗？',
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if (res.confirm) {
						this.imgOne = '';
					}
				}
			});
		},
		ChooseImage() {
			//选择视频
			if (this.isopen == false) {
				return;
			}
			this.isopen = false;
			setTimeout(() => {
				this.isopen = true;
			}, 1500);
			uni.navigateTo({
				url: 'upload_video'
			});
		},
		getinfo(){
			let userid=uni.getStorageSync("USERINFO").id
			this.$Request.post(this.$api.company.companyInfo,{}).then(res => {
				uni.hideLoading()
				if (res.code == 1) {
					this.company_name=res.data.info.company_name
					this.company_address=res.data.info.company_address
					this.content=res.data.info.content
					this.imgList=res.data.info.ad_images
					this.imgList.map((item)=>{
						item.loading='100%'
					})
					this.imgOne=res.data.info.image
					// this.imgOne.map((item)=>{
					// 	item.loading='100%'
					// })
					this.uShow=true
					this.defaultpic=true
					this.videoImg=res.data.info.video_url
					this.video=res.data.info.video
					this.lon=res.data.info.lon
					this.lat=res.data.info.lat
				}else{
					this.$Common.toast(res.msg);
				}
			});
		},
		
		toggleTab(who) {
			//显示选择组件
			this.$data[who] = true;
		},
		getLocation() {
			//获取定位
			let _this = this;
			// #ifdef APP-PLUS
			uni.navigateTo({
				url:'/pagescenter/index'
			})
			// #endif
			// #ifndef APP-PLUS
			uni.chooseLocation({
				success(res) {
					// console.log('详细地址：' + res.address);
					// console.log('地址名：' + res.name);
					// console.log('纬度：' + res.latitude);
					// console.log('经度：' + res.longitude);
					_this.company_address = res.address;
					_this.lon = res.longitude;
					_this.lat = res.latitude;
				}
			});
			// #endif
		},
		
		formSubmit: function(e) {//form提交
			//定义表单规则
			var rule = [
				{
					name: 'company_name',
					rule: ['required'],
					msg: ['请输入公司名称']
				}
			];
			// if (this.imgOne=='') {
			// 	this.$Common.toast('请选择职位主图');
			// 	return false;
			// }
			// if (this.imgList=='') {
			// 	this.$Common.toast('请选择公司轮播图');
			// 	return false;
			// }
			if(!this.company_address){
				this.$Common.toast('请选择公司地址');
			}
			if(this.content&&this.content.length>1500){
				this.$Common.toast('公司简介限制1500字');
				return false;
			}else if(!this.content){
				this.$Common.toast('请填写公司简介');
				return false;
			}
			var skill_certificate = [];
			this.imgList &&
				this.imgList.map(item => {
					skill_certificate.push(item.aid);
				});
			//进行表单检查
			var formData = e.detail.value;
			// 添加自定义参数
			formData.company_address = this.company_address; //公司地址
			formData.image = (this.imgOne&&this.imgOne.aid); //公司主图
			formData.ad_images = skill_certificate.join(','); //公司轮播图
			formData.content=this.content//职位描述
			formData.lon=this.lon//职位描述
			formData.lat=this.lat//职位描述
			formData.video=this.video||0
			
			// 验证
			var checkRes = Checker.validation(formData, rule);
			console.log(checkRes);
			if (checkRes) {
				this.$Common.toast(checkRes);
				return false;
			}
			// 验证成功，提交
			this.$Request.post(this.$api.user.editcompanyinfo, formData).then(res => {
				this.$Common.toast(res.msg);
				if (res.code == 1) {
					uni.$emit('companyInfo',{})
					uni.setStorageSync('companyInfo',{msg:'公司信息已完善'})
					setTimeout(()=>{
						uni.navigateBack({ })
					},800)
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
	padding-top: 30upx;
}
.txtColor {
	color: #999;
}
.cu-list.menu > .cu-item {
	min-height: 150rpx;
}
.solids image {
	width: 158upx;
	height: 158upx;
}
.solids::after {
	border: 0;
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
.areabox {
	width: 686upx;
	height: 160upx;
	border: 1px solid #cccccc;
	padding: 20upx;
	position: relative;
	.txtnum {
		position: absolute;
		font-size: 24upx;
		bottom: 8upx;
		right: 20upx;
	}
}
.cu-tag {
    position: absolute;
    right: 0;
    top: 0;
    -webkit-border-bottom-left-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 3px 6px;
    height: auto;
    background-color: rgba(0, 0, 0, 0.5);
	}
.content>text:nth-child(1){
	width: 23%;
}
.cu-form-group{
	padding: 0;
}
.grid.grid-square > uni-view > uni-text[class*='cuIcon-'] {
	background-color: #fafafa;
	border: none;
}
uni-textarea {
	width: 100%;
	height: 350rpx;
}

.active {
	background-color: #F27B04 !important;
	color: #fff !important;
}
.cu-list.menu > .cu-item.arrow:nth-child(2n):before,
.cu-list.menu > .cu-item.arrow:nth-child(1):before{
	content: '';
}
.cu-list.menu > .cu-item.arrow:nth-child(1) {
	padding-right: 28upx;
}
.cu-list.menu > .cu-item.arrow:before {
	top: 58upx;
	opacity: 0.6;
}
</style>
