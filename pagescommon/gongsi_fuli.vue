<!-- 选择公司福利标签 -->
<template>
	<view class="">
		<cu-custom bgColor="text-black bg-white" :isBack="true">
			<block slot="content"><text class="text-md">职位福利</text></block>
			<block slot="right"><view class="padding text-sm" style="color: #1B90FF;" @tap="store">保存</view></block>
		</cu-custom>
		<view class="padding">
			<view class="cu-bar search bg-white margin-bottom">
				<view class="search-form round" style="margin:0;">
					<text class="cuIcon-search"></text>
					<input @input="searchtag" :adjust-position="false" type="text" placeholder="搜索" v-model="seach" confirm-type="search" />
					<!-- <image :src="IMG_URL+'static/miniwechat/x.png'" mode="aspectFill" @tap.stop='clear()'></image> -->
				</view>
			</view>
			<!-- v-show="checkArr.length <= 0" -->
			<view class="text-sm" style="color: #999999;margin:25rpx 0 10rpx;">请选择该职位的福利标签 最多选择5个</view>
			<view v-if="checkArr.length > 0">
				<view class="text-sm margin-top" style="color: #999999;">最多可选{{ maxIength }}个</view>
				<view class="flex flex-wrap margin-top">
					<view class="biaoqian active" v-for="(item, index) in checkArr" :key="index">
						{{ item.welfare_name }}
						<image @tap="delItem(item)" :src="IMG_URL + 'static/miniwechat/cha.png'" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="padding">
			<view class="margin-tb-sm text-df" style="color: #666;">福利标签</view>
			<view class="flex flex-wrap ">
				<view @tap="checkItem(item)" class="biaoqian" :class="item.checked ? 'active' : ''" v-for="(item, index) in list" :key="index">{{ item.welfare_name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			seach: '', //搜索内容
			checkArr: [], //选中的标签
			IMG_URL:this.IMG_URL,
			list: [], //数据列表
			maxIength: 5, //最多选择条数
			emitType: 'iwant', //触发监听事件
			hasRequest: 0 //是否调用接口保存
		};
	},
	onLoad(option) {
		uni.showLoading({})
		this.hasRequest = option.request;
		this.maxIength = option.num || 5;
		this.checkArr = uni.getStorageSync('fuliTag') || [];
		this.getMsg();
	},

	methods: {
		store() {
			//保存
			if (this.checkArr.length <= 0) {
				this.$Common.toast('请选择福利标签');
			} else {
				// 发送通知 选择公司福利
				uni.$emit('changeFuli', {
					arr: this.checkArr
				});
				uni.setStorageSync('fuliTag',this.checkArr)
				uni.navigateBack();
			}
		},
		getMsg() {
			//获取福利标签
			uni.showLoading({
				title: '加载中'
			});
			this.$Request
				.post(this.$api.index.get_fuli_info, { welfare_name: this.seach })
				.then(res => {
					uni.hideLoading();
					if (res.code == '1') {
						res.data.welfare.map(item => {
							item.checked = false;
							for(var i in this.checkArr){
								if( this.checkArr[i].aid == item.aid ){
									item.checked = true;
								}
							}
						});
						this.list = res.data.welfare;
						console.log(this.list);
						this.list.map((item, key) => {
							if (item.welfare_name == '全部') {
								this.list.splice(key, 1);
							}
						});
						console.log('标签列表',this.list);
					}

					// 如果需要调用接口保存
					if (this.hasRequest == 1) {
						this.user_job();
					}
				})
				.catch(err => {
					uni.hideLoading();
				});
		},
		searchtag() {
			//搜索
			this.getMsg();
		},
		clear() {
			//清除搜索内容
			this.seach = '';
		},
		user_job() {
			//获取用户已经保存的职位
			let user_id = uni.getStorageSync('USERINFO').id;
			uni.showLoading({
				title: '加载中'
			});
			this.$Request
				.post(this.$api.user.post_label_list, {
					seach: '',
					user_id,
					type: 2
				})
				.then(res => {
					uni.hideLoading();
					console.log('用户绑定的职位', res);
					if (res.code == '1') {
						this.list.map(item => {
							res.data.map(uItem => {
								if (item.aid == uItem.aid) {
									item.checked = true;
								}
							});
						});
					}
				})
				.catch(err => {
					uni.hideLoading();
				});
		},
		// 选中标签
		checkItem(item) {
			//选择单个
			if (!item.checked) {
				if (this.checkArr.length >= this.maxIength) {
					this.$Common.toast('最多选择' + this.maxIength + '个标签哦');
					return false;
				} else {
					item.checked = true;
					this.checkArr.push(item);
				}
			} else {
				item.checked = false;
				this.checkArr.map((val, key) => {
					if (val.aid == item.aid) {
						this.checkArr.splice(key, 1);
						return;
					}
				});
			}

			// this.countCheckArr(); //计算
		},
		countCheckArr() {
			//计算选中的福利
			let arr = [];
			this.list.map(item => {
				if (item.checked) {
					arr.push(item);
				}
			});
			this.checkArr = arr;
		},
		delItem(check) {
			//删除选中项
			console.log(check);
			let id = check.aid;
			let list = this.list.map(item => {
				if (item.aid == id) {
					item.checked = false;
				};
				return item
			});
			this.list = list;
			this.countCheckArr(); //计算
		},
		
	}
};
</script>

<style lang="scss">
.active {
	background-color: #ecf6ff !important;
	color: #1b90ff !important;
	border: 1px solid #1b90ff;
}
page {
	background-color: #fff;
}
.search-form {
	position: relative;
	image {
		width: 28upx;
		height: 28upx;
		position: absolute;
		right: 20upx;
		top: 0;
		bottom: 0;
		margin: auto;
	}
}
.biaoqian {
	padding: 18rpx 20rpx;
	border: 1px solid #e6e6e6;
	background-color: #fafafa;
	font-size: 28rpx;
	color: #666666;
	margin-bottom: 24rpx;
	margin-right: 20rpx;
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
</style>
