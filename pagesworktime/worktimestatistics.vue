<template>
	<view>
		<view style="height: 100vh; line-height: 100vh; font-weight: 300; font-size: 24upx; text-align: center;" v-if="showLoading">数据加载中...</view>
		<view class="up_margin" style="padding-bottom: 100upx;" v-if="!showLoading">
			<view class="margin-lr bg-white margin-top-sm radius-16">
				<view class="margin-top-lg flex justify-between worktime-tab">
					<view
						class="text-center worktime-tab-item"
						:class="currentTab === index ? 'current-tab' : ''"
						v-for="(item, index) in tabList"
						:key="item.index"
						@click="currentTab = index"
					>
						<view class="text-333 f32 current-tab-font" style="font-size: 28upx;">{{ item.title }}</view>
					</view>
				</view>
			</view>
			<view class="mt10" style="display: flex;justify-content: space-around;align-items: center;">
				<view style="flex: 1 1 65%; display: flex; justify-content: space-around; align-items: center; margin-right: 1%;" v-if="currentTab !== 2">
					<uni-icons type="back" size="24" @click="selectPrev"></uni-icons>
					<view style="flex: 1 1 80%; text-align: center; font-size: 28upx;">{{ currentYearShow }}{{ currentRange }}</view>
					<uni-icons type="forward" size="24" @click="selectNext"></uni-icons>
				</view>
				<view style="flex: 1 1 65%; margin-right: 1%;" v-if="currentTab === 2">
					<view
						style="text-align: center; background-color: #007AFF; border-radius: 8upx; height: 64upx; line-height: 64upx; color: #ffffff;"
						@click="open"
					>
						<uni-icons type="pulldown" size="12" color="#fff" v-if="!showDateRange"></uni-icons>
						<text style="margin-left: 4upx;" v-if="!showDateRange">选择日期范围</text>
						<text style="margin-left: 4upx;" v-if="showDateRange">{{dateRange}}</text>
					</view>
					<uni-calendar
						ref='rangeSelected'
						class="uni-calendar--hook"
						:clear-date="true"
						:date="area.date"
						:insert="area.insert"
						:lunar="area.lunar"
						:startDate="area.startDate"
						:endDate="area.endDate"
						:range="area.range"
						@confirm="confirm"
						@close="close"
					/>
				</view>
				<view
					style="flex: 1 1 20%; text-align: center; background-color: #007AFF; border-radius: 8upx; height: 64upx; line-height: 64upx; color: #ffffff; margin-right: 1%;"
					@click="resetRange"
				>
					<uni-icons type="refreshempty" size="12" color="#fff"></uni-icons>
					<text style="margin-left: 4upx;">重置</text>
				</view>
				<view
					style="flex: 1 1 30%; text-align: center; background-color: #007AFF; border-radius: 8upx; height: 64upx; line-height: 64upx; color: #ffffff;"
					@click="setWorktime"
				>
					设置考勤周期
				</view>
			</view>

			<view style="margin-top: 30upx; position: relative;">
				<view style="position: absolute; z-index: 20190118; right: 20upx; top: 4%;" class="animate" v-if="salaryType === 1">
					<image src="../static/images/swiper.png" style="width: 84upx; max-height: 56upx; capcity: 0.2" mode="widthFix"></image>
				</view>
				<!-- 小时工统计 -->
				<scroll-view v-if="salaryType === 0 || salaryType === 1" style="width: 100%; white-space: nowrap;" :scroll-x="true">
					<view
						style="display: flex; justify-content: space-around; align-items: center; padding: 20upx 0; border-bottom: 1px solid #efefef; color: #2979ff; font-size: 24upx;"
						:style="salaryType === 0 ? 'width: 100%;' : 'width: 200%;'"
					>
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx; display: inline-block;">小时工资</view>
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx; display: inline-block;" v-if="salaryType === 1">工作日工时</view>
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx; display: inline-block;" v-if="salaryType === 1">普通加班工时</view>
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx; display: inline-block;" v-if="salaryType === 1">周末加班工时</view>
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx; display: inline-block;" v-if="salaryType === 1">节假日加班工时</view>
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx; display: inline-block;">总工时</view>
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx; display: inline-block;">出勤天数</view>
						<!-- <view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx; display: inline-block;" v-if="showFullDay">满勤天数</view>
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx; display: inline-block;" v-if="showFullDay">满勤奖励</view> -->
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx; display: inline-block;">总收入</view>
					</view>

					<view
						style="padding: 20upx 0; border-bottom: 1px solid #efefef; font-size: 24upx;"
						:style="salaryType === 0 ? 'width: 100%;' : 'width: 200%;'"
						v-if="showData"
					>
						<view style="display: flex; justify-content: space-around; align-items: center;" v-for="(item, index) in commonWork" :key="index">
							<view class="ellipsis" style="flex: 1 1 20%; text-align: center; font-size: 24upx;">¥{{ item.hourPrice }}元</view>
							<view class="ellipsis" style="flex: 1 1 20%; text-align: center; font-size: 24upx;" v-if="salaryType === 1">{{ item.hour }}小时</view>
							<view class="ellipsis" style="flex: 1 1 20%; text-align: center; font-size: 24upx;" v-if="salaryType === 1">{{ item.common }}小时</view>
							<view class="ellipsis" style="flex: 1 1 20%; text-align: center; font-size: 24upx;" v-if="salaryType === 1">{{ item.weekend }}小时</view>
							<view class="ellipsis" style="flex: 1 1 20%; text-align: center; font-size: 24upx;" v-if="salaryType === 1">{{ item.holiday }}小时</view>
							<view class="ellipsis" style="flex: 1 1 20%; text-align: center; font-size: 24upx;">{{ item.hour + item.common + item.weekend + item.holiday }}小时</view>
							<view class="ellipsis" style="flex: 1 1 20%; text-align: center; font-size: 24upx;">{{ item.day }}天</view>
							<!-- <view class="ellipsis" style="flex: 1 1 20%; text-align: center; font-size: 24upx;" v-if="showFullDay">{{ fullWorkDay }}天</view>
							<view class="ellipsis" style="flex: 1 1 20%; text-align: center; font-size: 24upx;" v-if="showFullDay">{{ fullWorkSalary }}元</view> -->
							<view class="ellipsis" style="flex: 1 1 20%; text-align: center; font-size: 24upx;">¥{{ Math.round((item.hourPrice * item.hour + item.hourPrice * item.common * item.commonRatio + item.hourPrice * item.weekend * item.weekendRatio + item.hourPrice * item.holiday * item.holidayRatio)*100)/100 }}元</view>
						</view>
					</view>
				</scroll-view>

				<!-- 计件工资设置 -->
				<scroll-view v-if="salaryType === 2" style="width: 100%; white-space: nowrap;" :scroll-x="true">
					<!-- 标题 -->
					<view
						style="display: flex; justify-content: space-around; align-items: center; padding: 20upx 0; border-bottom: 1px solid #efefef; color: #2979ff; font-size: 24upx; width: 100%;"
					>
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx;">名称</view>
						<!-- <view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx;">单位</view> -->
						<!-- {{ unit }} -->
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx;">数量</view>
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx;">单价</view>
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx;">出勤天数</view>
						<view style="flex: 1 1 20%; text-align: center; font-weight: 500; font-size: 24upx;">总收入</view>
					</view>

					<view
						style="display: flex; justify-content: space-around; align-items: center; padding: 20upx 0; border-bottom: 1px solid #efefef; font-size: 24upx; width: 100%;"
						v-for="(item, index) in hourworkList"
						:key="item.id"
						v-if="hourworkList.length"
					>
						<view class="ellipsis" style="flex: 1 1 25%; text-align: center; font-size: 24upx;">{{ item.name }}</view>
						<view class="ellipsis" style="flex: 1 1 25%; text-align: center; font-size: 24upx;">{{ item.count }}{{ item.unit }}</view>
						<view class="ellipsis" style="flex: 1 1 25%; text-align: center; font-size: 24upx;">{{ item.price }}元</view>
						<view class="ellipsis" style="flex: 1 1 25%; text-align: center; font-size: 24upx;">{{ item.day }}天</view>
						<view class="ellipsis" style="flex: 1 1 25%; text-align: center; font-size: 24upx;">{{ Math.round(item.count * item.price * 100) / 100 }}元</view>
					</view>
				</scroll-view>

				<view class="flex mt10" v-if="(commonWork.length || hourworkList.length) && showFullDay" style="justify-content: space-between; align-items: center;">
					<view style="text-align: right; font-size: 24upx; font-weight: 500;">
						满勤天数：
						<text style="color: #e43d33; font-size: 32upx;">{{ fullWorkDay }}天</text>
					</view>
					<view style="text-align: right; font-size: 24upx; font-weight: 500;">
						满勤收入：
						<text style="color: #e43d33; font-size: 32upx;">¥{{ fullWorkSalary }}元</text>
					</view>
				</view>
				
				<view class="flex mt10" v-if="hourworkList.length || commonWork.length" style="justify-content: space-between; align-items: center;">
					<view style="text-align: right; font-size: 24upx; font-weight: 500;">
						{{salaryType == 2 ? '总数量' : '总工时'}}：
						<text style="color: #e43d33; font-size: 32upx;">{{ totalSum }}{{salaryType == 2 ? '' : '小时'}}</text>
					</view>
					<view style="text-align: right; font-size: 24upx; font-weight: 500;">
						全部总收入：
						<text style="color: #e43d33; font-size: 32upx;">¥{{ totalSalary }}元</text>
					</view>
				</view>

				<view class="mt30">
					<view style="display: inline-block; border-bottom: 1px solid #efefef; padding-bottom: 8upx; font-weight: 500; font-size: 32upx;">
						查看日工时统计（{{ currentYear }}年{{ rangeMonth }}月）
					</view>
					<view style="font-size: 24upx; background-color:#efefef; color: #5f5f5f; font-weight: 300; padding: 20upx 30upx; border-radius: 8upx;" v-if="salaryType === 2">提示：如果日历中记录有多个计量单位，不区分单位计算总数。</view>
					<uni-calendar
						ref="calendar"
						class="uni-calendar--hook"
						:selected="info.selected"
						:showMonth="true"
						:date="info.date"
						:lunar="true"
						:range="info.range"
						:startDate="info.startDate"
						:endDate="info.endDate"
						@change="change"
						@monthSwitch="monthSwitch"
						v-if="showCanlendar"
					/>
				</view>
			</view>
		</view>
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
			salaryType: '',
			currentTab: 0,
			tabList: [
				{
					index: 1,
					title: '按考勤周期'
				},
				{
					index: 2,
					title: '按月查看'
				},
				{
					index: 3,
					title: '按指定范围查看'
				}
			],
			workRange: [], // 接口获取到的数据
			range: [],
			settingWorkIndex: 0, // 用户设置的考勤
			workIndex: -1, // 此处不能默认0，在初始加载的时候要利用其变化改变currentRange的值
			direction: 1, // 1prev, 2next
			hourworkList: [], // 计件工统计数据
			hourWork: [], // 小时工统计数据
			commonWork: [], // 正式工统计数据
			worktimerecord: '/pagesworktime/worktimerecord', // 记工时页
			userinfo: uni.getStorageSync('USERINFO'), //缓存的用户信息
			info: {
				date: '2022-09-10',
				startDate: '',
				endDate: '',
				lunar: true,
				range: false,
				selected: []
			},
			area: {
				date: '2019-09-10',
				startDate: '',
				endDate: '',
				lunar: true,
				range: true,
				insert: false,
				selected: []
			},
			currentYear: '', // 当前年份
			currentYearShow: '', // 按月查询显示的年份
			currentMonth: '', // 初始化后不可改变，真实的当前月份
			currentRange: '', // 当前查看范围
			oldRangeIndex: 0 , // 存储切换的考勤的索引
			oldMonthIndex: 0, // 存储切换的月份索引
			showCanlendar: false,
			showLoading: true, // 加载数据遮盖层
			fullWorkDay: 0, // 满勤天数
			fullWorkSalary: 0, // 满勤收入
			showBtn: true, // 显示底部记工时按钮，由于日期弹出控件的层级始终比按钮低，所以只能用状态控制了
			rangeMonth: 0, // 显示月份
			showFullDay: true, // 显示满勤
			showDateRange: false, // 显示按指定范围选择的日期
			dateRange: '', // 指定范围日期
		};
	},
	computed: {
		unit: function() {
			return this.hourworkList.length > 0 ? this.hourworkList[0].unit : '件';
		},
		totalSum: function() {
			// 计算计件工指定数量总数量
			let total = 0;
			if (this.salaryType === 2) {
				this.hourworkList.forEach(item => {
					total += item.count;
				});
			} else {
				this.commonWork.forEach(item => {
					total += item.hour;
				})
			}
	
			return total;
		},
		totalSalary: function() {
			let total = 0;
			if (this.salaryType === 2) {
				this.hourworkList.forEach(item => {
					total += item.price * item.count;
				});
			} else {
				this.commonWork.forEach(item => {
					total += item.hourPrice * item.hour + item.hourPrice * item.common * item.commonRatio + item.hourPrice * item.weekend * item.weekendRatio + item.hourPrice * item.holiday * item.holidayRatio;
				})
			}

			// 加上满勤收入
			return Math.round((total + this.fullWorkSalary) * 100) / 100;
		},
		showData() {
			return this.commonWork.length
		}
	},
	watch: {
		currentTab(index) {
			let year = this.currentYear;
			let dateIdenfier = '';
			this.workIndex = -1; // 保证显示查询范围索引更新
			if (index === 0) {
				this.currentYearShow = ''; // 按考勤周期不需要该年份显示
				// console.error(this.workRange);
				this.range = this.workRange;
				this.workIndex = this.oldRangeIndex; // this.settingWorkIndex; // 恢复到用户设置的考勤
				// 用于在日历控件处针对1月份日历做判断
				getApp().globalData.currentTab = 0;
				this.$refs.calendar.uni_calendar_header_hide = '';
				dateIdenfier = this.range[this.workIndex];
			} else if (index === 1) {
				this.currentYearShow = this.currentYear + '年';
				this.range = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
				// 重置索引
				this.workIndex = this.oldMonthIndex;
				// 用于在日历控件处针对1月份日历做判断
				getApp().globalData.currentTab = 1;
				this.$refs.calendar.uni_calendar_header_hide = 'uni-calendar__header_hide';
				dateIdenfier = this.range[this.workIndex];
			} else {
				// 为了保留切换前的状态
				getApp().globalData.currentTab = 2;
				dateIdenfier = this.currentMonth + '月'; // 当月
				// console.error(getDate(new Date()).fullDate);
				this.$set(this.area, 'date', getDate(new Date()).fullDate);
				// console.error(dateIdenfier);
			}

			// 重置日历控件
			let date = this.cnDateTransferEn(dateIdenfier);
			// console.error(date);
			this.requestData(year, date);
		},
		workIndex(value) {
			// console.error(value);
			// 以下逻辑不会走，在底下前进、后退的时候已经做过逻辑，不过以防万一，保留
			if (value === this.range.length && this.direction === 2) {
				this.workIndex = 0;
			}

			if (value === -1 && this.direction === 1) {
				this.workIndex = this.range.length - 1;
			}
			
			// 在索引变动的时候存储考勤及月份索引
			if (this.currentTab === 0) this.oldRangeIndex = value;
			if (this.currentTab === 1) this.oldMonthIndex = value;
			
			// 显示的当前选中考勤周期或月份
			this.generateRangeMonth();
		},
		range() {
			// 显示的当前选中考勤周期或月份
			this.generateRangeMonth();
		}
	},
	beforeMount() {
		// 防止初次进入年月显示出现undefined
		let year = new Date().getFullYear();
		let month = new Date().getMonth();
		let day = new Date().getDate();
		this.range = [year + '年' + month + '月' + day + '日'];
	},
	onLoad(e) {
		// console.error(e);
		let title = '';
		let type = e.type * 1;
		this.salaryType = type;
		switch (type) {
			case 0:
			default:
				title = '小时工工时统计';
				break;
			case 1:
				title = '正式工工时统计';
				break;
			case 2:
				title = '计件工工时统计';
		}
		uni.setNavigationBarTitle({
			title: title
		});
		// console.error(this.currentYear);
		this.$Request.get(this.$api.worktime.get_work_time_range).then(res => {
			if (res.data) {
				// console.error(res.data);
				this.range = this.workRange = res.data;
				this.updateData();
			}
		});
	},
	onShow() {
		let year = this.currentYear = new Date().getFullYear() * 1;
		// 初始化当前月，初始化当前范围月
		this.currentMonth = this.rangeMonth = new Date().getMonth() * 1 + 1;
		// 初始化按月选择的月份索引
		this.oldMonthIndex = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'].indexOf(this.currentMonth + '月');
		this.showCanlendar = true;
	},
	beforeUpdate() {
		uni.$off('update');
		// 隐藏月份的月份切换
		if (this.$refs.uni_calendar_header_hide) {
			if (this.currentTab === 0) this.$refs.calendar.uni_calendar_header_hide = '';
			else if (this.currentTab === 1) this.$refs.calendar.uni_calendar_header_hide = 'uni-calendar__header_hide';
		}
	},
	updated() {
		uni.$on('update', () => {
			uni.$emit('updateOn');
			let year = this.currentYear; // = new Date(date).getFullYear();
			if (this.currentTab === 1) this.currentYearShow = this.currentYear + '年';
			let date = this.cnDateTransferEn(this.range[this.workIndex]);
			// console.error(date);
			this.requestData(year, date);
		})
		uni.$on('updateSetting', (data) => {
			uni.$emit('updateOn');
			console.error(data);
			// 如果改变了考勤需要刷新考勤
			if (data === 'KQ') {
				this.updateData();
				return;
			}
			let year = this.currentYear;
			if (this.currentTab === 1) this.currentYearShow = this.currentYear + '年';
			let date = this.cnDateTransferEn(this.range[this.workIndex]);
			this.requestData(year, date);
		})
	},
	onUnload() {
		this.showCanlendar = false;
		this.showLoading = false;
		uni.$off('update');
		uni.$off('updateSetting');
	},
	onHide() {
		this.showCanlendar = false;
		this.showLoading = false;
		uni.$off('update');
		uni.$off('updateSetting');
	},
	destroyed() {
		uni.$off('update');
		uni.$off('updateSetting');
	},
	methods: {
		updateData() {
			let _that = this;
			// console.error('updating...');
			// 获取的考勤周期数据
			this.$Request.get(this.$api.worktime.get_work_time_index, {
				salaryType: this.salaryType
			}).then(data => {
				if (data.code == -1) {
					uni.showModal({
						title: this.$Config('APPNAME'),
						content: data.msg,
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
				// 设置的考勤周期，
				// 对于按月查看则默认为0，虽然默认进入页面的tab是按考勤周期（有可能需求变化）
				// 按指定时间范围则传入当月月份，按按月查看处理
				let dIdentifier = '';
				if (this.currentTab !== 2) {
					this.workIndex = data.data ? data.data : 0;
					// 保存用户设置的考勤
					if (this.currentTab === 0) this.settingWorkIndex = this.workIndex;
					dIdentifier = this.range[this.workIndex];
				} else {
					dIdentifier = this.currentMonth + '月';
				}
				let date = this.cnDateTransferEn(dIdentifier);
				// console.error(date);
				let modifyDate = date.split('-');
				let today = new Date().getDate();
				let currentMonth = new Date().getMonth() + 1;
				let newDate = date;
				// 此处需要保证考勤周期包含当天
				if (this.currentTab === 0 && today < modifyDate[1]*1) {
					// console.error(modifyDate[1]);
					newDate = currentMonth - 1;
					
					// 赋值给考勤周期
					this.rangeMonth = newDate;
					
					newDate += '-' + modifyDate[1];
				}
				// console.error(newDate);
				this.requestData(this.currentYear, newDate);
			});
		},
		change(e) {
			// console.error(e);
			// console.error(e.fulldate);
			let year = new Date().getFullYear();
			let month = new Date().getMonth() + 1;
			let date = new Date().getDate();
			// console.error(year + '-' + month + '-' + date);
			if (year < e.year || (year === e.year && month < e.month * 1) || (year === e.year && month === e.month * 1 && date < e.date)) {
				this.$Common.toast('不可记录大于今日的工时');
				return;
			}

			uni.navigateTo({
				url: '/pagesworktime/worktimerecord?type=' + this.salaryType + '&date=' + e.fulldate
			});
		},
		setWorktime() {
			// 导航到工时设置页面
			uni.navigateTo({
				url: './salarysettings?type=' + this.salaryType
			});
		},
		toPage: function(page) {
			uni.navigateTo({
				url: page
			});
		},
		selectPrev() {
			// this.workIndex -= 1;
			this.direction = 1;
			
			// 获取到切换后的月份
			let year = this.currentYear;
			if (this.currentTab === 0/** && this.workIndex === -1**/) {
				this.rangeMonth = this.rangeMonth * 1 - 1;
			}
			
			if (this.currentTab === 1) {
				this.rangeMonth = this.rangeMonth * 1 - 1;
			}
			
			if (this.rangeMonth === 0) {
				year = this.currentYear = this.currentYear - 1;
				if (year <= 1970) year = this.currentYear = 1970;
				// 当月份减到0则跳转到上一年12月
				this.rangeMonth = 12;
				if (this.currentTab === 1) this.currentYearShow = this.currentYear + '年';
			}

			// console.error(year);
			// let index = (this.workIndex = this.workIndex === -1 ? this.range.length - 1 : this.workIndex);
			// console.error(index);
			this.generateRangeMonth();
			let date = this.cnDateTransferEn(this.range[this.workIndex]);
			// console.error(date);
			this.requestData(year, date);
		},
		selectNext() {
			// this.workIndex += 1;
			this.direction = 2;
			
			// 获取到切换后的月份
			let year = this.currentYear;
			if (this.currentTab === 0/** && this.workIndex === this.range.length*/) {
				this.rangeMonth = this.rangeMonth * 1 + 1;
			}
			
			if (this.currentTab === 1) {
				this.rangeMonth = this.rangeMonth * 1 + 1;
			}
			
			if (this.rangeMonth === 13) {
				year = this.currentYear = this.currentYear + 1;
				// 当月份减到0则跳转到上一年12月
				this.rangeMonth = 1;
				if (this.currentTab === 1) this.currentYearShow = this.currentYear + '年';
			}

			// let index = (this.workIndex = this.workIndex >= this.range.length ? 0 : this.workIndex);
			// console.error(index);
			this.generateRangeMonth();
			let date = this.cnDateTransferEn(this.range[this.workIndex]);
			// console.error(date);
			this.requestData(year, date);
		},
		monthSwitch(e) {
			// 以下只有按考勤周期才可用
			console.log('monthSwitchs 返回:', e);
			this.workIndex = 0; // 将考勤的索引重置为0，即1号到月底，保持上下一致
			let start = e.year + '-' + e.month + '-1 00:00:00';
			let day = new Date(e.year, e.month, 0).getDate();
			let end = e.year + '-' + e.month + '-' + day + ' 23:59:59';
			this.currentYear = e.year;
			if (this.currentTab === 1) this.currentYearShow = this.currentYear + '年';
			this.rangeMonth = e.month;
			this.generateRangeMonth();
			this.getWorkRecordByRange(e.year, e.month + '-1', start, end);
		},
		giveValue(value, data, endDate) {
			// console.error(value);
			let v = value ? new Date(value) : new Date();
			// console.error(getDate(v))
			// 默认总选中当前日期，不能用默认日期，会掩盖住前面跨周期的日期的
			let currentDay = v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + new Date().getDate();
			this.info.date = getDate(new Date(currentDay)).fullDate;
			// this.info.date = getDate(v).fullDate;
			this.info.startDate = '1970-01-01'; // getDate(v).fullDate;
			this.info.endDate = '3000-01-01'; // endDate ? endDate : getDate(v, 29).fullDate;
			// console.error(this.info.endDate);
			this.rangeMonth = getDate(v).month;
			// console.error(this.info, '日历');
			this.info.selected = data;
		},
		cnDateTransferEn(range) {
			if (this.currentTab === 0) {
				return this.cnDateTransferEnByCircle(range);
			}
			// console.error(range);
			range = range.split('-');
			// console.error(range[0]);
			// 对于月份选择把日期加上，默认1号，方便当月全部显示出来
			if (range[0].indexOf('日') === -1) range[0] += '1日';
			let day = range[0].replace('月', '-').replace('日', '');
			return day;
		},
		cnDateTransferEnByCircle(range) {
			// 按考勤周期
			range = range.split('-');
			// 对于月份选择把日期加上，默认1号，方便当月全部显示出来
			if (range[0].indexOf('号') === -1) range[0] += '1号';
			let month = this.rangeMonth;
			// console.error(month);
			if (month * 1 < 10) month = '0' + (month * 1);
			else month = month + '';
			let date = range[0].replace('号', '');
			if (date * 1 < 10) date = '0' + date;
			let day = month + '-' + date;
			return day;
		},
		requestData(year, date) {
			// TODO 请求统计数据及日历的打点信息
			// console.error(year);
			// console.error(date);
			let start = '';
			let end = '';
			let rDate = [];
			if (this.currentTab === 0) {
				// 不放在下一次tick，currentRange还没赋值
				this.$nextTick(() => {
					let range = this.currentRange;
					console.error(range);
					if (range.indexOf('月底') > -1) {
						// console.error(date);
						rDate = this.generateStartEndDate(year, date);
						// console.error(rDate);
						start = rDate[0];
						end = rDate[1];
					} else {
						range = range.split('-');
						start = this.currentYear + '-' + range[0].replace('月', '-').replace('号', '') + ' 00:00:00';
						let year = this.currentYear;
						if (this.rangeMonth === 12) year += 1;
						end = year + '-' + range[1].replace('月', '-').replace('号', '') + ' 23:59:59';
						// console.error(start, end);
					}
					
					// 新版本直接用考勤索引获取
					this.getWorkRecordByRange(year, date, start, end);
				})
			} else if (this.currentTab === 1) {
				rDate = this.generateStartEndDate(year, date);
				this.getWorkRecordByRange(year, date, rDate[0], rDate[1]);
			} else {
				rDate = this.generateStartEndDate(year, date);
				// 加入按自定义时间范围查看
				this.getWorkRecordByRange(year, date, rDate[0], rDate[1]);
			}
		},
		generateStartEndDate(year, date) {
			// 根据给定时间生成一个月的开始结束时间
			let start = getDate(year + '-' + date).fullDate + ' 00:00:00';
			let m = date.split('-');
			let d = new Date(year, m[0], 0).getDate();
			if (d < 10) d = '0' + d;
			let end = year + '-' + m[0] + '-' + d + ' 23:59:59';
			
			return [start, end];
		},
		getWorkRecordByRange(year, date, start, end) {
			let _that = this;
			// console.error(year, date);
			let params = {salaryType: this.salaryType};
			if (start && end) {
				params.startDate = start;
				params.endDate = end;
			} else {
				params.workIndex = this.workIndex;
			}
			this.$Request
				.get(this.$api.worktime.get_work_record_by_range, params)
				.then(res => {
					if (res.code == -1) {
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
					let data = res.data.list;
					console.error(res);
					let extraData = res.data.info;
					let fullWork = res.data.fullwork;
					this.giveValue(year + '-' + date, extraData, end);
					
					let obj = [];
					// 显示全勤满勤，如果设置了则显示，不设置不显示
					if (fullWork.fullWorkDay === false) {
						this.showFullDay = false;
					} else {
						this.showFullDay = true;
					}
					// 满勤天数及满勤收入
					this.fullWorkDay = fullWork.fullWorkDay ? fullWork.fullWorkDay * 1 : 0;
					this.fullWorkSalary = fullWork.fullWorkSalary ? fullWork.fullWorkSalary * 1 : 0;
					if ((Array.isArray(data) && data.length) || Object.keys(data).length) {
						console.error(data);
						if (this.salaryType !== 2) {
							obj = data.map(item => {
								return {
									hour: item.hour,
									hourPrice: item.hourPrice,
									common: item.common,
									commonRatio: item.commonRatio,
									weekend: item.weekend,
									weekendRatio: item.weekendRatio,
									holiday: item.holiday,
									holidayRatio: item.holidayRatio,
									day: item.day
								};
							});
						}
					}
					
					console.error(obj);
					
					switch (this.salaryType) {
						case 0:
						case 1:
						default:
							// 小时工、正式工统计数据
							this.commonWork = obj;
							break;
						case 2:
						console.error(data);
							// 计件工统计数据
							this.hourworkList = data;
					}

					this.showLoading = false;
				});
		},
		getRangeByPeriod(year, date) {
			let range = this.range[this.workIndex];
			let start = '';
			let end = '';
			range = range.split('-');
			start = year + '-' + date + ' 00:00:00';
			let m = date.split('-')[0] * 1;
			if (range[1].indexOf('下月') > -1) {
				m += 1;
			}

			if (m < 10) m = '0' + m;
			let d = range[1].replace(/[^\d]/g, '');
			// 本月1号到本月月底的情况
			if (!d) {
				d = new Date(year, m * 1, 0).getDate();
			}
			if (d < 10) d = '0' + d;
			end = year + '-' + m + '-' + d + ' 23:59:59';

			return [start, end];
		},
		open() {
			setTimeout(() => {
				this.showBtn = false;
			}, 350);
			this.$refs.rangeSelected.open();
		},
		confirm(e) {
			// console.error(e);
			if (e.range.data.length === 0) {
				this.$Common.toast('请指定时间范围');
				
				return;
			}
			this.showBtn = true;
			this.showDateRange = true;
			this.dateRange = e.range.data[0] + '至' + e.range.data[e.range.data.length - 1];
			// 按自定义选择范围请求数据
			this.getWorkRecordByRange(e.year, e.month + '-' + e.date, e.range.data[0] + ' 00:00:00', e.range.data[e.range.data.length - 1] + ' 23:59:59');
		},
		close() {
			this.showBtn = true;
		},
		generateRangeMonth() {
			// console.error(this.workIndex);
			if (this.workIndex === -1) return;
			// 显示的当前选中考勤周期或月份
			let r = this.range[this.workIndex];
			// console.error(r);
			
			if (this.currentTab === 0) {
				r = r.split('-');
				// 按考勤周期，处理显示的考勤周期加上月份
				if (r.indexOf('本月底') > -1) {
					this.currentRange = this.rangeMonth + '月' + r[0] + '-' + this.rangeMonth + '月底';
				} else {
					let next = this.rangeMonth * 1 + 1;
					if (this.rangeMonth === 12) next = 1;
					this.currentRange = this.rangeMonth + '月' + r[0] + '-' + next + r[1].replace('下', '');
				}
			} else if (this.currentTab === 1) {
				this.currentRange = r;
			}
		},
		resetRange() {
			this.currentYear = new Date().getFullYear();
			if (this.currentTab === 0) {
				this.workIndex = this.settingWorkIndex;
				this.currentYearShow = '';
				this.rangeMonth = this.currentMonth;
				let modifyDate = this.range[this.workIndex].split('-');
				let today = new Date().getDate();
				let monthEnd = new Date(this.currentYear, new Date().getMonth() + 1, 0).getDate();
				let end = modifyDate[1].replace('本月底', monthEnd).replace(/[^\d]/g, '');
				console.error(end);
				if (today < end*1) {
					// 赋值给考勤周期
					this.rangeMonth = this.currentMonth - 1;
				}
				this.generateRangeMonth();
				let date = this.cnDateTransferEn(this.range[this.workIndex]);
				// console.error(date);
				this.requestData(this.currentYear, date);
			} else if (this.currentTab === 1) {
				// console.error(this.range);
				this.currentYearShow = this.currentYear + '年';
				this.workIndex = this.range.indexOf(this.currentMonth + '月') - 1;
				this.selectNext();
				this.generateRangeMonth();
			} else {
				this.showDateRange = false;
				this.dateRange = '';
			}
		}
	}
};
</script>

<style lang="scss">
view {
	font-size: 24upx;
}
.up_margin {
	margin: auto;
	padding-bottom: 200upx;
	width: 686upx;
	position: relative;
	background-color: #fff;
	z-index: 3;
	border-radius: 16upx;
	.worktime-tab {
		text-align: center;
		border-bottom: 1px dotted #efefef;
		.worktime-tab-item {
			width: 100%;
			height: 72upx;
		}
		.current-tab {
			border-bottom: 3px solid #50aeff;
			color: #50aeff;
			padding-bottom: 10upx;
			.current-tab-font {
				font-weight: 700;
			}
		}
	}
}
@keyframes mymove {
	0% {
		right: 10px;
	}
	50% {
		right: 0px;
	}
	100% {
		right: 10px;
	}
}
.animate {
	animation: mymove 1.5s infinite;
}
.uni-calendar__header_hide {
	display: none !important;
}
.uni-calendar-item__weeks-box-item .uni-calendar-item__weeks-lunar-text {
	font-size: 20rpx !important;
}
.uni-calendar__weeks-item .uni-calendar-item--isDay,.uni-calendar__weeks-item .uni-calendar-item--checked {
	opacity: 1!important;
}
</style>
