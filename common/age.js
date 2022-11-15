let age = [16,60];	//年龄区间
var children=[]
let age2_list = setAge(age);	//年龄列表
function setAge(data){
	var arr = [],item = [];
	for(var i=data[0];i<=data[1];i++){
		item.push(i)
	}
	arr.push(item)
	arr.push(item)
	return arr
}
export {
	age,
	age2_list
}