<template>
	<view>
		<view class="padding"><jyf-parser :html="rule" ref="article"></jyf-parser></view>
	</view>
</template>

<script>
	import jyfParser from '@/components/jyf-parser/jyf-parser';
	export default {
		components: {
		  jyfParser
		},
		data() {
			return {
				rule:''
			};
		},
		onShow() {
			this.$Request
				.post(this.$api.operation.get_column,{
					category_id:7,//用户 协议：5 隐私协协议：6 招聘发布规则：7 工资保障服务金规则：8 接单者协议：9 网约工发布协议：10 助力规则：11
				})
				.then(res => {
					if (res.code == 1) {
						this.rule = res.data.content;
					} else {
					}
				})
				
		}
	}
</script>

<style lang="scss">

</style>
