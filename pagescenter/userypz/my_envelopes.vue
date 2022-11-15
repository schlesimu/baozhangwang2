<!--应聘者 我的关注 -->
<template>
	<view class="">
		
		<mescroll-body ref="mescrollRef"  @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" :fixed="true">
			
			<view class="flex column between pt10 plr15 card   mb10" v-for="(item, index) in datalist" :key="index" 
			 @tap="navTo(item,index)">
				<view class="flex brb_c pb10">
					<view class="" style="width: 100%;">
						<view class="flex  ">
							<text class="gray3 mb5 bold f32 overflow-one" style="font-weight: bold;">{{ item.company_name || '无' }}</text>

						</view>
						<!--  -->
						<view class="flex justify-between align-center">
							<text class="text-sm ">报名职位：{{item.job_position_name}}</text>
							<view class="  mb5 text-right f24" >{{item.red_envelope_type_name}}</view>
						</view>
						<view class="flex  align-center justify-between">
							<view class=" text-sm ">
								<text class="mr10 mtb5">{{item.red_envelope_theme}}</text>
							</view>
							<view class="">
								<text class="f24 top_blue tc theme_blue">{{item.status_name}}</text>
							</view>
						</view>
						<view class=" flex align-center justify-between">
							<text class=" text-sm text_999">{{item.creare_time}}</text>
							<view class="  mb5 text-right f24" >红包金额：{{item.red_envelope_money}}元</view>
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
				current: 0, //选择分类
				collect_sort: [

					{
						name: '公司',
						id: 0
					},
					{
						name: '职位',
						id: 1
					},
					{
						name: '任务',
						id: 2
					},
				],
				job_list: [], //网约工
				latitude: 0,
				longitude: 0,
				isopen: true, //跳转页面
				datalist: [],
				type: 1,
				shopdata: []
			};
		},
		onLoad() {
			// this.$Common.getLocation(res => {
			// 	this.latitude = res.latitude;
			// 	this.longitude = res.longitude;
			// 	this.$nextTick(() => {
			// 		this.mescroll && this.mescroll.resetUpScroll();
			// 	});
			// });
			this.mescroll && this.mescroll.resetUpScroll();
			uni.$on('follow', data => {
				console.log(data.msg, '监听收藏');
				if (data) {
					this.mescroll && this.mescroll.resetUpScroll();
				}
			});
			uni.showLoading({			})
		},
		onUnload() {
			uni.$off('follow');
		},
		methods: {
			/*上拉加载的回调*/
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.$Request
					.post(this.$api.user.my_red_env_list, {
						page: pageNum,
						limit: 10
					})
					.then(res => {
						uni.hideLoading()
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
				if (this.current == index) {
					return;
				};
				this.current = index;
				this.mescroll && this.downCallback()
			},
			navTo(item,index) {
				//跳到简历详情
				if (this.isopen == false) {
					return;
				};
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true
				}, 3000);
			uni.navigateTo({
				url: 'share_help_list?red_envelope_aid=' + item.delivery_id+'&job_title='+item.job_position_name+'&salary_money='+item.job_position_price+'&jobImage='+item.job_position_image
			})
			},

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
