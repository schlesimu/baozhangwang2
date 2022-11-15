<!-- 教育经历 -->
<template>
	<view class="">
		<cu-custom bgColor="text-black bg-white" :isBack="true">
			<block slot="content"><text class="text-bold">教育经历</text></block>
			<block slot="right">
				<view class="padding" style="color: #2A89FF;"></view>
			</block>
		</cu-custom>
		<view class="head_list cu-list menu sm-border ">
			<view class="cu-item arrow" @tap="toggleTab('degree')">
				<view class="">
					<view class="text-df  margin-bottom-sm">学历</view>
					<view class="other" :style="degree_act.label ? 'color:#333' : 'color:#BFBFBF'">
						{{ degree_act.label || '请选择学历' }}
						<input type="text" :value="degree_act.id || ''" name="education" class="hide" />
					</view>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="flex align-center justify-between ">
					<view class="">
						<view class=" margin-bottom-sm">学校名称</view>
						<view class="other" :style="school_name ? 'color:#333;' : 'color:#e5e5e5'">
							<input type="text" v-model="school_name" name="school_name" placeholder="请输入学校名称"
								:placeholder-style="school_name? 'color:#333;' : 'color:#e5e5e5'" />
						</view>
					</view>
				</view>
			</view>

			<view class="cu-item arrow">
				<view class="">
					<text class="text-df  margin-bottom-sm">专业</text>
					<view class=" margin-top-sm" :style="major_name ? 'color:#333;' : 'color:#e5e5e5'">
						<input type="text" v-model="major_name" name="major_name" placeholder="请输入学科专业"
							:placeholder-style="major_name? 'color:#333;' : 'color:#e5e5e5'" />
					</view>
				</view>
			</view>
			<view class="cu-item arrow" @tap="toggleTab('range')">
				<view class="">
					<text class="text-df  ">教育时间段</text>
					<view class="text-df margin-top-sm" :style="time ? 'color:#333' : 'color:#E5E5E5'">
						{{ time || '请选择时间段' }}
					</view>
				</view>
			</view>
			<view class="save">
				<view class="btn_next" @tap="store">
					保存
				</view>
			</view>
			<!-- 时间选择框 -->
			<w-picker mode="range" :visible.sync="range" startYear="2000" endYear="2040" :current="false"
				@confirm="onConfirm" ref="range" themeColor="#2A89FF"></w-picker>
			<w-picker :visible.sync="degree" v-if="degree_list.length > 0" mode="selector" :options="degree_list"
				@confirm="degreeConfirm" ref="degree" themeColor="#2A89FF"></w-picker>
		</view>
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
				time: '', //工作时间显示
				start_time: '', //工作时间段-开始时间
				end_time: '', //工作时间段-结束时间
				range: false, //教育时间段
				degree: false, //学历
				degree_list: [], //学位列表
				degree_act: '', //选中的学位
				school_name: '', //学校名称
				major_name: '', //专业名称
				isLoading: false, //防连if (uni.getSystemInfoSync().platform == "android") {
				aid: '', //教育经历id
			}
		},
		onLoad(e) {
			this.aid = e.aid
			this.getDegree();
			if (e.aid) {
				this.getexperienceOne()
			}
		},

		methods: {
			store() {
				//点击保存			
				this.submit();
			},
			// 获取经历信息   getexperienceOne
			getexperienceOne() {
				this.$Request.post(this.$api.user.getexperienceOne, {
					type: 1, //1：教育 2：工作
					aid: this.aid
				}).then(res => {
					if (res.code == '1') {
						this.school_name = res.data.school_name
						this.start_time = res.data.start_time
						this.end_time = res.data.end_time
						this.time = this.start_time + '-' + this.end_time;
						this.major_name = res.data.major_name
						this.degree_act = {
							label: res.data.education_name,
							id: res.data.education
						}
					} else {
						this.$Common.toast(res.msg);
					}
				}).catch(err => {
					this.$Common.toast('网络错误，请稍后再试');
				});
			},
			submit() {
				//提交
				if (this.isLoading) {
					return
				}
				if (!this.degree_act) {
					this.$Common.toast('请选择学历');
					return false;
				}
				if (!this.school_name) {
					this.$Common.toast('请输入学校名称');
					return false;
				}
				if (!this.major_name) {
					this.$Common.toast('请输入专业');
					return false;
				}
				if (!this.time) {
					this.$Common.toast('请选择时间段');
					return false;
				}
				// 验证
				let data = {
					education: this.degree_act.id,
					school_name: this.school_name,
					major_name: this.major_name,
					start_time: this.start_time,
					end_time: this.end_time,
					aid: this.aid || 0
				};
				// 去添加教育经历
				this.isLoading = true
				this.$Request.post(this.$api.user.user_add_education, data).then(res => {
					this.$Common.toast(res.msg);
					this.isLoading = false
					if (res.code == '1') {
						uni.$emit('my_jianli')
						uni.navigateBack();
					}
				});
			},
			getDegree() {
				//获取学位
				this.$Request.post(this.$api.user.user_degree, {
					type: 1
				}).then(res => {
					if (res.code == '1') {
						this.degree_list = res.data;
					}
				});
			},
			toggleTab(who) {
				//显示选择组件
				this.$data[who] = true;
			},
			degreeConfirm(val) {
				//选择最高学历回调
				console.log('选择学历', val);
				this.degree_act = val.obj;
			},
			// 时间选择
			onConfirm(e) {
				//选择工作时间段
				this.start_time = e.obj.fyear + '.' + e.obj.fmonth;
				this.end_time = e.obj.tyear + '.' + e.obj.tmonth;
				this.time = this.start_time + '-' + this.end_time;
			}
		}
	};
</script>

<style lang="scss">
	.cu-list.menu>.cu-item.arrow:nth-child(2):before,
	.cu-list.menu>.cu-item.arrow:nth-child(3):before {
		content: '';
	}

	.cu-list.menu>.cu-item.arrow {
		min-height: 150upx;
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
