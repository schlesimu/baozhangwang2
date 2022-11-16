<template>
	<view class="bg-white" style="height: 100%;">
		<!-- 搜索框 -->
		<view class="flex align-center justify-center fixed" :style="[{ height: CustomBar + 'px' }]">
			<view class="flex search_box align-center plr15 between" :style="[{ top: StatusBar + 'px' }]">
				<view class="flex alcenter">
					<text class="lg  cuIcon-location"></text>
					<text
						class=" bold text-df nowrap mr10"
						@tap="toPage('/pagescommon/position?city=' + address + '&cityid=' + area_id + '&longitude=' + longitude + '&latitude=' + latitude + '&page=homePage')"
					>
						{{ address || '全国' }}
					</text>
					<view class="inputBox flex align-center padding">
						<text class="lg text-gray cuIcon-search"></text>
						<input
							type="text"
							value=""
							@tap="toPage('/pagescommon/news-search?stationType=' + companyType + '&activeTab=' + activeTab + '&city=' + city_name + '&cityid=' + area_id)"
							placeholder="搜索想找的职位/公司"
							disabled="true"
							placeholder-style="color:#999999;font-size:24rpx;"
						/>
					</view>
				</view>
			</view>
		</view>
		<!-- banner图 -->
		<view class="banner " style="height: 500upx;" :style="[{ top: StatusBar * 2 + 100 + 'rpx' }]" v-if="">
			<swiper
				class="screen-swiper"
				:class="dotStyle ? 'square-dot' : 'round-dot'"
				:indicator-dots="true"
				:circular="true"
				:autoplay="autoplay"
				interval="2000"
				duration="500"
				style="height: 500upx;"
				@change="swiperChange"
			>
				<swiper-item v-if="swiperVideo != ''">
					<view class="flex alcenter justify-center" style="position: relative;height: 500upx;">
						<view class="" v-if="isPlay && videoUrl" @click="setPlat" style="position: relative;width: 750rpx; height: 500upx;">
							<video
								:src="videoUrl"
								id="myVideo"
								style="width:100%;height: 100%;"
								v-if="videoUrl != ''"
								@fullscreenchange="fullscreenchange"
								@pause="videoPause"
								@play="videoPlay"
								:controls="controls"
								@ended="videoEnd"
							></video>
						</view>
						<view class="" v-else @tap="playVideo">
							<image :src="swiperVideo[0].thumb" mode="aspectFill" class="video_image" style="height: 500upx;"></image>
							<view class="play_tag flex justify-center alcenter"><image class="" :src="IMG_URL + 'static/miniwechat/play.png'" mode="aspectFill"></image></view>
						</view>
					</view>
				</swiper-item>
				<swiper-item v-for="(item, index) in swiperImage" :key="index" style="height: 500upx;" @tap="goOther(item)" v-if="swiperImage != ''">
					<image :src="item.thumb" mode="" style="height: 500upx;"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 走马灯 -->
		<view class="uni-margin-wrap" :style="[{ top: StatusBar * 2 + 100 + 'rpx' }]" v-if="noticeList.length">
			<!-- <swiper class="swiper" circular :indicator-dots="false" :autoplay="autoplayMarque" :interval="1" :duration="8000" easing-function="linear">
				<swiper-item v-for="(item, index) in noticeList" :key="item.id" @click="toNoticeDetails(item.id)">
					<view class="swiper-item" :style="{color: item.system_notice_title_color, fontSize: item.system_notice_title_size/2 + 'px'}" v-if="!item.path"><text style="margin-right: 12upx;">♨</text>{{item.system_notice_title.length > 35 ? item.system_notice_title.substr(0, 35) + '...' : item.system_notice_title}}</view>
					<view class="swiper-item" :style="{color: item.system_notice_title_color, fontSize: item.system_notice_title_size/2 + 'px'}" v-if="item.path"><image :src="item.path" style="margin-right: 12upx; width: 36upx; height: 36upx; line-height: 36upx; border-radius: 50%;"></image>{{item.system_notice_title.length > 35 ? item.system_notice_title.substr(0, 35) + '...' : item.system_notice_title}}</view>
					</swiper-item>
			</swiper> -->
			
			<view :style="{width: noticeList.length*600 + 'px', left: left + 'px'}" style="position: absolute; top: 0; display: flex; align-items: center; height: 72upx;">
				<view v-for="(item, index) in noticeList" :key="item.id" @click="toNoticeDetails(item.id)" style="width: 600px;">
					<view class="swiper-item" :style="{color: item.system_notice_title_color, fontSize: item.system_notice_title_size/2 + 'px'}" v-if="!item.path"><text style="margin-right: 12upx;">♨</text>{{item.system_notice_title.length > 35 ? item.system_notice_title.substr(0, 35) + '...' : item.system_notice_title}}</view>
					<view class="swiper-item" :style="{color: item.system_notice_title_color, fontSize: item.system_notice_title_size/2 + 'px'}" v-if="item.path"><image :src="item.path" style="margin-right: 12upx; width: 36upx; height: 36upx; line-height: 36upx; border-radius: 50%;"></image>{{item.system_notice_title.length > 35 ? item.system_notice_title.substr(0, 35) + '...' : item.system_notice_title}}</view>
				</view>
			</view>
			
			<view class="line_cut" style="position: absolute; top: 72upx;"></view>
		</view>
		
		<!-- 金刚区分类 -->
		<view class="" :style="[{top:StatusBar*2+100+'rpx'}]" style="position: relative;">
			<view class=" activity">
				<view class=" ">
					<view class="plr15">
						<view class="flex align-center justify-between flex-wrap ">
							<view class="flex column align-center    padding-bottom" style="width: 25%;"
								v-for="(item, index) in job_class" :key="index" @tap="select_type(item, index)">
								<view class="img-100 overHidden bgf8 radius-16">
									<image :src="item.img" class="img-100" :class="current==index?'img_big':''"
										mode="aspectFill">
								</view>
								</image>
								<text class="gray3 text-sm mt10 ">{{index==0?' ':''}}{{ item.name||'' }}</text>
							</view>
						</view>
					</view>
					<!-- <view class="flex align-center justify-between pt10 radius-16 plr15">
						<view class="flex column alcenter   " v-for="(item, index) in job_class" :key="index" v-if="index>3" @tap="select_type(item, index)">
							<view class="img-100 overHidden bgf8 radius-16">
								<image :src="item.img" class="img-100" :class="current==index?'img_big':''" mode="aspectFill">
							</view>
							<text class="gray3 text-sm mt10">{{ item.name||'' }}</text>
						</view>
					</view> -->
				</view>
			</view>
		</view>
		<view class="line_cut" :style="[{ top: StatusBar * 2 + 100 + 'rpx' }]" style="position: relative;"></view>
		<view class="pb30 bg-white" :style="[{ top: StatusBar * 2 + 100 + 'rpx' }]" style="position: relative;">
			<!-- 排序 -->
			<view class="" id="btnTop2">
				<view class="">
					<!-- 劳务派遣  服务经纪人-->
					<view class="">
						<view class="box flex align-center plr10 pb10 ">
							<block v-for="(item, index) in tabList" :key="item.id">
								<view class="box_item" :class="activeTab == index ? 'box_left' : ''" @click="tabSelect(item, index)">{{ item.name }}</view>
							</block>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="sock-input flex align-center plr15 margin-lr margin-bottom-sm padding-bottom-sm" v-if="activeTab==1">
				<text class="lg text-gray cuIcon-search"></text>
				<input type="text" value="" placeholder="搜索经纪人" v-model="sockTxt" @confirm="sockInput" placeholder-style="color:#999999;font-size:24rpx;" />
			</view> -->
			<view>
				<!-- 劳务派遣工 -->
				<plant-list
					:companyType="companyType"
					ref="plantList"
					:Welfare="welfare"
					:fanType="fan_type"
					:sort_type="sort_type"
					v-if="activeTab == 0"
					:city_id="area_id"
				></plant-list>
				<!-- 服务经纪人 -->
				<serviceBroker ref="brokerPage" v-if="activeTab == 1" :longitude="longitude_const" :latitude="latitude_const"></serviceBroker>
			</view>
		</view>
		<!-- 弹框 -->
		<leePopup :content="'去完善简历'" :confirmTxt="'确认'" @cancel="cancel" @confirm="confirm" ref="leepop" :poptype="2"></leePopup>
		<!-- 回到顶部按钮 -->
		<view class="to_top_wrap" v-if="show_top"><image :src="IMG_URL + 'static/miniwechat/index/to_top.png'" mode="" class="top_img" @tap="back_top"></image></view>

		<!-- <view style="width: 30%; height: 128upx; display: flex; justify-content: space-around; align-items: center; position: fixed; left: 20%; bottom: 120upx; z-index: 98;">
			<view
				style="width: 128upx; height: 128upx; background-color: #f3a73f; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;"
				@click="confirm"
			>
				<i class="text-df cuIcon-searchlist bold" style="color: #FFFFFF; font-size: 48upx;"></i>
				<text style="color: #FFFFFF; font-size: 26upx;">我要求职</text>
			</view>
		</view> -->
	</view>
