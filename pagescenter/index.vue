<template>
  <view class="page-wapper">
    <view id="map"></view>
    <view class="custom-map-list">
      <scroll-view scroll-y class="custom-map-list-wapper">
        <view>
          <view :class="{'custom-map-list-item': true, active: selectAddressIndex == 0}" v-if="showCurrentAddress" @tap="handleChooseAddressListItem(0)">
            <view class="custom-map-list-item-lside">
              <view class="custom-map-list-item-title">当前位置</view>
              <view class="custom-map-list-item-desc">{{currentAddress.name}}</view>
            </view>
            <view class="custom-map-list-item-rside" v-if="selectAddressIndex == 0">
              <!-- <image src="/static/choose_address_selected_icon.png"></image> -->
            </view>
          </view>
          <view :class="{'custom-map-list-item': true, active: selectAddressIndex == (index + 1)}" v-for="(item,index) in addressSearchResult" :key="index" @tap="handleChooseAddressListItem(index + 1)">
            <view class="custom-map-list-item-lside">
              <view class="custom-map-list-item-title">{{item.name}}</view>
              <view class="custom-map-list-item-desc">{{item.district}}{{item.address}}</view>
            </view>
            <view class="custom-map-list-item-rside" v-if="selectAddressIndex == (index + 1)">
              <!-- <image src="/static/choose_address_selected_icon.png"></image> -->
            </view>
          </view>
          <view class="custom-map-list-empty-page" v-if="!showCurrentAddress && addressSearchResult.length == 0">
            <image src="/static/choose_address_empty.png"></image>
            <view class="text">未检索到地址~</view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="confirm-btn" @tap="handleConfirmChooseAddress"><text>确定\n选择</text></view>
  </view>
</template>

<script>
// import { AMAP_KEY } from '@/common/config.js'
const AMAP_KEY = '0230358a3efdf708abe8387e25664353'
import amapFile from '@/common/amap-wx.js'

const mapZoom = 16
let maps = null
let geolocation = null
let map = null
let marker = null
let markerIcon = '/static/choose_address_marker_icon.png'
let myAmapFun = null
let currentPositionButton = null

