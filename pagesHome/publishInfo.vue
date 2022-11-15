<template>
	<view class="padding brt_e" style="height: auto;" :style="{ paddingBottom: paddingBottom }">
		<view class="grace-body ">
			<form @submit="formSubmit" class="grace-form grace-margin-top ">
				<view class=" cu-list menu sm-border margin-lr ">
					<view class="flex align-center justify-between ptb10">
						<view class=" flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm">
								<text class="text-red  text-xl" v-if="type != 1 || category_id == 13">*</text>
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
								<text class="text-red  text-xl" v-if="type != 1 || category_id == 13">*</text>
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
					<view class="pt10 mt10" v-if="type == 1">
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
					<view class="pt10 mt10 flex justify-start align-center" v-if="type == 1 && (category_id == 13 || category_id == 14)">
						<text class="text-lg padding-right-sm">
							<text class="text-red text-xl">*</text>
							<text>性别</text>
						</text>
						<picker @change="bindPickerChange" :value="sexIndex" :range="sex" name="sex">
							<text :style="sexIndex != 0 ? 'color:#666666' : 'color:#BFBFBF'">{{ sex[sexIndex] }}</text>
						</picker>
					</view>
					<view class="pt10 mt10 flex justify-start align-center" v-if="type == 1 && category_id == 13">
						<text class="text-lg padding-right-sm" style="width: 28%;">
							<text class="text-red text-xl">*</text>
							<text>年龄要求</text>
						</text>
						<view class="other flex justify-start align-center"
							style="font-size: 32upx; width: 80%; text-align: center;">
							<input type="number" maxlength="2" name="min_age" v-model="min_age" placeholder="请输入" @blur="leaveCon1"
								style="width: 148upx;height: 65upx;border: 1px solid #E6E6E6;font-size: 24upx;"
								:style="min_age ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
								placeholder-style="font-size: 24upx;"
								:placeholder-style="min_age ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
							<text class="text-gray text-df" style="width: 10%;">至</text>
							<input type="number" maxlength="2" name="max_age" v-model="max_age" placeholder="请输入"
								placeholder-style="font-size: 24upx;" @blur="leaveCon2"
								:style="max_age ? 'color:#333; font-weight:bold' : 'color:#E6E6E6'"
								style="width: 148upx;height: 65upx;border: 1px solid #E6E6E6;font-size: 24upx;"
								:placeholder-style="max_age ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
						</view>
					</view>
					<view class="pt10 mt10 flex justify-start align-center" v-if="type == 1 && category_id == 14">
						<text class="text-lg padding-right-sm">
							<text class="text-red text-xl">*</text>
							<text>年龄</text>
						</text>
						<input
							type="number"
							maxlength="3"
							class="input"
							name="age"
							v-model="age"
							placeholder="请输入年龄"
							placeholder-style="font-size: 28rpx;"
							:placeholder-style="age ? 'color:#666' : 'color:#BFBFBF'"
						/>
					</view>
					<view class="pt10 mt10" v-if="type == 1 && (category_id == 13 || category_id == 14)">
						<text class="text-lg padding-right-sm" style="width: 34%;">
							<text class="text-red text-xl">*</text>
							<text>{{category_id == 13 ? '岗位名称' : '期望职位'}}</text>
						</text>
						<!-- <picker @change="jobChange" mode="selector" name="station_id" :value="jobIndex" :range="jobList" style="width: 100%; color: #333;" range-key="station_name">
							<text style="font-size: 32upx;" :style="jobIndex != 0 ? 'color:#666666' : 'color:#BFBFBF'">{{ jobList[jobIndex].station_name }}</text>
						</picker> -->
						<view style="width: 100%; margin: 20upx 0; display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;">
							<view
								style="text-align: center; border-radius: 8upx; border: 1px solid #ccc; font-weigth: 600; margin-bottom: 8upx; padding: 4upx 10upx; margin-left: 6upx; font-size: 24upx;"
								v-for="(item, index) in jobList"
								:key="index"
								@click="selectJob(index)"
								:style="currentIndex === index ? 'background: #2979ff; color: #fff;' : ''"
							>
								{{ item.station_name }}
							</view>
							<input disabled style="width: 0; height: 0;" name="job" :value="currentIndex"/>
						</view>
					</view>
					<view class="pt10 mt10 flex justify-start align-center" v-if="type == 1">
						<text class="text-lg padding-right-sm">
							<text class="text-red text-xl">*</text>
							<text>联系电话</text>
						</text>
						<input
							type="number"
							maxlength="11"
							class="input"
							name="phone"
							v-model="phone"
							placeholder="请输入联系电话"
							placeholder-style="font-size: 28rpx;"
							:placeholder-style="phone ? 'color:#666' : 'color:#BFBFBF'"
						/>
					</view>
				</view>
				<view class="bg-white margin-top margin-lr padding-bottom-sm"><view class=" text-333 text-bold" style="letter-spacing: 2upx;">图片</view></view>
				<ben-upload ref="benupload" v-if="defaultpic" :col="4" :max="9" @change="infoImgLive" :defaultList="infoImgs" :uShow="uShow"></ben-upload>
				<view class="bg-white margin-top margin-lr padding-bottom-sm"><view class=" text-333 text-bold" style="letter-spacing: 2upx;">视频</view></view>
				<ben-video-upload ref="benvideoupload" v-if="defaultVideo" :col="4" :max="1" @change="infoVideoLive" :defaultList="infoVideos" :uShow="vShow"></ben-video-upload>
				<!-- calc(100%-343)/2; -->
				<view class="fixed" style="width: 100%; bottom: 0; left: 0; z-index: 19841004; background-color: #FFFFFF; padding: 30upx 0;">
					<button class="btn_next round " style="margin: 0 auto; margin-bottom: 20upx;margin-top: 30upx;" form-type="submit">立即发布</button>
					<button class="btn_next round " style="margin: 0 auto; margin-bottom: 20upx;margin-top: 30upx;" @tap="updateList" v-if="infoId && type == 1">
						{{ btnRefresh }}
					</button>
					<button class="btn_next round " style="margin: 0 auto; margin-bottom: 20upx;margin-top: 30upx;" @click="setInfoStatus" v-if="infoId && type == 1">
						{{ btnSwitch }}
					</button>
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
			infoId: null, // 发布信息的id，编辑会使用
			title: '',
			description: '',
			address: '请选择您位置',
			phone: '',
			infoImgs: [], // 发布信息图片列表
			infoVideos: '', // 发布信息视频
			defaultpic: false, // 是否展示图片
			defaultVideo: false, // 是否展示视频
			uShow: false, // 图片上传成功在展示
			vShow: false, // 视频上传成功在展示
			type: 1, // 1为用户发布信息 3为用户发布坑骗拖欠名单
			isOpen: 'OYEA', // 开启信息/黑名单 true开启，false关闭
			btnRefresh: '', // 刷新
			btnSwitch: '', // 切换
			paddingBottom: '400upx', // 底部内边距
			city_id: null, // 城市id
			category_id: null, // 栏目id
			lon: null, // 经度
			lat: null ,// 纬度
			sexIndex: 0, //性别
			sex: ['请选择性别', '男', '女'],
			age: null,
			min_age: null,
			max_age: null,
			jobList: [],
			jobIndex: 0,
			currentIndex: 0
		};
	},
	watch: {
		isOpen(status) {
			// console.log(status);
			if (this.type == 1) {
				this.btnSwitch = status ? '关闭这条信息' : '开启这条信息';
			}
		}
	},
	onLoad(e) {
		let that = this;
		this.type = e.type;
		this.infoId = e.id;
		this.category_id = e.category_id;
		console.error(e);
		this.getLocation();
		this.sex = e.category_id == 13 ? ['请选择性别要求', '男', '女', '男女不限'] : ['请选择性别', '男', '女'];
		// console.log(e);
		if (e.type == 1) {
			this.paddingBottom = '200px';
			let title = this.category_id == 13 ? '招聘信息' : '求职信息';
			uni.setNavigationBarTitle({
				title: '发布' + title
			});
			this.btnRefresh = '刷新' + title;
		} else {
			this.paddingBottom = '100px';
			uni.setNavigationBarTitle({
				title: '发布坑骗拖欠黑名单'
			});
		}
		
		// 本地零工市场获取岗位
		if (e.type == 1) {
			this.$Request.post(this.$api.job.get_station_list, {
				type_pid: 261
			}).then(res => {
				console.log(res);
				if (res.code == 1) {
					this.jobList = res.data;
					let txt = this.category_id == 13 ? '请选择岗位名称' : '请选择期望职位'
					// 改变方式，平铺岗位
					// this.jobList.unshift({
					// 	aid: 0,
					// 	station_name: txt
					// })
				}
			});
		}

		// 获取当前用户发布的信息
		let infouri = e.type == 1 ? this.$api.user.user_info_get + "?category_id=" + e.category_id : this.$api.user.user_inform_get + '?id=' + e.id;
		// let infouri = this.$api.user.user_inform_get + '?id=' + e.id;
		// 如果是type为1及用户发布信息必须获取一次，如果传值过来的id（信息id，或黑名单id）不为空也要获取一次
		if (e.type == 1 || e.id) {
			this.$Request.get(infouri).then(res => {
				console.log(res);
				that.defaultpic = true;
				that.defaultVideo = true;
				if (res.code == 1) {
					that.infoId = res.data.id;
					that.category_id = res.data.category_id;
					that.title = res.data.title;
					that.description = res.data.body;
					that.phone = res.data.driver_phone;
					that.city_id = res.data.city_id;
					that.address = res.data.address;
					that.lon = res.data.lon;
					that.lat = res.data.lat;
					if (that.type == 1) {
						that.sexIndex = res.data.sex;
						that.jobList.map((item, index) => {
							console.error(index);
							if (item.aid == res.data.station_id) {
								that.currentIndex = index;
							}
						});
						that.age = res.data.age;
						that.min_age = res.data.min_age;
						that.max_age = res.data.max_age;
					}
					
					that.infoImgs = res.data.info_imgs;
					that.infoVideos = res.data.info_videos;
					if (that.infoImgs && that.infoImgs.length > 0) that.uShow = true;
					if (that.infoVideos && that.infoVideos.length > 0) that.vShow = true;
					
					// 已发布信息状态
					if (e.type == 1) {
						that.isOpen = !!res.data.status;
					}
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
			//定义表单规则
			var rule = [];
			
			// 求职信息填写时，自我描述不用是必填项，可以选填
			if (this.type != 1 || this.category_id == 13) {
				rule = rule.concat([
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
				]);
			}
			
			// 只有发布信息才需要地址电话
			if (this.type == 1) {
				rule = rule.concat([
					{
						name: 'address',
						rule: ['required'],
						msg: ['请输入电话']
					},
					{
						name: 'phone',
						rule: ['required', 'isMobile'],
						msg: ['请输入电话', '输入的电话不合法']
					}
				]);
				
				if (this.category_id == 13) {
					if (this.sexIndex == 0) {
						this.$Common.toast('请选择性别要求');
						return;
					}
					rule = rule.concat([
						{
							name: 'min_age',
							rule: ['required'],
							msg: ['请输入最小年龄']
						},
						{
							name: 'max_age',
							rule: ['required'],
							msg: ['请输入最大年龄']
						},
					]);
					if (this.min_age < 16) {
						this.$Common.toast('最小年龄不可小于16岁');
						return;
					}
					console.error(this.max_age);
					if (this.max_age > 65) {
						this.$Common.toast('最大年龄不可大于65岁');
						return;
					}
				}
				
				if (this.category_id == 14) {
					if (this.sexIndex == 0) {
						this.$Common.toast('请选择性别要求');
						return;
					}
					rule = rule.concat([
						{
							name: 'age',
							rule: ['required'],
							msg: ['请输入年龄']
						}
					]);
				}
			}
			
			//进行表单检查
			var formData = e.detail.value;
			if (this.type == 1) {
				formData.station_id = this.jobList[this.currentIndex].aid;
			}
			console.log(formData);
			var checkRes = Checker.validation(formData, rule);
			if (checkRes) {
				this.$Common.toast(checkRes);
				return false;
			}

			var info_photos = [];
			var info_videos = []; //发布信息照片
			this.infoImgs &&
				this.infoImgs.map(item => {
					info_photos.push(item.aid);
				});

			this.infoVideos &&
				this.infoVideos.map(item => {
					info_videos.push(item.aid);
				});

			console.log(this.infoVideos);

			// 编辑的情况，需要带上id
			if (this.infoId) formData.id = this.infoId;
			// 发布所在分类
			formData.category_id = this.category_id;
			// 将图片id赋值给提交对象
			formData.img_url = info_photos.join(',');
			// 视频地址
			formData.video_url = info_videos.join(',');
			
			formData.source = 2; // 1是系统2小程序
			
			// 所有城市id全给空，因为选的地址本身很全
			// formData.city_id = '';

			if (this.type == 1) {
				// 经纬度
				formData.lon = this.lon;
				formData.lat = this.lat;
			} else if (this.type == 3) {
				formData.city_id = '';
			}

			console.log(formData);
			// 根据不同的类型用不同的提交接口
			let apiuri = this.$api.user.user_info_submit;

			// 验证成功，提交用户发布信息
			this.$Request.post(apiuri, formData).then(res => {
				this.$Common.toast(res.msg);
				if (res.code == 1) {
					setTimeout(() => {
						uni.navigateBack();
						uni.setStorageSync("_REBACK", 1);
					}, 1000)
				}
			});
		},
		checktitle(title) {
			//验证标题长度
			if (title.length > 30) {
				this.$Common.toast('姓名不能超过30个字符');
			}
		},
		titleblur(title) {
			//标题输入失去焦点
			if (title.length < 2 && this.category_id !== 13) {
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
				that.getCityId({longitude:location.longitude, latitude:location.latitude});
			});
		},
		updateList() {
			// console.log(this.infoId);
			this.$Request.post(this.$api.user.user_info_refresh, {
				id: this.infoId
			}).then(data => {
				this.$Common.toast(data.msg);
				if (data.code == 1) {
					uni.setStorageSync("_REBACK", 1);
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 1000);
				}
			});
		},
		setInfoStatus() {
			console.log(this.infoId);
			this.$Request.post(this.$api.user.user_info_switch, {
				id: this.infoId
			}).then(data => {
				this.$Common.toast(data.msg);
				if (data.code == 1) {
					this.isOpen = !this.isOpen;
					uni.setStorageSync("_REBACK", 1);
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 1000);
				}
			});
		},
		bindPickerChange(e) {
			//性别选择回调
			this.sexIndex = e.detail.value;
		},
		jobChange(e) {
			console.error(e);
			//岗位选择
			this.jobIndex = e.detail.value;
		},
		leaveCon1() { //最小年龄失去焦点
			if (!this.min_age) {
				this.$Common.toast('请输入起始年龄');
				return false;
			}
			if (!/^[1-9]\d*$/.test(this.min_age)) {
				this.$Common.toast('请输入不以0开头并且为整数的起始年龄');
				this.min_age = ''
				return false;
			}
			if (this.min_age < 16) {
				this.$Common.toast('请输入不小于16的起始年龄');
				this.min_age = ''
				return false;
			}
		},
		leaveCon2() { //最大年龄失去焦点
			if (!this.min_age) {
				this.$Common.toast('请输入起始年龄');
				return false;
			}
			if (!/^[1-9]\d*$/.test(this.max_age)) {
				this.$Common.toast('请输入不以0开头并且为整数的最大年龄');
				this.max_age = ''
				return false;
			}
			if (this.max_age > 65) {
				this.$Common.toast('年龄设置不可大于65岁')
				this.max_age = ''
			}
		
		},
		selectJob(index) {
			this.currentIndex = index;
		},
		getLocation() {
			this.$Common.getLocation(e => {
				let that = this
				//获取经纬度
				let lat = [e.longitude, e.latitude];
				this.$Request
					.post(that.$api.msg.cityPosition, {
						user_id: that.user_id || '',
						// #ifdef APP-PLUS
						client_id: plus.device.uuid,
						// #endif
						cid: '',
						lat: lat
					})
					.then(res => {
						if (res.code == 1) {
							that.address = res.data.name;
							that.lon = e.longitude;
							that.lat = e.latitude;
							that.getCityId(e);
						} else {
							that.$Common.toast('无法定位，请打开手机定位！！');
						}
					})
					.catch(err => {
						that.$Common.toast('无法定位，请打开手机定位！！');
					});
			})
		}
	}
};
</script>

<style></style>
