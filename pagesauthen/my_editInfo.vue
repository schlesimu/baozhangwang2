<!-- 我的简历 编辑资料 -->
<template>
	<view class=" padding solids-top">
		<form @submit="formSubmit" class=" ">
			<view class="head_list cu-list menu sm-border">
				<view class="cu-item arrow" @tap="upload">
					<view class="flex align-center justify-between pb10" style="width: 91%;">
						<view class="">
							<view style="font-size: 36upx;">头像</view>
							<view class="txt_alphe margin-top-sm" style="font-size: 12px;">上传真实头像求职成功率可以翻倍哦~</view>
						</view>
						<view class="head_bg" >
							<image @tap.stop="yulan(user.head_img)" :src="user.head_img ? user.head_img : IMG_URL + 'static/miniwechat/head_null.png'" mode="aspectFill"></image>
							<!-- <input type="text" value="" name='head_img ' /> -->
						</view>
					</view>
				</view>

				<view class="cu-item arrow">
					<view class="flex align-center justify-between " style="width: 100%;">
						<view class="" style="width: 100%;">
							<view class="text-gray margin-bottom-sm" style="font-size: 13px;">姓名</view>
							<view class="other" :style="nickname ? 'color:#333;font-weight: bold;' : 'color:#e5e5e5'">
								<input
									type="text"
									name="user_nickname"
									v-model="nickname"
									@input="nicknameInput(nickname)"
									@blur='nickblur(nickname)'
									placeholder="请输入姓名"
									:style="nickname ? 'color:#333;font-weight:bold' : 'color:#e5e5e5'"
									placeholder-style="color:#e5e5e5;"
								/>
								<!-- <input
									type="text"
									v-model="adress"
									name="user_address"
									placeholder="请输入住址"
									:style="adress ? 'color:#333;font-weight:bold' : 'color:#e5e5e5'"
									placeholder-style="color:#e5e5e5"
								/> -->
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item arrow" @tap="toggleTab('birthday')">
					<view class="flex align-center justify-between ">
						<view class="">
							<view class="text-gray margin-bottom-sm" style="font-size: 13px;">出生日期</view>
							<view style="font-size: 32rpx;" :style="dateValue ? 'color: #333;;font-weight: bold;' : 'color: #e5e5e5;'">
								<input type="text" name="birthday" :value="dateValue" class="hide" />
								{{ dateValue || '请选择年月日' }}
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="flex align-center justify-between " style="width: 100%;">
						<view class="text-gray margin-bottom-sm" style="font-size: 13px;">性别</view>
						<view class="flex align-center justify-start">
							<view class="sexTag" v-for="(item, index) in sex" :key="index" @tap="chooseSex(item, index)" :class="sexIndex == item.value ? 'active' : ''">
								{{ item.label }}
								<!-- <input type="text" value="" name='sex' /> -->
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item arrow" @tap="toggleTab('region')">
					<view class="flex align-center justify-between ">
						<view class="">
							<view class="text-gray margin-bottom-sm" style="font-size: 13px;">现居住地</view>
							<view class="other" :style="hometown ? 'color:#333;font-weight: bold;' : 'color:#e5e5e5'">
								<input type="text" name="hometown" :value="hometown" class="hide" />
								{{ hometown || '请选择家乡' }}
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="flex align-center justify-between ">
						<view class="">
							<view class="text-gray margin-bottom-sm" style="font-size: 13px;">手机号码</view>
							<view class="other" :style="phone ? 'color:#333;font-weight: bold;' : 'color:#e5e5e5'">
								<input
									type="number"
									v-model="phone"
									name="phone"
									placeholder="请输入手机号"
									disabled
									:style="phone ? 'color:#333;font-weight:bold' : 'color:#e5e5e5'"
									placeholder-style="color:#e5e5e5"
								/>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item arrow" @tap='goPage'>
					<view class="flex align-center justify-between " style="width: 100%;">
							<view class="bold " >上传身份认证</view>
							<view class="mr20 f24 text-blue">{{is_certified_name}}</view>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="flex align-center justify-between " style="width: 100%;">
						<view class="" style="width: 100%;">
							<view class="text-gray margin-bottom-sm" style="font-size: 13px;">住址</view>
							<view class="other" :style="adress ? 'color:#333;font-weight: bold;' : 'color:#e5e5e5'">
								<input
									type="text"
									v-model="adress"
									name="user_address"
									placeholder="请输入住址"
									:style="adress ? 'color:#333;font-weight:bold' : 'color:#e5e5e5'"
									placeholder-style="color:#e5e5e5"
								/>
							</view>
						</view>
					</view>
				</view>
				<view >
					<button class="btn_next bg_deep" style="height: 88upx;margin-bottom: 80upx;" form-type="submit" >保存</button>
				</view>
			</view>
		</form>
		<w-picker :visible.sync="region" mode="region" @confirm="addressConfirm" ref="region" themeColor="#2A89FF"></w-picker>
		<!-- 生日 -->
		<w-picker
			:visible.sync="birthday"
			mode="date"
			@confirm="birthdayConfirm"
			ref="birthday"
			startYear="1970"
			endYear="2070"
			value="2020-04-07"
			:current="true"
			:disabled-after='true'
			fields="day"
			themeColor="#2A89FF"
		></w-picker>
		<w-picker mode="range" :visible.sync="range" startYear="2000" endYear="2040" :current="false" @confirm="onConfirm" ref="range" themeColor="#2A89FF"></w-picker>
	</view>
