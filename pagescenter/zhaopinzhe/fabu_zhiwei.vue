<template>
	<view class="padding">
		<!-- 列表start -->
		<view class="head_list cu-list menu sm-border">
			<view class="">
				<view class="" style=" ">
					<view class="text-df margin-bottom">职位标题</view>
					<view class="areabox text-df">
						<textarea placeholder="请输入职位标题" maxlength="20" style="width: 100%;height: 50upx;line-height: 1.5" :style="title ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						 v-model="title" placeholder-style="font-size:32upx;line-height:44upx" :placeholder-style="title ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
						<view class=" txtnum" :class="title && title.length == 20 ? 'text-red' : 'text-gray'">
							{{ (title && title.length) || 0 }}/20</view>
					</view>
				</view>
			</view>
			<view class="ptb15 " @tap="goSelectJob('iwant')" style="width: 100%;">
				<view class=" align-center flex justify-between" style="width: 100%;">
					<text class="text-df" style="margin-right: 10upx;flex-shrink: 0">职位类别</text>
					<view class=" text-right flex align-center" style="overflow-x: scroll; white-space: nowrap;">
						<view v-if="!(iwant && iwant.station_name)" class="text-gray"	>请选择</view>
						<view class=" " 	:style="iwant.station_name ? 'color:#666' : 'color:#BFBFBF'">							{{ iwant.station_name }}								</view>
					<text class="cuIcon-right text-999"></text>
					</view>
				</view>
			</view>
			<view class="">
				<view class=" margin-top  " style=" ">
					<view class="text-df margin-bottom">职位主图 ({{ (imgOne && imgOne!=''?1:0) || 0 }}/1)(选填)</view>
					<ben-upload v-if="defaultpic" :col="4" :max="1" @change="chooseLive" :defaultList="imgOne"
						:uShow='uShow'> </ben-upload>
				</view>
			</view>
			<view class="">
				<view class=" margin-top  " style=" ">
					<view class="text-df margin-bottom">职位视频 ({{ !open ? 0 : 1 }}/1)(选填)</view>
					<view class="cu-form-group">
						<view class="grid  grid-square flex-sub">
							<view class="bg-img" v-if="videoImg.length > 0">
								<image :src="videoImg" mode="aspectFill"></image>
								<view class="play" @tap="playVideo">
									<image :src="IMG_URL + 'static/miniwechat/play.png'" mode="aspectFill"></image>
								</view>
								<view class="cu-tag bg-red" @tap.stop="DelImg" style="z-index: 100;"><text
										class="cuIcon-close"></text></view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="videoImg.length == 0">
								<image :src="IMG_URL + 'static/miniwechat/creame_gray.png'" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="">
				<view class=" margin-top  " style=" ">
					<view class="text-df margin-bottom">职位轮播图 ({{ (imgList && imgList.length) || 0 }}/9)(选填)</view>
					<view class="text-gray" style="font-size: 24upx;margin-bottom: 10upx;">（请上传尺寸为375*375像素的图片)</view>
					<ben-upload v-if="defaultpic" :col="4" :max="9" @change="bannerLive" :defaultList="imgList"
						:uShow='uShow'></ben-upload>
				</view>
			</view>
			<view class="bgc"></view>
			<!-- <view class="cu-item arrow">
				<view class="" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">招聘单位</view>
					<view class="text-df bold" style="margin-bottom: 12upx;">{{zhiwei}}</view>					
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="" >
					<view class="text-df " style="margin-bottom: 12upx;">招聘人数</view>
					<input
						type="number"
						maxlength="5"
						placeholder="请输入招聘人数"
						@blur="leavePerson"
						v-model="zhaopin_number"
						:placeholder-style="zhaopin_number ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						:style="zhaopin_number ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
					/>
				</view>
			</view> -->
			<view class="cu-item arrow">
				<view class="">
					<view class=" text-df" style="margin-bottom: 12upx;">职位薪资</view>
					<view class="other flex justify-around align-center"
						style="font-size: 32upx;width: 80%;text-align: center;">
						<input type="number" v-model="min_salary" placeholder="最低薪资" maxlength="5" style="width: 40%;"
							:style="min_salary ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							:placeholder-style="min_salary ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
						<text class="text-gray text-df" style="width: 20%;">至</text>
						<input type="number" v-model="max_salary" placeholder="最高薪资" maxlength="5" @blur="leaveCon"
							:style="max_salary ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" style="width: 40%;"
							:placeholder-style="max_salary ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
					</view>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">薪资发放类型(选填)</view>
					<picker @change="sortConfirm" mode="selector" :range="price_sort" style="width: 100%;"
						range-key="label" :style="busort ? 'color: #333;font-weight:bold' : 'color: #E6E6E6;'">
						<text style="font-size: 32upx;">{{ busort || '请选择类型' }}</text>
					</picker>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="">
					<view class="text-df " style="margin-bottom: 12upx;">薪资发放类型金额(选填)</view>
					<input type="number" placeholder="请输入薪资发放类型金额" @blur="leavePrice" v-model="price_butie" maxlength="5"
						:placeholder-style="price_butie ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						:style="price_butie ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
				</view>
			</view>
			<view class="cu-item arrow" >
				<view class="" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">门店劳务报酬服务费(选填)</view>
					<input type="text" maxlength="3000" placeholder="门店成功为你推荐一个人,所给门店的服务费" v-model="server_price"
						:placeholder-style="server_price ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						:style="server_price ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
				</view>
			</view>
			<view class="cu-item arrow" v-if="station_type!=3">
				<view class="" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">厂发薪资(选填)</view>
					<input type="text" maxlength="3000" placeholder="请输入内容" v-model="factory_pay"
						:placeholder-style="factory_pay ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						:style="factory_pay ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
				</view>
			</view>
			<view class="cu-item arrow" v-if="station_type!=3">
				<view class="" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">补贴(选填)</view>
					<input type="text" maxlength="3000" placeholder="请输入补贴内容" v-model="subsidy"
						:placeholder-style="subsidy ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						:style="subsidy ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
				</view>
			</view>
			<view class="cu-item arrow" v-if="station_type!=3">
				<view class="" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">补贴备注(选填)</view>
					<input type="text" maxlength="3000" placeholder="请输入补贴备注" v-model="subsidy_remarks"
						:placeholder-style="subsidy_remarks ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						:style="subsidy_remarks ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
				</view>
			</view>
			<view class="cu-item arrow" v-if="station_type!=3">
				<view class="" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">车补(选填)</view>
					<input type="text" maxlength="3000" placeholder="请输入车补内容" v-model="car_subsidy"
						:placeholder-style="car_subsidy ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						:style="car_subsidy ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
				</view>
			</view>
			<view class="cu-item arrow" v-if="station_type!=3">
				<view class="" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">拿补贴日期(选填)</view>
					<input type="text" maxlength="11" placeholder="请输入车补内容" v-model="receiving_subsidy_date"
						:placeholder-style="receiving_subsidy_date ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						:style="receiving_subsidy_date ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="" style="width: 100%;">
					<view class=" text-df" style="margin-bottom: 12upx;">经验要求</view>
					<picker @change="experienceConfirm" mode="selector" style="width: 100%;" :range="experience"
						range-key="label" :style="act_experience ? 'color: #333;font-weight:bold' : 'color: #E6E6E6;'">
						<text style="font-size: 32upx;">{{ act_experience || '请选择' }}</text>
					</picker>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="" style="width: 100%;">
					<view class="text-df " style="margin-bottom: 12upx;">学历要求</view>
					<picker @change="degreeConfirm" mode="selector" style="width: 100%;" :range="degree_list"
						range-key="label" :style="degree_act ? 'color: #333;font-weight:bold' : 'color: #E6E6E6;'">
						<text style="font-size: 32upx;">{{ degree_act || '请选择' }}</text>
					</picker>
				</view>
			</view>
			<view class="cu-item arrow" @tap="toggleTab('agechoose')">
				<view class="" style="width: 100%;">
					<view class=" text-df" style="margin-bottom: 12upx;">年龄要求</view>
					<!-- #ifdef MP-WEIXIN -->
					<picker @change="ageConfirm" @columnchange="ageChange" mode="multiSelector" style="width: 100%;"
						:range="age2_list" :value="age_inx"
						:style="age_act ? 'color: #333;font-weight:bold' : 'color: #E6E6E6;'">
						<text style="font-size: 32upx;" v-if="age_act">{{ age_act }}</text>
						<text v-else>请选择年龄要求</text>
					</picker>
					<!-- #endif -->

					<!-- #ifndef MP-WEIXIN -->
					<view class="other " :style="age_act ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
						style="font-size: 32upx;">{{ age_act || '请选择' }}</view>
					<!-- #endif -->
				</view>
			</view>
			<!-- <view class="" v-if="station_type!=3">
				<view class="mt5 " style=" width: 100%;">
					<view class="text-df margin-bottom">红包标题</view>
					<view class=" text-df" >
						<input type="text" value="" placeholder="请输入" style="width: 100%;height: 50upx;"
							:style="hb_title ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="hb_title"
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="hb_title ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"/>
					</view>
				</view>
			</view> -->
			<view class="cu-item arrow" v-if="station_type!=3">
				<view class="" style="width: 100%;">
					<view class="text-df" style="margin-bottom: 12upx;">选择红包类型(选填)</view>
					<picker @change="hbConfirm" mode="selector" :range="hb_sort" style="width: 100%;" range-key="label"
						:style="hbSort ? 'color: #333;font-weight:bold' : 'color: #E6E6E6;'">
						<text style="font-size: 32upx;">{{ hbSort || '请选择' }}</text>
					</picker>
				</view>
			</view>
			<view class="" v-if="station_type!=3">
				<view class="mt5 " style=" ">
					<view class="text-df margin-bottom ">设置加薪金额(选填)</view>
					<view class=" text-df">
						<input type="number" value="" placeholder="请输入" style="width: 100%;height: 50upx;"
							:style="add_price ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="add_price"
							maxlength="5" placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="add_price ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
					</view>
				</view>
			</view>
			<view class="" v-if="station_type!=3">
				<view class="mt5 " style=" ">
					<view class="text-df margin-bottom ">需要助力分享人数(选填)</view>
					<view class=" text-df">
						<input type="number" value="" placeholder="请输入" style="width: 100%;height: 50upx;"
							:style="share_num ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="share_num"
							maxlength="3" placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="share_num ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
					</view>
				</view>
			</view>
			<view class="bgc"></view>
			<view class="" v-if="station_type!=3">
				<view class="">
					<view class="mt5" style=" ">
						<view class="text-df margin-bottom">职位及姓名1:（选填）</view>
						<view class=" text-df">
							<input type="text" value="" placeholder="请输入职位及姓名" style="width: 100%;height: 50upx;"
								:style="name1 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="name1"
								placeholder-style="font-size:32upx;line-height:44upx"
								:placeholder-style="name1 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
						</view>
					</view>
				</view>
				<view class="">
					<view class="mt5" style=" ">
						<view class="text-df margin-bottom">联系方式1:（选填）</view>
						<view class=" text-df">
							<input type="number" value="" placeholder="请输入联系电话" style="width: 100%;height: 50upx;"
								:style="mobeil1 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="mobeil1"
								maxlength="11" placeholder-style="font-size:32upx;line-height:44upx"
								:placeholder-style="mobeil1 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
						</view>
					</view>
				</view>
			</view>
			<view class="" v-if="station_type==3">
				<view class="mt5" style=" ">
					<view class="text-df margin-bottom">招聘电话:（选填）</view>
					<view class=" text-df">
						<input type="number" value="" placeholder="请输入联系电话" style="width: 100%;height: 50upx;"
							:style="mobeil1 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="mobeil1"
							maxlength="11" placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="mobeil1 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
					</view>
				</view>
			</view>
			<view class="" v-if="station_type!=3">
				<view class="mt5" style=" ">
					<view class="text-df margin-bottom">职位及姓名2:（选填）</view>
					<view class=" text-df">
						<input type="text" value="" placeholder="请输入职位及姓名" style="width: 100%;height: 50upx;"
							:style="name2 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="name2"
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="name2 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
					</view>
				</view>
			</view>
			<view class="" v-if="station_type!=3">
				<view class="mt5" style=" ">
					<view class="text-df margin-bottom">联系方式2:（选填）</view>
					<view class=" text-df">
						<input type="number" value="" placeholder="请输入联系电话" style="width: 100%;height: 50upx;"
							:style="mobeil2 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="mobeil2"
							maxlength="11" placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="mobeil2 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
					</view>
				</view>
			</view>
			<view class="" v-if="station_type!=3">
				<view class="mt5" style=" ">
					<view class="text-df margin-bottom">职位及姓名3:（选填）</view>
					<view class=" text-df">
						<input type="text" value="" placeholder="请输入职位及姓名" style="width: 100%;height: 50upx;"
							:style="name3 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="name3"
							placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="name3 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
					</view>
				</view>
			</view>
			<view class="" v-if="station_type!=3">
				<view class="mt5" style=" ">
					<view class="text-df margin-bottom">联系方式3:（选填）</view>
					<view class=" text-df">
						<input type="number" value="" placeholder="请输入联系电话" style="width: 100%;height: 50upx;"
							:style="mobeil3 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="mobeil3"
							maxlength="11" placeholder-style="font-size:32upx;line-height:44upx"
							:placeholder-style="mobeil3 ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" />
					</view>
				</view>
			</view>
			<view class="pt10" v-if="station_type!=3">
				<view class="   " style=" ">
					<view class="text-df margin-bottom">薪资说明（选填）</view>
					<view class="areabox text-df" style="height: 370upx;">
						<textarea placeholder="请输入薪资说明" maxlength="1500"
							style="width: 100%;height: 300upx;line-height: 1.5"
							:style="salaryDescription ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="salaryDescription" placeholder-style="font-size:32upx;color:#E6E6E6" />
						<view class="text-gray txtnum"
							:class="salaryDescription && salaryDescription.length == 1500 ? 'text-red' : 'text-gray'">
							{{ (salaryDescription && salaryDescription.length) || 0 }}/1500</view>
					</view>
				</view>
			</view>
			<view class="pt10" v-if="station_type==3">
				<view class="   " style=" ">
					<view class="text-df margin-bottom">职位描述（选填）</view>
					<view class="areabox text-df" style="height: 370upx;">
						<textarea placeholder="请输入职位描述" maxlength="1500"
							style="width: 100%;height: 300upx;line-height: 1.5"
							:style="salaryDescription ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="salaryDescription" placeholder-style="font-size:32upx;color:#E6E6E6" />
						<view class="text-gray txtnum"
							:class="salaryDescription && salaryDescription.length == 1500 ? 'text-red' : 'text-gray'">
							{{ (salaryDescription && salaryDescription.length) || 0 }}/1500</view>
					</view>
				</view>
			</view>
			<view class="pt10 mt10" v-if="station_type!=3">
				<view class="   " style=" ">
					<view class="text-df margin-bottom">食宿介绍（选填）</view>
					<view class="areabox text-df" style="height: 370upx;">
						<textarea placeholder="请输入食宿介绍" maxlength="1500"
							style="width: 100%;height: 300upx;line-height: 1.5"
							:style="content ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'" v-model="content"
							placeholder-style="font-size:32upx;color:#E6E6E6" />
						<view class="text-gray txtnum"
							:class="content && content.length == 1500 ? 'text-red' : 'text-gray'">
							{{ (content && content.length) || 0 }}/1500</view>
					</view>
				</view>
			</view>
			<view class="pt10 mt10" v-if="station_type!=3">
				<view class="   " style=" ">
					<view class="text-df margin-bottom">录用条件（选填）</view>
					<view class="areabox text-df" style="height: 370upx;">
						<textarea placeholder="请输入录用条件" maxlength="1500"
							style="width: 100%;height: 300upx;line-height: 1.5"
							:style="requirements ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="requirements" placeholder-style="font-size:32upx;color:#E6E6E6" />
						<view class="text-gray txtnum"
							:class="requirements && requirements.length == 1500 ? 'text-red' : 'text-gray'">
							{{ (requirements && requirements.length) || 0 }}/1500</view>
					</view>
				</view>
			</view>
			<view class="pt10 mt10" v-if="station_type!=3">
				<view class="   " style=" ">
					<view class="text-df margin-bottom">岗位介绍（选填）</view>
					<view class="areabox text-df" style="height: 370upx;">
						<textarea placeholder="请输入岗位介绍" maxlength="1500"
							style="width: 100%;height: 300upx;line-height: 1.5"
							:style="jobDescription ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="jobDescription" placeholder-style="font-size:32upx;color:#E6E6E6" />
						<view class="text-gray txtnum"
							:class="jobDescription && jobDescription.length == 1500 ? 'text-red' : 'text-gray'">
							{{ (jobDescription && jobDescription.length) || 0 }}/1500</view>
					</view>
				</view>
			</view>
			<view class="pt10 mt10" v-if="station_type!=3">
				<view class="   " style=" ">
					<view class="text-df margin-bottom">企业介绍（选填）</view>
					<view class="areabox text-df" style="height: 370upx;">
						<textarea placeholder="请输入企业介绍" maxlength="1500"
							style="width: 100%;height: 300upx;line-height: 1.5"
							:style="enterpriseIntroduction ? 'color:#333;font-weight:bold' : 'color:#E6E6E6'"
							v-model="enterpriseIntroduction" placeholder-style="font-size:32upx;color:#E6E6E6" />
						<view class="text-gray txtnum"
							:class="enterpriseIntroduction && enterpriseIntroduction.length == 1500 ? 'text-red' : 'text-gray'">
							{{ (enterpriseIntroduction && enterpriseIntroduction.length) || 0 }}/1500</view>
					</view>
				</view>
			</view>
			<!-- <view class="bgc"></view> -->
			<view class="cu-item arrow" @tap="getLocation">
				<view class="padding-top">
					<view class="text-df" style="margin-bottom: 12upx;">工作地点</view>
					<view class="" style="color: #E6E6E6;" v-if="!company_address">请选择地址</view>
					<view v-else class=" text-black text-bold text-md" style="padding-right: 50upx;">
						{{ company_address }}</view>
				</view>
			</view>
			<view class="cu-item arrow" @tap="selectFuli('changeFuli')">
				<view class="  ">
					<view class=" text-df" style="margin-bottom: 12upx;">职位福利</view>
					<view class="flex flex-wrap align-center justify-start">
						<text v-if="fuli.length == 0" class="text-md"
							:style="fuli.welfare_name ? 'color:#666666' : 'color:#E6E6E6'">请选择福利标签</text>
						<view class="biaoqian active" v-for="(item, index) in fuli" :key="index">
							{{ item.welfare_name }}
							<!-- <image @tap.stop="delJob(fuli, index)" :src="IMG_URL + 'static/miniwechat/cha.png'" mode=""></image> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 列表end -->
		<view class="margin-bottom mt30">
			<!-- <view class="f30 bold">
				您想要招聘{{ zhaopin_number || 0 }}人,需要缴纳保证金
				<text class="text-red">{{ totalMoney || 0 }}</text>
				元
			</view> -->
			<view class="btn_next text-df" style="margin-top: 10upx;background-color: #1B90FF;" @tap="gopay">保存并发布
			</view>
			<view class="padding text-sm text-gray text-center margin-bottom-sm">
				发布职位即代表遵守
				<text @tap="gorule" class="txt_red">《保障网招聘发布规则》</text>
				，如违反规则将受到相应的惩罚。
			</view>
		</view>
		<!-- #ifndef MP-WEIXIN -->
		<w-picker :visible.sync="agechoose" v-if="age_list.length > 0" mode="linkage" :options="age_list"
			@confirm="ageappConfirm" ref="agechoose" themeColor="#2A89FF"></w-picker>
		<!-- #endif -->

	</view>
