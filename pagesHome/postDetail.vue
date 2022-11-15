<template>
	<!-- 招聘端职位详情 -->
	<view class="">
		<!-- 导航栏end -->
		<view class="">
			<!-- 导航栏 -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="flex align-center bg-white justify-between plr15 topBar ptb10 " :style="[{ paddingTop: StatusBar + 'px',height:CustomBar+'px' }]">
				<view class=""><text class="cuIcon-back " @click.stop="back"></text></view>
				<view>详情</view>
				<view class="">
					<view class="share" v-if="openstatus == 1">
						<image class="share" :src="IMG_URL + 'static/miniwechat/new/share_black.png'" mode="aspectFill" @tap="share"></image>
					</view>
				</view>
			</view>
			<!-- 	<view class="flex align-center justify-between plr20 topBar ptb10" :class="topDistance > 0 ? 'bg_theme' : ''"
			 :style="[{ paddingTop: StatusBar + 'px' }]">
				<view class=""><text class="cuIcon-back " @click.stop="back"></text></view>
				<view>
					<view class="share">
						<image class="share" :src="IMG_URL + 'static/miniwechat/share.png'" mode="aspectFill" @tap="share"></image>
					</view>
				</view>
			</view> -->
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="" :style="[{ marginTop: CustomBar + 'px' }]">
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="">
					<!-- #endif -->
					<!-- banner图 -->
					<view class="mb20 flex justify-center banner" v-if="plant_detail.video != ''||plant_detail.ads_imgas != ''||plant_detail.image != ''">
						<!-- banner图 -->
						<swiper class="screen-swiper" :class="dotStyle ? 'square-dot' : 'round-dot'" :indicator-dots="true" :circular="false"
						 :autoplay="false" interval="5000" duration="500" style="width: 100%;height: 700upx;" v-if="plant_detail.video != ''||plant_detail.ads_imgas != ''">
							<swiper-item v-if="plant_detail.video != ''" @tap="toPage('../pagescenter/zhaopinzhe/play_video?url=' + plant_detail.video)">
								<view class="flex alcenter justify-center" style="position: relative;height: 700rpx;">
									<image :src="plant_detail.video_id && plant_detail.video_id" mode="aspectFill" class="video_image"></image>
									<view class="play_tag flex justify-center alcenter">
										<!-- <text class="f64  cuIcon-playfill"></text> -->
										<image class="" :src="IMG_URL + 'static/miniwechat/play.png'" mode="aspectFill"></image>
									</view>
								</view>
							</swiper-item>
							<swiper-item v-for="(item, index) in plant_detail.ads_imgas" :key="index" @tap="yulan(plant_detail.ads_imgas,index)" style="height: 440rpx;">
								<image :src="item.url || IMG_URL + 'static/miniwechat/toppic.png'" mode="aspectFill"></image>
							</swiper-item>							
						</swiper>
						<image :src="plant_detail.image[0].url" mode="aspectFill"
							v-if="plant_detail.ads_imgas==''&&plant_detail.video==''&&plant_detail.image!=''"
							style="width: 100%;height: 700upx; background-color: #F7F7F7;"
							@tap='yulan(plant_detail.image,1)'></image>
						
					</view>
				</view>
				<!-- 招聘信息 -->
				<view class="brb_e pb20 flex column plr10 mt20">
					<view class="flex between">
						<view class="mr5">
							<view class="f40 gray3 bold">{{ plant_detail.name || '----' }}</view>
							<view class="flex align-center f28 flex-wrap" style="color: #6B6E77;">
								<text class="text_line1">{{ plant_detail.city || '---' }}</text>
								<text class="mlr10">{{ plant_detail.experience || '---' }}</text>
								<text class="">{{ plant_detail.education_name || '---' }}</text>
								<text class="ml10">{{ plant_detail.age || '---' }}周岁</text>
							</view>
						</view>
						<!-- 工价 -->
						<view class="returnBox flex column around  alcenter" style="flex-shrink: 0;" v-if="plant_detail.fan_price!=''">
							<text class="f28 top_blue tc">{{ plant_detail.fan_type || '无' }}</text>
							<text class="f28 normal_red ellipsis tc bold plr5" style="width: 100%;">{{ plant_detail.fan_price || 0 }}元</text>
						</view>
					</view>
					<view class="flex alcenter between">
						<text class="normal_red text-lg money">{{ plant_detail.min_salary || '--' }}~{{ plant_detail.max_salary || '--' }}元/月</text>
						<view class="tc ellipsis" style="width: 160rpx; flex-shrink: 0;">
							<text class="text-df gray6  tc mt10">已报名 {{ plant_detail.apply_numbers || 0 }}人</text>
						</view>
					</view>
					<view class="text-sm gray6">
						<text class="cu-tag  label_item" v-for="(itm, index) in plant_detail.welfare_id" :key="index" v-if="plant_detail.welfare != ''">{{ itm.welfare_name }}</text>
						<text class="cu-tag  label_item" v-if="plant_detail.welfare_id == ''">暂无相关福利信息</text>
					</view>
				</view>
				<!-- end -->
				<view class="plr15 padding-top text-df" v-if="plant_detail.server_price!=''">
					门店劳务报酬服务费：{{plant_detail.server_price}}
				</view>
				<!-- 新增 补贴内容 -->
				<view class="padding" v-if="plant_detail.factory_pay||plant_detail.subsidy||plant_detail.subsidy_remarks||plant_detail.car_subsidy||plant_detail.receiving_subsidy_date">
					<view class="mb5" v-if="plant_detail.factory_pay">
						<text class=" f28">厂发薪资</text>
						<text class="f28 padding-left-sm new_theme">{{plant_detail.factory_pay||'暂无内容'}}</text>
					</view>
					<view class="mb5" v-if="plant_detail.subsidy">
						<text class=" f28 ">补贴</text>
						<text class="f28 padding-left-sm new_theme">{{plant_detail.subsidy||'暂无补贴信息'}}</text>
					</view>
					<view class="plr15 ptb10 mb5 radius-16" v-if="plant_detail.subsidy_remarks" style="background-color: #FFF5E3;">
						<text class=" f28">备注</text>
						<text class="f28 padding-left-sm new_theme">{{plant_detail.subsidy_remarks||'暂无备注信息'}}</text>
					</view>
					<view class="mb5" v-if="plant_detail.car_subsidy">
						<text class=" f28">车补</text>
						<text class="f28 padding-left-sm new_theme">{{plant_detail.car_subsidy||'暂无车补信息'}}</text>
					</view>
					<view class="" v-if="plant_detail.receiving_subsidy_date">
						<text class=" f28">拿补贴日期</text>
						<text class="f28 padding-left-sm new_theme">{{plant_detail.receiving_subsidy_date||'暂无补贴信息'}}</text>
					</view>					
				</view>
				<view class="bg-f2f3"></view>
				<!-- 公司信息 -->
				<view class=" bg-white ptb10 radius-20 flex align-start  plr10" @tap="godetail(companyInfo.aid)">
					<view class="  ">
						<view class="shop_img" style="flex-shrink: 0;">
							<image :src="companyInfo.image" mode="aspectFill" class=" mr10 "></image>
						</view>
					</view>
					<view class="flex align-center justify-between" style="width: 100%;">
						<view class="flex column justify-around">
							<view class="f34 gray3 bold text_line2" style="color: #111111; word-wrap:break-word;word-break:break-all">{{ companyInfo.company_name }}</view>
							<view class="theme_blue text-sm" v-if="voucher==0">已向平台支付保证金{{ plant_detail.money||0 }}元！</view>
							<view class="gray9 text-sm">
								<text class="lg text-gray cuIcon-location"></text>
								<text class="">{{ companyInfo.company_address||'---' }}</text>
							</view>
						</view>
						<view class="flex   ml20  column justify-around " style="position: relative;">
							<text class="lg text-gray cuIcon-right tr next"></text>
							<!-- <text class="theme_tag flex align-center justify-center text-white f28" @tap.stop='follow'>{{is_collection==0?'关注':'已关注'}}</text> -->
						</view>
					</view>
				</view>
				<view class="line_cut"></view>
				<view class="mt20 brb_e pb10 plr15" v-if="plant_detail.salary_description!=''&&plant_detail.station_type==1">
					<view class="location gray3 bold text-lg">薪资说明</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						<!-- #ifndef MP-WEIXIN -->
						<rich-text :nodes="plant_detail.salary_description"></rich-text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<jyf-parser :html='plant_detail.salary_description'></jyf-parser>
						<!-- #endif -->
					</view>
				</view>
				<view class="mt20 brb_e pb10 plr15" v-if="plant_detail.salary_description!=''&&plant_detail.station_type==3">
					<view class="location gray3 bold text-lg">职位描述</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						<!-- #ifndef MP-WEIXIN -->
						<rich-text :nodes="plant_detail.salary_description"></rich-text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<jyf-parser :html='plant_detail.salary_description'></jyf-parser>
						<!-- #endif -->
					</view>
				</view>
				<view class="mt20 brb_e pb10 plr15" v-if="plant_detail.accommodation_introduction!=''&&plant_detail.station_type==1">
					<view class="location gray3 bold text-lg">食宿介绍</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						<!-- #ifndef MP-WEIXIN -->
						<!-- <text v-html="plant_detail.accommodation_introduction"></text> -->
						<rich-text :nodes="plant_detail.accommodation_introduction"></rich-text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<!-- <mp-html :content="plant_detail.accommodation_introduction" /> -->
						<jyf-parser :html='plant_detail.accommodation_introduction'></jyf-parser>
						<!-- #endif -->
					</view>
				</view>
				<view class="mt20 brb_e pb10 plr15" v-if="plant_detail.employment_conditions!=''&&plant_detail.station_type==1">
					<view class="location gray3 bold text-lg">录用条件</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						<!-- #ifndef MP-WEIXIN -->
						<!-- <text v-html="plant_detail.employment_conditions"></text> -->
						<rich-text :nodes="plant_detail.employment_conditions"></rich-text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<!-- <mp-html :content="plant_detail.employment_conditions" /> -->
						<jyf-parser :html='plant_detail.employment_conditions'></jyf-parser>
						<!-- #endif -->
					</view>
				</view>
				<view class="mt20 brb_e pb10 plr15" v-if="plant_detail.job_description!=''&&plant_detail.station_type==1">
					<view class="location gray3 bold text-lg">岗位介绍</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						<!-- #ifndef MP-WEIXIN -->
						<!-- <text v-html="plant_detail.job_description "></text> -->
						<rich-text :nodes="plant_detail.job_description"></rich-text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<!-- <mp-html :content="plant_detail.job_description" /> -->
						<jyf-parser :html='plant_detail.job_description'></jyf-parser>
						<!-- #endif -->
					</view>
				</view>

				<view class="mt20 brb_e pb10 plr15" v-if="plant_detail.enterprise_introduction!=''&&plant_detail.station_type==1">
					<view class="location gray3 bold text-lg">企业介绍</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						<!-- #ifndef MP-WEIXIN -->
						<!-- <text v-html="plant_detail.enterprise_introduction"></text> -->
						<rich-text :nodes="plant_detail.enterprise_introduction"></rich-text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<!-- <mp-html :content="plant_detail.enterprise_introduction" /> -->
						<jyf-parser :html='plant_detail.enterprise_introduction'></jyf-parser>
						<!-- #endif -->
					</view>
				</view>
				<view class="mb10 padding-lr pt10" v-if="plant_detail.station_type!=3">
					<view class="f30 gray6 mb5" v-if="plant_detail.driver_name!=''&&plant_detail.driver_phone!=''">
						{{ plant_detail.driver_name||'' }}：
						<text style="color: #007AFF;" @tap="call(plant_detail.driver_phone)" selectable="true">{{ plant_detail.driver_phone||'' }}</text>
					</view>
					<view class="f30 gray6 mb5" v-if="plant_detail.resident_manager_name!=''&&plant_detail.resident_manager_phone!=''">
						{{ plant_detail.resident_manager_name||'' }}：
						<text style="color: #007AFF;" @tap="call(plant_detail.resident_manager_phone)" selectable="true">{{ plant_detail.resident_manager_phone||'' }}</text>
					</view>
					<view class="f30 gray6" v-if="plant_detail.finance_manager_name!=''&&plant_detail.finance_manager_phone!=''">
						{{ plant_detail.finance_manager_name||'' }}：
						<text style="color: #007AFF;" @tap="call(plant_detail.finance_manager_phone)" selectable="true">{{ plant_detail.finance_manager_phone ||''}}</text>
					</view>
				</view>
				<view class=" " v-if="plant_detail.station_type==3">
					<view class="f30 gray6 mb5 mb10 padding-lr pt10" v-if="plant_detail.driver_phone!=''">
						招聘电话：
						<text style="color: #007AFF;" @tap="call(plant_detail.driver_phone)" selectable="true">{{ plant_detail.driver_phone||'' }}</text>
					</view>
				</view>
				<!-- end -->
				<view class="line_cut"></view>
				<!-- 地图 -->
				<view class="mt20 brb_e plr10" style="padding-bottom: 120rpx;">
					<view class="location gray3 bold text-lg">工作地点</view>
					<view class="flex between mtb10">
						<text class="gray3 text-df bold">{{ plant_detail.city || '暂无地址' }}</text>
						<text class="gray9 text-sm ml10" style="flex-shrink: 0;">距离我{{ companyInfo.distance || '0' }}公里</text>
					</view>
					<view class="flex  justify-between">
						<text class="gray6 	text-df">详细地址：{{ plant_detail.address || '暂无详细地址' }}</text>
						<text class="gray6 	text-df"></text>
						<view class="mb10 ml10" @tap="choose_location" v-show="mapShow">
							<image :src="IMG_URL + 'static/miniwechat/map.png'" mode="aspectFill" class="mapImg"></image>
						</view>
					</view>
				</view>
				<!-- end -->
				<view class="fixed flex align-center">
					<view class="edit" @tap="editPost">编辑</view>
					<view class="open" @tap="openPost">{{ openstatus == 0 ? '开启职位' : '关闭职位' }}</view>
				</view>
			</view>
			<uni-popup type="bottom" ref="shareType">
				<view class="bg-white ptb20" style="border-radius: 20upx 20upx 0 0;">
					<view class="text-bold text-md text-center mb30 posRelt">
						分享
						<view class="icon_x" @tap="close">X</view>
					</view>
					<view class="flex justify-around align-center">
						<view class="pictype" @tap="wefriend">
							<image :src="IMG_URL + 'static/miniwechat/weixin.png'" mode="aspectFill"></image>
							<view class="text-df">微信好友</view>
						</view>
						<view class="pictype" @tap="wecircle">
							<image :src="IMG_URL + 'static/miniwechat/pengyouquan.png'" mode="aspectFill"></image>
							<view class="text-df">朋友圈</view>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
