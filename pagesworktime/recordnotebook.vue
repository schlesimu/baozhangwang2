<template>
	<view class="padding brt_e" style="height: auto;" :style="{ paddingBottom: paddingBottom }">
		<view class="grace-body ">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class=" cu-list menu sm-border margin-lr ">
					<view class="flex align-center justify-between ptb10">
						<view class=" flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm">
								<text class="text-red  text-xl">*</text>
								<text>标题</text>
							</text>
							<input
								type="text"
								class="input"
								style="width: 100%;"
								name="title"
								v-model="title"
								placeholder="请输入标题"
								@input="checktitle(title)"
								@blur="titleblur(title)"
								placeholder-style="font-size: 28rpx;"
								:placeholder-style="title ? 'color:#666' : 'color:#BFBFBF'"
							/>
						</view>
					</view>
					<view class="pt10 mt10">
						<view>
							<view class="text-lg margin-bottom">
								<text class="text-red  text-xl">*</text>
								内容
							</view>
							<view class="areabox text-lg bg-f2f3 radius-16 padding" style="height: 379upx;">
								<textarea
									name="description"
									placeholder="请输入内容"
									maxlength="1500"
									style="width: 100%;height: 300upx;line-height: 1.5"
									:style="description ? 'color:#333;font-weight:bold' : 'color:#999'"
									v-model="description"
									placeholder-style="font-size:32upx;color:#999"
								/>
								<view class="text-gray txtnum" :class="description && description.length == 1500 ? 'text-red' : 'text-gray'">
									{{ (description && description.length) || 0 }}/1500
								</view>
							</view>
						</view>
					</view>
					<view class="pt10 mt10">
						<view @tap.stop="wechatLocation">
							<view class="text-lg margin-bottom">
								<text class="text-red  text-xl">*</text>
								地址
							</view>
							<view class="lg cuIcon-locationfill flex justify-start align-center">
								<input class="ml10 text-gray" disabled style="width: 100%;" name="address" v-model="address" />
								<input disabled style="width: 0; height: 0;" name="city_id" v-model="city_id" />
							</view>
						</view>
					</view>
				</view>
				<view class="bg-white margin-top margin-lr padding-bottom-sm"><view class=" text-333 text-bold" style="letter-spacing: 2upx;">图片</view></view>
				<ben-upload v-if="defaultpic" :col="4" :max="9" @change="infoImgLive" :defaultList="infoImgs" :uShow="uShow"></ben-upload>
				<view class="bg-white margin-top margin-lr padding-bottom-sm"><view class=" text-333 text-bold" style="letter-spacing: 2upx;">视频</view></view>
				<view style="padding-bottom: 200upx;">
					<ben-video-upload v-if="defaultVideo" :col="4" :max="1" @change="infoVideoLive" :defaultList="infoVideos" :uShow="vShow"></ben-video-upload>
				</view>
				<!-- calc(100%-343)/2; -->
				<view class="fixed" style="width: 100%; bottom: 0; left: 0; z-index: 19841004; background-color: #FFFFFF; padding: 30upx 0;">
					<button class="btn_next round " style="margin: 0 auto; margin-bottom: 20upx;margin-top: 30upx;" form-type="submit">保存</button>
				</view>
			</form>
		</view>

		<uni-popup type="center" ref="tips"></uni-popup>
	</view>
</template>

