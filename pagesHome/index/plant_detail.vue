<template>
	<view class="">
		<!-- 导航栏end -->
		<view class="">
			<!-- #ifdef APP-PLUS -->
			<view class="flex align-center bg-white justify-between plr15 topBar ptb10"
				:style="[{ paddingTop: StatusBar + 'px',height:CustomBar+'px' }]">
				<view class=""><text class="cuIcon-back " @click.stop="back"></text></view>
				<view>详情</view>
				
				<view class="">
					<view class="share">
						<image class="share" :src="IMG_URL + 'static/miniwechat/new/share_black.png'" mode="aspectFill"
							@tap="share"></image>
					</view>
				</view>
			</view>
			<!-- <view class="flex align-center justify-between plr20 topBar ptb10 bg-white" :class="topDistance > 0 ? 'bg_theme' : ''"
			 :style="[{ paddingTop: StatusBar + 'px' }]">
				<view class=""><text class="cuIcon-back " @click.stop="back"></text></view>
				<view>
					<view class="share">
						<image class="share" :src="IMG_URL + 'static/miniwechat/share.png'" mode="aspectFill" @tap="share"></image>
					</view>
				</view>
			</view> -->
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<view class="topBox" :style="[{ marginTop: CustomBar + 'px' }]">
				<!-- #endif -->
				<!-- #ifndef APP-PLUS -->
				<view class="topBox">
					<!-- #endif -->
					<!-- banner图 -->
					<view class=""
						v-if="plant_detail.video||plant_detail.ads_imgas ||plant_detail.image||plant_detail.ads_imgas!=null">
						<view class="flex justify-center banner">
							<!-- <view class=" "> -->
							<swiper class="screen-swiper" :class="dotStyle ? 'square-dot' : 'round-dot'"
								:indicator-dots="true" :circular="false" :autoplay="false" interval="5000"
								duration="500" style="width: 100%;height: 700upx; background-color: #F7F7F7;"
								v-if="plant_detail.video||plant_detail.ads_imgas">
								<swiper-item v-if="plant_detail.video " @tap="toPage()">
									<view class="flex alcenter justify-center"
										style="position: relative;height: 700upx;">
										<image :src="plant_detail.video_id" mode="aspectFill" class="video_image">
										</image>
										<view class="play_tag flex justify-center alcenter">
											<!-- <text class="f64  cuIcon-playfill"></text> -->
											<image class="" :src="IMG_URL + 'static/miniwechat/play.png'"
												mode="aspectFill">
											</image>
										</view>
									</view>
								</swiper-item>
								<swiper-item v-for="(item, index) in plant_detail.ads_imgas" @tap='yulan(item,index)'
									v-if="plant_detail.ads_imgas" :key="index" style="height: 700rpx;">
									<image :src="item || IMG_URL + 'static/miniwechat/toppic.png'" mode="aspectFill">
									</image>
								</swiper-item>
								<!-- <swiper-item style="height: 500rpx;"><image :src="IMG_URL+'static/miniwechat/toppic.png'" mode="aspectFill"></image></swiper-item> -->
							</swiper>
							<image :src="plant_detail.image" mode="aspectFill"
								v-if="plant_detail.ads_imgas==''&&plant_detail.video==''&&plant_detail.image"
								style="width: 100%;height: 700upx; background-color: #F7F7F7;"
								@tap='yulan(plant_detail.image,1)'></image>

						</view>
					</view>
				</view>
				<view class="helpEnvelopes flex align-center plr10 justify-between" @tap='helpEdd' v-if="showRedBox">
					<view class=" flex align-center">
						<image :src="IMG_URL + 'static/miniwechat/new/detail_icon1.png'" mode="aspectFill"></image>
						<view class="new_theme f28 ml10">参加活动助力加薪</view>
					</view>
					<view class=" flex align-center">
						<view class="new_theme f28 mr5">{{plant_detail.red_envelope_type_info||''}} + </view>
						<image :src="IMG_URL + 'static/miniwechat/new/detail_icon2.png'" mode="aspectFill"></image>
					</view>
				</view>
				<!-- 招聘信息 -->
				<view class="brb_e pb20 flex column plr10 mt20">
					<view class="flex between">
						<view class="mr5">
							<view class="f40 gray3 bold">{{ plant_detail.name || '----' }}</view>
							<view class="flex align-center f28 flex-wrap" style="color: #6B6E77;">
								<text class="">{{ plant_detail.city || '---' }}</text>
								<text class="mlr10">{{ plant_detail.experience || '---' }}</text>
								<text class="">{{ plant_detail.education_name || '---' }}</text>
								<text class="ml10">{{ plant_detail.age || '---' }}周岁</text>
							</view>
						</view>
						<!-- 工价 -->
						<view class="returnBox flex column around  alcenter" style="flex-shrink: 0;"
							v-if="plant_detail.fan_price!=''">
							<text class="f28 top_blue tc">{{ plant_detail.fan_type || '无' }}</text>
							<text class="f28 normal_red ellipsis tc bold plr5"
								style="width: 100%;">{{ plant_detail.fan_price || 0 }}元</text>
						</view>
					</view>
					<view class="flex align-center justify-between" style="padding: 10upx 0;">
						<view class="normal_red text-lg money ewrap ">
							{{ plant_detail.min_salary || '--' }}~{{ plant_detail.max_salary || '--' }}元/月
						</view>
						<view class=" ellipsis  text-right flex_shrink">
							<text
								class="text-df gray6 text-right  mt10">已报名{{ plant_detail.apply_numbers || 0 }}人</text>
						</view>
					</view>
					<view class="text-right text-sm text-red" @click.stop="lookService(item)"
						v-if="plant_detail.server_price!=''">门店情报</view>
					<view class="text-sm gray6">
						<text class="cu-tag  label_item" v-for="(itm, index) in plant_detail.welfare" :key="index"
							v-if="plant_detail.welfare != ''">{{ itm.welfare_name||'' }}</text>
						<text class="cu-tag  label_item" v-if="plant_detail.welfare == ''">暂无相关福利信息</text>
					</view>
				</view>
				<!-- end -->
				<!-- 新增 补贴内容 -->
				<view class="padding"
					v-if="(plant_detail.factory_pay||plant_detail.subsidy||plant_detail.subsidy_remarks||plant_detail.car_subsidy||plant_detail.receiving_subsidy_date)&&plant_detail.station_type==1">
					<view class="mb5" v-if="plant_detail.factory_pay">
						<text class=" f28">厂发薪资</text>
						<text class="f28 padding-left-sm new_theme">{{plant_detail.factory_pay||'暂无内容'}}</text>
					</view>
					<view class="mb5" v-if="plant_detail.subsidy">
						<text class=" f28 ">补贴</text>
						<text class="f28 padding-left-sm new_theme">{{plant_detail.subsidy||'暂无补贴信息'}}</text>
					</view>
					<view class="plr15 ptb10 mb5 radius-16" v-if="plant_detail.subsidy_remarks"
						style="background-color: #FFF5E3;">
						<text class=" f28">备注</text>
						<text class="f28 padding-left-sm new_theme">{{plant_detail.subsidy_remarks||'暂无备注信息'}}</text>
					</view>
					<view class="mb5" v-if="plant_detail.car_subsidy">
						<text class=" f28">车补</text>
						<text class="f28 padding-left-sm new_theme">{{plant_detail.car_subsidy||'暂无车补信息'}}</text>
					</view>
					<view class="" v-if="plant_detail.receiving_subsidy_date">
						<text class=" f28">拿补贴日期</text>
						<text
							class="f28 padding-left-sm new_theme">{{plant_detail.receiving_subsidy_date||'暂无补贴信息'}}</text>
					</view>
					<view class="" v-if="plant_detail.meal_xpenses">
						<text class=" f28">餐费</text>
						<text class="f28 padding-left-sm new_theme">{{plant_detail.meal_xpenses||'暂无餐费信息'}}</text>
					</view>
					<view class="" v-if="plant_detail.deduction">
						<text class=" f28">扣款</text>
						<text class="f28 padding-left-sm new_theme">{{plant_detail.deduction||'暂无扣款信息'}}</text>
					</view>
				</view>
				<view class="bg-f2f3"></view>
				<!-- 公司信息 -->
				<view class=" bg-white ptb10 radius-20 flex align-start between plr10" @tap="godetail(companyInfo.aid)">
					<view class="flex around">
						<view class="shop_img" style="flex-shrink: 0;" v-if="companyInfo.image">
							<image :src="companyInfo.image " mode="aspectFill" class=" mr10 "></image>
						</view>
						<view class="flex column justify-around">
							<view class=" flex align-center">
								<view class="f34 gray3 bold ewrap text_line1" style="color: #111111;"
									v-if="companyInfo">
									{{ companyInfo.company_name||'' }}
								</view>
							</view>
							<view class="f24 gray3 normal_red mb5">营业执照已认证</view>
							<view class="theme_blue text-sm" v-if="voucher==0">
								已向平台支付保证金{{ plant_detail.money || 0 }}元！</view>
							<view class="gray9 text-sm flex align-center">
								<text class="lg text-gray cuIcon-location " style="padding-top: 6upx;"></text>
								<text class="text_line1 ewrap">{{ companyInfo.company_address||'未设置' }}</text>
							</view>
						</view>
					</view>
					<!-- 公司信息 -->
					<view class="flex  ml10  column justify-around ">
						<text class="lg text-gray cuIcon-right tr"></text>
						<!-- #ifndef H5 -->
						<text class="theme_tag flex align-center justify-center text-white f28 mt10"
							@tap.stop="follow">{{ is_collection ? '已收藏' : '收藏' }}</text>
						<!-- #endif -->
					</view>

				</view>
				<view class="line_cut"></view>
				<!-- 职位详情 -->
				<!-- <view class="mt20 brb_e pb10 plr15" v-if="plant_detail.describe!=''">
				<view class="location gray3 bold text-lg">职位详情</view>
				<view class="gray6 text-df flex column lh30 mt10"><text v-html="plant_detail.describe || '暂无相关数据'"></text></view>
			</view> -->

				<view class="mt20 brb_e pb10 plr15"
					v-if="plant_detail.salary_description!=''&&plant_detail.station_type==1">
					<view class="location gray3 bold text-lg">薪资说明</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						<!-- #ifndef MP-WEIXIN -->
						<rich-text :nodes="plant_detail.salary_description"></rich-text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<jyf-parser :html='plant_detail.salary_description'></jyf-parser>
						<!-- #endif -->
					</view>
				</view>
				<view class="mt20 brb_e pb10 plr15"
					v-if="plant_detail.salary_description!=''&&plant_detail.station_type==3">
					<view class="location gray3 bold text-lg">职位描述</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						<!-- #ifndef MP-WEIXIN -->
						<rich-text :nodes="plant_detail.salary_description"></rich-text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<jyf-parser :html='plant_detail.salary_description'></jyf-parser>
						<!-- #endif -->
					</view>
				</view>
				<view class="mt20 brb_e pb10 plr15"
					v-if="plant_detail.accommodation_introduction!=''&&plant_detail.station_type==1">
					<view class="location gray3 bold text-lg">食宿介绍</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						<!-- #ifndef MP-WEIXIN -->
						<!-- <text v-html="plant_detail.accommodation_introduction"></text> -->
						<rich-text :nodes="plant_detail.accommodation_introduction"></rich-text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<!-- <mp-html :content="plant_detail.accommodation_introduction" /> -->
						<jyf-parser :html='plant_detail.accommodation_introduction'></jyf-parser>
						<!-- #endif -->
					</view>
				</view>
				<view class="mt20 brb_e pb10 plr15"
					v-if="plant_detail.employment_conditions!=''&&plant_detail.station_type==1">
					<view class="location gray3 bold text-lg">录用条件</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						<!-- #ifndef MP-WEIXIN -->
						<!-- <text v-html="plant_detail.employment_conditions"></text> -->
						<rich-text :nodes="plant_detail.employment_conditions"></rich-text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<!-- <mp-html :content="plant_detail.employment_conditions" /> -->
						<jyf-parser :html='plant_detail.employment_conditions'></jyf-parser>
						<!-- #endif -->
					</view>
				</view>
				<view class="mt20 brb_e pb10 plr15"
					v-if="plant_detail.job_description!=''&&plant_detail.station_type==1">
					<view class="location gray3 bold text-lg">岗位介绍</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						<!-- #ifndef MP-WEIXIN -->
						<!-- <text v-html="plant_detail.job_description "></text> -->
						<rich-text :nodes="plant_detail.job_description"></rich-text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<!-- <mp-html :content="plant_detail.job_description" /> -->
						<jyf-parser :html='plant_detail.job_description'></jyf-parser>
						<!-- #endif -->
					</view>
				</view>

				<view class="mt20 brb_e pb10 plr15"
					v-if="plant_detail.enterprise_introduction!=''&&plant_detail.station_type==1">
					<view class="location gray3 bold text-lg">企业介绍</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						<!-- #ifndef MP-WEIXIN -->
						<!-- <text v-html="plant_detail.enterprise_introduction"></text> -->
						<rich-text :nodes="plant_detail.enterprise_introduction"></rich-text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<!-- <mp-html :content="plant_detail.enterprise_introduction" /> -->
						<jyf-parser :html='plant_detail.enterprise_introduction'></jyf-parser>
						<!-- #endif -->
					</view>
				</view>
				<view class="mb10 plr15 pt5">
					<view class="f30 gray6 mb5" v-if="plant_detail.driver_name!=''&&plant_detail.driver_phone!=''">
						{{ plant_detail.driver_name||'' }}：
						<text style="color: #007AFF;" @tap="call(plant_detail.driver_phone)"
							selectable="true">{{ plant_detail.driver_phone_s||'' }}</text>
					</view>
					<view class="f30 gray6 mb5"
						v-if="plant_detail.resident_manager_name!=''&&plant_detail.resident_manager_phone!=''">
						{{ plant_detail.resident_manager_name||'' }}：
						<text style="color: #007AFF;" @tap="call(plant_detail.resident_manager_phone)"
							selectable="true">{{ plant_detail.resident_manager_phone_s||'' }}</text>
					</view>
					<view class="f30 gray6"
						v-if="plant_detail.finance_manager_name!=''&&plant_detail.finance_manager_phone!=''">
						{{ plant_detail.finance_manager_name||'' }}：
						<text style="color: #007AFF;" @tap="call(plant_detail.finance_manager_phone)"
							selectable="true">{{ plant_detail.finance_manager_phone_s ||''}}</text>
					</view>
				</view>
				<!-- end -->

				<view class="line_cut"></view>

				<!-- 地图 -->
				<view class="mt20  plr10 pb45">
					<view class="location gray3 bold text-lg">工作地址</view>
					<view class="flex between mtb10">
						<text class="gray3 text-df bold">{{ plant_detail.city || '暂无地址' }}</text>
						<text class="gray9 text-sm ml5"
							style="flex-shrink: 0;">距离我{{ companyInfo.distance || '----' }}公里</text>
					</view>
					<view class="flex  justify-between">
						<text class="gray6 	text-df">详细地址：{{ plant_detail.address || '暂无详细地址' }}</text>
						<view class="mb10 ml10" @tap="choose_location">
							<!-- <map style="width: 334upx; height: 188rpx;" v-if="latitude" :latitude="latitude" :longitude="longitude" :markers="covers"></map> -->
							<image :src="IMG_URL + 'static/miniwechat/map.png'" mode="aspectFill" class="mapImg">
							</image>
						</view>
					</view>
				</view>
				<!-- end -->

				<view class=" pb100  " v-if="sign_up_page">
					<view class="bom_item flex align-center justify-between plr10" @tap='goComplant'>
						<view class="new_theme f28">投诉举报</view>
						<image style="width: 12upx;height: 24upx;"
							:src="IMG_URL + 'static/miniwechat/new/detail_icon3.png'" mode=""></image>
					</view>
					<view class=" f22 ptb10 plr10 txt-theme">
						保障网向您承诺所有职位不向您收费，如遇变相收费，薪资不实、工资拖欠、人身攻击、色情骚扰、虚假职位等。请立即投诉举报。电话️
						<text class="txt-theme pl5" @tap="call('400—6765—006')"> 400—6765—006</text>
					</view>

				</view>
				<!-- #ifndef H5 -->
				<!-- 底部操作按钮 -->
				<view class="bg-white handle_footer" style="color: #FFFFFF;bottom: 90upx;height: 70upx;">
					<view class=" f22 ptb10 plr10  new_theme  " style=" background-color: #F4F5F7;">
						为了安全，请大家走线上平台报名入职。
					</view>
				</view>
				<view class="handle_footer flex">
					<view class="flex justify-around column alcenter sevirce_btn" @tap="gomessage"
						v-if="plant_detail.servicebroker==''&&plant_detail.station_type==1">
						<text class=" text-gray cuIcon-servicefill"
							style="font-size: 21px;width: 42upx;height: 44upx;"></text>
						<text class=" text-df ">线上客服</text>
					</view>
					<view class="flex justify-around column alcenter sevirce_btn" @tap="gomessage"
						v-if="plant_detail.station_type==3">
						<text class=" text-gray cuIcon-servicefill"
							style="font-size: 21px;width: 42upx;height: 44upx;"></text>
						<text class=" text-df ">线上客服</text>
					</view>
					<view class="flex justify-around column alcenter sevirce_btn" @tap="colloct_job"
						v-if="sign_up_page">
						<text class=" text-gray cuIcon-favor" v-if="!job_collect"
							style="font-size: 21px;width: 42upx;height: 44upx;"></text>
						<text class=" text-gray cuIcon-favorfill new_theme" v-else
							style="font-size: 21px;width: 42upx;height: 44upx;"></text>
						<text class=" text-df ">收藏</text>
					</view>
					<view class="flex justify-center alcenter btn1 phone_btn" @tap="call_phone"
						v-if="plant_detail.servicebroker==''&&plant_detail.station_type==1">
						<!-- <image src="../../static/images/index/phone.png" class="mr5" mode="widthFix" ></image> -->
						<text>电话沟通</text>
					</view>
					<view class="flex justify-center alcenter btn1 phone_btn" @tap="call_phone"
						v-if="plant_detail.station_type==3">
						<!-- <image src="../../static/images/index/phone.png" class="mr5" mode="widthFix" ></image> -->
						<text>电话沟通</text>
					</view>
					<view class="flex1">
						<view class="flex justify-center  alcenter  apply_btn" @tap="apply_job" v-if="sign_up_page">
							<view class="">报名</view>
						</view>
						<view class="flex justify-center  alcenter btn1 "
							style="background-color: #F4F5F7;height: 100%;" v-else>
							<view class="">已报名</view>
						</view>
					</view>
				</view>
				<!-- #endif -->
			</view>
			<!-- #ifdef H5 -->
			<view class="box_h5 bg-theme text-white f28" @tap='goDownLoad'>
				去下载APP
			</view>
			<!-- #endif -->
			<uni-popup type="bottom" ref="shareType">
				<view class="bg-white ptb20" style="border-radius: 20upx 20upx 0 0;">
					<view class="text-bold text-md text-center mb30 posRelt">
						分享
						<view class="icon_x" @tap="close">X</view>
					</view>
					<view class="flex justify-around align-center">
						<!-- #ifndef MP-WEIXIN -->
						<view class="pictype flex align-center justify-center column" @tap="wefriend">
							<image :src="IMG_URL + 'static/miniwechat/weixin.png'" mode="aspectFill"></image>
							<view class="text-df padding-top-sm">微信好友</view>
						</view>
						<view class="pictype flex align-center justify-center column" @tap="wecircle">
							<image :src="IMG_URL + 'static/miniwechat/pengyouquan.png'" mode="aspectFill"></image>
							<view class="text-df padding-top-sm">朋友圈</view>
						</view>
						<!-- #endif -->
						<view class="pictype flex align-center justify-center column" @tap="posterImage">
							<image src="/static/images/poster.png" mode="aspectFill"></image>
							<view class="text-df padding-top-sm">招聘海报</view>
						</view>
					</view>
				</view>
			</uni-popup>
			<view class="bg-mask" v-if="posterPopup" @click="posterPopup=false"></view>
			<view class="poster-item" v-if="posterPopup"
				:style="[{height: plant_detail.station_type==3?posterH1+'px':posterH+'px',width:cavansW+'px'}]">
				<view class="wrap ">
					<view class=" flex justify-center align-center"
						:style="[{height: plant_detail.station_type==3?cavansH1+'px':cavansH+'px',width:cavansW+'px'}]">
						<image class="preview-image"
							:style="[{height: plant_detail.station_type==3?cavansH1+'px':cavansH+'px',width:cavansW+'px'}]"
							:src="previewImageUrl" mode="aspectFill" @click="previewImage(previewImageUrl)"></image>
					</view>
					<view class="margin-top-sm bom_save flex align-center justify-between">
						<view class="action2 cu-btn block round bg-theme text-white" @click="saveImage">保存图片</view>
						<view class="action2 cu-btn block round bg-theme text-white" @click="sharePop">分享好友</view>
					</view>
				</view>
			</view>
			<!-- 海报展示弹框 -->
			<!-- <uni-popup type="center" ref="posterPopup" :safe-area-inset-bottom="true" :mask-close-able="true"
				border-radius="24" height='700px'>
				<view class="wrap">
					<view class=" flex justify-center align-center" style="overflow: auto;">
						<image class="preview-image" :src="previewImageUrl" mode="aspectFill"
							@click="previewImage(previewImageUrl)"></image>
					</view>
					<view class="margin-top-sm bom_save" @click="saveImage">
						<view class="action2 cu-btn block round bg-theme text-white">保存图片</view>
					</view>
				</view>
			</uni-popup> -->
			<!-- 绘画 -->
			<view class="offset-canvas">
				<canvas canvas-id="poster-canvas"
					:style="[{height: plant_detail.station_type==3?cavansH1+'px':cavansH+'px',width:cavansW+'px'}]"></canvas>
				<!-- <canvas canvas-id="poster-canvas" style="width: 95vw;height: 76vh;"></canvas> -->
			</view>
			<uni-popup type="center" ref='addPop'>
				<view class="pt10 pb20 plr45 f30 bg-white radius_16 text-center">
					<view class="">您还没有报名</view>
					<view class="">报名成功后可分享加薪</view>
					<view class="btn_next radius_100" @tap='confirm'
						style="width: 320upx; height: 72upx;margin-top: 40upx;background-color: #1B90FF;line-height: 72upx;">
						确认</view>
				</view>
			</uni-popup>
			<uni-popup ref="txtPopup" type="center">
				<view class="baozhang plr15 " v-if="plant_detail.servicebroker">
					<view class="text-bold flex align-center padding-bottom-sm" @tap='toBroker'>
						<image :src="plant_detail.servicebroker.head_img||'/static/images/logo.jpg'" mode="aspectFill"
							class="img-100 round margin-right-sm"></image>
						{{plant_detail.servicebroker.agent_name}}
					</view>
					<view class="" style="font-size: 30upx;" v-if="plant_detail.servicebroker">
						<view class="flex align-center justify-between"> 微信号：{{ (plant_detail.servicebroker.wx || '0').replace(/[\W\d\w]/g, '*') }}
							<text class="cuIcon-copy margin-left " style="font-size: 42upx;"
								@click="copy(plant_detail.servicebroker.wx)"></text>
						</view>
						<view class="flex align-center justify-between padding-top-sm">
							电话：{{ (plant_detail.servicebroker.phone || '0').replace(/(\d{4})\d{3}(\d{4})/, '$1****$2') }}
							<text class="cuIcon-phone margin-left " style="font-size: 42upx;"
								@click="call(plant_detail.servicebroker.phone)"></text>
						</view>
					</view>
					<view class="btn_canbao" @tap="toChat">在线咨询</view>
				</view>
			</uni-popup>
			<uni-popup type="center" ref="isShow" :bordeRadius="'0'">
				<view class="bg-white">门店劳务报酬服务费：{{plant_detail.server_price||''}}</view>
			</uni-popup>
			<!-- 劳务派遣展示经纪人咨询 -->
			
			<view class="box-float flex align-center justify-center column" @click="openPop"
				v-if="plant_detail.servicebroker!=''&&plant_detail.station_type == 1">
				<image :src="plant_detail.servicebroker.head_img||'/static/images/logo.jpg'" mode=""
					class="img-100 round box-shodw" v-if="plant_detail.servicebroker!=''"></image>
				<view class="bg-theme text-white radius-16 flex column justify-center" style="margin-top: -12upx;">
					<text style="margin-top: 8upx;" class="text-df bg-theme text-center round">免费咨询</text>
					<text style="margin-top: -5upx;" class="text-df  text-center round plr10">区域经纪人</text>
				</view>
			</view>
		</view>