</template>
<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import jyfParser from '@/components/jyf-parser/jyf-parser';
	export default {
		components: {
			uniNavBar,
			jyfParser
		},
		data() {
			return {
				dotStyle: true,
				StatusBar: this.StatusBar,
				title: '',
				like: false, //收藏按钮
				aid: 9,
				open: '', //文字开启关闭状态
				openstatus: 0, //开启关闭状态
				longitude: '', //经度
				latitude: '', //纬度
				IMG_URL:this.IMG_URL,
				plant_detail: '', //详情
				imgList: [], //轮播图
				topDistance: 0,
				inviteinfo: '', //分享链接
				companyInfo: '', //公司信息
				is_collection: 0, //是否关注
				mapShow: true, //是否显示地图
				covers: [{
					latitude: '',
					longitude: '',
					iconPath: '../static/images/iconPath.png',
					width: '30',
					height: '30'
				}],
				voucher: '', //是否开启支付
			};
		},
		onLoad(e) {
			uni.showLoading({});
			this.aid = e.aid;
			this.open = e.open //开启关闭状态
			this.$Common.getLocation(e => {
				//获取经纬度
				this.longitude = e.longitude;
				this.latitude = e.latitude;
				this.$nextTick(() => {
					this.get_detail();
				});
				uni.$on('update', data => {
					this.get_detail();
				});
			});

			if (e.open == '开启') {
				this.openstatus = 0;
			} else {
				this.openstatus = 1;
			}
			this.get_plant_type()
			this.$forceUpdate()
			// 编辑职位之后刷新详情
			uni.$on('updateList',()=>{
				this.get_detail();
			})
		},
		onShow() {
			this.$refs.shareType&&this.$refs.shareType.close();
		},
		onUnload() {
			uni.$off('follow');
			uni.$off('update');
			this.$refs.shareType.close();
		},
		onPageScroll(e) {
			this.topDistance = e.scrollTop;
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.plant_detail.name + ' ' + this.plant_detail.min_salary + '-' + this.plant_detail.max_salary + '/月'+' '+this.plant_detail.fan_price+'/'+this.plant_detail.fan_type,
				path: 'pagesHome/postDetail?aid=' + this.aid + '&open=' + this.open
			}
		},
		methods: {
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			// 获取岗位详情
			get_detail() {
				let _this = this
				this.$Request
					.post(_this.$api.company.positionInfo, {
						aid: _this.aid,
						longitude: _this.longitude,
						latitude: _this.latitude
					})
					.then(res => {
						uni.hideLoading();
						if (res.code == 1) {
							_this.plant_detail = res.data.job;
							// _this.plant_detail &&
							// 	_this.plant_detail.ads_imgas.map(item => {
							// 		_this.imgList.push(item.url);
							// 	});
							_this.companyInfo = res.data.job.company;
							_this.covers[0].latitude = Number(res.data.lat);
							_this.covers[0].longitude = Number(res.data.lon);
							// _this.is_collection=res.data.company.is_collection
							_this.get_shareUrl();
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					});
			},
			choose_location() {
				//跳转详细地图
				let that = this;
				uni.openLocation({
					latitude: Number(that.plant_detail.lat),
					longitude: Number(that.plant_detail.lon),
					name: that.plant_detail.address,
					// address: that.plant_detail.address,
					success: function(res) {
						// console.log(res, 2222222222);
					}
				});
			},
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			godetail(aid) {
				//跳转公司信息
				uni.navigateTo({
					url: 'index/job_detail?id=' + aid + '&lon=' + this.plant_detail.lon + '&lat=' + this.plant_detail.lat +
						'&zhaopin=zhaopin'
				});
			},
			// follow(){//关注
			// 	this.$Request.post(this.$api.company.set_collection,{
			// 		collect_id:this.aid,
			// 		type:1,
			// 	}).then(res => {
			// 		console.log(res,'');
			// 		uni.showToast({ title: res.msg, icon: 'none' });
			// 		if (res.code == 1) {
			// 			this.is_collection=res.data.is_collection
			// 		} else {

			// 		}
			// 	});
			// },
			share() {
				//分享
				// #ifdef MP-WEIXIN
				uni.showModal({
					title: '请使用右上角按钮进行分享',
					icon: 'none'
				})
				// #endif
				// #ifndef MP-WEIXIN
				this.$refs.shareType.open();
				// #endif
			},
			close() {
				this.$refs.shareType.close();
				// this.mapShow=true
			},
			get_shareUrl() {
				this.$Request.post(this.$api.user.get_invite).then(res => {
					if (res.code == 1) {
						this.inviteinfo = res.data;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
			back() {
				uni.navigateBack();
			},
			yulan(list,index) {
				let imgList = []
				list.map(item => {
					imgList.push(item.url);
				});
				this.$Common.lookImg(imgList, index);
			},
			wefriend() {
				//分享微信好友
				uni.share({
					provider: 'weixin',
					scene: 'WXSceneSession',
					type: 5,
					imageUrl: this.plant_detail.imgas_thumb + '?x-oss-process=style/compression',
					title: this.plant_detail.name + ' ' + this.plant_detail.min_salary + '-' + this.plant_detail.max_salary + '/月'+' '+this.plant_detail.fan_price+'/'+this.plant_detail.fan_type,
					miniProgram: {
						id: 'gh_66b0749ac265',
						path: 'pagesHome/index/plant_detail?id=' + this.aid,
						type: 0,
						webUrl: 'http://uniapp.dcloud.io'
					},
					success: ret => {
						console.log(JSON.stringify(ret));
					},
					fail: function(err) {
						this.$Common.toast('网络错误，请稍后再试')
					}
				});
			},
			wecircle() {
				//分享微信朋友圈
				uni.share({
					provider: 'weixin',
					scene: 'WXSenceTimeline',
					type: 0,
					href: 'https://app.chongdarenli.com/h5/#/pagesHome/index/plant_detail?id=' + this.aid,
					title: this.plant_detail.name + ' ' + this.plant_detail.min_salary + '-' + this.plant_detail.max_salary + '/月'+' '+this.plant_detail.fan_price+'/'+this.plant_detail.fan_type,
					summary: '我正在使用人民保障网，赶紧跟我一起来体验吧！',
					imageUrl: this.plant_detail.imgas_thumb + '?x-oss-process=style/compression',
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						this.$Common.toast('网络错误，请稍后再试')
					}
				});
			},
			toPage(page) {
				const userInfo = uni.getStorageSync('USERINFO');

				uni.navigateTo({
					url: page
				});
			},
			editPost() {
				//编辑职位
				uni.navigateTo({
					url: '../pagescenter/zhaopinzhe/bianji_zhiwei?aid=' + this.aid
				});
			},
			openPost() {
				//开启职位
				uni.showModal({
					title: '提示',
					content: this.openstatus == 0 ? '您确定要开启职位吗' : '您确定要关闭职位吗',
					success: res => {
						if (res.confirm == true) {
							this.$Request
								.post(this.$api.user.openPost, {
									aid: this.aid
								})
								.then(res => {
									if (res.code == 1) {
										this.$Common.toast(res.msg);
										uni.$emit('updateList', '更新列表');
										setTimeout(() => {
											uni.navigateBack({});
										}, 600);
									} else {
										this.$Common.toast(res.msg);
										setTimeout(() => {
											uni.navigateTo({
												url: '../pagescenter/zhaopinzhe/fabu?order_sn=' + res.data.order_sn + '&price=' + res.data.money
											});
										}, 600);
									}
								});
						}
					},
					fail: err => {
						this.$Common.toast('网络错误，请稍后重试');
					}
				});
			}
		}
	};
</script>
<style lang="scss">
	.mapImg {
		width: 334rpx;
		height: 188rpx;
	}

	.bg_theme {
		background: #50aeff;
	}

	.topBar {
		position: fixed;
		top: 0;
		z-index: 1000;
		width: 100%;
	}

	.theme_tag {
		width: 120rpx;
		height: 64rpx;
		background: rgba(80, 174, 255, 1);
		opacity: 1;
		border-radius: 32rpx;
	}

	.video_image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 10;
	}

	.play_tag {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 80upx;
		height: 80upx;
		right: 0;
		margin: auto;
		z-index: 100;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.cuIcon-playfill {
		z-index: 100;
	}

	.shop_img {
		width: 106rpx;
		background-color: #f7f7f7;
		margin-right: 16upx;
		height: 106rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.returnBox {
		min-width: 97rpx;
		height: 89rpx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(204, 204, 204, 1);
		opacity: 1;
		border-radius: 4rpx;

		.top_blue {
			height: 50%;
			background-color: #50aeff;
			color: #ffffff;
			width: 100%;
		}
	}

	page {
		background: #fff;
	}

	.like_select {
		color: #ff9e3e;
	}

	.fixed {
		position: fixed;
		bottom: 0;
		z-index: 99;
		left: 0;
		width: 100%;
		height: 100upx;
		font-size: 32upx;

		.edit {
			background-color: #e2f1ff;
			color: #1b90ff;
			width: 50%;
			text-align: center;
			line-height: 100upx;
		}

		.open {
			background-color: #1b90ff;
			color: #ffffff;
			text-align: center;
			line-height: 100upx;
			width: 50%;
		}
	}

	.hotImg {
		width: 32rpx;
		height: 40rpx;
	}

	.station_img {
		width: 128rpx;
		height: 128rpx;
	}

	.plant_top {
		border-radius: 12rpx;
		border: 1px solid #ff9e3e;
		height: 176rpx;
		margin-top: 20rpx;
	}

	.left_tody {
		margin-right: 50rpx;
		width: 80rpx;
		height: 100%;
		background: #ff9e3e;
		/* border-radius: 12rpx; */
	}

	.banner {
		/* width: 100%; */
		height: 700rpx;
	}

	.label_item {
		margin-top: 10rpx;
		margin-left: 0;
		margin-right: 10rpx;
		background-color: #50aeff !important;
		color: #ffffff;
	}

	.money {
		line-height: 80rpx;
		color: #f77858;
		font-weight: 800;
	}

	.location {
		position: relative;
		z-index: 99;
	}

	// .location::after{
	// 	content:"";
	// 	position: absolute;
	// 	left: 0;
	// 	bottom: 10rpx;
	// 	width:126rpx;
	// 	height:8rpx;
	// 	background:rgba(255,158,62,1);
	// 	z-index: -2;
	// }
	.share {
		width: 38upx;
		height: 38upx;
	}

	.pictype {
		image {
			width: 88upx;
			height: 88upx;
		}
	}

	.baozhang {
		background-color: #ffffff;
		font-size: 30upx;
		border-radius: 16upx;

		.btn_canbao {
			text-align: center;
			width: 320upx;
			height: 72upx;
			line-height: 2.2;
			border-radius: 100upx;
			color: #ffffff;
			background-color: #1b90ff;
			margin-top: 20upx;
		}
	}

	.icon_x {
		position: absolute;
		right: 40upx;
		top: 2upx;
	}

	.handle_footer {
		z-index: 99;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 90rpx;

		.sevirce_btn {
			background: #ffffff;
			width: 20%;
		}

		.btn {
			width: 40%;
			height: 100%;
		}

		image {
			width: 30rpx;
			height: 30rpx;
		}

		.phone_btn {
			background: #50aeff;
			color: #ffffff;
		}

		.apply_btn {
			background: #1b90ff;
			color: #fff;
		}
	}
</style>
