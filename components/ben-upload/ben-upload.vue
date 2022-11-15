<template>
	<view class="cu-form-group">
		<view class="grid grid-square flex-sub" :class="['col-' + col]">
			<view class="bg-img" v-for="(item, index) in imgList" :key="index" @tap="ViewImage" :data-url="item.path" >
				<image :src="item.path" mode="aspectFill" v-if="uShow==true"></image>
				<view class="cu-tag bg-red" style="z-index: 100;"  @tap.stop="DelImg" :data-index="index" ><text class="cuIcon-close"></text></view>
				<view class="progress-mask flex justify-center align-center padding-lr-sm"  v-if="item.loading!='100%'">
					<view class="cu-progress bg-mask round xs"><view class="bg-white" :style="{ width: item.loading }"></view></view>
				</view>
				<view class="progress-mask flex justify-center align-center text-white" v-if="item.error" @tap.stop="DelImg" :data-index="index">
					<text class="cuIcon-roundclose"></text>
				</view>
			</view>
			<view class="solids" style="width: 142rpx; height: 142rpx; overflow: visible;" @tap="ChooseImage" v-if="imgList.length < max">
				<slot>
					<!-- <text class='cuIcon-cameraadd'></text> -->
					<!-- <image class="cuIcon-cameraadd" :src="IMG_URL+'static/miniwechat/addpic.png'" mode=""></image> -->
					<image class="cuIcon-cameraadd" :src="IMG_URL + 'static/miniwechat/creame_gray.png'" mode=""></image>
				</slot>
			</view>
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
		let _url = this.$Config('APIHOST')+this.$api.common.upload;
		return {
			imgList: [],
			IMG_URL:this.IMG_URL,
			loadUrl: _url,
			count: 0, // 记录选择的图片张数
		};
	},
	computed: {
		previewList(){
			return  this.imgList.map(item => {
				return item.path
			})
		}
	},
	watch: {
		defaultList(list) {
			this.imgList = list.map(item=>{
				item.end = true;
				item.path = item.url;
				return item;
			})
		}
	},
	// watch:{
	// 	defaultList:{
			
	// 	}

	// },
	mounted() {
		//添加图片占位图
		if( this.defaultList ){
			this.defaultList.map(item=>{
				item.end = true;
				item.path = item.url;
				this.imgList.push( item )
			})
		}
		console.log(this.defaultList,'========defaultList');
	},
	methods: {
		// 选择图片
		ChooseImage() {
			// if(this.count) return ;
			// uni.showLoading({	title:'请稍后'})
			uni.chooseImage({
				count: this.max - this.imgList.length,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'album'], //从相册选择
				success: (res) => {
					this.count = res.tempFilePaths.length;
					const data = res.tempFilePaths.map(item => {
						let data = {
							path: item,
							loading: '0%',
							task: null,
							end: false,
							error: false,
							aid: null,
						};
						this.uploadImage(data);
						return data;
					})
						console.error(data);
						this.imgList = this.imgList.concat(data);
						console.error(this.imgList);
				}
			});
		},
		// 上传图片
		uploadImage(data) {
			const uploadTask = uni.uploadFile({
				url: this.loadUrl,
				filePath: data.path,
				name: 'file[]',
				success: (uploadFileRes) => {
					const response = JSON.parse(uploadFileRes.data);
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
							title: '上传失败，请重新选择图片上传'
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
		// 预览图片
		ViewImage(e) {
			// console.error(this.previewList);
			uni.previewImage({
				urls: this.previewList,
				current: e.currentTarget.dataset.url
			});
		},
		// 删除图片
		DelImg(e) {
			// console.log(e,'--------------');
			this.imgList.splice(e.currentTarget.dataset.index, 1);
			this.handleChange();
		},
		// 触发change事件
		handleChange(){
			let _imgs = this.imgList.map(item => {
				if(item.error){
					return '';
				}else{
					return item;
				}
			})
			this.$emit('change',_imgs);
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
