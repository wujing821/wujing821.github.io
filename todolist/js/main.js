(function(angular){
	'use strict';//开启严格模式
	//创建一个独立的模块
	var controllers = angular.module('app.controller.main',['app.service.main']);
	controllers.controller('myController',['$scope','$routeParams','$route','mainService',function($scope,$routeParams,$route,mainService){
		
		//初始化数据
		//文本框需要一个模型text，为了能拿到文本框输入的值，因为建立了双向数据绑定关系
		$scope.text = '';//初始化是控制
		//列表也需要一个模型data
		//每一个任务的结构{id:1,text:'学习'，completed：true}
		$scope.data = mainService.get();
		//添加操作
		$scope.add = function(){
			//参数校验也属于界面逻辑
			//如果没有输入的内容，那么将阻止代码运行
			if(!$scope.text) return;
			mainService.add($scope.text);
			//清空输入框
			$scope.text = '';
		};
		//删除操作,根据传入的id删除对应的li
		$scope.remove = mainService.remove;
		/*function(id){
			//此处是界面逻辑
			mainService.remove(id);
		};*/
		//清空所有已经完成的li
		$scope.clear = function(){
			//由于在service里 ，data崇信赋值了，所以这里也要重新赋值
			var newData = mainService.clear();
			$scope.data = newData;
		};
		/*function(){
			//定义一个新数组
			var result = [];
			for(var i=0;i<$scope.data.length;i++){
				if(!$scope.data[i].completed){//把列表里还没完成的放进新数组里
					result.push($scope.data[i]);
				}
			}
			//最后让新数组赋值给$scope.data
			$scope.data = result;
		};*/
		//判断是否有已经完成的li，如果有就显示clear按钮，没有就不显示，用ng-show
		$scope.exitCompleted = mainService.exitCompleted;
		/*function(){//该函数一定要有返回值
			for(var i=0;i<$scope.data.length;i++){
				if($scope.data[i].completed){
					return true;
				}
			}
			return false;
		};*/
		
		//记录当前正在编辑的li的id
		//编辑的时候只能编辑一个，不可能好几个同时编辑。编辑另外一个的时候，就要把上一个的编辑状态停止
		//给正在编辑的li默认初始值是-1，因为不会有id是-1，-1代表一个肯定不存在的元素
		//默认是没有任何元素被编辑的
		$scope.currentEditingId = -1;
		//双击谁，把谁的id传过来
		//界面逻辑
		$scope.editing = function(id){
			//记录双击的id
			$scope.currentEditingId = id;
		};
		//敲回车的时候，停止编辑
		$scope.save = function(){
			$scope.currentEditingId = -1;//让当前正在编辑的id等于-1，就是不再编辑的状态了
		};
		//全选反选
		//var lala = true;//定义一个变量，初始值是true
		$scope.toggleAll = mainService.toggleAll;
		//每一个li被勾选了，需要触发toggle事件
		$scope.toggle = function(){
			mainService.save();
		}
		/*function(){
			for(var i=0;i<$scope.data.length;i++){
				$scope.data[i].completed = lala;//点击的时候，让所有选项统一变为true
			}
			lala = !lala;//每次点击完之后，让所有的选项取非
		};*/
		//状态筛选
		$scope.selector = {};/*取值是三种情况：{}(all全部的情况)，{completed:true},{completed:false}*/
		//根据路由的值的变化去做相应的调整
		//路由发生改变，控制器就会重新被执行，所以不需要添加监视
		var status = $routeParams.status;//取路由里面匹配出来的数据
		switch(status){
			case 'active':
				$scope.selector = {completed:false};
				break;
			case 'completed':
				$scope.selector = {completed:true};
				break;
			default:
			//更新参数
				$route.updateParams({
					status:''
				});
				$scope.selector = {};
				break;
		};
		
		
		
		
		
		
		//自定义一个比较的函数,默认filter过滤器使用的是模糊匹配
		//将switch里的项和遍历的item里的项进行比较
		$scope.equalCompare = function(source,target){
			/*console.log(source);
			console.log(target);*/
			return source === target;//这样的话，模糊比较fa就匹配不上了
		};
		
	}]);
	
	
	
	
})(angular);
