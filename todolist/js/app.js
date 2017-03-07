(function(angular) {
  'use strict';

  /**
   * MyTodoMvc Module
   *
   * 应用程序的主要的模块
   */
  var myApp = angular.module('MyTodoMvc', []);

  // 注册一个主要的控制器
  myApp.controller('MainController', ['$scope', function($scope) {
    // [1,2,3,4,5]
    function getId() {
      var id = Math.random(); // 1 2
      for (var i = 0; i < $scope.todos.length; i++) {
        if ($scope.todos[i].id === id) {
          id = getId();
          break;
        }
      }
      return id;
    }

    // 文本框需要一个模型
    $scope.text = '';

    // 任务列表也需要一个
    // 每一个任务的结构 { id: 1, text: '学习', completed: true }
    $scope.todos = [{
      id: 0.123,
      text: '学习',
      completed: false
    }, {
      id: 0.22,
      text: '睡觉',
      completed: false
    }, {
      id: 0.232,
      text: '打豆豆',
      completed: true
    }, ];

    // 添加todo
    $scope.add = function() {
    	if(!$scope.text){
    		return;
    	}
      $scope.todos.push({
        // 自动增长？
        id: getId(),
        // 由于$scope.text是双向绑定的，add同时肯定可以同他拿到界面上的输入
        text: $scope.text,
        completed: false
      });
      // 清空文本框
      $scope.text = '';
    };


    // 处理删除
    $scope.remove = function(id) {
      // 删除谁
      for (var i = 0; i < $scope.todos.length; i++) {
        if ($scope.todos[i].id === id) {
          $scope.todos.splice(i, 1);
          break;
        }
      }
      // $scope.todos
    };

    // 清空已完成
    $scope.clear = function() {
      var result = [];
      for (var i = 0; i < $scope.todos.length; i++) {
        if (!$scope.todos[i].completed) {
          result.push($scope.todos[i]);
        }
      }
      $scope.todos = result;
    };

    // 是否有已经完成的
    $scope.existCompleted = function() {
      // 该函数一定要有返回值
      for (var i = 0; i < $scope.todos.length; i++) {
        if ($scope.todos[i].completed) {
          return true;
        }
      }
      return false;
    };

    // 当前编辑哪个元素
    $scope.currentEditingId = -1;
    $scope.editing = function(id) {
      $scope.currentEditingId = id;
    };
    $scope.save = function() {
      $scope.currentEditingId = -1;
    };

    // $scope.checkall = false;
    // $scope.$watch('checkall', function(now, old) {
    //   for (var i = 0; i < $scope.todos.length; i++) {
    //     $scope.todos[i].completed = now;
    //   }
    // });

    var now = true;
    $scope.toggleAll = function() {
      for (var i = 0; i < $scope.todos.length; i++) {
        $scope.todos[i].completed = now;
      }
      now = !now;
    }

  }]);

})(angular);
