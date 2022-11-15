<template>
	<view>
		<!-- 弹窗 -->
		<uni-popup ref="popup" type="center">
			<view class="popup flex flex-direction justify-around align-center" style="height: 200rpx;">
				<view class="margin-top padding-left-sm padding-right-sm text-center">
					<view class="text-lg text-black margin-bottom text-bold">{{title}}</view>
					<text class="text-lg text-black  " >{{content}}</text>
				</view>
				<!-- 操作按钮 -->
				<view class="flex justify-around handle-boxs align-center text-lg" v-if="poptype==2">
					<view class="text-lg text-gray handle-left" @tap="cancle">
						{{cancelTxt}}
					</view>
					<view class="text-lg txt-theme handle-right" @tap="confirm">
						{{confirmTxt}}
					</view>
				</view>
				
				<!-- 确认操作 -->
				<view class="flex justify-around handle-boxs align-center text-lg text-theme" v-if="poptype==1" @tap="confirm">
					confirmTxt
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup-toast.vue";
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				
			};
		},
		props:{
			content:{
				type:[String],
				default:'主体内容'
			},
			cancelTxt:{
				type:[String],
				default:'取消'
			},
			confirmTxt:{
				type:[String],
				default:'确认'
			},
			poptype:{
				type:[Number,String],
				default:2
			},
			title:{
				type:[String],
				default:''
			}
		},
		methods:{
			// 取消按钮
			cancle(){
				this.$emit('cancel')
			},
			// 确认按钮
			confirm(){
				this.$emit('confirm')
			},
			close(){
				this.$refs.popup.close()
			},
			open(){
				setTimeout(()=>{
					this.$refs.popup.open()
				},100)
			}
			
		}
		
	}
</script>

<style scoped>
.text-theme{
	color: #FF8429;
}
.handle-boxs {
	height: 100rpx;
	line-height: 100rpx;
	width: 100%;
	position: absolute;
	bottom: 1px;
	border-top: 1px solid #EEEEEE;
}
.handle-left,.handle-right{
	width: 50%;
	text-align: center;
}
.handle-left{
	border-right: 1px solid #eee;
}
</style>
