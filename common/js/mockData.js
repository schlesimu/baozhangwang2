// 模拟相关数据

// 经验要求
let experience = [
	{
		label:'不限经验',	
		value:0
	},
	{
		label:'无经验要求',
		value:1
	},
	{
		label:'一年以下经验',
		value:2
	},
	{
		label:'1-3年经验',
		value:3
	},
	{
		label:'3-5年经验',
		value:4
	},
	{
		label:'5-10年经验',
		value:5
	},
	{
		label:'10年以上经验',
		value:6
	}
]
// 经验要求
let experience1 = [
	{
		label:'全部',
		id:0
	},
	{
		label:'无经验',
		id:1
	},
	{
		label:'一年以下经验',
		id:2
	},
	{
		label:'1-3年经验',
		id:3
	},
	{
		label:'3-5年经验',
		id:4
	},
	{
		label:'5-10年经验',
		id:5
	},
	{
		label:'10年以上经验',
		id:6
	}
]
// 企业直聘筛选经验
let experience2 = [
	{
		label:'全部',	
		value:0
	},
	{
		label:'不限经验',	
		value:1
	},
	{
		label:'无经验要求',
		value:2
	},
	{
		label:'一年以下经验',
		value:3
	},
	{
		label:'1-3年经验',
		value:4
	},
	{
		label:'3-5年经验',
		value:5
	},
	{
		label:'5-10年经验',
		value:6
	},
	{
		label:'10年以上经验',
		value:7
	}
]

// 企业规模
let scale_list = [
	{
		label: "微型(小于10人)",
		value:0
	},
	{
		label: "小型(10~100人)",
		value:1
	},
	{
		label: "中型(100~300人)",
		value:2
	},
	{
		label: "大型(大于300人)",
		value:3
	}
]

let age = [16,60];	//年龄区间
let age_list = setAge(age);	//年龄列表

let ageLimit = setAge([1,10]);	//工作年限
ageLimit.unshift({
	label: '一年以下',
	value: '一年以下'
})
ageLimit.push({
	label: '10年以上',
	value: '10年以上'
})

function setAge(data){
	var arr = [];
	for(var i=data[0];i<=data[1];i++){
		var obj = {
			label: i,
			value: i,
			children:[]
		}
		for(var j=i;j<=data[1];j++){
			obj.children.push({
				label: j,
				value: j,
			})
		}
		arr.push(obj)
	}
	return arr
}



export {
	experience,
	experience1,
	experience2,
	scale_list,
	age,
	age_list,
	ageLimit
}