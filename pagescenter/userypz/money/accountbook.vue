<template>
	<view style="">
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" >
			<view class="date_line uni-list">
				<view class="uni-list-cell coco" style="">
					<view class="uni-list-cell-left" style="padding-left: 10upx;">
						{{i18n[1]}}
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" fields="month" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="cu-list menu">
				<view class="cu-item cu_items" v-for="(item,index) in money_list" :key="index">
					<view class="contents">
						<text class="APP_pay">{{ item.change_type }}</text>
						<text class="APP_no">{{i18n[2]}}{{ item.order_no }}</text>
						<text class="APP_time">{{ set_timer( item.create_time )  }}</text>
					</view>
					<view class="con_model text-osd">
						{{ item.change_money }}
					</view>
				</view>
			</view>
		</mescroll-uni>
		
		<!-- <view class="footer">
			本月累计消费: <span class="text-price">0</span>
		</view> -->
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
				money_list:[],
				mescroll: null, //实例
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 5 // 每页数据的数量,默认10 （这是在后台配置的）
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					},
					textNoMore:'没有更多了'
				},
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				}
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			i18n () {
				return this.$t('accountbook')
			} 
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('accountbook')[0]
			})
		},
		methods: {
			set_timer(str){
				return this.$Common.formatTime(str)
			},
			bindDateChange: function(e) {
				this.date = e.target.value;
				this.downCallback();
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				// day = day > 9 ? day : '0' + day;
				return `${year}-${month}`;
			},
			initCallback(mescroll) {
				//初始化mescroll回调
				this.mescroll = mescroll;
			},

			upCallback(mescroll) {
				//上拉加载
				let page = mescroll.num; // 页码, 默认从1开始
				let list_rows = mescroll.size; // 页长, 默认每页10条
				this.$Request.post(this.$api.money.get_money_detail, {
					date: this.date,
					page: page
				}).then(res => {
					console.log(res, '获取的列表');
					if (!res) { //从第几条开始
						return false;
					}
					if (page == 1) this.money_list = [];
					this.money_list = this.money_list.concat(res.data.data);
					mescroll.endBySize(res.data.data.length, res.data.total);
				});
			},
			downCallback(mescroll) {
				//下拉刷新
				this.mescroll.resetUpScroll();
			},
		}
	}
</script>

<style scoped lang="scss">
	.date_line{
		background: $ben-text-color-inverse;
		border-bottom: 1rpx solid $ben-border-color;
	}
	.coco {
		display: flex;
		justify-content: space-between;
		line-height: 100upx;
	}

	.contents {
		display: flex;
		flex-direction: column;
		width: 70% !important;
	}

	.APP_pay {
		font-size: $ben-font-size-lg;
		color: $ben-text-color;
		padding: 0 0 24rpx;
		line-height: 45rpx;
	}
	.APP_no{
		font-size: $ben-font-size-sm;
		color: $ben-text-color;
		padding: 0 0 16rpx;
		line-height: 33rpx;
	}
	.APP_time {
		font-size: $ben-font-size-sm;
		color: $ben-text-color-grey;
		line-height: 33rpx;
	}

	.cu_items {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.con_model {
		width: 30%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.footer {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background: rgb(253, 238, 231);
		text-align: center;
		font-size: 26upx;
		color: orange;
		font-weight: 600;
		height: 100upx;
		line-height: 100upx;
	}
	.date_line{
		position: fixed;
		top: 0;
		/* #ifdef H5 */
		top: 90rpx;
		/* #endif */
		left: 0;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 20rpx;
		z-index: 10;
	}
	.cu-list.menu>.cu-item{
		padding-top: 32rpx;
		padding-bottom: 32rpx;
	}
</style>
