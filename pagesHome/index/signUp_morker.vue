<!-- 报名经纪人-->
<template>
	<view class=" padding">
		<form @submit="formSubmit" class=" ">
			<view class="head_list cu-list menu sm-border">
				<view class="cu-item arrow">
					<view class="flex align-center justify-between " style="width: 100%;">
						<view class="" style="width: 100%;">
							<view class="text-gray margin-bottom-sm" style="font-size: 13px;">姓名</view>
							<view class="other" :style="nickname ? 'color:#333;font-weight: bold;' : 'color:#e5e5e5'">
								<input type="text" name="user_nickname" v-model="nickname" @input="nicknameInput(nickname)" @blur='nickblur(nickname)'
								 placeholder="请输入真实姓名" :style="nickname ? 'color:#333;font-weight:bold' : 'color:#e5e5e5'" placeholder-style="color:#e5e5e5;" />
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
				<view class="cu-item arrow">
					<view class="flex align-center justify-between ">
						<view class="">
							<view class="text-gray margin-bottom-sm" style="font-size: 13px;">手机号码</view>
							<view class="other" :style="phone ? 'color:#333;font-weight: bold;' : 'color:#e5e5e5'">
								<input type="number" v-model="phone" maxlength="11" name="phone" placeholder="请输入手机号" :style="phone ? 'color:#333;font-weight:bold' : 'color:#e5e5e5'"
								 placeholder-style="color:#e5e5e5" />
							</view>
						</view>
					</view>
				</view>
				<view class="card_item" @tap='chooseImg(index)' v-for="(item,index) in img" :key='index'>
					<view class="">
						<view class=" margin-tb-sm">
							<image class="bg_img" :src="item.pic||IMG_URL+'static/miniwechat/cardbg.png'" mode="aspectFill" @tap.stop='yulan(item.pic)'></image>
							<view class="txt-pop">选填</view>
							<view class="btn_chuan " v-show="item.pic==''">
								<view class="btn_center flex align-center justify-center">
									<image :src="IMG_URL+'static/miniwechat/xiangji@2x.png'" mode="aspectFill"></image>
									<view class="" style="">{{item.content}}</view>
								</view>
							</view>
						</view>
						<view class="f24 text-gray">
							说明：{{item.desc}}
						</view>
					</view>
				</view>
				<view class="cu-item arrow w100">
					<view class="flex align-center justify-between  w100">
						<view class="w100">
							<view class="text-gray margin-bottom-sm" style="font-size: 13px;">填写报名企业和价格</view>
							<view class="other " :style="companyName ? 'color:#333;font-weight: bold;' : 'color:#e5e5e5'">
								<input type="text" v-model="companyName" maxlength="20" name="companyName" placeholder="请输入报名企业名称和价格" :style="companyName ? 'color:#333;font-weight:bold' : 'color:#e5e5e5'"
								 placeholder-style="color:#e5e5e5" />
							</view>
						</view>
					</view>
				</view>
				<view>
					<button class="btn_next bg_deep" style="height: 88upx;margin-bottom: 80upx;" form-type="submit">报名</button>
				</view>
			</view>
		</form>

	</view>
