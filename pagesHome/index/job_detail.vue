<template>
	<view class="brt_e">
		<!-- #ifdef APP-PLUS -->
		<view class="flex align-center bg-white justify-between plr15 topBar ptb10"
			:style="[{ paddingTop: StatusBar + 'px',height:CustomBar+'px' }]">
			<view class=""><text class="cuIcon-back " @click.stop="back"></text></view>
			<view>详情</view>
			<view class="">
			</view>
		</view>
		<!-- #endif -->
		<!-- 公司信息 -->
		<view class="plr15">
			<view class=" bg-white ptb20 radius-20 flex align-start between ">
				<view class="flex mb10  around" style="height: 100%;">
					<view class="shop_img flex_shrink" v-if="plant_detail.image">
						<image :src="plant_detail.image" mode="" class=" mr10 "></image>
					</view>
					<view class="flex column justify-around" style="height: 100%;">
						<view class="f34 gray3 bold ewrap mb5" style="color: #111111;">
							{{ plant_detail.company_name||'' }}
						</view>
						<view class="theme_blue text-sm" v-if="voucher==0">已向平台支付保证金{{plant_detail.money||0}}元！</view>
					</view>
				</view>
				<view class="flex   ml20  column justify-around " @click="follow" style="height: 100%;"
					v-if="isFollow!='zhaopin'">
					<text
						class="theme_tag flex align-center justify-center txt-theme">{{followStatus? '已收藏' : '收藏' }}</text>
				</view>
			</view>
			<!-- banner图 -->
			<view class="banner mt20">
				<swiper class="screen-swiper" :indicator-dots="true" :circular="true" :autoplay="true" interval="2000"
					duration="500" style="height: 400rpx;">
					<swiper-item v-if="plant_detail.video_url != ''&&plant_detail.video_url != null"
						@tap="toPage(plant_detail.video_url)">
						<view class="flex alcenter justify-center" style="position: relative;height: 500rpx;">
							<image :src="plant_detail.video_url_img" mode="aspectFill" class="video_image"></image>
							<view class="play_tag flex justify-center alcenter">
								<text class="f64  cuIcon-playfill"></text>
							</view>
						</view>
					</swiper-item>
					<swiper-item v-for="(item, index) in plant_detail.ad_images" :key="index" style="height: 400rpx;"
						@tap='yulan(item,index)'>
						<image :src="item" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- end -->
			<view class="mtb20 flex justify-between align-center" @tap="getPosition">
				<view class="gray9 text-df">
					<text class="lg text-gray cuIcon-location"></text>
					<text class="">{{ plant_detail.company_address||'' }}</text>
				</view>
				<text class="lg text-gray cuIcon-right tr"></text>
			</view>
			<!-- 公司介绍 -->
			<view class=" mt20">
				<view class="mt20  pb20">
					<view class="flex align-center justify-between">
						<view class="f36 bold mr30 titItem" @tap='tabIndex(index)' v-for="(item,index) in sortList"
							:class="current==index?'text-black':' text-gray'" :key='index'>{{item.name||''}}</view>
					</view>
					<view class="pt10" v-if="current==0">
						<view v-show="plant_detail.content != ''" :class="is_show_all ? '' : 'overflow-three'"
							style="line-height: 2;text-indent: 2em;word-wrap:break-word;word-break:break-all;"
							class="f28 gray6">
							<!-- <jyf-parser :html="plant_detail.content" ref="article"></jyf-parser> -->
							<view v-html="plant_detail.content"></view>
						</view>
						<view class="mb10">
							<view class="f30 gray6 mb5"
								v-if="plant_detail.driver_name!=''&&plant_detail.driver_phone!=''">
								{{ plant_detail.driver_name||'' }}：
								<text style="color: #007AFF;" @tap="call(plant_detail.driver_phone)"
									selectable="true">{{ plant_detail.driver_phone|filterMobile }}</text>
							</view>
							<view class="f30 gray6 mb5"
								v-if="plant_detail.resident_manager_name!=''&&plant_detail.resident_manager_phone!=''">
								{{ plant_detail.resident_manager_name||'' }}：
								<text style="color: #007AFF;" @tap="call(plant_detail.resident_manager_phone)"
									selectable="true">{{ plant_detail.resident_manager_phone|filterMobile }}</text>
							</view>
							<view class="f30 gray6"
								v-if="plant_detail.finance_manager_name!=''&&plant_detail.finance_manager_phone!=''">
								{{ plant_detail.finance_manager_name||'' }}：
								<text style="color: #007AFF;" @tap="call(plant_detail.finance_manager_phone)"
									selectable="true">{{ plant_detail.finance_manager_phone |filterMobile}}</text>
							</view>
						</view>
						<text v-if="plant_detail.content == ''">暂无相关描述</text>
						<view class="flex justify-center align-center" @tap="is_show_all = !is_show_all"
							v-if="plant_detail.content != ''">
							<text class="cuIcon-fold text-df " v-if="is_show_all"></text>
							<text class="cuIcon-unfold text-sm " v-else></text>
						</view>
					</view>
					<view class="pt10" v-if="current==1">
						<noticeCompontents :companyId='plant_detail.aid'></noticeCompontents>
					</view>
					<view class="pt10" v-if="current==2">
						<albumCompontents :companyId='plant_detail.aid'></albumCompontents>
					</view>
					<view class="pt10" v-if="current==3">
						<!-- <view class="inputBox flex align-center justify-between plr15">
							<input type="text" value="" placeholder="请输入本人身份证号" v-model="virtrue"
								placeholder-style="color:#bfbfbf;font-size:28rpx;" />
							<text class="f28" @click="seachData">搜索</text>
						</view> -->
						<view class="" v-if="salaryList!=''">
							<block v-for="(item,index) in salaryList" :key="index">
								<view class="shadow radius_16 mt10 padding" @tap='toDetail(item)'>
									<view class="flex align-center justify-between">
										<text class=" f28 text-666">入职公司：{{item.company_name||''}}</text>
										<text class=" f28 text-666">{{item.month||''}}月份</text>
									</view>
									<view class=" flex align-center justify-between pt10">
										<text class=" f32 bold ewrap overflow-one">{{item.name||''}}</text>
										<text class=" f28 text-666 ewrap overflow-one">{{item.gender||''}}</text>
										<text class=" f28 text-666 ewrap overflow-one">{{item.id_number||''}}</text>
									</view>
									<view class=" flex align-center  pt10">
										<text class=" f28  ewrap overflow-one">手机号：</text>
										<text class=" f28 text-666 ewrap overflow-one">{{item.moble||''}}</text>
									</view>
									<view class="ptb15 flex align-center bold">
										<text class=" f32 ">应发工资：{{item.wages_payable||''}}</text>
										<text class=" f32  plr10">实发工资：{{item.net_salary||''}}</text>
									</view>
									<view class="flex align-center justify-end" style="color:#1B90FF ;">
										<text class=" f28 ">查看详情</text>
										<text class=" f28 text-666 cuIcon-right pl5"></text>
									</view>
								</view>
							</block>
						</view>
						<view class=" plr15 pt10 te-c" v-if="isSearch"> 暂无您的工资单 </view>
					</view>
				</view>
			</view>
		</view>
		<view class="line_cut"></view>
		<view class="padding">
			<view class="text-bold ">招聘职位</view>
			<!-- <mescroll-uni ref="mescrollRef" :top="(tag!=''?194:114) + CustomBar*2" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :fixed="true"> -->
			<view class="flex justify-start padding-tb " v-for="(item, index) in lisdata" :key="index"
				@tap="godetail(item.aid)">
				<view class="bg_img">
					<image :src="item.image || IMG_URL + 'static/miniwechat/head_null.png'" mode="aspectFill"></image>
				</view>
				<view class="" style="flex: 1;">
					<view class="flex justify-between align-center" style="margin-bottom: 10upx;">
						<view class="text-left  " style="font-size: 12px;">
							<view class="text-bold " style="font-size: 32upx;margin-bottom: 10upx;">
								{{ item.name||'暂无' }}
							</view>
							<view class="txt_red text-sm">{{ item.min_salary }}~{{item.max_salary}}元/月</view>
							<view class="txt_red text-sm" v-show="item.min_salary==''&&item.max_salary==''">未设置</view>
						</view>
						<view class="returnBox flex column around  alcenter" style="flex-shrink: 0;"
							v-if="item.fan_price!=''">
							<text class="f28 top_blue tc">{{ item.fan_type || '无' }}</text>
							<text class="f28 normal_red ellipsis tc bold plr5"
								style="width: 100%;">{{ item.fan_price || 0 }}元</text>
						</view>
					</view>
					<view class="flex  align-center flex-wrap justify-between">
						<view class="flex  align-center flex-wrap " style="width: 80%;">
							<view class="text-sm mr5" style="color: #1B90FF;" v-for="(itm,index) in item.welfare"
								:key='index'>{{ itm }}</view>
						</view>
						<view class="text-right text-sm text-red" @click.stop="lookService(item)"
							v-if="item.server_price!=''">门店情报</view>
					</view>					
				</view>
			</view>
			<view class="mt10" v-show="lisdata==''">
				暂无职位信息
			</view>
			<!-- </mescroll-uni> -->
		</view>
		<uni-popup type="center" ref="isShow" :bordeRadius="'0'">
			<view class="bg-white">门店劳务报酬服务费：{{server_price||''}}</view>
		</uni-popup>
	</view>
