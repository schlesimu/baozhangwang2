<template>
	<view class="bg-white">
		<!-- 评论弹窗 -->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''"
			@touchmove.stop.prevent="moveStop">
			<view class="cu-dialog">
				<view class="cu-bar bg-white border-bottom ">
					<view class="action text-black text-lg" v-if="commentList">{{commentList.length}}评论</view>
					<text class="f36 gray3 bold"></text>
					<view class="action text-black" @click="closePop">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="  bg-white margin-top" style="padding: 100rpx 32upx 0;">
					<scroll-view scroll-y="true" style="height: 700upx; padding-bottom: 60upx;">
						<view class="pb10 margin-top-sm brb_e" v-for="(item,index) in commentList" :key="index">
							<view class="flex align-center justify-between">
								<!-- 左侧头像 -->
								<view class=" flex w100">
									<image :src="item.head_img" mode="aspectFill"
										class="block_72 radius50p margin-right-sm"></image>
									<view class="" style="width: 90%;">
										<view class=" ">
											<view class="text-black text-df margin-right-xs">{{item.user_nickname||''}}
											</view>
											<view class="text-sm text-999 margin-top-xs">{{item.create_time||''}}</view>
											<view class="margin-top-xs w100">
												<view class="text-sm ewrap w100" style="padding: 14upx;">
													{{item.content||''}} <text class="replyTxt margin-left-sm text-df"
														@tap='replyOther(item)'>回复</text>
												</view>
											</view>
										</view>
										<view class="padding-top-xs" v-if="item.child" v-for="(itm, indx) in item.child"
											:key="indx">
											<view class="flex ">
												<view class="flex_shrink mr10" style="width: 70rpx;height: 70rpx;">
													<image :src="itm.head_img||'/static/images/logo.png'" class="round"
														style="width: 70rpx;height: 70rpx;background: #ccc;"></image>
												</view>
												<view class="w100">
													<view class=" text-black text-df ewrap">{{itm.user_nickname||''}}
													</view>
													<view class=" text-999 text-sm">{{itm.create_time||""}}</view>
													<view class="w100 text-df ewrap w100">
														回复<text class="txt-theme">{{itm.usernicknamed}} </text> :
														{{itm.content||''}} <text class="replyTxt margin-left-sm"
															@tap='replyItemSecond(item,itm)'>回复</text>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>

						</view>
						<!-- 无好友展示 -->
						<view class="mt20" v-if="commentList==''">
							<text class="text-sm gray9">暂无评论哦</text>
						</view>
					</scroll-view>
				</view>
				<!-- 底部评论输入 -->
				<view class="padding-tb padding-lr footer">
					<view class="foot-input flex align-center justify-between">
						<input type="text" v-model="commont" placeholder="说点什么吧~" placeholder-class="text-sm"
							class="input-box" ref='arouse' :focus="isfocus" @blur="txtBlur" />
						<view class="action flex_shrink margin-left-xs">
							<button class="cu-btn bg-blue shadow-blur round text-theme" v-if="commont"
								@tap="postComments">发布</button>
						</view>
						<!-- <view class="flex-shrink padding-left-sm" style="min-width: 90upx;" v-if="commont" @tap='postComments'>发送</view> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 底部数据加载状态  start-->
		<uni-load-more v-if="commentList.length > 5" :status="status"></uni-load-more>
		<!-- 底部数据加载状态  end-->
		<leePopup :content="'确认删除此条回复？？'" :confirmTxt="'删除'" @cancel="cancel" @confirm="confirm" ref="leepop"
			:poptype='2'></leePopup>

	</view>
</template>

