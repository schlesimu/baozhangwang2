const APPNAME = '人人保障网-招聘、找工作无忧！';
// 正式域名
const DOMAIN = "https://app.chongdarenli.com/";
const BASEURL = "https://app.chongdarenli.com/";
// 内网测试域名
// const DOMAIN = "http://192.168.1.105:4188/";
// const BASEURL = "http://192.168.1.105:4188/"; 
// 家中测试域名
// const DOMAIN = "http://localhost:9188/";
// const BASEURL = "http://localhost:9188/"; 
// 测试域名
// const DOMAIN = "https://baozhangwang.baozhuangwang.net/";
// const BASEURL = "https://baozhangwang.baozhuangwang.net/";

// const WS_HOST = "ws://122.114.82.199:32481/";
const WS_HOST = "ws://116.62.60.243:9502";

const MARK = 'GcAanOxADJWSCFtPqdkIJTrtVHvulbym';//生产环境建议改个名字，这个名字太通用了容易猜到,分散到其他文件最好

module.exports = {
	APIHOST:DOMAIN+"api/",
	DOMAIN:DOMAIN,
	MARK:MARK,
	WS_HOST,
	BASEURL,
	APPNAME
} 