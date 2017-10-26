(function(angular){
	'use strict';
	//由于默认angular提供的异步请求对象，不支持自定义回调函数名称，angular回掉函数的名称是angular帮我们随机分配的，这个分配的名字是豆瓣不支持的
	//angular随机分配的回调函数名称不被豆瓣支持，所以我们要自己写一个
	var http = angular.module('moviecat.services.http',[]);
	//定义一个服务
	http.service('HttpService',['$window','$document',function($window,$document){
		//console.log($document);
		//url:http://api.douban.com/vsdhg 我们把这个地址封装到script标签中，并将这个标签放到页面html中，就可自动执行
		//我们要给这个地址加上一些回调的名字，豆瓣才知道我们这是跨域请求
		//1.处理url地址中的回调参数
		//2.创建一个script标签
		//3.挂载回调函数
		//4.将script标签放到页面中
		this.jsonp = function(url,data,callback){
			//1.挂载回调函数
			var fnSuffix =  Math.random().toString().replace('.','');//去掉随机数里的小数点.后缀		
			var cbFuncName = 'my_json_cb_'+fnSuffix;//前缀
			$window[cbFuncName] = callback;
			//2.将data转换成url字符串的形式，
			//例如：{id:1,name:'zhangsan'}=>id=1&name=zhangsan,转换成这样才能在url地址里传输	
			var querystring = url.indexOf("?") == -1 ? "?" : "&";//先判断一下传过来的地址是否有？
			for(var key in data){
				querystring += key + '='+ data[key] + '&'; //querystring = ?id=1&name=zhangsan&   
			}
			//3.处理url中的回调参数  // url += callback = djallhg(随机的函数名)
			querystring +='callback='+ cbFuncName;//querystring = ?id=1&name=zhangsan&callback=my_json_cb_024981026545772833
			//4.创建一个script标签
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;
			//5.将script标签放到页面中
			$document[0].body.appendChild(scriptElement);//append过后页面会自动对这个地址发送一个请求，请求完成以后，自动执行这个脚本
		};
	}]);
	
})(angular)
