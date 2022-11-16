<template>
	<!-- #ifdef MP-WEIXIN -->
	<scroll-view scroll-y style="padding-bottom: 300rpx;background-color: #F6F7F9;">
		<!-- #endif -->
		<view style="height: 100vh; line-height: 100vh; font-weight: 300; font-size: 24upx; text-align: center;" v-if="showLoading">数据加载中...</view>
		<view class="my" style="height: 100%;" v-if="!showLoading">
			<view class="worktime-top-section" style="margin-bottom: 60upx;">
				<view class="bg_color" style="background: linear-gradient(90deg,rgba(51,143,255,1) 0%,rgba(62,149,255,1) 100%);width: 100%;height: 417rpx;">
					<image :src="IMG_URL + 'static/miniwechat/my1.png'" mode="aspectFill"></image>
				</view>
				<view v-if="userinfo.id > 0" style="position: relative;z-index: 100;" :style="{ paddingTop: StatusBar * 2 + 80 + 'rpx' }">
					<view class="userInfo">
						<view class="tui-msg-box">
							<view @tap="toPage('/pagesauthen/my_editInfo')" class="flex  align-center" style="width: 100%;">
								<view class="bg-gray mr10" style="width:160upx;height: 160upx; border-radius: 50%;overflow: hidden;flex-shrink: 0;">
									<image :src="user.head_img || '/static/images/logo.png'" class="tui-msg-pic" mode="aspectFill"></image>
								</view>
								<view class="tui-msg-item">
									<view class=" text-white text-bold mb5 f40 text_line1">{{ user.user_name || '昵称' }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="up_margin">
					<view class="margin-lr ptb10 bg-white margin-top-sm radius-16">
						<view class="margin-top-lg flex justify-between worktime-tab">
							<view
								class="text-center worktime-tab-item"
								:class="currentTab === index ? 'current-tab' : ''"
								v-for="(item, index) in tabList"
								:key="item.index"
								@click="currentTab = index"
							>
								<view class="text-333 f32 current-tab-font">{{ item.title }}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 记工时 <view
					style="width: 128upx; height: 128upx; background-color: #007AFF; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;"
					@click="toPage(worktimerecord + '?type=' + currentTab)"
				>
					<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
					<text style="color: #FFFFFF; font-size: 26upx;">记工时</text>
				</view>-->
			</view>
			<!-- 小时工/正式工当前收入总计 -->
			<view class="path_list margin-top" style="margin-bottom: 60upx;" v-if="currentTab === 0 || currentTab === 1">
				<view class=" color-gray radius">
					<view class="padding-xl">
						<view class="flex justify-start align-center margin-bottom-xl" style="flex-direction: column;">
							<view class="flex justify-around align-center" style="width: 100%;">
								<view class="f64 bold" style="flex: 1 1 50%; text-align: center; color: #f3a73f;">{{ workcount }}</view>
								<view class="f64 bold" style="flex: 1 1 50%; text-align: center; color: #f3a73f;">{{ worksalary }}</view>
							</view>
							<view class="flex justify-around align-center margin-top-xs" style="width: 100%;">
								<view class="bold" style="flex: 1 1 50%; text-align: center;">{{ currentHourStr }}</view>
								<view class="bold" style="flex: 1 1 50%; text-align: center;">{{ currentSalaryStr }}</view>
							</view>
						</view>

						<view class="flex justify-around align-center" style="font-weight: 300; border-top: 1px dashed #efefef;  padding-top: 10upx;">
							<view style="flex: 1 1 50%;" @click="toPage(currentSalarySettingRoute + '?type=' + currentTab)">
								<uni-icons type="gear" size="16" color="#ccc;"></uni-icons>
								<text style="margin-left: 8upx;">工资设置</text>
							</view>
							<view style="flex: 1 1 50%; text-align: right;" @click="toPage(currentStatisticsRoute + '?type=' + currentTab)">
								<uni-icons type="paperplane" size="16" color="#ccc;"></uni-icons>
								<text style="margin-left: 8upx;">统计</text>
							</view>
						</view>
					</view>
				</view>
				<view
					style="width: 640upx; height: 80upx; background-color: #007AFF; border-radius: 10px; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;"
					@click="toPage(worktimerecord + '?type=' + currentTab)"
				>
					<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
					<text style="color: #FFFFFF; font-size: 26upx;">记工时</text>
				</view>
			</view>
			<!-- 计件工当前收入总计 -->
			<view v-if="currentTab === 2" style="margin-bottom: 60upx;">
				<view class="path_list margin-top" style="margin-bottom: 0;">
					<view class="color-gray radius">
						<view class="padding-xl">
							<view class="flex justify-start align-center margin-bottom-sm" style="flex-direction: column;">
								<view class="flex justify-around align-center" style="width: 100%;">
									<view class="f64 bold" style="flex: 1 1 50%; text-align: center; color: #f3a73f;">{{ workcount }}</view>
									<view class="f64 bold" style="flex: 1 1 50%; text-align: center; color: #f3a73f;">{{ worksalary }}</view>
								</view>
								<view class="flex justify-around align-center margin-top-xs" style="width: 100%;">
									<view class="bold" style="flex: 1 1 50%; text-align: center;">{{ currentUnitStr }}<text v-if="countUnit">({{ countUnit }})</text></view>
									<view class="bold" style="flex: 1 1 50%; text-align: center;">{{ currentSalaryStr }}</view>
								</view>
							</view>
							
							<view style="font-size: 24upx; background-color:#efefef; color: #5f5f5f; font-weight: 300; padding: 20upx 30upx; border-radius: 8upx; margin: 0 0 30upx;">提示：如果当前考勤周期有多个计量单位，不区分单位计算总数。</view>

							<view class="flex justify-around align-center" style="font-weight: 300; border-top: 1px dashed #efefef;  padding-top: 10upx;">
								<view style="flex: 1 1 50%;" @click="toPage(currentSalarySettingRoute + '?type=' + currentTab)">
									<uni-icons type="gear" size="16" color="#ccc;"></uni-icons>
									<text style="margin-left: 8upx;">工资设置</text>
								</view>
								<view style="flex: 1 1 50%; text-align: right;" @click="toPage(currentStatisticsRoute + '?type=' + currentTab)">
									<uni-icons type="paperplane" size="16" color="#ccc;"></uni-icons>
									<text style="margin-left: 8upx;">统计</text>
								</view>
							</view>
						</view>
					</view>
					<view
						style="width: 640upx; height: 80upx; background-color: #007AFF; border-radius: 10px; box-shadow: 0 2px 2px 2px rgba(0,0,0,0.2); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;"
						@click="toPage(worktimerecord + '?type=' + currentTab)"
					>
						<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
						<text style="color: #FFFFFF; font-size: 26upx;">记工时</text>
					</view>
				</view>
				
			</view>

			<!-- 记事本列表 -->
			<view style="width: 686upx; padding: 30upx; margin: 0 auto; background-color: #FFFFFF;border-radius: 16upx;">
				<view style="border-left: 8upx solid #007AFF;padding-left: 10upx;margin-bottom: 10upx;">记事本</view>
				<notebooklist ref="record"></notebooklist>
				<view
					style="width: 640upx; height: 80upx; background-color: #f3a73f; border-radius: 10px; box-shadow: 0 2px 2px 2px rgba(0,0,0,0.2); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;"
					@click="toPage(recordnotebook)"
				>
					<!-- 记事本列表 <i class="text-df cuIcon-edit bold" style="color: #FFFFFF; font-size: 48upx;"></i>
					--><text style="color: #FFFFFF; font-size: 26upx;">新建</text>
				</view>
			</view>
		</view>

		<view style="width: 60%; height: 128upx; display: flex; justify-content: space-around; align-items: center; position: fixed; left: 20%; bottom: 150upx; z-index: 20190118;">
			
			
		</view>
		<!-- #ifdef MP-WEIXIN -->
	</scroll-view>
	<!-- #endif -->
</template>
<script>
export default {
	data() {
		return {
			user: {
				id: 1
			}, //用户信息
			img: this.IMG_URL + 'static/miniwechat/logo.png',
			IMG_URL: this.IMG_URL,
			isopen: true,
			userinfo: uni.getStorageSync('USERINFO'), //缓存的用户信息
			StatusBar: this.StatusBar,
			tabList: [
				{
					index: 1,
					title: '小时工'
				},
				{
					index: 2,
					title: '正式工'
				},
				{
					index: 3,
					title: '计件工'
				}
			],
			currentTab: -1,
			currentHourStr: '当月工时(小时)',
			currentSalaryStr: '当前收入(元)',
			currentSalarySettingRoute: '/pagesworktime/salarysettings',
			currentStatisticsRoute: '/pagesworktime/worktimestatistics',
			recordnotebook: '/pagesworktime/recordnotebook',
			worktimerecord: '/pagesworktime/worktimerecord',
			currentUnitStr: '当月数量',
			showLoading: true,
			workcount: 0, // 工时或者件数
			worksalary: 0, // 总收入
			countUnit: '' // 单位
		};
	},
	watch: {
		currentTab(current) {
			// console.error(current);
			this.requestData();
		}
	},
	beforeCreate() {
		// 解析vue生命周期
		// https://blog.csdn.net/hkduan/article/details/115822619
		// https://blog.csdn.net/m0_70477767/article/details/124684195
		// 调用之前，做事件和生命周期函数初始化
	},
	created: function() {
		// 调用之前，做inject/provide初始化以及响应式数据、方法准备
		
		let tab = uni.getStorageSync('history_page');
		console.error(tab);
		this.currentTab = tab !== '' ? tab : 1; // 默认选中正式工，如果缓存有上次页面使用上次页面
		uni.removeStorageSync('history_page');
		//这是要刷新的数据
		//console.error(this.userinfo);
		if (this.userinfo.user_token) {
			this.get_usrInfo();
		}
	},
	beforeMount() {
		// 调用之前做模板解析
		// console.error('beforeMount');
	},
	mounted() {
		// 渲染后的dom挂在完毕
		// console.error('mounted');
	},
	beforeUpdate(e,v) {
		// 数据更新前
		// console.error('beforeUpdate');
		// 此处不off的话会请求n多次接口，且次数是不断累加的
		uni.$off();
	},
	updated() {
		// 数据更新完毕
		// navigateTo会执行
		// console.error('updated');
		uni.$on('change', data => {
			console.log(data);
			if (data.msg == 1) {
				setTimeout(() => {
					this.get_usrInfo();
				});
			}
		});
		uni.$on('wechatLogin', () => {
			//监听微信登录成功
			// console.log('微信登录  个人中心');
			this.get_usrInfo();
		});
		// 在记录工时返回后刷新数据
		uni.$on('update', () => {
			this.requestData();
		});
		// 从统计页面返回，因为在统计页面可能会编辑或者新增记录
		uni.$on('updateOn', () => {
			this.requestData();
		});
		// 更新配置返回
		uni.$on('updateSetting', () => {
			this.requestData();
		});
	},
	beforeDestroy() {
		// switchTab会执行
		uni.$off();
		uni.setStorageSync('history_page', this.currentTab);
		console.error('beforeDestroy...');
	},
	destroyed() {
		console.error('destroing...');
	},
	methods: {
		get_usrInfo() {
			//获取用户信息
			this.$Request
				.post(this.$api.user.get_user_info, {
					user_id: this.userinfo.id
				})
				.then(res => {
					this.user = res.data;
				});
		},
		toPage: function(page) {
			//console.error(page);
			//防抖
			if (this.isopen == false) {
				return;
			}
			//console.error(page);
			this.isopen = false;
			setTimeout(() => {
				this.isopen = true;
			}, 500);
			//跳转详情，判断是否登录
			if (!this.userinfo.user_token) {
				uni.removeStorageSync('PageCur');
				this.$Common.toast('您还没有登录，请先登录');
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: '../../pagessignup/login'
				});
				// #endif

				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url: '../../pagessignup/wechat/wxlog?page=outLogin'
				});
				// #endif
			} else {
				uni.navigateTo({
					url: page
				});
			}
		},
		requestData() {
			// 请求接口数据
			this.$Request
				.get(this.$api.worktime.get_current_month_info, {
					salaryType: this.currentTab
				})
				.then(res => {
					// console.error(res.data);
					if (this.currentTab === 2) {
						this.workcount = res.data.count;
						this.countUnit = res.data.unit;
					} else {
						this.workcount = res.data.hour.toFixed(2);
					}
					
					this.worksalary = res.data.salary.toFixed(2);
					setTimeout(() => {
						this.showLoading = false;
					}, 200);
				});
		}
	}
};
</script>
<style lang="scss">
page {
	background-color: #f7f7f7 !important;
	// height: 100%;
	/* #ifdef MP-WEIXIN */
	// height: 100vh;
	/* #endif */
}

