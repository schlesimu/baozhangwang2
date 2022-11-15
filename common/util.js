/**
 * 选择定位
 */
function chooseLocation(that, callback) {
	// 获取定位
	uni.chooseLocation({
		success(res) {
			// console.log(res);
			// that.$Common.toast(JSON.stringify(res));
			that.location = res.address;
			callback(res);
		},
		fail: function(error) {
			console.log(error);
		}
	})
}

// 更新本地缓存的位置经纬度
function updateLocation(geocodes) {
	if (location) location = JSON.parse(location);
	if (location && geocodes.length > 0) {
		location.latitude = geocodes[1];
		location.longitude = geocodes[0];
	}
}

//详细地址放大地图 导航
function openLocation(app, lat, lon, city_name) {
	let that = app;
	uni.openLocation({
		latitude: lat,
		longitude: lon,
		name: city_name,
		// address: that.plant_detail.address,
		success: function(res) {
			// console.log('地图', res);
		},
		fail(res) {
			that.$Common.toast('网络错误，请稍后重试');
		}
	});
}

module.exports = {
	chooseLocation,
	updateLocation,
	openLocation
}