</template>
<script>
	import benUpload from '@/components/ben-upload/ben-upload.vue';
	const Checker = require('@/common/js/formValidation.js');
	export default {
		components: {
			benUpload
		},
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
				img: [{
					pic: '',
					id: '',
					content: '上传身份证照片',
					desc: '上传身份证照片正面'
				}, {
					pic: '',
					id: '',
					content: '上传身份证照片',
					desc: '上传身份证照片反面'
				}],
				isopen: true,
				color: '#0289FF',
				user_type: 1, //绑定用户的类型
				IMG_URL:this.IMG_URL,
				nickname: '', //姓名
				companyName: '', //公司id
				job_id: '', //职位id
				phone: '', //手机号码
				isDefault: 0, //是否提交简历
				checked: false,
				red_envelope_type: '', //是否有红包
			};
		},
		onLoad(option) {
			this.agent_id = option.id;
			this.phone = uni.getStorageSync('USERINFO').mobile
		},
		methods: {
			chooseImg(index) {
				this.$Request.uploadImg((res) => {
					this.$Common.toast(res.msg);
					if (res.code == 1) {
						this.img[index].pic = res.data[0].path;
						this.img[index].id = res.data[0].id;
					}
				})
			},
			yulan(pic) { //预览
				this.$Common.lookImg(pic);
			},
			nicknameInput(name) {
				//验证姓名长度
				if (name && name.length > 6) {
					this.$Common.toast('姓名不能超过六个字符');
				}
			},
			nickblur(name) {
				//姓名输入失去焦点
				if (name && name.length < 2) {
					this.$Common.toast('姓名不能少于2个字符');
				}
			},
			chooseSex(item, index) {
				//选择性别
				this.sexIndex = item.value;
				console.log(this.sexIndex);
			},
			bindPickerChange: function(e) {
				//性别选择回调
				this.sexIndex = e.detail.value;
			},

			//选择按钮
			switch1Change(e) {
				if (e.target.value) {
					this.isDefault = 1;
					this.checked = true
				} else {
					this.isDefault = 0;
					this.checked = false
				}
			},
			formSubmit: function(e) {
				//form提交
				console.log(e.detail.value);
				//定义表单规则
				var rule = [{
						name: 'user_nickname',
						rule: ['required', 'minLength:2', 'maxLength:6'], //可使用区间，此处主要测试功能
						msg: ['请输入姓名', '姓名必须2个或以上字符', '姓名不能超过6个字符']
					},
					{
						name: 'phone',
						rule: ['required'],
						msg: ['请输入手机号']
					},
				];
				//进行表单检查
				var formData = e.detail.value
				// 验证
				var checkRes = Checker.validation(formData, rule);
				// console.log(checkRes);
				if (checkRes) {
					this.$Common.toast(checkRes);
					return false;
				}
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
					this.$Common.toast('请输入正确的手机号');
					return false;
				}

				if (this.companyName == '') {
					this.$Common.toast('请输入报名企业和价格');
					return
				}
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				let idcard_front = '',
					idcard_reverse = ''
				if (this.img[0]) {
					idcard_front = this.img[0].id
				}
				if (this.img[1]) {
					idcard_reverse = this.img[1].id
				}
				this.$Request.post(this.$api.job.signUp_morker, {
					agent_id: this.agent_id, //经纪人用户id
					corporate_name: this.companyName, //报名的公司
					user_name: this.nickname, //姓名
					sex: this.sexIndex,
					phone: this.phone, //手机号
					idcard_front: idcard_front || '', //正面
					idcard_reverse: idcard_reverse || '', //反面
				}).then(res => {
					if (res.code == 1) {
						this.$Common.toast('报名成功');
						uni.$emit('updatesignUpList')
						setTimeout(() => {
							uni.navigateBack({})
						}, 300)
					} else {
						this.$Common.toast(res.msg);
					}
				}).catch(err => {
					this.$Common.toast('网络错误，请稍后再试');
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

	.cu-list.menu>.cu-item.arrow:before {
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

	.card_item {
		width: 686upx;
		// height: 403upx;
		margin: auto;
		position: relative;
		margin-bottom: 40upx;

		.bg_img {
			width: 686upx;
			height: 403upx;
		}
	}

	.btn_chuan {
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 370upx;
		height: 77upx;
		background-color: #1B90FF;
		color: #FFFFFF;
		font-size: 28upx;
		border-radius: 39upx;
		text-align: center;
		z-index: 10;

		.btn_center {
			margin: auto;
			width: 370upx;
			padding: 20upx 0;
			line-height: 1.2;
			text-align: center;

			image {
				width: 34upx;
				margin-right: 17upx;
				height: 26upx;
			}
		}

	}

	.picker {
		background: #00b26a;
		width: 100%;
		line-height: 40px;
	}

	.head_list {
		background: #fff;
		// padding: 20rpx 0;
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

	.txt-pop {
		position: absolute;
		top: 25%;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
