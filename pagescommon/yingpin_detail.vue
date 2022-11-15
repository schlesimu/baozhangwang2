<!-- 招聘者 应聘详情信息 -->
<template>
	<view class="" style="padding-bottom: 100rpx;">
		<!-- 导航 -->
		<cu-custom bgColor="bg-white" :isBack="true" >
			<block slot="content">
				<view class="" v-if="smbol=='bol'">
					我的简历
				</view>
			</block>
			<block slot="right">
				<view class="flex justify-between align-center padding">
					<view class="" v-if="!smbol">
						<image class="heart" @tap="getCol" :src="heart?IMG_URL+'static/miniwechat/heart_red.png':IMG_URL+'static/miniwechat/heart.png'" mode=""></image>
						
					</view>
					<!-- #ifndef MP-WEIXIN -->
					<image class="share" :src="IMG_URL+'static/miniwechat/share.png'" mode="aspectFill" @tap="share"></image>
					<!-- #endif -->
				</view>
			</block>
		</cu-custom>
		<!-- 头部 -->
		<view class="margin-bottom">
			<view class="cu-list menu sm-border">
				<view class="cu-item " style="padding:30rpx " @tap="gouser(data.user_id)">
					<view class="content flex justify-between">
						<view style="width: 80%;">
							<view class="text-bold" style="font-size: 40upx; width: 100%;">{{ data.full_name }}</view>
							<view class="text-df margin-top-lg" style="color: #666;width: 100%;">
							<!-- {{ data.age||'' }}岁 | {{ data.degree||'' }} | {{ data.years||'' }}年经验 -->
							{{ data.age||'未设置&nbsp;' }}  <text v-if="data.age" >岁&nbsp;</text> | {{ data.degree ||'未设置'}}  |  {{ data.years ||'未设置'}}<text v-if="data.years" >年经验</text>
							</view>
						</view>
						<view  class="bg-gray" style="width: 104upx;height:104upx;border-radius: 50%;overflow: hidden;">
							<image :src="data.head_img?data.head_img:IMG_URL+'/static/miniwechat/head_null.png'" class="png" mode="aspectFill" style="width: 120upx;border-radius: 50%;height: 120upx;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 工作地址 -->
		<view class="padding" style="border-bottom: 1rpx solid #F9F9F9;">
			<view class="text-bold">求职意向</view>
			<view class="flex flex-wrap  padding-tb" >
				<view class="biaoqian active text-df" v-for="(item, index) in data.want_find" :key="index" v-if="item">{{ item }}</view>
			</view>
		</view>
		<!-- 公司信息 -->
		<view class="padding" style="border-bottom: 1rpx solid #F9F9F9;">
			<view class="text-bold margin-bottom">就职经历</view>
			<view class="margin-tb" v-for="(item, index) in data.Inauguration" :key="index" >
				<view class="text-df text-bold">{{ item.company_name }}</view>
				<view class="text-sm" style="color: #666;margin: 10upx 0 20upx;">{{ item.station_name }}</view>
				<view class="text-sm" style="color: #666;">{{ item.job_description }}</view>
			</view>
			<view class="" v-if="data.Inauguration==''">
				暂无
			</view>
		</view>
		<!-- 教育经历 -->
		<view class="padding" style="border-bottom: 1rpx solid #F9F9F9;">
			<view class="text-bold margin-bottom">教育经历</view>
			<view class="margin-tb" v-for="(item, index) in data.education" :key="index" >
				<view class="flex justify-between">
					<view class="text-df text-bold">{{ item.school_name }}</view>
					<view class="text-sm" style="color: #666;">{{ item.start_time }}-{{ item.end_time }}</view>
				</view>
				<view class="text-sm" style="color: #666;margin: 10upx 0 0;">{{ item.major_name }}</view>
			</view>
			<view class="" v-if="data.education==''">
				暂无
			</view>
		</view>
		<!-- 面试时间 -->
		<view class="padding" style="border-bottom: 1rpx solid #F9F9F9;" v-if="pagetype == 3">
			<view class="text-bold margin-bottom">面试时间</view>
			<view class="text-bold" style="font-size: 28upx;">10月25日 上午 9:00</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btn " @tap="communicate" v-if="pagetype == 1||pagetype == 2">立即沟通</view>
		<view class="btn flex" v-if="pagetype == 3">
			<!-- <view class="jianli" v-if="pagetype == 2">下载简历</view> -->
			<view class="jianli" v-if="pagetype == 3">取消面试</view>
			<view class="goutong text-white"  @tap="communicate">立即沟通</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			aid: '',
			heart:false,
			data: [],
			IMG_URL:this.IMG_URL,
			user:'',//应聘者信息
			is_collection: null,
			inviteinfo: [],//获取分享链接信息 
			user_id: null,
			pagetype: '',//1 招聘者详情，2简历详情，3 面试详情 
			smbol:'',//我的简历展示
			vocation_type:''//职位id
		};
	},
	onLoad(e) {
		this.aid = e.aid;
		this.pagetype = e.pagetype;
		this.smbol = e.smbol;
		if(this.smbol=='bol'){
			this.getmyresum()
		}
		if(this.pagetype==2||this.pagetype==1){
			this.getresumMsg();//简历详情
		}else if(this.pagetype==3){
			this.getresumMsg();
		} 
		this.getInfo();
	},
	 // onShareAppMessage(res) {
	 //    if (res.from === 'button') {// 来自页面内分享按钮
	 //      console.log(res.target)
	 //    }
	 //    return {
	 //      title: '自定义分享标题',
	 //      path: '/pages/test/test?id=123'
	 //    }
	 //  },
	methods: {
		// 获取简历详情接口
		getresumMsg() {
			this.$Request
				.post(this.$api.company.resumedetails, {
					aid: this.aid
				})
				.then(res => {
					if (res.code == 1) {
						this.data = res.data;
						// this.user=res.user
						this.user_id = res.data.user_id;
						this.vocation_type = res.data.aid;
						
						if(res.data.is_collect==1){
							this.heart=true
						}
					} else {
						this.$Common.toast(res.msg);
					}
				});
		},
		getmyresum() {//获取个人简历预览信息
			this.$Request
				.post(this.$api.user.myresume)
				.then(res => {
					if (res.code == 1) {
						this.data = res.data;
						// this.user=res.user
						this.user_id = res.data.user_id;
					} else {
						this.$Common.toast(res.msg);
					}
				});
		},
		//添加/取消收藏  1:收藏应聘者 2:收藏招聘者 3:收藏店铺
		getCol() {
			this.heart=!this.heart
				this.$Request
					.post(this.$api.company.set_collection, {
						collect_id: this.user_id,
						type: 3,
						vocation_type: this.vocation_type
					})
					.then(res => {
						if (res.code == 1) {
							this.is_collection = res.data.is_collection;
						} else {
							this.$Common.toast(res.msg);
						}
					});
			
		},
		getInfo() {//获取分享链接
			this.$Request.post(this.$api.user.get_my_code).then(res => {
				if (res.code == 1) {
					this.inviteinfo = res.data;
				}
			});
		},
		share(){//分享
			uni.share({
			    provider: "weixin",
			    scene: "WXSceneSession",
			   type: 0,
			  title: '欢迎体验保障网',
			  imageUrl: "",
			  miniProgram: {
			      id: 'gh_66b0749ac265',
			      path: `pagesHome/index/plant_detail?id=${this.aid}`,
			      type: 1,
			  },
			    success: function (res) {
			        console.log("success:" + JSON.stringify(res));
			    },
			    fail: function (err) {
			        console.log("fail:" + JSON.stringify(err));
			    }
			});
		},
		
		gouser(uid) {//跳到个人空间
			uni.navigateTo({
				url: 'user_space?uid='+uid,
			});
		},
		communicate() {
			uni.navigateTo({
				url: '../pagesmessage/userMsg?kfid='+this.user_id+'&type=user'+'&userName='+this.data.full_name+'&job_position_id=0',
				animationDuration: 300
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.heart {
	width: 46upx;
	height: 46upx;
	margin-right: 15upx;
}
.share {
	width: 40upx;
	height: 40upx;
	margin-top: -4upx;
}
.active {
	background-color:#F27B04!important;
	color: #fff!important;
}
.tag {
	padding: 2rpx 8rpx;
	background-color: #ffe6e4;
	font-size: 24rpx;
	border-radius: 4rpx;
	margin-right: 10rpx;
	color: #fa6b5a;
}

.tag1 {
	padding: 2rpx 8rpx;
	border: 1rpx solid #74b0ff;
	font-size: 24rpx;
	border-radius: 4rpx;
	margin-right: 10rpx;
	color: #74b0ff;
}

.biaoqian {
	width: 156rpx;
	height: 70rpx;
	text-align: center;
	line-height: 70rpx;
	background-color: #f66744;
	border-radius: 10rpx;
	margin-bottom: 24rpx;
	margin-right: 14rpx;
	color: #ffffff;
	position: relative;
}

.year {
	image {
		width: 28rpx;
		height: 26rpx;
	}

	margin-right: 40rpx;
}

.tag2 {
	width: 92rpx;
	height: 30rpx;
	background: linear-gradient(136deg, rgba(252, 227, 143, 1) 0%, rgba(242, 164, 87, 1) 100%);
	border-radius: 6rpx;
}

.btn {
	position: fixed;
	bottom: 0;
	left: 0;
	height: 100rpx;
	width: 100%;
	box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.08);
	text-align: center;
	line-height: 100rpx;
	background: #2a89ff;
	color: #fff;
	.jianli {
		width: 290upx;
		height: 100%;
		text-align: center;
		line-height: 100rpx;
		color: #666;
		background-color: #fff;
	}
	.goutong {
		width: 460upx;
		height: 100%;
		line-height: 100rpx;
		text-align: center;
		background: #2a89ff;
	}
}

// .cu-list.menu > .cu-item .content > uni-view:first-child {
// 	display: block;
// }
// .cu-list.menu>.cu-item .content>view: first-child{
// 	display: block;
// }
</style>
