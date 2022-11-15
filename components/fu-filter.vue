<template>
	<view class="filter-wrap padding-lr" @touchmove.stop.prevent style="touch-action: none;">
		<view class="flex align-center justify-between padding-bottom padding-lr-sm filter-wrap-select" @touchmove.stop.prevent style="touch-action: none;">
			<view
				class="fu-fs24 flex align-center filter-wrap-select-item"
				style="position: relative;"
				:class="activeFilter == index ? 'text-theme' : 'text-333'"
				v-for="(item, index) in filterTypeList"
				:key="item.id"
				@tap="selectFilter(index)"
			>
				<text class="margin-right-xs">{{ item.name }}</text>
				<text :class="activeFilter == index ? 'kailong' : ' kaiact'"></text>
				<!-- <image src="/static/bencao/filter-arrow.png" mode="aspectFill" class="filter-arrow"
					:class="activeFilter == index ? 'filter-arrow-top' : ''"></image> -->
			</view>
		</view>
		<view class="filter-pop bg-white" v-if="popOpen" @touchmove.stop.prevent style="touch-action: none;">
			<view class="filter-pop-mark1" @tap.stop="close" @touchmove.stop.prevent style="touch-action: none;"></view>
			<view class="filter-pop-mark" @tap.stop="close" :style="{ height: markHeight }" @touchmove.stop.prevent style="touch-action: none;"></view>
			<template v-if="activeFilter == 4">
				<scroll-view class="bg-white filter-content padding-lr" :style="{ maxHeight: markHeight }" scroll-y>
					<view
						class="padding-tb solid-bottom"
						:class="[item.id == orderType ? 'text-theme' : '']"
						v-for="(item, index) in orderTypeList"
						@tap="chooseOrderType(item, index)"
					>
						{{ item.name }}
					</view>
				</scroll-view>
			</template>
			<template v-if="activeFilter == 0">
				<view class="room-list flex bg-white" @touchmove.stop.prevent style="touch-action: none;">
					<!-- 左侧分类 start -->
					<scroll-view class="left margin-right-xl" scroll-y scroll-with-animation :style="{ maxHeight: markHeight, height: markHeight }">
						<block v-for="(item, index) in positionList" :key="index">
							<view
								class="padding-tb padding-left solid-bottom fu-fs28"
								:class="[provinceIndex == index ? 'bg-white text-theme' : 'text-333']"
								@tap="chooseProvince(item, index)"
							>
								{{ item.station_name }}
							</view>
						</block>
					</scroll-view>
					<!-- 左侧分类 end -->
					<!-- 右侧分类 start -->
					<scroll-view class="right flex-sub" scroll-y scroll-with-animation :style="{ maxHeight: markHeight, height: markHeight }">
						<block v-for="(item, index) in slist" :key="index">
							<view class="padding-tb   fu-fs28" :class="[cityIndex == index ? 'txt-theme' : 'text-333']" @tap="choosePosition(item, index)">
								{{ item.station_name }}
							</view>
						</block>
						<view class="ptb15" v-if="slist == '' && provinceIndex != 0">暂无数据</view>
					</scroll-view>
					<!-- 右侧分类 end -->
				</view>
			</template>
			<template v-if="activeFilter == 5">
				<view class="room-list flex bg-white" @touchmove.stop.prevent style="touch-action: none;">
					<!-- 左侧分类 start -->
					<scroll-view class="left margin-right-xl" scroll-y scroll-with-animation :style="{ maxHeight: markHeight, height: markHeight }">
						<block v-for="(item, index) in departmentList" :key="index">
							<view
								class="padding-tb padding-left solid-bottom fu-fs28"
								:class="[departmentsIndex == index ? 'bg-white text-theme' : 'text-333']"
								@tap="chooseRoom(item, index)"
							>
								{{ item.name }}
							</view>
						</block>
					</scroll-view>
					<!-- 左侧分类 end -->
					<!-- 右侧分类 start -->
					<scroll-view class="right flex-sub" scroll-y scroll-with-animation :style="{ maxHeight: markHeight, height: markHeight }">
						<block v-for="(item, index) in illnessList" :key="index">
							<view
								class="padding-tb padding-left solid-bottom fu-fs28"
								:class="[illnessIndex == index ? 'text-theme' : 'text-333']"
								@tap="chooseIllness(item, index)"
							>
								{{ item.name }}
							</view>
						</block>
					</scroll-view>
					<!-- 右侧分类 end -->
				</view>
			</template>
			<template v-if="activeFilter == 1">
				<view class="bg-white filter-content padding-lr flex align-center flex-wrap padding-top" :style="{ maxHeight: markHeight }" scroll-y>
					<view
						class="padding-tb  type_item margin-right margin-bottom"
						:class="[item.value == currentIndexExp ? 'active' : '']"
						v-for="(item, index) in experience"
						@tap="chooseExperience(item, index)"
					>
						{{ item.label }}
					</view>
				</view>
			</template>
			<template v-if="activeFilter == 2">
				<view class="bg-white filter-content padding-lr  padding-top flex align-center flex-wrap" :style="{ maxHeight: markHeight }" scroll-y>
					<view
						class="padding-tb  type_item margin-right margin-bottom"
						:class="[item.id == currentIndexEdu ? 'active' : '']"
						v-for="(item, index) in degree_list"
						@tap="chooseEducation(item, index)"
					>
						{{ item.label }}
					</view>
				</view>
			</template>
			<template v-if="activeFilter == 3">
				<view class="bg-white filter-content padding-lr  padding-top flex align-center flex-wrap" :style="{ maxHeight: markHeight }" scroll-y>
					<view
						class="padding-tb  type_item margin-right margin-bottom"
						:class="[index == currentIndexSal ? 'active' : '']"
						v-for="(item, index) in salaryList"
						:key="index"
						@tap="chooseSalary(item, index)"
					>
						{{ item }}
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
/**
	 * 
		<fu-filter @chooseOrderType="chooseOrderType" @chooseCity="chooseCity" @chooseIllness="chooseIllness" @chooseJobtitle="chooseJobtitle"></fu-filter>
		import fuFilter from '@/components/fu-fiilter/fu-filter.vue';
		components: {
			fuFilter
		},
		data () {
			return {
				orderType: 1, // 排序方式
				cityId: null, // 选择的城市id
				provinceId: null, // 选择的省id
				departmentId: null, // 科室id
				diseaseId: null, // 选择的病症id
				jobtitleId: null, // 职称id
				mix: '', // 根据 搜索框输入的 医院|疾病|姓名 混合搜索
			}
		},
		methods: {
			// 选择排序方式
			chooseOrderType (e) {
				this.orderType = e.orderType;
			},
			// 选择城市
			chooseCity (e) {
				this.cityId = e.cityId;	
			},
			// 选择病症
			chooseIllness (e) {
				this.departmentId = e.departmentId;
			},
			// 选择职称
			chooseJobtitle (e) {
				this.jobtitleId = e.jobtitleId;
			},
		}
	 */
