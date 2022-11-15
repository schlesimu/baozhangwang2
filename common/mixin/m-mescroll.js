// mescroll 相关配置
var myMixin = {
	data() {
		return {
			// 下拉刷新的常用配置
			mescroll: null, //mescroll实例
			downOption: {
				use: true, // 是否启用下拉刷新; 默认true
				auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
			},
			// 上拉加载的常用配置
			upOption: {
				use: true, // 是否启用上拉加载; 默认true
				auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 5 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关内容'
				}
			},
		}
	},
	methods: {
		initMescroll(mescroll) { //初始化mescroll回调
			this.mescroll = mescroll
		},
		downCallback() { //下拉刷新的回调
			this.mescroll.resetUpScroll();
		},
		upCallback() {	//上拉加载回调
			this.mescroll.endSuccess(1, false);
		},
	}
}

export default myMixin
