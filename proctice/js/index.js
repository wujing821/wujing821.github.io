//封装获取函数
function getId(id){
	return document.getElementById(id);
}
function getTagName(tagName,context){
	return (context||document).getElementsByTagName(tagName);
}

//自动播放的背景图
var content = getId('content');
var box = getId('box');
//获取屏幕的尺寸
var width = window.innerWidth;
var height = window.innerHeight;

content.style.height = height + 'px';
content.style.width = width + 'px';
var imgs = getTagName('img',content);
var timer = null;
var num = 0;
//开启定时器
	timer = setInterval(function(){
		num++;
		//当num小于图片总数
		if(num<imgs.length-1){
			mTween(box,'top',-num*height,1000,'linear');
		}else{//当num超过图片总数时，把最后一张插到第一张的前面，同时把box
			//的高度变成0，num归零
			mTween(box,'top',-num*height,1000,'linear',function(){
				box.insertBefore(imgs[imgs.length-1],imgs[0]);
				box.style.top = '0px';
				num=0;
			})
		}

	},5000);
	
/*nav*/
var main = getId('main');
var about = getId('about');
var product = getId('product');
var store = getId('store');

imgmove(about);
imgmove(product);
imgmove(store);

function imgmove(obj){
	var img1 =  getTagName('img',obj)[0];
	var img2 =  getTagName('img',obj)[1];
	img1.onmouseover = function(){
		mTween(img2,'top',-30,200,'linear',function(){
			mTween(img2,'top',-25,100,'linear')
		})
	}
	img1.onmouseout = function(){
		setTimeout(function(){
			mTween(img2,'top',-1,200,'linear');
		},1000)
	}
}

//可拖拽的nav导航
var nav = document.getElementById('nav');
var Drag = function(options){
	this.ele = options.dragEle;
	this.dragDown();
}
Drag.prototype = {
	constructor:Drag,
	dragDown:function(){
		var self = this;
		this.ele.onmousedown = function(ev){
			self.disx = ev.clientX - self.ele.offsetLeft;
			self.disY = ev.clientY - self.ele.offsetTop;
			self.dragMove();
			self.dragUp();
			return false;
		}
	},
	dragMove:function(){
		var self = this;
		document.onmousemove = function(ev){
			self.x = ev.clientX - self.disx;
			self.y = ev.clientY - self.disY;
			self.ele.style.left = self.x + 'px';
			self.ele.style.top = self.y + 'px';
		}
	},
	dragUp:function(){
		document.onmouseup = function(){
			this.onmousemove = this.onmouseup = null;
		}

	}
}
var n = new Drag({
	dragEle:nav
});
/*music播放器*/
var music = getId('music');
var music_s = getTagName('span',music)[0];
var music_img = getTagName('img',music)[0];
var audio = getId('audio');
music.onclick  = function(){
	if(this.onOff){
		music_s.innerHTML = 'SOUND ON';
		music_img.src =  'img/footer/3.jpg';
		audio.play();
	}else{
		music_s.innerHTML = 'SOUND OFF';
		music_img.src =  'img/footer/2.jpg';
		audio.pause();
	}
	this.onOff = !this.onOff;
}
/*tools*/
var tools = getId('tools');
var t_spans = getTagName('span',tools);
var pen_is = getTagName('i',tools);
//获取画笔色板相关元素
var col = getId('col');
var pen_col = getTagName('img',col);
var pen_em = getTagName('em',col);
var pen_timer;
//移动到col时，显示颜色板
pen_col[0].onmouseover = show;
pen_col[0].onmouseout = hide;
pen_em[0].onmouseover = show;
pen_em[0].onmouseout = hide;
//让色板显示时，先关掉关闭用的延时定时器，再显示
function show(){
	clearInterval(pen_timer);
	pen_em[0].style.display = 'block';
}
//隐藏色板时开一个延时定时器
function hide(){
	pen_timer = setInterval(function(){
		pen_em[0].style.display = 'none';
	},500)
}
//当移入相应按钮时，让对应的详细介绍显示出来
appear(t_spans[1],pen_is[0]);
appear(t_spans[2],pen_is[1]);
appear(t_spans[3],pen_is[2]);
appear(t_spans[4],pen_is[3]);

function appear(obj1,obj2){
	obj1.onmouseover = function(){
		obj2.style.display = 'block';
	};
	obj1.onmouseout = function(){
		setTimeout(function(){
			obj2.style.display = 'none';
		},2000)
	};
}

