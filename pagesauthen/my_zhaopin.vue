<template>
	<!-- 招聘者提交个人信息 -->
	<view class="grace-body">
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="head_list cu-list menu sm-border">
				<view class="cu-item  arrow">
					<view class="content" style="display: flex;justify-content: space-between;align-items: center;" @tap="upload">
						<text class="text-df">头像</text>
						<text class="text-right" style="color:#BFBFBF;margin-left: 110upx;font-size: 24upx;" v-if="!user.head_img">上传真实照片可提高招聘成功率</text>
						<view class="demo-face grace-relative grace-img-in">
							<image @tap.stop="yulan(user.head_img)" :src="user.head_img ? user.head_img : IMG_URL + 'static/miniwechat/head_null.png'" mode="aspectFill" ></image>
							<input type="text" name="head_img" :value="user.head_img" class="hide" />
						</view>
					</view>
				</view>

				<view class="cu-item arrow">
					<view class="content" style="display: flex;justify-content: space-between;">
						<text class="text-df">姓名</text>
						<input
							type="text"
							class="input"
							name="full_name"
							v-model="user.full_name"
							placeholder="请输入姓名"
							@input="nickname(user.full_name)"
							@blur='nickblur(user.full_name)'
							placeholder-style="font-size: 28rpx;"
							style="text-align: right;"
							:placeholder-style="user.full_name ? 'color:#666666' : 'color:#BFBFBF'"
						/>
					</view>
				</view>

				<view class="cu-item arrow">
					<view class="content" style="display: flex;justify-content: space-between;">
						<text class="text-df">性别</text>
						<picker @change="bindPickerChange" :value="sexIndex" :range="sex" name="sex">
							<text :style="sex[sexIndex] != '请选择性别' ? 'color:#666666' : 'color:#BFBFBF'">{{ sex[sexIndex] }}</text>
						</picker>
					</view>
				</view>

				<view class="cu-item arrow">
					<view class="content" style="display: flex;justify-content: space-between;">
						<text class="text-df">手机号</text>
						<view class="other">
							<input type="text" name="phone" :value="phone" class="hide" :style="phone ? 'color:#666666' : 'color:#BFBFBF'" />
							{{ user.mobile }}
						</view>
					</view>
				</view>
				<!-- <view class="bgc"></view> -->
				<view class="cu-item arrow">
					<view class="content align-center" style="display: flex;justify-content: space-between;">
						<text class="text-df">我所在的公司名称</text>
						<input
							type="text"
							class="input"
							name="company_name"
							v-model="company_name"
							placeholder="请输入公司名称"
							placeholder-style="font-size: 28rpx;"
							style="text-align: right;flex: 1;margin-left: 10upx;"
							:placeholder-style="company_name ? 'color:#666666' : 'color:#BFBFBF'"
						/>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content flex align-center" @tap="selectFuli('changeFuli')">
						<text class="text-df">公司福利</text>
						<view class="flex flex-wrap align-center justify-end" style="flex: 1;margin-left: 10upx;">
							<text v-if="fuli.length == 0" class="text-md" :style="fuli.welfare_name ? 'color:#666666' : 'color:#BFBFBF'">请选择福利标签</text>
							<view class="biaoqian active" v-for="(item, index) in fuli" :key="index">
								{{ item.welfare_name }}
								<image @tap.stop="delJob(fuli, index)" :src="IMG_URL + 'static/miniwechat/cha.png'" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item arrow">
					<view @tap="getLocation" class="content align-center" style="display: flex;justify-content: space-between;">
						<text class="text-md">公司地址</text>
						<text class="text-gray" v-if="!company_address">请选择地址</text>
						<text v-else class="padding-left-sm text-black" style="flex: 1;">{{ company_address }}</text>
					</view>
				</view>
			</view>
			<button class="btn_next round" form-type="submit" style="width: 686upx;margin-top: 260upx;">完成</button>
		</form>
	</view>
