<!-- 我的简历 编辑资料 -->
<template>
	<view class="grace-body">
		<form @submit="formSubmit" class="grace-form grace-margin-top ">
			<view class=" cu-list menu sm-border padding pb100">
				<view class="cu-item  arrow">
					<view class="content justify-center" style="display: flex;align-items: center;">
						<view class="r_msg flex flex-sub justify-center align-center">
							<view class="demo-face grace-relative grace-img-in">
								<image @tap.stop="yulan(resumeInfo.head_img)" :src="resumeInfo.head_img"
								 mode="aspectFill"></image>
								<input type="text" name="head_img" :value="resumeInfo.head_img" class="hide" />
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item arrow padding-top">
					<view class="content align-center" style="display: flex;">
						<text class="text-df padding-right-sm">姓名</text>
						<input type="text" class="input" name="full_name" v-model="resumeInfo.full_name" placeholder="请输入姓名" disabled="true"
						 placeholder-style="font-size: 28rpx;" :placeholder-style="resumeInfo.full_name ? 'color:#666' : 'color:#BFBFBF'" />
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" style="display: flex;">
						<text class="text-df padding-right-sm">联系电话</text>
						<text :style="resumeInfo.mobile != '无' ? 'color:#666' : 'color:#BFBFBF'">{{ resumeInfo.mobile }}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" style="display: flex;">
						<text class="text-df padding-right-sm">性别</text>
						<text :style="sex[sexIndex] != '无' ? 'color:#666' : 'color:#BFBFBF'">{{ sex[sexIndex] }}</text>
					</view>
				</view>

				<view class="cu-item arrow">
					<view class="content" style="display: flex;">
						<text class="text-df padding-right-sm">生日</text>
						<view style="font-size: 32rpx;color: #BFBFBF;" :style="resumeInfo.birthday ? 'color: #666666;' : 'color: #BFBFBF;'">
							<input type="text" name="birthday" :value="resumeInfo.birthday" class="hide" />
							{{ resumeInfo.birthday || '无' }}
						</view>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" style="display: flex;">
						<text class="text-df padding-right-sm">现居住地</text>
						<view class="other" :style="resumeInfo.hometown ? 'color:#666' : 'color:#BFBFBF'">
							<input type="text" name="hometown" :value="resumeInfo.hometown" class="hide" />
							{{resumeInfo.hometown || '无' }}
						</view>
					</view>
				</view>
				<view class="bgc"></view>
				<view class="cu-item arrow  " style="width: 100%;">
					<view class="content align-center flex " style="width: 80%;">
						<text class="text-df padding-right-sm">期望行业职位</text>
						<view class="" :style="resumeInfo.want_find ? 'color:#666' : 'color:#BFBFBF'">
							{{ resumeInfo.want_find }} </view>
					</view>
				</view>
				<view class="ptb15  " style="width: 100%;">
					<view class=" align-center flex " style="width: 80%;">
						<text class="text-df padding-right-sm">职位类别</text>
						<view class="" :style="resumeInfo.station ? 'color:#666' : 'color:#BFBFBF'">
							{{ resumeInfo.station }} </view>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" style="display: flex;">
						<text class="text-df padding-right-sm">工作经验</text>
						<view class="other" :style="resumeInfo.work_experience ? 'color:#666666' : 'color:#BFBFBF'">
							{{ resumeInfo.work_experience  || '无' }}
						</view>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" style="display: flex;">
						<text class="text-df padding-right-sm">期望薪资</text>
						<view class="other" :style="resumeInfo.salary ? 'color:#666666' : 'color:#BFBFBF'">
							{{ resumeInfo.salary  || '无' }}
						</view>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" style="display: flex;">
						<text class="text-df padding-right-sm">最高学历</text>
						<view class="other" :style="resumeInfo.education ? 'color:#666666' : 'color:#BFBFBF'">
							{{ resumeInfo.education || '无' }}
							<input type="text" :value="resumeInfo.education || ''" name="education" class="hide" />
						</view>
					</view>
				</view>
				<view class="ptb15" v-if="resumeInfo.hobby!=''">
					<view class="">
						<text class="text-df ">个人爱好</text>
						<view class=" padding-top-sm" :style="resumeInfo.hobby ? 'color:#333' : 'color:#BFBFBF'">
							{{ resumeInfo.hobby || '无' }}
							<input type="text" :value="resumeInfo.hobby || ''" name="hobby" class="hide" />
						</view>
					</view>
				</view>
				<view class="ptb15" >
					<view class="">
						<text class="text-df ">自我描述</text>
						<view class=" padding-top-sm ewrap" :style="resumeInfo.personal_profile ? 'color:#333' : 'color:#BFBFBF'">
							{{ resumeInfo.personal_profile || '无' }}
						</view>
					</view>
				</view>
				<view class="margin-top  " v-if="resumeInfo.work_data!=''">
					<view class="flex justify-between">
						<view class=" text-bold text-md text-333 margin-bottom-sm">工作经历</view>
					</view>
					<view class="job_list">
						<view class="item padding-tb-sm" v-for="(item, index) in resumeInfo.work_data" :key="index">
							<view class="flex justify-between align-center">
								<text class="text-bold " style="font-size: 28upx;">{{ item.company_name }}</text>
								<text class="text-gray text-df">{{ item.start_time }}-{{ item.end_time }}</text>
							</view>
							<view class="text-gray  padding-tb-xs" style="font-size: 13px;">{{ item.station_name }}
							</view>
							<view class="text-gray text-df" style="word-wrap:break-word;word-break:break-all;">
								{{ item.job_description }}
							</view>
						</view>
					</view>
				</view>
				<view class="margin-top  " v-if="resumeInfo.education_data!=''">
					<view class="flex justify-between">
						<view class=" text-bold text-333 text-lg">教育经历</view>
					</view>
					<view class="job_list">
						<view class="item padding-tb-sm" v-for="(item, index) in resumeInfo.education_data" :key="index">
							<view class=" text-md flex justify-between align-center">
								<text class="text-bold">{{ item.school_name }}</text>
								<text class="text-df text-gray">{{ item.start_time }}-{{ item.end_time }}</text>
							</view>
							<view class="text-gray padding-tb-xs" style="font-size: 13px;">{{ item.major_name }}</view>
							<view class="text-gray text-df">{{ item.job_description }}</view>
						</view>
					</view>
				</view>
				<view class="padding-top" v-if="resumeInfo.life_photos_arr!=''">
					<view class="flex justify-between padding-bottom-xs">
						<view class=" text-bold text-333 text-lg">技能照片</view>
					</view>
					<view class="flex align-center flex-wrap">
						<view class="margin-right resumeImg" v-for="(item,index) in resumeInfo.life_photos_arr" :key='index'>
							<image :src="item.url" mode="" class="img-200" @tap="ViewImage(resumeInfo.life_photos_arr,index)"> </image>
						</view>
					</view>
					
				</view>
			</view>
			<view class="btn flex align-center bg-white justify-end fixed plr15 ">
				<view class="flex align-center   sevirce_btn" @tap="colloct_job">
					<text class=" text-gray cuIcon-favor" v-if="!job_collect" style="font-size: 21px;"></text>
					<text class=" text-gray cuIcon-favorfill new_theme" v-else style="font-size: 21px;"></text>
					<text class=" text-df pl5 ">收藏</text>
				</view>
				<view class="flex justify-center alcenter btn pl30 " @click="callUser">
					<image :src="IMG_URL + 'static/miniwechat/new/phone_icon.png'" mode="aspectFill" style=";width: 40upx;height: 40upx;"></image>
					<text class="pl5 text-df">电话沟通</text>
				</view>

			</view>
		</form>
		<w-picker :visible.sync="region" mode="region" value="" @confirm="addressConfirm" ref="region" themeColor="#2A89FF"></w-picker>
		<w-picker :visible.sync="address" mode="region" value="" @confirm="cityConfirm" ref="address" themeColor="#2A89FF"></w-picker>
		<!-- 生日 -->
		<w-picker :visible.sync="birthday" mode="date" @confirm="onConfirm($event,'date1')" ref="birthday" startYear="1900"
		 endYear="2050" value="2020-04-07" :current="true" fields="day" :disabled-after="true" themeColor="#2A89FF"></w-picker>
		<!-- 学历 -->
		<w-picker :visible.sync="degree" v-if="degree_list.length > 0" mode="selector" value="小学" :options="degree_list"
		 @confirm="degreeConfirm" ref="degree" themeColor="#2A89FF"></w-picker>
		<!-- 经验 -->
		<w-picker :visible.sync="experience" v-if="experienceList.length > 0" mode="selector" value="无经验" :options="experienceList"
		 @confirm="experienceConfirm" ref="experience" themeColor="#2A89FF"></w-picker>
		<!--  -->
		<w-picker mode="date" :visible.sync="range" startYear="2000" endYear="2040" value="2020-04-08" fields="day" :current="true"
		 :disabled-after="true" @confirm="onConfirm($event,'date2')" ref="range" themeColor="#2A89FF"></w-picker>
	</view>
