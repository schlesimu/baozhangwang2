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

// ����ǩ��
const getSign = function(data) {
    // ��ֻ��һ���򵥵ļ�Ȩ����,������app��С����h5������Ҫʹ�ã�appsecret����й�ܣ����Գ���JS�������ܣ�����ͬ���衣
    // �ͻ��ˣ���ȡǩ�������� ȡ�õ�ǰʱ���timestamp������ַ���SignatureNonce�������appid��appsecret���һ�����󣬺ʹ�������data�����ϲ������л�����sha1���ܵĵ��ľ���signatureǩ����ע��appsecret�����ݵ�������
    // ����˽��ܣ���Ϣͨ��header���ݣ���������ȡ�󣬸��ݴ��ݵ�appid ��ѯ appsecret����ѯ����ֱ�ӳ����쳣���ٺ��ϴ��ݹ�ȥ�����в��������л�sha1���ܺ��signature�Աȣ����һ������ǩͨ����
    let Sign, timestamp = parseInt((new Date()).getTime() / 1000),
        SignatureNonce;

    //����SignatureNonce�����������ﴦ��һ��
    SignatureNonce = sha1("lwwan_key_" + getrandomNum(5) + getrandomNum(6));
    let str = {
        appid: AppId,
        timestamp: timestamp,
        appsecret: config.MARK,
        signaturenonce: SignatureNonce,
    }
    //�ϲ�����
    var objstr = jsonSort(getExtend(str, data));

    Sign = {
        appid: AppId,
        signaturenonce: SignatureNonce,
        timestamp: timestamp,
        signature: sha1(objstr) //ǩ��
    }
    return Sign;
}

// �����
const getrandomNum = function(num) {
    let rnd = "";
    for (let i = 0; i < num; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}

// �ϲ�����
const getExtend = function(target, source) {
    for (var obj in source) {
        target[obj] = source[obj];
    }
    return target;
}
// �������л�
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
 * ��cityNo ת cityName
 * cityData:ԭ����
 * cityNo��������������
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
                // ʹ��return ��ֹѭ��
                return `${sheng.label}-${shi.label}`;
            }
        }
    }
}

/* 
 * obj ת params�ַ�������  
 * ���ӣ�{a:1,b:2} => a=1&b=2
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
 * obj ת ·�ɵ�ַ������
 * ���ӣ�{a:1,b:2} => /pages/index/index?a=1&b=2
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
 * ��ȡurl�ַ�������
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
 * �˷������js������ʧ����
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
        //��ת����¼ҳ
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
        uni.showToast({ title: "�������ʧ��", icon: 'error' });
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
