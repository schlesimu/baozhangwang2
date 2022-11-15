<template>
	<view class="cu-form-group video-com">
		<view class="grid grid-square flex-sub" :class="['col-' + col]">
			<view class="bg-img" v-for="(item, index) in videoList" :key="index" @tap="ViewVideo(item.path.tempFilePath)">
				<video :src="item.path.tempFilePath" v-if="uShow==true" object-fit="cover"></video>
				<view class="cu-tag bg-red" style="z-index: 20190118;"  @tap.stop="DelVideo" :data-index="index" ><text class="cuIcon-close"></text></view>
				<view class="progress-mask flex justify-center align-center padding-lr-sm"  v-if="item.loading!='100%'">
					<view class="cu-progress bg-mask round xs"><view class="bg-white" :style="{ width: item.loading }"></view></view>
				</view>
				<view class="progress-mask flex justify-center align-center text-white" v-if="item.error" @tap.stop="DelVide" :data-index="index">
					<text class="cuIcon-roundclose"></text>
				</view>
			</view>
			<view <view class="solids" style="width: 142rpx; height: 142rpx; overflow: visible;" @tap="ChooseVideo" v-if="videoList.length < max">
				<slot>
					<image class="cuIcon-cameraadd" :src="IMG_URL + 'static/miniwechat/creame_gray.png'" mode=""></image>
				</slot>
			</view>
		</view>
		
		<view style="position: fixed; top: 0; left: 0; z-index: 20140223; background-color: rgba(0,0,0,.7); width: 100%; height: 100%;" class="flex justify-center align-center" v-if="showBig">
			<view class="cuIcon-close text-white bold" style="position: absolute; top: 30upx; right: 0; z-index: 20190118; width: 96upx; height: 96upx;" @click="closeVideo"></view>
			<video :src="currentVideo" autoplay style="width: 100%; height: 100%;"></video>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		col: {
			type: [Number, String],
			default: 4,
		},
		max: {
			type: [Number, String],
			default: 8,
		},
		uShow:{
			type: [Boolean],
			default: false,
		},
		defaultList:{
			type: [Array, String],
		}
	},
	data() {
		let _url = this.$Config('APIHOST')+this.$api.common.upload_file;
		return {
			videoList: [],
			IMG_URL:this.IMG_URL,
			loadUrl: _url,
			count: 0, // 记录选择的视频个数
			currentVideo: '',
			showBig: false
		};
	},
	computed: {
		previewList(){
			return  this.videoList.map(item => {
				return item.path
			})
		}
	},
	watch: {
		defaultList(list) {
			console.error(list);
			list.map(item=>{
				item.end = true;
				item.path = item.url;
				this.videoList.push( item )
			})
		}
	},
	mounted() {
		//添加图片占位图
		if( this.defaultList ){
			// console.log(this.defaultList);
			this.defaultList.map(item=>{
				item.end = true;
				item.path = item.url;
				this.videoList.push( item )
			})
		}
		console.log(this.defaultList,'========defaultList');
	},
	methods: {
		// 选择视频
		ChooseVideo() {
			// #ifdef APP-PLUS
				uni.chooseVideo({
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						console.log(res);
						this.count = 1;
						let data = {
							path: {tempFilePath:res.tempFilePath},
							loading: '0%',
							task: null,
							end: false,
							error: false,
							aid: null,
						};
						this.uploadVideo(data);
						this.videoList.push(data);
					}
				});
			// #endif
			
			// #ifdef MP-WEIXIN || MP-TOUTIAO
				uni.chooseMedia({
					count: this.max - this.videoList.length,
					mediaType: ['video'],
					sizeType: ['original', 'compressed'], //可以指定是原视频还是压缩视频，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						console.log(res);
						this.count = res.tempFiles.length;
						const data = res.tempFiles.map(item => {
							let data = {
								path: item,
								loading: '0%',
								task: null,
								end: false,
								error: false,
								aid: null,
							};
							this.uploadVideo(data);
							return data;
						})
							this.videoList = this.videoList.concat(data);
					}
				});
			// #endif
		},
		// 上传图片
		uploadVideo(data) {
			const uploadTask = uni.uploadFile({
				url: this.loadUrl,
				filePath: data.path.tempFilePath,
				// #ifdef APP-PLUS
				name: 'file',
				// #endif
				// #ifdef MP-WEIXIN
				name: 'file',
				// #endif
				success: (uploadFileRes) => {
					const response = JSON.parse(uploadFileRes.data);
					console.log(uploadFileRes);
					if(response.code == 1){
						data.end = true;
						data.task = null;
						data.url = response.data[0].path;
						data.aid = response.data[0].id;
					}else{
						data.end = true;
						data.task.abort();
						data.task = null;
						data.error = true;
						uni.showToast({
							icon: 'none',
							title: '上传失败，请重新选择视频上传'
						})
					}
					this.count--;
					if(this.count === 0){
						this.handleChange();
					}
				},
				fail:(error) => {
					// data.end = true;
					data.task.abort();
					data.task = null;
					data.error = true;
					uni.showToast({
						icon: 'none',
						title: '上传失败,请检查网络设置'
					})
					console.log("error: " + JSON.stringify(error));
				}
			});
			data.task = uploadTask;
			uploadTask.onProgressUpdate((res) => {
				data.loading = res.progress + '%';
			});
		},
		// 预览视频
		ViewVideo(path) {
			this.showBig = true;
			this.currentVideo = path;
		},
		closeVideo() {
			this.showBig = false;
		},
		// 删除视频
		DelVideo(e) {
			this.videoList.splice(e.currentTarget.dataset.index, 1);
			this.handleChange();
		},
		// 触发change事件
		handleChange(){
			let _videos = this.videoList.map(item => {
				if(item.error){
					return '';
				}else{
					return item;
				}
			})
			this.$emit('change',_videos);
		}
	}
}
</script>

<style lang="scss">
	.cu-form-group{
		// margin: 30upx 20upx !important;
	}
.progress-mask {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 10;
}
.grid.grid-square>uni-view{
	margin-right: 18upx;
}
.cuIcon-cameraadd:before {
	content: '';
}
.solids {
	position: relative;
	image {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 142upx;
		height: 142upx;
	}
}
.solids::after {
	content: '';
	border: 0;
}
</style>
