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
/*点击切换语言种类*/
var change_lan = getId('change_lan');
var brand_show = getId('brand_show');
var brand_imgs = getTagName('img',brand_show);
var change_imgs = getTagName('img',change_lan);
var onOff = true;

change_lan.onclick = function(){
	if(onOff){
		brand_imgs[0].style.display = 'none';
		brand_imgs[1].style.display = 'block';
		change_imgs[0].style.display = 'none';
		change_imgs[1].style.display = 'block';
	}else{
		brand_imgs[0].style.display = 'block';
		brand_imgs[1].style.display = 'none';
		change_imgs[0].style.display = 'block';
		change_imgs[1].style.display = 'none';
	}
	onOff = !onOff;
	
}
//云朵延时出现
var cloud = getId('brand_cloud');
var section = getTagName('section')[0];
function move(){
	mTween(cloud,'top',0,1000,'linear');
}
//当点击品牌介绍时，调用函数
var about = getId('about');
about.onclick = function(){
	section.style.top = -height+'px';
	move();
}
//云朵上的小图片随机出现
var cloud_divs = getTagName('div',cloud);
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

