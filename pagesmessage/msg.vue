<template>
	<view class="brt_e">
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			:up="upOption" :fixed="true">
			<view class=" padding" style="margin: 30upx;background-color: #fff;" v-for="(item, index) in data"
				:key="index" @tap='goDetail(item)'>
				<view>
					<text class="text-bold text-df" :selectable="true">{{ item.title ||''}}</text>
				</view>
				<view>
					<text class="text-sm  margin-top margin-bottom" style="color: #666;" :selectable="true">{{ item.content||'' }}</text>
				</view>
				<view class="text-sm text-gray text-right">{{ item.create_time||'' }}</view>
			</view>
			<!-- <view class="" v-show="data == ''" style="width: 100%; text-align: center;padding-top: 200upx;">暂无消息</view> -->
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				data: []
			};
		},
		onLoad() {
			// 通知列表页  底部栏刷新数据
			uni.$emit('number', {
				msg: 'number'
			});
			this.mescroll && this.mescroll.resetUpScroll();
		},
		onUnload() {
			uni.$emit('number', {
				msg: 'number'
			});
		},
		methods: {
			/*上拉加载的回调*/
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = 20; // 页长, 默认每页10条
				let msgtype = 1
				this.$Request
					.get(this.$api.operation.get_message_list, {
						page: pageNum,
						msgtype: msgtype
					})
					.then(res => {
						if (res.code == 1) {
							let curPageData = res.data.data;
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = res.data.total;
							//设置列表数据
							if (mescroll.num == 1) this.data = []; //如果是第一页需手动置空列表
							this.data = this.data.concat(curPageData); //追加新数据
							uni.$emit('number', {
								msg: 'number'
							});
							console.log(res.data.data, msgtype, '=========');

							mescroll.endBySize(curPageData.length, totalPage);
						} else {
							this.mescroll.endErr();
						}
					})
					.catch(err => {
						this.mescroll.endErr();
					});
			},
			// 根据推送的动作id（action）跳转不同类型的详情页
			goDetail(item) {
				//报名状态  进入报名列表页面
				let custom = JSON.parse(JSON.stringify(item.custom))
				if (item.action == 6) {
					// 对应的职位id
					let aid = custom.position_id
					uni.navigateTo({
						url: '/pagescenter/userypz/singUpStatus?id=' + aid
					})
				} else if (item.action == 7) {
					//网约工详情  进入我的接单列表 我是接单者
					let aid = custom.partjob_id
					// 对应的兼职id
					uni.navigateTo({
						url: '/pagescenter/userypz/my_order'
					})
				} else if (item.action == 10) {
					//网约工详情  进入查看接单人页面  我是发布者 
					let aid = custom.paryjob_id
					// 对应的兼职id
					uni.navigateTo({
						url: '/pagescenter/userypz/pick_up_person?pushMsg=1&aid=' + aid
					})
				} else if (item.action == 8) {
					//报名详情  招聘端进入查看简历页面
					let aid = custom.delivery_id
					// 对应的报名id
					let user_id = custom.user_id
					// 对应的报名者id
					uni.navigateTo({
						url: '/pagesHome/look_resume?uid=' + user_id + '&aid=' + aid + '&set_up_status=0'

					})
				} else if (item.action == 9) {
					//进最新通知详情
					let aid = custom.notice_id
					// 对应的最新通知id
					uni.navigateTo({
						url: '/pagescenter/zhaopinzhe/noticeDetail?aid=' + aid
					})
				} else if (item.action == 11) {
					//聊天消息页面
					let kfid = custom.my_id
					// 好友id
					let userName = custom.friend_nickname
					// 好友昵称
					let position_id = custom.friend_job_position_id
					// 通过某职位聊天的职位id（可能没有 没有则为0）
					uni.navigateTo({
						url: '/pagesmessage/userMsg?kfid=' + kfid + '&friendId=' + kfid + '&userName=' + userName +
							'&job_position_id=' + position_id
					})
				} else if (item.action == 13) {
					//便民信息页面  后台推送咨讯
					let aid = custom.aid
					console.log(custom,aid);
					// 对应的便民信息页面
					uni.navigateTo({
						url: '/pagesHome/index/convenience_detail?id=' + aid
					})
				} else if (item.action == 14) {
					//职位详情页面  后台推送职位
					let aid = custom.position_id
					// 对应的职位id
					uni.navigateTo({
						url: '/pagesHome/index/plant_detail?id=' + aid
					})
				} else if (item.action == 1) {
					// 系统消息页面  本页面不再跳转
					return
					// uni.navigateTo({
					// 	url: '/pagesmessage/msg'
					// })
				}
			}
		}
	};
</script>

<style>
	page {
		background-color: #fff;
	}
</style>
