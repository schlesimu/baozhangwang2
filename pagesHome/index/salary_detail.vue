<template>
	<view class="brt_e">
		<!-- 公司信息 -->
		<view class="plr15">
			<!-- 公司介绍 -->
			<view class="">
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.company_name">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">入职公司</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.company_name||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.serial_number">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">序号</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.serial_number||''}}224</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.job_number">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">工号</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.job_number||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.work_type">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">工种</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.work_type||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.name">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">员工姓名</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.name||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.gender">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">性别</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.gender||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.moble">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">手机号</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.moble||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.id_number">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">身份证号</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.id_number||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.entry_date">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">入职日期</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.entry_date||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.departure_date">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">离职日期</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.departure_date||'无'}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.resignation_type">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">离职类型</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.resignation_type||'无'}}</text>
				</view>

				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.policy_notes">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">政策备注</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.policy_notes||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.month">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">月份</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.month||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.attendance_days">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">出勤天数</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.attendance_days||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.total_working_hours">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">总工时</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.total_working_hours||''}}</text>
				</view>

				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.unit_price">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">员工单价</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.unit_price||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.Paid_salary">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">已发薪资</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.Paid_salary||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.Unit_prices">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">折合单价</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.Unit_prices||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.Price_difference">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">应补差价</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.Price_difference||''}}</text>
				</view>

				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.Supplementary_salary">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">应补薪资</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.Supplementary_salary||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.base_pay">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">基本工资</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.base_pay||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.post_salary">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">岗位工资</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.post_salary||''}}</text>
				</view>

				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.piece_rate">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">计件工资</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.piece_rate||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.overtime_hours">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">加班工时</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.overtime_hours||''}}</text>
				</view>

				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.overtime_expenses">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">加班费用</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.overtime_expenses||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.performance_appraisal">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">绩效考核</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.performance_appraisal||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.post_subsidy">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">岗位补助</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.post_subsidy||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.seniority_allowance">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">工龄津贴</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.seniority_allowance||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.qualification_allowance">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">资质津贴</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.qualification_allowance||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.business_commission">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">业务提成</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.business_commission||''}}</text>
				</view>

				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.bonus">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">奖金</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.bonus||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.full_award">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">满勤奖</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.full_award||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.social_security_withhold">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">代扣社保</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.social_security_withhold||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.personal_income_tax">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">个税</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.personal_income_tax||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.accumulation_fund">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">公积金</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.accumulation_fund||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.water_electricity">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">水电费</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.water_electricity||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.hotel_expense">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">住宿费</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.hotel_expense||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.meal_allowance_money">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">餐费</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.meal_allowance_money||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.otherdeduction">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">其他扣款</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.otherdeduction||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.commercial_insurance">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">商业保险</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.commercial_insurance||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.meal_allowance">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">餐费补贴</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.meal_allowance||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.communication_subsidy">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">通讯补贴</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.communication_subsidy||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.transportation_subsidy">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">交通补贴</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.transportation_subsidy||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.sick_leave">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">病假</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.sick_leave||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.absenteeism">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">旷工</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.absenteeism||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.fine">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">罚款</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.fine||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.total_deduction">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">扣款总金额</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.total_deduction||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.settlement_issued">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">日结已发</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.settlement_issued||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.other">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">其他</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.other||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.remarks">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">备注</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.remarks||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.wages_payable">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">应发工资</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.wages_payable||''}}</text>
				</view>
				<view class=" flex   radius_16  ptb15" v-if="salaryInfo.net_salary">
					<text class=" text-lg  ewrap flex_shrink" style="width: 25%;">实发工资</text>
					<text class=" text-lg  ewrap ">{{salaryInfo.net_salary||''}}</text>
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import albumCompontents from '@/pagesHome/conpoments/album_components.vue'
	import noticeCompontents from '@/pagesHome/conpoments/notice_components.vue'
	import jyfParser from "@/components/jyf-parser/jyf-parser.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			albumCompontents,
			noticeCompontents,
			jyfParser

		},
		data() {
			return {
				salaryInfo: {}, //工资信息
				aid: '', //工资id
				isopen: true, //跳转页面
				CustomBar: this.CustomBar, //兼容小程序
				followStatus: false, //关注状态
				lisdata: [], // 列表数组

				voucher: '', //是否开启支付
			};
		},
		onLoad(e) {
			uni.showLoading({})
			this.aid = e.aid;
			this.getDetail()
		},
		onShow() {},
		onUnload() {
			uni.removeStorageSync('job_detail');
		},
		methods: {
			getDetail() { //搜索工资				
				this.$Request
					.post(this.$api.company.getSalaryDetail, {
						aid: this.aid
					})
					.then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							this.salaryInfo = res.data
						} else {

						}
					}).catch((err) => {
						this.$Common.toast('网络错误，请稍后重试')
					})
			},
			toDetail() { //去工资详情
				uni.navigateTo({
					url: ''
				})
			},
			copy(body) {
				//复制文字到剪切板
				uni.setClipboardData({
					data: body,
					success: function() {
						this.$Common.toast('复制成功');
					}
				});
			},
		}
	};
</script>
<style lang="scss">
	page {
		background: #fff;
	}

	.banner {
		width: 686upx;
		height: 386upx;
		position: relative;
		margin: auto;
	}

	.banner_img {
		width: 100%;
		display: block;
		background-color: #F7F7F7;
		height: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.downImg {
		width: 30rpx;
		height: 24rpx;
	}

	.inputBox {
		width: 686rpx;
		height: 72rpx;
		border-radius: 34rpx;
		box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04);
		margin: auto;
	}

	.shadow {
		box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04);
	}

	.video_image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 10;
	}

	.cuIcon-playfill {
		z-index: 100;
	}

	.bg_img {
		width: 106upx;
		height: 106upx;
		margin-right: 20upx;
		background-color: #eeeeee;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.returnBox {
		min-width: 97rpx;
		height: 87rpx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid #cccccc;
		opacity: 1;
		border-radius: 4rpx;
		box-sizing: border-box;

		.top_blue {
			height: 50%;
			background-color: #50aeff;
			margin-top: -3upx;
			color: #ffffff;
			width: 100%;
		}
	}

	.box_sort {
		width: 97upx;
		height: 90upx;
		border: 1px solid #cccccc;
		text-align: center;
		line-height: 45upx;

		view {
			font-size: 12px;
		}
	}

	.titItem:nth-child(4) {
		margin-right: 0;
	}

	.save {
		position: absolute;
		right: 0rpx;
		bottom: -24rpx;
		width: 170rpx;
		height: 50rpx;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 28rpx;
	}

	.shop_img {
		width: 106upx;
		height: 106upx;
		background-color: #f7f7f7;
		margin-right: 18upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.theme_tag {
		width: 120upx;
		height: 64upx;
		border: 1px solid #1b90ff;
		color: #1b90ff;
		border-radius: 32upx;
		font-size: 28upx;
	}

	button {
		border-radius: 0;
	}

	button:after {
		border: none;
	}
</style>
