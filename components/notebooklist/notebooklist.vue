<template>
	<!-- 记事本 -->
	<view class="brt_e" style="height: 100%;">
		<view class="pb20 pt20" v-if="newsList != ''" style="padding-top: 30upx;">
			<view
				class="mb20"
				v-for="(item, index) in newsList"
				:key="index"
				@tap="navTo('/pagesHome/index/convenience_detail?conven=1&id=' + item.id + '&type=20190118&category_id=' + category_id)">
				<view class="" v-if="(item.img_url && item.img_url.length > 1) || !item.img_url">
					<!-- <view class="title overflow-two">{{ item.title }}</view> -->
					<view class="title overflow-two flex justify-start align-start">
						<text style="width: 80%; flex: 1;">
							<text>{{ item.title }}</text>
						</text>
						<text class="lg cuIcon-close mr10 text-blue" style="margin-top: 6upx;" @tap.stop="delIt(item.id)"></text>
						<text class="lg cuIcon-edit text-blue" style="margin-top: 6upx;" @tap.stop="editIt(item)"></text>
					</view>
					<view class="flex  align-center mb10" v-if="item.img_url != ''" :class="item.img_url.length < 4 ? 'justify-start' : 'justify-between'" style="flex-wrap: wrap;">
						<image :src="itm" class="bg-gray" style="flex: 0 0 24%; height: 180upx;: 16upx; margin-top: 16upx;" :style="item.img_url.length < 4 ? 'margin-right: 1.33333%;' : ''" v-for="(itm, index) in item.img_url" :key="index"></image>
					</view>
					<view class="flex justify-between align-center">
						<text class="text-sm text-gray">{{ item.update_time || '' }}</text>
						<view class="btn_btn" v-if="item.is_top_name">{{ item.is_top_name || '' }}</view>
					</view>
				</view>
				<view class="" v-if="item.img_url && item.img_url.length < 2">
					<view class="flex justify-start">
						<view class="mr20" style="width: 60%; flex: 1;">
							<!-- <view class="title overflow-two">{{ item.title || '' }}</view> -->
							<view class="title overflow-two flex justify-start align-start">
								<text style="width: 80%; flex: 1;">
									<text>{{ item.title ||'' }}</text>
								</text>
								<text class="lg cuIcon-close mr10 text-blue" style="margin-top: 6upx;" @tap.stop="delIt(item.id)"></text>
								<text class="lg cuIcon-edit text-blue" style="margin-top: 6upx;" @tap.stop="editIt(item)"></text>
							</view>
							<view class="flex justify-between align-center">
								<text class="text-sm text-gray">{{ item.update_time || '' }}</text>
								<view class="btn_btn" v-if="item.is_top_name">{{ item.is_top_name || '' }}</view>
							</view>
						</view>
						<view class="bg-gray picitem" style="margin-right: 0;" v-if="item.img_url != ''"><image :src="item.img_url[0]" mode="aspectFill"></image></view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" icon-type="iconType" :load-text="loadText" />
		</view>
		<u-empty text="暂无相关内容" mode="list" v-if="newsList == ''" style="padding-top: 100upx;"></u-empty>
		<!-- 回到顶部按钮 -->
		<view class="to_top_wrap" v-if="showtop"><image :src="IMG_URL + 'static/miniwechat/index/to_top.png'" mode="" class="top_img" @tap="back_top"></image></view>
	</view>
</template>
<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			iconType: 'flower',
			page: 1,
			showtop: false, //是否展示返回顶按钮
			newsList: [], //列表
			loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '实在没有了'
			},
			IMG_URL: this.IMG_URL,
			last_page: '', //总页数
			status: 'loadmore', //加载状态
			keyword: '', //关键词
			category_id: 12,// 栏目id
		};
	},
	onReady() {
		this.get_list();
		uni.$on("reback", e => {
			console.error(e);
			this.get_list();
		})
		uni.$on("to_bottom", e => {
			if (this.page >= this.last_page) return;
			this.status = 'loading';
			this.page++;
				
			this.get_list();
		})
	},
	destroyed() {
		uni.$off('to_bottom');
		uni.$off("reback");
	},
	methods: {
		// 获取记事列表
		get_list() {
			let that = this;
			this.$Request
				.post(this.$api.operation.get_art_list, {
					category_id: this.category_id, // 记事本
					page: this.page,
					city_id: '', //区id
					pid: '', //省、市id
					keword: this.keyword || '' //搜索关键字
				})
				.then(res => {
					// console.error(res, '加载记事本列表');
					uni.hideLoading();
					if (res.code == 1) {
						// uni.hideLoading()
						if (that.page == 1) that.newsList = [];
						that.newsList = that.newsList.concat(res.data.data); //追加新数据
						// console.log(that.newsList);
						that.last_page = res.data.last_page;
						that.status = res.data.last_page <= that.page ? 'nomore' : 'loading';
						setTimeout(() => {
							that.$emit('getData', 111);
						}, 100);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
		},
		navTo(page) {
			//跳转详情，判断是否登录
			if (this.isopen == false) {
				return;
			}
			this.isopen = false;
			setTimeout(() => {
				this.isopen = true;
			}, 1500);
			uni.navigateTo({
				url: page
			});
		},
		delIt(id) {
			let apiuri = this.$api.user.user_info_delete;
			let that = this;
			
			// 删除用户发布信息/黑名单
			this.$Request.post(apiuri, {id:id}).then(res => {
				this.$Common.toast(res.msg);
				if (res.code == 1) {
					that.get_list();
				}
			});
		},
		editIt(item) {
			console.error(item);
			uni.navigateTo({
				url: '/pagesworktime/recordnotebook?id=' + item.id
			})
		},
	}
};
</script>
<style lang="scss">
.title {
	font-size: 32upx;
	font-weight: bold;
	line-height: 1.2;
	letter-spacing: 1;
	margin-bottom: 10upx;
	overflow: hidden;
	text-overflow: ellipsis;
	line-clamp: 2;
}

.picitem {
	width: 215upx;
	height: 152upx;
	border-radius: 20upx;
	overflow: hidden;
	margin-right: 20upx;

	image {
		width: 100%;
		height: 100%;
	}
}

.btn_btn {
	width: 77upx;
	height: 32upx;
	background: #50aeff;
	border: 1px solid #50aeff;
	color: #ffffff;
	text-align: center;
	line-height: 32upx;
	font-size: 11px;
}

.picitem:nth-child(3) {
	margin-right: 0;
}

.inputBox {
	width: 100%;
	height: 58rpx;
	border-radius: 34rpx;
	border: 1px solid #ddd;
}

.top_img {
	position: fixed;
	right: 40rpx;
	bottom: 140rpx;
	width: 88rpx;
	height: 88rpx;
}

.fixed {
	position: fixed;
	top: 0;
	/* #ifdef H5 */
	top: 100upx;
	/* #endif */
	width: 100%;
	left: 0;
	right: 0;
	margin: auto;
	z-index: 100;
	padding: 20upx 30upx;
}

.type_item {
	padding: 6upx 20upx;
	background: rgba(255, 255, 255, 1);
	border: 1px solid rgba(230, 230, 230, 1);
	border-radius: 4rpx;
	margin-right: 20upx;
	margin-bottom: 20upx;
}
</style>
