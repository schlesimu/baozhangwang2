<template>
	<view>
		<!-- <mescroll-uni  top="0" bottom="0" offset="10" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="initCallback" :fixed="false"> -->
		<view class="" v-if="job_list != ''">
			<view
				class="flex column between ptb10 plr10 card brb_c"
				v-for="(item, index) in job_list"
				:key="index"
				@tap="navTo('/pages/index/plant_detail?id=' + item.aid)"
			>
				<view class="flex  between">
					<view class="flex">
						<!-- logo -->
						<view class=""><image :src="item.image" mode="" class="job_img mr10"></image></view>
						<!-- 工资 -->
						<view class="flex column between" style="height: 90%;">
							<text class="gray3  bold f28" style="font-weight: bold;">{{ item.company_name }}</text>
							<text class="normal_red bold ">{{ item.min_salary || 0 }}~{{ item.max_salary || 0 }}元/月</text>
						</view>
					</view>
					<!-- 工价 -->
					<view class="subsidy flex column around  alcenter">
						<text class="f28 text-white">{{ item.subsidy_type == 1 ? '补贴' : item.subsidy_type == 2 ? '工价' : '' }}</text>
						<text class="f28  normal_red ellipsis tc bold" style="width: 100%;">{{ item.return_money }}</text>
					</view>
				</view>
				<view class="flex between alcenter">
					<view class="flex alcenter">
						<view class="f24 overflow-one tc mr10" style="width: 110rpx;">{{item.address}}</view>
						<view class="">
							<text class="cu-tag theme_bgcolor_opocity txt-theme bold text-sm label_item radius6" v-for="(i, v) in item.welfare" :key="i">{{ i }}</text>
						</view>
					</view>
					<view class="tc ellipsis" style="width: 160rpx;">
						<text class="text-sm gray3  tc mt10">已报名 {{ item.count }}+</text>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" icon-type="iconType" :load-text="loadText" />
		</view>
		<!-- <u-empty text="暂无相关数据" mode="list" v-if="job_list==''"></u-empty> -->
		<!-- </mescroll-uni> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			job_list: [],
			job_type: 1,
			page: 1,
			order: 'asc',
			// longitude:'',
			// latitude:'',
			total_page: '',
			company_type: '',
			sort_type: '',
			lat: '',
			lon: '',
			mescroll: null, //实例
			downOption: {
				use: true, // 是否启用下拉刷新; 默认true
				auto: true // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
			},
			upOption: {
				use: true, // 是否启用上拉加载; 默认true
				auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 30 // 每页数据的数量,默认10
				},
				noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关内容'
				},
				// bottomOffset:500,
				offset: 100
			},
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '实在没有了'
			},
			last_page:'' //最后一页
		};
	},
	props: {
		// 工厂筛选条件
		companyType: {
			type: [String, Number]
		},
		// 排序分类
		sortType: {
			type: [String, Number]
		},
		Lat: {
			type: [String, Number]
		},
		Lon: {
			type: [String, Number]
		},
		is_show_top: {
			type: [Boolean]
		},
		swiperHeight: {
			type: [String, Number],
			default: 100
		}
	},
	computed: {
		hasTop: () => {
			return true;
		},
		swHeight() {
			return this.swiperHeight + 'px';
		}
	},
	created() {
		let that = this;
		uni.$on('getLocation', res => {
			console.log('定位', res);
			that.lat = res.latitude;
			that.lon = res.longitude;
			that.job_list = [];
			that.get_list()
		});
		uni.$on('to_bottom',res=>{
			if(res==1){
				if(that.page >= that.last_page) return ;
				that.status = 'loading';
				that.page = ++ that.page;
				that.get_list()
			}
		})
	},
	mounted() {
		this.company_type = this.$props.companyType;
		this.sort_type = this.$props.sortType;
		// this.get_list()
	},
	methods: {
		toPage(page) {
			const userInfo = uni.getStorageSync('USERINFO');
			if (!userInfo) {
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: "../login/login"
				});
				// #endif
				
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url: '/pagessignup/wechat/wxlog'
				});
				// #endif
			
			} else {
				uni.navigateTo({
					url: page
				});
			}
		},
		choose_location(msg) {
			this.lon = msg.lon;
			this.lat = msg.lat;
			setTimeout(() => {
				this.page = 1;
				this.job_list = [];
				this.get_list()
			}, 100);
		},
		// 工厂排序
		sort_data(msg) {
			console.log(999999, msg);
			this.sort_type = msg;
			uni.showLoading({
				title: '加载中...'
			});
			this.job_list = [];
			this.page = 1;
			this.get_list()
		},
		// 工厂筛选
		plant_filter(msg) {
			this.company_type = msg;
			uni.showLoading({
				title: '加载中...'
			});
			this.page = 1;
			this.job_list = [];
			this.get_list()
		},
		// 获取定位
		// get_location() {
		// 	let that = this;
		// 	uni.getLocation({
		// 		type: 'gcj02',
		// 		geocode: true,
		// 		success: function(res) {
		// 			console.log(res, '地址');
		// 			that.longitude = that.lat;
		// 			that.latitude = that.lon;
		// 			that.lat && that.downCallback()
		// 		},
		// 		fail() {
		// 			// //关闭加载动画
		// 			// that.$refs.loading.close();
		// 			that.$Common.toast('获取定位失败,请先开启定位权限');
		// 		}
		// 	});
		// },
		// 获取工厂列表
		get_list() {
			let that = this;
			console.log('切换定位', this.lon, this.lat);
			this.$Request
				.post(this.$api.plant.get_plant_list, {
					type: this.sort_type,
					long: this.lon,
					lat: this.lat,
					page: this.page,
					job_type: 2,
					sort: this.order,
					list_rows: 30,
					company_type: this.company_type
				})
				.then(res => {
					uni.hideLoading();
					if (res.code == 1) {
						that.job_list = this.job_list.concat(res.data.list.data); //追加新数据
						that.last_page  = res.data.list.last_page;
						that.status = res.data.list.last_page <= that.page ? 'nomore':'loadmore';
						setTimeout(() => {
							that.$emit('getData', 111);
						}, 100);
					} else {
						uni.showToast({ title: res.msg, icon: 'none' });
					}
				});
		}
		// 获取工厂列表
		// upCallback(page) {
		// 	// console.log(page);
		// 	let pageNum = page.num; // 页码, 默认从1开始
		// 	let pageSize = page.size; // 页长, 默认每页10条
		// 	let that = this;
		// 	console.log('切换定位', this.lon, this.lat);
		// 	this.$Request
		// 		.post(this.$api.plant.get_plant_list, {
		// 			type: this.sort_type,
		// 			long: this.lon,
		// 			lat: this.lat,
		// 			page: pageNum,
		// 			job_type: 1,
		// 			sort: this.order,
		// 			list_rows : 30,
		// 			company_type: this.company_type
		// 		})
		// 		.then(res => {
		// 			uni.hideLoading();
		// 			if (res.code == 1) {
		// 				let curPageLen = res.data.list.data.length;
		// 				if (page.num == 1) this.job_list = []; //如果是第一页需手动置空列表
		// 				that.job_list = this.job_list.concat(res.data.list.data); //追加新数据
		// 				//每页数据条数  后台接口有总数据量
		// 				page.endBySize(curPageLen, res.data.list.total);

		// 				setTimeout(() => {
		// 					that.$emit('getData', 111);
		// 				}, 100);
		// 			} else {
		// 				uni.showToast({ title: res.msg, icon: 'none' });
		// 			}
		// 		});
		// }
	}
};
</script>

<style scoped>
.job_img {
	width: 110rpx;
	height: 110rpx;
	border-radius: 50%;
	border: 1px solid #ff9e3e;
}
.card {
	min-height: 212rpx;
}
.label_item {
	margin-top: 10rpx;
	margin-left: 0;
	margin-right: 4rpx;
}
.head_img {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
}
.info {
	flex: 1;
	line-height: 60rpx;
}
.subsidy {
	width: 160rpx;
	height: 93rpx;
	/* background: url('../../static/images/butie.png') no-repeat; */
	background-size: 100% 100%;
}
</style>
