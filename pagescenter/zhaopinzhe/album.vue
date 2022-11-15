<template>
	<!-- 我的相册 -->
	<view class="">
		<cu-custom bgColor="text-black bg-white" :isBack="true">
			<block slot="content"><text class="" style="font-size: 36upx;">我的相册</text></block>
			<!-- <block slot="right"><text class="text-sm padding" style="color: #1B90FF;" @tap="topage">发布</text></block> -->
		</cu-custom>
		<mescroll-uni ref="mescrollRef" :top="CustomBar * 2" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" :fixed="true">
			<view class="flex justify-between flex-wrap padding" style="width: 100%;">
				<view class=" pb10" style="width: 330upx;background-color: #fff;" v-for="(item, index) in data" :key="index" @tap="godetail(item)">
					<view class="bg_img">
						<image :src="item.urls || '../../static/images/logo.png'" mode="" style="width: 100%;height: 100%;"></image>
						<view class="play" v-if="item.type==2">
							<image :src="IMG_URL + 'static/miniwechat/play.png'" mode="aspectFill"></image>
						</view>
					</view>
					<view class="text-bold f32 mt10" style="word-wrap:break-word;word-break:break-all;
">
						{{ item.title }}
					</view>
					<view class=" text-df mt5 text_line2" style="word-wrap:break-word;word-break:break-all;
				">
						{{ item.describe }}
					</view>
					<view class="flex align-center justify-between pt10">
						<view class="text-sm text-gray  mt5">{{ item.create_time.split(' ')[0]||'' }}</view>
						<view class="btn_blue ml10 txt-theme" @tap.stop='detalOne(item,index)'>删除</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
		
		<view style="width: 60%; height: 128upx; display: flex; justify-content: space-around; align-items: center; position: fixed; left: 20%; bottom: 50upx; z-index: 98;">
			<view
				style="width: 128upx; height: 128upx; background-color: #007AFF; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;"
				@click="topage"
			>
				<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
				<text style="color: #FFFFFF; font-size: 26upx;">发布</text>
			</view>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				data: [],
				video: false, //是否为视频
				CustomBar: this.CustomBar,
				user_id: uni.getStorageSync('USERINFO').id,
				IMG_URL:this.IMG_URL,
			};
		},
		onLoad() {
			uni.$emit('number', {
				msg: 'number'
			});
			this.user_id = uni.getStorageSync('USERINFO').id
			this.mescroll && this.mescroll.resetUpScroll();
			uni.$on('albumUpdate', (data) => {
				this.mescroll && this.mescroll.resetUpScroll();
			})
			// uni.$on('deletAlbum', (data) => {
			// 	this.mescroll && this.mescroll.resetUpScroll();
			// })
		},
		onUnload() {
			// uni.$off('number');
			uni.$off('albumUpdate');
			uni.$off('deletAlbum');
		},
		methods: {
			topage() {
				//发布通知
				uni.navigateTo({
					url: 'fabu_album'
				});
			},
			detalOne(item,index) { //删除
				let that = this
				uni.showModal({
					title: '确定要删除相册吗',
					success: function(res) {
						if (res.confirm) {
							that.$Request.post(that.$api.Community.delAlbum, {
								aid: item.aid,
							}).then(res => {
								if (res.code == 1) {
									that.mescroll && that.mescroll.resetUpScroll();
								} else {
									that.$Common.toast(res.msg);
								}
							});
						}
					}
				})
			},
			godetail(item) {
				//详情页
				if (item.type == 1) { //图片
					uni.navigateTo({
						url: 'albumDetail?aid=' + item.aid + '&pages=zhaopin'
					});
				} else {
					// #ifndef APP-PLUS
					uni.navigateTo({
						url: 'album_play?aid=' + item.aid + '&user_id=' + this.user_id + '&pages=zhaopin'
					})
					// #endif
					// #ifdef APP-PLUS
					uni.navigateTo({
						url: 'albumDetail_video?aid=' + item.aid + '&user_id=' + this.user_id + '&pages=zhaopin'
					});
					// #endif

				}
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.$Request
					.post(this.$api.Community.getAlbumlist, {
						company_id: uni.getStorageSync('roleinfo').info.aid,
						page: pageNum,
						limit: 10
					})
					.then(res => {
						if (res.code == 1) {
							let curPageData = res.data.data;
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = res.data.count;
							//设置列表数据
							if (mescroll.num == 1) this.data = []; //如果是第一页需手动置空列表
							this.data = this.data.concat(curPageData); //追加新数据

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
	}

	.btn_blue {
		width: 120upx;
		height: 52upx;
		border: 1px solid #1B90FF;
		color: #1B90FF;
		line-height: 52upx;
		text-align: center;
		border-radius: 100upx;
	}

	.bg_img {
		width: 330upx;
		height: 330upx;
		position: relative;

		.play {
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			top: 0;
			z-index: 10;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(1, 1, 1, 0.3);

			image {
				max-width: 80upx;
				max-height: 80upx;
			}
		}
	}
</style>
