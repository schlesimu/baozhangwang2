<template>
	<view>
		<view class="u-border padding mb10" style="background-color: #fff;" v-for="(item, index) in dataList" :key="index" @tap='godetail(item)'>
			<view class="text-bold text-df">{{ item.title }}</view>
			<view class="text-sm mb5 text_line2" style="color: #666;word-wrap:break-word;word-break:break-all">{{ item.content }}</view>
			<view class="text-sm text-gray text-right">{{ item.create_time }}</view>
		</view>
		<view v-if="dataList== ''" class="" style="text-indent: 2em;">暂无相关内容</view>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		props: {
			companyId: {
				type: [String, Number],
				default: ""
			}
		},
		data() {
			return {
				dataList: []
			};
		},
		created() {
			console.log();
			this.getNotice();

		},

		methods: {
			godetail(item) { //跳转详情页
				uni.navigateTo({
					url: '/pagescenter/zhaopinzhe/noticeDetail?aid=' + item.aid
				})
			},
			getNotice() {
				this.$Request
					.post(this.$api.Community.noticeList, {
						company_id: this.companyId,
						type: 1, //不分页
					})
					.then(res => {
						console.log(res, '最新通知列表');
						if (res.code == 1) {
							this.dataList = res.data.data;
							// console.log(this.dataList);
						} else {}
					})
			}
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.btn_next {
		margin: 20upx 0;
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
		font-size: 17px;
		border: 1px solid #50AEFF;
		background-color: #fff;
	}
</style>
