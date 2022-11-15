<template>
	<view>
		<view style="margin-top: 300upx;" v-if="newsList.length==0">
			<u-empty text="暂无相关内容" mode="list"></u-empty>
		</view>
		<view class="pb20 pl20 pr20" style="margin-top: -20upx;" v-if="newsList.length > 0">
			<view class="mt20" v-for="(item, index) in newsList" :key="index"
				@tap="navTo(uri + '?conven=1&id=' + item.id+'&type='+type + '&category_id='+item.category_id)">
				<view class="" v-show="( item.img_url != '' &&item.img_url.length > 1)|| item.img_url==''">
					<view class="title overflow-two flex justify-start align-start">
						<text style="width: 80%; flex: 1;">
							<!-- <text class="bold" style="color: #50aeff;">[{{ item.category_name || item.name }}]</text> -->
							<text><text style="font-weight: 700;" :style="item.category_id == 13 ? 'color: #007AFF;' : 'color: #e43d33;'" v-if="type == 1">[{{item.category_id == 13 ? '招聘信息' : '求职信息'}}]</text>{{ item.title }}</text>
						</text>
						<text class="lg cuIcon-close mr10 text-blue" style="margin-top: 6upx;" @tap.stop="delIt(item.id)"></text>
						<text class="lg cuIcon-edit text-blue" style="margin-top: 6upx;" @tap.stop="editIt(item)"></text>
					</view>
					<view class="flex  align-center  mb10" v-if="item.img_url != ''"
						:class="item.img_url.length < 3 ? 'justify-start' : 'justify-between'">
						<view class="bg-gray picitem mr10" v-for="(itm, index) in item.img_url" :key="index">
							<image :src="itm" mode="aspectFill"></image>
						</view>
					</view>
					<view class="flex justify-between align-center">
						<text class="text-sm text-gray" v-if="type != 1">{{ item.update_time||'' }}</text>
						<view class="btn_btn" v-if="item.is_top_name">{{item.is_top_name||''}}</view>
					</view>
				</view>
				<view class="" v-if="item.img_url != '' && item.img_url.length < 2">
					<view class="flex justify-start">
						<view class="mr20" style="width: 60%; flex: 1;">
							<view class="title overflow-two flex justify-start align-start">
								<text style="width: 80%; flex: 1;">
									<!-- <text class="bold" style="color: #50aeff;">[{{ item.category_name || item.name }}]</text> -->
									<text><text style="font-weight: 700;" :style="item.category_id == 13 ? 'color: #007AFF;' : 'color: #e43d33;'" v-if="type == 1">[{{item.category_id == 13 ? '招聘信息' : '求职信息'}}]</text>{{ item.title ||'' }}</text>
								</text>
								<text class="lg cuIcon-close mr10 text-blue" style="margin-top: 6upx;" @tap.stop="delIt(item.id)"></text>
								<text class="lg cuIcon-edit text-blue" style="margin-top: 6upx;" @tap.stop="editIt(item)"></text>
							</view>
							<view class="flex justify-between align-center">
								<text class="text-sm text-gray" v-if="type != 1">{{ item.update_time||'' }}</text>
								<view class="btn_btn" v-if="item.is_top_name">{{item.is_top_name||''}}</view>
							</view>
						</view>
						<view class="bg-gray picitem" style="margin-right: 0;" v-if="item.img_url != ''">
							<image :src="item.img_url[0]" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" icon-type="iconType" :load-text="loadText" />
		</view>
		
		<!-- <view style="width: 100%; height: 128upx; display: flex; justify-content: center; align-items: center; position: fixed; left: 0; bottom: 50upx; z-index: 20190118;">
			<view style="width: 128upx; height: 128upx; background-color: #007AFF; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;" @click="toAdd">
				<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
				<text style="color: #FFFFFF; font-size: 26upx;">发布</text>
			</view>
		</view> -->
		
		<view style="width: 60%; height: 128upx; display: flex; justify-content: space-around; align-items: center; position: fixed; left: 20%; bottom: 50upx; z-index: 20190118;" v-if="['1','3'].indexOf(type)>-1">
			<view style="width: 128upx; height: 128upx; background-color: #007AFF; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;" @click="toAdd(1)">
				<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
				<text style="color: #FFFFFF; font-size: 26upx;" v-if="type == 1">招聘零工</text>
				<text style="color: #FFFFFF; font-size: 26upx;" v-if="type != 1">发布</text>
			</view>
			<view style="width: 128upx; height: 128upx; background-color: #e43d33; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;" @click="toAdd(2)" v-if="type == 1">
				<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
				<text style="color: #FFFFFF; font-size: 26upx;" v-if="type == 1">求职零工</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				uri: '/pagesHome/index/convenience_detail',
				newsList: [],
				status: 'loadmore', //加载状态
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				page: 1, // 当前页码
				last_page: '', // 总页数
				category_id: null, // 栏目
			}
		},
		onLoad(e) {
			console.log(e);
			this.type = e.type;
			if (this.type == 1) {
				// this.category_id = '13,14';
			} else if (this.type == 3) this.category_id = 4;
			
			this.get_list();
			
			if (e.type == 1) {
				uni.setNavigationBarTitle({
					title: '我发布的零工信息'
				});
			} else {
				uni.setNavigationBarTitle({
					title: '我发布的坑蒙拖欠名单'
				});
			}
		},
		onShow() {
			// 编辑后返回重新调接口刷新下数据
			if (uni.getStorageSync("_REBACK")) {
				this.get_list();
				uni.removeStorageSync("_REBACK")
			}
		},
		onReachBottom() {
			if (this.page >= this.last_page) return;
			this.status = 'loading';
			this.page++;
			this.get_list();
		},
		onPullDownRefresh() {
			// 未启用，不管它
			this.get_list();
		},
		methods: {
			// 获取便民信息列表
			get_list() {
				let that = this;
				let listapi = this.$api.user.user_info_list;
				this.$Request
					.get(listapi, {
						category_id: this.type == 1 ? '13,14' : 4, // 2：本地信息圈 4黑名单资讯
						page: this.page,
						city_id: '', //区id
						pid: '', //省、市id
						keword: this.keyword || '', //搜索关键字
					})
					.then(res => {
						console.log(res);
						uni.hideLoading();
						if (res.code == 1) {
							// uni.hideLoading()
							if (that.page == 1) that.newsList = []
							that.newsList = that.newsList.concat(res.data.data); //追加新数据
							console.error(this.newsList);
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
				if (!uni.getStorageSync('userToken')) {
					this.$Common.toast('登录后才能操作哦')
					return
				}
				uni.navigateTo({
					url: page
				});
			},
			delIt(id) {
				// console.error(id);
				let apiuri = this.$api.user.user_info_delete;
				let that = this;
				
				// 删除用户发布信息/黑名单
				this.$Request.post(apiuri, {id:id}).then(res => {
					this.$Common.toast(res.msg);
					if (res.code == 1) {
						this.page = 1;
						that.get_list();
					}
				});
			},
			editIt(item) {
				// console.error(item);
				// 只需存储当前的即可，后面编辑完就删除
				// uni.setStorageSync("__USER_PUBLIS_INFO", JSON.stringify(item));
				uni.navigateTo({
					url: '../../pagesHome/publishInfo?id=' + item.id + '&type=' + this.type + '&category_id=' + item.category_id
				})
			},
			toAdd(index) {
				let category_id = this.category_id;
				// 显示两个按钮
				if (this.type == 1) {
					if (index == 1) {
						category_id = 13;
					} else {
						category_id = 14;
					}
				}
				// type 1为本地信息全 3为坑骗拖欠名单
				let url = '/pagesHome/publishInfo?type=' + this.type + '&category_id=' + category_id;
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
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
</style>
