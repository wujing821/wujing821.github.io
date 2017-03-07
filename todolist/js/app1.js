(function(angular){
	//为应用程序创建一个模块，用来管理界面的结构
	var myApp = angular.module('myApp',[]);
	//注册一个主要的控制器（所注册的控制器肯定要属于某个模块的），用于往视图view暴露数据
	myApp.controller('myController',['$scope','$location',function($scope,$location){
		//递归函数，用于获取不重复的id
		function getId(){
			var id = Math.random();
			for(var i=0;i<$scope.data.length;i++){
				if($scope.data[i].id === id){//递归一定要找到突破口，跳出循环的条件
					id = getId();
					break;
				}
			}
			return id;
		};
		//初始化数据
		//文本框需要一个模型text，为了能拿到文本框输入的值，因为建立了双向数据绑定关系
		$scope.text = '';//初始化是控制
		//列表也需要一个模型data
		//每一个任务的结构{id:1,text:'学习'，completed：true}
		$scope.data = [
			{
				id:1,
				text:'吃饭',
				completed:true
			},
			{
				id:2,
				text:'睡觉',
				completed:true
			},
			{
				id:3,
				text:'打豆豆',
				completed:false
			}
		];
		//添加操作
		$scope.add = function(){
			//如果没有输入的内容，那么将阻止代码运行
			if(!$scope.text) return;
			$scope.data.push({
				//id:Math.random(),//为了防止id重复，删除的时候出现错误，所以改成随机数
				id:getId(),
				// 由于$scope.text是双向绑定的，add同时肯定可以同他拿到界面上的输入
				//由于$scope.text是双向数据绑定的，add同时肯定也是可以通过它拿到界面上输入的值
				text:$scope.text,
				completed:false
			});
			//清空输入框
			$scope.text = '';
		};
		//删除操作,根据传入的id删除对应的li
		$scope.remove = function(id){
			//循环遍历数据，如果遍历的id和传入的id值一样，就删除该条li
			for(var i=0;i<$scope.data.length;i++){
				if($scope.data[i].id === id){
					$scope.data.splice(i,1);
					break;//找到一个就不再往后找了，会跳出循环
				}
			}
		};
		//清空所有已经完成的li
		$scope.clear = function(){
			//定义一个新数组
			var result = [];
			for(var i=0;i<$scope.data.length;i++){
				if(!$scope.data[i].completed){//把列表里还没完成的放进新数组里
					result.push($scope.data[i]);
				}
			}
			//最后让新数组赋值给$scope.data
			$scope.data = result;
		};
		//判断是否有已经完成的li，如果有就显示clear按钮，没有就不显示，用ng-show
		$scope.exitCompleted = function(){//该函数一定要有返回值
			for(var i=0;i<$scope.data.length;i++){
				if($scope.data[i].completed){
					return true;
				}
			}
			return false;
		};
		//记录当前正在编辑的li的id
		//编辑的时候只能编辑一个，不可能好几个同时编辑。编辑另外一个的时候，就要把上一个的编辑状态停止
		//给正在编辑的li默认初始值是-1，因为不会有id是-1，-1代表一个肯定不存在的元素
		//默认是没有任何元素被编辑的
		$scope.currentEditingId = -1;
		//双击谁，把谁的id传过来
		$scope.editing = function(id){
			//记录双击的id
			$scope.currentEditingId = id;
		};
		//敲回车的时候，停止编辑
		$scope.save = function(){
			$scope.currentEditingId = -1;//让当前正在编辑的id等于-1，就是不再编辑的状态了
		};
		//全选反选
		var lala = true;//定义一个变量，初始值是true
		$scope.toggleAll = function(){
			for(var i=0;i<$scope.data.length;i++){
				$scope.data[i].completed = lala;//点击的时候，让所有选项统一变为true
			}
			lala = !lala;//每次点击完之后，让所有的选项取非
		};
		//状态筛选
		$scope.selector = {};/*取值是三种情况：{}(all全部的情况)，{completed:true},{completed:false}*/
		/*点击的方式不合适，因为有dom操作*/
		//正确的做法
		//第一步，拿到锚点值。第二步，根据锚点值对selector做变换
		//1.拿到锚点值
		//var hash = window.location.hash;//这样写要求执行环境必须要有window对象 
		//console.log(hash);
        //console.log($location);
		//$location.path('/hello');//让网页跳转到hello上
		
		/*var path = $location.path();*/
		
		//console.log(path);
		//window.$loca = $location;//就是一个调试的作用，把这个对象放在window对象上，那么在window对象上就可以全局拿到了
		//2.根据锚点值 对selector做变换,应该放到一个实时执行的环境中
		
		/*switch(path){
			case '/active':
				$scope.selector = {completed:false};//尚未完成的
				break;
			case '/completed':
				$scope.selector = {completed:true};//已经完成的
				break;
			default://默认的情况（all）
				$scope.selector = {};
				break;
		};*/
		
		//watch只能监视属于$scope的成员
		//让$scope也有一个指向$location的数据成员
		$scope.$location = $location;//把$location赋值给了$scope下的$location,这样$watch就能监控了
		//监视函数的返回值
		$scope.$watch('$location.path()',function(now,old){
			//console.log(now);
			switch(now){
				case '/active':
					$scope.selector = {completed:false};//尚未完成的
					break;
				case '/completed':
					$scope.selector = {completed:true};//已经完成的
					break;
				default://默认的情况（all）
					$scope.selector = {};
					break;
			};
		});
		//自定义一个比较的函数,默认filter过滤器使用的是模糊匹配
		//将switch里的项和遍历的item里的项进行比较
		$scope.equalCompare = function(source,target){
			console.log(source);
			console.log(target);
			return source === target;//这样的话，模糊比较fa就匹配不上了
		};
		
	}]);
	
	
	
	
	
	
	
	
	
	
	
	
	
})(angular);