</template>
<script>
import leePopup from '@/components/lee-pop.vue';

export default {
	components: {
		leePopup
	},
	props: {
		scrollDistance: {
			type: [String, Number]
		},
		showTop: {
			type: [String, Boolean]
		},
		tabTop: {
			type: [String, Boolean]
		}
	},
	data() {
		return {
			left: 0,
			CustomBar: this.CustomBar,
			StatusBar: this.StatusBar,
			show_top: this.showTop,
			is_top: false,
			tab_top: this.tabTop,
			aheight: '',
			swiperHeight: '',
			scroll_distance: this.scrollDistance,
			current: 2,
			// #ifdef MP-WEIXIN
			controls: false, //是否展示播放控件
			// #endif
			// #ifndef MP-WEIXIN
			controls: 'true', //是否展示播放控件
			// #endif
			companyType: 3, //六宫格选择
			check_cur: 0, //人才列表选中状态
			radio: 0,
			Modalname: null,
			payrt_job_type: '', //网约工类型 1：网上兼职 2：本地兼职
			settlement_method: 0, //网约工 筛选条件
			is_part_job_type: 0, //0不是网约工 1是网约工
			online_type: 0, //选择的网约工类型
			fan_type: 0, //选中的补贴
			welfare: 0, //选中的福利
			activeTab: 0, //选择网约工类型
			choose: false, //是否点击筛选
			loading: true, // 是否显示骨架屏组件
			animation: false,
			elColor: '#e5e5e5',
			borderRadius: 10,
			msg_num: 0,
			up_down_type: 1, //正序倒序?
			sort_type: 1, //排序方式
			job_type: 1, //工作类型选择
			dotStyle: true,
			IMG_URL: this.IMG_URL,
			tabList: [
				{
					//网约工类型
					name: '派遣企业',
					id: 2
				},
				{
					name: '附近门店',
					id: 1
				}
			],
			job_class: [
				{
					img: this.IMG_URL + 'static/miniwechat/index/img1.jpg',
					name: '打工头条',
					id: 1,
					top: ''
				},
				{
					img: this.IMG_URL + 'static/miniwechat/index/img9.jpeg',
					name: '本地零工市场',
					id: 13,
					top: ''
				},
				{
					img: this.IMG_URL + 'static/miniwechat/index/img7.jpg',
					name: '求职信息',
					id: 3,
					top: ''
				},
				{
					img: this.IMG_URL + 'static/miniwechat/index/img8.png',
					name: '坑骗拖欠名单',
					id: 4,
					top: ''
				},
				{
					img: this.IMG_URL + 'static/miniwechat/index/img11.jpeg',
					name: '劳务派遣直聘 ',
					id: 5,
					top: ''
				},
				{
					img: this.IMG_URL + 'static/miniwechat/index/img4.jpg',
					name: '本地临时工派单',
					id: 6,
					top: ''
				},
				{
					img: this.IMG_URL + 'static/miniwechat/index/img10.jpeg',
					name: '本地企业直聘',
					id: 7,
					top: ''
				},
				{
					img: this.IMG_URL + 'static/miniwechat/index/img6.jpg',
					name: '网络兼职派单',
					id: 8,
					top: ''
				}
			],
			swiperImage: [],
			swiperVideo: [],
			videoUrl: '', //视频路径
			sockTxt: '', //搜索经纪人
			city_id: '', //城市id
			sort_list: [
				{
					id: 2,
					name: '距离排序'
				},
				{
					id: 1,
					name: ' 最新发布'
				},
				{
					id: 3,
					name: '工资排序'
				}
			],
			resume_list: [],
			status: 'loadmore', //加载状态
			longitude: '', //经度
			latitude: '', // 纬度
			latitude_const: '', //自己的定位
			longitude_const: '', //自己的定位
			isopen: true, //跳转页面
			order: '', //排序方式
			address: '全国',
			plant_type: [],
			page: 1, //页数
			topDistance: '', //滑动的距离
			total_page: '',
			userInfo: uni.getStorageSync('USERINFO'), //用户信息
			user_id: uni.getStorageSync('USERINFO').id || 0, //用户id
			is_show_top: false,
			is_show_icon: true, //是否显示图标
			isloading: false, //是否是加载状态
			loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '实在没有了'
			},
			last_page: '', //总页数
			btnTop1: '', //四宫格距顶部距离  便民信息吸顶
			btnTop2: '', //网约共距顶部距离  网约工吸顶
			voucher: '', //是否展示支付
			autoplay: true, //是否自动轮播
			videoContext: null, //{Object}视频对象
			isPlay: false, //{Boolean}是否播放\
			city_name: '', //传参
			area_id: '', //区id
			playStatus: false ,// 播放状态
			noticeList: [], // 通知列表
			autoplayMarque: true,
			t: null
		};
	},
	watch: {
		top_distance() {
			return this.scroll_distance;
		}
	},
	created() {
		// 在switch切换tab时候，或者刚进入
		if (this.t == null) {
			this.t = setInterval(() => {
				this.left -= 1;
				if (Math.abs(this.left) > (this.noticeList.length - 1) * 600) {
					this.left = 0;
				}
			}, 50);
		}
		console.error('created');
		// 进首页是否有身份 默认求职者
		this.userInfo = uni.getStorageSync('USERINFO');
		if (!this.userInfo) {
			uni.setStorageSync('USERINFO', {
				user_type: 1,
				id: ''
			});
		}
		this.get_banner(); //获取banner
		this.get_plant_type(); //获取 职位筛选条件
		// if (this.userInfo) {
		this.user_id = (this.userInfo && this.userInfo.id) || '0';
		// 判断是否有缓存
		if (uni.getStorageSync('chooseCity')) {
			this.city_name = uni.getStorageSync('chooseCity').name || uni.getStorageSync('chooseCity').areaName;
			this.longitude = uni.getStorageSync('chooseCity').lng || uni.getStorageSync('chooseCity').longitude;
			this.latitude = uni.getStorageSync('chooseCity').lat || uni.getStorageSync('chooseCity').latitude;
			this.city_id = uni.getStorageSync('chooseCity').id || uni.getStorageSync('chooseCity').areaId;
			setTimeout(() => {
				this.$refs.plantList && this.$refs.plantList.dataList();
			}, 300);
		} else {
			this.get_location(); //获取定位
		}

		uni.$on('openPage', data => {
			//去开启定位服务 返回页面
			this.get_location();
		});
		if (uni.getStorageSync('position_const')) {
			// 本地定位缓存
			this.longitude_const = uni.getStorageSync('position_const').longitude;
			this.latitude_const = uni.getStorageSync('position_const').latitude;
		}
		
		// 获取通知列表
		this.getNoticeList();
	},
	mounted() {
		// console.error('mounted');
		let _this = this;
		this.videoContext = uni.createVideoContext('myVideo', this);
		console.log(this.videoContext, 'this.videoContext');
		if (uni.getStorageSync('USERINFO').is_personal_profile == 0 && uni.getStorageSync('openHomePop') == 1) {
			this.$refs.leepop.open();
		}
		// 选择区页面返回的数据
		uni.$on('areaHome', data => {
			//console.log(data, '==========切换区域');
			_this.address = data.areaName || '全国';
			_this.city_name = data.areaName;
			_this.longitude = data.longitude;
			_this.latitude = data.latitude;
			uni.setStorageSync('chooseCity', data);
			_this.area_id = data.areaId;
			uni.setStorageSync('cityId', _this.area_id);
			console.log(_this.area_id);
			// 此处为2022年10月15日增加，选择区域后更新城市id
			// this.city_id = _this.area_id;
			setTimeout(() => {
				this.$refs.plantList && this.$refs.plantList.dataList();
				// 获取通知列表
				this.getNoticeList(_this.area_id);
			}, 500);
		});
		// 选择市页面返回的数据
		uni.$on('countryHome', data => {
			_this.address = data.name || '全国';
			_this.city_name = data.name;
			_this.longitude = data.lng;
			_this.latitude = data.lat;
			uni.setStorageSync('chooseCity', data);
			_this.area_id = data.id;
			uni.setStorageSync('cityId', _this.area_id);
			console.log(_this.area_id);
			// 此处为2022年10月15日增加，选择区域后更新城市id
			// this.city_id = _this.area_id;
			setTimeout(() => {
				this.$refs.plantList && this.$refs.plantList.dataList();
				// 获取通知列表
				this.getNoticeList(_this.area_id);
			}, 500);
		});
	},
	destroyed() {
		// console.error('destroyed');
		this.videoContext ? this.videoContext.pause() : null;
	},
	updated() {
		// console.error('updated');
	},
	// 下拉刷新
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	methods: {
		// 取消填写简历
		cancel() {
			this.$refs.leepop.close();
			uni.removeStorageSync('openHomePop');
		},
		// 确定填写简历
		confirm() {
			if (!this.userInfo.user_token) {
				this.$Common.toast('您还没有登录，请先登录');
				setTimeout(() => {
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: '../../pagessignup/login'
					});
					// #endif

					// #ifdef MP-WEIXIN
					uni.navigateTo({
						//微信授权后直接返回上一级不能使用 redirectTo
						url: '/pagessignup/wechat/wxlog?page=outLogin'
					});
					// #endif
				}, 500);
			} else {
				uni.navigateTo({
					url: '/pagescenter/userypz/my_jianli'
				});
				this.$refs.leepop.close();
				uni.removeStorageSync('openHomePop');
			}
		},
		// 搜索经纪人
		sockInput() {
			this.$refs.sockTxt && this.$refs.sockTxt.dataList();
		},
		// 回到顶部
		back_top() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
		},
		// 获取筛选条件
		get_plant_type() {
			this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
				if (res.code == 1) {
					this.plant_type = res.data;
				} else {
				}
			});
		},
		toPlay(page) {
			//播放视频
			uni.navigateTo({
				url: page
			});
		},
		goOther(item) {
			//轮播图跳页面
			if (item.type == 1) {
				//外链
				// #ifdef APP-PLUS
				setTimeout(function() {
					plus.runtime.openURL(item.href);
				}, 1000);
				// #endif
			} else {
				uni.navigateTo({
					url: '/' + item.href
				});
			}
		},
		// 选择工价类型筛选
		select_plant_type(item, index) {
			this.Modalname = null;
			this.fan_type = index;
		},
		//选择网约工筛选类型
		select_online_type(item, index) {
			this.Modalname = null;
			this.online_type = item.id;
			this.settlement_method = item.id;
			console.log(item.id, this.settlement_method);
		},
		//选择福利筛选
		select_fuli_type(item, index) {
			this.Modalname = null;
			this.welfare = item.aid;
		},
		//点击筛选按钮
		plant_filter() {
			this.choose = true;
			// this.sort_type = 2;
			this.Modalname = 'plant_filter';
		},
		hideModal() {
			this.Modalname = null;
		},
		RadioChange(e) {},

		// 获取定位
		get_location() {
			if (!this.loading) {
				return;
			}
			this.loading = false;
			setTimeout(() => {
				this.loading = true;
			}, 1000);
			this.$Common.getLocation(e => {
				let that = this;
				//获取经纬度
				this.longitude_const = e.longitude;
				this.latitude_const = e.latitude;
				uni.setStorageSync('position_const', e);
				setTimeout(() => {
					this.$refs.plantList && this.$refs.plantList.dataList();
				}, 200);
			});
		},
		// 监听轮播图切换
		swiperChange(e) {
			this.isPlay = false;
			this.autoplay = true;
		},
		/**
		 * @event
		 * @description  播放视频监听
		 * */
		playVideo() {
			this.isPlay = true;
			this.autoplay = false;
			let that = this;
			console.log('播放视频', this.playStatus, 'playStatus');
			this.videoContext.play();
		},
		/**
		 * @event
		 * @description  视频结束监听
		 * */
		videoEnd(e) {
			console.log('视频结束监听', e);
			this.videoContext.exitFullScreen();
			this.isPlay = false;
			this.autoplay = true;
		},
		/**
		 * @event
		 * @description  视频全屏监听
		 * */
		fullscreenchange(e) {
			console.log('全屏操作', e);
			// #ifdef APP-PLUS
			if (!e.detail.fullScreen) {
				console.log(1111111);
				this.videoContext.pause();
				this.autoplay = true;
			}
			// #endif
		},
		// 暂停播放
		setPlat() {
			if (this.playStatus) {
				console.log('暂停视频');
				this.isPlay = false;
				this.autoplay = true;
				this.videoContext.pause();
			} else {
				console.log('播放视频');
				this.isPlay = true;
				this.autoplay = false;
				this.videoContext.play();
			}
		},
		// 视频暂停事件
		videoPause(e) {
			console.log(e, '暂停视频');
			this.isPlay = false;
			this.videoContext.pause();
			// #ifdef APP-PLUS
			this.videoContext.exitFullScreen();
			// #endif
			setTimeout(() => {
				this.autoplay = true;
			}, 300);
			this.playStatus = false;
		},
		// 视频播放
		videoPlay(e) {
			this.videoContext.play();
			console.log(e, '播放视频 开始/继续播放时触发play事件');
			setTimeout(() => {
				this.playStatus = true;
			}, 500);
		},

		// 首页轮播图
		get_banner() {
			this.$Request
				.post(this.$api.operation.get_ads, {
					typeid: 8
				})
				.then(res => {
					if (res.code == 1) {
						this.swiperImage = res.data.image;
						this.swiperVideo = res.data.video || '';
						this.videoUrl = res.data.video[0] && res.data.video[0].zip_addr_url;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
		},
		// 选择工作类型 金刚区分类
		select_type(item, index) {
				let params = '&id=' + item.id;
			if (index == 1 || index == 0 || index == 3) {
				uni.navigateTo({
					url: '../../pagesHome/convenience?type=' + index + params
				});
			} else if (index == 4 || index == 6) {
				uni.navigateTo({
					url: '../../pagesHome/plantList?type=' + index
				});
			} else if (index == 5 || index == 7) {
				uni.navigateTo({
					url: '../../pagesHome/partList?type=' + index
				});
			} else if (index == 2) {
				uni.navigateTo({
					url: '../../pagesHome/resumeDatabase'
				});
			}
			// if (this.isloading) return;
			// uni.showLoading({
			// 	mask: true
			// }) //不展示
			// this.isloading = true;
			// setTimeout(() => {
			// 	this.isloading = false;
			// }, 1000)
			// if (this.current == index) {
			// 	uni.hideLoading()
			// 	return;
			// }
			// this.current = index;
			// this.activeTab = 0
			// this.companyType = index + 1;
			// this.settlement_method = ''
			// this.fan_type = 0;
			// this.online_type = 0
			// this.welfare = '';
			// this.payrt_job_type = ''
		},
		// tab切换  劳务派遣下面切换
		tabSelect(item, index) {
			if (this.isloading) return;
			uni.showLoading({
				mask: true
			}); //不展示
			this.isloading = true;
			setTimeout(() => {
				this.isloading = false;
			}, 1000);
			// 排序  最新排序
			this.sort_type = 1;
			this.activeTab = index;
			if (index == 0) {
				setTimeout(() => {
					this.$refs.plantList && this.$refs.plantList.dataList();
				}, 200);
			}
		},

		toPage(page) {
			const userInfo = uni.getStorageSync('USERINFO');
			if (this.isopen == false) {
				return;
			}
			this.isopen = false;
			setTimeout(() => {
				this.isopen = true;
			}, 1500);
			if (!userInfo.user_token) {
				this.$Common.toast('您还没有登录，请先登录');
				setTimeout(() => {
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: '../../pagessignup/login'
					});
					// #endif

					// #ifdef MP-WEIXIN
					uni.navigateTo({
						//微信授权后直接返回上一级不能使用 redirectTo
						url: '/pagessignup/wechat/wxlog?page=outLogin'
					});
					// #endif
				}, 500);
			} else {
				uni.navigateTo({
					url: page
				});
			}
		},
		getNoticeList(city_id) {
			city_id = city_id ? city_id : this.city_id;
			this.$Request.get(this.$api.msg.getNoticeList, {
				city_id: city_id ? city_id : 0,
				position: 0
			}).then(res => {
				if (res.code == 1) {
					this.noticeList = res.data;
				}
			});
		},
		toNoticeDetails(id) {
			// 导航到通知详情页面
			console.error(id);
			uni.navigateTo({
				url: '/pagesHome/index/notice_detail?id=' + id + '&type=20221015'
			})
		}
	}
};
</script>
<style lang="scss">
.type_item {
	width: 201rpx;
	height: 66rpx;
	background: rgba(255, 255, 255, 1);
	border: 1px solid rgba(230, 230, 230, 1);
	opacity: 1;
	border-radius: 4rpx;
}

