<template>
	<view>
		<!-- <mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :fixed="false"> -->
			<view class="flex justify-between flex-wrap " >
				<view class=" pb10" style="width: 330upx;background-color: #fff;" v-for="(item, index) in data" :key="index" @tap="godetail(item)">
					<view class="bg_img">
						<image :src="item.urls || IMG_URL + 'static/miniwechat/logo.png'" mode="" style="width: 100%;height: 100%;"></image>
						<view class="play" v-if="item.type == 2"><image :src="IMG_URL + 'static/miniwechat/play.png'" mode="aspectFill"></image></view>
					</view>
					<view
						class="text-bold f32 mt10"
						style="word-wrap:break-word;word-break:break-all;
		"
					>
						{{ item.title }}
					</view>
					<view
						class=" text-df  text_line2"
						style="word-wrap:break-word;word-break:break-all;
						"
					>
						{{ item.describe }}
					</view>
					<view class="text-sm text-gray ">{{ item.create_time }}</view>
				</view>
			</view>
			<view v-if="data== ''" class="" style="text-indent: 2em;">暂无相册内容</view>
		<!-- </mescroll-uni> -->
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	props:{
		companyId:{
			type:[String,Number],
		}
	},
	data() {
		return {
			data: [],
			video: false ,//是否为视频
			user_id:uni.getStorageSync('USERINFO').id,
			IMG_URL:this.IMG_URL,
		};
	},
	created() {
		this.getalubm();
		uni.$on('albumUpdate',(data)=>{
			this.getalubm();
		})
	},
	methods:{
		godetail(item) {
			//详情页
			if (item.type == 1) {//图片
				uni.navigateTo({
					url: '/pagescenter/zhaopinzhe/albumDetail?aid=' + item.aid
				});
			} else {
				// #ifndef APP-PLUS
				uni.navigateTo({
					url:'/pagescenter/zhaopinzhe/album_play?aid=' + item.aid+'&user_id='+this.user_id
				})
				// #endif
				// #ifdef APP-PLUS
				uni.navigateTo({
					url:'/pagescenter/zhaopinzhe/albumDetail_video?aid=' + item.aid+'&user_id='+this.user_id
				});
				// #endif
			}
		},
		getalubm(){//获取相册列表
			this.$Request
				.post(this.$api.Community.getAlbumlist, {
					company_id: this.companyId,
					type:1,//不分页
				})
				.then(res => {
					console.log(res, '我的相册');
					if (res.code == 1) {
						this.data = res.data.data; 
					
					} else {
					}
				})
		}
		
	}
};
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
	.bg_img {
		width: 330upx;
		height: 330upx;
		position: relative;
	
		.play {
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			top: 0;
			z-index: 10;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(1, 1, 1, 0.3);
			image {
				max-width: 80upx;
				max-height: 80upx;
			}
		}
	}
</style>
