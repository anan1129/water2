/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.taskList.controller',[])
        .controller('TaskListCtrl',['$scope',TaskListCtrl])
    ;

    function TaskListCtrl($scope){
        $scope.title='add group';

        $scope.formObj={
            persons:['张三','李四']
        };
    }
})();
