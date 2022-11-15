<template>
	<!-- 修改资料上传身份认证 -->
	<view class="my_page">
		<!-- 头部 -->
		<view class=" text-bold" style="font-size: 40upx;padding: 40upx 30upx;">
			上传身份证照片
		</view>
		<view class="card_item" @tap='chooseImg(index)' v-for="(item,index) in img" :key='index'>
			<view class=" margin-tb-sm">
				<image class="bg_img" :src="item.pic||IMG_URL+'static/miniwechat/cardbg.png'" mode="aspectFill" @tap.stop='yulan(item.pic)'></image>
				<view class="btn_chuan " v-show="item.pic==''">
					<view class="btn_center flex align-center justify-center">
						<image :src="IMG_URL+'static/miniwechat/xiangji@2x.png'" mode="aspectFill"></image>
						<view class="" style="">{{item.content}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="plr15 ">
			<view class="">
				<view class=" text_666 f28" style="margin-bottom: 12upx;">真实姓名</view>
				<input type="text" placeholder="请输入" maxlength="6"  v-model="name" :placeholder-style="name ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
				 :style="name ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
			</view>
		</view>
		<view class="plr15 ">
			<view class="mt10">
				<view class=" text_666 f28" style="margin-bottom: 12upx;">身份证号</view>
				<input type="text" placeholder="请输入" v-model="card_code" :placeholder-style="card_code ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
				 :style="card_code ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btn_next bg_deep " style="margin: 30upx;" @tap="sub">提交</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				img: [{
					pic: '',
					id:'',
					content: '上传身份证正面'
				}, {
					pic: '',
					id:'',
					content: '上传身份证反面'
				}],
				name: '', //姓名
				IMG_URL:this.IMG_URL,
				isreset:0,//是否重复提交
				card_code: '', //身份证号
			};
		},
		onLoad(e) {
			if(e.is_reset==0){
				this.isreset==0
			}else{
				this.isreset==1
			}
		},
		onShow() {
			this.user = uni.getStorageSync('USERINFO');
		},
		methods: {
			chooseImg(index) {
				this.$Request.uploadImg((res) => {
					this.$Common.toast(res.msg);
					if (res.code == 1) {
						this.img[index].pic = res.data[0].path;
						this.img[index].id = res.data[0].id;
					}
				})
			},
			yulan(pic) { //预览
				this.$Common.lookImg(pic);
			},
			sub() { //提交
				if (this.img[0].pic == '') {
					this.$Common.toast('请上传身份证正面照');
					return false;
				}
				if (this.img[1].pic == '') {
					this.$Common.toast('请上传身份证反面照');
					return false;
				}
				if (this.name == '') {
					this.$Common.toast('请填写真实姓名');
					return false;
				}
				if (this.name.length>6||this.name.length<2) {
					this.$Common.toast('请正确填写姓名');
					return false;
				}
				if (this.card_code == '') {
					this.$Common.toast('请填写身份证号码');
					return false;
				}
				if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(this.card_code)){
					this.$Common.toast('请填写正确的身份证号码');
					return false;
				}
				console.log(this.isreset);
				this.$Request.post(this.$api.user.user_certification, {
					idcard_front: this.img[0].id, //正面
					idcard_reverse: this.img[1].id, //反面
					idcard_no: this.card_code,
					name: this.name,
					is_reset:this.isreset
				}).then(res => {
					console.log('完成', res);
					this.$Common.toast(res.msg)
					if (res.code == '1') {
						// 刷新外面的是否认证了
						uni.$emit('online_authen',{})
						setTimeout(() => {
							uni.navigateBack({})
						}, 600)
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
.my_page{
	padding-bottom: 100upx;
}
	.card_item {
		width: 686upx;
		height: 403upx;
		margin: auto;
		position: relative;
		margin-bottom: 40upx;

		.bg_img {
			width: 686upx;
			height: 403upx;
		}
	}

	.btn_chuan {
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 370upx;
		height: 77upx;
		background-color: #1B90FF;
		color: #FFFFFF;
		font-size: 28upx;
		border-radius: 39upx;
		text-align: center;
		z-index: 10;

		.btn_center {
			margin: auto;
			width: 370upx;
			padding: 20upx 0;
			line-height: 1.2;
			text-align: center;

			image {
				width: 34upx;
				margin-right: 17upx;
				height: 26upx;
			}
		}

	}
</style>
