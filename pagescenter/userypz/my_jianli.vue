<!-- 我的简历 编辑资料 -->
<template>
	<view class="">
		<view class="cu-custom bg-white" :style="[{height: CustomBar+'px'}]">
			<view class="cu-bar fixed  bg-white" :style="{height: CustomBar+'px',paddingTop: StatusBar+'px'}">
				<view class="action" @tap="isback">
					<text class="cuIcon-back "></text>
				</view>
				<view class="content f32" :style="{top:StatusBar + 'px'}">我的简历</view>
				<!-- <view class="" :style="{top:StatusBar + 'px'}" style="z-index: 100000;">
					#ifndef MP-WEIXIN
					<text class="text-sm padding txt-theme" @tap="updateList">刷新</text>
					#endif
					#ifdef MP-WEIXIN
					<text class="text-sm  txt-theme" @tap="updateList">刷新</text>
					#endif
				</view> -->
			</view>
		</view>
		<view class="grace-body ">
			<form @submit="formSubmit" class="grace-form grace-margin-top ">
				<view class=" cu-list menu sm-border margin-lr ">
					<view class="w100 justify-center flex-direction" style="display: flex;align-items: center;"
						@tap="upload">
						<view class="demo-face  ">
							<image @tap.stop="yulan(user.head_imgs)"
								:src="user.head_imgs ? user.head_imgs : IMG_URL + 'static/miniwechat/logo.png'"
								mode="aspectFill"></image>
						</view>
						<text class="text-999 padding-top-xs text-df" style="color: #999;">编辑头像</text>
					</view>
					<view class="flex align-center justify-between ptb10">
						<view class=" flex align-center" style="width: 50%;">
							<text class="text-lg flex_shrink padding-right-sm"><text class="text-red  text-xl">*</text>
								姓名</text>
							<input type="text" class="input" name="full_name" v-model="user.full_name"
								placeholder="请输入姓名" @input="nickname(user.full_name)" @blur="nickblur(user.full_name)"
								placeholder-style="font-size: 28rpx;"
								:placeholder-style="user.full_name ? 'color:#666' : 'color:#BFBFBF'" />
						</view>
						<view class="sexTag" v-for="(item, index) in sex" :key="index" @tap="chooseSex(item, index)"
							:class="sexIndex == item.value ? 'active' : ''">
							{{ item.label }}
						</view>
					</view>
					<view class="flex align-center justify-between ptb10">
						<view class=" " @tap="toggleTab('birthday')">
							<view class="content flex-direction justify-center align-center" style="display: flex">
								<text class="text-lg"><text class="text-red  text-xl">*</text>出生年月日</text>
								<view style="font-size: 32rpx;color: #BFBFBF;"
									:style="dateValue ? 'color: #666666;' : 'color: #BFBFBF;'">
									<input type="text" name="birthday" :value="dateValue" class="hide" />
									{{ dateValue || '请选择' }}
								</view>
							</view>
						</view>
						<view class="solid-right " style="height: 100upx;width: 2upx;"></view>
						<view class="">
							<view class="content flex-direction justify-center align-center" style="display: flex"
								@tap="toggleTab('salaryS')">
								<text class="text-lg"><text class="text-red  text-xl">*</text> 期望薪资</text>
								<view class="other" :style="salary ? 'color:#666666' : 'color:#BFBFBF'">
									{{ salary  || '请选择' }}
									<input type="text" :value="salary || ''" name="salary" class="hide" />
								</view>
							</view>
						</view>
						<view class="solid-right " style="height: 100upx;width: 2upx;"></view>
						<view class=" ">
							<view class="content flex-direction justify-center align-center" style="display: flex"
								@tap="toggleTab('experience')">
								<text class="text-lg"><text class="text-red  text-xl">*</text> 工作经验</text>
								<view class="other" :style="experience_act ? 'color:#666666' : 'color:#BFBFBF'">
									{{ experience_act  || '请选择' }}
									<input type="text" :value="experience_act || ''" class="hide" />
								</view>
							</view>
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content" style="display: flex;justify-content: space-between;"
							@tap="toggleTab('region')">
							<text class="text-lg"><text class="text-red  text-xl">*</text> 期望工作地</text>
							<view class="other" :style="hometown ? 'color:#666' : 'color:#BFBFBF'">
								<input type="text" name="hometown" :value="hometown" class="hide" />
								{{ hometown || '请选择地址' }}
							</view>
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content" style="display: flex;justify-content: space-between;">
							<text class="text-lg"> <text class="text-red  text-xl">*</text> 联系电话</text>
							<input type="number" maxlength="11" class="input" name="mobile" v-model="phone"
								placeholder="请输入" placeholder-style="font-size: 28rpx;" style="text-align: right;"
								:placeholder-style="phone ? 'color:#666' : 'color:#BFBFBF'" />
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content" style="display: flex;justify-content: space-between;">
							<text class="text-lg"><text class="text-red  text-xl">*</text> 期望行业职位</text>
							<input type="text" class="input" name="JobType" v-model="JobType" placeholder="请输入期望行业职位"
								placeholder-style="font-size: 28rpx;" style="text-align: right;"
								:placeholder-style="JobType ? 'color:#666' : 'color:#BFBFBF'" />
						</view>
					</view>
					<view class="cu-item arrow  " @tap="goSelectJob('iwant')" style="width: 100%;">
						<view class="content align-center flex justify-between" style="width: 80%;">
							<text class="text-lg" style="margin-right: 10upx;flex-shrink: 0"><text
									class="text-red  text-xl">*</text>
								职位类别</text>
							<view class=" text-right flex" style="overflow-x: scroll; white-space: nowrap;">
								<view v-if="!(iwant && iwant.station_name)" class="text-gray"
									style="margin-left: 248upx;margin-top: -9upx;">请选择</view>
								<!-- <view v-else  > -->
								<view class=" " :style="iwant.station_name ? 'color:#666' : 'color:#BFBFBF'">
									{{ iwant.station_name }}
									<!-- <image @tap.stop="delJob(iwant, index)" :src="IMG_URL + 'static/miniwechat/cha.png'" mode=""></image> -->
								</view>
							</view>
						</view>
					</view>



					<view class="cu-item arrow">
						<view class="content" style="display: flex;justify-content: space-between;"
							@tap="toggleTab('degree')">
							<text class="text-lg"><text class="text-red  text-xl">*</text> 最高学历</text>
							<view class="other" :style="degree_act.label ? 'color:#666666' : 'color:#BFBFBF'">
								{{ degree_act.label || '请选择' }}
								<input type="text" :value="degree_act.id || ''" class="hide" />
							</view>
						</view>
					</view>
					<view class="pt10 mt10">
						<view class="   " style=" ">
							<view class="text-lg margin-bottom">个人爱好（选填）</view>
							<view class="areabox text-lg bg-f2f3 radius-16 padding" style="height: 170upx;">
								<textarea placeholder="请输入" maxlength="150"
									style="width: 100%;height: 150upx;line-height: 1.5"
									:style="myLike ? 'color:#333;font-weight:bold' : 'color:#999'" v-model="myLike"
									placeholder-style="font-size:32upx;color:#999" />
							</view>
						</view>
					</view>
					<view class="pt10 mt10">
						<view class="   " style=" ">
							<view class="text-lg margin-bottom"><text class="text-red  text-xl">*</text> 自我描述</view>
							<view class="areabox text-lg bg-f2f3 radius-16 padding" style="height: 379upx;">
								<textarea placeholder="简单描述您的专业技能/项目经历/职业优势等" maxlength="1500"
									style="width: 100%;height: 300upx;line-height: 1.5"
									:style="myDescribution ? 'color:#333;font-weight:bold' : 'color:#999'"
									v-model="myDescribution" placeholder-style="font-size:32upx;color:#999" />
								<view class="text-gray txtnum"
									:class="myDescribution && myDescribution.length == 1500 ? 'text-red' : 'text-gray'">
									{{ (myDescribution && myDescribution.length) || 0 }}/1500
								</view>
							</view>
						</view>
					</view>
					<view class="margin-top bg-white ">
						<view class="flex justify-between">
							<view class="text-333 text-bold text-md margin-bottom-sm">就职经历</view>
							<view @tap="toPath('../../pagesauthen/work_jingli')" class="add">
								<text class="cuIcon-roundadd text-lg"></text>
								<!-- <image class="addImg" :src="IMG_URL + 'static/miniwechat/my/icon-add.png'" mode=""></image> -->
							</view>
						</view>
						<view class="job_list">
							<view class="item padding-tb-sm" v-for="(item, index) in experienceInfo" :key="index">
								<view class="flex justify-between align-center">
									<text class="text-bold " style="font-size: 28upx;">{{ item.company_name||'' }}</text>
									<view class=" text-lg">
										<text class="text-999 cuIcon-delete" @tap='deletItem(2,item)'></text>
										<text class="txt-theme cuIcon-edit padding-left" @tap='editItem(2,item)'></text>
									</view>
								</view>
								<view class="text-gray text-df">{{ item.start_time }}-{{ item.end_time }}</view>
								<view class="text-gray  padding-tb-xs" style="font-size: 13px;">{{ item.position }}
								</view>
								<view class="text-gray text-df" style="word-wrap:break-word;word-break:break-all;">
									{{ item.job_description }}
								</view>
							</view>
						</view>
					</view>
					<view class="margin-top bg-white ">
						<view class="flex justify-between">
							<view class="text-333 text-bold text-lg">教育经历</view>
							<view @tap="toPath('../../pagesauthen/experience')" class="add">
								<text class="cuIcon-roundadd text-lg"></text>
								<!-- <image class="addImg" :src="IMG_URL + 'static/miniwechat/my/icon-add.png'" mode=""></image> -->
							</view>
						</view>
						<view class="job_list">
							<view class="item padding-tb-sm" v-for="(item, index) in educationInfo" :key="index">
								<view class=" text-md flex justify-between align-center">
									<text class="text-bold">{{ item.school_name }}  ({{item.education_name}})</text>
									<view class=" text-lg">
										<text class="text-999 cuIcon-delete" @tap='deletItem(1,item)'></text>
										<text class="txt-theme cuIcon-edit padding-left" @tap='editItem(1,item)'></text>
									</view>
								</view>
								<view class="text-df text-gray">{{ item.start_time }}-{{ item.end_time }}</view>
								<view class="text-gray padding-tb-xs" style="font-size: 13px;">{{ item.major_name }}
								</view>
								<view class="text-gray text-df">{{ item.job_description }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class=" bg-white margin-top margin-lr padding-bottom-sm">
					<view class=" text-333 text-bold" style="letter-spacing: 2upx;">学历/技能证书</view>
				</view>
				<ben-upload v-if="defaultpic" :col="4" :max="9" @change="skillImgLive" :defaultList="skillImg"
					:uShow='uShow'></ben-upload>
				<view class="  plr10 padding-bottom">
					<button class="btn_next round " style="margin-bottom: 20upx;margin-top: 30upx;"
						form-type="submit">保存</button>
					<button class="btn_next round " style="margin-bottom: 20upx;margin-top: 30upx;" @tap="updateList"
						v-if="user.head_imgs">刷新简历</button>
					<button class="btn_next round " style="margin-bottom: 20upx;margin-top: 30upx;"
						@click="setResumeStatus" v-if="user.head_imgs">{{isOpen? '开启简历':'关闭简历'}}</button>
				</view>
			</form>
			<w-picker :visible.sync="region" mode="region" value="" @confirm="addressConfirm" ref="region"
				themeColor="#2A89FF"></w-picker>
			<w-picker :visible.sync="address" mode="region" value="" @confirm="cityConfirm" ref="address"
				themeColor="#2A89FF"></w-picker>
			<!-- 生日 -->
			<w-picker :visible.sync="birthday" mode="date" @confirm="onConfirm($event,'date1')" ref="birthday"
				startYear="1900" endYear="2050" value="2020-04-07" :current="true" fields="day" :disabled-after="true"
				themeColor="#2A89FF"></w-picker>
			<!-- 学历 -->
			<w-picker :visible.sync="degree" v-if="degree_list" mode="selector" value="小学" :options="degree_list"
				@confirm="degreeConfirm" ref="degree" themeColor="#2A89FF"></w-picker>
			<!-- 经验 -->
			<w-picker :visible.sync="experience" v-if="experienceList" mode="selector" value="无经验"
				:options="experienceList" @confirm="experienceConfirm" ref="experience" themeColor="#2A89FF"></w-picker>
			<!-- 薪资-->
			<w-picker :visible.sync="salaryS" v-if="salaryList" mode="selector" value="薪资面议" :options="salaryList"
				@confirm="salaryConfirm" ref="salaryS" themeColor="#2A89FF"></w-picker>
		</view>
	</view>
</template>
<script>
	import wPicker from '@/components/w-picker/w-picker.vue';
	import benUpload from '@/components/ben-upload/ben-upload.vue';
	const Checker = require('@/common/js/formValidation.js');
	import {
		experience1
	} from '@/common/js/mockData.js';
	export default {
		components: {
			benUpload
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				StatusBar: this.StatusBar,
				IMG_URL:this.IMG_URL,
				experienceList: experience1, //经验列表
				experience_act: '', //选择的经验
				salaryList: [], //薪资列表
				salary: '', //选择的薪资
				sexIndex: 1, //性别
				experience: false, //经验
				isOpen: false, //开启  关闭简历
				uShow: false, //图片上传成功在展示
				sex: [{
						value: 1,
						label: '男'
					},
					{
						value: 2,
						label: '女'
					}
				],
				salaryS: false, //薪资
				dateValue: '', //生日
				user: {}, //绑定用户信息
				city: '', //城市
				hometown: '', //用户地址
				city1: null, //选择的地址信息
				user_type: 1, //绑定用户的类型
				edittype: 1, //1个人信息编辑，2我的简历编辑
				degree: false, //学历
				degree_list: [], //学位列表
				myLike: '', //我的爱好
				myDescribution: '', //自我描述
				degree_act: '', //选中的学位
				isopen: true, //跳转页面
				uploadpic: false, //上传头像展示
				phone: '', //联系电话
				jobDate: '', //参加工作年份
				range: false, //工作年份
				iwant: [], //我想找
				JobType: "", //期望职位
				ido: [], //我做过
				liveImg: [], //生活照列表
				life_photos: [], //生活照传参
				skillImg: [], //学历/技能图片列表
				skill_certificate: [], //学历/技能图片传参
				experienceInfo: [], //工作经历列表
				educationInfo: [], //教育经历列表
				region: false, //地区选择
				address: false, //工作地址选择
				birthday: false, //生日
				defaultpic: false, //是否展示图片
				cert_status: 100, //用户实名认证状态
				jobAddress: '', //工作地址
				head_imgId: '', //头像id
				city_id: '', //城市id
				page: '', //页面类型   resiter  注册账号
			};
		},
		onLoad(option) {
			this.page = option.page;
			this.edittype = option.edittype;
			this.getDegree(); //获取学位数据
			let avatar = option.avatar;
			if (avatar) {
				this.user.head_imgs = avatar;
			}
			if (this.user.address) {
				this.name = this.user.address;
			}
			if (uni.getStorageSync('USERINFO').user_token) {
				this.getinfo();
				this.user_undergo_list()
			}
			// this.uploadpic=true
			this.getWantSalary()
			// 监听上传头像
			uni.$on('upHeadImg', data => {
				console.log(data, '监听图片修改参数');
				this.user.head_imgs = data.avatar;
				this.head_imgId = data.path
				this.$forceUpdate(); //强制全局刷新
			});
			uni.removeStorageSync('jobTag');
			uni.removeStorageSync('jobTagIdo');
			// 监听我选择我想找
			uni.$on('position', data => {
				// 职位类别
				console.log(data, '选择的职位类别');
				this.iwant = data;
				if (this.iwant != '') {
					uni.setStorageSync('jobTag', this.iwant);
				}
			});
			uni.$on('my_jianli', data => {
				this.user_undergo_list()
			})
			//监听选择城市
			uni.$on('country', data => {
				console.log(data, '监听工作城市');
				this.city = data.city;
			});
			// if(uni.getStorageSync('USERINFO').is_personal_profile==0){
			this.$Common.getLocation(e => {
				let that = this
				//获取经纬度
				let lat = [e.longitude, e.latitude];
				this.$Request.post(that.$api.msg.cityPosition, {
						user_id: that.user_id || '',
						// #ifdef APP-PLUS
						client_id: plus.device.uuid,
						// #endif
						cid: '',
						lat: lat
					})
					.then(res => {
						if (res.code == 1) {
							that.city_id = res.data.id;
						} else {
							that.$Common.toast('无法定位，请打开手机定位！！');
						}
					})
					.catch(err => {
						that.$Common.toast('无法定位，请打开手机定位！！');
					});
			})
			// }

		},
		onUnload() {
			uni.$off('upHeadImg');
			uni.$off('position');
			uni.$off('ido');
			uni.$off('identity');
			uni.$off('country');
		},
		onShow() {
			this.defaultpic = true;
		},
		methods: {
			toPath(path) {
				//跳转路径
				uni.navigateTo({
					url: path
				});
			},
			skillImgLive(e) {
				this.defaultpic = true;
				//上传学历/技能证书
				this.skillImg = e;
				if (e != '') {
					this.uShow = true
					// uni.hideLoading()
				}
			},
			nickname(name) {
				//验证姓名长度
				if (name.length > 6) {
					this.$Common.toast('姓名不能超过六个字符');
				}
			},
			nickblur(name) {
				//姓名输入失去焦点
				if (name.length < 2) {
					this.$Common.toast('姓名不能少于2个字符');
				}
			},
			goSelectJob(type) {
				// 点击我想找工作跳转
				// uni.$off(type);
				uni.navigateTo({
					url: '../../pagescommon/my_search?jobtype=1&request=1&type=' + type
				});
			},
			// 获取期望薪资
			getWantSalary() {
				this.$Request.post(this.$api.user.getWantSalary).then(res => {
					if (res.code == '1') {
						res.data.map((item, index) => {
							this.salaryList.push({
								label: item,
								value: index
							})
						})
						console.log(this.salaryList);
					}
				});
			},
			// 操作简历状态
			setResumeStatus() {
				if (!this.user.head_imgs) {
					return this.$Common.toast('请先完善简历')
				}
				uni.showModal({
					title: '提示',
					content: this.isOpen ? '您确定要开启简历吗' : '您确定要关闭简历吗',
					success: res => {
						if (res.confirm == true) {
							this.$Request.post(this.$api.user.setResum)
								.then(res => {
									if (res.code == 1) {
										this.$Common.toast(res.msg);
										if (res.data.status == 1) {
											this.isOpen = true
										} else {
											this.isOpen = false
										}
										setTimeout(() => {
											uni.navigateBack({});
										}, 300);
									} else {
										this.$Common.toast(res.msg);
									}
								});
						}
					},
					fail: err => {
						this.$Common.toast('网络错误，请稍后重试');
					}
				});
			},
			// 删除教育  工作经历
			deletItem(e, item) {
				this.$Request.post(this.$api.user.deletUndergo, {
						type: e, //1：教育 2：工作
						aid: item.aid
					})
					.then(res => {
						if (res.code == 1) {
							this.$Common.toast(res.msg);
							if (res.data.status == 1) {
								this.isOpen = true
							} else {
								this.isOpen = false
							}
							setTimeout(() => {
								this.user_undergo_list()
							}, 300);
						} else {
							this.$Common.toast(res.msg);
						}
					});
			},
			// 编辑  工作 教育经历
			editItem(e,item){
				// 1：教育 2工作
				if(e==1){
					uni.navigateTo({
						url:'../../pagesauthen/experience?aid='+item.aid
					})
				}else{
					uni.navigateTo({
						url:'../../pagesauthen/work_jingli?aid='+item.aid
					})
				}
				
			},
			toggleTab(who, type) {
				console.log('选择了=======', who);
				//显示选择组件
				this.$data[who] = true;
			},
			yulan(pic) {
				//头像预览
				this.$Common.lookImg(pic);
				if (!pic) {
					this.upload();
				}
			},
			addressConfirm(val) {
				//选择地址回调
				this.hometown = val.obj.province.label + '-' + val.obj.city.label + '-' + val.obj.area.label;
			},
			cityConfirm(val) {
				// console.log('选择工作地址', val);
				this.jobAddress = val.obj.province.label + '-' + val.obj.city.label + '-' + val.obj.area.label;
			},
			degreeConfirm(val) {
				//选择最高学历回调
				// console.log(val);
				// this.degree_act = val.obj;
				this.degree_act = {
					label: val.result,
					id: val.value
				}
			},
			// 经验
			experienceConfirm(val) {
				this.experience_act = val.obj.label;
			},
			salaryConfirm(val) {
				// 选择薪资
				this.salary = val.obj.label;
			},
			onConfirm(e, type) {
				//选择工作时间段
				if (type == 'date1') {
					this.dateValue = e.result;
				} else {
					this.jobDate = e.result;
				}
			},
			isback() {
				if (this.page == 'resiter') {
					uni.reLaunch({
						url: '../../pages/index/index'
					})

				} else {
					uni.navigateBack()
				}
			},
			getDegree() {
				//获取学位  type 1 我的简历获取学位与其他页面不同
				this.$Request.post(this.$api.user.user_degree, {
					type: 1
				}).then(res => {
					if (res.code == '1') {
						res.data.map((item, index) => {
							this.degree_list.push({
								label: item.label,
								value: item.id,
							})
							// item.value=item.id
						})
						// this.degree_list = res.data;
						console.log(this.degree_list, '========degree_list');
					}
				});
			},
			chooseSex(item, index) {
				//选择性别
				this.sexIndex = item.value;
				console.log(this.sexIndex);
			},
			// 获取经历信息   user_undergo_list
			user_undergo_list() {
				this.$Request.post(this.$api.user.user_undergo_list, {
					type: 1, //1：教育 2：工作
				}).then(res => {
					if (res.code == '1') {
						if (res.data.education != '') {
							// // 教育经历
							this.educationInfo = res.data.education
						}
						if (res.data.work != '') {
							// // 工作经历
							this.experienceInfo = res.data.work
						}
					} else {
						this.$Common.toast(res.msg);
					}
				}).catch(err => {
					this.$Common.toast('网络错误，请稍后再试');
				});
			},
			getinfo: function() {
				//获取我的简历
				this.$Request.post(this.$api.company.getResumeInfo).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						this.user.full_name = res.data.full_name;
						this.head_imgId = res.data.head_img;
						this.user.head_imgs = res.data.head_imgs;
						this.sexIndex = res.data.sex;
						this.dateValue = res.data.birthday || '';
						this.hometown = res.data.hometown || '';
						this.JobType = res.data.want_find
						this.phone = res.data.mobile
						this.iwant = {
							station_name: res.data.station_name,
							aid: res.data.station
						}
						this.isOpen = res.data.status == 0 ? true : false
						// // 工作经历
						// this.experienceInfo = res.data.experience
						// // 教育经历
						// this.educationInfo = res.data.educationData
						this.myLike = res.data.hobby
						this.salary = res.data.salary
						this.experience_act = res.data.work_experience
						this.degree_act = {
							label: res.data.educationName,
							id: res.data.education
						}
						// this.degree_act.label = 
						// this.degree_act.id = res.data.education

						this.city_id = res.data.city_id
						this.skillImg = res.data.life_photos_arr
						this.skillImg.map((item) => {
							item.loading = '100%'
							item.path = item.url
						})
						this.defaultpic = true;
						this.uShow = true
						// 自我描述
						this.myDescribution = res.data.personal_profile
						if (res.data.set_up_status == 1 || res.data.set_up_status == 2) {
							this.show = false
						}
					} else {
						this.phone = uni.getStorageSync('USERINFO').telepone
						// this.$Common.toast(res.msg);
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
			// 刷新列表
			updateList() {
				if (!this.user.head_imgs) {
					return this.$Common.toast('请先完善简历')
				}
				this.$Request.post(this.$api.user.updateResume).then(res => {
					this.$Common.toast(res.msg)
					if (res.code == '1') {}
				});
			},
			// delJob(arr, index) {
			// 	//删除选中的职位
			// 	arr.splice(index, 1);
			// },
			formSubmit: function(e) {
				//form提交
				console.log(e.detail.value);
				//定义表单规则
				var rule = [{
						name: 'full_name',
						rule: ['required', 'minLength:2', 'maxLength:6'], //可使用区间，此处主要测试功能
						msg: ['请输入姓名', '姓名必须2个或以上字符', '姓名不能超过6个字符']
					},
					{
						name: 'birthday',
						rule: ['required', 'isDate'],
						msg: ['请选择生日', '请选择生日']
					},
					{
						name: 'hometown',
						rule: ['required'],
						msg: ['请选择现居住地']
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = Checker.validation(formData, rule);
				if (checkRes) {
					this.$Common.toast(checkRes);
					return false;
				}
				if (!this.JobType) {
					this.$Common.toast('请输入期望行业职位');
					return;
				}
				console.log(this.iwant);
				if (this.iwant == '') {
					this.$Common.toast('请选择职位类别');
					return;
				}
				if (this.salary == '') {
					this.$Common.toast('请选择期望薪资');
					return;
				}
				if (!this.phone) {
					this.$Common.toast('请填写联系电话');
					return;
				}
				if (!this.degree_act) {
					this.$Common.toast('请选择最高学历');
					return;
				}

				if (!this.myDescribution) {
					this.$Common.toast('请填写自我描述');
					return;
				}

				// 添加自定义参数
				var want_find = [],
					have_done = [];
				// this.ido &&
				// 	this.ido.map(item => {
				// 		have_done.push(item.aid);
				// 	});
				var life_photos = []; //生活照片
				this.skillImg &&
					this.skillImg.map(item => {
						life_photos.push(item.aid);
					});
				// var skill_certificate = []; //技能照片
				// this.skillImg &&
				// 	this.skillImg.map(item => {
				// 		skill_certificate.push(item.aid);
				// 	});
				formData.head_img = this.head_imgId || 0;
				formData.sex = this.sexIndex;
				formData.want_find = want_find;
				formData.work_experience = this.experience_act;
				formData.station = this.iwant.aid;
				formData.hometown = this.hometown;
				formData.education = this.degree_act.id;
				formData.want_find = this.JobType;
				formData.hobby = this.myLike //个人爱好
				formData.salary = this.salary //薪资
				formData.personal_profile = this.myDescribution;
				formData.city_id = this.city_id
				formData.life_photos = life_photos.join(',');
				// 验证			
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				// 验证成功，提交  subUserResume
				this.$Request.post(this.$api.user.subUserResume, formData).then(res => {
					this.$Common.toast(res.msg);
					if (res.code == 1) {
						let userInfo = uni.getStorageSync('USERINFO')
						userInfo.is_personal_profile = res.data.is_personal_profile
						uni.setStorageSync('USERINFO', userInfo)
						setTimeout(() => {
							if (this.page == 'resiter') {
								uni.reLaunch({
									url: '../../pages/index/index'
								})

							} else {
								uni.navigateBack()
							}
						}, 500)
					}
				});
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

	.sexTag {
		width: 148upx;
		height: 65upx;
		border: 1px solid #e6e6e6;
		text-align: center;
		line-height: 65upx;
		color: #666;
		font-size: 28upx;
		margin-right: 20upx;
	}

	.active {
		border: 1px solid #1b90ff;
		color: #1b90ff;
		background-color: #ecf6ff;
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

	.cu-list.menu>.cu-item:after {
		border-bottom: 0;

	}

	.cu-list.menu>.cu-item.arrow:nth-child(5):before,
	.cu-list.menu>.cu-item.arrow:nth-child(6):before,
	.cu-list.menu>.cu-item.arrow:nth-child(11):before {
		content: '';
	}

	.cu-list.menu>.cu-item.arrow:nth-child(6) .content,
	.cu-list.menu>.cu-item.arrow:nth-child(5) .content {
		margin-right: 0upx;
	}

	.cu-list.menu>.cu-item.arrow:nth-child(10) .content {
		margin-right: 36upx;
	}

	.cu-list.menu>.cu-item:nth-child(9):after {
		border-bottom: 0;
	}

	.cu-list.menu.sm-border>.cu-item:after {
		left: 0;
		width: 100%;
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

	.cu-list.menu>.cu-item.arrow:before {
		right: 0;
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
