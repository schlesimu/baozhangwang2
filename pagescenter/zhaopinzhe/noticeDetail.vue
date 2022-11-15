<!-- 通知详情 -->
<template>
	<view class="padding">
		<view class="title overflow-two">{{ plant_detail.title }}</view>
		<view class="text-gray text-sm mb10">{{ plant_detail.update_time }}</view>
		<view class="text-df mtb10" @tap="copy(plant_detail.content)">
			<text >
				<!-- selectable="true" -->
				{{plant_detail.content}}
			</text>
			<!-- <jyf-parser :html="" ref="article"></jyf-parser> -->
			</view>
		<view class="mb10">
			<view class="f30 gray6 mb5" v-if="plant_detail.driver_name != '' && plant_detail.driver_phone != ''">
				{{ plant_detail.driver_name || '' }}：
				<text style="color: #007AFF;" @tap="call(plant_detail.driver_phone)" selectable="true">{{ plant_detail.driver_phone || '' }}</text>
			</view>
			<view class="f30 gray6 mb5" v-if="plant_detail.resident_manager_name != '' && plant_detail.resident_manager_phone != ''">
				{{ plant_detail.resident_manager_name || '' }}：
				<text style="color: #007AFF;" @tap="call(plant_detail.resident_manager_phone)" selectable="true">{{ plant_detail.resident_manager_phone || '' }}</text>
			</view>
			<view class="f30 gray6" v-if="plant_detail.finance_manager_name != '' && plant_detail.finance_manager_phone != ''">
				{{ plant_detail.finance_manager_name || '' }}：
				<text style="color: #007AFF;" @tap="call(plant_detail.finance_manager_phone)" selectable="true">{{ plant_detail.finance_manager_phone || '' }}</text>
			</view>
		</view>
		<!-- <swiper class="screen-swiper"  :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" > -->
		<view v-for="(item, index) in plant_detail.url" @tap="yulan(item)" :key="index" style="background-color: #F7F7F7;">
			<image :src="item.url" mode="widthFix" style="width: 100%;"></image>
		</view>
		<!-- </swiper> -->
		<!-- <view class="text-gray mtb20"><image :src="plant_detail.img_url" mode="aspectFill"></image></view> -->
	</view>
</template>

<script>
import jyfParser from '@/components/jyf-parser/jyf-parser';
export default {
	components: {
		jyfParser
	},
	data() {
		return {
			plant_detail: {},
			id: 17,
			lon: '',
			lat: '',
			IMG_URL:this.IMG_URL,
		};
	},
	onLoad(e) {
		uni.showLoading({});
		this.aid = e.aid;
		this.getDetail();
	},
	methods: {
		getDetail() {
			//获取通知详情  getNoticedetail
			this.$Request.post(this.$api.Community.getNoticedetail, { aid: this.aid }).then(res => {
				console.log(res, '获取通知详情');
				uni.hideLoading();
				if (res.code == 1) {
					this.plant_detail = res.data;
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
				} else {
					this.$Common.toast(res.msg);
				}
			});
		},
		yulan(item) {
			//图片预览
			this.$Common.lookImg(item.url);
		},
		call(phone) {
			//拨打电话
			uni.makePhoneCall({
				phoneNumber: phone 
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
		}
	}
};
</script>

<style>
page,
body {
	background: #fff !important;
}
.title {
	font-size: 32upx;
	font-weight: bold;
	line-height: 1.2;
	letter-spacing: 1;
	margin-bottom: 10upx;
	overflow: hidden;
	text-overflow: ellipsis;
	line-clamp: 2;
}
</style>
