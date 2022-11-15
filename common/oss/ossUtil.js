import Crypto from './libs/crypto/crypto.js';
import './libs/crypto/hmac.js';
import './libs/crypto/sha1.js';
import {
	Base64
} from './libs/crypto/base64.js';
// import config from '@/config/index.js'

const uploadFileSize = 1024 * 1024 * 500; // 上传文件的大小限制500m
const accesskey = 'H9cQ5fqwCVfsWFGOkZlMrwf6s2PFBm'; // 自己去申请
const accessId = 'LTAI4GLBWBHdFkoMTpNSt7K7' // 自己去申请
var videoSrc = '';
var timetamp = new Date().getTime();
var filesize;
export default {
	_getPolicy() {
		let policyText = {
			"expiration": "2022-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
			"conditions": [
				["content-length-range", 0, uploadFileSize] // 设置上传文件的大小限制
			]
		};

		return Base64.encode(JSON.stringify(policyText))
	},
	_getSignature(message) {
		let bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, {
			asBytes: true
		});
		return Crypto.util.bytesToBase64(bytes);
	},
	_getSuffix(filename) {
		let pos = filename.lastIndexOf('.')
		let suffix = ''
		if (pos != -1) {
			suffix = filename.substring(pos)
		}
		return suffix;
	},
	getFileName(filename) {
		return  new Date().getTime() + Math.random().toString(36).substring(3, 20) + this._getSuffix(filename)
	},
	getImage() {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'],
				success: (res) => {
					resolve(res)
				}
			})
		});
	},
	getVideo() {
		return new Promise((resolve, reject) => {
			uni.chooseVideo({
				count: 1,
				sourceType: ['camera', 'album'],
				// #ifdef MP-WEIXIN
				maxDuration:60,
				// #endif
				// #ifndef MP-WEIXIN
				maxDuration:120,
				// #endif
				success: function(res) {
					if (res.size > uploadFileSize) {
						let videoSize=uploadFileSize/1024/1024
						uni.showToast({
							title: '文件大小超过系统上传限制：' + videoSize+'Mb',
							icon: 'none',
							duration: 1000
						});
						return;
					}
					resolve(res.tempFilePath);
					filesize = res.size;
				},
				fail: (err) => {
					uni.showToast({
						title: '取消选择视频',
						icon: 'none',
						duration: 2000
					});
				}
			})
		});
	},
	// 获取STS签名
	get_STS() {
		// 读取接口
		// return new Promise((resolve, reject) => {
		//     let name = new Date().getTime() + Math.random();
		//     let operate = 'uploadImg';
		//     let that = this;
		//     uni.request({
		//         method: "post",
		//         url: "",
		//         data: {
		//             name,
		//             operate,
		//             sign: Crypto.MD5(name + operate + "bayinabayin888").toString()
		//         },
		//         success(res) {
		//             if (res.data.code != 200) {
		//                 that.$alert(res.data.message || res.data.msg)
		//             } else {
		//                 resolve(res.data.data)
		//             }
		//         },
		//         error(err) {
		//             reject(err)
		//         }
		//     })
		// })
		// 本地获取
		return new Promise((resolve, reject) => {
			let policy = this._getPolicy();
			let res = {
				accessId: accessId,
				host: 'https://baozhangwang.oss-cn-beijing.aliyuncs.com', // 自己去申请
				policy,
				signature: this._getSignature(policy),
				filesize:filesize
			};
			resolve(res)
		})
	},
};
