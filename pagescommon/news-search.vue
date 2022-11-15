<template>
	<!-- 搜索 -->
	<view class="search">
		<!-- 头部 -->
		<view class="cu-custom" :style="[{ height: CustomBar + 'px' }]">
			<view class="cu-bar  search" :style="style" style="color: #333;">
				<view class="action" @tap="back"><text class="cuIcon-back text-black"></text></view>
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @confirm="search_input" v-model="search_txt" :adjust-position="false" type="text"
						placeholder="搜索" confirm-type="search" />
				</view>
				<view @tap="search_input" class="action text-black"><text>搜索</text></view>
			</view>
		</view>
		<!-- 搜索历史 -->
		<block v-if="search_list && search_list.length > 0">
			<view class="padding flex justify-between align-center">
				<view class="text-lg">历史搜索</view>
				<view @tap="clear_search"><text style="font-size: 40rpx;" class="text-gray cuIcon-delete"></text></view>
			</view>
			<!-- 历史记录列表 -->
			<view class="btn_list padding flex flex-wrap">
				<view @tap="search_input(1, item)" class="cu-btn round ewrap" v-for="(item, index) in search_list"
					:key="index">{{ item }}</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				search_txt: '', //搜索的文本
				search_list: [], //搜索列表
				seachinfo: '', //1 搜索职位列表 2 搜索屏蔽公司
				stationType: '', //搜索的职位类型
				activeTab: '', //1：网上兼职 2：本地兼职
				city: '', //城市
				cityid: '', //城市id
			};
		},
		computed: {
			style() {
				//设置导航兼容
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style;
			}
		},
		onShow() {
			this.search_list = uni.getStorageSync('search_list') || [];
		},
		onLoad: function(options) {
			console.error(options);
			this.stationType = options.stationType
			this.activeTab = options.activeTab
			this.city = options.city
			this.cityid = options.cityid || ''
		},
		onUnload() {},
		methods: {
			clear_search() {
				//清除历史记录
				this.$Common.confirm('确定删除全部历史记录？', () => {
					uni.removeStorageSync('search_list');
					this.search_list = [];

				});
			},
			search_input(e, txt) {
				// console.log(this.stationType,'======');
				//去搜索
				if (txt) {
					//点击历史记录去搜索
					// 去搜索页面
					uni.navigateTo({
						url: 'search_list?keyword=' + txt + '&stationType=' + this.stationType + '&activeTab=' +
							this.activeTab + '&city=' + this.city + '&cityid=' + this.cityid
					});
					return false;
				}
				if (!this.search_txt || this.search_txt == '') {
					this.$Common.toast('请输入搜索内容');
					return false;
				}
				if (/^\s*(\S+)\s*$/.test(this.search_txt)) {
					this.search_txt = RegExp.$1
				} else {
					this.$Common.toast('请不要输入空格');
					return false;
				}
				// 去搜索页面
				uni.navigateTo({
					url: 'search_list?keyword=' + this.search_txt + '&stationType=' + this.stationType +
						'&activeTab=' + this.activeTab + '&city=' + this.city + '&cityid=' + this.cityid
				});
				this.search_txt = '';
			},
			back() {
				uni.navigateBack({})
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.btn_list {
		.cu-btn {
			margin-bottom: 20rpx;
			margin-left: 20rpx;
			height: 100%;
			padding: 20upx 30upx;
			text-align: left;

			&+.cu-btn {}
		}
	}
</style>
