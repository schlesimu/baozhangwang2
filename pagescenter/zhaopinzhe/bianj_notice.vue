<template>
	<!-- 编辑最新通知 -->
	<view class="padding">
		<!-- 列表start -->
		<view class="head_list cu-list menu sm-border">
			<view class="brb_e">
				<view class="" style=" ">
					<view class="text-df margin-bottom">通知标题</view>
					<view class=" text-df">
						<input type="text" value="" placeholder="请输入职位标题" style="width: 100%;height: 50upx;"
							:style="title ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="title"
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="title ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"/>
					</view>
				</view>
			</view>
			<view class="">
				<view class=" margin-top  " style=" ">
					<view class="text-df margin-bottom">上传图片</view>
					<view class="text-gray ml5" style="font-size: 24upx;margin-bottom: 10upx;">最多上传9张图片</view>
					<ben-upload v-if="defaultpic" :col="4" :max="9" @change="bannerLive" :defaultList="imgList" :uShow='uShow'></ben-upload>
				</view>
			</view>
			<view class="brb_e">
				<view class="mt5" style=" ">
					<view class="text-df margin-bottom">职位及姓名1:</view>
					<view class=" text-df">
						<input type="text" value="" placeholder="请输入职位及姓名" style="width: 100%;height: 50upx;"
							:style="name1 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="name1"
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="name1 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"/>
					</view>
				</view>
			</view>
			<view class="brb_e">
				<view class="mt5" style=" ">
					<view class="text-df margin-bottom">联系方式1:</view>
					<view class=" text-df">
						<input type="number" value="" placeholder="请输入联系电话" style="width: 100%;height: 50upx;"
							:style="mobeil1 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="mobeil1"
							
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="mobeil1 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"/>
					</view>
				</view>
			</view>
			<view class="brb_e">
				<view class="mt5" style=" ">
					<view class="text-df margin-bottom">职位及姓名2:</view>
					<view class=" text-df">
						<input type="text" value="" placeholder="请输入职位及姓名" style="width: 100%;height: 50upx;"
							:style="name2 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="name2"
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="name2 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"/>
					</view>
				</view>
			</view>
			<view class="brb_e">
				<view class="mt5" style=" ">
					<view class="text-df margin-bottom">联系方式2:</view>
					<view class=" text-df">
						<input type="number" value="" placeholder="请输入联系电话" style="width: 100%;height: 50upx;"
							:style="mobeil2 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="mobeil2"
						
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="mobeil2 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"/>
					</view>
				</view>
			</view>
			<view class="brb_e">
				<view class="mt5" style=" ">
					<view class="text-df margin-bottom">职位及姓名3:</view>
					<view class=" text-df">
						<input type="text" value="" placeholder="请输入职位及姓名" style="width: 100%;height: 50upx;"
							:style="name3 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="name3"
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="name3 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"/>
					</view>
				</view>
			</view>
			<view class="brb_e">
				<view class="mt5" style=" ">
					<view class="text-df margin-bottom">联系方式3:</view>
					<view class=" text-df">
						<input type="number" value="" placeholder="请输入联系电话" style="width: 100%;height: 50upx;"
							:style="mobeil3 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="mobeil3"
						
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="mobeil3 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"/>
					</view>
				</view>
			</view>
			<view class="pt10">
				<view class="   " style=" ">
					<view class="text-df margin-bottom">详细内容</view>
					<view class="areabox text-df" style="height: 370upx;">
						<textarea
							placeholder="请输入详细内容"
							maxlength="1500"
							style="width: 100%;height: 300upx;line-height: 1.5"
							:style="content ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="content"
							placeholder-style="font-size:32upx;color:#E6E6E6"
						/>
						<view class="text-gray txtnum" :class="content && content.length == 1500 ? 'text-red' : 'text-gray'">{{ (content && content.length) || 0 }}/1500</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 列表end -->
		<view class="margin-bottom mt30">
			<view class="btn_next text-df" style="margin-top: 10upx;background-color: #1B90FF;border-radius: 80upx;" @tap="gopay">发布</view>
			
		</view>
		
	</view>
</template>