</template>
<script>
	import wPicker from '@/components/w-picker/w-picker.vue';
	import benUpload from '@/components/ben-upload/ben-upload.vue';
	const Checker = require('@/common/js/formValidation.js');
	import {
		experience
	} from '@/common/js/mockData.js';
	export default {
		data() {
			return {
				experienceList: experience, //经验列表
				experience_act: '', //选择的经验
				sexIndex: 1, //性别
				experience: false, //经验
				sex: ['请选择', '男', '女'],
				dateValue: '', //生日
				user: {}, //绑定用户信息
				city: '', //城市
				hometown: '', //用户地址
				city1: null, //选择的地址信息
				user_type: 1, //绑定用户的类型
				edittype: 1, //1个人信息编辑，2我的简历编辑
				degree: false, //学历
				IMG_URL:this.IMG_URL,
				degree_list: [], //学位列表
				degree_act: '', //选中的学位
				isopen: true, //跳转页面
				uploadpic: false, //上传头像展示
				jobDate: '', //参加工作年份
				range: false, //工作年份
				iwant: [], //我想找
				ido: [], //我做过
				liveImg: [], //生活照列表
				life_photos: [], //生活照传参
				skillImg: [], //学历/技能图片列表
				skill_certificate: [], //学历/技能图片传参
				jobList: [], //工作经历列表
				teachList: [], //教育经历列表
				region: false, //地区选择
				address: false, //工作地址选择
				birthday: false, //生日
				defaultpic: false, //是否展示图片
				cert_status: 100, //用户实名认证状态
				jobAddress: '', //工作地址
				resume_id: '', //简历id
				resumeInfo: '', //简历信息
				job_collect: false, //收藏职位
				type:'',//判断是收藏的简历还是首页的简历
			};
		},
		onLoad(option) {
			this.edittype = option.edittype;
			this.type = option.type;
			this.resume_id = option.resume_id;
			this.getinfo(); //获取用户信息

			this.defaultpic = true;
			// this.uploadpic=true

		},
		onUnload() {

		},
		onShow() {},
		methods: {
			colloct_job() { //收藏职位
				if (!uni.getStorageSync('userToken')) {
					this.$Common.toast('请先登录')
					return
				}
				this.$Request
					.post(this.$api.company.set_collection, {
						collect_id: this.resumeInfo.aid, //收藏对象的id type=1 collect_id 公司id type=2 职位id type=3:兼职任务网约工id
						type: 5, //1：收藏公司 t2：职位 3:收藏兼职任务  5 收藏简历
					})
					.then(res => {

						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						if (res.code == 1) {
							// uni.$emit('myCollect',{})
							this.job_collect = !this.job_collect
						} else {}
					});
			},

			getinfo: function() {
				//获取报名人信息
				this.$Request.post(this.$api.user.getResume_detail, {
					resume_id: this.resume_id,
					type:this.type
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						this.resumeInfo = res.data.resume
						this.sexIndex=res.data.resume.sex
						if (res.data.resume.is_collection == 1) {
							this.job_collect = true
						} else {
							this.job_collect = false
						}
					} else {
						this.$Common.toast(res.msg);
					}
				});
			},
			ViewImage(url,index){
				let list=[]
				url.map(item=>{
					list.push(item.url)
				})
				this.$Common.lookImg(list, index)
			},
			callUser() {
				uni.makePhoneCall({
					phoneNumber: this.resumeInfo.mobile
				})
			},

			goyulan() {
				//跳转简历预览

				uni.navigateTo({
					url: '../../pagescommon/yingpin_detail'
				});
			}
		},

		components: {
			wPicker,
			benUpload
		}
	};
