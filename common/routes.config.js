/* 
 * 路由表对象：
 * 该文件挂载在Vue原型中 $mRoutesConfig
 * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 * 
 * 配置参数项说明： 
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 */

export default {
	
	index: {
		name: "请求",
		path: "/pages/index/index"
	},
	login: {
		name: "密码登录",
		path: '/pages/login/login'
	},
	thirdLogin: {
		name: "验证码登录",
		path: '/pages/login/mobile_login'
	},
	register: {
		name: "注册",
		path: '/pages/login/register'
	},
	resetpassword: {
		name: "忘记密码",
		path: '/pages/login/resetpassword'
	},
	user: {
		name: "个人中心",
		path: '/pages/tabBar/user'
	},
	home: {
		name: "首页",
		path: '/pages/tabBar/home'
	},
	order: {
		name: "订单",
		path: '/pages/tabBar/order'
	},
	store: {
		name: "积分",
		path: '/pages/tabBar/store'
	},
	wallet: {
		name: "我的钱包",
		path: '/pages/center/wallet'
	},
	Recharge: {
		name: "我的钱包",
		path: '/pages/center/Recharge'
	},
	payment: {
		name: "立即提现",
		path: '/pages/center/payment/payment'
	},
	process: {
		name: "提现进程",
		path: '/pages/center/process/process'
	},
	articleDetail: {
		name: "新闻详情",
		path: '/pages/article/detail'
	},
	customer_list:{
		 name: "客服列表",
		 path: "/pages/message/customer_list",
		 requiresAuth:true
	}
}
