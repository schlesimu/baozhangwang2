<!-- 招聘者首页 -->
<template>
	<scroll-view scroll-y style="padding-bottom: 100rpx;" class="bg-white" :style="[{ height: 'calc(100vh)' }]">
		<cu-custom bgColor="text-black bg-white" :isBackText="true">
			<!-- #ifdef MP-WEIXIN -->
			<!-- <block slot="backText"><text class="text-sm padding" style="color: #1B90FF;" @tap="topage">创建职位</text></block> -->
			<!-- #endif -->
			<block slot="content"><text class="" style="font-size: 36upx;">职位管理</text></block>
			<!-- #ifndef MP-WEIXIN -->
			<!-- <block slot="right"><text class="text-sm padding" style="color: #1B90FF;" @tap="topage">创建职位</text></block> -->
			<!-- #endif -->
		</cu-custom>
		<!-- 搜索框 -->
		<view class="flex align-center justify-center" style="width: 94%; border: 1px solid #ccc; border-radius: 48upx; margin: 0 auto; height: 72upx;">
			<view class="flex search_box align-center plr15 between" style="width: 100%;">
				<view class="flex alcenter" style="width: 100%;">
					<view class="inputBox flex align-center" style="width: 100%;">
						<text class="lg text-gray cuIcon-search mr10"></text>
						<input
							type="text"
							v-model="kw"
							style="width: 100%;"
							@confirm="upCallback({ num: 1, size: 10 })"
							@input="upCallback({ num: 1, size: 10 }, 'input')"
							placeholder="搜索您想找的职位，比如洗碗工、PHP工程师等"
							placeholder-style="color:#999999;font-size:24rpx;"
						/>
					</view>
				</view>
			</view>
		</view>
		<!-- 状态选择 -->
		<view class="flex justify-around bg-white">
			<view class="" v-for="(item, index) in three" :key="index" @tap="chose(index)" style="position: relative;line-height: 87upx;" :class="index == threeid ? 'active' : ''">
				<text class="text-df padding-bottom-sm  text-gray">{{ item.name }}</text>
			</view>
		</view>
		<!-- 列表区域 -->
		<view class="cu-list menu sm-border" style="height: 100%;">
			<view class="" style="position: relative;">
				<mescroll-uni
					ref="mescrollRef"
					:top="170 + CustomBar * 2"
					@init="mescrollInit"
					@down="downCallback"
					@up="upCallback"
					:down="downOption"
					:up="upOption"
					:fixed="true"
				>
					<view class="flex justify-start padding " v-for="(item, index) in lisdata" :key="index" @tap="godetail(item)">
						<view class="bg_img"><image :src="item.image || IMG_URL + 'static/miniwechat/head_null.png'" mode="aspectFill"></image></view>
						<view class="" style="flex: 1;">
							<view class="flex justify-between align-center" style="margin-bottom: 18upx;">
								<view class="text-left  " style="font-size: 12px;">
									<view class="text-bold" style="font-size: 32upx;margin-bottom: 10upx;">{{ item.name || '无' }}</view>
									<view class="text-df txt_red">{{ item.min_salary || 0 }}~{{ item.max_salary || 0 }}元/月</view>
								</view>
								<view class="returnBox flex column around  alcenter" v-if="item.fan_price != ''">
									<text class="f28 top_blue tc">{{ item.fan_type || '无' }}</text>
									<text class="f28 normal_red ellipsis tc bold plr5" style="width: 100%;">{{ item.fan_price || 0 }}元</text>
								</view>
								<!-- <view class="text-center box_sort">
									<view class="bg-theme" style="color: #FFFFFF;width: 95upx;">{{ item.fan_type || '无' }}</view>
									<view class="txt_red" style="height: 45upx;width: 95upx;">{{ item.fan_price || 0 }}元</view>
								</view> -->
							</view>
							<view class="flex justify-between align-center">
								<view class=" flex">
									<view class="btn_top mr5 left">{{ item.open }}</view>
									<view class="btn_top left" @tap.stop="applyTop(item)" v-if="item.status != 0">{{ item.top }}</view>
								</view>

								<view class=" btn_top" style="font-size: 12px;" @tap.stop="lookSign(item, index)" v-if="item.status == 1">查看报名</view>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>

		<view style="width: 30%; height: 128upx; display: flex; justify-content: space-around; align-items: center; position: fixed; left: 20%; bottom: 120upx; z-index: 98;">
			<view
				style="width: 128upx; height: 128upx; background-color: #f3a73f; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;"
				@click="topage()"
			>
				<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
				<text style="color: #FFFFFF; font-size: 26upx;">创建职位</text>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			PageCur: 'homepage',
			CustomBar: this.CustomBar,
			cardCur: 0,
			three: [
				{
					id: 0,
					name: '全部'
				},
				{
					id: 1,
					name: '招聘中'
				},
				{
					id: 2,
					name: '已关闭'
				}
			],
			status: 9, //9全部  1 招聘中 0已关闭
			threeid: 0,
			aid: '', //职位标签id
			IMG_URL: this.IMG_URL,
			user: '', //公司信息
			distance: 1, //分类选择
			isactive: null,
			lisdata: [], // 列表数组
			lon: '', //经度
			lat: '', //纬度
			isopen: true, //跳转页面
			downOption: {
				//下拉刷新
				auto: false //页面初次加载禁止
			},
			// 上拉加载的常用配置
			upOption: {
				isBounce: false,
				use: true, // 是否启用上拉加载; 默认true
				auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 5 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无内容'
				}
			},
			kw: '' // 搜索关键词
		};
	},
	created() {
		// this.$Common.getLocation(e => {
		// 	//获取经纬度
		// 	console.log(e);
		// 	this.lon = e.longitude;
		// 	this.lat = e.latitude;
		// 	this.$nextTick(() => {
		// 	// 	this.downCallback();
		// 	this.mescroll && this.mescroll.resetUpScroll()
		// 	});
		// });
		this.mescroll && this.mescroll.resetUpScroll();
		uni.$on('updateList', data => {
			this.mescroll && this.mescroll.resetUpScroll();
		});
		uni.$on('applyTop', data => {
			this.mescroll && this.mescroll.resetUpScroll();
		});
	},
	mounted() {
		// this.mescroll && this.downCallback()
		this.mescroll && this.mescroll.resetUpScroll();
		uni.$on('companyInfo', () => {
			this.get_userinfo();
		});
		this.get_userinfo();
	},
	methods: {
		chose(index) {
			//选择招聘状态
			if (index == 0) {
				this.status = 9;
			} else if (index == 1) {
				this.status = 1;
			} else {
				this.status = 0;
			}
			this.threeid = index;
			this.distance = index + 1;
			this.mescroll && this.mescroll.resetUpScroll();
		},
		get_userinfo() {
			//获取公司信息
			this.$Request.post(this.$api.company.companyInfo).then(res => {
				uni.hideLoading();
				if (res.code == 1) {
					this.user = res.data.info;
					uni.setStorageSync('roleinfo', res.data);
				}
			});
		},
		lookSign(item, index) {
			//查看报名
			uni.navigateTo({
				url: '../../pagescenter/zhaopinzhe/sign_list?job_id=' + item.aid
			});
		},
		topage(url) {
			if (url) {
				uni.navigateTo({
					url: url
				});
				return;
			}
			//发布职位
			if (this.user.company_address && this.user.company_name) {
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: '../../pagescenter/zhaopinzhe/fabu_zhiwei?station_type=' + this.user.station_type
				});
			} else {
				this.$Common.toast('请先完善公司信息');
				setTimeout(() => {
					uni.navigateTo({
						url: '../../pagescenter/zhaopinzhe/companyAdmin'
					});
				}, 500);
			}
		},
		applyTop(item) {
			//申请置顶
			if (this.isopen == false) {
				return;
			}
			this.isopen = false;
			setTimeout(() => {
				this.isopen = true;
			}, 1500);
			if (item.top == '申请置顶') {
				uni.navigateTo({
					url: '../../pagesHome/applyTop?aid=' + item.aid
				});
			} else if (item.top == '申请中') {
				this.$Common.toast('申请中');
			} else if (item.top == '置顶中') {
				this.$Common.toast('置顶中');
			}
		},
		add(index, aid) {
			//选择标签获取数据
			this.isactive = index;
			this.aid = aid;
			this.downCallback();
		},

		// 跳转详情页
		godetail(item) {
			if (this.isopen == false) {
				return;
			}
			this.isopen = false;
			setTimeout(() => {
				this.isopen = true;
			}, 3000);
			uni.navigateTo({
				url: '../../pagesHome/postDetail?aid=' + item.aid + '&open=' + item.open
			});
		},
		/*上拉加载的回调*/
		upCallback(mescroll, source) {
			// 输入框清空的时候重新调一次
			if (source === 'input' && this.kw !== '') return;
			// console.error(this.kw);
			// 此时mescroll会携带page的参数:
			let pageNum = mescroll ? mescroll.num : 1; // 页码, 默认从1开始
			let pageSize = mescroll ? mescroll.size : 10; // 页长, 默认每页10条
			this.$Request
				.post(this.$api.company.applicationList, {
					list_rows: 15,
					status: this.status,
					page: pageNum,
					kw: this.kw
					// longitude: this.lon,
					// latitude: this.lat
				})
				.then(res => {
					if (res.code == 1) {
						let curPageData = res.data.data;
						curPageData.map(item => {
							if (item.status == 0) {
								item.open = '开启';
							} else if (item.status == 1) {
								item.open = '关闭';
							}
							if (item.top == 0 || item.top == 3) {
								item.top = '申请置顶';
							} else if (item.top == 1) {
								item.top = ' 申请中';
							} else {
								item.top = '置顶中';
							}
							return item;
						});
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						let totalPage = res.data.total;
						if (curPageData.length === 0) {
							this.$refs.mescrollRef.isShowEmpty = true;
						} else {
							this.$refs.mescrollRef.isShowEmpty = false;
						}
						//设置列表数据
						if (mescroll.num == 1) this.lisdata = []; //如果是第一页需手动置空列表
						this.lisdata = this.lisdata.concat(curPageData); //追加新数据
						// console.log(this.lisdata);

						mescroll.endBySize(curPageData.length, totalPage);
					} else {
						this.mescroll.endErr();
					}
				})
				.catch(err => {
					this.mescroll.endErr();
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
	height: 100%;
}
.bg_img {
	width: 106upx;
	height: 106upx;
	margin-right: 20upx;
	background-color: #f7f7f7;
	image {
		width: 100%;
		height: 100%;
	}
}
.box_sort {
	width: 97upx;
	height: 90upx;
	border: 1px solid #cccccc;
	text-align: center;
	line-height: 45upx;
	view {
		font-size: 12px;
	}
}
.active {
	color: #1b90ff;
	border-bottom: 2px solid #1b90ff;
}
.btn_top {
	padding: 2upx 15upx;
	background: #1b90ff;
	border-radius: 8upx;
	color: #ffffff;
	font-size: 12px;
	text-align: center;
}
.returnBox {
	min-width: 97rpx;
	height: 87rpx;
	background: rgba(255, 255, 255, 1);
	border: 1px solid #cccccc;
	opacity: 1;
	border-radius: 4rpx;
	box-sizing: border-box;
	.top_blue {
		height: 50%;
		background-color: #50aeff;
		margin-top: -3upx;
		color: #ffffff;
		width: 100%;
	}
}
.left {
	background-color: #ffffff;
	color: #1b90ff;
	border: 1px solid #1b90ff;
}
.cu-list {
	/* #ifdef MP-WEIXIN */
	top: 100upx;
	/* #endif */
}
.cu-list.menu {
	padding: 0 30upx;
}
.cu-list.menu > .cu-item .content > uni-image {
	width: 110rpx;
	height: 110rpx;
	border-radius: 50%;
}
</style>
