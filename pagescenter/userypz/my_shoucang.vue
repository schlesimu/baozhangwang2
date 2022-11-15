<!--应聘者 我的关注 -->
<template>
	<view class="">
		<!-- #ifdef H5 -->
		<view class="bg-white nav ">
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<view class="bg-white nav fixed">
				<!-- #endif -->
				<view class="flex text-center align-center justify-around">
					<block v-for="(item, index) in collect_sort" :key="index">
						<view class="flex align-center">
							<view class="cu-item  text_999 f30" :class="current == item.id ? 'select' : ''" @tap="selectStatus(item, index)">{{item.name}}</view>
						</view>
					</block>
				</view>
			</view>
			<mescroll-body ref="mescrollRef" top="100" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			 :up="upOption" :fixed="true">
				<view class="cu-list menu " v-if="current==1">
					<view class="cu-item arrow " v-for="(item, index) in datalist" :key="index" @tap='godetail(item.collect_id)'>
						<view class="flex justify-start padding-tb " style="width: 100%;border-bottom: 1px solid #E5E5E5;">
							<view class="bg-gray margin-right-sm" style="width: 106upx;height:106upx;flex-shrink: 0;">
								<image :src="item.image ? item.image : IMG_URL + 'static/miniwechat/head_null.png'" mode="aspectFill" style="width: 100%;height: 100%;"></image>
								<!-- <image src="IMG_URL+'static/miniwechat/user_null.png'" mode="aspectFill" style="width: 100%;height: 100%;"></image> -->
							</view>
							<view class=" pr20">
								<view class="text-black text-bold mb5 text_line1" style="font-size: 32upx;">{{item.company_name}}</view>
								<view class="flex justify-start  adress">
									<image :src="IMG_URL+'static/miniwechat/position.png'" mode="aspectFill"></image>
									<text>{{item.company_address}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex column between ptb10 plr15 card brb_c  mb10" v-if="current==2" v-for="(item, index) in datalist"
				 :key="index" @tap="navTo(item,index)">
					<view class="flex ">
						<!-- logo -->
						<view class="bg-gray job_img mr10" style="flex-shrink: 0;">
							<image :src="item.image || '/static/imges/logo.png'" mode="aspectFill" class="mr10"></image>
						</view>
						<view class="" style="width: 83%;">
							<view class="flex justify-between ">
								<text class="gray3 mb5 bold f32 overflow-one" style="font-weight: bold;">{{ item.name || '无' }}</text>
								<view class="normal_red bold mb5 text-right" style="flex-shrink: 0;">{{ item.min_salary || 0 }}~{{ item.max_salary || 0 }}元/
									<text>月</text> </view>
							</view>
							<!-- 工资 -->
							<view class="flex  between">
								<view class="flex column between" style="height: 90%;">
									<text class="text-sm gray9">{{ item.company_name || '无' }}</text>
									<!-- 	<view class="flex alcenter text-sm gray9">
									<text class="mr10 mtb5">{{ item.distance || 0 }}km</text>
									<text class="text_line1">{{ item.city || item.address }}</text>
								</view> -->
									<view class=" flex align-center justify-between">
										<text class="theme_blue text-sm" v-if="voucher==0">已向平台支付保证金{{ item.money || 0 }}元</text>
									</view>


								</view>
								<view class="flex column align-end">
									<view class="returnBox flex column around  alcenter" v-if="item.fan_price!=''">
										<text class="f28 top_blue tc">{{ item.fan_type || '无' }}</text>
										<text class="f28 normal_red ellipsis tc bold plr5" style="width: 100%;">{{ item.fan_price || 0 }}元</text>
									</view>
								</view>
							</view>
							<!-- <view class=" flex align-center justify-between">
							<text class="theme_blue text-sm">已向平台支付工资保证金{{ item.money || 0 }}元</text>
						</view> -->
							<view class="flex between " style="">
								<view class="flex alcenter" style="flex: 1;">
									<view class="">
										<text class="cu-tag text-white bg-theme bold text-sm label_item radius6" v-for="(i, v) in item.welfare" :key="i">{{ i }}</text>
									</view>
								</view>
								<view class="tc ellipsis" style="">
									<text class="text-sm gray3  tc mt10">已报名 {{ item.apply_numbers || 0 }}人</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 临时工 网络兼职 -->
				<view class="flex column between pt10 plr15 card   mb10" v-for="(item, index) in datalist" :key="index" v-if="current==3||current==4"
				 @tap="navToPart(item,index)">
					<view class="flex brb_c pb10">
						<!-- logo -->
						<view class="bg-gray job_img mr10" style="flex-shrink: 0;">
							<image :src="item.image || '/static/images/logo.png'" mode="aspectFill" class="mr10"></image>
						</view>
						<view class="" style="width: 83%;">
							<view class="flex justify-between ">
								<text class="gray3 mb5 bold f32 overflow-one" style="font-weight: bold;">{{ item.title || '无' }}</text>

								<view class=" bold mb5 text-right f28" style="flex-shrink: 0;color: #F77858;">劳务报酬{{item.commission}}元</view>
							</view>
							<!--  -->
							<view class="flex ">
								<text class="text-sm gray9">工作时长{{ item.service_time || '无' }}</text>
							</view>
							<view class="flex  align-center justify-between" v-if="current==3||item.type==2">
								<view class=" text-sm gray9">
									<text class="mr10 mtb5">{{ item.distance || 0 }}km</text>
								</view>
							</view>
							<view class=" flex align-center justify-between">
								<text class="f24 top_blue tc gray9">{{ item.create_time || '无' }}</text>
								<view class="">
									<text class="theme_blue text-sm" v-if="voucher==0">已向平台支付佣金</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				current: 1, //选择分类
				collect_sort: [
					{
						name: '公司',
						id: 1
					},
					{
						name: '职位',
						id: 2
					},
					{
						name: '临时工',
						id: 3
					},{
						name: '网络兼职',
						id: 4
					},
				],
				job_list: [], //网约工
				IMG_URL:this.IMG_URL,
				latitude: 0,
				longitude: 0,
				isopen: true, //跳转页面
				datalist: [],
				type: 1,
				shopdata: [],
				voucher: '', //是否开启支付
			};
		},
		onLoad() {
			this.mescroll && this.mescroll.resetUpScroll();
			uni.$on('follow', data => {
				console.log('监听收藏');
				this.mescroll && this.mescroll.resetUpScroll();
			});
			uni.$on('myCollect', data => {
				console.log('监听从我的收藏进详情页的收藏');
				this.mescroll && this.mescroll.resetUpScroll();
			});
			this.get_plant_type()
			this.$Common.getLocation(e => {
				this.latitude = e.latitude
				this.longitude = e.longitude
				// let lat = [e.longitude, e.latitude];
				// 	this.$Request
				// 		.post(this.$api.msg.cityPosition, {
				// 			user_id: uni.getStorageSync('USERINFO').id||'',
				// 			// #ifdef APP-PLUS
				// 			client_id: plus.device.uuid,
				// 			// #endif
				// 			cid:  '',
				// 			lat: lat
				// 		})
				// 		.then(res => {
				// 			if (res.code == 1) {
				// 				this.longitude = res.data.lng;
				// 				this.latitude = res.data.lat;
							
				// 			} else {
				// 				that.$Common.toast(res.msg);
				// 			}
				// 		})
				// 		.catch(err => {
				// 			that.$Common.toast('网络错误，请稍后重试');
				// 		});
			})
		},
		onUnload() {
			uni.$off('follow');
			uni.$off('myCollect');
		},
		methods: {
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.$Request
					.post(this.$api.user.get_collection_list, {
						type: this.current,
						longitude: this.longitude,
						latitude: this.latitude,
						page: pageNum,
						list_rows: 10
					})
					.then(res => {
						if (res.code == 1) {
							let curPageData = res.data.data;
							console.log(res.data);
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = res.data.total;
							//设置列表数据
							if (mescroll.num == 1) this.datalist = []; //如果是第一页需手动置空列表
							this.datalist = this.datalist.concat(curPageData); //追加新数据
							mescroll.endBySize(curPageData.length, totalPage);
						} else {
							this.mescroll.endErr();
						}
					})
					.catch(err => {
						this.mescroll.endErr();
					});
			},
			// 选择分类
			selectStatus(item, index) {
				if (this.current == item.id) {
					return;
				};
				this.current = item.id;
				this.mescroll && this.downCallback()
			},
			godetail(aid) {
				//跳到公司详情
				if (this.isopen == false) {
					return;
				};
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true
				}, 3000);
				this.$Common.getLocation(e => {
					//获取经纬度
					uni.navigateTo({
						url: '../../pagesHome/index/job_detail?heart=true&id=' + aid+ '&longitude=' + e.longitude + '&latitude=' + e.latitude
					});
					
				});
				
			},
			navTo(item) { //职位详情
				//跳转详情，判断是否登录
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				const userInfo = uni.getStorageSync('USERINFO').user_token;
				console.log(userInfo);
				if (!userInfo) {
					this.$Common.toast('您还没有登录，请先登录');
					setTimeout(() => {
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '/pagessignup/login'
						});
						// #endif

						// #ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pagessignup/wechat/wxlog'
						});
						// #endif
					}, 300);
				} else {
					this.$Common.getLocation(e => {
						//获取经纬度
						uni.navigateTo({
							url: '/pagesHome/index/plant_detail?id=' + item.aid+ '&longitude=' + e.longitude + '&latitude=' + e.latitude
						});						
					});
					
				}
			},
			navToPart(item, index) { //网约工详情
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: '/pagesHome/part_sort?id=' + item.aid + '&user_id=' + item.user_id+'&type='+this.current,
				})
			}

		}
	};
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.adress {
		color: #999999;
		position: relative;
		font-size: 12px;

		image {
			width: 30upx;
			height: 26upx;
			margin-right: 10upx;
			margin-top: 5upx;
		}
	}

	.job_img {
		width: 106rpx;
		height: 106rpx;
		border-radius: 8rpx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.returnBox {
		min-width: 97rpx;
		height: 87rpx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid #cccccc;
		opacity: 1;
		overflow: hidden;
		border-radius: 4rpx;
		box-sizing: border-box;

		.top_blue {
			height: 45upx;
			background-color: #50aeff;
			line-height: 45upx;
			margin-top: -4upx;
			color: #ffffff;
			width: 100%;
		}
	}

	.select {
		color: #1B90FF;
		// height: 50rpx;
		// line-height: 50rpx;
		padding: 0 20rpx 0upx;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			width: 54upx;
			height: 6upx;
			z-index: 9999;
			background-color: #1B90FF;
		}
	}

	.nav .cu-item.cur {
		border: 0;
		position: relative;
	}

	.cu-tag {
		margin-left: 0;
		margin-right: 15upx;
		margin-bottom: 10upx;
	}

	.nav .cu-item.cur::before {
		content: '';
		position: absolute;
		width: 24rpx;
		height: 4rpx;
		background-color: #338fff;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 0;
	}

	.cu-list.menu>.cu-item {
		// padding-right: 0;
	}
</style>