//绘图
var painting = getId('painting');
var colors = getId('col');
var clear = getId('clear');
var canvas = getId('myCanvas');
var context = canvas.getContext('2d');
//画笔初始为黑色
var color = '#fff';
var can_onOff;
canvas.style.width = width + 'px';
canvas.style.height = 600 + 'px';
painting.onclick = function(){
	//清除背景图自动播放
	clearInterval(timer);
	//当开关为true时，执行画笔操作
	can_onOff = true;
	//鼠标样式改变
};
clear.onclick = function(){
	//当开关为false时，执行擦除操作
	can_onOff = false;
}
//当鼠标按下时
canvas.onmousedown = function(ev){
	if(can_onOff){
		pen(ev);
	}else{
		ca();
	}
}
//给每一个色板颜色添加自定义属性
var pen_colors = getTagName('strong',col);
var pen_col;
//将色板颜色存成一个数组
var col_arr = ['red','yellow','blue','green','pink','white'];
//给色板的每个颜色加一个点击事件
for(var i=0;i<pen_colors.length;i++){
	pen_colors[i].index = i;
	pen_colors[i].onclick = function(){
		color = col_arr[this.index];
	}
}
//绘图函数
function pen(ev){
	context.beginPath();
	//将色板颜色赋予画笔颜色
	context.strokeStyle = color;

	context.moveTo(ev.clientX,ev.clientY);
	canvas.onmousemove = function(ev){
		context.lineTo(ev.clientX,ev.clientY);
		//改变画笔样式
		$('#myCanvas').css('cursor', 'url(img/cur/9.cur) 3 32, pointer');
		context.stroke();

	};
	canvas.onmouseup = function(){
		this.onmousemove = this.onmouseup = null;
	}
}
//阻止浏览器默认行为
document.onmousemove = function(){
	return false;
}

//橡皮擦功能
function ca(){
	canvas.onmousemove = function(ev){
		context.clearRect(ev.clientX,ev.clientY,10,10);
		//改变橡皮擦的鼠标样式
		$('#myCanvas').css('cursor', 'url(img/cur/5.cur) 3 32, pointer');
	};
	canvas.onmouseup = function(ev){
		this.onmousemove = this.onmouseup = null;
	};

}
//清空画布
var paint_agin = getId('painting_angin');
paint_agin.onclick = function(){
	context.clearRect(0,0,width,600);
};
//保存图画功能
t_spans[2].onclick = function(){
	var src = canvas.toDataURL('image/png');

	downloadFile('1.png', src);
};

function base64Img2Blob(code){
    var parts = code.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType}); 
}
function downloadFile(fileName, content){
   //创建a标签
    var aLink = document.createElement('a');
    //二进制对象
    var blob = base64Img2Blob(content); //new Blob([content]);
  //创建事件
    var evt = document.createEvent("HTMLEvents");
    //初始化事件
    evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
    //a标签的下载属性
    aLink.download = fileName;
    //给a标签添加数据
    aLink.href = URL.createObjectURL(blob);
		//执行事件
    aLink.dispatchEvent(evt);
} 

/*整屏点击切换*/
var section = getTagName('section')[0];
var home_page = getId('home_page');
var brand_intro = getId('brand_intro');
var product_page = getId('product_page');
var Store_infor = getId('Store_infor');
var vip_page = getId('vip_page');
var list = getId('list');
var lis = getTagName('li',list);
// console.log(lis)
//设置body的宽高和屏幕宽高相等
document.body.style.height = height + 'px';
document.body.style.width = width + 'px';
// 第二页
brand_intro.style.top = height + 'px';
//第三页
product_page.style.top = 2*height + 'px';
//第四页
Store_infor.style.top = 3*height + 'px';
//第五页
vip_page.style.top = 4*height + 'px';
//点击屏幕切换
for(var i=0;i<lis.length;i++){
	lis[i].index = i;
	lis[i].onclick = function(){
		mTween(cloud,'top',220,1000,'linear');
		mTween(pCloud,'top',220,1000,'linear');
		mTween(store_cloud,'top',220,1000,'linear');
		section.style.top = -this.index*height+'px';
		mTween(cloud,'top',220,1000,'linear');
		mTween(pCloud,'top',220,1000,'linear');
		mTween(store_cloud,'top',220,1000,'linear');
	}
}









