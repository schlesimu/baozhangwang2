<template>
	<view class="padding brt_e" style="height: auto;">
		<view style="height: 100vh; line-height: 100vh; font-weight: 300; font-size: 24upx; text-align: center;" v-if="showLoading">数据加载中...</view>
		<view style="display: flex; justify-content: space-around; align-items: center; width: 100%; color: #5f5f5f; font-weight: 300;" v-if="!showLoading">
			<view
				style="flex: 1 1 22%; display: flex; flex-direction: row; justify-content: center; align-items: center; padding: 8upx 0;background-color: #007AFF;border-radius: 8upx;"
				@click="addHourSetting"
				v-if="salaryType == 2"
			>
				<view style="width: 42upx; height: 42upx; border: 1px solid #ccc; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
					<i class="text-df cuIcon-add bold" style="color: #fff;font-size: 24upx;"></i>
				</view>
				<text style="margin-left: 10upx; color: #fff; font-size: 24upx;">添加</text>
			</view>
			<view style="padding-left: 2%; display: flex; align-items: center;" :style="salaryType == 2 ? 'flex: 1 1 76%;' : 'flex: 1 1 100%'">
				<text style="margin-right: 15upx;">考勤周期设置</text>
				<picker :style="salaryType == 2 ? 'width: 60%;' : 'width: 69%;'" mode="selector" :range="range" :value="periodIndex" @change="selectDateRange">
					<view style="display: flex; justify-content: space-around; align-items: center;">
						<view style="flex: 1 1 90%;" class="uni-input">{{ range[periodIndex] }}</view>
						<uni-icons type="forward" size="24"></uni-icons>
					</view>
				</picker>
			</view>
		</view>

		<view style="margin-top: 30upx;">
			<!-- 小时工设置 -->
			<view v-if="salaryType == 0">
				<form @submit="formSubmit" class="grace-form grace-margin-top ">
					<view class=" cu-list menu sm-border">
						<view style="border: 1px dotted #ccc; padding: 30upx; border-radius: 16upx;">
							<view class=" flex align-center ptb10" style="width: 100%;">
								<view class="text-lg flex_shrink padding-right-sm" style="width: 36%; text-align: right;">
									<text class="text-red text-xl">*</text>
									<text>小时工资</text>
								</view>
								<input
									type="digit"
									class="input"
									style="width: 52%;"
									name="hourWorkPrice"
									v-model="hourWorkPrice"
									placeholder="请输入小时工资"
									placeholder-style="font-size: 28rpx;"
									:placeholder-style="hourWorkPrice ? 'color:#666' : 'color:#BFBFBF'"
								/>
								<text>元/时</text>
							</view>
							<view class="pt10">
								<view class=" flex align-center" style="width: 100%;">
									<view class="text-lg flex_shrink padding-right-sm" style="width: 36%; text-align: right;">
										<!-- <text class="text-red text-xl">*</text> -->
										<text>全勤奖励设置</text>
									</view>
									<view style="width: 48upx; height: 48upx; line-height: 48upx; text-align: center; border: 1px solid #ccc; border-radius: 50%;" @click="addRule">
										<uni-icons type="plusempty" size="24upx" color="#ccc"></uni-icons>
									</view>
								</view>
								<view style="font-size: 24upx; background-color:#e43d33; color: #fff; font-weight: 500; padding: 20upx 30upx; border-radius: 8upx; margin: 20upx 0 0;">根据您的需要点击上面+号设置全勤奖，可设置多级，也可不设置。</view>
								<view
									v-for="(item, index) in workRuleList"
									:key="index"
									style="display: flex; justify-content: space-around; align-items: center; margin-top: 30upx;"
								>
									<view style="flex: 1 1 40%; display: flex; justify-content: space-around; align-items: center;">
										<text>全勤</text>
										<input
											type="number"
											class="input"
											style="width: 50%;"
											name="fullDay"
											v-model="item.fullDay"
											placeholder="请输入全勤天数"
											placeholder-style="font-size: 28rpx;"
											:placeholder-style="item.fullDay ? 'color:#666' : 'color:#BFBFBF'"
										/>
										<text>天</text>
									</view>
									<view style="flex: 1 1 40%; display: flex; justify-content: space-around; align-items: center;">
										<text>奖励</text>
										<input
											type="number"
											class="input"
											style="width: 50%;"
											name="fullMoney"
											v-model="item.fullMoney"
											placeholder="请输入全勤奖励"
											placeholder-style="font-size: 28rpx;"
											:placeholder-style="item.fullMoney ? 'color:#666' : 'color:#BFBFBF'"
										/>
										<text>元</text>
									</view>
									<view style="flex: 1 1 20%; display: flex; justify-content: flex-end; align-items: center;">
										<view
											style="font-size: 24upx; padding: 4upx 10upx; border-radius: 8upx; background-color: #e43d33; color: #fff;"
											@click="delRule(item.id, index)"
										>
											取消
										</view>
									</view>
								</view>
							</view>
						</view>
						<view style="margin-top: 30upx; background-color: #e43d33; padding: 30upx 20upx;border-radius: 16upx;color: #fff;line-height: 1.2em;">
							<view style="font-size: 24upx;font-weight: 500;">如实际情况不是按默认倍数计算，可在记工时时手动输入工资</view>
						</view>
					</view>

					<view style="padding: 10upx 0;">
						<button class="btn_next round " style="width: 100%; margin: 0 auto; margin-top: 20upx;" form-type="submit">确认提交</button>
					</view>
				</form>
			</view>

			<!-- 正式工设置 -->
			<view v-if="salaryType == 1">
				<form @submit="formSubmit" class="grace-form grace-margin-top ">
					<view class="cu-list menu sm-border">
						<view style="border: 1px dotted #ccc; padding: 10upx;border-radius: 16upx;">
							<view class="flex align-center justify-between ptb10">
								<view class=" flex align-center" style="width: 100%;">
									<view class="text-lg flex_shrink padding-right-sm" style="width: 40%; text-align: right;">
										<text class="text-red text-xl">*</text>
										<text>月基本工资</text>
									</view>
									<!-- @input="givenHourWorkPrice = 0"作用用户上次提交的时工资很可能不是默认计算值,因此需要用输入重置加载值 -->
									<input
										type="digit"
										class="input"
										style="width: 48%;"
										name="fulltimeWorkSalary"
										v-model="fulltimeWorkSalary"
										placeholder="请输入月基本工资"
										placeholder-style="font-size: 28rpx;"
										:placeholder-style="fulltimeWorkSalary ? 'color:#666' : 'color:#BFBFBF'"
										@input="givenHourWorkPrice = 0"
									/>
									<text>元/月</text>
								</view>
							</view>
							<view class="flex align-center justify-between ptb10">
								<view class=" flex align-center" style="width: 100%;">
									<view class="text-lg flex_shrink padding-right-sm" style="width: 40%; text-align: right;">
										<text class="text-red text-xl">*</text>
										<text>每月上班天数</text>
									</view>
									<input
										type="digit"
										class="input"
										style="width: 62%;"
										name="monthDay"
										v-model="monthDay"
										placeholder="请输入每月上班天数"
										placeholder-style="font-size: 28rpx;"
										:placeholder-style="monthDay ? 'color:#666' : 'color:#BFBFBF'"
										@input="givenHourWorkPrice = 0"
									/>
									<text>天</text>
								</view>
							</view>
							<view class="flex align-center justify-between ptb10">
								<view class=" flex align-center" style="width: 100%;">
									<view class="text-lg flex_shrink padding-right-sm" style="width: 40%; text-align: right;">
										<text class="text-red text-xl">*</text>
										<text>每日工作时长</text>
									</view>
									<input
										type="digit"
										class="input"
										style="width: 63%;"
										name="dayWorkLong"
										v-model="dayWorkLong"
										placeholder="请输入日工作时长"
										placeholder-style="font-size: 28rpx;"
										:placeholder-style="dayWorkLong ? 'color:#666' : 'color:#BFBFBF'"
										@input="givenHourWorkPrice = 0"
									/>
									<text>时</text>
								</view>
							</view>
							<view class="flex align-center justify-between ptb10">
								<view class=" flex align-center" style="width: 100%;">
									<view class="text-lg flex_shrink padding-right-sm" style="width: 40%; text-align: right;">
										<text class="text-red text-xl">*</text>
										<text>每小时工资</text>
									</view>
									<input
										type="digit"
										class="input"
										style="width: 48%;"
										name="hourWorkPrice"
										v-model="hourWorkPrice"
										placeholder="请输入小时工资"
										placeholder-style="font-size: 28rpx;"
										:placeholder-style="hourWorkPrice ? 'color:#666' : 'color:#BFBFBF'"
									/>
									<text>元/时</text>
								</view>
							</view>
							<view class="flex align-center justify-between ptb10">
								<view class=" flex align-center" style="width: 100%;">
									<view class="text-lg flex_shrink padding-right-sm" style="width: 40%; text-align: right;">
										<text class="text-red text-xl">*</text>
										<text>平时加班倍数</text>
									</view>
									<input
										type="digit"
										class="input"
										style="width: 50%;"
										name="commonWorkRatio"
										v-model="commonWorkRatio"
										placeholder="请输入平时加班倍数"
										placeholder-style="font-size: 28rpx;"
										:placeholder-style="commonWorkRatio ? 'color:#666' : 'color:#BFBFBF'"
									/>
									<text>倍</text>
									<view style="flex: 1 1 100%;text-align: right;">{{ commonWorkPrice }}元/时</view>
								</view>
							</view>
							<view class="flex align-center justify-between ptb10">
								<view class=" flex align-center" style="width: 100%;">
									<view class="text-lg flex_shrink padding-right-sm" style="width: 40%; text-align: right;">
										<text class="text-red text-xl">*</text>
										<text>周六日加班倍数</text>
									</view>
									<input
										type="digit"
										class="input"
										style="width: 50%;"
										name="hourWorkWeekendRatio"
										v-model="hourWorkWeekendRatio"
										placeholder="请输入周末加班倍数"
										placeholder-style="font-size: 28rpx;"
										:placeholder-style="hourWorkWeekendRatio ? 'color:#666' : 'color:#BFBFBF'"
									/>
									<text>倍</text>
									<view style="flex: 1 1 100%;text-align: right;">{{ hourWorkWeekendPrice }}元/时</view>
								</view>
							</view>
							<view class="flex align-center justify-between ptb10">
								<view class=" flex align-center" style="width: 100%;">
									<view class="text-lg flex_shrink padding-right-sm" style="width: 40%; text-align: right;">
										<text class="text-red text-xl">*</text>
										<text>节假日加班倍数</text>
									</view>
									<input
										type="digit"
										class="input"
										style="width: 50%;"
										name="hourWorkHolidayRatio"
										v-model="hourWorkHolidayRatio"
										placeholder="请输入节假日加班倍数"
										placeholder-style="font-size: 28rpx;"
										:placeholder-style="hourWorkHolidayRatio ? 'color:#666' : 'color:#BFBFBF'"
									/>
									<text>倍</text>
									<view style="flex: 1 1 100%;text-align: right;">{{ hourWorkHolidayPrice }}元/时</view>
								</view>
							</view>
							<view class="ptb10">
								<view class=" flex align-center" style="width: 100%;">
									<view class="text-lg flex_shrink padding-right-sm" style="width: 40%; text-align: right;">
										<!-- <text class="text-red text-xl">*</text> -->
										<text>全勤奖励设置</text>
									</view>
									<view style="width: 48upx; height: 48upx; line-height: 48upx; text-align: center; border: 1px solid #ccc; border-radius: 50%;" @click="addRule">
										<uni-icons type="plusempty" size="24upx" color="#ccc"></uni-icons>
									</view>
								</view>
								<view style="font-size: 24upx; background-color:#e43d33; color: #fff; font-weight: 300; padding: 20upx 30upx; border-radius: 8upx; margin: 20upx 0 0;">
									<view style="font-size: 24upx; font-weight: 300;">1.根据您的需要点击上面+号设置全勤奖，可设置多级，也可不设置。</view>
									<view style="font-size: 24upx; font-weight: 300;">2.若需删除所有满勤设置，请先取消所有满勤设置，然后点击确认提交。</view>
								</view>
								<view
									v-for="(item, index) in workRuleList"
									:key="index"
									style="display: flex; justify-content: space-around; align-items: center; margin-top: 30upx;"
								>
									<view style="flex: 1 1 40%; display: flex; justify-content: space-around; align-items: center;">
										<text>全勤</text>
										<input
											type="number"
											class="input"
											style="width: 50%;"
											name="fullDay"
											v-model="item.fullDay"
											placeholder="请输入全勤天数"
											placeholder-style="font-size: 28rpx;"
											:placeholder-style="item.fullDay ? 'color:#666' : 'color:#BFBFBF'"
										/>
										<text>天</text>
									</view>
									<view style="flex: 1 1 40%; display: flex; justify-content: space-around; align-items: center;">
										<text>奖励</text>
										<input
											type="number"
											class="input"
											style="width: 50%;"
											name="fullMoney"
											v-model="item.fullMoney"
											placeholder="请输入全勤奖励"
											placeholder-style="font-size: 28rpx;"
											:placeholder-style="item.fullMoney ? 'color:#666' : 'color:#BFBFBF'"
										/>
										<text>元</text>
									</view>
									<view style="flex: 1 1 20%; display: flex; justify-content: flex-end; align-items: center;">
										<view
											style="font-size: 24upx; padding: 4upx 10upx; border-radius: 8upx; background-color: #e43d33; color: #fff;"
											@click="delRule(item.id, index)"
										>
											取消
										</view>
									</view>
								</view>
							</view>
						</view>
						<view style="margin-top: 30upx; background-color: #e43d33; padding: 30upx 20upx;border-radius: 16upx;color: #fff;line-height: 1.2em;">
							<view style="font-size: 24upx;font-weight: 700;">小时工资(默认)=基本工资÷21.75天÷8小时(可手动修改)</view>
							<view style="font-size: 24upx;font-weight: 500;">如实际情况不是按默认倍数计算，可在记工时时手动输入工资</view>
						</view>
						<!-- <view style="margin-top: 30upx;background-color: #efefef; padding: 10upx;border-radius: 16upx;"></view> -->
					</view>

					<view style="padding: 10upx 0;">
						<button class="btn_next round " style="width: 100%; margin: 0 auto; margin-top: 20upx;" form-type="submit">确认提交</button>
					</view>
				</form>
			</view>

			<!-- 计件工资设置 -->
			<view v-if="salaryType == 2">
				<view style="background-color: rgba(41,121,255,.05); border-radius: 16upx; padding: 10upx; margin-bottom: 30upx;">
					<!-- 标题 -->
					<view style="display: flex; justify-content: space-around; align-items: center; padding: 20upx 0; border-bottom: 1px solid #efefef;">
						<view style="flex: 1 1 25%; text-align: left; font-weight: 500;">名称</view>
						<view style="flex: 1 1 15%; text-align: center; font-weight: 500;">单位</view>
						<view style="flex: 1 1 15%; text-align: right; font-weight: 500;">价格</view>
						<view style="flex: 1 1 45%; text-align: right; font-weight: 500;">操作</view>
					</view>
					
					<view
						style="display: flex; justify-content: space-around; align-items: center; padding: 20upx 0; border-bottom: 1px solid #efefef;"
						v-for="(item, index) in hourworkList"
						:key="item.id"
					>
						<view class="ellipsis" style="flex: 1 1 25%; text-align: left; font-weight: 300;">{{ item.name }}</view>
						<view class="ellipsis" style="flex: 1 1 15%; text-align: center; font-weight: 300;">{{ item.unit }}</view>
						<view class="ellipsis" style="flex: 1 1 20%; text-align: right; font-weight: 300;">{{ item.price }}元</view>
						<view style="flex: 1 1 40%; text-align: right; display: flex; justify-content: flex-end; align-items: center;">
							<view
								style="color: #fff; background-color: #e43d33; color: #fff; border-radius: 8upx; padding: 2upx 6upx; display: flex; justify-content: flex-end; align-items: center;"
								@click="edit(item.id, index)"
							>
								<uni-icons type="compose" color="#fff;" size="12"></uni-icons>
								<text style="margin-left: 8upx; font-size: 24upx;">修改</text>
							</view>
							<view
								style="color: #fff; margin-left: 10upx; background-color: #e43d33; color: #fff; border-radius: 8upx; padding: 2upx 6upx; display: flex; justify-content: flex-end; align-items: center;"
								@click="del(item.id, index)"
							>
								<uni-icons type="trash" color="#fff;" size="12"></uni-icons>
								<text style="margin-left: 8upx; font-size: 24upx;">删除</text>
							</view>
						</view>
					</view>
				</view>
			
				<form @submit="submitWorkRule">
					<view style="background-color: rgba(41,121,255,.05); border-radius: 16upx; padding: 20upx 10upx;">
						<view>
							<view class=" flex align-center" style="width: 100%;">
								<view class="text-lg flex_shrink padding-right-sm">
									<!-- <text class="text-red text-xl">*</text> -->
									<text>全勤奖励设置</text>
								</view>
								<view style="width: 48upx; height: 48upx; line-height: 48upx; text-align: center; border: 1px solid #ccc; border-radius: 50%;" @click="addRule">
									<uni-icons type="plusempty" size="24upx" color="#ccc"></uni-icons>
								</view>
							</view>
							<view style="background-color:#e43d33; color: #fff; padding: 20upx 30upx; border-radius: 8upx; margin: 20upx 0 0;">
								<view style="font-size: 24upx; font-weight: 300;">1.必须添加至少一条计件工配置才能进行满勤设置。</view>
								<view style="font-size: 24upx; font-weight: 300;">2.根据您的需要点击上面+号设置全勤奖，可设置多级，也可不设置。</view>
								<view style="font-size: 24upx; font-weight: 300;">3.若需删除所有满勤设置，请先取消所有满勤设置，然后点击确认提交。</view>
							</view>
							<view
								v-for="(item, index) in workRuleList"
								:key="index"
								style="display: flex; justify-content: space-around; align-items: center; margin-top: 30upx;"
							>
								<view style="flex: 1 1 40%; display: flex; justify-content: space-around; align-items: center;">
									<text>全勤</text>
									<input
										type="number"
										class="input"
										style="width: 50%;"
										name="fullDay"
										v-model="item.fullDay"
										placeholder="请输入全勤天数"
										placeholder-style="font-size: 28rpx;"
										:placeholder-style="item.fullDay ? 'color:#666' : 'color:#BFBFBF'"
									/>
									<text>天</text>
								</view>
								<view style="flex: 1 1 40%; display: flex; justify-content: space-around; align-items: center;">
									<text>奖励</text>
									<input
										type="number"
										class="input"
										style="width: 50%;"
										name="fullMoney"
										v-model="item.fullMoney"
										placeholder="请输入全勤奖励"
										placeholder-style="font-size: 28rpx;"
										:placeholder-style="item.fullMoney ? 'color:#666' : 'color:#BFBFBF'"
									/>
									<text>元</text>
								</view>
								<view style="flex: 1 1 20%; display: flex; justify-content: flex-end; align-items: center;">
									<view
										style="font-size: 24upx; padding: 4upx 10upx; border-radius: 8upx; background-color: #e43d33; color: #fff;"
										@click="delRule(item.id, index)"
									>
										取消
									</view>
								</view>
							</view>
						</view>
						
						<view style="padding: 10upx 0;">
							<button class="btn_next round " style="width: 100%; margin: 0 auto; margin-top: 20upx;" form-type="submit">确认提交</button>
						</view>
					</view>
				</form>
			</view>
		</view>

		<!-- 计件工 -->
		<uni-popup type="center" ref="tips2">
			<form @submit="addNewConfig" class="grace-form grace-margin-top" style="width: 80vw;">
				<view class="cu-list menu sm-border">
					<view class="flex align-center justify-between ptb10">
						<view class=" flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm">
								<text class="text-red text-xl">*</text>
								<text>名称</text>
							</text>
							<input
								type="text"
								class="input"
								style="width: 100%;"
								name="pieceWorkTitle"
								v-model="pieceWorkTitle"
								placeholder="请输入名称"
								@input="checktitle(pieceWorkTitle)"
								@blur="titleblur(pieceWorkTitle)"
								placeholder-style="font-size: 28rpx;"
								:placeholder-style="pieceWorkTitle ? 'color:#666' : 'color:#BFBFBF'"
							/>
						</view>
					</view>
					<view class="flex align-center justify-between ptb10">
						<view class=" flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm">
								<text class="text-red text-xl">*</text>
								<text>单位</text>
							</text>
							<input
								type="text"
								class="input"
								style="width: 100%;"
								name="pieceWorkUnit"
								v-model="pieceWorkUnit"
								placeholder="请输入单位"
								@input="checktitle(pieceWorkUnit)"
								@blur="titleblur(pieceWorkUnit)"
								placeholder-style="font-size: 28rpx;"
								:placeholder-style="pieceWorkUnit ? 'color:#666' : 'color:#BFBFBF'"
							/>
						</view>
					</view>
					<view class="flex align-center justify-between ptb10">
						<view class=" flex align-center" style="width: 100%;">
							<text class="text-lg flex_shrink padding-right-sm">
								<text class="text-red text-xl">*</text>
								<text>单价</text>
							</text>
							<input
								type="digit"
								class="input"
								style="width: 100%;"
								name="pieceWorkPrice"
								v-model="pieceWorkPrice"
								placeholder="请输入单价"
								placeholder-style="font-size: 28rpx;"
								:placeholder-style="pieceWorkPrice ? 'color:#666' : 'color:#BFBFBF'"
							/>
							<text>元</text>
						</view>
					</view> 
				</view>

				<view style="padding: 10upx 0;"><button class="btn_next round " style="width: 100%; margin: 0 auto; margin-top: 20upx;" form-type="submit">确认提交</button></view>
			</form>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '工资设置',
			salaryType: -1, // 0小时工，1正式工，2计件工
			hourworkList: [],
			periodIndex: 0,
			range: [
				'1号-本月底',
				'2号-下月1号',
				'3号-下月2号',
				'4号-下月3号',
				'5号-下月4号',
				'6号-下月5号',
				'7号-下月6号',
				'8号-下月7号',
				'9号-下月8号',
				'10号-下月9号',
				'11号-下月10号',
				'12号-下月11号',
				'13号-下月12号',
				'14号-下月13号',
				'15号-下月14号',
				'16号-下月15号',
				'17号-下月16号',
				'18号-下月17号',
				'19号-下月18号',
				'20号-下月19号',
				'21号-下月20号',
				'22号-下月21号',
				'23号-下月22号',
				'24号-下月23号',
				'25号-下月24号',
				'26号-下月25号',
				'27号-下月26号',
				'28号-下月27号',
				'29号-下月28号'
			],
			hourWorkTitle: '',
			fulltimeWorkSalary: 0, // 月工资
			monthDay: 21.75, // 每月上班天数
			dayWorkLong: 8, // 日工作时长
			commonWorkRatio: 1.5, // 普通加班倍数
			hourWorkWeekendRatio: 2, // 周末加班倍数
			hourWorkHolidayRatio: 3, // 节假日加班倍数
			pieceWorkTitle: '',
			pieceWorkUnit: '',
			pieceWorkPrice: '',
			workRuleList: [],
			givenHourWorkPrice: 0,
			currentObjId: 0, // 当前修改或者删除对象id，对计件工有用
			currentObjIndex: -1 ,// 当前修改或者删除对象在列表中的索引，对计件工有用
			showLoading: true
		};
	},
	computed: {
		hourWorkPrice: {
			get: function() {
				// 计算正式工小时单价，公式为：2000÷21.75÷8；
				return this.givenHourWorkPrice ? this.givenHourWorkPrice : Math.floor((this.fulltimeWorkSalary / this.monthDay / this.dayWorkLong) * 100) / 100;
			},
			set: function(value) {
				console.error(value);
			}
		},
		commonWorkPrice() {
			// 计算普通加班小时工价
			return Math.floor(this.hourWorkPrice * this.commonWorkRatio * 100) / 100;
		},
		hourWorkWeekendPrice() {
			// 周末加班小时工价
			return Math.floor(this.hourWorkPrice * this.hourWorkWeekendRatio * 100) / 100;
		},
		hourWorkHolidayPrice() {
			// 节假日加班小时工价
			return Math.floor(this.hourWorkPrice * this.hourWorkHolidayRatio * 100) / 100;
		}
	},
	watch: {
		pieceWorkUnit(value) {
			// 2022年09月28日允许添加多个单位
			return ;
			console.error(value);
			if (this.hourworkList.length > 0 && value !== this.hourworkList[0].unit && value) {
				this.pieceWorkUnit = this.hourworkList[0].unit;
				uni.showModal({
					title: '提示',
					content: `您已使用${this.hourworkList[0].unit}作为单位，不允许修改。如需修改，请删除所有重新添加`,
					success(e) {
						//console.error(e);
					}
				});
			}
		},
		hourworkList(value) {
			// console.error(value);
			if (value.length > 0) {
				this.pieceWorkUnit = value[0].unit;
			}
		},
		fulltimeWorkSalary(value) {
			if (value * 1 > 9999999) {
				this.$Common.toast('您的月薪似乎过高了！');
				this.fulltimeWorkSalary = 9999999;
			}
		}
	},
	onLoad(e) {
		// console.error(e);
		let type = (this.salaryType = e.type * 1);
		let title = '';
		switch (type) {
			case 0:
			default:
				title = '小时工工资设置';
				break;
			case 1:
				title = '正式工资设置';
				break;
			case 2:
				title = '计件工资设置';
		}
		uni.setNavigationBarTitle({
			title: title
		});

		// todo 此处请求接口，将已提交计件工设置展示为列表
		let params = {};
		if (this.currentObjId) params.id = this.currentObjId;
		params.salaryType = this.salaryType;
		this.$Request.get(this.$api.worktime.get_salary_settings, params).then(res => {
			// console.error(res);
			if (res.data) {
				this.giveValue(res.data);
			}
			this.showLoading = false;
		});
	},
	onShow() {},
	methods: {
		selectDateRange(e) {
			// console.error(e);
			let params = {
				id: this.currentObjId,
				salaryType: this.salaryType,
				period: e.detail.value * 1
			}
			this.$Request.post(this.$api.worktime.set_single_work_time, params).then(res => {
				// 不接受还无工时配置的考勤单独设置
				if (!res) return;
				if (res.code == 1) {
					uni.$emit('updateSetting', 'KQ');
					this.periodIndex = e.detail.value * 1;
				}
				this.$Common.toast(res.msg);
			});
		},
		addHourSetting() {
			let popup = 'tips' + this.salaryType;
			this.pieceWorkTitle = '';
			this.pieceWorkUnit = '';
			this.pieceWorkPrice = '';
			this.currentObjId = 0;
			this.currentObjIndex = -1;
			this.$refs[popup].open();
		},
		workRuleGenerate() {
			// 全勤规则校验为空
			let days = [];
			for (let i in this.workRuleList) {
				if (!this.workRuleList[i].fullDay || !this.workRuleList[i].fullMoney) {
					this.$Common.toast('全勤天数或全勤奖励不可为0，请填写或者删除全勤规则');
					return false;
				}
			
				if (this.workRuleList[i].fullDay > 31) {
					this.$Common.toast('全勤天数不能大于31天');
					return false;
				}
			
				// 考勤天数存在校验
				if (days.indexOf(this.workRuleList[i].fullDay) > -1) {
					this.$Common.toast(`考勤天数${this.workRuleList[i].fullDay}已存在`);
					return false;
				}
			
				days.push(this.workRuleList[i].fullDay);
			}
			
			// 将全勤规则值转换为数字
			let workRuleList = [];
			this.workRuleList.forEach(item => {
				workRuleList.push({
					fullDay: item.fullDay * 1,
					fullMoney: item.fullMoney * 1
				});
			});
			return workRuleList;
		},
		formSubmit(e) {
			// console.error(e);
			let submitData = {};
			// 如果是编辑，需要带上id
			if (this.currentObjId) submitData.id = this.currentObjId;
			submitData.salaryType = this.salaryType; // 当前工种，0小时工，1正式工，2计件工
			submitData.period = this.periodIndex; // 考勤周期选择

			// 全勤规则数据构建
			let workRuleList = [];
			if (workRuleList = this.workRuleGenerate()) {
				submitData.workRuleList = workRuleList;
			} else return;

			// 赋值，并校验为空
			switch (this.salaryType) {
				case 1:
				default:
					submitData.fulltimeWorkSalary = e.detail.value.fulltimeWorkSalary * 1;
					submitData.monthDay = e.detail.value.monthDay * 1;
					submitData.dayWorkLong = e.detail.value.dayWorkLong * 1;
					submitData.hourWorkPrice = e.detail.value.hourWorkPrice * 1;
					submitData.commonWorkRatio = e.detail.value.commonWorkRatio * 1;
					submitData.hourWorkWeekendRatio = e.detail.value.hourWorkWeekendRatio * 1;
					submitData.hourWorkHolidayRatio = e.detail.value.hourWorkHolidayRatio * 1;
					console.error(submitData);
					if (
						!submitData.fulltimeWorkSalary ||
						!submitData.monthDay ||
						!submitData.dayWorkLong ||
						!submitData.hourWorkPrice ||
						!submitData.commonWorkRatio ||
						!submitData.hourWorkWeekendRatio ||
						!submitData.hourWorkHolidayRatio
					) {
						this.$Common.toast('必填项不可为空');
						return;
					}
					break;
				case 0:
					submitData.hourWorkPrice = e.detail.value.hourWorkPrice * 1;
					if (!submitData.hourWorkPrice) {
						this.$Common.toast('必填项不可为空');
					}
					break;
			}

			// console.error(submitData);

			// todo 下面请求接口记录数据
			this.$Request.post(this.$api.worktime.set_salary_settings, submitData, {
				"content-type": "multipart/form-data"
			}).then(res => {
				this.$Common.toast(res.msg);
				if (res.code == 1) {
					// 更改配置则首页统计数据需要改变
					uni.$emit('updateSetting');
					uni.navigateBack({
						delta: 1
					})
				}
			});
		},
		submitWorkRule() {
			// 全勤规则数据构建
			let workRuleList = [];
			if ((workRuleList = this.workRuleGenerate()) === false) return;
			let submitData = {
				salaryType: this.salaryType,
				workRuleList
			};
			// todo 计件工全勤奖设置
			this.$Request.post(this.$api.worktime.set_work_rule, submitData, {
				"content-type": "multipart/form-data"
			}).then(res => {
				this.$Common.toast(res.msg);
				if (res.code == 1) {
					// 更改配置则首页统计数据需要改变
					uni.$emit('updateSetting');
				}
			});
		},
		addNewConfig(e) {
			let detail = e.detail.value;
			let submitData = {};
			// 只能有一个单价
			this.pieceWorkUnit = detail.pieceWorkUnit;

			// 必填项校验
			if (!detail.pieceWorkTitle || !detail.pieceWorkUnit || !detail.pieceWorkPrice) {
				this.$Common.toast('必填项不可为空');
				return;
			}

			// 配置是否存在校验
			for (let i in this.hourworkList) {
				if (this.hourworkList[i].name === detail.pieceWorkTitle && this.currentObjIndex != i) {
					this.$Common.toast(`列表中已存在${detail.pieceWorkTitle}`);
					return;
				}
			}

			// 全勤规则数据构建
			// let workRuleList = [];
			// if ((workRuleList = this.workRuleGenerate()) === false) return;

			submitData = {
				name: detail.pieceWorkTitle,
				unit: detail.pieceWorkUnit,
				price: (detail.pieceWorkPrice * 1).toFixed(2),
				// workRuleList
			};

			if (this.currentObjId) submitData.id = this.currentObjId;
			submitData.salaryType = this.salaryType; // 当前工种，0小时工，1正式工，2计件工
			submitData.period = this.periodIndex;

			// console.error(submitData);
			// todo 此处请求接口添加计件工配置，模拟异步请求
			// 请求接口数据
			this.$Request.post(this.$api.worktime.set_salary_settings, submitData, {
				"content-type": "multipart/form-data"
			}).then(res => {
				this.$Common.toast(res.message);
				if (res.code == 1) {
					// 提交完毕后currentObjId、currentObjIndex必须要恢复默认值，否则会影响到下次计件配置的添加
					if (this.currentObjId) {
						let list = this.hourworkList;
						list[this.currentObjIndex] = submitData;
						this.hourworkList = list;
					} else {
						submitData.id = Math.random() * 100;
						this.hourworkList.push(submitData);
					}
					this.currentObjId = 0;
					this.currentObjIndex = -1;
					this.$refs.tips2.close();
					// 更改配置则首页统计数据需要改变
					uni.$emit('updateSetting');
				}
			});
		},
		checktitle(title) {
			//验证标题长度
			if (title.length > 30) {
				this.$Common.toast('姓名不能超过30个字符');
			}
		},
		titleblur(title) {
			//标题输入失去焦点
			if (title.length < 1) {
				this.$Common.toast('内容不能少于2个字符');
			}
		},
		edit(id, index) {
			this.pieceWorkTitle = this.hourworkList[index].name;
			this.pieceWorkUnit = this.hourworkList[index].unit;
			this.pieceWorkPrice = this.hourworkList[index].price;
			// 不是每个工种都有单独的满勤设置
			// this.workRuleList = this.hourworkList[index].workRuleList;
			this.currentObjId = id;
			this.currentObjIndex = index;
			this.$refs.tips2.open();
		},
		del(id, index) {
			// 计件工配置列表项删除操作
			// todo 模仿异步请求接口
			this.$Request.post(this.$api.worktime.delete_salary_setting, {
				id
			}).then(res => {
				this.$Common.toast(res.msg);
				if (res.code == 1) {
					// 更改配置则首页统计数据需要改变
					uni.$emit('updateSetting');
					this.$delete(this.hourworkList, index);
				}
			});
		},
		addRule() {
			console.error(this.workRuleList);

			if (this.workRuleList.length > 4) {
				this.$Common.toast('全勤规则不能超过5条');
				return;
			}

			// 根据不同的工作种类添加
			this.workRuleList.push({
				fullDay: 0,
				fullMoney: 0
			});
		},
		delRule(id, index) {
			this.$delete(this.workRuleList, index);
		},
		giveValue(data) {
			if (this.salaryType === 0 || this.salaryType === 1) {
				try {
					data.full_work_setting = JSON.parse(data.full_work_setting);
				} catch (exception) {
					data.full_work_setting = [];
				}
			}
			
			// todo 此处请求接口，将上次设置填充
			if (this.salaryType === 0) {
				// 小时工，通过一个值中转赋值给计算属性hourWorkPrice
				this.currentObjId = data.work_setting_id;
				this.givenHourWorkPrice = data.hour_salary;
				this.periodIndex = data.work_period;
				this.workRuleList = data.full_work_setting;
			} else if (this.salaryType === 1) {
				// 正式工，通过一个值中转赋值给计算属性hourWorkPrice
				this.currentObjId = data.work_setting_id;
				this.fulltimeWorkSalary = data.month_salary;
				this.monthDay = data.month_day;
				this.dayWorkLong = data.work_day_hour;
				this.givenHourWorkPrice = data.hour_salary;
				this.commonWorkRatio = data.common_ratio;
				this.hourWorkWeekendRatio = data.weekend_ratio;
				this.hourWorkHolidayRatio = data.holiday_ratio;
				this.periodIndex = data.work_period;
				this.workRuleList = data.full_work_setting;
			} else {
				// 设置考勤周期
				if (data[0]) {
					this.periodIndex = data[0].work_period;
				}
				// console.error(item.full_work_setting);
				// console.error(this.workRuleList);
				this.hourworkList = data.map(item => {
					let d = {};
					d.id = item.work_setting_id;
					d.name = item.work_name;
					d.unit = item.work_unit;
					d.price = item.work_price;
					if (item.full_work_setting && this.workRuleList.length === 0) {
						console.error(item.full_work_setting);
						console.error(this.workRuleList);
						try {
							item.full_work_setting = JSON.parse(item.full_work_setting);
						} catch (exception) {
							item.full_work_setting = [];
						}
						this.workRuleList = item.full_work_setting;
					}
					return d;
				});
			}
		}
	}
};
</script>

<style lang="scss">
.odd {
	background-color: #94bcff;
	color: #fff;
}
input {
	color: #2979ff;
	border-bottom: 1px solid #efefef;
	font-weight: 500;
}
.uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
	border-radius: 20upx !important;
}
.uni-popup__wrapper.uni-custom.center .uni-popup__wrapper-box {
	width: 90% !important;
}
</style>
