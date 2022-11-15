<template>
	<view class="">
		<!-- 列表start -->
		<view class="head_list cu-list menu sm-border plr15">
			<view class="cu-item arrow">
				<view class="" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">职位类型</view>
					<picker @change="zhiweiConfirm" mode="selector" :range="zhiwei_list" style="width: 100%;"
						range-key="label" :style="zhiwei ? 'color: #333;font-weight:bold' : 'color: #E6E6E6;'">
						<text style="font-size: 32upx;">{{ zhiwei || '请选择职位' }}</text>
					</picker>
				</view>
			</view>


			<view class="cu-item arrow">
				<view class="" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">结算方式</view>
					<picker @change="sortConfirm" mode="selector" :range="price_sort" style="width: 100%;"
						range-key="label" :style="busort ? 'color: #333;font-weight:bold' : 'color: #E6E6E6;'">
						<text style="font-size: 32upx;">{{ busort || '请选择' }}</text>
					</picker>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="" style="width: 100%;">
					<view class=" text-df" style="margin-bottom: 12upx;">工作时长</view>
					<input type="text" placeholder="请输入" v-model="service_time"
						:placeholder-style="service_time ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						:style="service_time ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="" style="">
					<view class="text-df " style="margin-bottom: 12upx;">结算佣金</view>
					<input type="number" maxlength="4" placeholder="请输入" v-model="price_butie"
						:placeholder-style="price_butie ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						:style="price_butie ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="" style="">
					<view class=" text-df" style="margin-bottom: 12upx;">招聘人数</view>
					<input type="number" maxlength="4" placeholder="请输入" v-model="zhaopin_number" @blur='leavePerson'
						:placeholder-style="zhaopin_number ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						:style="zhaopin_number ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="flex align-center justify-between" style="width: 100%;">
					<view class="flex_shrink text-df" style="margin-bottom: 12upx;">年龄要求</view>
					<view class="other flex justify-end align-center"
						style="font-size: 32upx;width: 80%;text-align: center;">
						<input type="number" maxlength="2" v-model="min_salary" placeholder="请输入" @blur="leaveCon1"
							style="width: 148upx;height: 65upx;border: 1px solid #E6E6E6;font-size: 24upx;"
							:style="min_salary ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							placeholder-style="font-size: 24upx;"
							:placeholder-style="min_salary ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
						<text class="text-gray text-df" style="width: 10%;">至</text>
						<input type="number" maxlength="2" v-model="max_salary" placeholder="请输入"
							placeholder-style="font-size: 24upx;" @blur="leaveCon2"
							:style="max_salary ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							style="width: 148upx;height: 65upx;border: 1px solid #E6E6E6;font-size: 24upx;"
							:placeholder-style="max_salary ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
					</view>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">性别要求</view>
					<picker @change="sexConfirm" mode="selector" :range="sex_sort" style="width: 100%;"
						range-key="label" :style="sex ? 'color: #333;font-weight:bold' : 'color: #E6E6E6;'">
						<text style="font-size: 32upx;">{{ sex || '请选择类型' }}</text>
					</picker>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="mt5" style="width: 100%;">
					<view class="text-df margin-bottom">联系人电话</view>
					<view class=" text-df" style="width: 100%;">
						<input type="number" value="" maxlength="11" placeholder="请输入" @blur="leavePhone"
							style="width: 100%;height: 50upx;"
							:style="phone ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="phone"
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="phone ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
					</view>
				</view>
			</view>
			<view class="cu-item arrow" @tap="getLocation" v-if="zhiwei=='临时工'">
				<view class="padding-top" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">工作地址</view>
					<view class="text-bold" v-if="zhiwei=='网络兼职'">网络兼职</view>
					<view class="" v-else>
						<view class="" style="color: #E6E6E6;" v-if="!company_address">请选择</view>
						<view v-else class=" text-black text-bold text-md" style="padding-right: 50upx;">
							{{ company_address }}</view>
					</view>
				</view>
			</view>
			<view class="">
				<view class=" margin-top  " style=" ">
					<view class="text-df margin-bottom">上传视频</view>
					<view class="cu-form-group">
						<view class="grid  grid-square flex-sub">
							<view class="bg-img" v-if="videoImg.length > 0">
								<image :src="videoImg" mode="aspectFill"></image>
								<view class="play" @tap="playVideo">
									<image :src="IMG_URL + 'static/miniwechat/play.png'" mode="aspectFill"></image>
								</view>
								<view class="cu-tag bg-red" @tap.stop="DelImg" style="z-index: 100;"><text
										class="cuIcon-close"></text></view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="videoImg.length == 0">
								<image :src="IMG_URL + 'static/miniwechat/creame_gray.png'" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="">
				<view class=" margin-top  " style=" ">
					<view class="text-df margin-bottom">上传图片 </view>
					<!-- <view class="text-gray" style="font-size: 24upx;margin-bottom: 10upx;">（请上传尺寸为375*375像素的图片)</view> -->
					<ben-upload v-if="defaultpic" :col="4" :max="9" @change="bannerLive" :defaultList="imgList"
						:uShow='uShow'></ben-upload>
				</view>
			</view>
			<view class="cu-item " style="padding: 0 0;">
				<view class="mt5" style="width: 100%; ">
					<view class="text-df margin-bottom">标题</view>
					<view class=" text-df" style="width: 100%;">
						<input type="text" placeholder="请输入" style="width: 100%;height: 50upx;"
							:style="title ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="title"
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="title ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
					</view>
				</view>
			</view>
			<view class="pt10">
				<view class="   " style=" ">
					<view class="text-df margin-bottom">工作内容</view>
					<view class="areabox text-df" style="height: 370upx;">
						<textarea placeholder="请输入" maxlength="500" style="width: 100%;height: 300upx;line-height: 1.5;"
							:style="content ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="content"
							placeholder-style="font-size:32upx;color:#E6E6E6" />
						<view class=" txtnum" :class="content && content.length >= 500 ? 'text-red' : 'text-gray'">
							{{ (content && content.length) || 0 }}/500</view>
					</view>
				</view>
			</view>

			<view class="pt10 mt10">
				<view class="   " style=" ">
					<view class="text-df margin-bottom">备注</view>
					<view class="areabox text-df" style="height: 370upx;">
						<textarea placeholder="请输入" maxlength="500" style="width: 100%;height: 300upx;line-height: 1.5"
							:style="enterpriseIntroduction ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="enterpriseIntroduction" placeholder-style="font-size:32upx;color:#E6E6E6" />
						<view class=" txtnum"
							:class="enterpriseIntroduction && enterpriseIntroduction.length >= 500 ? 'text-red' : 'text-gray'">
							{{ (enterpriseIntroduction && enterpriseIntroduction.length) || 0 }}/500</view>
					</view>
				</view>
			</view>
			<view class="ptb15 f22 text-gray  margin-bottom-sm">
				发布职位即代表遵守
				<text @tap="gorule" style="color: #F77858;">《保障网招聘发布规则》</text>
				，如违反规则将受到相应的惩罚。
			</view>
			<view class="pb15 f22 text-gray  margin-bottom-sm" v-if="voucher==0">
				{{part_job_info.part_job_percentage_info}}</view>
			<view class="text-sm padding-bottom" style="color: #F77858;">当未有人接单时，删除本条任务后，全款退回到充值账户</view>
		</view>
		<!-- 列表end -->
		<view class="footer  flex align-center">
			<view class="text_1b9 pl20 f28" style="flex: 1; border-top: 1px solid #e5e5e5;" v-if="voucher==0">
				支付佣金{{totalMoney}}元
			</view>
			<view class=" text-df text-white text-center" style="background-color: #1B90FF;width: 300upx; " @tap="gopay"
				v-if="voucher==0">提交</view>
			<view class=" text-df text-white text-center" style="background-color: #1B90FF;width: 100%; " @tap="gopay"
				v-if="voucher==1">提交</view>
		</view>

	</view>