</template>
<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import jyfParser from '@/components/jyf-parser/jyf-parser';
	export default {
		components: {
			uniNavBar,
			jyfParser
		},
		data() {
			return {
				dotStyle: true,
				StatusBar: this.StatusBar,
				title: '',
				like: false, //收藏按钮
				aid: '',
				previewImageUrl: '', //海报图片
				showRedBox: false, //是否展示红包加薪
				longitude: '', //经度
				latitude: '', //纬度
				plant_detail: '', //详情
				companyInfo: '', //公司信息
				user_id: '', //招聘者user_id
				topDistance: 0,
				isopen: true, //跳转页面
				IMG_URL: this.IMG_URL,
				service_rules: '', //规则
				inviteinfo: '', //分享链接
				is_collection: false, //是否收藏公司
				sign_up_page: true, //报名详情
				sign_status: 0, //是否报名 1 报名 0 没有报名
				job_collect: false, //收藏职位
				posterPopup: false, //是否展示海报弹框
				covers: [{
					latitude: '',
					longitude: '',
					iconPath: '../static/images/iconPath.png',
					width: '30',
					height: '30'
				}],
				voucher: '', //是否开启支付
				pageOpen: '', //是否从引导页跳过来的
				cavansW: '', //画布宽度
				cavansH: '', //画布高度
				posterH: '', //海报弹框高度
				posterH1: '', //企业职位海报弹框高度
				cavansH1: '', //企业职位的高度
				is_servicebroker: 0, //是否是经纪人
				fs10: '',
				fs12: '',
				fs14: '',
				fs16: '',
				fs18: '',
				user_token: '', //token
			};
		},
		onLoad(e) {
			// 海报自适应
			this.cavansW = uni.upx2px(710)
			this.cavansH = uni.upx2px(1200)
			this.cavansH1 = uni.upx2px(800)
			this.posterH = uni.upx2px(1300)
			this.posterH1 = uni.upx2px(900)
			this.fs10 = uni.upx2px(20)
			this.fs12 = uni.upx2px(24)
			this.fs14 = uni.upx2px(28)
			this.fs16 = uni.upx2px(32)
			this.fs18 = uni.upx2px(36)
			uni.showLoading({})
			this.title = e.name;
			this.is_servicebroker = e.is_servicebroker;
			// console.log(e,'============');
			if (e.scene) {
				this.aid = e.scene;
			} else {
				this.aid = e.id;
			}
			this.pageOpen = e.page
			if (e.page == 'signUp') { //从报名状态进来
				this.sign_up_page = false
			}

			setTimeout(() => {
				this.get_detail();
			}, 500)
			this.get_plant_type()
			// uni.$on('updata', () => {
			// 	this.get_detail();
			// });
		},
		onShow() {
			uni.$on('follow', data => {
				this.is_collection = data.msg;
			});
			this.$refs.shareType && this.$refs.shareType.close();
			this.user_token = uni.getStorageSync('USERINFO').user_token
		},
		onUnload() {
			uni.$off('follow');
			this.$refs.shareType.close();
			// uni.$off('follow');
		},
		onPageScroll(e) {
			// console.log(e,'滑动');
			this.topDistance = e.scrollTop;
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.plant_detail.name + ' ' + this.plant_detail.min_salary + '-' + this.plant_detail.max_salary + '/月' + ' ' + this.plant_detail.fan_price + '/' + this.plant_detail.fan_type,
				path: 'pagesHome/index/plant_detail?id=' + this.aid + '&longitude=' + this.longitude + '&latitude=' + this.latitude
			}
		},
		// 转发至朋友圈
		onShareTimeline() {
			let imageUrl = '/static/images/logo.png';
			return {
				title: this.plant_detail.name + ' ' + this.plant_detail.min_salary + '-' + this.plant_detail.max_salary + '/月' + ' ' + this.plant_detail.fan_price + '/' + this.plant_detail.fan_type,
				imageUrl,	
				query: 'id=' + this.aid + '&longitude=' + this.longitude + '&latitude=' + this.latitude
			};
		},
		methods: {
			openPop() {
				// 打开经纪人弹框
				this.$refs.txtPopup && this.$refs.txtPopup.open()

			},
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			// 与经纪人聊天
			toChat() {
				let userInfo = uni.getStorageSync('USERINFO')
				if (uni.getStorageSync('USERINFO').user_token) {
					// 通知打开聊天
					uni.$emit('jump', {})
					if (userInfo.id == this.plant_detail.servicebroker.user_id) {
						this.$Common.toast('您为本区经纪人，不可与自己聊天');
					} else {
						if (this.isopen == false) {
							return;
						}
						this.isopen = false;
						setTimeout(() => {
							this.isopen = true;
						}, 3000);
						uni.navigateTo({
							url: '../../pagesmessage/userMsg?kfid=' + this.plant_detail.servicebroker.user_id +
								'&userName=' + this.plant_detail
								.servicebroker.agent_name +
								'&job_position_id=' + this.plant_detail.aid,
							animationDuration: 300
						});
					}
				} else {
					this.$refs.txtPopup && this.$refs.txtPopup.close()
					this.$Common.toast('登录后才能聊天哦')
					setTimeout(() => {
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '../../pagessignup/login'
						});
						// #endif

						// #ifdef MP-WEIXIN
						uni.navigateTo({ //微信授权后直接返回上一级不能使用 redirectTo
							url: '../../pagessignup/wechat/wxlog'
						});
						// #endif
					}, 100)

				}


			},
			gomessage() {
				//线上聊天
				const userInfo = uni.getStorageSync('USERINFO');
				// if (!userInfo.user_token) {
				// 	this.$Common.toast('您还没有登录，请先登录');
				// 	setTimeout(() => {
				// 		// #ifndef MP-WEIXIN
				// 		uni.navigateTo({
				// 			url: '../../pagessignup/login'
				// 		});
				// 		// #endif

				// 		// #ifdef MP-WEIXIN
				// 		uni.navigateTo({ //微信授权后直接返回上一级不能使用 redirectTo
				// 			url: '/pagessignup/wechat/wxlog?page=outLogin'
				// 		});
				// 		// #endif
				// 	}, 500);
				// 	return
				// }
				if (!uni.getStorageSync('userToken')) {
					this.$Common.toast('请先登录')
					setTimeout(() => {
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '../../pagessignup/login'
						});
						// #endif

						// #ifdef MP-WEIXIN
						uni.navigateTo({ //微信授权后直接返回上一级不能使用 redirectTo
							url: '../../pagessignup/wechat/wxlog'
						});
						// #endif
					}, 100)
				}
				uni.$emit('jump', {})
				if (userInfo.id == this.plant_detail.user_id) {
					this.$Common.toast('此职位为自己发布职位，不可沟通');
				} else {
					if (this.isopen == false) {
						return;
					}
					this.isopen = false;
					setTimeout(() => {
						this.isopen = true;
					}, 3000);
					uni.navigateTo({
						url: '../../pagesmessage/userMsg?kfid=' + this.user_id + '&userName=' + this.plant_detail
							.company.company_name +
							'&job_position_id=' + this.plant_detail.aid,
						animationDuration: 300
					});
				}
			},
			// 拨打电话
			call_phone() {
				let userInfo = uni.getStorageSync('USERINFO');
				if (userInfo.id == this.plant_detail.user_id) {
					this.$Common.toast('此职位为自己发布职位，不可沟通');
				} else {
					uni.makePhoneCall({
						phoneNumber: this.plant_detail.company.phone
					});
				}

			},
			// 查看门店情报
			lookService(item) {
				if (this.is_servicebroker == 1) {
					this.$refs.isShow && this.$refs.isShow.open();
				} else {
					this.$Common.toast('门店服务经纪人才可查看')
				}
			},
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			goDownLoad() { //跳转下载页
				// var tempwindow = window.open('_blank');
				window.location.href = this.inviteinfo.invite_url;
			},
			copy(body) {
				//复制文字到剪切板
				uni.setClipboardData({
					data: body,
					showToast: false,
					success: function() {
						uni.showToast({
							title: '已复制',
							icon: 'none',
							duration: 2000
						});
						// this.$Common.toast('复制成功');
					}
				});
			},
			choose_location() {
				//详细地址放大地图
				let that = this;
				uni.openLocation({
					latitude: Number(that.plant_detail.lat),
					longitude: Number(that.plant_detail.lon),
					name: that.plant_detail.address,
					// address: that.plant_detail.address,
					success: function(res) {
						// console.log('地图', res);
					},
					fail(res) {
						this.$Common.toast('网络错误，请稍后重试');
					}
				});
			},
			// 获取岗位详情
			get_detail() {
				this.$Common.getLocation(e => {
					this.$Request
						.post(this.$api.index.get_job_detail, {
							aid: this.aid,
							longitude: e.longitude,
							latitude: e.latitude,
							user_id: uni.getStorageSync('USERINFO').id || 0
						})
						.then(res => {
							if (res.code == 1) {
								uni.hideLoading()
								this.plant_detail = res.data;
								if (res.data.red_envelope_type != 0) {
									this.showRedBox = true
								}
								if (res.data.driver_name == 0 || res.data.driver_name == null) {
									this.plant_detail.driver_name = '';
								}
								if (res.data.finance_manager_name == 0 || res.data.finance_manager_name ==
									null) {
									this.plant_detail.finance_manager_name = '';
								}
								if (res.data.resident_manager_name == 0 || res.data.resident_manager_name ==
									null) {
									this.plant_detail.resident_manager_name = '';
								}
								if (res.data.driver_phone == 0 || res.data.driver_name == null) {
									this.plant_detail.driver_phone = '';
								}
								if (res.data.finance_manager_phone == 0 || res.data.finance_manager_phone ==
									null) {
									this.plant_detail.finance_manager_phone = '';
								}
								if (res.data.resident_manager_phone == 0 || res.data.resident_manager_phone ==
									null) {
									this.plant_detail.resident_manager_phone = '';
								}
								this.companyInfo = res.data.company;
								// this.is_collection = res.data.company.is_collection;
								if (res.data.company.is_collection == 1) {
									this.is_collection = true
								} else {
									this.is_collection = false
								}
								if (res.data.is_collection == 1) {
									this.job_collect = true
								} else {
									this.job_collect = false
								}
								if (res.data.is_red_share == 3) {
									// this.sign_up_page=true
								}
								this.user_id = res.data.user_id;
								this.covers[0].latitude = Number(res.data.lat);
								this.covers[0].longitude = Number(res.data.lon);
								this.getagreement();
								this.get_shareUrl();
								// console.log(this.removeHTMLTag(this.plant_detail.employment_conditions),'富文本转文本');
								// if (this.plant_detail.servicebroker != '' && this.plant_detail.station_type == 1 && uni
								// 	.getStorageSync('USERINFO').user_token) {
								// 	this.$refs.txtPopup && this.$refs.txtPopup.open()
								// }
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								});
							}
						}).catch(err => {
							this.$Common.toast('请登录后重试')
						})
				})
			},
			confirm() { //弹框确认
				this.$refs.addPop.close()
			},
			goComplant() { //投诉
				uni.navigateTo({
					url: '../complaint?compand_id=' + this.aid + '&job_id=' + this.plant_detail.company.aid +
						'&job_type=1'
				})
			},
			// 跳转经纪人详情
			toBroker() {
				uni.navigateTo({
					url: 'broker_detail?id=' + this.plant_detail.servicebroker.user_id + '&lon=' + this
						.plant_detail.lon + '&lat=' + this.plant_detail.lat
				})
			},
			// 生成海报
			posterImage() {
				uni.showLoading({
					title: '简章生成中...',
					mask: true,
				})
				let page = 'pagesHome/index/plant_detai';
				this.$Request
					.post(this.$api.common.postGetPosterCode, {
						aid: this.plant_detail.aid
					})
					.then(res => {
						console.log('分享二维码', res);
						if (res.code == 1) {
							let data = res.data.base64;
							this.$Common
								.base64ToPath(data)
								.then(res => {
									console.log('图片临时路径', res);
									this.shareCode = res;
									this.initCanvas();
								})
								.catch(err => {
									console.log('保存临时二维码失败', err);
									this.$Common.toast('分享失败');
								});
						} else {
							this.$Common.toast('分享失败');
						}
					})
					.catch(err => {
						console.log('获取分享二维码失败', err);
					});
			},
			// 初始化画布
			initCanvas() {
				this.ctx = uni.createCanvasContext('poster-canvas', this);
				setTimeout(() => {
					this.drawBack();
				}, 200);
			},

			// 绘制背景
			drawBack() {
				let ctx = this.ctx;
				ctx.lineJoin = 'round'
				// 边框的宽度
				ctx.setFillStyle('#FFFF01');
				// 背景的宽高 减去背景的宽度
				if (this.plant_detail.station_type == 1) {
					ctx.fillRect(0, 0, this.cavansW, this.cavansH);
				} else {
					ctx.fillRect(0, 0, this.cavansW, this.cavansH1);
				}
				// 圆角				
				// ctx.beginPath();
				// ctx.lineJoin = 'round'
				// ctx.lineWidth = "10";
				// ctx.strokeStyle = '#0201F3'
				// if (this.plant_detail.station_type == 1) {
				// 	ctx.rect(0, 0, this.cavansW, this.cavansH);
				// } else {
				// 	ctx.rect(0, 0, this.cavansW, this.cavansH1);
				// }
				// ctx.stroke();
				// 设置顶部蓝色区域
				ctx.setFillStyle('#0201F3');
				ctx.fillRect(0, 0, this.cavansW, this.cavansH * 0.065); //this.cavansH*0.065=39
				// 设置底部蓝色区域
				ctx.setFillStyle('#0201F3');
				ctx.fillRect(0, (this.cavansH - this.cavansH * 0.065), this.cavansW, this.cavansH * 0.065);
				ctx.setFillStyle('#FFFF01');
				ctx.textAlign = "center";
				ctx.font = 'bold 18px sans-serif'
				ctx.fillText('长按图片进入小程序查看更多信息', this.cavansW * 0.5, this.cavansH - 13);
				ctx.draw(false, () => {
					console.log("背景绘制成功");
					this.drawGoodsImage();
				});
			},
			// 绘制logo
			async drawGoodsImage() {
				let ctx = this.ctx;
				await new Promise(resolve => {
					uni.getImageInfo({
						src: this.IMG_URL + 'static/miniwechat/logo.jpg',
						success: (res) => {
							ctx.drawImage(res.path, this.cavansW * 0.028, this.cavansH * 0.08, this
								.cavansH * 0.075, this.cavansH * 0.075);
							resolve();
						},
						fail: (err) => {
							uni.hideLoading();
							console.log("logo图片绘制失败", err)
						}
					})
				});
				ctx.draw(true, () => {
					console.log("logo图片绘制成功");
					this.drawUserInfo();
				});
			},
			// 绘制
			async drawUserInfo() {
				let ctx = this.ctx;
				ctx.setFillStyle('#FFFF01');
				ctx.textAlign = "center";
				ctx.font = 'bold ' + this.fs16 + 'px courier'
				ctx.fillText('打工就上人人保障网 第三方保障平台人人保障网', this.cavansW * 0.5, this.cavansH * 0.041);
				ctx.setFillStyle('#000000');
				ctx.font = 'bold ' + this.fs12 + 'px courier'
				if (this.is_servicebroker == 1) {
					ctx.fillText(this.plant_detail.servicebroker_user.agent_name, this.cavansW * 0.5, this.cavansH *
						0.125);
				} else {
					// 人力公司名/
					ctx.fillText(this.plant_detail.company.company_name, this.cavansW * 0.5, this.cavansH *
						0.125); //this.cavansH*0.125=75
				}

				ctx.draw(true, () => {
					this.drawGoodsInfo();
				});
			},

			// 绘制职位信息
			drawGoodsInfo() {
				let ctx = this.ctx;
				ctx.textAlign = "left";
				ctx.setFillStyle('#ffffff');
				ctx.fillRect(this.cavansW * 0.028, this.cavansH * 0.166, this.cavansW * 0.94, this.cavansH * 0.136);
				ctx.setFontSize(this.cavansW * 0.045); //this.cavansW*0.045=16
				ctx.setFillStyle('#000000');
				ctx.font = 'bold ' + this.fs16 + 'px times'
				ctx.fillText(this.plant_detail.name, this.cavansW * 0.056, this.cavansH * 0.203);
				ctx.setFillStyle('red');
				ctx.font = 'bold ' + this.cavansW * 0.033 + 'px times'
				if (this.plant_detail.fan_type && this.plant_detail.fan_price) {
					ctx.setFontSize(this.cavansW * 0.033); //this.cavansW*0.033=12
					ctx.fillText(this.plant_detail.fan_type + '：' + this.plant_detail.fan_price + '元', this.cavansW *
						0.056, this.cavansH * 0.233);
				}
				ctx.setFontSize(this.cavansW * 0.033);
				ctx.setFillStyle('red');
				ctx.font = 'bold ' + this.fs12 + 'px times'
				ctx.fillText(this.plant_detail.min_salary + '-' + this.plant_detail.max_salary + '元/月', this.cavansW *
					0.507, this.cavansH * 0.233);
				ctx.setFillStyle('#000000');
				ctx.setFontSize(this.fs12);
				ctx.fillText(this.plant_detail.city, this.cavansW * 0.056, this.cavansH * 0.2581);
				ctx.fillText(this.plant_detail.experience, this.cavansW * 0.323, this.cavansH * 0.2581);
				ctx.fillText(this.plant_detail.education_name, this.cavansW * 0.563, this.cavansH * 0.2581);
				ctx.fillText(this.plant_detail.age + '岁', this.cavansW * 0.802, this.cavansH * 0.2581);
				ctx.fillText('已报名' + this.plant_detail.apply_numbers + '人', this.cavansW * 0.056, this.cavansH * 0.29);
				ctx.setFillStyle('#0201F3');
				ctx.fillText('已向平台支付保证金' + this.plant_detail.money + '元', this.cavansW * 0.450, this.cavansH * 0.29);
				ctx.draw(true, () => {
					console.log("职位信息绘制成功");
					this.drawAddressInfo();
					// this.exportImage();
				});
			},
			// 绘制职位地址信息
			drawAddressInfo() {
				let ctx = this.ctx;
				ctx.setFillStyle('#000000');
				ctx.font = 'bold ' + this.fs12 + 'px times'
				let height = '';
				ctx.fillText('详细地址：' + this.plant_detail.address.substr(0, 23), this.cavansW * 0.028, this.cavansH * 0.33);
				if (this.plant_detail.address.length > 25) {
					ctx.fillText(this.plant_detail.address.substr(23, 50), this.cavansW * 0.028, this.cavansH * 0.354);
					height = this.cavansH * 0.354
				} else {
					height = this.cavansH * 0.33
				}
				if (this.is_servicebroker == 1) {
					// 经纪人登录/
					ctx.fillText('经纪人电话：', this.cavansW * 0.028, height + this.cavansH * 0.025);
					ctx.setFillStyle('#1B90FF');
					ctx.font = 'bold ' + this.fs12 + 'px times'
					let phone = ''; //电话					
					phone = this.plant_detail.servicebroker_user.phone
					ctx.fillText(phone, this.cavansW * 0.217, height + this.cavansH * 0.025);
					ctx.setFillStyle('#000000');
					let wxNo = ''; //微信号
					wxNo = this.plant_detail.servicebroker_user.wx
					ctx.fillText('经纪人微信号：', this.cavansW * 0.507, height + this.cavansH * 0.025);
					ctx.font = 'bold ' + this.fs12 + 'px times'
					ctx.setFillStyle('#1B90FF');
					ctx.fillText(wxNo, this.cavansW * 0.732, height + this.cavansH * 0.025);
				} else {
					ctx.fillText('报名电话：', this.cavansW * 0.028, height + this.cavansH * 0.025);
					ctx.font = 'bold ' + this.fs12 + 'px times'
					ctx.setFillStyle('#1B90FF');
					let phone = ''; //电话				
					phone = this.plant_detail.company.phone
					ctx.fillText(phone, this.cavansW * 0.197, height + this.cavansH * 0.025);
					ctx.setFillStyle('#000000');
					let wxNo = ''; //微信号
					if (this.is_servicebroker == 1) {
						wxNo = this.plant_detail.servicebroker.wx
						console.log(wxNo);
						ctx.fillText('微信号：', this.cavansW * 0.507, height + this.cavansH * 0.025);
						ctx.font = 'bold ' + this.fs12 + 'px times'
						ctx.setFillStyle('#1B90FF');
						ctx.fillText(wx, this.cavansW * 0.647, height + this.cavansH * 0.025);
					} else {

					}
				}

				ctx.draw(true, () => {
					console.log("职位地址信息绘制成功");
					this.drawdetailInfo(height);
				});
			},
			/*移除HTML标签代码*/
			removeHTMLTag(str) {
				str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
				str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
				str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
				str = str.replace(/ /ig, ''); //去掉 
				str = str.replace(new RegExp('&nbsp;', 'g'), ''); //去掉 &nbsp;
				return str;
			},
			// 绘制职位其他信息
			drawdetailInfo(height) {
				let salary_description = this.removeHTMLTag(this.plant_detail.salary_description)
				let accommodation_introduction = this.removeHTMLTag(this.plant_detail.accommodation_introduction)
				let employment_conditions = this.removeHTMLTag(this.plant_detail.employment_conditions)
				let job_description = this.removeHTMLTag(this.plant_detail.job_description)
				let lth1 = salary_description.length
				let lth2 = accommodation_introduction.length;
				let lth3 = employment_conditions.length;
				let lth4 = job_description.length;
				let ctx = this.ctx;
				ctx.setFontSize(this.fs12);
				ctx.setFillStyle('#0201F3');
				ctx.font = 'bold ' + this.fs12 + 'px times'
				// ctx.setFillStyle('#111111');
				if (this.plant_detail.station_type == 1) {
					ctx.fillText('薪资说明', this.cavansW * 0.028, height + this.cavansH * 0.05);
				} else {
					ctx.fillText('职位描述', this.cavansW * 0.028, height + this.cavansH * 0.05);
				}
				ctx.setFontSize(this.fs10);
				ctx.setFillStyle('#000000');
				let a = Math.ceil(lth1 / 36)
				for (let i = 0; i < a; i++) {

					if (i < 5 && this.plant_detail.station_type == 1) {

						ctx.fillText(salary_description.substr((i * 36), 36), this.cavansW * 0.028, height + this
							.cavansH * 0.075 + (i * this.cavansH * 0.023));
					}
					if (this.plant_detail.station_type == 3) {
						ctx.fillText(salary_description.substr((i * 36), 36), this.cavansW * 0.028, height + this
							.cavansH * 0.075 + (i * this.cavansH * 0.023));
					}
				}
				// 本地企业  plant_detail.station_type==1
				if (a > 5 && this.plant_detail.station_type == 1) {
					ctx.setFillStyle('red');
					ctx.fillText('更多信息，请扫码查看', this.cavansW * 0.028, height + this.cavansH * 0.072 + (5 * this.cavansH *
						0.023));
				}
				let y1 = '';
				if (a > 5) {
					y1 = height + this.cavansH * 0.075 + (5 * this.cavansH * 0.023) + this.cavansH * 0.023
				} else {
					y1 = height + this.cavansH * 0.075 + ((a - 1) * this.cavansH * 0.023) + this.cavansH * 0.023
				}
				// ctx.fillText(salary_description.substr(0, 45), 15,240);
				// 本地企业只有职位描述
				if (this.plant_detail.station_type == 1) {
					let y2 = '';
					let y3 = '';
					// 食宿介绍
					if (accommodation_introduction) {
						ctx.setFillStyle('#0201F3');
						ctx.font = 'bold ' + this.fs12 + 'px times'
						ctx.fillText('食宿介绍', this.cavansW * 0.028, y1);
						ctx.setFontSize(this.fs10);
						ctx.setFillStyle('#000000');
						let b = Math.ceil(lth2 / 36)
						for (let j = 0; j < b; j++) {
							if (j < 5) {
								ctx.fillText(accommodation_introduction.substr((j * 36), 36), this.cavansW * 0.028,
									y1 + 15 + (j * 15));
							}
						}
						if (b > 5) {
							ctx.setFillStyle('red');
							ctx.fillText('更多信息，请扫码查看', this.cavansW * 0.028, y1 + this.cavansW * 0.028 + (5 * this
								.cavansH * 0.023));
						}

						if (b > 5 && b > 0) {
							y2 = y1 + 15 + (5 * 15) + this.cavansH * 0.023
						} else {
							y2 = y1 + 15 + ((b - 1) * 15) + this.cavansH * 0.023
						}
					}
					// 录用条件
					if (employment_conditions) {
						ctx.setFillStyle('#0201F3');
						ctx.font = 'bold ' + this.fs12 + 'px times'
						ctx.fillText('录用条件', this.cavansW * 0.028, y2);
						ctx.setFontSize(this.fs10);
						ctx.setFillStyle('#000000');
						let c = Math.ceil(lth3 / 36)
						for (let k = 0; k < c; k++) {
							if (lth1 > 180 || lth2 > 180 || lth4 > 180) {
								if (k < 5) {
									ctx.fillText(employment_conditions.substr((k * 36), 36), this.cavansW * 0.028, y2 +
										15 + (k * 15));
								}
							} else {
								ctx.fillText(employment_conditions.substr((k * 36), 36), this.cavansW * 0.028, y2 +
									15 + (k * 15));
							}
						}
						if (c > 5 && (lth1 > 180 || lth2 > 180 || lth4 > 180)) {
							ctx.setFillStyle('red');
							ctx.fillText('更多信息，请扫码查看', this.cavansW * 0.028, y2 + this.cavansH * 0.023 + (5 * 15));
						}
						if (c > 5&& (lth1 > 180 || lth2 > 180 || lth4 > 180)) {
							y3 = y2 + 15 + (5 * 15) + this.cavansH * 0.023
						} else {
							y3 = y2 + 15 + ((c - 1) * 15) + this.cavansH * 0.023
						}
					}
					// 岗位介绍
					if (job_description) {
						ctx.setFillStyle('#0201F3');
						ctx.font = 'bold ' + this.fs12 + 'px times'
						ctx.fillText('岗位介绍', this.cavansW * 0.028, y3);
						ctx.setFontSize(this.fs10);
						ctx.setFillStyle('#000000');
						let d = Math.ceil(lth4 / 36)
						for (let k = 0; k < d; k++) {
							if (lth1 > 180 || lth2 > 180 || lth3 > 180) {
								if (k < 4) {
									ctx.fillText(job_description.substr((k * 36), 36), this.cavansW * 0.028, y3 + this
										.cavansH * 0.023 +
										(k * 15));
								}
							} else {
								// 第二行需要加1
								ctx.fillText(job_description.substr((k * 36), 36), this.cavansW * 0.028, y3 + this
									.cavansH * 0.023 +
									(k * 15));
							}

						}
						if (d > 4 && (lth1 > 180 || lth2 > 180 || lth3 > 180)) {
							ctx.setFillStyle('red');
							ctx.fillText('更多信息，请扫码查看', this.cavansW * 0.028, y3 + this.cavansH * 0.023 + (4 * 15));
						}
					}

				}
				ctx.draw(true, () => {
					console.log("职位其他介绍信息绘制成功");
					this.drawCodeInfo();
					// this.exportImage();
				});
			},
			// 绘制二维码
			async drawCodeInfo() {
				console.log(this.shareCode, 'this.shareCode');
				let ctx = this.ctx;
				await new Promise(resolve => {
					uni.getImageInfo({
						src: this.shareCode,
						success: (res) => {
							console.log('二维码信息', res);
							let {
								width,
								height,
								path
							} = res;
							ctx.drawImage(res.path, this.cavansW * 0.845, this.cavansH * 0.08, this
								.cavansH * 0.075, this.cavansH * 0.075);
							// ctx.drawImage(res.path, this.cavansW - 55, 48, 45, 45);
							resolve();
						},
						fail: (err) => {
							console.log('二维码绘制失败', err);
							uni.hideLoading();
							this.$Common.toast('获取二维码信息失败');
						}
					})
				});
				ctx.draw(true, () => {
					console.log("二维码绘制成功");
					// this.drawGoodsInfo();
					this.exportImage();
				})
			},
			// 导出图片
			exportImage() {
				uni.canvasToTempFilePath({
					canvasId: 'poster-canvas',
					success: (res) => {
						uni.hideLoading();
						console.log('导出图片成功', res);
						this.previewImageUrl = res.tempFilePath;
						// this.$refs.posterPopup.open()
						this.posterPopup = true
						this.$refs.shareType.close()

					},
					fail: (err) => {
						uni.hideLoading();
						console.log("导出图片失败", err);
					}
				}, this);
			},
			// 保存图片
			saveImage() {
				uni.saveImageToPhotosAlbum({
					filePath: this.previewImageUrl,
					success: (res) => {
						console.log(res);
						this.$Common.toast('保存成功');
						this.posterPopup = false
						this.close();
					}
				})
			},
			/**
			 * @description 绘制文本通用方法
			 * @param {Object} ctx - canvas上下文
			 * @param {String} text - 文本
			 * @param {Number} startX - X轴开始位置
			 * @param {Number} startY - Y轴开始位置
			 * @param {Number} limitWidth - 文字绘制区限制宽度
			 * @param {Number} limitLine - 文字绘制限制行数
			 * @param {String} color - 文字颜色
			 * @param {Number} size - 字体大小
			 * */
			drawText(ctx, text, startX, startY, limitWidth, limitLine = 2, color = '#333333', size = 18, isBold = false) {
				ctx.setFillStyle(color);
				ctx.setFontSize(size);
				let arrText = text.split('');
				let line = '';
				let column = 0;
				for (let n = 0, len = arrText.length; n < len; n++) {
					let testline = line + arrText[n];
					let metrics = ctx.measureText(testline);
					let testWidth = metrics.width;
					if (testWidth > limitWidth && n > 0 && column < limitLine) {
						ctx.fillText(line, startX, startY);
						column += 1;
						line = arrText[n];
						startY += size * 1.5;
					} else {
						line = testline;
					}
				}
				if (column < limitLine) {
					ctx.fillText(line, startX, startY);
				}
			},
			get_shareUrl() {
				//获取分享链接
				this.$Request.post(this.$api.user.get_invite).then(res => {
					if (res.code == 1) {
						this.inviteinfo = res.data;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
			// 图片点击放大
			previewImage(url) {
				uni.previewImage({
					current: url,
					urls: [url]
				})
			},
			godetail(aid) {
				//跳转公司信息
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 3000);
				// #ifndef H5
				// #endif
				uni.navigateTo({
					url: 'job_detail?id=' + aid + '&lon=' + this.plant_detail.lon + '&lat=' + this.plant_detail.lat + '&follow=' + this.is_collection
				});

			},
			// 报名
			apply_job() { //is_verification
				if (!uni.getStorageSync('userToken')) {
					this.$Common.toast('登录之后才能报名哦')
					setTimeout(() => {
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '../../pagessignup/login'
						});
						// #endif

						// #ifdef MP-WEIXIN
						uni.navigateTo({ //微信授权后直接返回上一级不能使用 redirectTo
							url: '../../pagessignup/wechat/wxlog'
						});
						// #endif
					}, 300)
					return
				}
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 3000);
				this.$Request.post(this.$api.help_red.is_verification, {
					dask_id: this.aid,
					type: 1, //1报名，2兼职任务接单
				}).then(res => {
					if (res.code == 1) {
						uni.navigateTo({
							url: '../sign_up?company_id=' + this.companyInfo.aid + '&job_id=' + this.aid +
								'&red_envelope_type=' + this.plant_detail
								.red_envelope_type
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
			back() {
				if (this.pageOpen == 'open') {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				} else {
					uni.navigateBack();
				}
			},
			yulan(pic, index) {
				this.$Common.lookImg(this.plant_detail.ads_imgas, index)
			},
			collect(collect_id, type) { //收藏
				this.$Request
					.post(this.$api.company.set_collection, {
						collect_id: collect_id, //收藏对象的id type=1 collect_id 公司id type=2 职位id type=3:兼职任务网约工id
						type: type, //1：收藏公司 t2：职位 3:收藏兼职任务
					})
					.then(res => {
						console.log(res, '');
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						if (res.code == 1) {
							// uni.$emit('myCollect',{})
						} else {}
					});
			},
			follow() { //收藏公司
				if (!uni.getStorageSync('userToken')) {
					this.$Common.toast('请先登录')
					setTimeout(() => {
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '../../pagessignup/login'
						});
						// #endif

						// #ifdef MP-WEIXIN
						uni.navigateTo({ //微信授权后直接返回上一级不能使用 redirectTo
							url: '../../pagessignup/wechat/wxlog'
						});
						// #endif
					}, 300)
					return
				}
				this.collect(this.companyInfo.aid, 1)
				uni.$emit('myCollect', {})
				this.is_collection = !this.is_collection;

			},
			colloct_job() { //收藏职位
				if (!uni.getStorageSync('userToken')) {
					this.$Common.toast('请先登录')
					setTimeout(() => {
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '../../pagessignup/login'
						});
						// #endif

						// #ifdef MP-WEIXIN
						uni.navigateTo({ //微信授权后直接返回上一级不能使用 redirectTo
							url: '../../pagessignup/wechat/wxlog'
						});
						// #endif
					}, 300)
					return
				}
				this.collect(this.aid, 2)
				uni.$emit('myCollect', {})
				this.job_collect = !this.job_collect
			},
			share() {
				//分享
				this.$refs.shareType.open();
				return
				// #ifdef MP-WEIXIN
				// uni.showModal({
				// 	title: '请使用右上角按钮进行分享',
				// 	icon: 'none'
				// })
				// #endif
				// #ifndef MP-WEIXIN
				this.$refs.shareType.open();
				// #endif
			},
			close() {
				this.$refs.shareType.close();
				this.$refs.posterPopup.close();
			},
			goPay() { //参保
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				this.$Request.post(this.$api.common.singupPlay, {
					company_id: this.plant_detail.company_id,
					job_position_id: this.plant_detail.aid
				}).then(res => {
					if (res.code == 1) {
						uni.navigateTo({
							url: '../../pagescenter/zhaopinzhe/fabu?price=' + this.plant_detail
								.user_money + '&order_sn=' + res.data.order_sn
						});
					} else {
						this.$Common.toast(res.msg);
					}
				});
			},
			helpEdd() { //助力加薪
				if (this.plant_detail.is_red_share == 3) {
					this.$Common.toast('红包已过期，请重新报名领取')
					return
				}
				if (!uni.getStorageSync('userToken')) {
					this.$Common.toast('登录之后才能报名哦')
					setTimeout(() => {
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '../../pagessignup/login'
						});
						// #endif

						// #ifdef MP-WEIXIN
						uni.navigateTo({ //微信授权后直接返回上一级不能使用 redirectTo
							url: '../../pagessignup/wechat/wxlog'
						});
						// #endif
					}, 300)
					return
				}
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				this.$Request.post(this.$api.help_red.help_getHb, {
					delivery_id: '', //报名主键id
					job_position_id: this.plant_detail.aid,
					company_id: this.plant_detail.company.aid
				}).then(res => {
					if (res.code == 1) {
						//delivery_id 报名id
						// 2021/9/06  delivery_id
						uni.navigateTo({
							url: '/pagescenter/userypz/share_help_list?red_envelope_aid=' + res.data
								.delivery_id + '&job_title=' +
								res.data.name + '&salary_money=' + res.data.salary_money + '&jobImage=' +
								res.data.image
							// url: '../sign_success?delivery_id=' + res.data.delivery_id + '&company_id=' + this.plant_detail.company.aid +
							// 	'&job_id=' + this.plant_detail.aid
						})
					} else {
						this.$refs.addPop.open()
					}
				});
				// #ifndef H5
				// #endif


			},
			getagreement() {
				//获取协议  保证金规则
				this.$Request.post(this.$api.common.agreenment).then(res => {
					if (res.code == 1) {
						this.service_rules = res.data.service_rules;
					}
				});
			},
			// .海报分享给好友
			sharePop() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 2,
					imageUrl: this.previewImageUrl,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						this.$Common.toast('网络错误，请稍后再试')
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			wefriend() {
				//分享微信好友	path: `pagesHome/index/plant_detail?id=${this.aid}`,
				// let imgOne=this.plant_detail.imgas_thumb
				// console.log(this.plant_detail.imgas_thumb + '?x-oss-process=style/compression');
				uni.share({
					provider: 'weixin',
					scene: 'WXSceneSession',
					type: 5,
					// imageUrl: this.IMG_URL + 'static/miniwechat/logo.png',//不能改成接口返回的
					imageUrl: this.plant_detail.imgas_thumb + '?x-oss-process=style/compression', //format,jpg
					title: this.plant_detail.name + ' ' + this.plant_detail.min_salary + '-' + this.plant_detail
						.max_salary + '/月' + ' ' + this.plant_detail.fan_price + '/' + this.plant_detail.fan_type,
					miniProgram: {
						id: 'gh_66b0749ac265',
						path: 'pagesHome/index/plant_detail?id=' + this.aid + '&longitude=' + this.longitude +
							'&latitude=' + this.latitude,
						type: 0,
						webUrl: 'http://uniapp.dcloud.io'
					},
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						this.$Common.toast('网络错误，请稍后再试')
					}
				});
			},
			wecircle() {
				//分享微信朋友圈
				// console.log(this.plant_detail.imgas_thumb + '?x-oss-process=style/compression');
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: 'https://app.chongdarenli.com/h5/#/pagesHome/index/plant_detail?id=' + this.aid +
						'&longitude=' + this.longitude +
						'&latitude=' + this.latitude,
					title: this.plant_detail.name + ' ' + this.plant_detail.min_salary + '-' + this.plant_detail
						.max_salary + '/月' + ' ' + this.plant_detail.fan_price + '/' + this.plant_detail.fan_type,
					summary: "我正在使用人民保障网，赶紧跟我一起来体验吧！",
					imageUrl: this.plant_detail.imgas_thumb + '?x-oss-process=style/compression',
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						this.$Common.toast('网络错误，请稍后再试')
					}
				});
			},
			toPage() {
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: '../../pagescenter/zhaopinzhe/play_video?url=' + this.plant_detail.video
				});
				// const userInfo = uni.getStorageSync('USERINFO');
				// if (this.isopen == false) {
				// 	return;
				// }
				// this.isopen = false;
				// setTimeout(() => {
				// 	this.isopen = true;
				// }, 1500);
				// if (!userInfo) {
				// 	// #ifndef MP-WEIXIN
				// 	uni.navigateTo({
				// 		url: '../../pagessignup/login'
				// 	});
				// 	// #endif

				// 	// #ifdef MP-WEIXIN
				// 	uni.navigateTo({
				// 		url: '/pagessignup/wechat/wxlog'
				// 	});
				// 	// #endif
				// } else {
				// 	uni.navigateTo({
				// 		url: '../../pagescenter/zhaopinzhe/play_video?url=' + this.plant_detail.video
				// 	});
				// }
			}
		}
	};
