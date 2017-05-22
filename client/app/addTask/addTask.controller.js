/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addTask.controller',[])
        .controller('AddTaskCtrl',['$scope',AddTaskCtrl])
    ;

    function AddTaskCtrl($scope){
        $scope.title='add group';

        $scope.formObj={
            persons:['张三','李四']
        };
    }
})();
