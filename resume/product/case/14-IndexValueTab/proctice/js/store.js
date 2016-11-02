//封装获取函数
function getId(id){
	return document.getElementById(id);
}
function getTagName(tagName,context){
	return (context||document).getElementsByTagName(tagName);
}
//封装获取class函数
function getClass(className,context){
	var nodes = (context || document.body).getElementsByTagName('*');
	var re = new RegExp('\\b' + className +'\\b');
	var eles = [];
	for(var i=0;i<nodes.length;i++){
		if(re.test(nodes[i].className)){
			eles.push(nodes[i]);
		}
	}
	return eles;
}
//点击选项卡时，切换到对应内容
var Store = getId('Store_infor');
var store_tabs = getId('store_tabs');
var store_head = getId('store_head');
var store_opts = getTagName('span',store_head);
var store_infos = getTagName('div',store_tabs);

for(var i=0;i<store_opts.length;i++){
	store_opts[i].index = i;
	store_opts[i].onclick = function(){
		for(var i=0;i<store_opts.length;i++){
			store_opts[i].className = '';
			store_infos[i].className = '';
		}
		this.className = 'active';
		store_infos[this.index].className = 'show';
	}
}
//点击不同字母，显示相应的店铺地址
var store_add = getId('store_add');
var store_intro = getId('store_intro');
var store_letter = getTagName('img',store_add);
var store_lis = getTagName('li',store_add);
var store_imgs = getTagName('img',store_intro);

//点击切换不同的城市店铺地址
for(var i=0;i<store_letter.length;i++){
	store_letter[i].cur = i;
	store_letter[i].onclick = function(){
		for(var i=0;i<store_letter.length;i++){
			store_letter[i].className = '';
			store_imgs[i].className = '';
		}
		store_imgs[this.cur].className = 'show_img';
	}
	
}
//云朵延时运动
var store = getId('store');
var store_cloud = getId('store_cloud');
store.onclick = function(){
	
	section.style.top = -3*height+'px';
	
	mTween(store_cloud,'top',0,1000,'linear');
}
//云朵上的小图片随机出现
var store_cloud = getId('store_cloud');
var cloud_divs = getTagName('div',store_cloud);
var is;
//定义图片的随机移动距离初始为5px
var cloud_height = 5;

for(var i=0;i<cloud_divs.length;i++){
	//获取所有div下所有可以随机移动的图片
	is = getClass('cloud_move',cloud_divs[i]);
	//循环遍历所有的图片，调用函数fn
	for(var j=0;j<is.length;j++){
		fn(is[j],0);
	}
	
}
//封装函数
function fn(obj,h){
	//开启定时器
	setInterval(function(){
		mTween(obj,'top',10,300,'linear',function(){
			mTween(obj,'top',h,300,'linear')
		})
	},Math.random()*2000+1000)
}