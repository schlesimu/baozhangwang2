<!-- 我的简历 编辑资料 -->
<template>
	<view class=" padding">
		<view class="head_list cu-list menu sm-border">
			<view class="">
				<view class=" justify-center" style="display: flex;align-items: center;">
					<view class="r_msg flex flex-sub justify-center align-center">
						<view class="demo-face grace-relative grace-img-in bg-f2f3 round">
							<image @tap.stop="yulan(resumeInfo.head_img)" :src="resumeInfo.head_img ? resumeInfo.head_img : IMG_URL + 'static/miniwechat/logo.png'"
							 mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="ptb15">
				<view class="flex align-center  " style="width: 100%;">
					<view class="padding-right-sm " style="font-size: 13px;">姓名</view>
					<view class="other" :style="nickname ? 'color:#333;font-weight: bold;' : 'color:#e5e5e5'">
						<input type="text" name="user_nickname" v-model="nickname" disabled="true" placeholder="请输入姓名" :style="nickname ? 'color:#333;font-weight:bold' : 'color:#e5e5e5'"
						 placeholder-style="color:#e5e5e5;" />
					</view>
				</view>
			</view>
			<view class="ptb15">
				<view class="flex align-center  " style="width: 100%;">
					<view class=" padding-right-sm" style="font-size: 13px;">性别</view>
					<view class="flex align-center justify-start"> {{resumeInfo.sex==2?'女':'男'}}</view>
				</view>
			</view>
			<view class="ptb15">
				<view class="flex align-center  ">
					<view class=" padding-right-sm" style="font-size: 13px;">手机号</view>
					<view class="other" :style="phone ? 'color:#333;font-weight: bold;' : 'color:#e5e5e5'">
						<input type="number" v-model="phone" name="phone" placeholder="请输入手机号" disabled :style="phone ? 'color:#333;font-weight:bold' : 'color:#e5e5e5'"
						 placeholder-style="color:#e5e5e5" />
					</view>
				</view>
			</view>
			<view class="ptb15">
				<view class="" style="display: flex;">
					<text class="text-df padding-right-sm">生日</text>
					<view style="font-size: 32rpx;" class="text-bold text-333" :style="resumeInfo.birthday ? 'color: #333;' : 'color: #BFBFBF;'">
						<input type="text" name="birthday" :value="resumeInfo.birthday" class="hide" />
						{{ resumeInfo.birthday || '无' }}
					</view>
				</view>
			</view>
			<view class="ptb15">
				<view class="" style="display: flex;">
					<text class="text-df padding-right-sm">现居住地</text>
					<view class="other text-bold" :style="resumeInfo.hometown ? 'color:#333' : 'color:#BFBFBF'">
						<input type="text" name="hometown" :value="resumeInfo.hometown" class="hide" />
						{{resumeInfo.hometown || '无' }}
					</view>
				</view>
			</view>
			<view class="ptb15  " style="width: 100%;">
				<view class=" align-center flex " style="width: 80%;">
					<text class="text-df padding-right-sm">期望行业职位</text>
					<view class="text-bold" :style="resumeInfo.want_find ? 'color:#333' : 'color:#BFBFBF'">
						{{ resumeInfo.want_find }} </view>
				</view>
			</view>
			<view class="ptb15  " style="width: 100%;">
				<view class=" align-center flex " style="width: 80%;">
					<text class="text-df padding-right-sm">职位类别</text>
					<view class="text-bold" :style="resumeInfo.station ? 'color:#333' : 'color:#BFBFBF'">
						{{ resumeInfo.station }} </view>
				</view>
			</view>
			<view class="ptb15">
				<view class="" style="display: flex;">
					<text class="text-df padding-right-sm">工作经验</text>
					<view class="text-bold" :style="resumeInfo.work_experience ? 'color:#333' : 'color:#BFBFBF'">
						{{ resumeInfo.work_experience  || '无' }}
					</view>
				</view>
			</view>
			<view class="ptb15">
				<view class="" style="display: flex;">
					<text class="text-df padding-right-sm">期望薪资</text>
					<view class="text-bold" :style="resumeInfo.salary ? 'color:#333' : 'color:#BFBFBF'">
						{{ resumeInfo.salary  || '无' }}
					</view>
				</view>
			</view>
			<view class="ptb15">
				<view class="" style="display: flex;">
					<text class="text-df padding-right-sm">最高学历</text>
					<view class="text-bold" :style="resumeInfo.education ? 'color:#333' : 'color:#BFBFBF'">
						{{ resumeInfo.education || '无' }}
						<input type="text" :value="resumeInfo.education || ''" name="education" class="hide" />
					</view>
				</view>
			</view>
			<view class="ptb15">
				<view class="">
					<text class="text-df ">个人爱好</text>
					<view class="text-bold padding-top-sm" :style="resumeInfo.hobby ? 'color:#333' : 'color:#BFBFBF'">
						{{ resumeInfo.hobby || '无' }}
						<input type="text" :value="resumeInfo.hobby || ''" name="hobby" class="hide" />
					</view>
				</view>
			</view>
			<view class="ptb15">
				<view class="">
					<text class="text-df ">自我描述</text>
					<view class="text-bold padding-top-sm ewrap" :style="resumeInfo.personal_profile ? 'color:#333' : 'color:#BFBFBF'">
						{{ resumeInfo.personal_profile || '无' }}
					</view>
				</view>
			</view>
			<view class="margin-top bg-white " v-if="resumeInfo.work_data!=''">
				<view class="flex justify-between">
					<view class=" text-bold  text-333 margin-bottom-sm">工作经历</view>
				</view>
				<view class="job_list">
					<view class="item padding-tb-sm" v-for="(item, index) in resumeInfo.work_data" :key="index">
						<view class="flex justify-between align-center">
							<text class="text-bold " style="font-size: 28upx;">{{ item.company_name }}</text>
							<text class="text-gray text-df">{{ item.start_time }}-{{ item.end_time }}</text>
						</view>
						<view class="text-gray  padding-tb-xs" style="font-size: 13px;">{{ item.position }}
						</view>
						<view class="text-gray text-df" style="word-wrap:break-word;word-break:break-all;">
							{{ item.job_description }}
						</view>
					</view>
				</view>
			</view>
			<view class="margin-top bg-white " v-if="resumeInfo.education_data!=''">
				<view class="flex justify-between">
					<view class=" text-bold text-333 text-lg">教育经历</view>
				</view>
				<view class="job_list">
					<view class="item padding-tb-sm" v-for="(item, index) in resumeInfo.education_data" :key="index">
						<view class="  flex justify-between align-center">
							<text class="text-bold">{{ item.school_name }}</text>
							<text class="text-df text-gray">{{ item.start_time }}-{{ item.end_time }}</text>
						</view>
						<view class="text-gray padding-tb-xs" style="font-size: 13px;">{{ item.major_name }}</view>
						<view class="text-gray text-df">{{ item.job_description }}</view>
					</view>
				</view>
			</view>
			<view class="ptb15" v-if="resumeInfo.life_photos_arr">
				<view class="flex justify-between">
					<view class=" text-bold text-333 text-lg">技能照片</view>
				</view>
				<view class=" flex align-center flex-wrap">
					<view class=" lifePic margin-top-sm" v-for="(item,index) in resumeInfo.life_photos_arr" :key='index'>
						<image :src="item.url" mode="" class="img-200" @tap='ViewImage(resumeInfo.life_photos_arr,index)'></image>
					</view>
				</view>

			</view>
			<view class="ptb15" v-if="card_front_id_url">
				<view class="" style="width: 100%;">
					<view class=" margin-bottom-sm" style="font-size: 13px;">身份照片(正面)</view>
					<view class="pic_item" style="height: 403upx;" @tap='yulan(card_front_id_url)' >
						<image :src="card_front_id_url||'../static/images/logo.png'" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="cu-item arrow" v-if="card_side_id_url">
				<view class="" style="width: 100%;">
					<view class=" margin-bottom-sm" style="font-size: 13px;">身份照片(反面)</view>
					<view class="pic_item" style="height: 403upx;" @tap='yulan(card_side_id_url)'>
						<image :src="card_side_id_url||'../static/images/logo.png'" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<!-- <view class="cu-item arrow ">
				<view class="" style="width: 100%;">
					<view class=" margin-bottom-sm" style="font-size: 13px;">简历照片</view>
					<view class="pic_item mb10" @tap='yulan(item,index)' v-for="(item,index) in resume_url" :key='index' v-if="resume_url!=''">
						<image :src="item||'../static/images/logo.png'" mode="widthFix"></image>
					</view>
					<view class="f26 pt10" v-if="resume_url==''">未上传</view>
				</view>
			</view> -->
		</view>
		<view class="handle_footer flex justify-around" v-if="show">
			<view class="flex justify-around column alcenter sevirce_btn" @tap="refuse">
				<text class=" text-df ">拒绝</text>
			</view>
			<view class="flex justify-center column alcenter btn apply_btn" @tap="agree">
				<view class="">同意报名</view>
			</view>
		</view>
	</view>
