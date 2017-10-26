(function(angular) {
	'use strict';
	//模拟假数据
	/*var data = [{
		"count": 1,
		"start": 0,
		"total": 24,
		"subjects": [{
			"rating": {
				"max": 10,
				"average": 8.6,
				"stars": "45",
				"min": 0
			},
			"genres": ["\u5267\u60c5", "\u52a8\u4f5c", "\u79d1\u5e7b"],
			"title": "\u91d1\u521a\u72fc3\uff1a\u6b8a\u6b7b\u4e00\u6218",
			"casts": [{
				"alt": "https:\/\/movie.douban.com\/celebrity\/1010508\/",
				"avatars": {
					"small": "http://img3.doubanio.com\/img\/celebrity\/small\/22036.jpg",
					"large": "http://img3.doubanio.com\/img\/celebrity\/large\/22036.jpg",
					"medium": "http://img3.doubanio.com\/img\/celebrity\/medium\/22036.jpg"
				},
				"name": "\u4f11\u00b7\u6770\u514b\u66fc",
				"id": "1010508"
			}, {
				"alt": "https:\/\/movie.douban.com\/celebrity\/1010540\/",
				"avatars": {
					"small": "http://img7.doubanio.com\/img\/celebrity\/small\/50451.jpg",
					"large": "http://img7.doubanio.com\/img\/celebrity\/large\/50451.jpg",
					"medium": "http://img7.doubanio.com\/img\/celebrity\/medium\/50451.jpg"
				},
				"name": "\u5e15\u7279\u91cc\u514b\u00b7\u65af\u56fe\u5c14\u7279",
				"id": "1010540"
			}, {
				"alt": "https:\/\/movie.douban.com\/celebrity\/1363476\/",
				"avatars": {
					"small": "http://img3.doubanio.com\/img\/celebrity\/small\/CCMOQr5bsGAcel_avatar_uploaded1476526279.97.jpg",
					"large": "http://img3.doubanio.com\/img\/celebrity\/large\/CCMOQr5bsGAcel_avatar_uploaded1476526279.97.jpg",
					"medium": "http://img3.doubanio.com\/img\/celebrity\/medium\/CCMOQr5bsGAcel_avatar_uploaded1476526279.97.jpg"
				},
				"name": "\u8fbe\u8299\u59ae\u00b7\u57fa\u6069",
				"id": "1363476"
			}],
			"collect_count": 7502,
			"original_title": "Logan",
			"subtype": "movie",
			"directors": [{
				"alt": "https:\/\/movie.douban.com\/celebrity\/1036395\/",
				"avatars": {
					"small": "http://img7.doubanio.com\/img\/celebrity\/small\/11282.jpg",
					"large": "http://img7.doubanio.com\/img\/celebrity\/large\/11282.jpg",
					"medium": "http://img7.doubanio.com\/img\/celebrity\/medium\/11282.jpg"
				},
				"name": "\u8a79\u59c6\u65af\u00b7\u66fc\u9ad8\u5fb7",
				"id": "1036395"
			}],
			"year": "2017",
			"images": {
				"small": "http://img7.doubanio.com\/view\/movie_poster_cover\/ipst\/public\/p2431980130.jpg",
				"large": "http://img7.doubanio.com\/view\/movie_poster_cover\/lpst\/public\/p2431980130.jpg",
				"medium": "http://img7.doubanio.com\/view\/movie_poster_cover\/spst\/public\/p2431980130.jpg"
			},
			"alt": "https:\/\/movie.douban.com\/subject\/25765735\/",
			"id": "25765735"
		}],
		"title": "\u6b63\u5728\u4e0a\u6620\u7684\u7535\u5f71-\u5317\u4eac"
	}];*/
	//创建正在热映模块
	var module = angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http']);
	//配置模块的路由  :page可以匹配页数
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:category/:page', {
			templateUrl: 'movie_list/view.html',
			controller: 'MovieListController'
		});
	}]);

	module.controller('MovieListController', ['$scope','$routeParams','$route',/*'$http'*/'HttpService', function($scope,$routeParams,$route,/*$http*/HttpService) {
		var count = 10;//每一页的条数
		var page = parseInt($routeParams.page);//当前是第几页
		var start = (page - 1)*count;//当前页从哪条开始
		//控制器的编写分为两步：1.设计暴露的数据，2.设计暴露的行为
		$scope.loading = true;//页面开始加载，加载动画为true
		$scope.subjects = [];
		$scope.title = '';
		$scope.message = '';//错误信息默认为空
		$scope.totalCount = 0;//总条数默认为0
		$scope.totalPages = 0;
		$scope.currentPage = page;
		HttpService.jsonp('http://api.douban.com/v2/movie/'+ $routeParams.category,{start:start,count:count},function(data){
			//console.log(data);
			$scope.title = data.title;
			$scope.subjects = data.subjects;
			$scope.totalCount = data.total;
			//总条数/每一页的条数
			$scope.totalPages = Math.ceil($scope.totalCount/count);
			$scope.loading = false;//动画隐藏
			//$apply的作用就是页面上所有表达式的值重新同步
			$scope.$apply();
			
		});
		//暴露上一页下一页的行为,传过来是第几页我就跳到第几页
		$scope.goPage = function(page){
			//更新当前路由上的page值
			//console.log(page);
			//一定也要做一个合法范围校验
			if(page >= 1 && page <= $scope.totalPages){
				$route.updateParams({page:page});				
			};

		};
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		//测试$http服务
		/*$http.get('/moviecat/app/datas/data.json').then(function(response){
			//此处代码是在异步请求完成过后才执行（需要等一段时间）
			if(response.status == 200){
				$scope.subjects = response.data.subjects;		
			}else{
				$scope.message = '获取数据错误，错误信息：'+response.statusText;
			}
			//console.log(response)
		},function(err){
			console.log(err);
			$scope.message = '获取数据错误，错误信息：'+err.statusText;
			
			
		});*/
		//jsonp的方式
		//在angular中使用jsonp的方式做跨域请求，就必须给当前地址上加一个参数callback=JSON_CALLBACK
	/*	$http.jsonp(doubanApiAddress+'?callback=JSON_CALLBACK').then(function(response){
			//此处代码是在异步请求完成过后才执行（需要等一段时间）
			if(response.status == 200){
				$scope.subjects = response.data.subjects;		
			}else{
				$scope.message = '获取数据错误，错误信息：'+response.statusText;
			}
			//console.log(response)
		},function(err){
			console.log(err);
			$scope.message = '获取数据错误，错误信息：'+err.statusText;
			
			
		});*/
	}]);
})(angular)