</template>

<script>
	import benUpload from '@/components/ben-upload/ben-upload.vue';
	import wPicker from '@/components/w-picker/w-picker.vue';
	import {
		experience,
		age_list
	} from '@/common/js/mockData.js';
	import {
		age2_list
	} from '../../common/age.js'
	const Checker = require('@/common/js/formValidation.js');
	export default {
		components: {
			benUpload,
			wPicker
		},
		data() {
			return {
				experience, //经验要求
				IMG_URL:this.IMG_URL,
				act_experience: '', //经验要求
				price: false,
				experi: false,
				salaryDescription: '', //食宿介绍
				requirements: '', //录用条件
				jobDescription: '', //岗位介绍
				enterpriseIntroduction: '', //企业介绍
				education: '',
				zhaopin_number: '', //招聘人数
				uShow: false, //图片上传成功在展示
				defaultpic: false, //是否展示图片
				agechoose: false,
				age_list: age_list,
				age2_list: JSON.parse(JSON.stringify(age2_list)),
				age_inx: [0, 0],
				age_act: '', //选中的年龄段
				zhiwei: '', //选择的职位
				hb_sort: [], //红包类型列表
				hbSort: '', //选择的红包类型
				hbSort_id: '', //选择的红包类型id
				add_price: '', //加薪金额
				share_num: '', //助力分享人数
				degree_list: [], //学位列表
				degree_act: '', //选中的学位
				price_list: ['暂无相关内容'], //薪资列表
				busort: '', //工价分类
				factory_pay: '', //厂发薪资
				server_price:'',//门店服务费
					iwant: '', //我想找
				subsidy: '', //补贴
				subsidy_remarks: '', //补贴备注
				car_subsidy: '', //车补
				receiving_subsidy_date: '', //拿补贴日期
				min_salary: '',
				max_salary: '',
				price_butie: '', //工价金额
				content: '', // 食宿介绍
				fabu_money: '', //发布职位费用
				fuli: [], //选择的公司福利
				company_address: '', //公司地址
				imgOne: [], //职位主图
				videoImg: [], //职位视频缩略图
				video: '', //职位视频
				imgList: [], //职位轮播
				imgpath: [],
				max: 4, //图片最大数量
				check: '',
				hb_title: '', //红包标题
				mobeil1: '', //联系电话
				mobeil2: '', //联系电话
				mobeil3: '', //联系电话
				name1: '', //姓名
				name2: '', //姓名
				name3: '', //姓名
				hidden: true, //职位描述隐藏
				title: '', //职位标题
				isopen: true, //跳转福利页面
				priceOne: '', //单个保证金
				zhiwei_list: [{
						id: 1,
						label: '劳务派遣'
					},
					// {
					// 	id: 2,
					// 	label: '日结工作'
					// },
					{
						id: 3,
						label: '企业直招'
					}
				],
				price_sort: [{
						id: 1,
						label: '小时'
					},
					{
						id: 2,
						label: '返费'
					},
					{
						id: 3,
						label: '差价/小时'
					},
					{
						id: 4,
						label: '同工同酬'
					}, {
						id: 5,
						label: '计件'
					}, {
						id: 6,
						label: '底薪加提成'
					},
					{
						id: 7,
						label: '日结'
					}, {
						id: 8,
						label: '周结'
					},
				],
				// totalMoney: '', //支付金额
				city: '', //城市
				lon: '', //公司经度
				lat: '', //公司纬度
				open: false, //返回视频
				station_type: 3, //
			};
		},
		computed: {
			totalMoney() {
				return ((this.zhaopin_number * (this.priceOne * 100)) / 100).toFixed(2);
			}
		},
		onLoad(option) {
			this.station_type = option.station_type
			if (option.station_type == 3) {
				this.zhiwei = '企业直招'
			} else if (option.station_type == 1) {
				this.zhiwei = '劳务派遣'
			}
			this.getDegree();
			this.getPrice();
			this.gethb_sort()
			uni.removeStorageSync('fuliTag')
			// 监听选择公司福利
			uni.$on('changeFuli', data => {
				this.fuli = data.arr;
				if (this.fuli != '') {
					uni.setStorageSync('fuliTag', this.fuli)
				}
			});
			uni.$on('position', data => {
				// 职位类别
				console.log(data, '监听我选择我想找');
				this.iwant = data;
				console.log(this.iwant);
				if (this.iwant != '') {
					uni.setStorageSync('jobTag', this.iwant);
				}
			});
			setTimeout(() => {
				this.defaultpic = true;
			}, 300);
			uni.$on('video', data => {
				// 监听选择视频
				this.video = data.msg;
				if (data.msg != '') {
					this.videoImg = data.msg + '?x-oss-process=video/snapshot,t_10000,f_jpg,w_800,h_600,m_fast';
					this.open = true;
				}
			});
			// 监听选择地点
			// #ifdef APP-PLUS
			uni.$on('chooseLocation', data => {
				this.company_address = data.name;
				this.city = data.citys.areac;
				this.lon = data.longitude;
				this.lat = data.latitude;

			})
			// #endif

		},
		onUnload() {
			uni.$off('changeFuli');
			uni.$off('video');
			uni.$off('position');
		},
		methods: {
			chooseLive(e) {
				//选择图片
				this.imgOne = e;
				if (e != '') {
					this.uShow = true
					uni.hideLoading()
				}

			},
			goSelectJob(type) {
				// 点击我想找工作跳转
				// uni.$off(type);
				uni.navigateTo({
					url: '../../pagescommon/my_search?jobtype=1&request=1&type=' + type
				});
			},
			bannerLive(e) {
				//图片轮播
				this.imgList = e;
				if (e != '') {
					this.uShow = true
					uni.hideLoading()
				}
			},
			ChooseImage() {
				//选择视频
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: 'upload_video'
				});
			},
			DelImg() {
				//删除视频
				uni.showModal({
					content: '确定要删除视频吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.videoImg = '';
							this.open = false;
						}
					}
				});
			},
			// releavem1(){//联系方式1失去焦点
			// 	if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil1)) {
			// 		this.$Common.toast('请填写正确的联系方式1')
			// 		return false;
			// 	}
			// },
			// releavem2(){//联系方式2失去焦点
			// 	if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil2)) {
			// 		this.$Common.toast('请填写正确的联系方式2')
			// 		return false;
			// 	}
			// },
			// releavem3(){//联系方式3失去焦点
			// 	if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil3)) {
			// 		this.$Common.toast('请填写正确的联系方式3')
			// 		return false;
			// 	}
			// },
			gethb_sort() { //获取红包类型
				this.$Request.get(this.$api.index.get_fuli_info).then(res => {
					if (res.code == 1) {
						this.hb_sort = res.data.red_envelope_type;
					} else {}
				});
			},
			getDegree() {
				//获取学位
				this.$Request.post(this.$api.user.user_degree).then(res => {
					if (res.code == '1') {
						this.degree_list = res.data;
					}
				});
			},
			getPrice() {
				//获取保证金
				this.$Request.post(this.$api.company.companyInfo).then(res => {
					if (res.code == '1') {
						this.priceOne = parseFloat(res.data.info.money);
					}
				});
			},
			playVideo() {
				//播放视频
				uni.navigateTo({
					url: 'play_video?url=' + this.video
				});
			},
			leavePrice() { //工价金额失去焦点
				if (!/^[1-9]/.test(this.price_butie)) {
					this.$Common.toast('请输入不以0开头的工价金额');
					this.price_butie = ''
					return false;
				}
			},
			leavePerson() { //招聘人数失去焦点
				if (!/^[1-9]\d*$/.test(this.zhaopin_number)) {
					this.$Common.toast('请输入不以0开头并且为整数的招聘人数');
					this.zhaopin_number = ''
					return false;
				}
			},
			leaveCon() { //最大薪资失去焦点
				if (!/^[1-9]/.test(this.min_salary)) {
					this.$Common.toast('请输入不以0开头的薪资要求');
					this.min_salary = ''
					return false;
				}
				if (!/^[1-9]/.test(this.max_salary)) {
					this.$Common.toast('请输入不以0开头的薪资要求');
					this.max_salary = ''
					return false;
				}
				if (Number(this.max_salary) < Number(this.min_salary)) {
					this.$Common.toast('薪资要求不合理')
					this.max_salary = ''
				}
			},
			getLocation() {
				//获取工作地点定位
				let _this = this;
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: '/pagescenter/index'
				})
				// #endif
				// #ifndef APP-PLUS
				uni.chooseLocation({
					success(res) {
						_this.company_address = res.address;
						_this.city = res.address;
						_this.lon = res.longitude;
						_this.lat = res.latitude;
					}
				});
				// #endif

			},
			selectFuli() {
				//选择福利
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 3000);
				uni.navigateTo({
					url: '../../pagescommon/gongsi_fuli'
				});
			},
			gopay() {
				//完成发布
				// 验证

				if (!this.title) {
					this.$Common.toast('请选择职位标题');
					return false;
				}
				if (this.iwant == '') {
					this.$Common.toast('请选择职位类别');
					return;
				}
				// if (this.imgOne == '') {
				// 	this.$Common.toast('请选择职位主图');
				// 	return false;
				// }
				// if (this.videoImg == '') {
				// 	this.$Common.toast('请选择职位视频');
				// 	return false;
				// }

				// if (!this.imgList) {
				// 	this.$Common.toast('请选择职位轮播图');
				// 	return false;
				// }

				if (!this.min_salary && !this.max_salary) {
					this.$Common.toast('请输入薪资要求');
					return false;
				}
				if (Number(this.max_salary) < Number(this.min_salary)) {
					this.$Common.toast('薪资要求不合理')
					return false;
				}
				// if (!this.busort) {
				// 	this.$Common.toast('请选择工价类型');
				// 	return false;
				// }
				// if (!this.price_butie) {
				// 	this.$Common.toast('请输入工价金额');
				// 	return false;
				// }
				if (!this.act_experience) {
					this.$Common.toast('请选择经验要求');
					return false;
				}
				if (!this.degree_act) {
					this.$Common.toast('请选择学历要求');
					return false;
				}
				if (!this.age_act) {
					this.$Common.toast('请选择年龄要求');
					return false;
				}
				if (this.mobeil1) {
					if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil1)) {
						if(this.station_type==3){
							this.$Common.toast('请填写正确的联系方式')
						}else{
							this.$Common.toast('请填写正确的联系方式1')
						}
						return false;
					}
				}
				if (this.mobeil2) {
					if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil2)) {
						this.$Common.toast('请填写正确的联系方式2')
						return false;
					}
				}
				if (this.mobeil3) {
					if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil3)) {
						this.$Common.toast('请填写正确的联系方式3')
						return false;
					}
				}
				if (!this.company_address) {
					this.$Common.toast('请选择工作地点');
					return false;
				}
				var fuli_arr = []; //职位
				var vocation_type = '';
				this.fuli.map(item => {
					fuli_arr.push(item.aid);
				});
				vocation_type = fuli_arr.join(',');
				if (!vocation_type) {
					this.$Common.toast('请选择福利标签');
					return false;
				}
				var skill_certificate = [],
				image=''
				this.imgList &&
					this.imgList.map(item => {
						skill_certificate.push(item.aid);
					});
					if(this.imgOne!=''){
						image=this.imgOne[0].aid
					}
				let formData = {
					name: this.title, //职位标题
					image:image || '', //职位主图
					video: this.video || '', //职位视频
					ads_imgas: skill_certificate.join(',') || '', //职位轮播图
					station_type: this.station_type, //职位类型
					fan_type: this.busort_id, //工价类型
					fan_price: this.price_butie, //工价金额
					experience: this.act_experience, //经验要求
					education: this.degree_act, //学历
					age: this.age_act, //年龄要求
					min_salary: this.min_salary, //最低薪资
					max_salary: this.max_salary, //最高薪资
					stations:this.iwant.aid,//职位分类
					factory_pay: this.factory_pay || '', //厂发薪资
					server_price:this.server_price||'',//服务费
					subsidy: this.subsidy || '', //补贴
					subsidy_remarks: this.subsidy_remarks || '', //补贴备注
					car_subsidy: this.car_subsidy || '', //车补
					receiving_subsidy_date: this.receiving_subsidy_date || '', //拿补贴日期
					accommodation_introduction: this.content || '', //食宿介绍
					salary_description: this.salaryDescription || '', //薪资要求  企业直招为职位描述
					employment_conditions: this.requirements || '', //录用条件
					job_description: this.jobDescription || '', //岗位介绍
					enterprise_introduction: this.enterpriseIntroduction || '', //企业介绍
					address: this.company_address || '', //工作地点
					welfare: vocation_type, //福利标签
					numbers: this.zhaopin_number, //招聘人数
					city: this.city, //工作城市
					lon: this.lon,
					lat: this.lat,
					driver_name: this.name1 || '',
					driver_phone: this.mobeil1 || '',
					resident_manager_name: this.name2 || '',
					resident_manager_phone: this.mobeil2 || '',
					finance_manager_name: this.name3 || '',
					finance_manager_phone: this.mobeil3 || '',
					red_envelope_num: this.share_num, //红包助力人数
					red_envelope_money: this.add_price, //红包金额
					red_envelope_type: this.hbSort_id, //红包类型
					red_envelope_theme: this.hb_title, //红包标题
				};
				if (this.isopen == false) {
					return;
				};
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true
				}, 3000);
				this.$Request.post(this.$api.user.user_creat_job, formData).then(res => {
					if (res.code == 1) {
						uni.$emit('updateList', {})
						uni.navigateBack({})
						// uni.redirectTo({
						// 	url: 'fabu?title=fabu&price=' + this.totalMoney + '&order_sn=' + res.data.order_sn
						// });
					} else {
						this.$Common.toast(res.msg);
					}
				});
			},
			gorule() {
				//跳发布规则
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: '../../pagescommon/post_recruitment'
				});
			},

			toggleTab(who) {
				//显示选择组件
				this.$data[who] = true;
				this.hidden = false
			},
			experienceConfirm(e) {
				//选择经验要求
				// this.act_experience = e.result;
				var index = e.detail.value;
				this.act_experience = this.experience[index].label;
			},
			degreeConfirm(e) {
				//选择学历要求
				var index = e.detail.value;
				this.degree_act = this.degree_list[index].label;
			},
			zhiweiConfirm(e) {
				//选择职位
				var index = e.detail.value;
				this.zhiwei = this.zhiwei_list[index].label;
				this.zhiwei_id = this.zhiwei_list[index].id;
			},
			sortConfirm(e) {
				//选择工价类型
				var index = e.detail.value;
				this.busort = this.price_sort[index].label;
				this.busort_id = this.price_sort[index].id;
			},
			hbConfirm(e) {
				//选择红包类型
				var index = e.detail.value;
				this.hbSort = this.hb_sort[index].label;
				this.hbSort_id = this.hb_sort[index].id;
			},
			ageappConfirm(val) { //app端选择年龄
				this.age_act = val.value[0] + '-' + val.value[1];
			},
			ageConfirm(e) {
				//选择年龄
				this.age_inx = e.detail.value;
				this.age_act = this.age2_list[0][this.age_inx[0]] + '-' + this.age2_list[1][this.age_inx[1]]
			},
			ageChange(e) { //改变、拖动数据控制第二行变化
				let act_inx = e.detail;
				if (act_inx.column == 0) {
					this.age2_list[1] = age2_list[1].slice(act_inx.value);
					this.age_inx[1] = 0;
				}
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #fff;
		height: 100%;
		letter-spacing: 1px;
	}

	.active {
		background-color: #f27b04 !important;
		color: #fff !important;
	}

	.bgc {
		width: 100%;
		height: 20rpx;
		background-color: #f9f9f9;
	}

	.header {
		width: 750rpx;
		height: 440rpx;
		position: relative;

		image {
			width: 100%;
			height: 100%;
		}

		.title_txt {
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	.areabox {
		width: 100%;
		height: 160upx;
		border: 1px solid #cccccc;
		padding: 20upx;
		position: relative;

		.txtnum {
			position: absolute;
			font-size: 24upx;
			bottom: 8upx;
			right: 20upx;
		}

		// textarea{
		// 	position: relative;
		// 	z-index: -1;
		// }
	}

	uni-textarea {
		width: 560rpx;
		height: 400rpx;
	}

	.btn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: #2a89ff;
		color: #fff;
	}

	.biaoqian {
		padding: 8rpx 10rpx;
		background-color: #50aeff;
		border-radius: 10rpx;
		font-size: 22rpx;
		margin-right: 20rpx;
		margin-bottom: 16upx;
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

	.solids image {
		width: 158upx;
		height: 158upx;
	}

	.solids::after {
		border: 0;
	}

	.bom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.cu-form-group {
		padding: 0;

		.bg-img {
			width: 300upx;
			height: 200upx;
			position: relative;

			.play {
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				top: 0;
				z-index: 10;
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(255, 255, 255, 0.3);

				image {
					max-width: 80upx;
					max-height: 80upx;
				}
			}
		}

		.bg-img>image {
			width: 100%;
			height: 100%;
		}
	}

	.cu-list.menu.sm-border>.cu-item:after {
		left: 0;
	}

	.cu-list.menu>.cu-item.arrow {
		padding: 0;
		min-height: 140upx;
	}

	.cu-list.menu>.cu-item:last-child:after {
		border-bottom: 0.5px solid #ddd
	}

	.cu-list.menu>.cu-item.arrow:before {
		top: 58upx;
		opacity: 0.6;
	}

	// .cu-list.menu>.cu-item.arrow:nth-child(15):before,
	// .cu-list.menu>.cu-item.arrow:nth-child(14):before,
	// .cu-list.menu>.cu-item.arrow:nth-child(13):before,
	// .cu-list.menu>.cu-item.arrow:nth-child(12):before,
	// .cu-list.menu>.cu-item.arrow:nth-child(11):before,
	// .cu-list.menu>.cu-item.arrow:nth-child(10):before,
	// .cu-list.menu>.cu-item.arrow:nth-child(8):before,
	// .cu-list.menu>.cu-item.arrow:nth-child(7):before,
	.cu-list.menu>.cu-item.arrow:before {
		opacity: 0;
	}
</style>
