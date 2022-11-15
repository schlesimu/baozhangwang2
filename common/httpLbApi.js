/**
 * API接口配置文件
 * 此文件只适用于LBPHP后台输出的接口
 * 如果会冲突，请自行扩展
 */
module.exports = {
	//公共接口组
	common: {
		getverifycode: "v1/5b5bdc44796e8", // 统一获取验证码
		postGetPosterCode:'v1/61736908e6d41',//获取海报分享小程序码
		config: "config/getinfo", // 获取服务端配置
		update: "v1/5d67b2acdd34d", // 检测更新 
		upload: "v1/5d5fa8984f0c2", // 上传图片 
		upload_file: "v1/5f7d37d2d95e9", // 上传文件
		get_order_detail: "v1/5d88ab98cbb1f", //统一查询订单
		add_order: "v1/5d784b976769e", //统一下单接口
		wechatpay: "v1/5d7868c138418", // 发起微信支付
		alipay: "v1/5d7a088403825", // 发起支付宝支付
		set_client_id: "v1/5d8b062aefc08", //更新用户的client_id
		aboutUs: "v1/5ddf7b5d13fce ", // 合作洽谈,关于我们
		fetchAppSetting: "v1/62a9f242d7ddb", // 获取app配置项
		agreenment: 'v1/5ee42d4ec311a', //协议政策
		switch_identity: 'v1/5f228b84cc3f1', //切换身份
		ossVideo: 'v1/5f3c7d5e60cd1', //阿里云上传视频
		singupPlay: 'v1/5ec491c01eeb6', //报名获取保证金订单接口/报名
		singupAudio: 'v1/5f7d37d2d95e9', //聊天上传语音
		checkStatus: 'v1/5fbe08de21cbf', //检查实名认证状态
		conver_comment: 'v1/5fbc8398545f2', //便民信息详情评论
		getCommentList:'v1/60d94f9bc6461',//获取评论列表
	},
	user_two: {
		get_user_msg: 'v1/5de0b0e7ca322', //获取用户信息
	},
	job: { //职位相关接口
		get_chat_job: 'v1/5df2026941865', //获取聊天职位信息
		serviceBrokerList: 'v1/60717a9e146c0', //首页全国服务经纪人列表  正式服
		brokerDetail: 'v1/60717b9f4e703', //经纪人详情  正式服
		signUp_morker: 'v1/60717c38c6a83', //报名经纪人 正式服
		get_station_list: 'v1/5ec4951227209', //岗位标签列表

		// serviceBrokerList:'v1/607147a53a124',//首页全国服务经纪人列表  测试服		
		// brokerDetail:'v1/60715c5bbb701',//经纪人详情  测试服
		// signUp_morker:'v1/607162a28693b',//报名经纪人 测试服
	},
	wechat: {
		wx_login: 'v1/5f3f3aece62a1', //小程序授权登录
		wx_info: 'v1/5f3f36a8551f4', //获取微信小程序信息
	},
	index: {
		get_job_list: "v1/5f223d9029c4f", //获得应聘端职位列表
		get_fuli_info: "v1/5f22673067ac0", //获取福利标签
		get_job_detail: "v1/5f22715824370", //应聘端获取职位详情
	},
	// 助力红包模块
	help_red: {
		help_getHb: 'v1/5fa65d1534d38', //分享好友得助力红包
		is_verification: 'v1/5fb60d9d14843', //验证是否是自己发布的、是否报过名
	},
	//运营组
	operation: {
		get_nav: "v1/5c98e475427d2", //获取指定导航位的导航菜单 
		get_ads: "v1/5c94aa1a043e7", //获取指定广告位的广告
		get_art_list: "v1/5d648c8d37977", //获取指定栏目的文章列表==便民信息列表
		get_art_detail: "v1/5d64a46459991", //获取文章详情
		get_column: "v1/5d63befcb25d9", //获取指定的文章单页信息
		get_column_article_list: "v1/5d648c8d37977", //获取指定栏目的文章列表
		getCompanycode: 'v1/5f6c77b8b214c', //获取公司分享二维码

		feedback: "v1/5cc3f28296cf0", //提交意见反馈
		get_feedback_list: "v1/5cb97ad30ea88", //我的意见反馈列表
		get_feedback_type: "v1/5d63ba953ee01", //意见反馈类型
		getComplaintSort: 'v1/5f927565e3a33', //获取投诉类型
		comPlaint: 'v1/5f927460c9467', //提交投诉
		get_message_type_list: "v1/5d67ac9454d53", //获取系统消息类型及最新消息==列表页的
		get_message_list: "v1/5cc56966e9287", //获取类型的系统消息/站内
		get_message_delete: "v1/5cc56bffbfe7a", //删除指定消息
		systym_number: 'v1/5efd7bac73a0f', //系统消息数量

		get_customer_info: "v1/5d8b45ab937f1", //获取指定的客服信息
		shop_shopList: "v1/5ddf645b71207", // 首页店铺转让列表
		shop_shopDetail: "v1/5ddf66e401c10 ", // 店铺转让列表详情

		part_job_detail: 'v1/5fa6380378d8a', //获取兼职任务详情
		verification: 'v1/5fa63995423d2', //验证接单

		help_info: 'v1/5fa65cc2dba6d', //助力分享页获取助力信息接口

	},
	//用户接口组
	user: {
		user_name_login: "v1/5c78dbfd977cf", // 手机号密码登录
		user_mobile_login: "v1/5c78dca45ebc1", // 手机号验证码登录
		user_wechat_login: "v1/5d7660a421e69", // 第三方登录
		user_forget_password: "v1/5caeeba9866aa", //忘记密码
		user_register: "v1/5cad9f63e4f94", //用户注册
		user_degree: "v1/5ec4962d82f99", //获取学位
		post_label_list: "v1/5de0e3b860364", //岗位标签列表
		post_sort_list: "v1/5f1107e89c98c", //职位类型
		post_job_list: "v1/5f110a6987a8b", //职位标签
		getWelfare_list: "v1/5de1c808570b8", //福利标签列表
		user_want_find: 'v1/5dea01b1c9017', //编辑用户岗位标签
		user_look: "v1/5de074992cae4", //应聘者个人信息提交
		user_undergo_list: "v1/5ec497a82dee2", //获取用户教育经历/工作经历列表
		getexperienceOne:'v1/60d9928278cff',//获取单独的经历详情
		user_add_experience: "v1/5ec4966d31d52", //添加工作经历
		user_add_education: "v1/5ec49709ce8fa", //添加教育经历
		deletUndergo:'v1/60d96b7b855ce',//删除经历
		user_release: "v1/5de4b671edc7e", //发布简历
		setResum: 'v1/60cac9fdef899', //开启关闭简历
		updateResume:'v1/60cacbd021b8c',//刷新简历
		user_company: "v1/5de20e7248ccc", //招聘者编辑个人资料--我要招人
		user_creat_job: "v1/5f1ff10a67d73", //创建招聘职位
		user_edit_job: "v1/5f20dc707d8b4", //编辑招聘职位
		user_delet_job: "v1/5f20eacea37a7", //删除招聘职位
		recruitstatus: 'v1/5def4f41c6bb0', //招聘职位打开关闭状态
		user_priceList: "v1/5deaf9b490c85", //获取职位价格列表
		user_authentication: "v1/5f1fe46608994", //公司认证
		editcompanyinfo: 'v1/5f1fe6a433c5d', //公司管理编辑公司信息
		getjobdata: 'v1/5f1129301188a', //职位管理获取职位信息
		openPost: 'v1/5f20eaab43096', //开启关闭职位

		bind_wechat_account: "v1/5d7757d28d076", // 微信登录绑定手机号
		get_user_info: "v1/5c78c4772da97", // 获取应聘端用户信息
		edit_user_info: "v1/5cb54af125f1c", //修改应聘者个人资料
		edit_bind_mobile: 'v1/5d5f4c28b8636', //更换绑定的手机号

		user_certification_status: "v1/5f1fe42aa6379", //获取认证状态
		user_certification: "v1/5d6baaec27b0d", //提交认证资料
		user_signin: "v1/5caf00505dd00", //立即签到
		get_user_signin: 'v1/5d78c19d31461', //获取会员签到详情

		get_follow_attention: 'v1/5cb6c07f79fb8', //关注列表和粉丝列表
		set_follow: 'v1/5d7e38b5e7e31', //关注列表和粉丝列表

		get_address_list: "v1/5cadcdd909c17", //获取收货地址列表
		add_address: "v1/5cadb304426d8", //添加收货地址 
		get_edit_address: "v1/5cadc769e4f16", //获取修改的收货地址
		edit_address: "v1/5cadcf462e1ad", //修改的收货地址
		change_default_address: "v1/5cadce9008a62", //修改默认地址
		del_address: "v1/5cadd0d3a0c93", //删除收货地址

		get_collection_list: "v1/5d89f2123b6be", //我的收藏/关注
		set_collection: "v1/5d89f462c9c21", //添加/取消收藏
		cancel_collection: "v1/5d8a1c18cf048", //取消收藏（我的收藏列表）

		get_singup_list: 'v1/5f290b0585d1e', // 获取报名状态列表
		pay_balance: 'v1/5df0bc319f556', // 余额支付
		get_info_data: 'v1/5df050c52f03d', // 获取应聘端个人信息

		get_my_code: 'v1/5f116452120a2', // 我的邀请页面
		get_invite: "v1/5ecb783e2065a", //分享链接
		set_user_lastid: "v1/5d9025003e150", //手动绑定推荐人
		userAddons_cooperation: "v1/5de716fbf0138", // 合作伙伴
		Mycollection: "v1/5dea140214822 ", // 招聘端兼应聘端我的收藏
		companyData: 'v1/5ec3a4ec69829', //应聘端招聘详情公司信息
		shieldcompanyinfo: 'v1/5f10f8697a620', //屏蔽公司列表
		conplayshield: 'v1/5f10f8e8a37b1', //已屏蔽的公司
		deletshield: 'v1/5f10f88bca752', //删除屏蔽的公司
		addshield: 'v1/5f10f8bb79c21', //添加屏蔽公司
		myresume: 'v1/5f181f6d7bb4a', //我的简历
		getWantSalary: 'v1/60c08b9545fc5', //期望薪资
		resumeStoreList: 'v1/60bf411c31e43', //首页简历库列表
		getResumeDetail: 'v1/60c039d9a44cc', //获取简历详情

		subUserResume: 'v1/5ec492bf8f9e1', //提交简历
		getResumeNumInfo: 'v1/60c1c488e69c9', //获取简历查看次数 购买份数信息
		getResume_detail: 'v1/60c039d9a44cc', //简历库获取简历详情

		my_orderList: 'v1/5fa65957962d3', //我的接单列表
		my_part_job_list: 'v1/5fa6360e1668b', //我发布的的网约工列表
		partDetail_jobList: 'v1/5fa63de299db3', //兼职任务详情接单人列表
		set_part_status: 'v1/5fa642073501c', //设置兼职任务详情兼职状态
		person_detail: 'v1/5fa640e1ec443', //接单人详情
		part_job_detail: 'v1/5fa6380378d8a', //兼职任务详情
		my_red_env_list: 'v1/5fa65e6192671', //我的红包列表
		friend_help: 'v1/5fa65e1999728', //好友助力
		
		user_info_submit:"v1/6292224b8186e", // 用户信息/坑骗拖欠名单提交，一个用户只能提交一个
		user_info_refresh:"v1/629222cac20cb", // 用户信息刷新
		user_info_switch:"v1/629222ea750f6", // 用户信息关闭/开启
		user_info_get:"v1/62922276181e8", // 用户发布信息获取（仅一条）
		user_inform_get:"v1/62922276181e8", // 用户发布坑骗拖欠名单获取（仅一条）
		user_info_list:"v1/6292230808614", // 用户发布信息/坑骗拖欠名单列表
		user_info_delete:"v1/62923f44ac67b", // 用户删除信息/黑名单
	},
	// 社区
	Community: {
		getList: "v1/5de0f4434e204", // 社区列表
		setCommunity: "v1/5de0d68402476", // 发布社区
		setComment: "/v1/5de0d6a280b7d ", // 社区评论
		getInfo: "v1/5de0d6035e946", // 获取社区详情
		setComment_del: "v1/5de0d6bbd0647", // 评论删除
		delCommunity: "v1/5de0fede06316", // 删除动态
		noticeList: 'v1/5f6dc07f50be3', //最新通知列表
		add_notice: 'v1/5f6db3363dcf2', //发布，编辑最新通知
		del_notice: 'v1/5f6dc74b05df1', //删除最新通知
		getNoticedetail: 'v1/5f6dca683f283', //获取最新通知详情
		getAlbumlist: 'v1/5f6f049a5d10d', //获取我的相册列表
		addAlbum: 'v1/5f6efccb9df43', //发布相册
		albumDetail: 'v1/5f6f084960015', //获取相册详情
		delAlbum: 'v1/5f6f025d71412', //删除相册
	},
	// 应聘者消息页
	msg: {
		carousel: "v1/5de2338d329bf", // 轮播
		Collectmy: "v1/5de8a9983279e", // 收藏了我
		Appointmentinterview: "v1/5deb4ca3951e6", // 我的面试
		choosecity: 'v1/5f44de688808f', //切换城市
		getCity: 'v1/5ece11a1ae240', //获取城市
		getAddressList:'v1/60d402e6a7b92',//筛选获取城市列表
		cityPosition: 'v1/5f696ea77555a', //城市定位
		chooseCounty: 'v1/5f696e345127f', //选择县级
		doctor_list: 'v1/5f27b6ef6f1f5', //最近联系人列表
		msg_List: 'v1/5f27eae624cda', //获取聊天记录
		user_token_msg: 'v1/5f27b6a8ee4b1', //修改已读未读
		messageNumber: 'v1/5fe16ab71b58a', //全局消息数量
		addFriend: 'v1/5f27e3cc69081', //添加好友
		deletFriend: 'v1/5f2bb35d4351d', //删除好友列表
		messageStatic: 'v1/5f27b6a8ee4b1', //已读未读状态
		applyTop: 'v1/5f20da0c2cf8d', //申请置顶
		getNoticeList: 'v1/63422c14b89ea', // 获取通知、广告、活动列表
		getNoticeDetail: 'v1/63422cfd47953', // 获取通知、广告、活动详情
	},

	//招聘者个人信息模块
	company: {
		applicationList: "v1/5f20028e9c345", // 招聘首页简历列表
		personalspace: 'v1/5df1d8febfabe', //简历详情个人空间
		positionList: "v1/5de715b445380", //应聘端首页职位列表
		nearworkList: "v1/5f125210b763b", //应聘端首页附近职位列表
		screelist: 'v1/5f1252c3615a9', //应聘端首页附近职位筛选列表
		positionInfo: "v1/5f2006792890b", // 招聘端职位详情
		companyInfo: "v1/5f1fe66899b95", // 招聘端获取公司信息==我的信息
		set_collection: "v1/5d89f462c9c21", // 添加/取消收藏  1:收藏应聘者 2:收藏招聘者 3:收藏店铺
		resumedetails: "v1/5de5f4584fd79", // 简历详情接口
		getResumeInfo: 'v1/5ec49640228e1', //获取简历信息
		jobList: "v1/5def4c1ee9f26 ", // 职位列表
		customizedList: "v1/5deb5b643c5bc", // 定制价格列表
		Delivery: "v1/5deb13a40b572 ", // 投递简历
		Mydelivery: "v1/5deb1eb6debb0", // 我的投递
		resumeReceived: "v1/5df0b7b73ad57", // 收到的简历
		stationtag: 'v1/5de8bf6f9a3f2', //面试处理职位标签
		station_list: 'v1/5f12aa9ade154', //面试处理职位列表
		checkispay: 'v1/5f192b731230f', //发布职位时检查是否支付
		jobTemplate: 'v1/5f0d8542afdd9', //获取职位描述模板
		upload_resume: 'v1/5fa65c58e6e14', //上传、获取简历附件
		getPrice: 'v1/5fcee2a7aedc9', //获取公司保证金
		getpart_type: '/v1/5f93852edd207', //发布网约工结算方式/类型
		publish_online: 'v1/5fa6198ce26e3', //发布网约工
		edit_part: 'v1/5fcda2ff6fbac', //编辑网约工
		delet_part: 'v1/5fcdb0289e943', //删除网约工
		signUp_list: 'v1/5fa65ac873ee8', //招聘端某职位下面报名列表
		setsignUp_status: 'v1/5fa65b57ba7e4', //招聘端设置报名状态
		lookResume_detail: 'v1/5fa65ee4898b9', //查看简历详情
		lookFriend_list: 'v1/5fa65f46ce770', //招聘端查看给求职者助力好友列表
		cancel_company: "v1/5fcf363de11e5", //注销公司
		get_cancel_type: 'v1/5fcf361804351', //获取注销公司类型
		salaryList: 'v1/604727fb6af6d', //公司主页 工资列表接口
		getSalaryDetail: 'v1/604728b989f3e', //工资详情
		noticePush: 'v1/6050211674cc1', //最新通知推送
	},
	money: {
		get_my_money: 'v1/5cc45274d6be9', //获取金额信息
		get_money_detail: 'v1/5cc45422e5c87', //金额流水明细
		get_recharge_rule: 'v1/5cd2b4631e656', //获取充值规则
		get_score_list: 'v1/5d75bbc77d252', //会员积分明细
		bind_withdraw_account: 'v1/5d7b7d4007529', //绑定提现账号
		get_withdraw_account: 'v1/5d7b9bd1c7d7c', //获取绑定的提现账号
		withdraw: 'v1/5ce25d5e1ffb8', //提现申请
		chack_pay_pass: 'v1/5eda02695e7d3', //检查是否设置支付密码
		setpay_password: 'v1/5eda021e39d93', //设置支付密码
	},
	worktime: {
		get_current_month_info: 'v1/6326cb281efa8', // 记工时首页获取当月统计	
		set_salary_settings: 'v1/6326df8a13227', // 记工时设置
		get_salary_settings: 'v1/6326eed961c2e', // 获取记工时配置
		delete_salary_setting: 'v1/63271e594c29b', // 删除工时配置
		get_work_time_range: 'v1/632720ec69eed', // 获取考勤周期
		get_work_record_by_range: 'v1/6327302b5ea62', // 按范围获取工时统计
		get_canlendar_info_type: 'v1/632997959b1b9', // 判别工作日，周末，节假日
		set_single_work_time: 'v1/632bcc5878c0c', // 单独设置考勤周期
		set_work_rule: 'v1/632d1e7c925c8', // 计件工全勤奖设置
		get_overtime_ratio: 'v1/632ef2576dc9b', // 获取加班倍数
		get_current_record: 'v1/632eff5812bd7', // 获取当日工时记录
		record_work_time: 'v1/632ffc20c624e', // 记工时
		get_work_time_index: 'v1/6332689bc4729', // 获取考勤配置
		get_range_by_period: 'v1/633265717fcfc', // 根据考勤索引获取开始结束日期
		delete_salary_record: 'v1/63340cf0d4167', // 删除工时记录
	}
}
