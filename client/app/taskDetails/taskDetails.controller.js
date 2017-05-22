/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.taskDetails.controller',[])
        .controller('TaskDetailsCtrl',['$scope',TaskDetailsCtrl])
    ;

    function TaskDetailsCtrl($scope){
        $scope.title='add group';

    }
})();
