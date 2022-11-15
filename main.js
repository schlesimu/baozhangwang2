import Vue from 'vue'
import App from './App'
import httpApi from './common/httpLbApi'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import VueI18n from 'vue-i18n';
import $mRouter from './common/router'
import $mRoutesConfig from './common/routes.config'
import lbframe from './common/lbframe'
import common from './common/common'
import util from './common/util'
import {
	JjimWidget
} from './js_sdk/jiguang_jim.js'
Vue.use(new JjimWidget());
import "@/common/filter.js";
import uView from "uview-ui";
Vue.use(uView);
Vue.use(VueI18n);

import homepage from 'pages/tabbar/homepage.vue'
Vue.component('homepage', homepage)

import message from 'pages/tabbar/message.vue'
Vue.component('message', message)

// 首页记工时模块
import worktime from 'pages/tabbar/worktimeindex.vue'
Vue.component('worktime', worktime)

import user from 'pages/tabbar/user.vue'
Vue.component('user', user)

import homepageTwo from 'pages/tabbar/homepageTwo.vue'
Vue.component('homepageTwo', homepageTwo)

import zhaopinzhe from '@/pages/tabbar/zhaopinzhe.vue'
Vue.component('zhaopinzhe', zhaopinzhe)
// 职位列表
import plantList from '@/components/plantList.vue'
Vue.component('plantList', plantList)
// // 全国服务经纪人
import serviceBroker from '@/components/serviceBroker.vue'
Vue.component('serviceBroker', serviceBroker)
// // 兼职任务
// import partList from '@/components/partList.vue'
// Vue.component('partList', partList)
// // 资讯头条
// import convenience from '@/components/convenience.vue'
// Vue.component('convenience', convenience)


import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
Vue.config.productionTip = false
const currentVersion = {
	id: 100, //APP版本号，每次更新需要更改
	version: '1.0.0'
}
const i18n = new VueI18n({
	locale:'zh-Hans',
	messages: {
		'ch': '', // 中文语言包
		'en': '' // 英文语言包
	}
})

Vue.prototype.$api = httpApi
Vue.prototype.$Request = HttpRequest
Vue.prototype.$Config = HttpRequest.config
Vue.prototype.$Cache = HttpCache
Vue.prototype.$mRouter = $mRouter;
Vue.prototype.$mRoutesConfig = $mRoutesConfig;
Vue.prototype.$Lbframe = lbframe
Vue.prototype.$Common = common
Vue.prototype.$current = currentVersion
Vue.prototype.$util = util; // 引入帮助函数
App.mpType = 'app'

$mRouter.beforeEach((navType, to) => {
	if (to.route === undefined) throw ("路由钩子函数中没有找到to.route对象，路由信息:" + JSON.stringify(to));

	// 过滤需要权限的页面
	if (to.route.requiresAuth) {
		const userInfo = uni.getStorageSync('USERINFO');
		let userToken = userInfo.user_token
		if (userToken) {
			// 已经登录
			uni[navType]({
				url: lbframe.objParseUrlAndParam(to.route.path, to.query)
			})
		} else {
			// 登录成功后的重定向地址和参数
			let query = {
				redirectUrl: to.route.path,
				...to.query
			}
			// 没有登录 是否强制登录?
			if (false) {
				uni.reLaunch({
					url: lbframe.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
			} else {
				uni.navigateTo({
					url: lbframe.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
			}
		}
	} else {
		uni[navType]({
			url: lbframe.objParseUrlAndParam(to.route.path, to.query)
		})
	}
})

uni.onNetworkStatusChange(function(res) {
	// console.log(res,'监听网络状态');
	if (!res.isConnected) {
		uni.showToast({
			title: "网络信号弱，请检查您的网络状态……",
			icon: 'none'
		});
		return;
	}else{
		// uni.$emit('appLoginSuccess',{});
	}
});
const app = new Vue({
	...App
})
Vue.prototype.IMG_URL = HttpRequest.config('DOMAIN');
Vue.prototype.BASEURL = HttpRequest.config('BASEURL');
const IMG_URL = HttpRequest.config('DOMAIN');
var click = false;
/* 全局混入 start */
Vue.mixin({
	data() {
		return {
			IMG_URL
		};
	},
	methods: {
		navTo(url) {
			if (click) return;
			click = true;
			uni.navigateTo({
				url
			});
			setTimeout(function() {
				click = false;
			}, 200)
		},
		head_img(src) {
			return src.indexOf('http') == -1 ? IMG_URL + src : src;
		},
	},
	filters: {
		card_img(src) {
			if (src == '../../static/user/card2.png' || src == '../../static/user/card1.png') return src;
			if (src == '../../static/user/card3.png' || src == '../../static/user/up.png') return src;
			return src.indexOf('/static') == 0 ? IMG_URL + src : src;
		},
		head_img(src) {
			return src.indexOf('http') == -1 ? IMG_URL + src : src;
		},
		sub_str(name) {
			name = name.toString();
			return name.length > 12 ? name.substr(0, 12) + '...' : name;
		}
	},
});
/* 全局混入 end */

app.$mount()