.my {
	position: relative;
	// height: calc(100%-100upx);
	height: 100%;
	background: #f7f7f7;
	// padding-bottom: 100upx;
}

.worktime-top-section {
	width: 100%;

	.bg_color {
		width: 100%;
		height: 417rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
	}
}

.bg_color > image {
	width: 100%;
	height: 100%;
}

.up_margin {
	margin: auto;
	// margin-top: -84upx;
	width: 686upx;
	// height: 154upx;
	position: relative;
	background-color: #fff;
	z-index: 3;
	border-radius: 16upx;
}

.tui-msg-box {
	width: 686upx;
	margin: 0 auto;
	image {
		width: 160upx;
		height: 160upx;
	}
}

.tui-msg-pic {
	width: 120upx;
	height: 120upx;
	border-radius: 50%;
	// border: 1px solid #fff;
	display: block;
	margin-right: 24upx;
}

.path_list {
	padding-top: 0;
	position: relative;
	z-index: 999;
	width: 686upx;
	margin: auto;
	border-radius: 16upx;
	margin-top: 60upx;
	// padding-bottom: 100upx;
	margin-bottom: 140upx;
	background-color: #fff;

	.text-grey {
		font-size: 30rpx;
	}
}

.worktime-tab {
	text-align: center;
	.worktime-tab-item {
		width: 100%;
		height: 72upx;
	}
	.current-tab {
		border-bottom: 3px solid #50aeff;
		color: #50aeff;
		padding-bottom: 10upx;
		.current-tab-font {
			font-weight: 700;
		}
	}
}
</style>
