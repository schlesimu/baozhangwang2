<template>
	<view class="padding brt_e" style="height: auto;" :style="{ paddingBottom: paddingBottom }">
		<view style="height: 100vh; line-height: 100vh; font-weight: 300; font-size: 24upx; text-align: center;" v-if="showLoading">数据加载中...</view>
		<!-- 小时工|正式工 -->
		<view class="grace-body" v-if="!showLoading">
			<form @submit="formSubmit" class="grace-form grace-margin-top" v-if="salaryType === 0 || salaryType === 1">
				<view class="cu-list menu sm-border margin-lr" style="padding-bottom: 300rpx;">
					<view class="flex align-center justify-between ptb10">
						<view class="flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm">
								<!-- <text class="text-red  text-xl">*</text> -->
								<text>日期选择：</text>
							</text>
							<view style="width: 100%;"><uni-datetime-picker type="date" :clear-icon="false" v-model="day" @change="selectDate" /></view>
						</view>
					</view>
					<view class="flex align-center justify-between ptb10">
						<view class="flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm">
								<!-- <text class="text-red  text-xl">*</text> -->
								<text>当日工时：</text>
							</text>
							<view
								style="width: 84upx; height: 72upx; border-radius: 8upx; background-color: #2979ff; text-align: center; line-height: 72upx; font-size: 48upx; color: #fff; font-weight: 700;"
								:style="isDisabled ? 'background-color: #BFBFBF' : 'background-color: #2979ff'"
								@click="reduce"
							>
								-
							</view>
							<input
								type="number"
								class="input"
								style="width: 18%; text-align: center; border: 0; font-weight: 600; color: #2979ff;"
								:style="isDisabled ? 'color:#BFBFBF' : 'color:#2979ff'"
								name="dayHour"
								v-model="dayHour"
								placeholder="8"
								placeholder-style="font-size: 28rpx;"
								:placeholder-style="dayHour ? 'color:#666' : 'color:#BFBFBF'"
								:disabled="isDisabled"
							/>
							<view
								style="width: 84upx; height: 72upx; border-radius: 8upx; background-color: #2979ff; text-align: center; line-height: 72upx; font-size: 48upx; color: #fff; font-weight: 700;"
								:style="isDisabled ? 'background-color: #BFBFBF' : 'background-color: #2979ff'"
								@click="increase"
							>
								+
							</view>
							<view style="margin-left: 10upx;">小时</view>
						</view>
					</view>
					<view style="width: 100%; margin: 20upx 0; display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;">
						<view
							style="text-align: center; border-radius: 8upx; border: 1px solid #ccc; font-weigth: 600; margin-bottom: 8upx; width: 72upx; height: 72upx; margin-left: 6upx; line-height: 64upx;"
							v-for="(item, index) in hourList"
							:key="index"
							@click="selectHour(index)"
							:style="currentIndex === index ? 'background: #2979ff; color: #fff;' : ''"
						>
							{{ item }}
						</view>
					</view>
					<view class="flex align-center justify-between ptb10">
						<view class=" flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm"><text>班型选择：</text></text>
							<view style="width: 100%;">
								<uni-data-select v-model="dayOrNight" :localdata="workTypeList" @change="selectWorkType" :clear="false"></uni-data-select>
							</view>
						</view>
					</view>
					<view class="flex align-center justify-between ptb10">
						<view class=" flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm"><text>小时工资：</text></text>
							<input type="number" class="input" style="width: 100%; color: #ccc; border: none;" name="hourPrice" v-model="hourPrice" :disabled="true" />
							<text>元</text>
						</view>
					</view>
					<view v-if="salaryType === 1 && showOvertime">
						<view class="flex align-center justify-between ptb10">
							<view class=" flex align-center" style="width: 100%;">
								<text class="text-lg flex_shrink padding-right-sm"><text>加班倍数：</text></text>
								<view style="flex: 0 0 40%;">
									<uni-data-select v-model="workRatio" :localdata="workRatioList" @change="selectWorkRatio" :disabled="true" :clear="false"></uni-data-select>
								</view>
								<view style="flex: 1 1 20%;text-align: right;">{{ workPrice }}元/时</view>
							</view>
						</view>
						<view class="flex align-center justify-between ptb10">
							<view class=" flex align-center" style="width: 100%;">
								<text class="text-lg flex_shrink padding-right-sm"><text>加班时长：</text></text>
								<input type="number" class="input" style="width: 100%; color: #ccc; border: none;" name="overtimeLong" v-model="overtimeLong" :disabled="true" />
								<text>时</text>
							</view>
						</view>
						<view class="flex align-center justify-between ptb10">
							<view class=" flex align-center" style="width: 100%;">
								<text class="text-lg flex_shrink padding-right-sm"><text>加班收入：</text></text>
								<input type="number" class="input" style="width: 100%; color: #ccc; border: none;" name="overtimeLong" v-model="overtimeSalary" :disabled="true" />
								<text>元</text>
							</view>
						</view>
						<view style="font-size: 24upx; background-color:#e43d33; color: #fff; font-weight: 500; padding: 20upx 30upx; border-radius: 8upx; margin: 10upx 0 0;">
							工作日，超过您设置的正常工作时间按加班计算；周六日或节假日，全天按加班计算。
						</view>
					</view>
					<view class="flex align-center justify-between ptb10">
						<view class=" flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm"><text>当日收入：</text></text>
							<input
								type="number"
								class="input"
								style="width: 100%;"
								name="salary"
								v-model="actualSalary"
								:style="isDisabled ? 'color:#BFBFBF' : 'color:#333'"
								:disabled="isDisabled"
							/>
							<text>元</text>
						</view>
					</view>
					<view class="pt10 mt10">
						<view>
							<view class="text-lg margin-bottom">备注：</view>
							<view class="areabox text-lg bg-f2f3 radius-16 padding" style="height: 379upx;">
								<textarea
									name="description"
									placeholder="请输入备注"
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
				</view>
				<view
					class="fixed"
					style="width: 100%; bottom: 0; left: 0; z-index: 19841004; background-color: #FFFFFF; padding: 10upx 0 20upx; border-top: 1px solid #efefef; border-top-left-radius: 28upx; border-top-right-radius: 28upx;"
				>
					<button class="btn_next round " style="margin: 0 auto; margin-bottom: 20upx;margin-top: 30upx;" form-type="submit">确认提交</button>
					<view
						class="btn_next round "
						style="margin: 0 auto; margin-bottom: 20upx;margin-top: 30upx; background-color: #f8f8f8; color: #5f5f5f;"
						@click="resetClick"
					>
						恢复默认
					</view>
				</view>
			</form>

			<form @submit="formSubmit" class="grace-form grace-margin-top" v-if="salaryType === 2">
				<view class="cu-list menu sm-border" style="padding-bottom: 300rpx;">
					<view class="flex align-center justify-between ptb10">
						<view class="flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm">
								<text class="text-red  text-xl">*</text>
								<text>日期选择：</text>
							</text>
							<view style="width: 100%;"><uni-datetime-picker type="date" :clear-icon="false" v-model="day" @change="selectDate" /></view>
						</view>
					</view>

					<view
						style="border: 1px solid #ccc; border-radius: 16upx; background-color: rgba(41,121,255,.05); padding: 20upx; margin-bottom: 30upx;"
						v-for="(item, index) in pieceWorkConfig.pieceWorkList"
						:key="index"
					>
						<view class="flex align-center justify-between">
							<view class=" flex align-center" style="width: 100%;">
								<text class="text-lg flex_shrink padding-right-sm"><text>工种名称：</text></text>
								<view style="width: 34%; color: #2979ff;">{{ item.jobName }}</view>
								<view class=" flex align-center" style="width: 52%;">
									<text class="text-lg flex_shrink padding-right-sm"><text>工种单价：</text></text>
									<input type="number" class="input" style="width: 100%; color: #ccc; border: none;" name="jobPrice" v-model="item.jobPrice" :disabled="true" />
									<text>元</text>
								</view>
							</view>
						</view>
						<view class="flex align-center justify-between pt10">
							<view class=" flex align-center" style="width: 44%;">
								<text class="text-lg flex_shrink padding-right-sm">
									<text class="text-red  text-xl">*</text>
									<text>完成{{ item.jobUnit }}数：</text>
								</text>
								<input
									type="number"
									class="input"
									style="width: 100%; color: #2979ff; border-bottom: 1px solid #2979ff;"
									:style="isDisabled ? 'color:#BFBFBF; border-bottom: 1px solid #BFBFBF;' : 'color:#2979ff; border-bottom: 1px solid #2979ff;'"
									name="jobNum"
									@input="inputJobNum(item.jobNum, index)"
									v-model="item.jobNum"
									:disabled="isDisabled"
								/>
								<text>{{ item.jobUnit }}</text>
							</view>
							<view class=" flex align-center" style="width: 52%;">
								<text class="text-lg flex_shrink padding-right-sm">
									<text class="text-red  text-xl">*</text>
									<text>当日收入：</text>
								</text>
								<input
									type="number"
									class="input"
									style="width: 100%; color: #2979ff; border-bottom: 1px solid #2979ff;"
									:style="isDisabled ? 'color:#BFBFBF; border-bottom: 1px solid #BFBFBF;' : 'color:#2979ff; border-bottom: 1px solid #2979ff;'"
									name="jobSalary"
									@input="inputJobSalary(item.jobSalary, index)"
									v-model="item.jobSalary"
									:disabled="isDisabled"
								/>
								<text>元</text>
							</view>
						</view>
					</view>

					<view class="flex align-center justify-between ptb10">
						<view class=" flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm">
								<text class="text-red  text-xl">*</text>
								<text>当日总收入：</text>
							</text>
							<input
								type="number"
								class="input"
								style="width: 100%; color: #2979ff;"
								:style="isDisabled ? 'color:#BFBFBF; border-bottom: 1px solid #BFBFBF;' : 'color:#2979ff; border-bottom: 1px solid #2979ff;'"
								name="jobSalaryTotal"
								v-model="jobSalaryTotal"
								:disabled="isDisabled"
							/>
							<text>元</text>
						</view>
					</view>

					<view class="flex align-center justify-between ptb10">
						<view class=" flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm">
								<text class="text-red  text-xl">*</text>
								<text>班型选择：</text>
							</text>
							<view style="width: 100%;">
								<uni-data-select v-model="workType" :localdata="workTypeList" @change="selectWorkType" :clear="false"></uni-data-select>
							</view>
						</view>
					</view>

					<view class="pt10">
						<view>
							<view class="text-lg margin-bottom">备注：</view>
							<view class="areabox text-lg bg-f2f3 radius-16 padding" style="height: 379upx;">
								<textarea
									name="description"
									placeholder="请输入备注"
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
				</view>
				<cover-view
					class="fixed"
					style="width: 100%; bottom: 0; left: 0; z-index: 19841004; background-color: #FFFFFF; padding: 10upx 0 20upx; border-top: 1px solid #efefef; border-top-left-radius: 28upx; border-top-right-radius: 28upx;"
				>
					<button class="btn_next round " style="margin: 0 auto; margin-bottom: 20upx;margin-top: 30upx;" form-type="submit">确认提交</button>
					<cover-view
						class="btn_next round "
						style="margin: 0 auto; margin-bottom: 20upx;margin-top: 30upx; background-color: #f8f8f8; color: #5f5f5f;"
						@click="resetClick"
					>
						恢复默认
					</cover-view>
				</cover-view>
			</form>
		</view>

		<!-- 导航 -->
		<uni-fab
			ref="fab"
			:pattern="pattern"
			:content="content"
			:horizontal="horizontal"
			:vertical="vertical"
			:direction="direction"
			:popMenu="true"
			@trigger="trigger"
			@fabClick="fabClick"
			v-if="showFab"
		/>
	</view>