.tag_bg {
	width: 160rpx;
	text-align: center;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 10rpx;
	color: #f37b1d;
	background-color: rgba(255, 158, 62, 0.2);
}

.tag_gray {
	width: 160rpx;
	text-align: center;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 10rpx;
	color: #333;
	background-color: rgba(153, 153, 153, 0.2);
}

.activity {
	width: 100%;
	// height: 310upx;
	background: transparent;
	position: relative;
	z-index: 2;
	overflow: hidden; //防止after里面的宽度140%出现滚动条
	padding-top: 40rpx;
	// top: 160rpx;
}

// .activity::after {
// 	content: '';
// 	width: 140%;
// 	height: 200rpx;
// 	position: absolute;
// 	left: -20%;
// 	top: 0;
// 	z-index: -1;

// 	border-radius: 50% 50% 0 0;
// 	background: #ffffff;
// }

.ceiling_top {
	position: fixed;
	top: 0;
}

.swiper-box {
	// height: calc(100% - 40px);
	// height: 1000rpx;
	// padding-bottom: 0;
	// padding-bottom: constant(safe-area-inset-bottom);
	// padding-bottom: env(safe-area-inset-bottom);
}

.uni-swiper-item {
	height: 100%;
}

.top_img {
	position: fixed;
	right: 40rpx;
	bottom: 140rpx;
	width: 88rpx;
	height: 88rpx;
}