<script>
	import leePopup from '@/components/lee-pop.vue'
	export default {
		components: {
			leePopup
		},
		props: {
			// 文章id
			article_id: {
				type: [String, Number],
			},
			modalName: {
				type: [String],
			}
		},
		data() {
			return {
				status: 'more',
				page: 1,
				commont: '', //发布的评论
				commentList: [], //每个评论列表
				listData: [], //动态列表
				isShowLoading: false,
				isfocus: false,
				showComment: false,
				commentFocus: false,
				content: '', //评论内容
				modal_cur: 0,
				issend: true, //防止发评论太频繁
				commentUserId: '', //评论人的id
				pid: '', //上级评论的aid
			}
		},
		created() {

		},
		methods: {
			loadData() {
				this.getDynamicList();
			},
			// 关闭评论弹框
			closePop() {
				this.$emit('modelName', '')
			},
			like_comment(item) { //评论列表点赞
				item.islike = !item.islike;
				this.$api.post(global.apiUrls.commentLike, {
					id: item.id
				}).then(res => {
					if (res.data.code == 1) {
						this.$Common.toast('点赞成功');
						this.page = 1
						this.status = 'more'
						this.getDynamicList();
					} else {
						this.$Common.toast(res.data.msg);
					}
				}).catch(err => {
					this.$Common.toast("网络异常，请稍后重试");
				});
			},
			//删除回复的评论
			deletReplay(item) {
				this.commentId = item.id
				this.$refs.leepop.open()
			},
			cancel() {
				this.$refs.leepop.close()
			},
			confirm() { //确认删除	
				this.$api.post(global.apiUrls.deletComment, {
					id: this.commentId,
					circle_id: this.id
				}).then(res => {
					if (res.data.code == 1) {
						this.$Common.toast('删除成功');
						this.page = 1
						this.status = 'more'
						this.getDynamicList();
					} else {
						this.$Common.toast(res.data.msg);
					}
				}).catch(err => {
					uni.hideLoading();
					this.$Common.toast("网络异常，请稍后重试");
				});
				this.$refs.leepop.close()
			},
			moveStop() {},

			getDynamicList() { //获取评论列表 getCommentList
				if (this.status != 'more') return;
				this.status = 'loading';
				this.$Request.post(this.$api.common.getCommentList, {
						id: this.article_id, //文章id
					})
					.then(res => {
						this.isShowLoading = false
						if (res.code == 1) {
							this.commentUserId = ''
							this.pid = ''
							if (this.page == 1) this.commentList = [];
							this.commentList.push(...res.data.data);
							let num = this.num || 15;
							if (res.data.data.length < num) {
								this.status = 'noMore';
							} else {
								this.status = 'more';
								this.page++;
							}
							// uni.stopPullDownRefresh();
						} else {
							this.status = 'more';
							uni.stopPullDownRefresh();
						}
					}).catch(err => {
						this.status = 'more';
						uni.stopPullDownRefresh();
						this.$Common.toast("网络异常，请稍后重试");
					});
			},
			postComments() { //弹框发布评论
				// this.showComment = false;
				if (this.issend == false) {
					this.$Common.toast('您操作太频繁啦,歇会吧');
					return;
				};
				setTimeout(() => {
					this.issend = true;
				}, 2000);
				this.$Request.post(this.$api.common.conver_comment, {
					article_id: this.article_id, //文章id
					pid: this.pid, //上级评论id
					touid: this.commentUserId, //评论人id
					content: this.commont,
				}).then(res => {
					console.log(res,'========');
					if (res.code == 1) {
						this.commont = '';
						// 触发评论埋点
						// this.completeTask('commentStar')
						this.page = 1
						this.status = 'more'
						this.getDynamicList();
						this.issend = false;
						this.isfocus = false;
					} else {
						this.$Common.toast(res.msg);
					}

				})
			},
			// 回复一级评论
			replyOther(item) {
				this.pid = item.aid
				this.commentUserId = item.user_id
				this.isfocus = false
				setTimeout(() => {
					this.isfocus = true;
				}, 200)
				// this.$refs.arouse.focus()
			},
			// 回复二级评论
			replyItemSecond(item, itm) {
				this.isfocus = true
				this.pid = item.aid
				this.commentUserId = itm.user_id
			},
			// 失去焦点
			txtBlur(){
				this.isfocus = false
			},
			to_comment(item) {
				// 点击评论自动获取焦点
				this.showComment = true;
				this.commentFocus = true
				this.pid = item.aid
				this.commentUserId = item.user_id
				this.modalName = null;
			},
			closeFouse() {
				this.showComment = false
				this.commentFocus = false
			},
			moveStop() {},
			// 打开收藏弹窗
			show_modal(item, index) {
				this.modal_cur = index;
				this.modalName = 'Modal';
			},
			// 隐藏遮罩
			hide_mask() {
				this.modalName = null;
				this.showComment = false;
				this.isfocus = false;
				uni.showTabBar(); //打开底部栏
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
		height: 100%;
	}

	.tag-border {
		width: 56rpx;
		height: 30rpx;
		background: #FFFFFF;
		border: 1px solid #FF8651;
		border-radius: 4rpx;
		font-size: 20rpx;
		font-weight: 400;
		line-height: 28rpx;
		color: #FF8651;
	}

	.cu-modal {
		text-align: left;
	}

	.cu-dialog {
		background: #FFFFFF;
		height: 900upx;
	}

	.comment-content {
		line-height: 40rpx;
	}

	.cu-bar {
		position: fixed;
		width: 100%;
		background: #FFFFFF;
	}

	.border-bottom {
		border-bottom: 1px solid #EEEEEE;
	}

	.img_item {
		width: 220rpx;
		height: 220rpx;
		background: #EEEEEE;
		margin-right: 14upx;
	}

	.img_item:nth-child(3n) {
		margin-right: 0;
	}

	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	.foot_hidden {
		opacity: 0;
		display: none;
	}

	.foot_shows {
		opacity: 1;
		// display: block;
	}

	.img-box {
		flex-wrap: wrap;
		// overflow-x: scroll;
	}

	.foot-input {
		.input-box {
			padding: 0 32rpx;
			height: 72rpx;
			width: 100%;
			background: #F5F6F7;
			border-radius: 36rpx;
		}
	}


	.comment-box {
		width: 100%;
		min-height: 100rpx;
		background: #FFFFFF;
	}

	.moreIcon {
		width: 42rpx;
		height: 12rpx;
	}

	.card_item {
		border-bottom: 16rpx solid #F6F6F6;
	}

	.a-content {
		position: relative;
	}

	.maskBg {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 30;
		outline: 0;
		opacity: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000upx;
		background: rgba(0, 0, 0, 0);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}

	.handle_modal {
		background-color: #4C5154;
		overflow: hidden;
		position: absolute;
		visibility: hidden;
		z-index: 60;
		width: 360rpx;
		height: 80rpx;
		border-radius: 8rpx;
		bottom: -20rpx;
		right: 50rpx;
	}

	.shows {
		opacity: 1;
		visibility: visible;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}

	.replyTxt {
		background-color: rgba($color: #50AEFF, $alpha: .1);
		color: rgba($color: #50AEFF, $alpha: .9);
		padding: 6upx 12upx;
		border-radius: 30upx;
	}

	.block-40 {
		width: 40rpx;
		height: 40rpx;
	}

	.block_96 {
		display: block;
		width: 96rpx;
		height: 96rpx;
		background: #EEEEEE;
	}

	.block_72 {
		display: block;
		width: 72rpx;
		height: 72rpx;
		background: #EEEEEE;
	}

	.img_item {}

	.more_icon {
		width: 42rpx;
		height: 12rpx;
		display: block;
	}

	.icon_32 {
		font-size: 16px;
		line-height: 15px;
	}
</style>