</script>
<style lang="scss">
	.mapImg {
		width: 334rpx;
		height: 188rpx;
	}

	.bg_theme {
		background: #50aeff;
	}

	.cuIcon-close {
		position: absolute;
		right: 20upx;
		top: 20upx;
	}

	.bom_save {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 700upx;

		.action2 {
			width: 45%;
		}
	}

	.topBar {
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;
	}

	.box_h5 {
		position: fixed;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 12%;
		width: 200upx;
		height: 70upx;
		line-height: 70upx;
		border-radius: 60upx;
		text-align: center;
	}

	.helpEnvelopes {
		width: 100%;
		height: 59upx;
		background-color: #FFF5E3;

		image {
			width: 38upx;
			height: 38upx;
		}
	}

	.video_image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 10;
	}

	.play_tag {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 80upx;
		height: 80upx;
		right: 0;
		margin: auto;
		z-index: 100;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.box-shodw {
		box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.3);
	}

	.theme_tag {
		width: 120rpx;
		height: 64rpx;
		background: rgba(80, 174, 255, 1);
		opacity: 1;
		border-radius: 32rpx;
	}

	.shop_img {
		width: 106rpx;
		background-color: #f7f7f7;
		margin-right: 16upx;
		height: 106rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.bom_item {
		background-color: #F4F5F7;
		width: 100%;
		height: 68upx;
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

	page {
		background: #fff;
	}

	.like_select {
		color: #ff9e3e;
	}

	.hotImg {
		width: 32rpx;
		height: 40rpx;
	}

	.station_img {
		width: 128rpx;
		height: 128rpx;
	}

	.plant_top {
		border-radius: 12rpx;
		border: 1px solid #ff9e3e;
		height: 176rpx;
		margin-top: 20rpx;
	}

	.left_tody {
		margin-right: 50rpx;
		width: 80rpx;
		height: 100%;
		background: #ff9e3e;
		/* border-radius: 12rpx; */
	}

	.banner {
		/* width: 100%; */
		// height: 700rpx;
	}

	.label_item {
		margin-top: 10rpx;
		margin-left: 0;
		margin-right: 10rpx;
		background-color: #50aeff !important;
		color: #ffffff;
	}

	.money {
		color: #f77858;
		font-weight: 800;
	}

	.location {
		position: relative;
		z-index: 99;
	}

	// .location::after{
	// 	content:"";
	// 	position: absolute;
	// 	left: 0;
	// 	bottom: 10rpx;
	// 	width:126rpx;
	// 	height:8rpx;
	// 	background:rgba(255,158,62,1);
	// 	z-index: -2;
	// }
	.share {
		width: 38upx;
		height: 38upx;
	}

	.pictype {
		image {
			width: 88upx;
			height: 88upx;
		}
	}

	.baozhang {
		background-color: #ffffff;
		font-size: 30upx;
		border-radius: 16upx;

		.btn_canbao {
			text-align: center;
			width: 320upx;
			height: 72upx;
			line-height: 2.2;
			border-radius: 100upx;
			color: #ffffff;
			background-color: #1b90ff;
			margin-top: 20upx;
		}
	}

	.icon_x {
		position: absolute;
		right: 40upx;
		top: 2upx;
	}

	// 海报弹框
	.bg-mask {
		width: 100%;
		height: 100vh;
		background: rgba($color: #000000, $alpha: 0.2);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100100;
	}

	.poster-item {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		z-index: 100100;
		border-radius: 8rpx;
		overflow: hidden;
	}

	.preview-image {
		// box-shadow: 0 0 10rpx rgba(0, 0, 0, .2);
	}

	.handle_footer {
		z-index: 99;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 90rpx;

		.sevirce_btn {
			background: #FFFFFF;
			width: 20%;
			box-shadow: 0 0 3px #cccccc;
			color: #666;
		}

		.btn1 {
			width: 27%;
			height: 100%;
		}


		image {
			width: 30rpx;
			height: 30rpx;
		}

		.phone_btn {
			background: #50aeff;
			color: #ffffff;
		}

		.apply_btn {
			background: #1b90ff;
			color: #fff;
			height: 100%;
		}
	}

	.offset-canvas {
		position: fixed;
		top: -1000px;
		left: 0;
		z-index: 9999;
	}

	.box-float {
		position: fixed;
		right: 5%;
		bottom: 21%;
		// background: $theme;	
		color: $theme;
		order-radius: 50%;
		z-index: 10000;
	}
</style>