</template>
<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import albumCompontents from '@/pagesHome/conpoments/album_components.vue'
	import noticeCompontents from '@/pagesHome/conpoments/notice_components.vue'
	import jyfParser from "@/components/jyf-parser/jyf-parser.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			albumCompontents,
			noticeCompontents,
			jyfParser

		},
		data() {
			return {
				is_show_all: false, //企业介绍展开
				detail: {
					company_id: '',
					describe: '而文化广播'
				},
				IMG_URL:this.IMG_URL,
				isShow: false, //是否展示服务费
				isSearch: false, //是否搜索工资单
				isFollow: '', //是否显示关注  招聘端不显示
				longitude: '', //经度
				latitude: '', //纬度
				aid: '', //公司id
				salaryList: [], //工资列表
				isopen: true, //跳转页面
				CustomBar: this.CustomBar, //兼容小程序
				plant_detail: '', //详情
				followStatus: false, //关注状态
				lisdata: [], // 列表数组
				virtrue: '', //搜索框内容
				lon: '', //公司地址经度
				lat: '', //公司地址纬度
				current: 0, //选择分类
				pageOpen: '', //是否从引导页跳过来的
				sortList: [{
					name: '公司介绍',
					id: 0
				}, {
					name: '最新通知',
					id: 1
				}, {
					name: '相册',
					id: 2
				}, {
					name: '工资查询',
					id: 3
				}],
				server_price: '', //单个门店服务费
				voucher: '', //是否开启支付
				mobile: '', //查询工资的手机号
				code: '', //查询工资的验证码
			};
		},
		onLoad(e) {
			uni.showLoading({})
			let url = decodeURIComponent(e.q);
			if (url != 'undefined') {
				let index = url.lastIndexOf('/id/');
				let str = url.substring(index + 4, url.length);
				let strArr = str.split('_');
				this.aid = strArr[1];
			} else {
				this.aid = e.id;
			}
			this.pageOpen = e.page
			this.detail = uni.getStorageSync('job_detail');
			// this.aid = e.id;
			// this.lon = e.lon
			// this.lat = e.lat
			this.followStatus = e.follow || false //收藏状态			
			this.isFollow = e.zhaopin
			this.$Common.getLocation(e => {
				//获取经纬度
				this.longitude = e.longitude;
				this.latitude = e.latitude;
				this.$nextTick(() => {
					this.get_detail();
				});
			});
			this.get_plant_type()
			uni.$on('phoneCode', data => {
				// 获取手机号验证码
				this.mobile = data.mobile
				this.code = data.code
				this.getSaraly()
			})
		},

		onShow() {},
		// 微信小程序右上角分享
		onShareAppMessage() {
			let title = this.plant_detail.company_name || '人人保障网-公司详情';
			let imageUrl = this.plant_detail.image || '/static/images/logo.png';
			let path = 'pagesHome/index/job_detail?id=' + this.aid + '&lon=' + this.plant_detail.lon + '&lat=' + this.plant_detail.lat + '&follow=' + this.plant_detail.is_collection;
			return {
				title,
				imageUrl,
				path
			};
		},
		// 转发至朋友圈
		onShareTimeline() {
			let title = this.plant_detail.company_name || '人人保障网-公司详情';
			let imageUrl = this.plant_detail.image || '/static/images/logo.png';
			let path = 'id=' + this.aid + '&lon=' + this.plant_detail.lon + '&lat=' + this.plant_detail.lat + '&follow=' + this.plant_detail.is_collection;
			return {
				title,
				imageUrl,
				query: path
			};
		},
		onUnload() {
			uni.removeStorageSync('job_detail');
		},
		methods: {
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			seachData() { //搜索工资
				if (!uni.getStorageSync('userToken')) {
					return this.$Common.toast('登录之后才可以查询哦')
				}
				if (this.virtrue == '') {
					this.$Common.toast('请输入身份证号')
					return
				}
				if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.virtrue)) {
					this.$Common.toast('请输入正确的身份证号')
					return
				}
				// this.getSaraly()
			},
			toDetail(item) { //去工资详情
				uni.navigateTo({
					url: 'salary_detail?aid=' + item.aid
				})
			},
			getSaraly() { //获取工资列表
				this.$Request
					.post(this.$api.company.salaryList, {
						keyword: this.virtrue || '',
						company_id: this.plant_detail.aid || 0,
						code: this.code, //验证码
						moble: this.mobile, //手机号
					})
					.then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							this.salaryList = res.data.data
							if (res.data.data == '') {
								this.isSearch = true
							}
						} else {

						}
					}).catch((err) => {
						this.$Common.toast('网络错误，请稍后重试')
					})
			},
			back() {
				if (this.pageOpen == 'open') {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				} else {
					uni.navigateBack();
				}
			},
			// 获取岗位详情
			get_detail() {
				if (this.aid == '') {
					return
				}
				this.$Request
					.post(this.$api.user.companyData, {
						aid: this.aid || 0,
						longitude: this.longitude,
						latitude: this.latitude,
						user_id: uni.getStorageSync('USERINFO').id || 0
					})
					.then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							this.plant_detail = res.data;
							this.selectPhoneNumber(res.data.content) //匹配电话
							if (res.data.driver_name == 0 || res.data.driver_name == null) {
								this.plant_detail.driver_name = '';
							}
							if (res.data.finance_manager_name == 0 || res.data.finance_manager_name == null) {
								this.plant_detail.finance_manager_name = '';
							}
							if (res.data.resident_manager_name == 0 || res.data.resident_manager_name == null) {
								this.plant_detail.resident_manager_name = '';
							}
							if (res.data.driver_phone == 0 || res.data.driver_name == null) {
								this.plant_detail.driver_phone = '';
							}
							if (res.data.finance_manager_phone == 0 || res.data.finance_manager_phone == null) {
								this.plant_detail.finance_manager_phone = '';
							}
							if (res.data.resident_manager_phone == 0 || res.data.resident_manager_phone == null) {
								this.plant_detail.resident_manager_phone = '';
							}
							this.lisdata = res.data.job_list
							if (res.data.is_collection == 1) {
								this.followStatus = true
							} else {
								this.followStatus = false
							}
							res.data.job_list.map(item => {
								item.isShow = false
							})
							// console.log(this.followStatus);
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					});
			},
			yulan(pic, index) {
				this.$Common.lookImg(this.plant_detail.ad_images, index)
			},
			selectPhoneNumber(str) {
				var regx = /(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})/g;
				var phoneNums = str.match(regx);
				if (phoneNums) {
					for (var i = 0; i < phoneNums.length; i++) {
						var temp = phoneNums[i]
						str = str.replace(phoneNums[i], '<a href="tel:' + temp +
							'" style=" text-decoration: underline;color: #2878FF;">' +
							temp + '</a>');
					}
				}
				return str;
			},
			// 查看门店情报
			lookService(item) {
				if (item.is_servicebroker == 1) {
					this.$refs.isShow && this.$refs.isShow.open();
					this.server_price = item.server_price
				} else {
					this.$Common.toast('门店服务经纪人才可查看')
				}
			},
			getPosition() {
				//位置详情
				let that = this;
				uni.openLocation({
					latitude: Number(this.plant_detail.lat),
					longitude: Number(this.plant_detail.lon),
					name: that.plant_detail.company_address,
					// address: that.plant_detail.company_address,
					success: function(res) {},
					fail(err) {}
				});
			},
			call(phone) {
				//拨打电话
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			copy(body) {
				//复制文字到剪切板
				uni.setClipboardData({
					data: body,
					success: function() {
						this.$Common.toast('复制成功');
					}
				});
			},
			follow() {
				//关注
				this.$Request
					.post(this.$api.company.set_collection, {
						collect_id: this.aid,
						type: 1,
					})
					.then(res => {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						if (res.code == 1) {
							this.followStatus = !this.followStatus;
							uni.$emit('myCollect', {})
							uni.$emit('follow', {
								msg: this.followStatus
							})
						} else {}
					});
			},
			tabIndex(index) { //点击选择分类
				this.current = index
				if (index == 3) {
					if (!uni.getStorageSync('userToken')) {
						return this.$Common.toast('登录之后才可以查询哦')
					}
					if (this.isopen == false) {
						return;
					}
					this.isopen = false;
					setTimeout(() => {
						this.isopen = true;
					}, 1500);
					uni.navigateTo({
						url: 'code_check'
					})
					this.isSearch = false
					// this.virtrue = ''
					// this.salaryList = []
				}
			},
			toPage() {
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: '../../pagescenter/zhaopinzhe/play_video?url=' + this.plant_detail.video_url || '',
				});
				// const userInfo = uni.getStorageSync('USERINFO');
				// if (this.isopen == false) {
				// 	return;
				// };
				// this.isopen = false;
				// setTimeout(() => {
				// 	this.isopen = true
				// }, 1500);
				// if (!userInfo) {
				// 	// #ifndef MP-WEIXIN
				// 	uni.navigateTo({
				// 		url: "../login/login"
				// 	});
				// 	// #endif

				// 	// #ifdef MP-WEIXIN
				// 	uni.navigateTo({
				// 		url: '/pagessignup/wechat/wxlog'
				// 	});
				// 	// #endif

				// } else {
				// 	uni.navigateTo({
				// 		url: '../../pagescenter/zhaopinzhe/play_video?url=' + this.plant_detail.video_url,
				// 	});
				// }
			},
			godetail(aid) {
				//跳转职位详情
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
						url: 'plant_detail?id=' + aid + '&longitude=' + e.longitude + '&latitude=' + e
							.latitude
					});
				})

			}
		},
		// 手机号加密处理
		filters: {
			filterMobile(val) {
				if (!val) return '';
				return val.substr(0, 3) + '****' + val.substr(-4);
			}
		},
	};