</template>
<script>
	const Checker = require('@/common/js/formValidation.js');
	export default {
		components: {},
		data() {
			return {
				sexIndex: 1, //性别
				sex: [{
						value: 1,
						label: '男'
					},
					{
						value: 2,
						label: '女'
					}
				],
				user: {}, //绑定用户信息
				card_front_id_url: '', //正面
				card_side_id_url: '', //反面
				IMG_URL:this.IMG_URL,
				resumeInfo: '', //简历信息
				userId: '', //求职者id
				aid: '', //简历id
				user_type: 1, //绑定用户的类型
				nickname: '', //姓名
				phone: '', //手机号码
				resume_url: [], //简历照片
				job_position_id: '', //职位id
				set_up: '', //1：同意 2：拒绝
				show: true, //是否展示操作按钮
			};
		},
		onLoad(e) {
			this.edittype = e.edittype;
			this.aid = e.aid
			this.userId = e.uid
			uni.showLoading({})
			this.getinfo(); //获取用户信息
		},
		methods: {
			refuse() { //拒绝
				this.set_up = 2
				this.setStatus()
			},
			agree() { //同意
				this.set_up = 1
				this.setStatus()
			},
			setStatus() { //报名状态  setsignUp_status
				this.$Request.post(this.$api.company.setsignUp_status, {
					job_position_id: this.userId, //职位id
					aid: this.aid, //报名主键id
					set_up: this.set_up, //1 同意 2 拒绝
				}).then(res => {
					if (res.code == 1) {
						uni.$emit('change_signStatus', {})
						uni.navigateBack({})
					} else {
						this.$Common.toast(res.msg);
					}
				});
			},
			yulan(pic, index) {
				//图片预览
				this.$Common.lookImg(pic);
			},
			// 技能图片预览
			ViewImage(url, index) {
				let list = []
				url.map(item => {
					list.push(item.url)
				})
				this.$Common.lookImg(list, index)
			},
			getinfo: function() {
				//获取报名人信息
				this.$Request.post(this.$api.company.lookResume_detail, {
					user_id: this.userId,
					aid: this.aid
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						this.resumeInfo = res.data.resume
						this.nickname = res.data.username;
						this.sexIndex = res.data.sex;
						this.card_side_id_url = res.data.card_side_id_url || '';
						this.card_front_id_url = res.data.card_front_id_url || '';
						this.resume_url = res.data.resume_url
						this.phone = res.data.phone
						this.job_position_id = res.data.job_position_id
						if (res.data.set_up_status == 1 || res.data.set_up_status == 2) {
							this.show = false
						}
					} else {
						this.$Common.toast(res.msg);
					}
				});
			},
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

	.handle_footer {
		z-index: 99;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		height: 150rpx;
		padding-top: 30upx;

		view {
			width: 307upx;
			height: 78upx;
			line-height: 78upx;
			text-align: center;
		}

		.sevirce_btn {
			background: #FFFFFF;
			border: 1px solid #EEEEEE;
			color: #666;
		}

		.btn {
			background-color: #1B90FF;
			color: #FFFFFF;
		}
	}

	.pic_item {
		width: 100%;
		// height: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.cu-list.menu>.cu-item:nth-child(6) {
		margin-bottom: 0;
	}

	.active {
		border: 1px solid #1b90ff;
		color: #1b90ff;
		background-color: #ecf6ff;
	}

	.cu-list.menu>.cu-item {
		min-height: 110rpx;
		font-size: 28rpx;
		margin-bottom: 40upx;
		padding: 20upx 30upx;
	}

	.cu-list.menu>.cu-item.arrow::before {
		content: '';
	}

	.cu-list.menu>.cu-item:nth-child(9):after {
		border-bottom: 0;
	}

	.cu-list.menu>.cu-item.arrow {
		padding: 0;
		min-height: 120upx;
	}

	.cu-list.menu>.cu-item.arrow:before {
		top: 58upx;
		opacity: 0.6;
	}

	.cu-list.menu>.cu-item.arrow:nth-child(1):before {
		top: 0;
	}

	.cu-list.menu.sm-border>.cu-item:after {
		width: 200% !important;
		left: 0;
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

	.lifePic {
		margin-right: 42upx;
	}

	.lifePic:nth-child(3n) {
		margin-right: 0upx;
	}

	.head_list {
		background: #fff;
		padding-bottom: 140upx;
	}
</style>