<script>
import benUpload from '@/components/ben-upload/ben-upload.vue';
export default {
	components: {
		benUpload
	},
	data() {
		return {
			content: '', // 职位描述
			imgOne: [], //职位主图
			defaultpic:false,//是否显示图片
			videoImg: [], //职位视频缩略图
			video: '', //职位视频
			mobeil:'',//联系电话
			imgList: [], //职位轮播
			imgpath: [],
			mobeil1:'',//联系电话
			mobeil2:'',//联系电话
			uShow:true,//图片上传成功在展示
			mobeil3:'',//联系电话
			name1:'',//姓名
			name2:'',//姓名
			name3:'',//姓名
			max: 4, //图片最大数量
			check: '',
			hidden:true,//职位描述隐藏
			title: '', //职位标题
			city: '', //城市
			lon: '', //公司经度
			lat: '', //公司纬度
			aid:'',//通知id
			open: false //返回视频
		};
	},
	computed: {
		totalMoney() {
			return ((this.zhaopin_number * (this.priceOne * 100)) / 100).toFixed(2);
		}
	},
	onLoad(option) {
		uni.showLoading({})
		uni.removeStorageSync('fuliTag')
		// 监听选择公司福利
		setTimeout(() => {
			this.defaultpic = true;
		}, 300);
		this.aid=option.aid
		this.getDetail()
		// uni.$on('video', data => {
		// 	console.log(data, '监听选择视频');
		// 	this.video = data.msg;
		// 	if (data.msg != '') {
		// 		this.videoImg = data.msg + '?x-oss-process=video/snapshot,t_10000,f_jpg,w_800,h_600,m_fast';
		// 		this.open = true;
		// 	}
		// 	console.log(this.videoImg);
		// });
		// console.log(this.totalMoney);
	},
	onUnload() {
		// uni.$off('video');
	},
	methods: {
		
		bannerLive(e) {
			//图片轮播
			console.log(e);
			this.imgList = e;
			if(e!=''){
				this.uShow=true
				// uni.hideLoading()
			}
		},
		// ChooseImage() {
		// 	//选择视频
		// 	if (this.isopen == false) {
		// 		return;
		// 	}
		// 	this.isopen = false;
		// 	setTimeout(() => {
		// 		this.isopen = true;
		// 	}, 1500);
		// 	uni.navigateTo({
		// 		url: 'upload_video'
		// 	});
		// },
		DelImg() {
			//删除视频
			uni.showModal({
				content: '确定要删除视频吗？',
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if (res.confirm) {
						this.videoImg = '';
						this.open = false;
					}
				}
			});
		},
		// releavem1(){//联系方式1失去焦点
		// 	if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil1)) {
		// 		this.$Common.toast('请填写正确的联系方式1')
		// 		return false;
		// 	}
		// },
		// releavem2(){//联系方式2失去焦点
		// 	if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil2)) {
		// 		this.$Common.toast('请填写正确的联系方式2')
		// 		return false;
		// 	}
		// },
		// releavem3(){//联系方式3失去焦点
		// 	if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil3)) {
		// 		this.$Common.toast('请填写正确的联系方式3')
		// 		return false;
		// 	}
		// },
		getDetail(){//获取通知详情  getNoticedetail
			this.$Request.post(this.$api.Community.getNoticedetail, {aid:this.aid}).then(res => {
				uni.hideLoading()
				if (res.code == 1) {
					this.title=res.data.title
					this.content=res.data.content
					this.imgList=res.data.url
					this.imgList.map((item)=>{
						item.loading='100%'
					})
					this.name1=res.data.driver_name
					this.name3=res.data.finance_manager_name
					this.name2=res.data.resident_manager_name
					this.mobeil1=res.data.driver_phone
					this.mobeil2=res.data.resident_manager_phone
					this.mobeil3=res.data.finance_manager_phone
					if(res.data.driver_name==0){
						this.name1=''
					}
					if(res.data.finance_manager_name==0){
						this.name3=''
					}
					if(res.data.resident_manager_name==0){
						this.name2=''
					}
					if(res.data.driver_phone==0){
						this.mobeil1=''
					}
					if(res.data.finance_manager_phone==0){
						this.mobeil3=''
					}
					if(res.data.resident_manager_phone==0){
						this.mobeil2=''
					}
					
				} else {
					this.$Common.toast(res.msg);
				}
			});
		},
		// playVideo() {
		// 	//播放视频
		// 	uni.navigateTo({
		// 		url: 'play_video?url=' + this.video
		// 	});
		// },
		
		getLocation() {
			//获取工作地点定位
			let _this = this;
			uni.chooseLocation({
				success(res) {
					console.log(res);
					console.log('详细地址：' + res.address);
					console.log('地址名：' + res.name);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					_this.company_address = res.address;
					_this.city = res.address;
					_this.lon = res.longitude;
					_this.lat = res.latitude;
				}
			});
		},
		gopay() {
			//完成发布
			// 验证

			if (!this.title) {
				this.$Common.toast('请选择通知标题');
				return false;
			}
			if (this.imgList == '') {
				this.$Common.toast('请选择图片');
				return false;
			}
			if(this.mobeil1){
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil1)) {
					this.$Common.toast('请填写正确的联系方式1')
					return false;
				}
			}
			if(this.mobeil2){
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil2)) {
					this.$Common.toast('请填写正确的联系方式2')
					return false;
				}
			}
			if(this.mobeil3){
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil3)) {
					this.$Common.toast('请填写正确的联系方式3')
					return false;
				}
			}
			if (!this.content) {
				this.$Common.toast('请输入详细内容');
				return false;
			}
			var skill_certificate = [];
			this.imgList &&
				this.imgList.map(item => {
					skill_certificate.push(item.aid);
				});
			let formData = {
				title: this.title, //职位标题
				img: skill_certificate.join(','), //职位轮播图
				content: this.content, //职位描述
				company_id:uni.getStorageSync('roleinfo').info.aid,
				recommend:1,//是否推荐 1推荐 0不推荐
				aid:this.aid,
				driver_name:this.name1||'',
				driver_phone:this.mobeil1||'',
				resident_manager_name:this.name2||'',
				resident_manager_phone:this.mobeil2||'',
				finance_manager_name:this.name3||'',
				finance_manager_phone:this.mobeil3||''
			};
			this.$Request.post(this.$api.Community.add_notice, formData).then(res => {
				// console.log(res,'发布职位');
				if (res.code == 1) {
					this.$Common.toast(res.msg)
					uni.$emit('fabuNotice',{})
					if (this.isopen == false) {
						return;
					}
					this.isopen = false;
					setTimeout(() => {
						this.isopen = true;
					}, 1000);
					setTimeout(()=>{
						uni.navigateBack({})
					},500)
				} else {
					this.$Common.toast(res.msg);
				}
			});
		},
	
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
	height: 100%;
	letter-spacing: 1px;
}

