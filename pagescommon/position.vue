<template>
	<view>
		<!-- <cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">索引</block>
		</cu-custom> -->
		<view class="fixed">
			<view class="cu-bar bg-white search " style="width: 100%;">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" v-model="city" placeholder="请输入城市名" confirm-type="search" @confirm="cityinput" @input="input" />
				</view>
				<!-- <view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="fromList">搜索</button>
			</view> -->
			</view>
			<view class="" v-if="!city">
				<view>
					<view class="flex justify-start align-center padding">
						<image :src="IMG_URL + 'static/miniwechat/position.png'" mode="widthFix" style="width:28upx ;"></image>
						<view class="bg-white margin-left-xs" @tap="changeCity(cityId, addressName)" style="font-size: 28upx;">当前定位点： {{ addressName || '定位中..' }}</view>
					</view>
					<view class="padding text-df">定位/选择城市</view>
					<view class="poshistory cf bg-white">
						<view class="postext fl text-df" @tap="chooseCity(city_id, positioncity)">{{ positioncity ? positioncity : addressName || '暂无' }}</view>
					</view>
					<view class="padding text-df">热门城市</view>
					<view class="poshistory cf bg-white ">
						<view class="postext w28 fl text-df" @tap="chooseCity(0, '')">全国</view>
						<view class="postext w28 fl text-df margin-bottom-sm" @tap="setDaty(2, '北京')">北京</view>
						<view class="postext w28 fl text-df margin-bottom-sm" @tap="setDaty(802, '上海')">上海</view>
						<view class="postext w28 fl text-df margin-bottom-sm" @tap="setDaty(1965, '广州')">广州</view>
						<view class="postext w28 fl text-df " @tap="setDaty(1988, '深圳')">深圳</view>
						<view class="postext w28 fl text-df" @tap="setDaty(1533, '郑州')">郑州</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-' + listCurID" :style="[{ height: 'calc(100vh - ' + CustomBar + 'px - 50px)' }]"
		 :scroll-with-animation="true" :enable-back-to-top="true" :class="this.city ? 'seach' : ''">
			<block v-for="(item, index) in list" :key="index">
				<view :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
					<view style="padding: 10upx 20upx;color: #666;background-color: #f9f9f9;">{{ item.name }}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item" style="height: 40px !important;" v-for="(items, sub) in item.list" :key="sub" @tap="CustomBars(items)">
							<view class="content" style="width: 92%;left: 0 !important;">
								<view class="text-black" style="margin-left: 20upx;font-size: 30upx;">{{ items.areaName }}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="indexBar" :style="[{ height: 'calc(100vh - ' + CustomBar + 'px - 50px)' }]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item">#</view>
				<view class="indexBar-item" v-for="(item, index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur">{{ item.name }}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-if="hidden" class="indexToast">{{ listCur }}</view>

		<!-- <view class="padding text-df" v-else @tap="setDaty(city)">{{ city }}</view> -->
	</view>
</template>