<script>
const Checker = require('@/common/js/formValidation.js');
export default {
	data() {
		return {
			title: '',
			description: '',
			address: '请选择您位置',
			infoImgs: [], // 记事图片列表
			infoVideos: [], // 记事本视频
			defaultpic: false, // 是否展示图片
			defaultVideo: false, // 是否展示视频
			uShow: false, // 图片上传成功在展示
			vShow: false, // 视频上传成功在展示
			paddingBottom: '400upx', // 底部内边距
			city_id: null, // 城市id
			lon: null, // 经度
			lat: null, // 纬度
			category_id: 12, // 记事本栏目
		};
	},
	onLoad(e) {
		console.error(e);
		let that = this;
		uni.setNavigationBarTitle({
			title: '记事本'
		});

		if (e.id) {
			this.infoId = e.id;
			let infouri = this.$api.user.user_inform_get + '?id=' + e.id;
			this.$Request.get(infouri).then(res => {
				console.log(res);
				that.defaultpic = true;
				that.defaultVideo = true;
				if (res.code == 1) {
					that.category_id = res.data.category_id;
					that.title = res.data.title;
					that.description = res.data.body;
					that.city_id = res.data.city_id;
					that.address = res.data.address;
					that.lon = res.data.lon;
					that.lat = res.data.lat;
					that.infoImgs = res.data.info_imgs;
					that.infoVideos = res.data.info_videos;

					if (that.infoImgs && that.infoImgs.length > 0) that.uShow = true;
					if (that.infoVideos && that.infoVideos.length > 0) that.vShow = true;
				}
			});
		} else {
			this.defaultpic = true;
			this.defaultVideo = true;
		}
	},
	onShow() {
		this.defaultpic = true;
		this.defaultVideo = true;
	},
	methods: {
		formSubmit: function(e) {
			// console.log(e.detail.value);
			let that = this;
			//定义表单规则
			let rule = [
				{
					name: 'title',
					rule: ['required', 'minLength:2', 'maxLength:30'], //可使用区间，此处主要测试功能
					msg: ['请输入标题', '标题必须2个或以上字符', '标题不能超过30个字符']
				},
				{
					name: 'description',
					rule: ['required'],
					msg: ['请输入内容']
				}
			];

			//进行表单检查
			let formData = e.detail.value;
			// 编辑的情况，需要带上id
			if (this.infoId) formData.id = this.infoId;
			formData.category_id = this.category_id;
			let checkRes = Checker.validation(formData, rule);
			if (checkRes) {
				this.$Common.toast(checkRes);
				return false;
			}

			let info_photos = [];
			let info_videos = []; //发布信息照片
			this.infoImgs &&
				this.infoImgs.map(item => {
					info_photos.push(item.aid);
				});

			this.infoVideos &&
				this.infoVideos.map(item => {
					info_videos.push(item.aid);
				});

			console.log(this.infoVideos);

			// 将图片id赋值给提交对象
			formData.img_url = info_photos.join(',');
			// 视频地址
			formData.video_url = info_videos.join(',');

			formData.source = 2; // 1是系统2小程序

			// 经纬度
			formData.lon = this.lon;
			formData.lat = this.lat;

			// 提交记事
			let apiuri = this.$api.user.user_info_submit;

			// 验证成功，提交用户发布信息
			this.$Request.post(apiuri, formData).then(res => {
				this.$Common.toast(res.msg);
				if (res.code == 1) {
					setTimeout(() => {
						uni.navigateBack();
						uni.$emit('reback', 'recordnotebook');
					}, 1000);
				}
			});
		},
		checktitle(title) {
			//验证标题长度
			if (title.length > 30) {
				this.$Common.toast('标题不能超过30个字符');
			}
		},
		titleblur(title) {
			//标题输入失去焦点
			if (title.length < 2) {
				this.$Common.toast('内容不能少于2个字符');
			}
		},
		infoImgLive(e) {
			this.defaultpic = true;
			// 上传信息图片
			console.log(e);
			this.infoImgs = e;
			if (e != '') {
				this.uShow = true;
				// uni.hideLoading()
			}
		},
		infoVideoLive(e) {
			this.defaultVideo = true;
			// 上传信息视频
			console.log(e);
			this.infoVideos = e;
			if (e != '') {
				this.vShow = true;
			}
		},
		getCityId(e) {
			let that = this;
			//获取经纬度
			let lat = [e.longitude, e.latitude];
			this.$Request
				.post(this.$api.msg.cityPosition, {
					user_id: this.user_id || '',
					// #ifdef APP-PLUS
					client_id: plus.device.uuid,
					// #endif
					cid: '',
					lat: lat
				})
				.then(res => {
					// console.log(res, '地址2')
					if (res.code == 1) {
						that.city_id = res.data.id;
					} else {
						that.$Common.toast('无法定位，请打开手机定位！！');
					}
				})
				.catch(err => {
					that.$Common.toast('无法定位，请打开手机定位！！');
				});
		},
		wechatLocation() {
			let that = this;
			this.$util.chooseLocation(this, function(location) {
				// 在onShow生命周期函数里会执行一次解析定位地址，因此此处需要重新赋值一下全局定位地址变量
				that.lon = location.longitude;
				that.lat = location.latitude;
				// that.$util.updateLocation([location.longitude, location.latitude], that);
				that.address = location.address;
				// console.log(location);
				that.getCityId({ longitude: location.longitude, latitude: location.latitude });
			});
		},
	}
};
</script>

<style></style>
