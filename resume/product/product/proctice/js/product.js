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
//云朵延时出现
var pCloud = getId('product_cloud');
var section = getTagName('section')[0];
function pMove(){
	mTween(pCloud,'top',0,1000,'linear');
}
//当点击品牌介绍时，调用函数
var product = getId('product');
product.onclick = function(){
	
	section.style.top = -2*height+'px';
	
	mTween(pCloud,'top',0,1000,'linear');
}
//点击选项卡时，切换到对应内容
var tab = getId('product_page');
var tab_title = getClass('tab_title',tab)[0];
var options = getTagName('div',tab_title);
var ooimg = getTagName('img',tab_title);
var options_info = getTagName('ul',tab);

//当鼠标移入选项卡时
for(var i=0;i<options.length;i++){
	options[i].index = i;
	options[i].onmouseover = immigration;
	options[i].onclick = click;
	options[i].onmouseout = out;
	//移入函数
	function immigration(){
		this.oimgs= getTagName('img',this)[0];
		mTween(this,'top',0,200,'linear');
		//隐藏的图片显示
		mTween(this.oimgs,'bottom',0,200,'linear');
	}
	//移出函数
	function out(){
		this.oimgs= getTagName('img',this)[0];
		mTween(this,'top',7,200,'linear');
		mTween(this.oimgs,'bottom',-35,200,'linear');
	}
	
	//点击函数
	function click(){
		//点击开始，清除 所有的样式，让图片回到原来的位置
		for(var i=0;i<options.length;i++){
			options_info[i].className = '';
			mTween(options[i],'top',7,200,'linear');
			mTween(ooimg[i],'bottom',-35,200,'linear');
			//让所有的div移出时执行移出函数
			options[i].onmouseout = out;

		}
		//切换到对应的内容
		options_info[this.index].className = 'show';
		//一旦发生点击事件，该选项的鼠标移开事件被立即注销
		this.onmouseout = null;
		mTween(this,'top',0,200,'linear');
		//隐藏的图片显示
		mTween(this.oimgs,'bottom',0,200,'linear');
	}
}
//云朵上的小图片随机出现
var product_cloud = getId('product_cloud');
// console.log(product_cloud);
var cloud_divs = getTagName('div',product_cloud);
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
//点击li时，显示衣服详细信息
var close_infos = getId('close_infos');
var closeLis = getTagName('li',close_infos);
var details = getId('details');
var cancle = getId('cancle');
//点击li时，显示对应信息
for(let i=0;i<closeLis.length;i++){
	closeLis[i].onclick = function(){
		details.style.display = 'block';
		clo_details(i);
	}
}
//点击cancle时，图片介绍消失
cancle.onclick = function(){
	details.style.display = 'none';
}
//点击li时，显示对应的图片信息及链接
function clo_details(i){
	$('.big_close img')[0].src = data.details[i].img;
	$('.first_pic').css({
		background:'url('+data.details[i].img+')',
		backgroundPosition:'center'
	});
	$('.second_pic').css({
		background:'url('+data.details[i].img+')',
		backgroundSize:'280%',
		backgroundPosition:'50% -20px'
	});
	$('.third_pic').css({
		background:'url('+data.details[i].img+')',
		backgroundSize:'326%',
		backgroundPosition:'-95px -160px'
	});
	$('.close_in span')[0].innerHTML = data.details[i].name;
	$('.close_in em')[0].innerHTML = data.details[i].id;
	$('.close_in strong')[0].innerHTML = data.details[i].price;
	$('.close_in p')[0].innerHTML = data.details[i].info;
	$('.close_in a')[0].href = data.details[i].link;

}
//初始化衣服数据
var clothes = getTagName('strong',close_infos);
var clothes_price = getTagName('em',close_infos);
for(var i=0;i<clothes.length;i++){
	clothes[i].innerHTML = data.details[i].name;
	clothes_price[i].innerHTML = data.details[i].price;
}