</template>
<script>
import wPicker from '@/components/w-picker/w-picker.vue';
import benUpload from '@/components/ben-upload/ben-upload.vue';
const Checker = require('@/common/js/formValidation.js');
export default {
	components: {
		wPicker,
		benUpload
	},
	data() {
		return {
			sexIndex: 1, //性别
			sex: [
				{
					value: 1,
					label: '男'
				},
				{
					value: 2,
					label: '女'
				}
			],
			IMG_URL:this.IMG_URL,
			dateValue: 0, //生日
			user: {}, //绑定用户信息
			hometown: '', //用户地址
			city1: null, //选择的地址信息
			user_type: 1, //绑定用户的类型
			nickname:'',//姓名
			edittype: 1, //1个人信息编辑，2我的简历编辑
			degree: false, //学历
			degree_list: [], //学位列表
			degree_act: '', //选中的学位
			uploadpic: false, //上传头像展示
			jobDate: '', //参加工作年份
			phone: '', //手机号码
			adress: '', //地址
			range: false, //工作年份
			region: false, //地区选择
			birthday: false ,//生日
			is_certified:'',//身份认证
			is_certified_name:'',//身份认证
		};
	},
	onLoad(option) {
		this.edittype = option.edittype;
		this.getinfo(); //获取用户信息
		let avatar = option.avatar;
		if (avatar) {
			this.user.head_img = avatar;
		}
		if (this.user.address) {
			this.name = this.user.address;
		}
		this.phone = uni.getStorageSync('USERINFO').mobile
		// this.uploadpic=true
		// 监听上传头像
		uni.$on('upHeadImg', data => {
			console.log(data, '监听图片修改参数');
			this.user.head_img = data.avatar;
			this.$forceUpdate(); //强制全局刷新
		});
		uni.$on('online_authen',()=>{
			// this.getinfo(); //获取用户信息
			this.is_certified_name='待审核'
			this.is_certified=1
		})
		// console.log(this.nickname);
	},
	onUnload() {
		uni.$off('upHeadImg');
		uni.$off('online_authen');
	},

	methods: {
		toPath(path) {
			//跳转路径
			uni.navigateTo({
				url: path
			});
		},
		nicknameInput(name) {
			//验证姓名长度
			if (name&&name.length > 12) {
				this.$Common.toast('姓名不能超过12个字符');
			}
		},
			
		goPage(){
			if(this.is_certified==0||this.is_certified==3){
				uni.navigateTo({
					url:'../pagescenter/userypz/online_authencation?is_reset='+this.is_certified
				})
			}
			
		},
		nickblur(name) {
			//姓名输入失去焦点
			if (name&&name.length < 2) {
				this.$Common.toast('姓名不能少于2个字符');
			}
		},
		toggleTab(who) {
			//显示选择组件
			this.$data[who] = true;
		},
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
		yulan(pic) {
			//头像预览
			if (!pic) {
				this.upload();
				return;
			}
			this.$Common.lookImg(pic);
		},
		addressConfirm(val) {
			//选择地址回调
			console.log('选择地址', val);
			this.hometown = val.obj.province.label + '-' + val.obj.city.label + '-' + val.obj.area.label;
		},
		chooseSex(item, index) {
			//选择性别
			this.sexIndex = item.value;
		},
		
		onConfirm(e) {
			//选择工作时间段
			console.log(e);
			this.start_time = e.obj.fyear + '.' + e.obj.fmonth;
			this.end_time = e.obj.tyear + '.' + e.obj.tmonth;
			this.jobDate = e.result;
		},
		birthdayConfirm: function(val) {
			//生日选择回调
			this.dateValue = val.result;
		},
		getinfo: function() {
			//获取用户信息
			this.$Request.post(this.$api.user.get_user_info).then(res => {
				console.log(res, '用户信息');
				if (res.code == 1) {
					this.user.head_img = res.data.head_img;
					this.nickname = res.data.user_name;
					console.log(this.nickname);
					this.sexIndex = res.data.sex;
					this.dateValue = res.data.birthday || '';
					this.hometown = res.data.hometown || '';
					this.adress=res.data.user_address
					this.phone=res.data.mobile
					this.is_certified_name=res.data.is_certified_name
					this.is_certified=res.data.is_certified
				} else {
					this.$Common.toast(res.msg);
				}
			});
		},

		formSubmit: function(e) {
			//form提交
			console.log(e.detail.value);
			//定义表单规则
			var rule = [
				{
					name: 'head_img',
					rule: ['required'],
					msg: ['请选择头像']
				},{
					name: 'user_nickname',
					rule: ['required', 'minLength:2', 'maxLength:12'], //可使用区间，此处主要测试功能
					msg: ['请输入姓名', '姓名必须2个或以上字符', '姓名不能超过12个字符']
				},{
					name: 'birthday',
					rule: ['required', 'isDate'],
					msg: ['请选择生日', '请选择生日']
				},
				{
					name: 'hometown',
					rule: ['required'],
					msg: ['请选择现居住地']
				},
				{
					name: 'phone',
					rule: ['required'],
					msg: ['请输入手机号']
				},
				{
					name:'user_address',
					rule: ['required'],
					msg: ['请输入住址']
				}
			];
			//进行表单检查
			var formData=e.detail.value
			formData.head_img = this.user.head_img;
			// formData.user_type = this.user_type;
			formData.hometown = this.hometown;
			formData.sex = this.sexIndex;
			// 验证
			var checkRes = Checker.validation(formData, rule);
			if (checkRes) {
				this.$Common.toast(checkRes);
				return false;
			}
			// 验证成功，提交  edit_user_info
			this.$Request.post(this.$api.user.edit_user_info, formData).then(res => {
				this.$Common.toast(res.msg);
				if (res.code == 1) {
					uni.$emit('change', { msg: 1 });
					let userinfo=uni.getStorageSync('USERINFO')
					console.log(userinfo);
					userinfo.head_img=res.data.userinfo.head_img
					userinfo.user_nickname=res.data.userinfo.user_nickname
					uni.setStorageSync("USERINFO",userinfo)
					setTimeout(() => {
						uni.navigateBack({});
					}, 1000);
				}
			});
		}
	},
	
};
</script>
<style lang="scss">
page {
	background-color: #fff;
	height: 100% !important;
}
.head_bg {
	background-color: #eeeeee;
	width: 136upx;
	height: 136upx;
	border-radius: 50%;
	overflow: hidden;
	image {
		width: 100%;
		height: 100%;
	}
}
.sexTag {
	width: 148upx;
	height: 65upx;
	border: 1px solid #e6e6e6;
	text-align: center;
	line-height: 65upx;
	color: #666;
	font-size: 24upx;
	margin-right: 20upx;
}
.cu-list.menu > .cu-item:nth-child(6){
	margin-bottom: 0;
}
.active {
	border: 1px solid #1b90ff;
	color: #1b90ff;
	background-color: #ecf6ff;
}
.cu-list.menu > .cu-item {
	min-height: 110rpx;
	font-size: 28rpx;
	margin-bottom: 40upx;
	padding: 20upx 30upx;
}

.cu-list.menu > .cu-item.arrow:nth-child(2n):before
 {
	content: '';
}

.cu-list.menu > .cu-item:nth-child(9):after {
	border-bottom: 0;
}
.cu-list.menu > .cu-item.arrow {
	padding: 0;
	min-height: 120upx;
}
.cu-list.menu>.cu-item.arrow:before{
	right: 0;
}
.cu-list.menu > .cu-item.arrow:before {
	top: 58upx;
	opacity: 0.6;
}
.cu-list.menu > .cu-item.arrow:nth-child(1):before,
.cu-list.menu > .cu-item.arrow:nth-child(7):before{
	top: 0;
}
.cu-list.menu.sm-border>.cu-item:after{
	width: 200%!important;
	left: 0;
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
	border-radius: 50%;
}

.picker {
	background: #00b26a;
	width: 100%;
	line-height: 40px;
}

.head_list {
	background: #fff;
}

.btn {
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
}
.selArr {
	padding: 36rpx 32rpx;
}

.addImg {
	width: 34rpx;
	height: 34rpx;
}
</style>
