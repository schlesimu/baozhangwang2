# lxm-scrollable-tabs是一个全平台前端页面模板，一般用来做电商首页页面模板，也可以做其他页面模板。全平台前端页面模板：可滑动选项卡左插槽+透明自定义导航栏融合轮播图+走马灯滚动字幕公告+横滚列表+过年喜庆图片
> **组件名：lxm-scrollable-tabs**

### 说明
基于UviewUI2.0工具和技术，支持nvue文件。
tabs 标签 
该组件，是一个tabs标签组件，在标签多的时候，可以配置为左右滑动，标签少的时候，可以禁止滑动。 该组件的一个特点是配置为滚动模式时，激活的tab会自动移动到组件的中间位置。

#平台差异说明
App（vue）	App（nvue）	H5	小程序
√	             √	    √	 √
说明

```
粘性布局
通过加上u-sticky来使tabs滑动浮动在最顶部。

<template>
  <u-sticky bgColor="#fff">
    <u-tabs :list="list1"></u-tabs>
  </u-sticky>
</template>

<script>
    export default {
        data() {
            return {
                list1: [{
                    name: '关注',
                }, {
                    name: '推荐',
                }, {
                    name: '电影'
                }, {
                    name: '科技'
                }, {
                    name: '音乐'
                }, {
                    name: '美食'
                }, {
                    name: '文化'
                }, {
                    name: '财经'
                }, {
                    name: '手工'
                }]
            }
        }
    }
</script>
#显示徽标
可以通过在列表对象中加入badge来设置徽标。

<template>
    <u-tabs :list="list2"></u-tabs>
</template>

<script>
    export default {
        data() {
            return {
                list2: [{
                    name: '关注'
                }, {
                    name: '推荐',
                    badge: {
                        isDot: true
                    }
                }, {
                    name: '电影',
                    badge: {
                        value: 5,
                    }
                }, {
                    name: '科技'
                }, {
                    name: '音乐'
                }, {
                    name: '美食'
                }, {
                    name: '文化'
                }, {
                    name: '财经'
                }, {
                    name: '手工'
                }]
            }
        }
    }
</script>
#自定义样式
通过使用activeStyle、inactiveStyle、itemStyle来设置tabs的样式。

<template>
    <u-tabs
            :list="list4"
            lineWidth="30"
            lineColor="#f56c6c"
            :activeStyle="{
						color: '#303133',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}"
            :inactiveStyle="{
						color: '#606266',
						transform: 'scale(1)'
					}"
            itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
    >
    </u-tabs>
</template>

<script>
    export default {
        data() {
            return {
                list4: [{
                    name: '关注'
                }, {
                    name: '推荐',
                    badge: {
                        isDot: true
                    }
                }, {
                    name: '电影',
                }, {
                    name: '科技'
                }, {
                    name: '音乐'
                }, {
                    name: '美食'
                }, {
                    name: '文化'
                }, {
                    name: '财经'
                }, {
                    name: '手工'
                }],
            }
        }
    }
</script>
#右侧自定义插槽
<template>
    <u-tabs :list="list1">
        <view
                slot="right"
                style="padding-left: 4px;"
                @tap="$u.toast('插槽被点击')"
        >
            <u-icon
                    name="list"
                    size="21"
                    bold
            ></u-icon>
        </view>
    </u-tabs>
</template>

<script>
    export default {
        data() {
            return {
                list1: [{
                    name: '关注',
                }, {
                    name: '推荐',
                }, {
                    name: '电影'
                }, {
                    name: '科技'
                }, {
                    name: '音乐'
                }, {
                    name: '美食'
                }, {
                    name: '文化'
                }, {
                    name: '财经'
                }, {
                    name: '手工'
                }]
            }
        }
    }
</script>
```
API
#Props
参数	说明	类型	默认值	可选值
duration	滑块移动一次所需的时间，单位ms	String | Number	300	-
list	标签数组，元素为对象，如[{name: '推荐'}]	Array	-	-
lineColor	滑块颜色	String	#3c9cff	-
activeStyle	菜单选择中时的样式	String | Object	{ color: '#303133' }	-
inactiveStyle	菜单非选中时的样式	String | Object	{ color: '#606266' }	-
lineWidth	滑块长度	String | Number	20	-
lineHeight	滑块高度	String | Number	3	-
itemStyle	菜单item的样式	String | Object	{ height: '44px' }	-
scrollable	菜单是否可滚动	Boolean	true	false
current	当前选中标签的索引	String | Number	0	-
keyName	从list元素对象中读取的键名	String	name	-
#Events
事件名	说明	回调参数	版本
click	点击标签时触发	index: 标签索引值，item: 传入的其他值	-
change	标签索引改变时触发(disalbed时不会触发)	index: 标签索引值，item: 传入的其他值	-

传奇开心果模板，名称：lxm-scrollable-tabsV1.0.0,传奇开心果出品，2022.1.17