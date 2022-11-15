<template>
	<scroll-view scroll-y>
		<view class="cu-list menu-avatar no-padding">
			<view class="cu-item" v-for="(areaItem, areaIndex) in area_list" :key="areaIndex">
				<view class="content" style="left: 40rpx;" @click="select_city(areaItem)">
					<view class="">{{areaItem.name}}</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data () {
			return {
				city_id: 0,
				area_list: [],
				page: '', //页面   homePage  首页
			}
		},
		onLoad(options) {
			const {city_id} = options
			this.page = options.page;
			this.city_id = Number(city_id)
			this.get_position_district();
		},
		methods: {
			select_city(item){
				console.log(33333333333333333,item);
				if (this.page == 'homePage') {
					uni.$emit('countryHome', item);
				} else {
					uni.$emit('country', item);
				}
				this.$Common.toast('切换成功')
				setTimeout(()=>{
					uni.navigateBack({
						delta: 2
					});
				},500)
				
			},
			// 获取城市下区列表
			get_position_district () {
				this.$Request.post(this.$api.msg.chooseCounty, {
					city_id: this.city_id
				})
				.then(res => {
					if(res.code == 1){
						this.area_list = res.data
					}else{
					}
				})
				.catch(err => {
					console.log("err: " + JSON.stringify(err));
				})
			}
		}
	}
</script>

<style>
	.cu-list.menu-avatar>.cu-item .content{
		line-height: 2;
	}
</style>
