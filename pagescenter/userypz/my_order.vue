<template>
	<view>
		<!--导航 -->
		<view class="bg-white nav fixed" >
			<scroll-view scroll-x="true" scroll-with-animation :scroll-left="scrollLeft" style="height: 100%;display: flex;align-items: center;">
				<view class="flex text-center align-center justify-around">
					<block v-for="(item, index) in statusList" :key="index">
						<view class="flex align-center">
							<view class="cu-item  text_999 f30" :class="cur == index ? 'select' : ''" @tap="selectStatus(item, index)">{{item.name}}</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 列表 -->
		<mescroll-uni ref="mescrollRef" top="100upx" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" :fixed="true">
			<view class="flex column between ptb10 plr15 card brb_e  mb10" v-for="(item, index) in order_list" :key="index" @tap="navTo(item,index)">
				<view class="flex " v-if="order_list!=''">
					<!-- logo -->
					<view class="bg-gray job_img mr10" style="flex-shrink: 0;">
						<image :src="item.img_url || '/status/images/logo.png'" mode="aspectFill" class="mr10"></image>
					</view>
					<view class="" style="width: 83%;">
						<view class="flex justify-between ">
							<text class="gray3 mb5 bold f32 overflow-one" style="font-weight: bold;">{{ item.title || '无' }}</text>
							<view class="f28 flex_shrink" style="color: #F77858;">{{item.is_status_name||''}}</view>
							<!-- <view class="f28 flex_shrink" style="color: #F77858;" v-if="item.status==1">进行中</view>
							<view class="f28 flex_shrink" style="color: #F77858;" v-if="item.status==2">已取消</view>
							<view class="f28 flex_shrink" style="color: #F77858;" v-if="item.status==3">已完成</view> -->
						</view>
						<!-- 工资 -->
						<view class="  ">
							<view class="  f24  text_1b9" >劳务报酬{{item.commission}}元</view>
							<view class="  f24 text_999 mtb5 " >{{item.type_name}}</view>
							<view class="  f24  text_999 ewrap text_line1" >{{item.content}}</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		components:{
		},
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				nowtime:'',
				CustomBar:this.CustomBar,
				IMG_URL:this.IMG_URL,
				scrollLeft: 0,
				cur: 0, // 当前选中订单分类
				// -5=全部0待付款5=已揽件6消毒中7配送中3待评价
				statusList: [{
						id: 0,
						name: '全部',
						value:'all'
					},
					{
						id: 1,
						name: '待确认',
						value:'unconfirmed'
					},
					{
						id: 2,
						name: '待完成',
						value:'uncompleted'
					},
					{
						id: 3,
						name: '已完成',
						value:'completed'
					}
				],
				status:'all',//all：所有 unconfirmed:待确认 uncompleted：待完成 completed:已完成 uncancelled:待取消
				order_list:[{status:1}],//订单数据
				downOption:{
					
				},
				upOption:{
					
				},
				order_id:''
			}
		},
		filters:{
			downTime: function(value) {
				return new Date().getTime() + value*1000
			}
		},
		onLoad(e) {
			if (e.tab) {
				this.cur = e.tab;
				this.scrollLeft = (e.tab - 1) * 60
				this.status=e.status
			}
			uni.showLoading({			})
			uni.$on('update_status',()=>{
				this.mescroll && this.downCallback()
			})
		},
		methods: {
			// 跳转详情
			navTo(item){
				// if(item.is_status_name=='进行中'){
					uni.navigateTo({
						url:'order_detail?pageType=order&id='+item.dask_id+'&uid='+item.uid
					})
					// return
				// }
			},
			// 获取数据
			upCallback(mescroll) {
				var pageNum = mescroll.num;
				var pageSize = mescroll.size;
				let data = {
					page:pageNum,
					limit: 10,
					status:this.status
				};
				this.$Request
					.post(this.$api.user.my_orderList, data)
					.then(res => {
						// console.log('订单数据', res.data.data);
						uni.hideLoading()
						if (res.code == 1) {
							let totalSize = res.data.total;
							let curPageData = res.data.data;
							if (mescroll.num == 1) this.order_list = [];
							this.order_list = this.order_list.concat(curPageData);
							mescroll.endBySize(curPageData.length, totalSize);
							// console.log(this.order_list);
						} else {
							mescroll.endErr();
						}
					})
					.catch(err => {
						console.log('err: ' + JSON.stringify(err));
						if (pageNum == 1) {
							mescroll.endBySize(0, 0);
						} else {
							mescroll.endErr();
						}
					});
			},
			// 选择订单状态
			selectStatus(item, index) {
				if (this.cur === index) {
					return;
				};
				this.scrollLeft = (index - 1) * 60
				this.cur = index;
				this.status=item.value
				this.mescroll && this.downCallback()
			}
		}
	}
</script>

<style lang="scss">
	.min-countdown{
		font-size: 12px ;
		color: #f00;
	}
	// .nav{
	// 	padding: 20rpx 0;
	// }
	.nav .cu-item{
		height: 80rpx;
		line-height: 80rpx;
		
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
	.mt200 {
		margin-top: 200rpx !important;
	}

	.mt100 {
		margin-top: 100rpx !important;
	}

	.buyer-box {
		height: 100rpx;
		// border-bottom: 1px solid #EEEEEE;

		.head-img {
			width: 64rpx;
			height: 64rpx;
			display: block;
			border-radius: 50%;
		}
	}

	.nav-tag {
		position: relative;
	}

	.select {
		color: #1B90FF;
		// height: 50rpx;
		// line-height: 50rpx;
		padding: 0 20rpx 0upx;
		position: relative;
		&::after{
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

	.tag {
		position: absolute;
		top: 12rpx;
		right: -8rpx;
		width: 32rpx;
		height: 32rpx;
		border-radius: 32rpx 32rpx 32rpx 0;
		background: #F64948;
		font-size: 12px;
		color: #FFFFFF;
	}

	.list-item {
		padding: 20rpx;
		background: #FFFFFF;
		margin-top: 20rpx;

		.handle-box {
			border-top: 1px solid #EEEEEE;
			height: 100rpx;
		}

	}

	.goods-img {
		width: 200rpx;
		height: 200rpx;
	}

	.goods-info {
		height: 200rpx;
	}
</style>
