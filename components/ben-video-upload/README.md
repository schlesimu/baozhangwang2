## 使用方法

```html
<ben-upload :col="4" :max="9" :defaultList="images" @change="chooseImages">
	<!-- <text class="cuIcon-upload"></text> -->
</ben-upload>
```
```js
import benUpload from '@/components/ben-upload/ben-upload.vue';

export default {
	components: {
		benUpload,
	},
	data(){
		return {
			images: [{
				aid:'12',
				url:'abc.png'
			}], // 上传图片后端返回地址列表
		}
	},
	methods: {
		// 上传成功回调
		chooseImages(val){
			this.images = val;
		}
	}
}
```

## 参数说明
- 依赖 zb_frame 框架,如需单独使用,请自行修改样式及定义上传地址
- col 一行显示几张图片
- max 最大上传张数
- defaultList 默认图片列表
--	defaultList:[{
		aid:'1',
		url:'http://www.abc.com/aaa.png'
	}]
- @change 全部上传成功的回调 返回服务器地址数组
- 支持自定义上传图标

