<template>
	<view>
		<view class="status_bar"></view>
		<uni-nav-bar left-icon="back" @clickLeft="back">
			<view class="input-view">
				<input confirm-type="search" focus="true" class="nav-bar-input" type="text" v-model="keyword" placeholder="输入搜索关键词" @confirm="confirm" />
				<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
			</view>
		</uni-nav-bar>
		
		<view class="plr15 mt30 ">
			<view class="gray3 f28 brb_e mb10 pb10" v-for="(item,index) in city_list" :key="index" @click="select_city(item)">{{item.shortname}}</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			keyword:'',
			city_list:[],
			order:'asc', //排序方式
			longitude:'',
			latitude:'',
		};
	},
	onLoad(e) {
		this.keyword = e.title;
		this.get_city()
	},
	methods: {
		back(){
			uni.navigateBack()
		},
		toPage(page) {
			const userInfo = uni.getStorageSync('USERINFO');
			if( !userInfo ){
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: "../login/login"
				});
				// #endif
				
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url: '/pagessignup/wechat/wxlog'
				});
				// #endif
			
			}else{
				uni.reLaunch({
					url: page
				});
			}
		},
		confirm(){
			uni.hideKeyboard()
			this.get_city()
		},
		select_city(item){
			uni.showModal({
			    title: '提示',
			    content: '确定要切换至此城市吗?',
			    success: function (res) {
			        if (res.confirm) {
			            uni.$emit('click_address',item);
						uni.navigateBack({
							delta:2
						})
			        } else if (res.cancel) {
						
			        }
			    }
			});
			
		},
		// 搜索城市列表
		get_city() {
			this.$Request
				.post(this.$api.operation.get_city_list, {
					shortname:this.keyword
				})
				.then(res => {
					if (res.code == 1) {
					this.city_list = res.data
					} else {
						uni.showToast({ title: res.msg, icon: 'none' });
					}
				});
		},
	}
};
</script>

<style >
	page{
		background: #fff !important;
	}
.input-view {
	font-size: 24rpx;
	display: flex;
	align-items: center;
	flex-direction: row;
	flex: 1;
	background-color: #F4F4F4;
	height: 64rpx;
	border-radius: 30rpx;
	padding: 0 30rpx;
	flex-wrap: nowrap;
	margin: 14rpx 0;
	line-height: 64rpx;
}
.sort{
	line-height: 18rpx;
}
.sort_up_down{
	color: #FF9E3E;
}
.checked{
	position: relative;
	z-index: 99;
}
.checked::after{
	content:"";
	position: absolute;
	left: 0;
	bottom: 10rpx;
	width:56rpx;
	height:8rpx;
	background:rgba(255,158,62,1);
	z-index: -2;
}
.goodsImg{
	width: 170rpx;
	height: 170rpx;
}
.job_img {
	width: 100rpx;
	height: 100rpx;
}

.card {
	min-height: 232rpx;
}
.label_item {
	margin-top: 10rpx;
	margin-left: 0;
	margin-right: 10rpx;
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
</style>
