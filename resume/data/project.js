
/*		项目池
	*   {
	*       projectName: @value String            *         项目名称
	*       projectWebsite: @value String         *         项目网址
	*       startTime: @value String              *         项目开始时间  格式为：2016.10.09
	*       endTime: @value String 			      *         项目结束时间  格式为：2016.10.09
	*       projectExplain: @value String         *         项目说明
	*       projectLabel: @value Array            *         项目技术标签 
			projectThumbnail: @value String       *         缩略图地址
	*       
	*   }
*/

var projects = [
		{
			projectName:"动画制作“Moomoo”儿童服装网站",
			projectWebsite:"product/product/proctice/index.html",
		    startTime:"2016.09.15",
			endTime:"2016.09.30",
			projectExplain:"JS整站开发之：“Moomoo”儿童服装网站。运用HTML+CSS编写静态页面布局。运用canvas实现线条绘制，同时可以改变画笔颜色，保存下载绘制的线条图画。页面加载成功会自动播放背景音乐。导航点击可以随意整屏切换页面，运用定时器管理，运动函数，回掉函数，函数传参及jQuery原理实现一些页面动态效果。分页中运用选项卡等实现数据展示，JQ、CSS3等的运用实现创意交互效果。",
			projectLabel:["html","css3","css","js","jQuery"],
			projectThumbnail:"images/icon/2.jpg"
		},
		{
			projectName:"仿国美官方首页",
			projectWebsite:"product/product/guomei-pc/index.html",
		    startTime:"2016.04.15",
			endTime:"2016.04.25",
			projectExplain:"HTML+CSS整站开发之：仿国美官方网站。运用HTML+CSS编写页面结构，使用padding、margin盒模型原理及浮动、定位等方法实现布局。css3中的animation动画属性的运用来实现轮播图效果。为了优化性能，结合使用雪碧图和元素背景图片定位。",
			projectLabel:["html","css","css3"],
			projectThumbnail:"images/icon/guomei_index.png"
		},
		{
			projectName:"仿国美官方首页（移动端）",
			projectWebsite:"product/product/guomei-moble/index.html",
		    startTime:"2016.04.15",
			endTime:"2016.04.25",
			projectExplain:"HTML+CSS整站开发之：仿国美官方首页（移动端）。将当前view port的宽度设置为设备的宽度，将宽度设为100%，单位不设置固定像素而使用rem。常用标签与HTML5新增标签进行搭结构，css样式margin、浮动等进行布局",
			projectLabel:["html","css","css3"],
			projectThumbnail:"images/icon/45.jpg"
		},
		{
			projectName:"jq响应式页面",
			projectWebsite:"product/product/jq/index.html",
		    startTime:"2016.04.27",
			endTime:"2016.04.30",
			projectExplain:"jquery响应式页面布局。运用外链样式表引入页面在不同窗口大小时的样式已达到响应式页面效果。此外，元素宽度百分比，元素高度不设置而由内容部分撑开等思想的运用，再加上常用标签、HTML5新增标签的熟练应用让页面更好的呈现出来。",
			projectLabel:["html","css3","css","js"],
			projectThumbnail:"images/icon/jq.png"
		}
		
]