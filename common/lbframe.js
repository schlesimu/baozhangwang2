import sha1 from '../common/sha1';
import config from './config'
import cache from './cache'
import $mRoutesConfig from './routes.config.js'
const AppId = '94427596';

const getUserInfo = function() {
    let ret = '';
    ret = uni.getStorageSync('userToken');
    if (ret) {
        return ret;
    }
    return false;

}

// 生成签名
const getSign = function(data) {
    // 这只是一个简单的鉴权功能,适用于app和小程序，h5尽量不要使用，appsecret明文泄密（可以尝试JS混淆加密），形同虚设。
    // 客户端：获取签名的流程 取得当前时间戳timestamp，随机字符串SignatureNonce，配合上appid和appsecret组成一个对象，和传过来的data参数合并，序列化后用sha1加密的到的就是signature签名，注意appsecret不传递到服务器
    // 服务端解密：信息通过header传递，服务器获取后，根据传递的appid 查询 appsecret，查询不到直接出抛异常，再合上传递过去的所有参数，序列化sha1加密后和signature对比，如果一致则验签通过。
    let Sign, timestamp = parseInt((new Date()).getTime() / 1000),
        SignatureNonce;

    //生成SignatureNonce，可以在这里处理一下
    SignatureNonce = sha1("lwwan_key_" + getrandomNum(5) + getrandomNum(6));
    let str = {
        appid: AppId,
        timestamp: timestamp,
        appsecret: config.MARK,
        signaturenonce: SignatureNonce,
    }
    //合并参数
    var objstr = jsonSort(getExtend(str, data));

    Sign = {
        appid: AppId,
        signaturenonce: SignatureNonce,
        timestamp: timestamp,
        signature: sha1(objstr) //签名
    }
    return Sign;
}

// 随机数
const getrandomNum = function(num) {
    let rnd = "";
    for (let i = 0; i < num; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}

// 合并对象
const getExtend = function(target, source) {
    for (var obj in source) {
        target[obj] = source[obj];
    }
    return target;
}
// 对象序列化
function jsonSort(jsonObj) {
    let arr = [];
    for (var key in jsonObj) {
        arr.push(key)
    }
    arr.sort();
    let str = '';
    for (var i in arr) {
        str += arr[i] + "=" + jsonObj[arr[i]] + "&"
    }
    return str.substr(0, str.length - 1)
}

/*
 * 将cityNo 转 cityName
 * cityData:原数据
 * cityNo：二级地区编码
 */
function getCityName(cityData, cityNo) {
    if (!cityNo) return;
    if (!(cityData instanceof Array)) return;
    // 9112
    cityNo += "";
    for (let i = 0; i < cityData.length; i++) {
        let sheng = cityData[i];
        for (let j = 0; j < sheng.children.length; j++) {
            let shi = sheng.children[j];
            if (shi.value == cityNo) {
                // 使用return 终止循环
                return `${sheng.label}-${shi.label}`;
            }
        }
    }
}

/* 
 * obj 转 params字符串参数  
 * 例子：{a:1,b:2} => a=1&b=2
 */
function objParseParam(obj) {
    let paramsStr = "";
    if (obj instanceof Array) return paramsStr;
    if (!(obj instanceof Object)) return paramsStr;
    for (let key in obj) {
        paramsStr += `${key}=${obj[key]}&`;
    }
    return paramsStr.substring(0, paramsStr.length - 1);
}

/* 
 * obj 转 路由地址带参数
 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
 */
function objParseUrlAndParam(path, obj) {
    let url = path || "/";
    let paramsStr = "";
    if (obj instanceof Array) return url;
    if (!(obj instanceof Object)) return url;
    paramsStr = this.objParseParam(obj);
    paramsStr && (url += "?");
    url += paramsStr;
    return url;
}

/* 
 * 获取url字符串参数
 */
function getRequestParameters(locationhref) {
    let href = locationhref || "";
    let theRequest = new Object();
    let str = href.split("?")[1];
    if (str != undefined) {
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


/**
 * 乘法，解决js精度损失问题
 * @param {*} arg1 
 * @param {*} arg2 
 */
function accMul(arg1, arg2) {
    arg1 = arg1 || 0;
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {}
    try {
        m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

function loginCheck() {
    const userToken = uni.getStorageSync('userToken');
    if (!userToken) {
        //跳转到登录页
        uni.navigateTo({
            url: $mRoutesConfig.login.path
        })
    }
}

function clearCache(){
    try {
        uni.clearStorage();
        return true;
    } catch (e) {
        uni.showToast({ title: "清除缓存失败", icon: 'error' });
        return false;
    }
}


export default {

    getUserInfo,
    AppId,
    getSign,
    getExtend,
    loginCheck,
    getCityName,
    objParseParam,
    objParseUrlAndParam,
    getRequestParameters,
    accMul,
    clearCache
}