</template>

<script>
	import benUpload from '@/components/ben-upload/ben-upload.vue';
	import wPicker from '@/components/w-picker/w-picker.vue';
	import {
		experience,
		age_list
	} from '@/common/js/mockData.js';
	import {
		age2_list
	} from '../../common/age.js'
	const Checker = require('@/common/js/formValidation.js');
	export default {
		components: {
			benUpload,
			wPicker
		},
		data() {
			return {
				experience, //经验要求
				act_experience: '', //经验要求
				price: false,
				experi: false,
				salaryDescription: '', //薪资说明
				requirements: '', //录用条件
				jobDescription: '', //岗位介绍
				uShow: false, //图片上传成功在展示
				enterpriseIntroduction: '', //备注
				education: '',
				zhaopin_number: '', //招聘人数
				defaultpic: false, //是否展示图片
				agechoose: false,
				age_list: age_list,
				age2_list: JSON.parse(JSON.stringify(age2_list)),
				age_inx: [0, 0],
				age_act: '', //年龄
				zhiwei: '', //选择的职位
				degree_list: [], //学位列表
				degree_act: '', //选中的学位
				price_list: ['暂无相关内容'], //薪资列表
				busort: '', //结算方式
				min_salary: '', //最小年龄
				max_salary: '', //最大年龄
				price_butie: '', //结算佣金
				service_time: '', //服务时间
				content: '', // 兼职内容
				fabu_money: '', //发布职位费用
				company_address: '', //工作地址
				sex: '', //性别
				sex_id: '', //性别id
				videoImg: [], //职位视频缩略图
				video: '', //职位视频
				imgList: [], //职位轮播
				imgpath: [],
				max: 5, //图片最大数量
				check: '',
				phone: '', //联系电话
				title: '', //职位标题
				isopen: true, //跳转福利页面
				sex_sort: [{
						id: 0,
						label: '不限'
					},
					{
						id: 1,
						label: '男'
					},
					{
						id: 2,
						label: '女'
					},
				],
				zhiwei_list: [{
						id: 2,
						label: '临时工'
					},
					{
						id: 1,
						label: '网络兼职'
					},
				],
				price_sort: [],
				// totalMoney: '', //支付佣金金额
				city: '', //城市
				lon: '', //公司经度
				lat: '', //公司纬度
				open: false, //返回视频
				part_job_info: '', //兼职任务佣金信息
				voucher: '', //0：未关闭支付   1：关闭支付
			};
		},
		onLoad(option) {
			this.getpart_type();
			setTimeout(() => {
				this.defaultpic = true;
			}, 300);
			this.getPay_price()
			uni.$on('video', data => {
				console.log(data, '监听选择视频');
				this.video = data.msg;
				if (data.msg != '') {
					this.videoImg = data.msg + '?x-oss-process=video/snapshot,t_10000,f_jpg,w_800,h_600,m_fast';
					this.open = true;
				}
				console.log(this.videoImg);
			});
			// 监听选择地点
			// #ifdef APP-PLUS
			uni.$on('chooseLocation', data => {
				this.company_address = data.name;
				this.city = data.citys.areac;
				this.lon = data.longitude;
				this.lat = data.latitude;

			})
			// #endif
			this.get_plant_type()
			// this.commission=(this.zhaopin_number * (this.price_butie * 100)*this.part_job_info.part_job_percentage) / 10000).toFixed(2)
		},
		computed: {
			totalMoney() {
				return Math.floor((((this.zhaopin_number * (this.price_butie * 100)) + (this.zhaopin_number * (this
					.price_butie * 100) * this.part_job_info.part_job_percentage) / 100))) / 100;
			},
			commission() {
				let c = this.part_job_info.part_job_percentage
				let b = this.price_butie
				let a = this.zhaopin_number
				return ((a * b * 100 * c) / 10000).toFixed(2);
			}
		},
		onUnload() {
			uni.$off('video');
		},
		methods: {
			chooseLive(e) {
				//选择图片
				console.log(e);
				this.imgOne = e;
			},
			bannerLive(e) {
				//图片轮播
				console.log(e);
				this.imgList = e;
				if (e != '') {
					this.uShow = true
					// uni.hideLoading()
				}
			},
			get_plant_type() { //获取是否开启支付
				this.$Request.get(this.$api.index.get_fuli_info).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			getPay_price() { //获取支付佣金
				this.$Request
					.post(this.$api.index.get_fuli_info)
					.then(res => {
						uni.hideLoading();
						if (res.code == '1') {
							this.part_job_info = res.data;
						}
					})
					.catch(err => {
						uni.hideLoading();
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
					url: '../zhaopinzhe/upload_video'
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
			getpart_type() {
				//获取结算方式
				this.$Request.post(this.$api.company.getpart_type).then(res => {
					if (res.code == '1') {
						this.price_sort = res.data;
					}
				});
			},
			playVideo() {
				//播放视频
				uni.navigateTo({
					url: 'play_video?url=' + this.video
				});
			},
			leaveCon1() { //最小年龄失去焦点
				if (!this.min_salary) {
					this.$Common.toast('请输入起始年龄');
					return false;
				}
				if (!/^[1-9]\d*$/.test(this.min_salary)) {
					this.$Common.toast('请输入不以0开头并且为整数的起始年龄');
					this.min_salary = ''
					return false;
				}
			},
			leaveCon2() { //最大年龄失去焦点
				if (!this.min_salary) {
					this.$Common.toast('请输入起始年龄');
					return false;
				}
				if (!/^[1-9]\d*$/.test(this.max_salary)) {
					this.$Common.toast('请输入不以0开头并且为整数的最大年龄');
					this.max_salary = ''
					return false;
				}
				if (Number(this.max_salary) < Number(this.min_salary) || this.max_salary.length >= 3) {
					this.$Common.toast('年龄设置不合理')
					this.max_salary = ''
				}

			},
			leavePhone() { //电话失去焦点
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
					this.$Common.toast('请输入正确的联系人电话');
					return false;
				}
			},
			leavePerson() { //招聘人数失去焦点
				if (!/^[1-9]\d*$/.test(this.zhaopin_number)) {
					this.$Common.toast('请输入不以0开头并且为整数的招聘人数');
					this.zhaopin_number = ''
					return false;
				}
			},
			getLocation() {
				//获取工作地点定位
				if (this.zhiwei == '网络兼职') {
					return
				} else {
					let _this = this;
					// #ifdef APP-PLUS
					uni.navigateTo({
						url: '/pagescenter/index'
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
							_this.city = res.address;
							_this.lon = res.longitude;
							_this.lat = res.latitude;
						}
					});
					// #endif
				}

			},
			gopay() {
				//完成发布;

				// 验证

				if (!this.zhiwei) {
					this.$Common.toast('请选择职位类型');
					return false;
				}
				if (!this.busort) {
					this.$Common.toast('请选择结算方式');
					return false;
				}

				if (!this.service_time) {
					this.$Common.toast('请输入工作时长');
					return false;
				}
				if (!this.price_butie) {
					this.$Common.toast('请输入结算佣金');
					return false;
				}
				if (!this.zhaopin_number) {
					this.$Common.toast('请输入招聘人数');
					return false;
				}
				if (this.zhaopin_number % 1 != 0) {
					this.$Common.toast('招聘人数必须是整数');
					return false;
				}
				if (!this.min_salary && !this.max_salary) {
					this.$Common.toast('请输入年龄要求');
					return false;
				}
				if (Number(this.max_salary) < Number(this.min_salary) || this.max_salary.length >= 3 || Number(this
						.max_salary) < 16) {
					this.$Common.toast('年龄要求不合理')
					return false;
				}
				if (!this.phone) {
					this.$Common.toast('请输入联系方式');
					return false;
				}
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
					this.$Common.toast('请输入正确的联系人电话');
					return false;
				}
				if (this.zhiwei_id == 2 && this.company_address == '') {
					this.$Common.toast('请选择工作地址');
					return false;
				}
				// if (this.videoImg == '') {
				// 	this.$Common.toast('请选择视频');
				// 	return false;
				// }
				if (this.imgList == '') {
					this.$Common.toast('请上传图片');
					return false;
				}
				if (!this.title) {
					this.$Common.toast('请输入标题');
					return false;
				}
				if (!this.content) {
					this.$Common.toast('请选择工作内容');
					return false;
				}

				let age_act = this.min_salary + '-' + this.max_salary

				var skill_certificate = [];
				this.imgList &&
					this.imgList.map(item => {
						skill_certificate.push(item.aid);
					});
				let formData = {
					type: this.zhiwei_id, //职位类型
					title: this.title, //职位标题
					age: age_act, //年龄要求
					sex: this.sex_id, //性别
					phone: this.phone, //联系人电话
					address: this.company_address, //兼职地址
					video: this.video, //职位视频
					IMG_URL: this.IMG_URL,
					imgUrl: skill_certificate.join(','), //图片
					num: this.zhaopin_number, //招聘人数
					settlement_method: this.busort_id, //结算方式
					content: this.content, //兼职内容
					service_time: this.service_time, //服务时间
					// commission:(this.zhaopin_number * (this.price_butie * 100)/100).toFixed(2),//服务佣金
					commission: this.price_butie, //服务佣金
					commission_money: this.totalMoney, //
					remarks: this.enterpriseIntroduction, //备注
					lon: this.lon,
					lat: this.lat,
				};
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 3000);
				this.$Request.post(this.$api.company.publish_online, formData).then(res => {
					if (res.code == 1) {
						if (this.voucher == 1) {
							uni.$emit('updateOrderDetail', {})
							uni.navigateBack({})
						} else {
							uni.redirectTo({
								url: '../zhaopinzhe/fabu?title=fabu&order_sn=' + res.data.order_sn +
									'&price=' + res.data.payable_money + '&commission=' + this.commission,
							});
						}

					} else {
						this.$Common.toast(res.msg);
						// uni.navigateTo({
						// 	url:'online_authencation'
						// });
					}
				});
			},
			gorule() {
				//跳发布规则
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: '../../pagescommon/post_recruitment'
				});
			},

			toggleTab(who) {
				//显示选择组件
				console.log(who);
				this.$data[who] = true;
				this.hidden = false
			},
			degreeConfirm(e) {
				//选择学历要求
				console.log('选择学历', e);
				var index = e.detail.value;
				this.degree_act = this.degree_list[index].label;
				console.log(this.degree_list[index]);
			},
			zhiweiConfirm(e) {
				//选择职位
				console.log('选择职位', e);
				var index = e.detail.value;
				this.zhiwei = this.zhiwei_list[index].label;
				this.zhiwei_id = this.zhiwei_list[index].id;
				console.log(this.zhiwei_id, '0000000000000');
			},
			sortConfirm(e) {
				//选择补贴类型
				console.log('选择结算方式', e);
				var index = e.detail.value;
				this.busort = this.price_sort[index].label;
				this.busort_id = this.price_sort[index].id;
			},
			sexConfirm(e) { //选择性别
				console.log('选择性别', e);
				var index = e.detail.value;
				this.sex = this.sex_sort[index].label;
				this.sex_id = this.sex_sort[index].id;

			},
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #fff;
		height: 100%;
		letter-spacing: 1px;
	}

	.active {
		background-color: #f27b04 !important;
		color: #fff !important;
	}

	.bgc {
		width: 100%;
		height: 20rpx;
		background-color: #f9f9f9;
	}

	.header {
		width: 750rpx;
		height: 440rpx;
		position: relative;

		image {
			width: 100%;
			height: 100%;
		}

		.title_txt {
			position: absolute;
			top: 0;
			left: 0;
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

		// textarea{
		// 	position: relative;
		// 	z-index: -1;
		// }
	}

	uni-textarea {
		width: 560rpx;
		height: 400rpx;
	}

	.btn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: #2a89ff;
		color: #fff;
	}

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
		width: 158upx;
		height: 158upx;
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

		.bg-img>image {
			width: 100%;
			height: 100%;
		}
	}

	.footer {
		// position: absolute;
		// left: 0;
		// bottom: 0;
		// z-index: 10;
		height: 99upx;
		width: 100%;
		line-height: 99upx;
	}

	.cu-list.menu>.cu-item {
		border-bottom: 1px solid #eee;
	}

	.cu-list.menu>.cu-item:after {
		border-bottom: 0
	}

	.cu-list.menu>.cu-item.arrow:before {
		right: 0;
	}

	.cu-list.menu.sm-border>.cu-item:after {
		left: 0;
	}

	.cu-list.menu>.cu-item.arrow {
		padding: 0;
		min-height: 140upx;
	}

	.cu-list.menu>.cu-item.arrow:before {
		top: 58upx;
		opacity: 0.6;
	}

	.cu-list.menu>.cu-item.arrow:nth-child(3):before,
	.cu-list.menu>.cu-item.arrow:nth-child(4):before,
	.cu-list.menu>.cu-item.arrow:nth-child(5):before,
	.cu-list.menu>.cu-item.arrow:nth-child(6):before,
	.cu-list.menu>.cu-item.arrow:nth-child(8):before,
	.cu-list.menu>.cu-item.arrow:nth-child(11):before {
		opacity: 0;
	}
</style>
