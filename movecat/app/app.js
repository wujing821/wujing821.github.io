'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
  'ngRoute',
  /*'moviecat.in_theaters',
  'moviecat.coming_soon',
  'moviecat.top250'*/
  'moviecat.movie_list',
  'moviecat.directives.auto_focus'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}]);/*.controller('NavController',['$scope','$location',function($scope,$location){//给导航做焦点状态切换  $routeParams接受 一下路由匹配的参数
		$scope.$location = $location;
		$scope.$watch('$location.path()',function(now){//需要监视一下
			//var path = $location.path();//拿到当前是哪个页面的后缀
			if(now.startsWith('/in_theaters')){
				$scope.type = 'in_theaters';
			}else if(now.startsWith('/coming_soon')){
				$scope.type = 'coming_soon';
				
			}else if(now.startsWith('/top250')){
				$scope.type = 'top250';	
			}
			//console.log($scope.type);
		});
		

}]);*///用自定义指令方式就不要定义控制器了
