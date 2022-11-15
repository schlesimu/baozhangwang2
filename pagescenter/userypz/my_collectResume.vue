<!--应聘者 我的关注 -->
<template>
	<view class="">
		<!-- <view class="  fixed bg-white w100" :style="[{height:CustomBar+'px'}]">
			<view class="bg-theme w100 text-center text-sm ptb5 text-white">今日可免费查看简历{{resumeNumInfo.look_num}}份，购买查看剩余{{resumeNumInfo.company_num}}份</view>
		</view> -->
		<mescroll-body ref="mescrollRef" top="5px" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" :fixed="true">
			<view class="mb20 brb_e padding-bottom w100 plr15" v-for="(item, index) in brokerList" :key="index">
				<view class="flex justify-between">
					<view class="bg-f2f3 job_img mr10 round overHidden" style="flex-shrink: 0;">
						<image :src="item.head_img || '/static/images/logo.png'" mode="aspectFill" class="mr10 round"></image>
					</view>
					<view class="" style="max-width: 58%;">
						<view class="flex align-center justify-between pb10">
							<view class="overflow-one ewrap  f32 bold text-black">{{item.want_find||''}}</view>
						</view>
						<view class="flex align-center justify-between pb5 w100">
							<view class="text-cut ewrap  text-666 f28 flex-wrap">{{item.sex==2?'女':'男'||'保密'}} / {{item.age||'0'}}/
								{{item.work_experience||0}} / {{item.education||'无'}}学历
							</view>
						</view>
					</view>
					<view class=" flex  align-center justify-between flex_shrink">
						<text class=" btn_btn" @click.stop="lookResume(item)">查看简历</text>
						<!-- <text class=" btn_btn" v-if="item.is_signup==1">已报名</text> -->
					</view>
				</view>
			</view>
		</mescroll-body>
		<!-- 弹框 -->
		<leePopup :content="'免费次数已用完，去购买查看简历次数'" :confirmTxt="'确认'" @cancel="cancel" @confirm="confirm" ref="leepop"
			:poptype='2'>
		</leePopup>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import leePopup from '@/components/lee-pop.vue';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components:{
			leePopup
		},
		data() {
			return {
				current: 1, //选择分类
				collect_sort: [{
						name: '公司',
						id: 1
					},
					{
						name: '职位',
						id: 2
					},
					{
						name: '临时工',
						id: 3
					}, {
						name: '网络兼职',
						id: 4
					},
				],
				job_list: [], //网约工
				latitude: 0,
				longitude: 0,
				isopen: true, //跳转页面
				brokerList: [],
				type: 1,
				shopdata: [],
				voucher: '', //是否开启支付
				resumeNumInfo:'',//配置信息
			};
		},
		onLoad() {
			this.mescroll && this.mescroll.resetUpScroll();
			uni.$on('follow', data => {
				console.log('监听收藏');
				this.mescroll && this.mescroll.resetUpScroll();
			});
			uni.$on('myCollect', data => {
				console.log('监听从我的收藏进详情页的收藏');
				this.mescroll && this.mescroll.resetUpScroll();
			});
			this.get_plant_type()
			this.getResumeNumInfo()
			this.$Common.getLocation(e => {
				this.latitude = e.latitude
				this.longitude = e.longitude
				// let lat = [e.longitude, e.latitude];
				// 	this.$Request
				// 		.post(this.$api.msg.cityPosition, {
				// 			user_id: uni.getStorageSync('USERINFO').id||'',
				// 			// #ifdef APP-PLUS
				// 			client_id: plus.device.uuid,
				// 			// #endif
				// 			cid:  '',
				// 			lat: lat
				// 		})
				// 		.then(res => {
				// 			if (res.code == 1) {
				// 				this.longitude = res.data.lng;
				// 				this.latitude = res.data.lat;

				// 			} else {
				// 				that.$Common.toast(res.msg);
				// 			}
				// 		})
				// 		.catch(err => {
				// 			that.$Common.toast('网络错误，请稍后重试');
				// 		});
			})
		},
		onUnload() {
			uni.$off('follow');
			uni.$off('myCollect');
		},
		methods: {
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.$Request
					.post(this.$api.user.get_collection_list, {
						type: 5,
						longitude: this.longitude,
						latitude: this.latitude,
						page: pageNum,
						list_rows: 10
					})
					.then(res => {
						if (res.code == 1) {
							let curPageData = res.data.data;
							console.log(res.data);
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = res.data.total;
							//设置列表数据
							if (mescroll.num == 1) this.brokerList = []; //如果是第一页需手动置空列表
							this.brokerList = this.brokerList.concat(curPageData); //追加新数据
							mescroll.endBySize(curPageData.length, totalPage);
						} else {
							this.mescroll.endErr();
						}
					})
					.catch(err => {
						this.mescroll.endErr();
					});
			},
			lookResume(item) {
				//跳转详情，判断是否登录
				if (!uni.getStorageSync('USERINFO').user_token) {
					this.$Common.toast('登录后才能操作哦')
					return
				}
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url:'/pagesHome/lookResumeNew?uid=' + item.user_id + '&resume_id=' + item.collect_id+'&type=1'
				});
			},
			// 获取购买次数 查看次数
			getResumeNumInfo(){
				this.$Request.post(this.$api.user.getResumeNumInfo, {user_id:uni.getStorageSync('USERINFO').id}).then(res => {
					if (res.code == 1) {
						this.resumeNumInfo = res.data.resume
					} else {						
					}
				});
			},
			cancel() {
				this.$refs.leepop.close()
			},
			// 确定购买简历
			confirm() {
				uni.navigateTo({
					url: '../../pagesHome/payViewNumber'
				})
				this.$refs.leepop.close()
			},
			godetail(aid) {
				//跳到公司详情
				if (this.isopen == false) {
					return;
				};
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true
				}, 3000);
				this.$Common.getLocation(e => {
					//获取经纬度
					uni.navigateTo({
						url: '../../pagesHome/index/job_detail?heart=true&id=' + aid + '&longitude=' + e.longitude + '&latitude=' + e
							.latitude
					});

				});

			},
			navTo(item) { //职位详情
				//跳转详情，判断是否登录
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				const userInfo = uni.getStorageSync('USERINFO').user_token;
				console.log(userInfo);
				if (!userInfo) {
					this.$Common.toast('您还没有登录，请先登录');
					setTimeout(() => {
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '/pagessignup/login'
						});
						// #endif

						// #ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pagessignup/wechat/wxlog'
						});
						// #endif
					}, 300);
				} else {
					this.$Common.getLocation(e => {
						//获取经纬度
						uni.navigateTo({
							url: '/pagesHome/index/plant_detail?id=' + item.aid + '&longitude=' + e.longitude + '&latitude=' + e.latitude
						});
					});

				}
			},
			navToPart(item, index) { //网约工详情
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: '/pagesHome/part_sort?id=' + item.aid + '&user_id=' + item.user_id + '&type=' + this.current,
				})
			}

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

	.returnBox {
		min-width: 97rpx;
		height: 87rpx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid #cccccc;
		opacity: 1;
		overflow: hidden;
		border-radius: 4rpx;
		box-sizing: border-box;

		.top_blue {
			height: 45upx;
			background-color: #50aeff;
			line-height: 45upx;
			margin-top: -4upx;
			color: #ffffff;
			width: 100%;
		}
	}

	.btn_btn {
		width: 154upx;
		height: 64upx;
		background: #50aeff;
		border: 1px solid #50aeff;
		color: #ffffff;
		text-align: center;
		line-height: 64upx;
		font-size: 11px;
		border-radius: 45upx;
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

	.cu-tag {
		margin-left: 0;
		margin-right: 15upx;
		margin-bottom: 10upx;
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
