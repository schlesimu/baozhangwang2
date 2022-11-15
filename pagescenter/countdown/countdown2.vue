<template>
	<view>
		<text class="count-down">
			<text class="time hour" v-if="day!='00'">{{day}}</text>
			<text class="text-999 text-sm" v-if="day!='00'">天</text>
			<text class="time hour">{{hour}}</text>
			<text class="text-sm">小时</text>
			<text class="time minutes">{{minute}}</text>
			<text class="text-sm">分</text>
			<text class="time second">{{second}}</text>
			<text class="text-sm">秒</text>
		</text>
	</view>
</template>

<script>
	export default {
		name: "countdown",
		props: {
			showDay: {
				type: Boolean,
				default: false
			},
			starttime: {
				type: [Number, String],
				default: 0,
				validator: value => value >= 0,
			},
			endtime: {
				type: [Number, String],
				default: 0,
				validator: value => value >= 0,
			},
		},
		data() {
			return {
				day: '00',
				hour: '00',
				minute: '00',
				second: '00'
			}
		},
		mounted() {
			this.gettime(this.endtime, this.starttime);
		},
		methods: {
			gettime(endtime, starttime) {
				// 计算倒计时
				let that = this;
				let nowtime = Math.round(new Date().getTime() / 1000);
				let diffs;
				if (starttime > nowtime) {
					// 未开始
					diffs = starttime - nowtime;
				} else {
					// 进行中
					diffs = endtime - nowtime;
				}
				let timer = setInterval(() => {
					this.countDown(diffs);
					if (diffs <= 0) {
						clearInterval(timer);
					}
					diffs--;
				}, 1000);

			},
			countDown(times) {
				var day = 0,
					hour = 0,
					minute = 0,
					second = 0;
				if (times > 0) {
					day = Math.floor(times / (60 * 60 * 24));
					hour = Math.floor(times / (60 * 60)) - (day * 24);
					minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
					second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
				}
				if (day <= 9) day = '0' + day;
				if (hour <= 9) hour = '0' + hour;
				if (minute <= 9) minute = '0' + minute;
				if (second <= 9) second = '0' + second;
				this.day = day;
				this.hour = hour;
				this.minute = minute;
				this.second = second;
			},
			// 格式化时间样式 一位数补0
			formatNumber(n) {
				n = n.toString()
				return n[1] ? n : '0' + n
			},
			//手机避免出现 Invalid Date
			formateTime(aatime) {
				var time = aatime;
				time = time.replace(/-/g, ':').replace(' ', ':');
				time = time.split(':');
				var time1 = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]);
				return time1;
			},
		}
	}
</script>

<style lang="scss">
	.count-down {
		box-sizing: border-box;
		height: 76upx;
		font-size: 26upx;
		color: #999;
		padding-left: 10upx;

		.title {
			padding-right: 20upx;
			box-sizing: border-box;
			height: 40upx;
			line-height: 40upx;
			font-size: 26upx;
			color: #fff;
		}

		.time {
			display: inline-block;
			padding: 0 4upx;
			box-sizing: border-box;
			width: 40upx;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			vertical-align: middle;
			border-radius: 6upx;
			background: #fff;
			font-size: 22upx;
			color: #999;
		}
	}
</style>