.status_bar {
	background: #fff;
}

.active {
	background-color: #ecf6ff !important;
	color: #1b90ff !important;
	border: 1px solid #1b90ff;
}

.box_item {
	width: 50%;
	height: 70upx;
	line-height: 70upx;
	text-align: center;
	// padding-bottom: 20upx;
}

.box_left {
	color: #1b90ff;
	position: relative;
}

.box_left::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	width: 54upx;
	height: 6upx;
	z-index: 99;
	background-color: #1b90ff;
}

.sticky-box {
	/* #ifndef APP-PLUS-NVUE */
	position: -webkit-sticky;
	/* #endif */
	/* #ifdef APP-PLUS */
	top: 0;
	/* #endif */
	position: sticky;
	/* #ifdef H5 */
	top: var(--window-top);
	/* #endif */
	z-index: 99;
	background: #fff;
}

.choosed {
	color: #1b90ff;
}

.fixed {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	margin: auto;
	z-index: 100;
	height: 100upx;
	width: 100%;
	background-color: #ffffff;
}

page {
	background: #fff;
	// height: 100%;
	min-height: 100%;
}

.video_image {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	z-index: 10;
}

.sticky_nav {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	background-color: #ffffff;
	z-index: 9999;
}

.banner {
	// height: 700upx;
	position: relative;
	top: 0;
	left: 0;

	image {
		width: 100%;
		height: 700rpx;
	}

	.msg_wrap {
		position: absolute;
		top: 64rpx;
		right: 30rpx;
	}

	.msgImg {
		width: 42rpx;
		height: 40rpx;
	}
}