.areabox {
	width: 686upx;
	height: 80upx;
	border: 1px solid #cccccc;
	padding: 20upx;
	position: relative;
	.txtnum {
		position: absolute;
		font-size: 24upx;
		bottom: 8upx;
		right: 20upx;
	}
	// textarea{
	// 	position: relative;
	// 	z-index: -1;
	// }
}
uni-textarea {
	width: 560rpx;
	height: 400rpx;
}
.btn {
	width: 100%;
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
	background: #2a89ff;
	color: #fff;
}

.biaoqian {
	padding: 8rpx 10rpx;
	background-color: #50aeff;
	border-radius: 10rpx;
	font-size: 22rpx;
	margin-right: 20rpx;
	margin-bottom: 16upx;
	position: relative;
	text-align: center;
	image {
		width: 38rpx;
		height: 38rpx;
		position: absolute;
		right: -19rpx;
		top: -19rpx;
	}
}
.solids image {
	width: 140upx;
	height: 140upx;
}
.solids::after {
	border: 0;
}
.bom {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
.cu-form-group {
	padding: 0;
	.bg-img {
		width: 300upx;
		height: 200upx;
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
			background: rgba(255, 255, 255, 0.3);
			image {
				max-width: 80upx;
				max-height: 80upx;
			}
		}
	}
	.bg-img > image {
		width: 100%;
		height: 100%;
	}
}
.cu-list.menu.sm-border > .cu-item:after {
	left: 0;
}
.cu-list.menu > .cu-item.arrow {
	padding: 0;
	min-height: 140upx;
}
.cu-list.menu > .cu-item.arrow:before {
	top: 58upx;
	opacity: 0.6;
}
.cu-list.menu > .cu-item.arrow:nth-child(10):before,
.cu-list.menu > .cu-item.arrow:nth-child(8):before,
.cu-list.menu > .cu-item.arrow:nth-child(7):before {
	opacity: 0;
}
</style>