import { experience1 } from '@/common/js/mockData.js';
export default {
	name: 'fu-filter',
	data() {
		return {
			experience: experience1, //经验
			degree_list: '', //学历列表
			activeFilter: null, // 当前选中过滤条件
			filterTypeList: [
				// 过滤条件
				{
					id: 1,
					name: '行业职位'
				},
				{
					id: 2,
					name: '经验'
				},
				{
					id: 3,
					name: '学历'
				},
				{
					id: 4,
					name: '薪资'
				}
			],
			orderTypeList: [
				// 排序类型
				{
					id: 1,
					name: '综合'
				},
				{
					id: 2,
					name: '评分'
				},
				{
					id: 3,
					name: '服务数'
				}
			],
			popOpen: false, // 是否显示筛选弹窗
			markHeight: '0px', // 蒙版高度，需要计算
			orderType: 1, // 选中的order_type的值 1综合，2评分，3服务数
			jobtitleList: [], // 职称列表
			currentIndexExp: 0, // 选中的经验
			currentIndexEdu: 0, // 选中的学历
			currentIndexSal: 0, //薪资索引
			departmentList: [], // 科室列表
			departmentsIndex: 0, // 选中的科室索引
			illnessIndex: null, // 当前选中的二级分类，病症
			provinceList: [], // 省列表
			provinceIndex: 0, // 选中的职位索引
			cityIndex: 0, // 市区索引
			salaryList: '', //薪资列表
			positionList: [], //职位列表
			slist: '' //二级职位
		};
	},
	watch: {
		popOpen(value) {
			// console.error(value, '开合');
		}
	},
	computed: {
		illnessList() {
			return this.departmentList[this.departmentsIndex] ? this.departmentList[this.departmentsIndex].sub : '';
		},
		cityList() {
			return this.provinceList[this.provinceIndex] ? this.provinceList[this.provinceIndex].child : '';
		}
	},
	created() {
		this.getDegree();
		this.getWantSalary();
		this.getPosition();
	},
	methods: {
		/**
		 * @param {Number} index  filterTypeList的索引
		 */
		selectFilter(index) {
			if (this.activeFilter === index) {
				this.activeFilter = null;
				this.popOpen = false;
				return;
			}
			// 动态获取当前filter-wrap距离底部的高度
			uni.createSelectorQuery()
				.in(this)
				.select('.filter-wrap')
				.boundingClientRect(data => {
					this.$nextTick(() => {
						this.markHeight = `calc(100vh - ${data.top + data.height + 40}px)`;
					});
				})
				.exec();
			this.activeFilter = index;
			this.$parent.page = 1; // 切换后将页码重置，否则互相干扰
			this.$parent.keyword = '';
			// 此处不局限于前两个职业类型，可能缓存了其他职业类型点开也要重新获取数据
			if (index == 0) {
				// 此处为初始化数据或者上次缓存结果，以此为参数获取简历列表
				let stations_pid = this.station_id = this.positionList[this.provinceIndex].aid;
				let stations_id = this.station = this.slist.length ? this.slist[this.cityIndex].aid : 0;
				this.getPosition(stations_pid, 2);
				this.$emit('choosePosition', {
					aid: stations_id,
					station_id: stations_pid //一级职位id
				});
			}
			this.popOpen = true;
		},
		// 获取期望薪资
		getWantSalary() {
			this.$Request.post(this.$api.user.getWantSalary).then(res => {
				if (res.code == '1') {
					res.data.unshift('全部');
					this.salaryList = res.data;
				}
			});
		},
		// 关闭弹窗
		close() {
			this.activeFilter = null;
			this.popOpen = false;
		},
		/**
		 * @param {Object} item 选中的学历
		 * @param {Number} index 选中的索引
		 */
		chooseEducation(item, index) {
			this.currentIndexEdu = item.id;
			this.$parent.page = 1; // 切换后将页码重置，否则互相干扰
			this.$emit('chooseEducation', item);
			setTimeout(() => {
				this.close();
			}, 200);
		},
		// 薪资
		chooseSalary(item, index) {
			this.currentIndexSal = index;
			this.$parent.page = 1; // 切换后将页码重置，否则互相干扰
			if (index == 0) {
				item = '';
			}
			this.$emit('chooseSalary', item);
			setTimeout(() => {
				this.close();
			}, 200);
		},
		getPosition(id, level = 1) {
			//获取职位标签
			this.$Request
				.post(this.$api.job.get_station_list, {
					// user_id: uni.getStorageSync('USERINFO').id,
					seach: this.content || '',
					type_pid: id || ''
				})
				.then(res => {
					// console.error(res);
					if (res.code == '1') {
						// 对于一级菜单【全部】，在二级菜单里只显示一个全部即可
						// 而对于其他菜单的二级需要按实际全部显示
						// 如果id不为空，则是第二级职位
						if (id) {
							if (res.data != '') {
								res.data.unshift({
									aid: 0,
									station_name: '全部'
								});
							}
							this.slist = res.data;
						} else {
							// 加载全部的第二级
							if (level == 2) {
								// 职位分类为全部的时候，id是0
								this.slist = [
									{
										aid: 0,
										station_name: '全部'
									}
								];
								return;
							}
							
							// 如果id为空，则是职业分类
							res.data.unshift({
								aid: 0,
								station_name: '全部'
							});
							this.positionList = res.data;
						}
					}
				});
		},
		/**
		 * @param {Object} item 选中的一级职位分类
		 * @param {Number} index 选中的索引
		 */
		chooseProvince(item, index) {
			if (this.provinceIndex === index) {
				return;
			}
			this.provinceIndex = index;
			this.cityIndex = 0; // 需要重置一下，否则可能导致选不中
			this.getPosition(item.aid, 2);
			
			this.$parent.page = 1; // 切换后将页码重置，否则互相干扰
			this.$parent.keyword = '';
			// 请求数据，第一次加载，使用初始化结果或者缓存结果获取数据
			let stations_pid = this.station_id = item.aid;
			let stations_id = this.station = this.slist.length ? this.slist[this.cityIndex].aid : 0;
			this.$emit('choosePosition', {
				aid: stations_id,
				station_id: stations_pid //一级职位id
			});
		},
		/**
		 * @param {Object} item 选中的职位
		 * @param {Number} index 选中的索引
		 */
		choosePosition(item, index) {
			// console.error(this.cityIndex, index)
			if (this.cityIndex === index && this.cityIndex !== 0) {
				return;
			}
			this.cityIndex = index;
			// console.error(this.provinceIndex, this.positionList);
			this.$parent.page = 1; // 切换后将页码重置，否则互相干扰
			let station_pid = this.station_id = this.positionList.length ? this.positionList[this.provinceIndex].aid : 0;
			// console.error(item);
			this.station = item.aid;
			// console.error(station_pid, item.aid);
			this.$parent.keyword = '';
			this.$emit('choosePosition', {
				aid: item.aid,
				station_id: station_pid //上级职位id
				// station_name: item.station_name
			});
			setTimeout(() => {
				this.close();
			}, 200);
		},
		/**
		 * @param {Object} item 选中的科室
		 * @param {Number} index 选中的索引
		 */
		chooseRoom(item, index) {
			if (this.departmentsIndex === index) {
				return;
			}
			this.departmentsIndex = index;
			this.illnessIndex = null;
		},
		/**
		 * @param {Object} item 选中的病症
		 * @param {Number} index 选中的索引
		 */
		chooseIllness(item, index) {
			if (this.illnessIndex === index) {
				return;
			}
			let diseaseId;
			this.illnessIndex = index;
			if (item.id == 0) {
				this.filterTypeList[2].name = this.departmentList[this.departmentsIndex].name;
				diseaseId = item.id;
			} else {
				this.filterTypeList[2].name = item.name;
				diseaseId = item.id;
			}
			this.$emit('chooseIllness', {
				departmentId: this.departmentList[this.departmentsIndex].id,
				diseaseId: diseaseId
			});
			setTimeout(() => {
				this.close();
			}, 200);
		},
		// 选择经验
		chooseExperience(item, index) {
			this.currentIndexExp = item.value;
			this.$parent.page = 1; // 切换后将页码重置，否则互相干扰
			if (index == 0) {
				item = '';
			}
			console.log(item);
			this.$emit('chooseExperience', item);
			setTimeout(() => {
				this.close();
			}, 200);
		},
		getDegree() {
			//获取学历
			this.$Request
				.post(this.$api.user.user_degree, {
					type: 1
				})
				.then(res => {
					if (res.code == '1') {
						res.data.unshift({
							id: 0,
							label: '全部'
						});
						this.degree_list = res.data;
					}
				});
		}
	}
};
</script>