</script>
<style lang="scss">
	page {
		background: #fff;
	}

	.banner {
		width: 686upx;
		height: 386upx;
		position: relative;
		margin: auto;
	}

	.banner_img {
		width: 100%;
		display: block;
		background-color: #F7F7F7;
		height: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.downImg {
		width: 30rpx;
		height: 24rpx;
	}

	.inputBox {
		width: 686rpx;
		height: 72rpx;
		border-radius: 34rpx;
		box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04);
		border: 1px solid #EEEEEE;
		margin: auto;
	}

	.shadow {
		box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04);
	}

	.video_image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 10;
	}

	.cuIcon-playfill {
		z-index: 100;
	}

	.bg_img {
		width: 106upx;
		height: 106upx;
		margin-right: 20upx;
		background-color: #eeeeee;

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
		border-radius: 4rpx;
		box-sizing: border-box;

		.top_blue {
			height: 50%;
			background-color: #50aeff;
			margin-top: -3upx;
			color: #ffffff;
			width: 100%;
		}
	}

	.box_sort {
		width: 97upx;
		height: 90upx;
		border: 1px solid #cccccc;
		text-align: center;
		line-height: 45upx;

		view {
			font-size: 12px;
		}
	}

	.titItem:nth-child(4) {
		margin-right: 0;
	}

	.save {
		position: absolute;
		right: 0rpx;
		bottom: -24rpx;
		width: 170rpx;
		height: 50rpx;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 28rpx;
	}

	.shop_img {
		width: 106upx;
		height: 106upx;
		background-color: #f7f7f7;
		margin-right: 18upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.theme_tag {
		width: 120upx;
		height: 64upx;
		border: 1px solid #1b90ff;
		color: #1b90ff;
		border-radius: 32upx;
		font-size: 28upx;
	}

	button {
		border-radius: 0;
	}

	button:after {
		border: none;
	}
</style>
