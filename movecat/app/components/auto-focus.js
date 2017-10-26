(function(angular){
	//定义指令
	angular.module('moviecat.directives.auto_focus',[])
	.directive('autoFocus',['$location',function($location){//定义指令的时候要用驼峰命名法
		//先获取一下当前的path是什么   /in_theaters/1
		//var path = $location.path();
		return {
			restrict:'A',//属性类型
			//所有的dom操作都可以集中在link函数里面
			link:function($scope,iElm,iAttrs,controller){
				//console.log(iElm);
				//console.log(iAttrs);
				$scope.$location = $location;
				$scope.$watch('$location.path()',function(now){
					//当path 路径 发生变化时执行，now是变化后的值
					var aLink = iElm.children().attr('href');
					//console.log(aLink);
					//提取alink的中间那段
					var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');//in_theaters用.来表示，因为.可以替换下划线，$1提取第一组成员
					//console.log(type);   /in_theaters
					if(now.startsWith(type)){//如果path和alink的中间段一样，就给当前link加上active
						//说明访问的是当前链接
						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
						
					}
				})
				
				/*iElm.on('click',function(){
					iElm.parent().children().removeClass('active');
					iElm.addClass('active');
				})*/
			}
		}
	}])
})(angular);
