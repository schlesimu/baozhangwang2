//自定义公共方法
function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}
module.exports = {
	toast: function(str) { //弹出无图标的消息框
		uni.showToast({
			title: str,
			icon: 'none',
		})
	},
	alert: function(str, fn) { //弹出提示框
		uni.showModal({
			title: '提示',
			content: str,
			showCancel: false,
			success: function(res) {
				if (typeof fn == 'function') {
					fn()
				}
			}
		});
	},
	confirm: function(str, fn) { //弹出选择框，成功后回调
		uni.showModal({
			title: '提示',
			content: str,
			success: function(res) {
				if (res.confirm) {
					if (typeof fn == 'function') {
						fn(res)
					}
				} else if (res.cancel) {
					//console.log('用户点击取消');
				}

			}
		});
	},
	// getLocation: function(str, fn) { //弹出选择框，成功后回调
	// 	// #ifdef H5
	// 	return {

	// 	}
	// 	// #endif
	// 	uni.getLocation({
	// 		type: 'wgs84',
	// 		geocode: true,
	// 		success: function(res) {
	// 			console.log('当前位置的经度：' + res.longitude);
	// 			console.log('当前位置的纬度：' + res.latitude);
	// 		}
	// 	});

	// },
	convertObj: function(data) { //对象转url参数
		var _result = [];
		for (var key in data) {
			var value = data[key];
			if (value.constructor == Array) {
				value.forEach(function(_value) {
					_result.push(key + "=" + _value);
				});
			} else {
				_result.push(key + '=' + value);
			}
		}
		return _result.join('&');
	},
	/* 
	  复制到剪切板
	 */
	copy(txt) { //复制到剪切板
		uni.setClipboardData({
			data: txt,
			success: function() {
				uni.showToast({
					icon: 'none',
					title: "复制成功"
				})
			}
		});
	},
	/* 
		uni-预览图片
		src	是 数组或 字符串
		count: 预览的下标 默认0
	 */
	lookImg(src, count) { //预览图片
		console.log(src, typeof src);
		if (!src) {
			return false;
		}
		let arr = src;
		if (typeof src == 'string') {
			arr = [src]
		}
		uni.previewImage({
			urls: arr,
			current: count || 0,
			success(res) {
				console.log(res);
			},
			fail(err) {
				console.log(err);
			}
		});
	},
	/**
	 * 时间戳转化为年 月 日 时 分 秒 
	 * number: 传入时间戳 
	 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
	 */
	formatTime(number, format2) {
		var format = format2 ? format2 : 'Y/M/D h:m:s'
		var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
		var returnArr = [];

		var date = new Date(number * 1000);
		returnArr.push(date.getFullYear());
		returnArr.push(formatNumber(date.getMonth() + 1));
		returnArr.push(formatNumber(date.getDate()));

		returnArr.push(formatNumber(date.getHours()));
		returnArr.push(formatNumber(date.getMinutes()));
		returnArr.push(formatNumber(date.getSeconds()));

		for (var i in returnArr) {
			format = format.replace(formateArr[i], returnArr[i]);
		}
		return format;
	},
	/**
	 * base64图片缓存到本地,返回本地路径
	 * */
	base64ToPath(base64) {
		return new Promise(function(resolve, reject) {
			if (typeof window === 'object' && 'document' in window) {
				base64 = base64.split(',')
				var type = base64[0].match(/:(.*?);/)[1]
				var str = atob(base64[1])
				var n = str.length
				var array = new Uint8Array(n)
				while (n--) {
					array[n] = str.charCodeAt(n)
				}
				return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], {
					type: type
				})))
			}
			var extName = base64.match(/data\:\S+\/(\S+);/)
			if (extName) {
				extName = extName[1]
			} else {
				reject(new Error('base64 error'))
			}
			var fileName = Date.now() + '.' + extName
			if (typeof plus === 'object') {
				var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
				bitmap.loadBase64Data(base64, function() {
					var filePath = '_doc/uniapp_temp/' + fileName
					bitmap.save(filePath, {}, function() {
						bitmap.clear()
						resolve(filePath)
					}, function(error) {
						bitmap.clear()
						reject(error)
					})
				}, function(error) {
					bitmap.clear()
					reject(error)
				})
				return
			}
			if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
				var filePath = wx.env.USER_DATA_PATH + '/' + fileName
				wx.getFileSystemManager().writeFile({
					filePath: filePath,
					data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
					encoding: 'base64',
					success: function() {
						resolve(filePath)
					},
					fail: function(error) {
						reject(error)
					}
				})
				return
			}
			reject(new Error('not support'))
		})
	},

	// 检查手机是否开启GPS定位
	checkOpenGPSServiceByAndroid() {
		// #ifdef APP-PLUS


		let system = uni.getSystemInfoSync(); // 获取系统信息
		if (system.platform === 'android') { // 判断平台


			var context = plus.android.importClass("android.content.Context");
			var locationManager = plus.android.importClass("android.location.LocationManager");
			var main = plus.android.runtimeMainActivity();
			var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
			if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
				uni.showModal({
					title: '提示',
					content: '请打开定位服务功能',
					showCancel: false, // 不显示取消按钮
					success() {
						if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
							var Intent = plus.android.importClass('android.content.Intent');
							var Settings = plus.android.importClass('android.provider.Settings');
							var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
							main.startActivity(intent); // 打开系统设置GPS服务页面
						} else {
							console.log('GPS功能已开启');
						}
					}
				});
			} else {
				console.log('GPS功能已开启');
			}

		}
		if (system.platform === 'ios') {
			var cllocationManger = plus.ios.importClass("CLLocationManager");
			var enable = cllocationManger.locationServicesEnabled();
			var status = cllocationManger.authorizationStatus();
			console.log("enable:" + enable);
			console.log("status:" + status);
			if (enable && status != 2) {

				console.log("手机系统的定位已经打开");
			} else {
				console.log("手机系统的定位没有打开");
				//  定位没有开启时  提示用户是否开启  
				plus.nativeUI.confirm("定位权限没有开启，是否去开启？", function(e) {
					if (e.index == 1) {
						var UIApplication = plus.ios.importClass("UIApplication");
						var application2 = UIApplication.sharedApplication();
						var NSURL2 = plus.ios.importClass("NSURL");
						var setting2 = NSURL2.URLWithString(
							"App-Prefs:root=Privacy&path=LOCATION"); // 打开应用权限  
						application2.openURL(setting2);
						plus.ios.deleteObject(setting2);
						plus.ios.deleteObject(NSURL2);
						plus.ios.deleteObject(application2);
					}
				}, {
					"buttons": ["不开启", "去设置"],
					"verticalAlign": "center"
				});
			}
			plus.ios.deleteObject(cllocationManger);
		}
		// #endif
	},
	gotoAppPermissionSetting() {
		if (uni.getSystemInfoSync().platform === 'ios') {
			var UIApplication = plus.ios.import("UIApplication");
			var application2 = UIApplication.sharedApplication();
			var NSURL2 = plus.ios.import("NSURL");
			var setting2 = NSURL2.URLWithString("app-settings:");
			application2.openURL(setting2);
			plus.ios.deleteObject(setting2);
			plus.ios.deleteObject(NSURL2);
			plus.ios.deleteObject(application2);
		} else {
			var Intent = plus.android.importClass("android.content.Intent");
			var Settings = plus.android.importClass("android.provider.Settings");
			var Uri = plus.android.importClass("android.net.Uri");
			var mainActivity = plus.android.runtimeMainActivity();
			var intent = new Intent();
			intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
			var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
			intent.setData(uri);
			mainActivity.startActivity(intent);
		}
	},
	/* 
	 *	获取地理位置 
	 */
	getLocation(fn) {
		// #ifdef H5
		let res = {
			longitude: '113.6431930881076',
			latitude: '34.73802924262153',
		}
		if (typeof fn == 'function') {
			fn(res)
		}
		return false;
		// #endif
		uni.getLocation({
			type: 'gcj02', //'wgs84',
			geocode: true,
			success: function(res) {
				console.log(res);
				// console.log('当前位置的经度：' + res.longitude);
				// console.log('当前位置的纬度：' + res.latitude);
				if (typeof fn == 'function') {
					fn(res)
				}
			},
			fail: function(err) {
				let res = {
					longitude: '',
					latitude: '',
					// #ifdef H5
					longitude: '113.6431930881076',
					latitude: '34.73802924262153',
					// #endif
				}
				if (typeof fn == 'function') {
					fn(res)
				}
			}
		});
	}
}
