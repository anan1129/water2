/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.taskDetails.controller',[])
        .controller('TaskDetailsCtrl',['$scope','$stateParams',TaskDetailsCtrl])
    ;

    function TaskDetailsCtrl($scope,$stateParams){
        $scope.stateParams=$stateParams;
        console.log($stateParams.users);
    }
})();