</template>

<script>
/**
 * 获取任意时间
 */
function getDate(date, AddDayCount = 0) {
	if (!date) {
		date = new Date();
	}
	if (typeof date !== 'object') {
		date = date.replace(/-/g, '/');
	}
	const dd = new Date(date);

	dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

	const y = dd.getFullYear();
	const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
	const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
	return {
		fullDate: y + '-' + m + '-' + d,
		year: y,
		month: m,
		date: d,
		day: dd.getDay()
	};
}
export default {
	data() {
		return {
			showLoading: true,
			paddingBottom: '400upx', // 底部内边距
			day: '2022-08-27',
			salaryType: -1, // 0小时工，1正式工，2计件工
			description: '',
			dayOrNight: 0,
			workTypeList: [
				{ value: 0, text: '早班' },
				{ value: 1, text: '中班' },
				{ value: 2, text: '晚班' },
				{ value: 3, text: '白班' },
				{ value: 4, text: '夜班' },
				{ value: 5, text: '休息' }
			],
			workType: 3, // 1白班，2晚班，3周末，4节假日
			dayHour: 0,
			workRatioList: [
				// 正式工进入记工时页面需加载的基础加班倍数数据，唯一
				{ value: 1, text: '不加班1倍' },
				{ value: 1.5, text: '平时加班1.5倍' },
				{ value: 2, text: '周六日加班2倍' },
				{ value: 3, text: '节假日3倍' }
			],
			hourWorkConfig: {}, // 小时工记录
			commonWorkConfig: {}, // 正式工记录
			horizontal: 'right',
			vertical: 'top',
			direction: 'horizontal',
			pattern: {
				color: '#7A7E83',
				backgroundColor: '#fff',
				selectedColor: '#007AFF',
				buttonColor: '#007AFF',
				iconColor: '#fff'
			},
			content: [
				{
					iconPath: '/static/images/delete.png',
					selectedIconPath: '/static/images/delete-active.png',
					text: '删除这条',
					active: false
				},
				{
					iconPath: '/static/images/clock.png',
					selectedIconPath: '/static/images/clock-active.png',
					text: '小时工',
					active: false
				},
				{
					iconPath: '/static/images/card.png',
					selectedIconPath: '/static/images/card-active.png',
					text: '正式工',
					active: false
				},
				{
					iconPath: '/static/images/piece.png',
					selectedIconPath: '/static/images/piece-active.png',
					text: '计件工',
					active: false
				}
			],
			currentId: 0, // 编辑日志id
			historyDate: '', // 点击过来的时间
			currentDate: '', // 当前时间
			hourList: [], // 记工时时间选项
			currentIndex: -1, // 所选择的时间
			workRatio: 1,
			actualSalary: 0, // 当日工资
			hourPrice: 0, // 小时工跟正式工的小时工资
			pieceWorkConfig: {}, // 计件工记录
			jobTypeList: [{ value: 1, text: '前锋' }, { value: 2, text: '后锋' }],
			isDisabled: false, // 输入框是否禁用
			commonDayHour: 0, // 每日正常工作时间
			dayType: 2 ,// 2是工作日，3是周六日，4是节假日
			showFab: true, // 显示悬浮按钮
		};
	},
	computed: {
		workPrice: function() {
			if (this.salaryType === 2) return;

			// 按倍数计算的小时工价
			return Math.floor(this.hourPrice * this.workRatio * 100) / 100;
		},
		salary: function() {
			if (this.salaryType === 2) return;

			// 自动计算的当日收入（正常收入，非加班）
			let common = this.commonDayHour * this.hourPrice;
			// 正式工，如果为周日或节假日，则全天工作时间按加班处理，因此普通收入为0
			if (this.dayType !== 2 && this.salaryType === 1) {
				common = 0;
			}
			
			let overtimeSalary = this.overtimeSalary * 1;
			// 小时工，不计入加班
			if (this.salaryType === 0) {
				// 小时工没有加班的概念，计算总的收入即可
				common = this.dayHour * this.hourPrice;
				overtimeSalary = 0;
			}
			// console.error(common);
			// console.error(this.overtimeSalary);
			let r = Math.floor((common + overtimeSalary) * 100) / 100;
			return r;
		},
		jobSalaryTotal: function() {
			let total = 0;
			// console.error(this.pieceWorkConfig.pieceWorkList);
			if (this.pieceWorkConfig.pieceWorkList) {
				this.pieceWorkConfig.pieceWorkList.forEach(item => {
					total += item.jobSalary;
				});
			}

			return Math.round(total * 100) / 100;
		},
		showOvertime: function() {
			// 显示加班的信息
			// == 3 or == 4 即为周末或节假日
			if ((this.dayType == 2 && this.dayHour > this.commonDayHour) || this.dayType == 3 || this.dayType == 4) {
				return true;
			}

			return false;
		},
		overtimeLong() {
			// 平时加班时长=总工作时长-正常上班时长
			if (this.dayType == 2) {
				return (this.dayHour - this.commonDayHour).toFixed(2);
			} else {
				// 如果是周末或者节假日，加班时间就等于一天的工作时间
				return this.dayHour.toFixed(2);
			}
		},
		overtimeSalary() {
			// console.error(this.overtimeLong);
			// console.error(this.workPrice);
			// 加班收入
			return (Math.round(this.overtimeLong * this.workPrice * 100) / 100).toFixed(2);
		}
	},
	watch: {
		salary(value) {
			// console.error(value);
			// 实际的当日收入
			this.actualSalary = value;
		},
		dayHour(value) {
			// console.error(value);
			// console.error(this.commonDayHour);
			// 监测当日工作小时数，自动选中小时选项
			this.currentIndex = this.hourList.indexOf(value);

			// 工作日才需要识别是正常加班还是普通上班，且只有正式工才会计算加班
			if (this.dayType == 2 && this.salaryType === 1) {
				// 此处控制切换或者更改当日工作时间时的加班选项显示
				if (value > this.commonDayHour) {
					// 如果当日工作时长超出了正常工作时长，则按加班处理
					this.workRatio = this.workRatioList[1].value;
				} else {
					this.workRatio = this.workRatioList[0].value;
				}
			}
		},
		currentIndex(index) {}
	},
	created() {
		for (let i = 0.5; i <= 24; i += 0.5) {
			this.hourList.push(i);
		}
	},
	onLoad(e) {
		// console.error(e);
		this.salaryType = e.type * 1; // 把传进来的工做类型进行数字化转换
		let currentDate = e.date;
		// 如果日期为空默认为当天
		if (!currentDate) {
			currentDate = getDate().fullDate;
			// console.error(currentDate);
		}
		this.currentDate = this.historyDate = this.day = currentDate;
		let title = '小时工记录工时';
		if (this.salaryType === 1) {
			title = '正式工记录工时';
		} else if (this.salaryType === 2) {
			title = '计件工记录工时';
		}
		uni.setNavigationBarTitle({
			title: title
		});
		// todo 请求正式工加班倍数
		if (this.salaryType === 1) {
			this.$Request
				.get(this.$api.worktime.get_overtime_ratio, {
					salaryType: this.salaryType
				})
				.then(res => {
					if (res.data) {
						this.workRatioList = res.data;
					}
				});
		}

		// console.error(this.salaryType);
		// todo 获取当前工种配置数据或者记录数据，以下默认即添加加载配置数据的时候（当日无工时记录）
		if (currentDate) {
			this.requestData();
		}
	},
	onBackPress(e) {
		console.error(e);
		if (this.$refs.fab.isShow) {
			this.$refs.fab.close();
			return true;
		}
		return false;
	},
	methods: {
		getWorkRatio() {
			// 计件工不分白晚班、周末、节假日
			if (this.salaryType === 2) return;
			let ratio = 1;
			let field = this.salaryType === 0 ? 'hourWorkConfig' : 'commonWorkConfig';
			switch (this.workType) {
				case 1:
				default:
					ratio = this[field].dayWorkRatio;
					break;
				case 2:
					ratio = this[field].nightWorkRatio;
					break;
				case 3:
					ratio = this[field].weekendWorkRatio;
					break;
				case 4:
					ratio = this[field].holidayWorkRatio;
			}

			return ratio;
		},
		formSubmit(e) {
			// this.$Common.toast('提交工时成功');
			// todo 提交数据
			console.error(e);
			let data = e.detail.value;

			let year = new Date().getFullYear();
			let month = new Date().getMonth() + 1;
			let date = new Date().getDate();

			// console.error(this.currentDate);
			let selectedYear = new Date(this.currentDate).getFullYear();
			let selectedMonth = new Date(this.currentDate).getMonth() + 1;
			let selectedDate = new Date(this.currentDate).getDate();

			// console.error(year + '-' + month + '-' + date);
			if (year < selectedYear || (year === selectedYear && month < selectedMonth) || (year === selectedYear && month === selectedMonth && date < selectedDate)) {
				this.$Common.toast('不可记录大于今日的工时');
				return;
			}

			// 组装数据
			let submitData = {};
			if (this.currentId) submitData.id = this.currentId;
			submitData.date = this.currentDate;
			submitData.salaryType = this.salaryType;

			switch (this.salaryType) {
				case 0:
					submitData.dayHour = data.dayHour * 1;
					submitData.workType = this.workType;
					submitData.salary = data.salary * 1;
					submitData.remark = data.description;
					submitData.hourPrice = data.hourPrice * 1;
					break;
				case 1:
				default:
					submitData.dayHour = data.dayHour * 1;
					submitData.workType = this.workType;
					submitData.salary = data.salary * 1;
					submitData.remark = data.description;
					submitData.workRatio = this.workRatio * 1;
					submitData.hourPrice = data.hourPrice * 1;
					break;
				case 2:
					this.pieceWorkConfig.pieceWorkList.map(item => {
						item.jobNum *= 1;
					});
					submitData.workList = this.pieceWorkConfig.pieceWorkList;
					submitData.workType = this.workType;
					submitData.salary = data.jobSalaryTotal;
					submitData.remark = data.description;
			}

			// console.error(submitData);
			this.$Request
				.post(this.$api.worktime.record_work_time, submitData, {
					'content-type': 'multipart/form-data'
				})
				.then(res => {
					this.$Common.toast(res.msg);
					if (res.code == 1) {
						uni.$emit('update', this.currentDate);
						uni.navigateBack({
							delta: 1
						});
					}
				});
		},
		selectWorkRatio(value) {
			this.workRatio = value;
		},
		trigger(e) {
			// console.error(e);

			if (e) {
				this.content[e.index].active = true;
				// 将非点击的按钮样式还原
				this.content.map((item, index) => {
					if (index !== e.index) {
						item.active = false;
					}
				});

				// console.error(this.currentId)
				// 在编辑状态下删除按钮会显示出来
				let actualIndex = this.currentId ? e.index - 1 : e.index;
				if (this.salaryType === actualIndex) return; // 同一个类型记工时页不必跳转

				// 在编辑状态下删除按钮会显示出来
				if (this.currentId && e.index === 0) {
					// TODO 请求接口删除当天
					this.$Request
						.post(this.$api.worktime.delete_salary_record, {
							id: this.currentId
						})
						.then(res => {
							this.$Common.toast(res.msg);
							if (res.code == 1) {
								uni.$emit('update', this.currentDate);
								uni.navigateBack({
									delta: 1
								});
							}
						});

					return;
				}

				setTimeout(() => {
					uni.redirectTo({
						url: './worktimerecord?type=' + actualIndex
					});
				}, 1000);
			}
		},
		fabClick(e) {
			// 非编辑状态，无需显示删除这条按钮
			if (!this.currentId && this.content[0].text === '删除这条') {
				this.$delete(this.content, 0);
			}
			
			if (this.currentId && this.content[0].text !== '删除这条') {
				this.content.unshift({
					iconPath: '/static/images/delete.png',
					selectedIconPath: '/static/images/delete-active.png',
					text: '删除这条',
					active: false
				});
			}
			
			// 悬浮按钮选中状态必须是在上面对该悬浮按钮数组处理过后才能操作
			if (this.currentId) {
				this.content[this.salaryType + 1].active = true; // 悬浮按钮选中状态
			} else {
				this.content[this.salaryType].active = true; // 悬浮按钮选中状态
			}
		},
		selectHour(index) {
			if (this.isDisabled) return;
			this.currentIndex = index;
			this.dayHour = this.hourList[index];
		},
		inputJobNum(value, index) {
			// 改变工种件数的时候自动计算该工种工资收入
			let piece = this.pieceWorkConfig.pieceWorkList[index];
			piece.jobSalary = Math.round(value * piece.jobPrice * 100) / 100;
			this.$set(this.pieceWorkConfig.pieceWorkList, index, piece);
		},
		inputJobSalary(value, index) {
			// console.error(value);
			// 此处不做一个触发的话，计算属性jobSalaryTotal识别不到变化
			let piece = this.pieceWorkConfig.pieceWorkList[index];
			piece.jobSalary = Math.round(value * 100) / 100;
			this.$set(this.pieceWorkConfig.pieceWorkList, index, piece);
		},
		selectDate(date) {
			// console.error(date);
			// 实现悬浮按钮强制刷新
			this.showFab = false;
			setTimeout(() => {
				this.showFab = true;
			}, 1);
			this.currentDate = this.day = date;
			// 切换日期后要重新获取数据
			this.requestData();
		},
		selectWorkType(type) {
			console.error(this.dayOrNight);
			console.error(type);
			this.workType = type;
			// 休息的时候当日收入置为0
			if (type === 5) {
				this.dayHour = 0;
				this.actualSalary = 0;
				// 此处必须做一个判断，否则map的时候会报错
				if (this.salaryType === 2) {
					// 计件工
					let pieceWorkConfig = this.pieceWorkConfig;
					pieceWorkConfig.pieceWorkList.map(item => {
						item.jobNum = 0;
						item.jobSalary = 0;
					});
					// 必须使用该方式才能触发上面jobSalaryTotal的自动计算
					this.pieceWorkConfig = Object.assign({}, pieceWorkConfig);
				}
				this.isDisabled = true;
			} else {
				this.isDisabled = false;
			}
		},
		reduce() {
			// 如果禁用则不许操作
			if (this.isDisabled) return;
			this.dayHour = Math.round((this.dayHour -= 0.1) * 100) / 100;
			if (this.dayHour <= 0.1) this.dayHour = 0.1; // 最小不能小于0.1
		},
		increase() {
			// 如果禁用则不许操作
			if (this.isDisabled) return;
			this.dayHour = Math.round((this.dayHour += 0.1) * 100) / 100;
			if (this.dayHour >= 24) this.dayHour = 24; // 最大不能大于24
		},
		requestData() {
			let _that = this;
			this.$Request
				.get(this.$api.worktime.get_current_record, {
					salaryType: this.salaryType,
					date: this.currentDate
				})
				.then(res => {
					// 如果返回0，表示未进行考勤配置，导航到考勤配置完善页面去
					if (res.code == 0) {
						uni.showModal({
							title: this.$Config('APPNAME'),
							content: res.msg,
							showCancel: false,
							confirmText: '立即设置',
							success(res) {
								if (res.confirm) {
									uni.redirectTo({
										url: '/pagesworktime/salarysettings?type=' + _that.salaryType
									});
								}
							}
						});
						return;
					}
					if (res.data) {
						// 对于标记为休息的，则将当日工时置为0，收入置为0，且不可选
						if (res.data.workType == 5) {
							this.isDisabled = true;
						} else {
							this.isDisabled = false;
						}
						switch (this.salaryType) {
							case 0:
								this.hourWorkConfig = res.data;
								this.currentId = this.hourWorkConfig.id ? this.hourWorkConfig.id : 0;
								this.dayHour = this.hourWorkConfig.workType == 5 ? 0 : this.hourWorkConfig.hourLong;
								this.dayOrNight = this.hourWorkConfig.workType;
								this.hourPrice = this.hourWorkConfig.hourPrice;
								this.description = this.hourWorkConfig.remark;
								this.showLoading = false;
								// console.error(this.dayHour);
								// console.error(this.hourPrice);
								// 工作日（调休），周六日（非调休、非节假日），节假日
								this.workRatio = 1; // 小时工不存在加班一说，因此沿用1倍倍数即可
								break;
							case 1:
							default:
								this.commonWorkConfig = res.data;
								this.currentId = this.commonWorkConfig.id ? this.commonWorkConfig.id : 0;
								// 配置中正常工作时长
								this.commonDayHour = this.commonWorkConfig.commonDayHour;
								// 记录的工时里实际工作时长，如果是周末、节假日，普通工作时长记为0
								this.dayHour = this.hourWorkConfig.workType == 5 ? 0 : (this.commonWorkConfig.hourLong + this.commonWorkConfig.overtimeHourLong);
								this.dayOrNight = this.commonWorkConfig.workType;
								this.hourPrice = this.commonWorkConfig.hourPrice;
								// 工作日（调休），周六日（非调休、非节假日），节假日
								this.workRatio = this.commonWorkConfig.currentRatio;
								// 2是工作日，3是周六日，4是节假日
								this.dayType = this.commonWorkConfig.dayType;
								this.description = this.commonWorkConfig.remark;
								this.showLoading = false;
								break;
							case 2:
								// console.error('计件工');
								this.pieceWorkConfig = res.data;

								this.currentId = this.pieceWorkConfig.id ? this.pieceWorkConfig.id : 0;
								this.dayOrNight = this.pieceWorkConfig.workType;
								this.description = this.pieceWorkConfig.remark;
								// 计算计件工单一工种工资总收入
								this.pieceWorkConfig.pieceWorkList.map(item => {
									item.jobSalary = Math.round(item.jobNum * item.jobPrice * 100) / 100;
								});

								this.showLoading = false;
						}

						this.$nextTick(() => {
							// 编辑得到的总收入
							if (res.data.salary) {
								// console.error(res.data.salary);
								this.actualSalary = this.hourWorkConfig.workType == 5 ? 0 : res.data.salary * 1;
							}
						});
					}
				});
		},
		resetClick(e) {
			this.currentDate = this.day = this.historyDate;
			// 恢复默认都改为0
			this.requestData();
			// console.error(e);
		}
	}
};
</script>

<style>
.input {
	border-bottom: 1px solid #efefef;
}
.uni-select__selector {
	z-index: 20190118 !important;
}
.uni-fab {
	z-index: 20190119 !important;
}
.uni-fab__circle {
	z-index: 20190120 !important;
}
.uni-cursor-point .uni-fab--rightTop {
	top: 590upx !important;
}
.uni-cursor-point .uni-fab__circle--rightTop {
	top: 590upx !important;
}
.uni-calendar--fixed {
	/* bottom: calc(100px)!important; */
	z-index: 20200118 !important;
}
</style>