<script>
	import amap from '@/common/js/amap-wx.js';
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				IMG_URL:this.IMG_URL,
				hidden: false,
				listCurID: '',
				list: [], //城市数据
				listCur: 'A',
				getFromList: [],
				city: '',
				user_id: uni.getStorageSync('USERINFO').id,
				addressName: '', //当前城市点
				items: '',
				type: 0, //是否搜索
				isFalse: false,
				city_id: '', //切换城市获取的城市id
				cityId: '', //本地定位获取的处所id
				positioncity: '', //定位城市
				lon: '', //获取本地的
				lat: '', //获取本地的
				longitude: '', //从首页传来的
				latitude: '', //从首页传来的
				page: '', //页面   homePage  首页
			};
		},
		onLoad(e) {
			this.positioncity = e.city || '全国';
			this.page = e.page;
			this.city_id = e.cityid;
			this.longitude = e.longitude;
			this.latitude = e.latitude;
			if (this.positioncity == 'undefined') {
				this.positioncity = this.addressName;
			}
			let list = [];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
			}
			this.list = list;
			this.listCur = list[0];
			this.getCitylist();
			this.getlatlong();
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery()
				.select('.indexBar-box')
				.boundingClientRect(function(res) {
					that.boxTop = res.top;
				})
				.exec();
			uni.createSelectorQuery()
				.select('.indexes')
				.boundingClientRect(function(res) {
					that.barTop = res.top;
				})
				.exec();
		},
		methods: {
			getCitylist() {
				//获取城市列表
				this.$Request
					.post(this.$api.msg.getCity, {
						shortname: this.city,
						type: this.type
					})
					.then(res => {
						if (res.code == 1) {
							this.getFromList = res.data;
							this.list = this.getFromList;
							this.listCur = this.getFromList[0];
						} else {
							this.$Common.toast(res.msg);
						}
					})
					.catch(err => {
						this.$Common.toast('网络错误，请稍后重试');
					});
			},
			cityinput() {
				//搜索城市
				if (this.city != '') {
					this.type = 1;
				} else {
					this.type = 0
				}
				this.getCitylist();
			},
			input() {
				this.cityinput();
			},
			// 获取经纬度
			getlatlong() {
				let that = this;
				this.$Common.getLocation(e => {
					let lat = [e.longitude, e.latitude];
					that.lat = e.latitude;
					that.lon = e.longitude;
					console.log(e, '========');
					that.$Request
						.post(that.$api.msg.cityPosition, {
							user_id: that.user_id,
							// #ifdef APP-PLUS
							client_id: plus.device.uuid,
							// #endif
							cid: '',
							lat: lat
						})
						.then(res => {
							that.addressName = res.data.name;
							that.cityId = res.data.id;
							that.longitude = res.data.lng
							that.latitude = res.data.lat
						});
				});
			},
			setDaty(id, name) {
				//热门城市切换
				this.isFalse = true;
				this.position_dity(id, name);
			},
			changeCity(id, name) {
				//本地定位点，选择城市直接返回
				let data = {
					id,
					name,
					lng: this.longitude,
					lat: this.latitude
				};
				if (this.page == 'homePage') {
					uni.$emit('countryHome', data);
				} else {
					uni.$emit('country', data);
				}
				this.$Common.toast('切换成功');
				setTimeout(() => {
					uni.navigateBack({});
				}, 500);
			},
			chooseCity(id, name) {
				//定位、选择城市
				let data = {
					id,
					name,
					lng: this.longitude,
					lat: this.latitude
				};
				if (this.page == 'homePage') {
					uni.$emit('countryHome', data);
				} else {
					uni.$emit('country', data);
				}
				this.$Common.toast('切换成功');
				setTimeout(() => {
					uni.navigateBack({});
				}, 500);
			},
			position_dity(id, name) {
				let that = this;
				if (!this.isFalse) {
					return;
				}
				this.$Common.confirm('是否切换？', function() {
					uni.navigateTo({
						url: 'area_list?city_id=' + id+'&page='+that.page
					});
				});
			},
			CustomBars(item) {
				//点击城市列表
				let that = this;
				if (item.level < 3) {
					that.$Common.confirm('是否切换？', function() {
						uni.navigateTo({
							url: 'area_list?city_id=' + item.areaId+'&page='+that.page
						});
					});
				} else {
					if (this.page == 'homePage') {
						uni.$emit('areaHome', item);
					} else {
						uni.$emit('area', item);
					}
					this.$Common.toast('切换成功');
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 500);
				}
			},

			//获取文字信息  开始触摸
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				//结束触摸
				this.hidden = true;
				setTimeout(() => {
					this.hidden = false;
				}, 1500);
				this.listCur = this.listCur;
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name;
				}
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false;
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur;
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil((list.length * e.detail.y) / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20;
						return false;
					}
				}
			}
		}
	};
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #fff;
	}

	.fixed {
		position: fixed;
		/* #ifdef H5 */
		top: 100upx;
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
		left: 0;
		z-index: 10;
		width: 100%;
		background-color: #ffffff;
	}

	.indexes {
		position: relative;
		top: 720upx;
	}

	.seach {
		top: 120upx;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
		z-index: 100;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		// background: #fff;
		display: flex;
		flex-direction: column;
		// box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		// border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		line-height: 40upx;
		justify-content: center;
		font-size: 18upx;
		color: #999;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		z-index: 100;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}

	.poshistory {
		background: #ffffff;
		padding: 22upx 22upx;

		.postext {
			border-radius: 10upx;
			background: #f9f9f9;
			padding: 20upx 40upx;
			margin-left: 30upx;
			text-align: center;
			// margin: 32upx 10upx;
		}

		.w28 {
			width: 28%;
		}
	}
</style>
