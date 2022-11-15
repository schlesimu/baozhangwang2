<template>
	<view class="" style="height: 100%;">
		<!-- 头部搜索框 -->
		<view class="text-bold padding" style="font-size: 40upx;">选择职位</view>
		<view class="plr20 bg-white" style="position: fixed;width: 100%;">
			<view class="flex search_box alcenter justify-start">
				<text class="cuIcon-search margin-right-sm"></text>
				<input type="text" v-model="content" placeholder="搜索" placeholder-style="color:#DDDDD;font-size:28rpx" @confirm="seach" />
				<!-- <text class="lg text-gray cuIcon-roundclose"></text> -->
			</view>
		</view>
		<!-- 分类导航 -->
		<view class="flex mt20 navigation" v-if="positionList!=''">
			<!-- 左侧分类 -->
			<scroll-view class="left_list f28" scroll-y scroll-with-animation>
				<view class="left_item" v-for="(item,index) in positionList" :key="index" :class="index === currentId?' bg-f2f3':'' "
				 @click="tabtap(item,index)">
					{{item.station_name}}
				</view>
			</scroll-view>
			<!-- 右侧内容 -->
			<scroll-view scroll-with-animation scroll-y style="width: 65%;height: 100%;" class="bg-f2f3 plr15">
				<!-- <view class="all">全部</view> -->
				<view class="right_item flex column align-start " v-for="(item,index) in slist" :key="index" :class="{ selected: index === postId }"
				 :id="'main-' + item.aid" @tap="select_position(item,index)">
					{{item.station_name}}
				</view>
				<view class="padding text-df" v-if="slist==''">
					暂无内容
				</view>
			</scroll-view>
		</view>
		<view class=" pt50 " v-if="positionList==''">
			<view class="padding" v-for="(item,index) in slist" ::class="index === currentId?' bg-f2f3':'' " @tap="select_position(item,index)" >
				{{item.station_name}}
			</view>
			<view class="padding text-center text-df" v-if="slist==''">暂无数据</view>
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				pid: '',
				tab_cur: 0,
				flist: [],
				currentId: 0,
				slist: [],
				screen_height: '', //屏幕高度
				sizeCalcState: false,
				tabScrollTop: 0,
				content: '', //搜索内容
				postId: 0, //职位选择
				positionList: [], //岗位列表
				isSeach: true, //是否搜索职位

			}
		},
		onLoad() {
			// this.get_education_list();
			this.getPosition()

		},
		methods: {
			toPage(page) {
				uni.navigateTo({
					url: page
				});
			},
			seach() { //搜索
			this.isSeach=false
			if(this.content==''){
				this.isSeach=true
			}
				this.getPosition()
			},
			// 选择职位 返回上一页
			select_position(item, index) {
				this.postId = index;
				// this.pid = item.id;
				// this.slist = [];
				console.log(item.aid,item.station_name,'-----------');
				uni.$emit('position', item);
				uni.navigateBack();
			},
			//一级分类点击
			tabtap(item, index) {
				this.currentId = index;
				this.pid = item.id;
				this.slist = [];
				this.getPosition(item.aid)
			},
			getPosition(id) {
				//获取职位标签
				this.$Request.post(this.$api.job.get_station_list, {
					// user_id: uni.getStorageSync('USERINFO').id,
					seach: this.content || '',
					type_pid: id || ''
				}).then(res => {
					if (res.code == '1') {
						// if(!this.isSeach){
						// 	this.slist=res.data
						// 	return
						// }
						if (id) {
							this.slist = res.data
						} else {
							this.positionList = res.data;
							if(res.data!=''){
								this.getPosition(res.data[0].aid)
							}
						}
					}
				});
			},
			// 获取职位一级列表
			get_education_list() {
				this.$Request.post(this.$api.user.position_list, {}).then(res => {
					if (res.code == 1) {
						this.flist = res.data;
						this.pid = res.data[0].id;
						this.pid && this.get_slist()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},

			// 获取职位二级列表
			get_slist() {
				this.$Request.post(this.$api.user.position_list, {
					pid: this.pid
				}).then(res => {
					if (res.code == 1) {
						this.slist = res.data;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
		}
	}
</script>

<style>
	page,
	body {
		background: #ffffff !important;
		height: 100%;
	}

	.search_box {
		font-size: 28rpx;
		margin-top: 20rpx;
		padding: 0 20rpx;
		width: 100%;
		height: 64rpx;
		line-height: 64rpx;
		background: #f7f7f7;
		border-radius: 30rpx;
	}

	.navigation {
		height: 100%;
		width: 100%;
		position: fixed;
		top: 180rpx;
	}

	.left_list {
		background: #FFFFFF;
		width: 35%;
	}

	.left_item {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28upx;
		text-align: center;
		position: relative;

		z-index: 99;
		color: #666666;
	}

	.selected {
		/* background: #ffffff; */
		color: #1B90FF;
		font-weight: 600;
	}

	.right_item {
		width: 100%;
		height: 100rpx;
		font-size: 28upx;
		line-height: 100rpx;
	}

	.all {
		padding-left: 50rpx;
		margin-top: 20rpx;
	}
</style>