</script>
<style lang="scss">
	.active {
		background-color: #f27b04 !important;
		color: #fff !important;
		margin-top: -9upx;
	}

	page {
		background-color: #fff;
	}

	.biaoqian {
		background-color: #ebefee;
		padding: 10rpx 10rpx;
		border-radius: 10rpx;
		font-size: 20rpx;
		margin-right: 16rpx;
		margin-top: 14upx;
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

	// .biaoqian:last-child {
	// 	margin-right: 0;
	// }
	.bgc {
		width: 100%;
		height: 20rpx;
		background-color: #f9f9f9;
	}

	.cu-list.menu>.cu-item {
		min-height: 110rpx;
		font-size: 28rpx;
	}

	.cu-list.menu>.cu-item.arrow:nth-child(2):before {
		content: '';
	}

	.cu-list.menu>.cu-item.arrow:nth-child(2) .content {
		margin-right: 0upx;
	}


	.cu-list.menu>.cu-item:nth-child(9):after {
		border-bottom: 0;
	}

	.demo text {
		margin: 10upx;
	}

	.demo-face {
		width: 200rpx;
		height: 200rpx;
	}

	.demo-face image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
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

	.cu-list.menu>.cu-item {
		padding: 0;
	}

	.cu-list.menu>.cu-item:after {
		border-bottom: 0;
	}
	.resumeImg:nth-child(3n){
		margin-right: 0;
	}

	.cu-list.menu>.cu-item.arrow:before {
		right: 0;
		content: '';
	}

	.cu-list.menu>.cu-item .content {
		margin-right: 0;
	}

	.fixed {
		position: fixed;
		bottom: 0;
		width: 100%;

	}

	.content {
		padding: 0;
	}
</style>