export default {
  data() {
    return {
      latitude: '',
      longitude: '',
      initLatitude: '',
      initLongitude: '',
      addressSearchResult: [],
      showCurrentAddress: true,
      selectAddressIndex: 0,
      returnName: 'customChooseLocation',
      currentAddress: {
        name: '',
        longitude: '',
        latitude: '',
        p: '',
        c: '',
        a: ''
      }
    }
  },

  onLoad(options) {
    if(options && options.returnname) this.returnName = options.returnname
    console.log(AMAP_KEY)
    let self = this
    let pages = getCurrentPages()
    let page = pages[pages.length - 1]
    let currentWebview = page.$getAppWebview()
    maps = plus.maps
    geolocation = plus.geolocation
    myAmapFun = new amapFile.AMapWX({ key: AMAP_KEY })

    uni.getLocation({
      type: 'gcj02',
      success: res => {
        if(options.latitude){
          this.latitude = options.latitude
          this.longitude = options.longitude
        }else{
          this.latitude = res.latitude
          this.longitude = res.longitude
        }
        this.initLatitude = res.latitude
        this.initLongitude = res.longitude
        let point = new maps.Point(this.longitude, this.latitude) //创建地图初始中心点

        map = new maps.Map('map', {
          center: point,
          zoom: mapZoom,
          top: 0,
          left: 0,
          width: '100%',
          height: '260px',
          position: 'static'
        });

        map.onclick = function(options) {
          self.showCurrentAddress = true
          self.longitude = options.longitude
          self.latitude = options.latitude
          self.getCurrentAddress(`${options.longitude},${options.latitude}`)
          map.removeOverlay(marker)
          marker = new plus.maps.Marker(new maps.Point(self.longitude, self.latitude))
          marker.setIcon(markerIcon)
          map.addOverlay(marker)
          map.centerAndZoom(new plus.maps.Point(self.longitude, self.latitude), mapZoom)
        };

        // map.showZoomControls(true)
        currentWebview.append(map)
        marker = new plus.maps.Marker(point)
        marker.setIcon(markerIcon)
        map.addOverlay(marker)

        this.createCurrentPositionButton()

        this.getCurrentAddress(`${this.longitude},${this.latitude}`)
      }
    })

  },

  onUnload() {
    this.destroyCurrentPositionButton()
  },

  onNavigationBarSearchInputConfirmed(e) {
    // #ifdef APP-PLUS
    this.$mp.page.$getAppWebview().setTitleNViewSearchInputFocus(false)
    // #endif
  },

  onNavigationBarSearchInputChanged(e) {
    if (e.text && e.text.trim() != '') {
      this.selectAddressIndex = -1
      this.showCurrentAddress = false
      this.getInputTips(e.text.trim())
    }
  },

  // 操作搜索按钮
  onNavigationBarButtonTap(){
    // #ifdef APP-PLUS
    this.$mp.page.$getAppWebview().setTitleNViewSearchInputFocus(false)
    // #endif
  },

  methods: {

    destroyCurrentPositionButton() {
      if (currentPositionButton !== null) {
        currentPositionButton.close();
        currentPositionButton = null
        return true;
      }
      return false;
    },

    createCurrentPositionButton() {
      let self = this;
      let device_info = uni.getSystemInfoSync();
      console.log(currentPositionButton)
      if (currentPositionButton === null) {
        currentPositionButton = new plus.nativeObj.View('currentPosition', {
          width: 40 + 'px',
          height: 40 + 'px',
          left: 20 + 'px',
          top: 200 + (device_info.screenHeight - device_info.windowHeight) + 'px'
        }, [{
          tag: 'img',
          id: 'img',
          src: '/static/choose_address_current_address.png',
          position: {
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            right: 0,
            bottom: 0,
            margin: 'auto'
          }
        }]);
        currentPositionButton.show();
        currentPositionButton.addEventListener('click', function() {
          self.showCurrentAddress = true
          self.longitude = self.initLongitude
          self.latitude = self.initLatitude
          self.getCurrentAddress(`${self.initLongitude},${self.initLatitude}`)
          map.removeOverlay(marker)
          marker = new plus.maps.Marker(new maps.Point(self.longitude, self.latitude))
          marker.setIcon(markerIcon)
          map.addOverlay(marker)
          map.centerAndZoom(new plus.maps.Point(self.longitude, self.latitude), mapZoom)
        })
      } else {
        currentPositionButton.show();
      }
    },

    handleChooseAddressListItem(index) {
      this.selectAddressIndex = index
      let longitude = ''
      let latitude = ''
      if (index == 0) {
        longitude = this.currentAddress.longitude
        latitude = this.currentAddress.latitude
      } else {
        longitude = this.addressSearchResult[index - 1].location.split(',')[0]
        latitude = this.addressSearchResult[index - 1].location.split(',')[1]
      }
      map.removeOverlay(marker)
      marker = new plus.maps.Marker(new maps.Point(longitude, latitude))
      marker.setIcon(markerIcon)
      map.addOverlay(marker)
      map.centerAndZoom(new plus.maps.Point(longitude, latitude), mapZoom)
    },

    getCurrentAddress(location) {
      myAmapFun.getRegeo({
        location: location,
        success: data => {
          // console.log(111111);
          // console.log(JSON.stringify(data))
          let address = {}
          address.areap = data[0].regeocodeData.addressComponent.province
          address.areac = typeof data[0].regeocodeData.addressComponent.city == 'string' ? data[0].regeocodeData.addressComponent.city : address.areap
          address.areax = data[0].regeocodeData.addressComponent.district
          this.getInputTips(data[0].desc || data[0].name || '', data[0].latitude ? `${data[0].longitude},${data[0].latitude}` : '')
          console.log(data[0])
          this.currentAddress.name = (data[0].name || '') + (data[0].desc || '')
          this.currentAddress.longitude = data[0].longitude
          this.currentAddress.latitude = data[0].latitude
          this.currentAddress.p = data[0].addressComponent ? (data[0].addressComponent.province)  : ''
          this.currentAddress.a = data[0].addressComponent ? (data[0].addressComponent.district)  : ''
          this.currentAddress.c = data[0].addressComponent ? (data[0].addressComponent.city)  : ''
          this.selectAddressIndex = 0
        },
        fail: function(info) {
          console.log(info)
        }
      })
    },

    getInputTips(keywords, location = '') {
      console.log(keywords)
      myAmapFun.getInputtips({
        keywords: keywords,
        location: location,
        success: data => {
          this.addressSearchResult = data && data.tips ? data.tips.filter(item => typeof item.location === 'string') : []
          // console.log(JSON.stringify(this.addressSearchResult))
        }
      })
    },

    handleConfirmChooseAddress(){
      let { currentAddress, addressSearchResult, selectAddressIndex, showCurrentAddress } = this
      console.log(currentAddress, addressSearchResult)
      if(selectAddressIndex == 0){
        uni.showLoading('选择中...')
        myAmapFun.getRegeo({
          location: `${currentAddress.longitude},${currentAddress.latitude}`,
          success: data => {
            uni.hideLoading();
            let address = {}
            address.areap = data[0].regeocodeData.addressComponent.province
            address.areac = typeof data[0].regeocodeData.addressComponent.city == 'string' ? data[0].regeocodeData.addressComponent.city : address.areap
            address.areax = data[0].regeocodeData.addressComponent.district
            uni.$emit('chooseLocation', {
              name: currentAddress.name,
              address: currentAddress.name,
              latitude: currentAddress.latitude,
              longitude: currentAddress.longitude,
              citys: address,
              district: `${currentAddress.p}${currentAddress.c}${currentAddress.a}`
            })
            uni.navigateBack();
          },
          fail: function(info) {
            uni.hideLoading();
            uni.$emit('chooseLocation', {
              name: currentAddress.name,
              address: currentAddress.name,
              latitude: currentAddress.latitude,
              longitude: currentAddress.longitude,
              district: `${currentAddress.p}${currentAddress.c}${currentAddress.a}`
            })
            uni.navigateBack();
            console.log(info)
          }
        })

      }else if(selectAddressIndex > 0){
        uni.showLoading('选择中...')
        myAmapFun.getRegeo({
          location: `${addressSearchResult[selectAddressIndex - 1].location}`,
          success: data => {
            uni.hideLoading();
            let address = {}
            address.areap = data[0].regeocodeData.addressComponent.province
            address.areac = typeof data[0].regeocodeData.addressComponent.city == 'string' ? data[0].regeocodeData.addressComponent.city : address.areap
            address.areax = data[0].regeocodeData.addressComponent.district
            uni.$emit('chooseLocation', {
              name: (addressSearchResult[selectAddressIndex - 1].district || '') + (addressSearchResult[selectAddressIndex - 1].address ? addressSearchResult[selectAddressIndex - 1].address : (addressSearchResult[selectAddressIndex - 1].name || '')),
              address: addressSearchResult[selectAddressIndex - 1].name,
              latitude: addressSearchResult[selectAddressIndex - 1].location.split(',')[1],
              longitude: addressSearchResult[selectAddressIndex - 1].location.split(',')[0],
              citys: address,
              district: addressSearchResult[selectAddressIndex - 1].district
            })
            uni.navigateBack();
          },
          fail: function(info) {
            uni.hideLoading();
            uni.$emit('chooseLocation', {
              name: (addressSearchResult[selectAddressIndex - 1].district || '') + (addressSearchResult[selectAddressIndex - 1].address ? addressSearchResult[selectAddressIndex - 1].address : (addressSearchResult[selectAddressIndex - 1].name || '')),
              address: addressSearchResult[selectAddressIndex - 1].name,
              latitude: addressSearchResult[selectAddressIndex - 1].location.split(',')[1],
              longitude: addressSearchResult[selectAddressIndex - 1].location.split(',')[0],
              district: addressSearchResult[selectAddressIndex - 1].district
            })
            uni.navigateBack();
          }
        })
      }else{
        plus.nativeUI.toast('请先选择地址');
      }
    }
  }
}

</script>

<style lang="scss">
@import './index.scss';
</style>