</template>
<script>
import { scale_list } from '@/common/js/mockData.js';
const Checker = require('@/common/js/formValidation.js');
export default {
	data() {
		return {
			sexIndex: 0, //性别
			sex: ['请选择性别', '男', '女'],
			user: [], //绑定用户信息
			user_type: 2, //绑定用户的类型 1=应聘者  2=招聘者
			phone: '', //手机号
			city1: null, //选择的地址信息
			IMG_URL:this.IMG_URL,
			company_name: '', //公司名称
			fuli: [], //选择的公司福利
			company_address: '', //公司地址
			lon: '', //经度
			lat: '' //维度
		};
	},
	onLoad(option) {
		this.getinfo(); //获取用户信息
		let avatar = option.avatar;
		if (avatar) {
			this.user.head_img = avatar;
		}

		// 监听上传头像
		uni.$on('upHeadImg', data => {
			console.log(data, '监听图片修改参数');
			this.user.head_img = data.avatar;
			this.$forceUpdate(); //强制全局刷新
		});

		// 监听选择公司福利
		uni.$on('changeFuli', data => {
			console.log(data, '监听选择公司福利');
			this.fuli = data.arr;
			console.log(this.fuli);
		});
	},
	onUnload() {
		uni.$off('upHeadImg');
		uni.$off('changeFuli');
	},
	methods: {
		yulan(pic){
			this.$Common.lookImg(pic)
		},
		nickname(name){//验证姓名长度
			if(name.length>6){
				this.$Common.toast('姓名不能超过六个字符')
			}
			
		},
		nickblur(name){//姓名输入失去焦点
			if(name.length<2){
				this.$Common.toast('姓名不能少于2个字符')
			}
		},
		selectFuli(type) {
			//选择福利

			uni.navigateTo({
				url: '../pagescommon/gongsi_fuli?&type=' + type
			});
		},
		toggleTab(who) {
			//显示选择组件
			this.$data[who] = true;
		},
		// binding() {
		// 	uni.removeStorageSync('wechatinfo');
		// 	uni.navigateTo({
		// 		url: '/pages/Applicant/bindphone'
		// 	});
		// },
		addressConfirm(val) {
			//选择家乡地址回调
			console.log('选择地址', val);
			this.hometown = val.checkArr.join('-');
			this.city1 = val;
		},
		bindPickerChange: function(e) {
			//性别选择回调
			this.sexIndex = e.detail.value;
		},

		getinfo: function() {
			//获取缓存内的用户信息
			this.user = uni.getStorageSync('USERINFO');
			console.log(this.user);
		},
		getLocation() {
			//获取定位
			let _this = this;
			uni.chooseLocation({
				success(res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					_this.company_address = res.address + ' ' + res.name;
					_this.lon = res.longitude;
					_this.lat = res.latitude;
					console.log('位置：' + _this.company_address);
				}
			});
		},
		upload() {
			//上传头像
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
		delJob(arr, index) {
			//删除选中的福利
			arr.splice(index, 1);
		},
		formSubmit: function(e) {
			//form提交
			console.log(e.detail.value);
			//定义表单规则
			var rule = [
				{
					name: 'head_img',
					rule: ['required'],
					msg: ['请上传头像']
				},
				{
					name: 'full_name',
					rule: ['required', 'minLength:2', 'maxLength:6'], //可使用区间，此处主要测试功能
					msg: ['请输入姓名', '姓名必须2个或以上字符', '姓名不能超过6个字符']
				},
				{
					name: 'sex',
					rule: ['required', 'range:[1,2]'],
					msg: ['请选择性别', '请选择性别']
				},
				{
					name: 'company_name',
					rule: ['required'],
					msg: ['请输入公司名称']
				},
				{
					name: 'welfare',
					rule: ['required'],
					msg: ['请选择公司福利']
				},
				{
					name: 'company_address',
					rule: ['required'],
					msg: ['请选择公司地址']
				}
			];
			//进行表单检查
			var formData = e.detail.value;
			// 添加自定义参数
			var fuli_arr = []; //职位
			this.fuli.map(item => {
				fuli_arr.push(item.aid);
			});
			formData.head_img = this.user.head_img;
			formData.phone = this.user.mobile;
			formData.welfare = fuli_arr.join(','); //福利
			formData.company_address = this.company_address; //公司地址
			formData.lon = this.lon;
			formData.lat = this.lat;
			formData.user_type = this.user_type;
			// 验证
			var checkRes = Checker.validation(formData, rule);
			console.log(checkRes);
			if (checkRes) {
				this.$Common.toast(checkRes);
				return false;
			}
			// 验证成功，提交
			this.$Request.post(this.$api.user.user_company, formData).then(res => {
				this.$Common.toast(res.msg);
				if (res.code == 1) {
					this.user.user_type=2
					uni.setStorageSync('USERINFO',this.user)
					uni.reLaunch({
						url: 'recruit_msg'
					});
				}
			});
		}
	},
};
</script>
<style lang="scss">
.active {
	background-color: #f27b04 !important;
	color: #fff !important;
}

page {
	background-color: #fff;
}

.biaoqian {
	padding: 10rpx 6rpx;
	background-color: #ebefee;
	border-radius: 10rpx;
	font-size: 28rpx;
	margin-top: 10rpx;
	margin-right: 4rpx;
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

.bgc {
	width: 100%;
	height: 20rpx;
	background-color: #f9f9f9;
}

.cu-list.menu > .cu-item {
	min-height: 110rpx;
	font-size: 28rpx;
}

.cu-list.menu > .cu-item:last-child:after {
	border-bottom: 1px solid #ddd;
}
.cu-list.menu > .cu-item.arrow:nth-child(2):before,
.cu-list.menu > .cu-item.arrow:nth-child(4):before,
.cu-list.menu > .cu-item.arrow:nth-child(5):before {
	content: '';
}
.cu-list.menu > .cu-item.arrow:nth-child(2),
.cu-list.menu > .cu-item.arrow:nth-child(4),
.cu-list.menu > .cu-item.arrow:nth-child(5) {
	padding-right: 28upx;
}
.demo text {
	margin: 10upx;
}

.demo-face {
	width: 100rpx;
	height: 100rpx;
}

.demo-face image {
	width: 100rpx;
	height: 100rpx;
	border-radius: 60rpx;
}

.picker {
	background: #00b26a;
	width: 100%;
	line-height: 40px;
}

.head_list {
	background: #fff;
	padding: 20rpx 0;
}

.btn {
	margin: 60rpx 32rpx 30rpx;
	width: 686rpx;
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
	background: linear-gradient(141deg, rgba(255, 163, 152, 1) 0%, rgba(250, 107, 90, 1) 100%);
	color: #fff;
	border-radius: 44rpx;
}
.selArr {
	padding: 36rpx 32rpx;
	border-bottom: 1rpx solid #eee;
}
</style>
