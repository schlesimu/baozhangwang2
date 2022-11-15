<template>
	<view class="padding">
		<jyf-parser :html="agreenment" ref="article"></jyf-parser>
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
				agreenment: '',
				type: '', //1用户协议 2 隐私协议
			};
		},
		onLoad(e) {
			this.type = e.type
			if (this.type == 2) {
				uni.setNavigationBarTitle({
					title: '隐私协议'
				})
			}
		},

		onShow() {
			this.$Request
				.post(this.$api.operation.get_column, {
					category_id: this.type == 2 ? 6 :
					5, //用户 协议：5 隐私协协议：6 招聘发布规则：7 工资保障服务金规则：8 接单者协议：9 网约工发布协议：10 助力规则：11
				})
				.then(res => {
					if (res.code == 1) {
						this.agreenment = res.data.content;
					} else {}
				})
		}
	};
</script>

<style lang="scss"></style>