.search_box {
	position: absolute;
	width: 100%;
	height: 88rpx;
	left: 0;
	right: 0;

	.inputBox {
		width: 590rpx;
		/* #ifdef MP-WEIXIN */
		width: 390rpx;
		/* #endif */
		height: 58rpx;
		// background: rgba(255, 255, 255, 1);
		border-radius: 34rpx;
		border: 1px solid #ddd;
	}
}

.sock-input {
	width: 686upx;
	padding: 10upx 30upx;
	border-radius: 34rpx;
	border: 1px solid #ddd;
}

.job_img {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	border: 1px solid #ff9e3e;
}

.img_big {
	animation: img_big_small 1s 1;
	// animation-iteration-count: 1;
}

@keyframes img_big_small {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.5);
	}

	100% {
		transform: scale(1);
	}
}

.card {
	min-height: 232rpx;
}

.label_item {
	margin-top: 10rpx;
	margin-left: 0;
	margin-right: 4rpx;
}

.head_img {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
}

.info {
	flex: 1;
	line-height: 60rpx;
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

.checked1 {
	color: #1b90ff;
	position: relative;
	z-index: 99;
}

// .u-sticky{
// 	width: 100%;
// }
.checked1::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: -6rpx;
	width: 112rpx;
	height: 8rpx;
	background: #1b90ff;
	z-index: -2;
}

