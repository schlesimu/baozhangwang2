<template>
	<!-- 最新通知 -->
	<view class="">
		<cu-custom bgColor="text-black bg-white brb_e" :isBack='true '>
			<block slot="content"><text class="" style="font-size: 36upx;">最新通知</text></block>
			<block slot="right"><text class="text-sm padding" style="color: #1B90FF;" @tap="topage">发布</text></block>
		</cu-custom>
		<mescroll-uni ref="mescrollRef" :top="CustomBar * 2" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" :fixed="true">
			<view class=" padding bg-white brb_e" v-for="(item, index) in dataList" :key="index" @tap='godetail(item)'>
				<view class="text-bold text-df ewrap">{{ item.title }}</view>

				<view class="text-sm  mtb10 text_line2" style="color: #666;word-wrap:break-word;word-break:break-all">{{ item.content }}</view>
				<!-- <view class=" flex " v-for="(itms,indx) in item.url" :key='indx'>
					<image :src="itms||'../../static/images/logo.png'" mode="" style="width: 200upx;height: 200upx;" class="mr10"></image>
				</view> -->
				<view class="text-sm text-gray text-right">{{ item.create_time }}</view>
				<view class="flex justify-end">
					<view class="btn_next btn f28" style="width: 100upx;border-radius: 88upx;" @tap.stop='edit(item)'>编辑</view>
					<view class="btn_next" style="width: 100upx;border-radius: 88upx;" @tap.stop='delet(item)'>删除</view>
					<view class="btn_next btn f28" style="width: 100upx;border-radius: 88upx;" @tap.stop='pushItem(item)'>推送</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				dataList: [],
				CustomBar: this.CustomBar
			};
		},
		onLoad() {
			uni.$emit('number', {
				msg: 'number'
			});
			this.mescroll && this.mescroll.resetUpScroll();
			console.log('通知');
			uni.$on('fabuNotice', (data) => {
				this.mescroll && this.mescroll.resetUpScroll();
			})
		},
		onUnload() {
			// uni.$off('number');
			uni.$off('fabuNotice');
		},
		methods: {
			topage() { //发布通知
				uni.navigateTo({
					url: 'fabu_notice'
				})
			},
			delet(item) { //删除最新通知
				uni.showModal({
					content: '确定要删除此条通知吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.$Request
								.post(this.$api.Community.del_notice, {
									aid: item.aid
								})
								.then(res => {
									if (res.code == 1) {
										this.$Common.toast(res.msg)
										this.mescroll && this.mescroll.resetUpScroll();
									}
								})
						}
					}
				});
			},
			pushItem(item){
				uni.showModal({
					content: '确认推送此通知给已收藏本公司的人？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.$Request
								.post(this.$api.company.noticePush, {
									aid: item.aid
								})
								.then(res => {
									if (res.code == 1) {
										this.$Common.toast(res.msg)
										this.mescroll && this.mescroll.resetUpScroll();
									}
								})
						}
					}
				});
			},
			edit(item) { //编辑通知
				uni.navigateTo({
					url: 'bianj_notice?aid=' + item.aid
				})
			},
			godetail(item) { //跳转详情页
				uni.navigateTo({
					url: 'noticeDetail?aid=' + item.aid
				})
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				let company_id = uni.getStorageSync('roleinfo').info.aid
				console.log(company_id);
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.$Request
					.post(this.$api.Community.noticeList, {
						company_id: company_id,
						page: pageNum,
						limit: 10
					})
					.then(res => {
						console.log(res, '最新通知列表');
						if (res.code == 1) {
							let curPageData = res.data.data;
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = res.data.count;
							//设置列表数据
							if (mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
							this.dataList = this.dataList.concat(curPageData); //追加新数据
							console.log(this.dataList);

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

<style>
	page {
		background-color: #fff;
	}

	.btn_next {
		margin: 20upx 0 0 10upx;
		font-size: 24upx;
		height: 60upx;
		line-height: 60upx;
	}

	.btn {
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		color: #50AEFF;
		border-radius: 4px;
		/* font-size: 17px; */
		border: 1px solid #50AEFF;
		background-color: #fff;
	}
</style>
