<template>
	<!-- 企业招聘认证 -->
	<view class="">
		<!-- 头部 -->
		<view class=" text-bold" style="font-size: 40upx;padding: 40upx 30upx;">
			企业招聘认证
		</view>
		<view class="pt10 mt10" style="width: 686rpx; margin: 0 auto;">
			<view @tap.stop="wechatLocation">
				<view class="text-lg margin-bottom">
					<text class="text-red  text-xl">*</text>
					公司营业地址
				</view>
				<view class="lg cuIcon-locationfill flex justify-start align-center">
					<input class="ml10" disabled style="width: 100%;" name="address" v-model="address" placeholder="请选择公司营业地址" />
					<input disabled style="width: 0; height: 0;" name="city_id" v-model="city_id" />
				</view>
			</view>
		</view>
		<view class="card_item" @tap='chooseImg(index)' v-for="(item,index) in img" :key='index'>
			<view class=" margin-tb-sm">
			<image class="bg_img" @tap.stop='yulan(item.pic,index)' :src="item.pic||IMG_URL+'static/miniwechat/cardbg.png'" mode="aspectFill"></image>
			<view class="btn_chuan " v-show="item.pic==''">
				<view class="btn_center flex align-center justify-center">
					<image :src="IMG_URL+'static/miniwechat/xiangji@2x.png'" mode="aspectFill"></image>
					<view class="">{{item.content}}</view>
				</view>
			</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="f30 bold plr15 pt45" v-if="voucher==0">
			注册公司,需要缴纳保证金
			<text class="text-red">{{ totalMoney || 0 }}</text>
			元
		</view>
		<view class="btn_next bg_deep" @tap="sub" style="height: 88upx; margin-bottom: 40upx;margin-top: 20upx;">完成</view>
	</view>
</template>

<script>
let that;
export default {
	data() {
		return {
			img:[{
				pic:'',
				content:'上传营业执照'
			},{
				pic:'',
				content:'上传法人身份证正面(选填)'
			},{
				pic:'',
				content:'上传法人身份证反面(选填)'
			}],
			IMG_URL:this.IMG_URL,
			totalMoney:'',//保证金
			status:'',//是否支付 2已拒绝 不支付
			voucher:'',//0：未关闭支付   1：关闭支付
			lon: '',
			lat: '',
			address: '',
			city_id: 0
		};
	},
	onShow() {
		this.user = uni.getStorageSync('USERINFO');
		this.getPrice()
	},
	onLoad(e) {
		this.status=e.status
		this.get_plant_type()
	},
	methods: {
		chooseImg(index){
			this.$Request.uploadImg((res)=>{
				this.$Common.toast(res.msg);
				if( res.code == 1 ){
					this.img[index].pic = res.data[0].path;
				}
			})
		},
		// 获取筛选条件
		get_plant_type() {
			this.$Request.get(this.$api.index.get_fuli_info).then(res => {
				if (res.code == 1) {
					this.voucher=res.data.voucher
				} else {}
			});
		},
		yulan(pic,index){//预览
			this.$Common.lookImg(pic);
		},
		getPrice(){//获取保证金
			this.$Request.post(this.$api.company.getPrice).then(res => {
				if (res.code == '1') {	
					if(res.data){
						this.totalMoney=res.data.enterprise_bond_money
					} 
				}
			});
		},
		sub() {	//提交
			let data = {
				buissness_img: this.img[0].pic,
				id_card_img: this.img[1].pic,
				id_card_back_img: this.img[2].pic,
				type:1,
				bond_money:this.totalMoney,
				company_address: this.address,
				address: this.address,
				simple_address: this.address,
				lon: this.lon,
				lat: this.lat,
				city_id: this.city_id
			};
			console.log(data);
			if (!data.buissness_img) {
				this.$Common.toast('请上传营业执照');
				return false;
			}
			if (!data.address || !data.company_address || !data.lon || !data.lat) {
				this.$Common.toast('请选择公司营业地址');
				return false;
			}
		
			// if (!data.id_card_img) {
			// 	this.$Common.toast('身份证正面照');
			// 	return false;
			// }
			// if (!data.id_card_back_img) {
			// 	this.$Common.toast('身份证反面照');
			// 	return false;
			// }
			this.$Request.post(this.$api.user.user_authentication, data).then(res => {
				if (res.code == '1') {	
					uni.$emit('authen',{})
					if(this.voucher==1){
						uni.navigateBack({		})
					}else{
						if(this.status==2){
							uni.navigateBack({		})
						}else{
							uni.redirectTo({
								url:'/pagescenter/zhaopinzhe/fabu?payType=认证&price=' + this.totalMoney + '&order_sn=' + res.data.order_sn
							})
						}
					}
					
				
					// setTimeout(()=>{
					// 	uni.navigateBack({})
					// },600)
				}else{
					this.$Common.toast(res.msg)
				}
			});
		},
		wechatLocation() {
			let that = this;
			this.$util.chooseLocation(this, function(location) {
				// 在onShow生命周期函数里会执行一次解析定位地址，因此此处需要重新赋值一下全局定位地址变量
				that.lon = location.longitude;
				that.lat = location.latitude;
				// that.$util.updateLocation([location.longitude, location.latitude], that);
				that.address = location.address;
				// console.log(location);
				that.getCityId({ longitude: location.longitude, latitude: location.latitude });
			});
		},
		getCityId(e) {
			let that = this;
			//获取经纬度
			let lat = [e.longitude, e.latitude];
			this.$Request
				.post(this.$api.msg.cityPosition, {
					user_id: this.user_id || '',
					// #ifdef APP-PLUS
					client_id: plus.device.uuid,
					// #endif
					cid: '',
					lat: lat
				})
				.then(res => {
					// console.log(res, '地址2')
					if (res.code == 1) {
						that.city_id = res.data.id;
					} else {
						that.$Common.toast('无法定位，请打开手机定位！！');
					}
				})
				.catch(err => {
					that.$Common.toast('无法定位，请打开手机定位！！');
				});
		},
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.card_item{
	width: 686upx;
	height: 403upx;
	margin: auto;
	position: relative;
	margin-bottom: 40upx;
	.bg_img{
		width: 686upx;
		height: 403upx;
	}
}
.btn_chuan{
	position: absolute;
	bottom: 0;
	top: 0;
	left: 0;
	right: 0;
	margin: auto;
	width: 370upx;
	height: 77upx;
	background-color:#1B90FF ;
	color: #FFFFFF;
	font-size:28upx ;
	border-radius: 39upx;
	text-align: center;
	z-index: 10;
	.btn_center{
		margin: auto;
		width: 370upx;
		padding: 20upx 0;
		text-align: center;
		line-height: 1.2;
		font-size: 14px;
		image{
			width: 34upx;
			height: 26upx;
			margin-right: 17upx;
		}
	}
	
}
.btn_chuan:nth-child(2){
	width: 490upx;
	.btn_center{
		width: 490upx;
	}
}
</style>
