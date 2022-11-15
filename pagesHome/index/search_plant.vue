<template>
	<view>
		<view class="status_bar"></view>
		<uni-nav-bar left-icon="back" @clickLeft="back">
			<view class="input-view">
				<input confirm-type="search" class="nav-bar-input" type="text" v-model="keyword" placeholder="输入搜索关键词" @confirm="confirm" />
				<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
			</view>
		</uni-nav-bar>
		
		<!-- 排序 -->
		<!-- <view class="flex around mtb20">
			<view class="flex alcenter" v-for="(item, index) in sort_list" :key="item.id" :class="sort_type==item.id ? 'checked' :''" >
				<text class="mr10" @tap="check_sort(item.id)">{{ item.name }}</text>
				<view class="flex column sort" @tap.stop="sort_up(item)">
					<text  class="cuIcon-fold text-xs" v-if="item.sort_method == 'asc'"></text>
					<text class="cuIcon-unfold text-xs" v-else></text>
				</view>
			</view>
		</view> -->
		
		
		<!--公司列表 -->
		<view class="plr10" >
			<mescroll-uni top="150" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit" :fixed="true">
				<view
					class="flex column between ptb10 plr10 card brb_c"
					v-for="(item, index) in job_list"
					:key="index"
					@tap="toPage('/pages/index/plant_detail?id=' + item.aid)"
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
			</mescroll-uni>
		</view>
		
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			up_down_type:1, //正序倒序?
			sort_type:1, //排序方式
			sort_list: [
				{
					id: 1,
					name: '综合',
					sort_method:'asc' 
				},
				{
					id: 2,
					name: '销量',
					sort_method:'asc'
				},
				{
					id: 3,
					name: '价格',
					sort_method:'asc'
				}
			],
			mescroll: null, //实例
			downOption: {
				use: true, // 是否启用下拉刷新; 默认true
			},
			upOption: {
				use: true, // 是否启用上拉加载; 默认true
				auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关内容'
				}
			},
			keyword:'',
			job_list:[],
			order:'asc', //排序方式
			longitude:'',
			latitude:'',
			job_type: 0, //工作类型选择
		};
	},
	onLoad(e) {
		this.keyword = e.title;
		this.get_location()
	},
	methods: {
		// 获取定位
		get_location() {
			let that = this;
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					that.longitude = res.longitude;
					that.latitude = res.latitude;
					that.longitude && that.downCallback();
				}
			});
		},
		mescrollInit(mescroll) {
			//初始化mescroll回调
			this.mescroll = mescroll;
		},
		downCallback(mescroll) {
			this.mescroll.resetUpScroll();
		},
		back(){
			uni.navigateBack({
				delta:2
			})
		},
		toPage(page) {
			const userInfo = uni.getStorageSync('USERINFO');
			if( !userInfo ){
				// #ifndef MP-WEIXIN
				uni.reLaunch({
					url: "../login/login"
				});
				// #endif
				
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url: '/pagessignup/wechat/wxlog'
				});
				// #endif
				
			}else{
				uni.navigateTo({
					url: page
				});
			}
		},
		// 选择排序类型
		check_sort(id){
			if(this.sort_type == id) return; 
			this.sort_type  = id;
			this.downCallback()
		},
		// 正序倒序
		sort_up(item){
			console.log(item,'我是笨比')
			let that = this;
			if(this.sort_type = item.id){
				item.sort_method = item.sort_method == 'asc' ? 'desc' : 'asc';
				that.order = item.sort_method;
				that.downCallback()
			}
			
		},
		confirm(){
			this.downCallback()
		},
		// 获取工厂列表
		upCallback(page) {
			// console.log(page);
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			let that = this;
			this.$Request
				.post(this.$api.plant.get_plant_list, {
					type: 0,
					long: this.longitude,
					lat: this.latitude,
					page: pageNum,
					sort: this.order,
					company_name:this.keyword
				})
				.then(res => {
					if (res.code == 1) {
						let curPageLen = res.data.list.data.length;
						if (page.num == 1) this.job_list = []; //如果是第一页需手动置空列表
						that.job_list = this.job_list.concat(res.data.list.data); //追加新数据
						//每页数据条数  后台接口有总数据量
						page.endBySize(curPageLen, res.data.list.total);
					} else {
						uni.showToast({ title: res.msg, icon: 'none' });
					}
				});
		},
	}
};
</script>

<style >
	page{
		background: #fff !important;
	}
.input-view {
	font-size: 24rpx;
	display: flex;
	align-items: center;
	flex-direction: row;
	flex: 1;
	background-color: #F4F4F4;
	height: 64rpx;
	border-radius: 30rpx;
	padding: 0 30rpx;
	flex-wrap: nowrap;
	margin: 14rpx 0;
	line-height: 64rpx;
}
.sort{
	line-height: 18rpx;
}
.sort_up_down{
	color: #FF9E3E;
}
.checked{
	position: relative;
	z-index: 99;
}
.checked::after{
	content:"";
	position: absolute;
	left: 0;
	bottom: 10rpx;
	width:56rpx;
	height:8rpx;
	background:rgba(255,158,62,1);
	z-index: -2;
}
.goodsImg{
	width: 170rpx;
	height: 170rpx;
}
.job_img {
	width: 110rpx;
	height: 110rpx;
	border-radius: 50%;
	border: 1px solid #ff9e3e;
}
.subsidy {
	/* position: relative; */
	width: 160rpx;
	height: 93rpx;
	/* background: url('../../static/images/butie.png') no-repeat; */
	background-size: 100% 100%;
}
.card {
	min-height: 212rpx;
}
.label_item {
	margin-top: 10rpx;
	margin-left: 0;
	margin-right: 10rpx;
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
</style>