<style lang="scss">
.kailong {
	position: absolute;
	right: -22upx;
	top: 16upx;
	width: 0;
	height: 0;
	border-right: 14upx solid transparent;
	border-left: 14upx solid transparent;
	border-top: 14upx solid #333;
}

.kaiact {
	position: absolute;
	right: -22upx;
	top: 16upx;
	width: 0;
	height: 0;
	border-right: 14upx solid transparent;
	border-left: 14upx solid transparent;
	border-top: 14upx solid #999;
}

.type_item {
	padding: 10upx 16upx;
	border: 1px solid rgba(230, 230, 230, 1);
	border-radius: 4rpx;
}

.active {
	background-color: #ecf6ff !important;
	color: #1b90ff !important;
	border: 1px solid #1b90ff;
}

.filter-wrap {
	position: relative;
	z-index: 1100;

	.filter-wrap-select {
		position: relative;
		z-index: 1100;

		.filter-arrow {
			width: 12rpx;
			height: 8rpx;
			transition: 0.5s all;

			&.filter-arrow-top {
				transform: rotate(180deg);
			}
		}
	}

	.filter-pop {
		position: absolute;
		width: 100%;
		top: 90%;
		left: 0;
		right: 0;
		z-index: 10000;

		.filter-pop-mark {
			background: rgba(0, 0, 0, 0.3);
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 3000;
		}

		.filter-pop-mark1 {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 3000;
		}

		.filter-content {
			position: relative;
			z-index: 9900;
		}

		.room-list {
			position: relative;
			z-index: 9900;

			.left {
				position: relative;
				z-index: 9900;
				width: 255rpx;
				background: #eeeeee;
			}
		}
	}
}
</style>
