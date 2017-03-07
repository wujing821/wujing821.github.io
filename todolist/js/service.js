(function(angular){
	//注册一个新模块
	angular.module('app.service.main',[])
	.service('mainService',['$window',function($window){//注册一个服务，服务的名字和执行函数
		//业务罗技都必须出现在服务中（专门定义业务逻辑），针对数据的增删改查，注册登录
		//业务逻辑里的代码一定要能重用
		//本地存储
		var storage = $window.localStorage;
		//获取本地数据，判断是否是字符串，如果是字符串需要序列化成json对象，如果没有值，就给一个空数组
		//假设键名叫my_data_list,也有取不到值的情况，那就给一个[]
		
		var data = storage['my_data_list'] ? JSON.parse(storage['my_data_list']) : [];
		/*[//外界拿不到我的数据
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
		];*/
		//对data数据做了增删改查，就要重新保存一下data的值,本地存储的必须是字符串不能是对象
		this.save = function(){
			storage['my_data_list'] = JSON.stringify(data);
		};
		//递归函数，用于获取不重复的id
		function getId(){
			var id = Math.random();
			for(var i=0;i<data.length;i++){
				if(data[i].id === id){//递归一定要找到突破口，跳出循环的条件
					id = getId();
					break;
				}
			}
			return id;
		};
		//控制私有字段的访问权限
		this.get = function(){
			return data;
		};
		//添加操作
		this.add = function(text){
			data.push({
				//id:Math.random(),//为了防止id重复，删除的时候出现错误，所以改成随机数
				id:getId(),
				// 由于$scope.text是双向绑定的，add同时肯定可以同他拿到界面上的输入
				//由于$scope.text是双向数据绑定的，add同时肯定也是可以通过它拿到界面上输入的值
				text:text,
				completed:false
			});
			this.save();
		};
		//删除操作,根据传入的id删除对应的li
		this.remove = function(id){
			//循环遍历数据，如果遍历的id和传入的id值一样，就删除该条li
			for(var i=0;i<data.length;i++){
				if(data[i].id === id){
					data.splice(i,1);
					break;//找到一个就不再往后找了，会跳出循环
				}
			}
			this.save();
		};
		//清空所有已经完成的li
		this.clear = function(){
			//定义一个新数组
			var result = [];
			for(var i=0;i<data.length;i++){
				if(!data[i].completed){//把列表里还没完成的放进新数组里
					result.push(data[i]);
				}
			}
			//最后让新数组赋值给$scope.data
			data = result;
			this.save();
			//此时我们将data指向了一个新的地址，所以绑定也需要绑定新的地址
			return data;
		};
		//判断是否有已经完成的li，如果有就显示clear按钮，没有就不显示，用ng-show
		this.exitCompleted = function(){//该函数一定要有返回值
			for(var i=0;i<data.length;i++){
				if(data[i].completed){
					return true;
				}
			}
			return false;
		};
		//更新,传入一个要更新的id和一个更新的目标
		this.update = function(id,target){
			this.save();
		};
		//整个切换状态
		var lala = true;//定义一个变量，初始值是true
		this.toggleAll = function(){
			for(var i=0;i<data.length;i++){
				data[i].completed = lala;//点击的时候，让所有选项统一变为true
			}
			lala = !lala;//每次点击完之后，让所有的选项取非
			this.save();
		};
	}]);
	
	
	
	
	
	
	
	
})(angular);
