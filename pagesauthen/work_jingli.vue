<!-- 工作经历 -->
<template>
	<view class=" bg-white">
		<cu-custom bgColor="text-black bg-white" :isBack="true">
			<block slot="content"><text class="text-bold">工作经历</text></block>
			<block slot="right">
				<view class="padding" style="color: #2A89FF;"></view>
			</block>
		</cu-custom>
		<view class="head_list cu-list menu sm-border">
			<view class="ptb15 plr10">
				<view class="content ">
					<view class="text-df margin-bottom-sm text-333">职位名称</view>
					<view class=" " style="flex: 1;">
						<input type="text" v-model="position" name="position" placeholder="请输入职位名称"
							:placeholder-style="position? 'color:#333;' : 'color:#e5e5e5'" />
					</view>
				</view>
			</view>
			<view class="ptb15 plr10">
				<view class="content" style="">
					<view class="text-df margin-bottom-sm text-333">公司名称</view>
					<view class="other" :style="company_name ? 'color:#333;' : 'color:#e5e5e5'">
						<input type="text" v-model="company_name" name="company_name" placeholder="请输入公司名称"
							:placeholder-style="company_name? 'color:#333;' : 'color:#e5e5e5'" />
					</view>

				</view>
			</view>
			<view class="ptb15 plr10">
				<view class="content" style="" @tap="timer">
					<view class="text-df margin-bottom-sm text-333">工作时间段</view>
					<view class="text-df text-gray " :style="time ? 'color:#666666' : 'color:#E5E5E5'">
						{{ time || '请选择时间段' }}
					</view>
				</view>
			</view>
			<view class="ptb15 plr10 ">
				<view class=" margin-right " style="padding-left: 10upx;">
					<view class="title margin-bottom-sm text-df">工作内容</view>
					<view class="" style="letter-spacing: 2upx;"
						:style="job_description ? 'color:#333;' : 'color:#e5e5e5'">
						<textarea style="width: 686upx;" auto-height='true' :adjust-position='false' maxlength='200'
							v-model="job_description" placeholder="请输入工作内容"
							:placeholder-style="job_description? 'color:#333;' : 'color:#e5e5e5'" />
					</view>
					<view class="text-gray" style="text-align: right;width: 100%;margin-right: 40upx;">
						{{ job_description.length }}/
						<text :class="job_description.length > 600 ? 'text-red' : 'text-gray'">200</text>
					</view>
				</view>

			</view>
		</view>
		<view class="save">
			<view class="btn_next" @tap="store">
				保存
			</view>
		</view>
		<!-- 时间选择框 -->
		<w-picker :visible.sync="range" mode="range" :defaultVal="['2017', '12', '-', '2019', '12']" :current="false"
			@confirm="onConfirm" ref="range" themeColor="#2A89FF"></w-picker>
	</view>
</template>

<script>
	import wPicker from '@/components/w-picker/w-picker.vue';
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				job_description: '', //工作内容
				position: '', //职位
				company_name: '', //公司名称
				time: '', //工作时间显示
				start_time: '', //工作时间段-开始时间
				end_time: '', //工作时间段-结束时间
				range: false, //在职时间
				isLoading: false, //防连点
				aid: '', //工作经历id
			};
		},
		onLoad(e) {
			this.aid = e.aid
			// 监听我选择我做过
			uni.$on('position', data => {
				console.log(data, '监听我选择我做过');
				this.position = data;
			});
			if (e.aid) {
				this.getexperienceOne()
			}
		},
		onUnload() {
			uni.$off('addjob')
		},
		methods: {
			// 获取经历信息   user_undergo_list
			getexperienceOne() {
				this.$Request.post(this.$api.user.getexperienceOne, {
					type: 2, //1：教育 2：工作
					aid: this.aid
				}).then(res => {
					if (res.code == '1') {
						if (res.data.work != '') {
							this.company_name = res.data.company_name
							this.job_description = res.data.job_description
							this.position = res.data.position
							this.start_time = res.data.start_time
							this.end_time = res.data.end_time
							this.time = this.start_time + '-' + this.end_time;
						}
					} else {
						this.$Common.toast(res.msg);
					}
				}).catch(err => {
					this.$Common.toast('网络错误，请稍后再试');
				});
			},
			submit() {
				if (this.isLoading) {
					return
				}
				//提交
				if (this.position == '') {
					this.$Common.toast('请选择职位');
					return false;
				}
				if (!this.company_name) {
					this.$Common.toast('请输入公司名称');
					return false;
				}
				if (!this.time) {
					this.$Common.toast('请选择在职时间');
					return false;
				}
				if (!this.job_description) {
					this.$Common.toast('请输入工作内容');
					return false;
				}
				if (this.job_description.length > 600) {
					this.$Common.toast('职位描述大于600字');
					return false;
				}
				// 验证
				let data = {
					position: this.position,
					company_name: this.company_name,
					job_description: this.job_description,
					start_time: this.start_time,
					end_time: this.end_time,
					aid: this.aid || 0,
				};
				// 去添加工作经历
				this.isLoading = true
				this.$Request.post(this.$api.user.user_add_experience, data).then(res => {
					this.$Common.toast(res.msg);
					this.isLoading = false
					if (res.code == '1') {
						uni.$emit('my_jianli')
						uni.navigateBack();
					}
				}).catch(err => {
					this.$Common.toast('网络错误，请稍后再试');
				});
			},
			store() {
				//点击保存
				this.submit();
			},
			// 点击i职位标签跳转
			gobiaoqian() {
				uni.navigateTo({
					url: '../pagescommon/my_search',
				});
			},
			timer() {
				// 时间选择
				this.$data.range = true;
			},
			onConfirm(e) {
				//选择工作时间段
				console.log(e);
				this.start_time = e.obj.fyear + '.' + e.obj.fmonth;
				this.end_time = e.obj.tyear + '.' + e.obj.tmonth;
				this.time = this.start_time + '-' + this.end_time;
			}
		}
	};
</script>

<style lang="scss">
	.active {
		background-color: #F27B04 !important;
		color: #fff !important;
	}

	.biaoqian {
		width: 28%;
		padding: 10rpx 0rpx;
		background-color: #ebefee;
		border-radius: 10rpx;
		font-size: 28rpx;
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

	.cu-list.menu>.cu-item {
		min-height: 150upx;
	}

	.cu-list.menu>.cu-item.arrow:nth-child(2):before,
	.cu-list.menu>.cu-item.arrow:nth-child(4):before {
		content: '';
	}

	.cu-list.menu>.cu-item.arrow:before {
		top: 58upx;
		opacity: 0.6;
	}

	.save {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		z-index: 100;
		padding: 40upx 0;
	}
</style>