.sort {
	line-height: 18rpx;
}

.checked2 {
	color: #ff9e3e;
	position: relative;
	z-index: 99;
}

.checked2:nth-child(1)::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: -6rpx;
	width: 52rpx;
	height: 8rpx;
	background: rgba(255, 158, 62, 1);
	z-index: -2;
}

.checked2:nth-child(2)::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: -6rpx;
	width: 102rpx;
	height: 8rpx;
	background: rgba(255, 158, 62, 1);
	z-index: -2;
}

.checked2:nth-child(3)::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: -6rpx;
	width: 52rpx;
	height: 8rpx;
	background: rgba(255, 158, 62, 1);
	z-index: -2;
}

.checked2:nth-child(4)::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: -6rpx;
	width: 100rpx;
	height: 8rpx;
	background: rgba(255, 158, 62, 1);
	z-index: -2;
}

.kailong {
	position: absolute;
	right: -16upx;
	top: 16upx;
	width: 0;
	height: 0;
	border-right: 14upx solid transparent;
	border-left: 14upx solid transparent;
	border-top: 14upx solid #333;
}

.kaiact {
	position: absolute;
	right: -16upx;
	top: 16upx;
	width: 0;
	height: 0;
	border-right: 14upx solid transparent;
	border-left: 14upx solid transparent;
	border-top: 14upx solid #999;
}

.uni-margin-wrap {
	width: 150%;
	height: 72upx;
	position: relative;
}

.swiper {
	height: 80rpx;
}

.swiper-item {
	display: flex;
	height: 80rpx;
	line-height: 80rpx;
	text-align: left;
	padding:  0 30rpx;
	justify-content: flex-start;
	align-items: center;
}
</style>
